<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
<head>
    <title>Simple Quoridor</title>
</head>
<body>
<table border="1" width="700" height="700">
    <c:forEach var="i" begin="1" end="17">
        <tr>
            <c:forEach var="j" begin="1" end="17">
                <td class="map" data-row="${i}" data-col="${j}"></td>
            </c:forEach>
        </tr>
    </c:forEach>
</table>
</body>
<%--TODO : lee sang pil : javascript refactoring--%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
    (function ($, window, document) {
        $(document).ready(function () {

            // TODO : lee sang pil : init mapInfo
            var mapBtn = "<button><img src='http://www.clker.com/cliparts/m/Q/d/l/c/7/brown-square-hi.png' width='70' height='70'></button>";
            var $maps = $('.map');
            for (var i = 0; i < 289; i++) {
                if ($maps[i].getAttribute('data-row') % 2 == 1 &&
                    $maps[i].getAttribute('data-col') % 2 == 1) {
                    $maps[i].innerHTML = mapBtn;
                }
            }

            // TODO : lee sang pil : 플레이어의 턴 확인 (1p, 2p toggle)
            // TODO : lee sang pil : 그런데 이거 플레이어 이름 등록 프로세스를 전처리로 할 것인가?(의논이 필요함.)
            var currentPlayer = "";
            alert(currentPlayer + " 차례입니다.");

            // 맵을 클릭하면 이동한다.
            $maps.on("click", function () {
                // TODO : lee sang pil : 현재 위치에서 이동가능한 위치인지 validation check
                // alert("해당 위치로는 이동할 수 없습니다.")

                if (confirm("정말 이동하시겠습니까?")) {
                    // TODO : ajax call (혜림이가 api 제공해 주어야 함.)

                    // TODO : ajax call callback method (Init MapInfo?)
                }

            });

            // TODO : lee sang pil : 장애물을 설치한다.(장애물은 두곳(table)을 막아야 한다.)
            // TODO : lee sang pil : 문제가있다.. (UI와 UX를 두개다 고려해야 한다.)
        });
    })(jQuery, window, document);
</script>
</html>
