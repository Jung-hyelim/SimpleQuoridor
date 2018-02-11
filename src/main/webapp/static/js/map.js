(function ($, window, document) {

    // 맵을 클릭했을때 발생하는 이벤트
    function clickMap() {
        var $maps = $('.map');
        $maps.on("click", function() {
            // 실제 테이블의 좌표 x,y
            var realX = this.getAttribute('data-row');
            var realY = this.getAttribute('data-col');
            
            // 자신의 말을 클릭한 경우
            if (this.getAttribute('data-status') == game.common.currentPlayer) {
            	game.common.currentAction = game.actionStatus.CLICKPLAYER;
            	return false;
            }

            // validate Position
            if (validatePosition(realX, realY) == false) {
                alert("해당 위치로는 이동할 수 없습니다.");
                return;
            }

            // confirm 확인
            //if (confirm("정말 이동하시겠습니까?")) {
            if (true) {
            	if (game.common.currentAction == game.actionStatus.CLICKPLAYER) {
                    // 이동
                    move(realX, realY);
            	} else if (game.common.currentAction == game.actionStatus.CLICKWALL) {
            		// 설치
            		install(realX, realY);
            	}
            	
            	// action 상태 변경
            	game.common.currentAction = game.actionStatus.NONE;

                // 플레이어 턴 변경
                game.common.currentPlayer = (game.common.currentPlayer == 2 ? 1 : 2);

                // re-render
                game.util.drawingMap();
                game.util.drawingWalls();
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

            if (game.common.currentAction == game.actionStatus.CLICKPLAYER) {
            	
                // validate Position
                if (validatePosition(realX, realY) == false) {
                    console.log("false");
                    $maps[arrayIndex].style.backgroundColor = game.color.CRIMSON;
                    return;
                }
                
                // 플레이어 이동인 경우 한칸만 색변경
                $maps[arrayIndex].style.backgroundColor = game.color.CHARTREUSE;
                console.log("true");
                
            } else if (game.common.currentAction == game.actionStatus.CLICKWALL) {
            	
                // validate Position
                if (validatePosition(realX, realY) == false) {
                    console.log("false");
                    $maps[arrayIndex].style.backgroundColor = game.color.CRIMSON;
                    return;
                }
                
            	// 장애물 설치인 경우 연속된 맵 3개 색 변경
                $maps[arrayIndex].style.backgroundColor = game.color.CHARTREUSE;
                $maps[game.util.getNextWallIndex(arrayIndex, 1)].style.backgroundColor = game.color.CHARTREUSE;
                $maps[game.util.getNextWallIndex(arrayIndex, 2)].style.backgroundColor = game.color.CHARTREUSE;
                console.log("true");
            }
        });
    }

    // 이동할 수 있는 위치인지 판단한다.
    function validatePosition(realX, realY) {
    	//game.util.loggingPosition(realX, realY);

        var arrayIndex = game.util.getArrayIndex(realX, realY);
        console.log("1차원 배열값 :" + arrayIndex);

        realX = parseInt(realX);
        realY = parseInt(realY);

        var $maps = $('.map');
        
        if (game.common.currentAction == game.actionStatus.NONE) {
        	return false;
        	
        } else if (game.common.currentAction == game.actionStatus.CLICKPLAYER) {
            // 이동위치가 비어있는지 판단
        	if ($maps[arrayIndex].getAttribute("data-status") != game.mapStatus.ABLE_PLAYER) {
        		return false;
        	}
        	
        	// TODO : 내위치 에서 한번에 이동할 수 있는 거리인지 판단
            var beforeX = $maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-row");
            var beforeY = $maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-col");
            var checkLength = Math.abs(realX - beforeX) + Math.abs(realY - beforeY);
            if (checkLength >= 4 || checkLength <= 0) {
                return false;
            }
            
        } else if (game.common.currentAction == game.actionStatus.CLICKWALL) {
        	// 현재 맵에 장애물 위치 판단
        	if ($maps[arrayIndex].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
        		return false;
        	}
        	
            var nextArrayIndex1 = game.util.getNextWallIndex(arrayIndex, 1);
            var nextArrayIndex2 = game.util.getNextWallIndex(arrayIndex, 2);
            
            // 연속된 위치가 장애물 설치할 수 있는지 판단
            if (nextArrayIndex1 == -1 || nextArrayIndex2 == -1) {
            	return false;
            }

            // 다음 위치가 비어있는지 판단
            if ($maps[nextArrayIndex1].getAttribute("data-status") != game.mapStatus.NONE) {
        		return false;
        	}

            // 다다음 위치가 장애물 위치인지 판단
            if ($maps[nextArrayIndex2].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
        		return false;
        	}
        }

        return true;
    }

    // 실제 이동한다.
    function move(realX, realY) {
        // TODO : data-status 값 변환
        var $maps = $('.map');
        var arrayIndex = game.util.getArrayIndex(realX, realY);

        // 현재 플레이어의 현재위치 data-status 값 변환 & 플레이어 현재 위치 인덱스 값 변환
        $maps[game.common.indexPlayer[game.common.currentPlayer-1]].setAttribute("data-status", game.mapStatus.ABLE_PLAYER);
        game.common.indexPlayer[game.common.currentPlayer-1] = arrayIndex;

        // 현재 플레이어의 이동위치 data-status 값 변환
        $maps[arrayIndex].setAttribute("data-status", game.common.currentPlayer);
    }
    
    // 실제 장애물을 설치한다.
    function install(realX, realY) {
        var $maps = $('.map');
        var arrayIndex = game.util.getArrayIndex(realX, realY);
        var nextArrayIndex1 = game.util.getNextWallIndex(arrayIndex, 1);
        var nextArrayIndex2 = game.util.getNextWallIndex(arrayIndex, 2);

        // 맵 상태값 변경
        $maps[arrayIndex].setAttribute("data-status", game.mapStatus.WALL);
        $maps[nextArrayIndex1].setAttribute("data-status", game.mapStatus.WALL);
        $maps[nextArrayIndex2].setAttribute("data-status", game.mapStatus.WALL);
        
        // 장애물 상태값 변경
        var $player_walls = $('.player' + game.common.currentPlayer + '_wall');
        $player_walls[(parseInt(game.common.cntWall[game.common.currentPlayer - 1]) * 2 - 1)].setAttribute("data-status", game.wallStatus.USED);
        
        // 현재 플레이어의 장애물 개수 변경
        game.common.cntWall[game.common.currentPlayer - 1]--;
    }

    // Main function
    $(document).ready(function () {
        // click event binding
        clickMap();

        // mouseover event binding
        mouseoverMap();

    });
})(jQuery, window, document);