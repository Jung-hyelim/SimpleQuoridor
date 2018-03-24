<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
<head>
    <title>Simple Quoridor</title>
    <link href="<c:url value="/static/css/game.css"/>" rel="stylesheet">
</head>
<body>
<h2><span id="showCurrentPlayer">1</span>P</h2>
<table class="walls player1_walls">
    <c:forEach var="i" begin="1" end="21">
        <tr>
            <td class="player1_wall" data-row="${i}" data-status="0"></td>
        </tr>
    </c:forEach>
</table>
<table class="maps">
    <c:forEach var="i" begin="1" end="17">
        <tr>
            <c:forEach var="j" begin="1" end="17">
                <td class="map" data-row="${i}" data-col="${j}" data-status="0"></td>
            </c:forEach>
        </tr>
    </c:forEach>
</table>
<table class="walls player2_walls">
    <c:forEach var="i" begin="1" end="21">
        <tr>
            <td class="player2_wall" data-row="${i}" data-status="0"></td>
        </tr>
    </c:forEach>
</table>
</body>
<script src="<c:url value="/static/lib/jquery.min.js"/>"></script>
<script src="<c:url value="/static/js/common.js"/>"></script>
<script src="<c:url value="/static/js/util.js"/>"></script>
<script src="<c:url value="/static/js/game.js"/>"></script>
<script src="<c:url value="/static/js/map.js"/>"></script>
<script src="<c:url value="/static/js/wall.js"/>"></script>
<script src="<c:url value="/static/js/validate.js"/>"></script>
</html>
