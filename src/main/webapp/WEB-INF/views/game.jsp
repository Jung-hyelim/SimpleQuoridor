<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
<head>
    <title>Simple Quoridor</title>
</head>
<body>
<style>
    /*전체 맵에 대한 css*/
    .maps {
        background-color: #d9d9d9;
        width: 700px;
        height: 700px;
        border: 1px solid black;
        margin-top: 50px;
    }
    /*개별 맵에 대한 css*/
    .map {
        background-color: brown;
        text-align: center;
    }
</style>

<table class="maps" align="center">
    <c:forEach var="i" begin="1" end="17">
        <tr>
            <c:forEach var="j" begin="1" end="17">
                <td class="map" data-row="${i}" data-col="${j}" data-status="0"></td>
            </c:forEach>
        </tr>
    </c:forEach>
</table>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
    (function ($, window, document) {
    	// 현재 플레이어
    	// 1 : 1p
    	// 2 : 2p
    	var currentPlayer = 1;
    	
    	// 맵을 초기화 한다.
        // TODO : data-status 정의 필요
        // 0 : 아무것도 못하는 위치 (default)
        // 1 : 1p 위치
        // 2 : 2p 위치
        // 3 : 사람이 이동할 수 있는 위치
        // 4 : 장애물이 놓아질 수 있는 위치
        // 5 : 장애물이 놓아진 위치
        function initMap() {
            var $maps = $('.map');
            for (var i = 0; i < 289; i++) {
                if ($maps[i].getAttribute('data-row') % 2 == 0) {
                    // 짝수 행일 때
                    if ($maps[i].getAttribute('data-col') % 2 == 0) {
                        // 짝수 열이면
                        $maps[i].setAttribute("data-status", "3");
                    } else {
                        // 홀수 열이면
                        $maps[i].height = '10px';
                        $maps[i].setAttribute("data-status", "4");
                    }
                } else {
                    // 홀수 행일 때
                    if ($maps[i].getAttribute('data-col') % 2 == 0) {
                        // 짝수 열이면
                        $maps[i].width = '5px';
                        $maps[i].setAttribute("data-status", "4");
                    } else {
                        // 홀수 열이면
                        $maps[i].width = '40px';
                        $maps[i].setAttribute("data-status", "3");
                    }
                }

                // 아무것도 못하는 위치 설정
                if ($maps[i].getAttribute('data-row') % 2 == 0 &&
                    $maps[i].getAttribute('data-col') % 2 == 0) {
                    $maps[i].setAttribute("data-status", "0");
                }
            }
            // 1p 초기위치
            $maps[8].setAttribute("data-status", "1");
            // 2p 초기위치
            $maps[280].setAttribute("data-status", "2");

            drawingMap();
            
            currentPlayer = 1;
        }

        // 좌표를 로깅한다
        function loggingPosition(realX, realY) {
            // 게임상의 좌표 x,y
            var x = parseInt(realX / 2 + 1);
            var y = parseInt(realY / 2 + 1);

            console.log("x : " + x + ", y : " + y);
            console.log("실제 x : " + realX + ", y : " + realY);
        }

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

                    // re-render
                    drawingMap();
                    
                    // 플레이어 턴 변경
                    currentPlayer = (currentPlayer % 2 == 0 ? 1 : 2);
                }
            });
        }

        // TODO : 2차원 배열 좌표로 1차원 배열 좌표를 반환하는 함수가 필요 (validatePosition 함수 내에서 사용)
        function getArrayIndex(realX, realY) {
            var x = parseInt(realX);
            var y = parseInt(realY);
            return (x - 1)*17 + y - 1;
        }

        // 이동할 수 있는 위치인지 판단한다.
        function validatePosition(realX, realY) {
            loggingPosition(realX, realY);

            var arrayIndex = getArrayIndex(realX, realY);
            console.log("1차원 배열값 :" + arrayIndex);

            // TODO : 내위치 에서 한번에 이동할 수 있는 거리인지 판단

            // TODO : 현재 맵에 장애물 위치 판단

            // TODO : 현재 맵에 상대방 위치 판단

            return true;
        }

        // 실제 이동한다.
        function move(realX, realY) {
            // TODO : data-status 값 변환
            var $maps = $('.map');
            
            // 현재 플레이어의 현재위치 data-status 값 변환
            for(var i = 0; i < 289; i++){
            	if($maps[i].getAttribute('data-status') == currentPlayer){
            		$maps[i].setAttribute("data-status", "3");
            		break;
            	}
            }
            
            // 현재 플레이어의 이동위치 data-status 값 변환
        	$maps[getArrayIndex(realX, realY)].setAttribute("data-status", currentPlayer);
        }

        // status값을 보고 맵 색상을 변환한다
        function drawingMap() {
            var $maps = $('.map');
            for (var i = 0; i < 289; i++) {
                if ($maps[i].getAttribute('data-status') == "1") {
                    $maps[i].style.backgroundColor = "red";
                } else if ($maps[i].getAttribute('data-status') == "2") {
                    $maps[i].style.backgroundColor = "blue";
                } else if ($maps[i].getAttribute('data-status') == "3") {
                    $maps[i].style.backgroundColor = "brown";
                } else if ($maps[i].getAttribute('data-status') == "4") {
                    $maps[i].style.backgroundColor = "black";
                } else if ($maps[i].getAttribute('data-status') == "5") {
                    $maps[i].style.backgroundColor = "yellow";
                } else {
                    $maps[i].style.backgroundColor = "white";
                }
            }
        }

        // Main function
        $(document).ready(function () {
            // init map info
            initMap();

            // click event binding
            clickMap();

        });
    })(jQuery, window, document);
</script>
</html>
