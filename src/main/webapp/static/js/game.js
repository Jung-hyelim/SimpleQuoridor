(function ($, window, document) {
    // 맵을 초기화 한다.
    function initMaps() {
        var $maps = $('.map');
        for (var i = 0; i < 289; i++) {
            if ($maps[i].getAttribute('data-row') % 2 == 0) {
                // 짝수 행일 때
                if ($maps[i].getAttribute('data-col') % 2 == 0) {
                    // 짝수 열이면
                    $maps[i].setAttribute("data-status", game.mapStatus.ABLE_PLAYER);
                } else {
                    // 홀수 열이면
                    $maps[i].height = '10px';
                    $maps[i].setAttribute("data-status", game.mapStatus.ABLE_WALL);
                }
            } else {
                // 홀수 행일 때
                if ($maps[i].getAttribute('data-col') % 2 == 0) {
                    // 짝수 열이면
                    $maps[i].width = '5px';
                    $maps[i].setAttribute("data-status", game.mapStatus.ABLE_WALL);
                } else {
                    // 홀수 열이면
                    $maps[i].width = '40px';
                    $maps[i].setAttribute("data-status", game.mapStatus.ABLE_PLAYER);
                }
            }

            // 아무것도 못하는 위치 설정
            if ($maps[i].getAttribute('data-row') % 2 == 0 &&
                $maps[i].getAttribute('data-col') % 2 == 0) {
                $maps[i].setAttribute("data-status", game.mapStatus.NONE);
            }
        }
        // 1p 초기위치
        $maps[8].setAttribute("data-status", game.mapStatus.PLAYER1);
        // 2p 초기위치
        $maps[280].setAttribute("data-status", game.mapStatus.PLAYER2);

        game.util.drawingMap();

        game.common.currentPlayer = 1;
    }

    function initWalls() {
        var $player1_walls = $('.player1_wall');
        var $player2_walls = $('.player2_wall');
        for (var i = 0; i < 21; i++) {
            // 1p 장애물
            if ($player1_walls[i].getAttribute('data-row') % 2 == 0) {
                // 짝수 행일 때
                $player1_walls[i].setAttribute("data-status", game.wallStatus.UNUSED);
                $player1_walls[i].height = '10px';
            }
            // 2p 장애물
            if ($player2_walls[i].getAttribute('data-row') % 2 == 0) {
                // 짝수 행일 때
                $player2_walls[i].setAttribute("data-status", game.wallStatus.UNUSED);
                $player2_walls[i].height = '10px';
            }
        }

        game.util.drawingWalls();
    }

    // init
    $(document).ready(function () {
        // init maps info
        initMaps();

        // init walls info
        initWalls();
    });
})(jQuery, window, document);