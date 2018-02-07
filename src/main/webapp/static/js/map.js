(function ($, window, document) {

    // 맵을 클릭했을때 발생하는 이벤트
    function clickMap() {
        var $maps = $('.map');
        $maps.on("click", function() {
            // 실제 테이블의 좌표 x,y
            var realX = this.getAttribute('data-row');
            var realY = this.getAttribute('data-col');

            // validate Position
            if (validatePosition(realX, realY) == false) {
                alert("해당 위치로는 이동할 수 없습니다.");
                return;
            }

            // confirm 확인
            //if (confirm("정말 이동하시겠습니까?")) {
            if (true) {
                // 이동
                move(realX, realY);

                // 플레이어 턴 변경
                game.common.currentPlayer = (game.common.currentPlayer == 2 ? 1 : 2);

                // re-render
                game.util.drawingMap();
            }
        });
    }

    // 맵에 마우스오버했을때 발생하는 이벤트
    function mouseoverMap() {
        var $maps = $('.map');
        $maps.on("mouseover", function() {
            // re-render
            game.util.drawingMap();

            // 실제 테이블의 좌표 x,y
            var realX = this.getAttribute('data-row');
            var realY = this.getAttribute('data-col');

            var arrayIndex = game.util.getArrayIndex(realX, realY);

            // validate Position
            if (validatePosition(realX, realY) == false) {
                console.log("false");
                $maps[arrayIndex].style.backgroundColor = game.color.CRIMSON;
                return;
            }
            console.log("true");
            $maps[arrayIndex].style.backgroundColor = game.color.CHARTREUSE;
        });
    }

    // 이동할 수 있는 위치인지 판단한다.
    function validatePosition(realX, realY) {
        //loggingPosition(realX, realY);

        var arrayIndex = game.util.getArrayIndex(realX, realY);
        console.log("1차원 배열값 :" + arrayIndex);

        realX = parseInt(realX);
        realY = parseInt(realY);

        var $maps = $('.map');

        // 이동위치가 비어있는지 판단
        if ($maps[arrayIndex].getAttribute("data-status") == game.mapStatus.ABLE_PLAYER) {
            // TODO : 내위치 에서 한번에 이동할 수 있는 거리인지 판단
            //var beforeX = (currentPlayer == 1 ? $maps[indexPlayer1].getAttribute("data-row") : $maps[indexPlayer2].getAttribute("data-row"));
            //var beforeY = (currentPlayer == 1 ? $maps[indexPlayer1].getAttribute("data-col") : $maps[indexPlayer2].getAttribute("data-col"));
            var beforeX = $maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-row");
            var beforeY = $maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-col");
            var checkLength = Math.abs(realX - beforeX) + Math.abs(realY - beforeY);
            if (checkLength >= 4 || checkLength <= 0) {
                return false;
            }

            // TODO : 현재 맵에 장애물 위치 판단
        } else if ($maps[arrayIndex].getAttribute("data-status") == game.mapStatus.ABLE_WALL) {
            // 현재 플레이어의 남은 장애물 개수 판단
            if (game.common.cntWall[game.common.currentPlayer-1] <= 0 ) {
                return false;
            }

            // TODO : 연속된 위치에 장애물 설치할 수 있는지 판단
            if (realX % 2 == 0) {
                // 오른쪽에 장애물 위치인지 판단
                if ((realY + 2) > 17) {
                    return false;
                }
                if ($maps[arrayIndex + 2].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
                    return false;
                }
            } else {
                // 아래쪽에 장애물 위치인지 판단
                if ((arrayIndex + 17*2) > 289) {
                    return false;
                }
                if ($maps[arrayIndex + 17*2].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
                    return false;
                }
            }

        } else {
            return false;
        }

        // TODO : 현재 맵에 상대방 위치 판단

        return true;
    }

    // 실제 이동한다.
    function move(realX, realY) {
        // TODO : data-status 값 변환
        var $maps = $('.map');
        var arrayIndex = game.util.getArrayIndex(realX, realY);

        // 현재 플레이어의 현재위치 data-status 값 변환 & 플레이어 현재 위치 인덱스 값 변환
        /* if (currentPlayer == 1) {
         $maps[indexPlayer1].setAttribute("data-status", "3");
         indexPlayer1 = arrayIndex;
         } else {
         $maps[indexPlayer2].setAttribute("data-status", "3");
         indexPlayer2 = arrayIndex;
         } */
        $maps[game.common.indexPlayer[game.common.currentPlayer-1]].setAttribute("data-status", game.mapStatus.ABLE_PLAYER);
        game.common.indexPlayer[game.common.currentPlayer-1] = arrayIndex;

        // 현재 플레이어의 이동위치 data-status 값 변환
        $maps[arrayIndex].setAttribute("data-status", game.common.currentPlayer);
    }

    // Main function
    $(document).ready(function () {
        // click event binding
        clickMap();

        // mouseover event binding
        mouseoverMap();

    });
})(jQuery, window, document);