(function ($, window, document) {
	
    // 장애물을 클릭했을때 발생하는 이벤트
    function clickWall() {
        var $player1_walls = $('.player1_wall');
        var $player2_walls = $('.player2_wall');
        
        $player1_walls.on("click", function() {
    		// 현재 플레이어가 1p인지 확인
        	if (game.common.currentPlayer != 1) {
        		return false;
        	}

        	// 현재 플레이어의 남은 장애물 개수 판단
            if (game.common.cntWall[game.common.currentPlayer-1] <= 0 ) {
                return false;
            }
        	
        	// 클릭한 장애물의 상태가 미사용 장애물인지 확인
        	if (this.getAttribute("data-status") != game.wallStatus.UNUSED) {
        		return false;
        	}
        	
        	// action 상태값 변경
        	game.common.currentAction = game.actionStatus.CLICKWALL;
    	});

        $player2_walls.on("click", function() {
    		// 현재 플레이어가 2p인지 확인
        	if (game.common.currentPlayer != 2) {
        		return false;
        	}

        	// 현재 플레이어의 남은 장애물 개수 판단
            if (game.common.cntWall[game.common.currentPlayer-1] <= 0 ) {
                return false;
            }
        	
        	// 클릭한 장애물의 상태가 미사용 장애물인지 확인
        	if (this.getAttribute("data-status") != game.wallStatus.UNUSED) {
        		return false;
        	}
        	
        	// action 상태값 변경
        	game.common.currentAction = game.actionStatus.CLICKWALL;
    	});

    };

    // Main function
    $(document).ready(function () {
        // click event binding
        clickWall();

    });
})(jQuery, window, document);