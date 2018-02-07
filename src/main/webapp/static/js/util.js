(function ($, window, document) {
    game.util = game.util || {};

    // 좌표를 로깅한다
    game.util.loggingPosition = function(realX, realY) {
        // 게임상의 좌표 x,y
        var x = parseInt(realX / 2 + 1);
        var y = parseInt(realY / 2 + 1);

        console.log("x : " + x + ", y : " + y);
        console.log("실제 x : " + realX + ", y : " + realY);
    };

    // 2차원 배열 좌표로 1차원 배열 좌표를 반환하는 함수
    game.util.getArrayIndex = function(realX, realY) {
        var x = parseInt(realX);
        var y = parseInt(realY);
        return (x - 1)*17 + y - 1;
    };

    // 현재 플레이어의 턴을 그린다.(갱신한다)
    game.util.drawingPlayerTurn = function() {
        $('#showCurrentPlayer').html(game.common.currentPlayer);
    };

    // 맵 색상을 변환한다 (맵을 갱신한다)
    game.util.drawingMap = function() {
        var $maps = $('.map');
        for (var i = 0; i < 289; i++) {
            switch ($maps[i].getAttribute('data-status')) {
                case game.mapStatus.PLAYER1:
                    $maps[i].style.backgroundColor = game.color.RED;
                    continue;
                case game.mapStatus.PLAYER2:
                    $maps[i].style.backgroundColor = game.color.BLUE;
                    continue;
                case game.mapStatus.ABLE_PLAYER:
                    $maps[i].style.backgroundColor = game.color.BROWN;
                    continue;
                case game.mapStatus.ABLE_WALL:
                    $maps[i].style.backgroundColor = game.color.BLACK;
                    continue;
                case game.mapStatus.WALL:
                    $maps[i].style.backgroundColor = game.color.YELLOW;
                    continue;
                default :
                    $maps[i].style.backgroundColor = game.color.WHITE;
                    continue;
            }
        }
        game.util.drawingPlayerTurn();
    };

    // 장애물 색상을 변환한다 (장애물을 갱신한다)
    game.util.drawingWalls = function() {
        var $player1_walls = $('.player1_wall');
        var $player2_walls = $('.player2_wall');
        for (var i = 0; i < 21; i++) {
            // player1 walls
            if ($player1_walls[i].getAttribute('data-status') == game.wallStatus.NONE) {
                $player1_walls[i].style.backgroundColor = game.color.BLACK;
            } else if ($player1_walls[i].getAttribute('data-status') == game.wallStatus.UNUSED) {
                $player1_walls[i].style.backgroundColor = game.color.YELLOW;
            } else if ($player1_walls[i].getAttribute('data-status') == game.wallStatus.USED) {
                $player1_walls[i].style.backgroundColor = game.color.WHITE;
            }
            // player2 walls
            if ($player2_walls[i].getAttribute('data-status') == game.wallStatus.NONE) {
                $player2_walls[i].style.backgroundColor = game.color.BLACK;
            } else if ($player2_walls[i].getAttribute('data-status') == game.wallStatus.UNUSED) {
                $player2_walls[i].style.backgroundColor = game.color.YELLOW;
            } else if ($player2_walls[i].getAttribute('data-status') == game.wallStatus.USED) {
                $player2_walls[i].style.backgroundColor = game.color.WHITE;
            }
        }
    };

})(jQuery, window, document);