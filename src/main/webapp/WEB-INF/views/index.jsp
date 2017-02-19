<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
<head>
    <title>시작페이지</title>
</head>
<body>
    <button class="btnStart">게임 시작</button>
</body>
</html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
    var btnStart = $('.btnStart');

    btnStart.on('click', function() {
       location.href = "/start";
    });

</script>