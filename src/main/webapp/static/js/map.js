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
            
            // action 상태가 NONE 이면 아무반응 안함
            if (game.common.currentAction == game.actionStatus.NONE) {
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

                    // TODO : 클릭했을 때, 1p,2p가 둘다 끝까지 도달할 수 있는 길이있어야 한다.
                    if (!isInstallable(realX, realY)) {
                        console.log("장애물을 놓을 수 없는 위치");
                        alert("장애물을 놓을 수 없는 위치");
                        return;
                    }


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
            
            // Winner 판단
            if (game.common.indexPlayer[0] > 271) {
            	$('h2').html("1P Win");
            	game.common.currentPlayer = -1;
            } else if (game.common.indexPlayer[1] < 17) {
            	$('h2').html("2P Win");
            	game.common.currentPlayer = -1;
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
        	
        	// 내위치 에서 한번에 이동할 수 있는 거리인지 판단
            var beforeX = parseInt($maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-row"));
            var beforeY = parseInt($maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-col"));
            var checkLength = Math.abs(realX - beforeX) + Math.abs(realY - beforeY);
            if (checkLength >= 4 || checkLength <= 0) {
                return false;
            }
            
            // 장애물에 막혀있는지 판단
            var middleX = (beforeX + realX) / 2;
            var middleY = (beforeY + realY) / 2;
            var middleIndex = game.util.getArrayIndex(middleX, middleY);
            if ($maps[middleIndex].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
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
            
            // TODO : 길이 완전히 막히는지 판단
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

    // dfs 길찾기
    function isInstallable(realX, realY) {
        var player1_X = game.util.getRealX(game.common.indexPlayer[0]) - 1;
        var player1_Y = game.util.getRealY(game.common.indexPlayer[0]) - 1;

        var player2_X = game.util.getRealX(game.common.indexPlayer[1]) - 1;
        var player2_Y = game.util.getRealY(game.common.indexPlayer[1]) - 1;

        // 맵 초기화
        game.DfsMap = makeDFSArray(realX, realY);
        game.VisitMap = makeVisitArray();

        // 1p 이동 가능여부 확인
        dfs(player1_X, player1_Y, 1);
        if (!game.DfsAble) {
            console.log("1p 이동 불가능");
            game.DfsAble = false;
            return false;
        }
        game.DfsAble = false;

        // 맵 초기화
        game.VisitMap = makeVisitArray();

        // 2p 이동 가능여부 확인
        dfs(player2_X, player2_Y, 2);
        if (!game.DfsAble) {
            console.log("2p 이동 불가능");
            game.DfsAble = false;
            return false;
        }
        game.DfsAble = false;
        console.log("둘다 이동가능");
        return true;
    }

    // TODO
    function dfs(x, y, currentPlayer) {
        // dfs가 종료되면
        if (game.DfsAble) {
            return;
        }

        // 플레이어가 끝위치에 도달
        if ((currentPlayer == 1 && x == 16) ||
            (currentPlayer == 2 && x == 0)) {
            game.DfsAble = true;
            return;
        }

        // 배열의 범위를 벗어나면
        if (x < 0 || y < 0 || x > 16 || y > 16) {
            return;
        }
        // 이동할 수 없는 곳이면 (벽으로 막혀있거나, 아예 이동불가능한 위치이거나)
        if (game.DfsMap[x][y] == game.mapStatus.WALL || game.DfsMap[x][y] == game.mapStatus.NONE) {
            return;
        }
        // 방문한 곳이면
        if (game.VisitMap[x][y] == 1) {
            return;
        }

        // 방문
        game.VisitMap[x][y] = "1";

        // 상
        dfs(x - 1, y, currentPlayer);
        // 하
        dfs(x + 1, y, currentPlayer);
        // 좌
        dfs(x, y - 1, currentPlayer);
        // 우
        dfs(x, y + 1, currentPlayer);
    }

    // 기존맵으로 dfs용 이차원 배열을 생성한다.
    function makeDFSArray(realX, realY) {
        // 기존 맵
        var $maps = $('.map');

        // 숫자 맵(dfs용)
        var map = new Array();

        // 2차원 배열 만들기
        for (var i = 0; i < 17; i++) {
            map[i] = new Array();
        }

        // 현재맵 상태와 동일한 값으로 설정
        for (var i = 0; i < 17; i++) {
            for (var j = 0; j < 17; j++) {
                map[i][j] = $maps[game.util.getArrayIndex(i+1, j+1)].getAttribute("data-status");
            }
        }
        //console.log(map);

        var arrayIndex = game.util.getArrayIndex(realX, realY);
        var nextIndex1 = game.util.getNextWallIndex(arrayIndex, 1);
        var nextIndex2 = game.util.getNextWallIndex(arrayIndex, 2);
        map[game.util.getRealX(arrayIndex)-1][game.util.getRealY(arrayIndex)-1] = game.mapStatus.WALL;
        map[game.util.getRealX(nextIndex1)-1][game.util.getRealY(nextIndex1)-1] = game.mapStatus.WALL;
        map[game.util.getRealX(nextIndex2)-1][game.util.getRealY(nextIndex2)-1] = game.mapStatus.WALL;

        return map;
    }

    function makeVisitArray() {
        // 숫자 맵(dfs용)
        var map = new Array();

        // 2차원 배열 만들기
        for (var i = 0; i < 17; i++) {
            map[i] = new Array();
        }

        // 방문전 상태를 만듬
        for (var i = 0; i < 17; i++) {
            for (var j = 0; j < 17; j++) {
                map[i][j] = "0";
            }
        }

        return map;
    }

    // Main function
    $(document).ready(function () {
        // click event binding
        clickMap();

        // mouseover event binding
        mouseoverMap();

    });
})(jQuery, window, document);