(function ($, window, document) {
    window.game = window.game || {};
    game.common = game.common || {};

    // 현재 플레이어 (1 : 1p || 2 : 2p)
    game.common.currentPlayer = 1;

    // 현재 플레이어의 액션 (상태값 game.actionStatus 참고)
    game.common.currentAction = 0;

    // 플레이어 현재 위치 인덱스
    game.common.indexPlayer = [8,280];

    // 플레이어 장애물 개수
    game.common.cntWall = [10,10];
    
    // TODO : 게임내의 색상 정의 (아래 HTML 색상표 참조)
    // https://www.w3schools.com/tags/ref_colornames.asp
    game.color = {
        RED : "red",
        BLUE : "blue",
        YELLOW : "yellow",
        BROWN : "brown",
        BLACK : "black",
        WHITE : "white",
        CRIMSON : "Crimson",
        CHARTREUSE : "Chartreuse"
    };

    // 게임내의 맵의 상태값 정의
    // NONE : 아무것도 못하는 위치 (default)
    // PLAYER1 : 1p 위치
    // PLAYER2 : 2p 위치
    // ABLE_PLAYER : 사람이 이동할 수 있는 위치
    // ABLE_WALL : 장애물이 놓아질 수 있는 위치
    // WALL : 장애물이 놓아진 위치
    game.mapStatus = {
        NONE : "0",
        PLAYER1 : "1",
        PLAYER2 : "2",
        ABLE_PLAYER : "3",
        ABLE_WALL : "4",
        WALL : "5"
    };

    // 게임내의 장애물의 상태값 정의
    // NONE : 아무것도 아닌 위치
    // UNUSED : 사용되지 않은 장애물(사용가능한 장애물)
    // USED : 사용한 장애물
    game.wallStatus = {
        NONE : "0",
        UNUSED : "1",
        USED : "2"
    };

    // 현재 플레이어의 액션 상태값 정의
    // NONE : 아무것도 안함
    // CLICKPLAYER : 플레이어 선택
    // CLICKWALL : 벽 선택
    game.actionStatus = {
        NONE : "0",
        CLICKPLAYER : "1",
        CLICKWALL : "2"
    };

    // TODO
    game.DfsMap = game.DfsMap || {};
    game.VisitMap = game.VisitMap || {};
    game.DfsAble = false;

})(jQuery, window, document);