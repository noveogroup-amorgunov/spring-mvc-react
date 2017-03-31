<%@page session="false"%>
<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Export default</title>

  <meta name="description" content="">
  <meta name="author" content="Alexander Morgunov">

  <c:url var="home" value="/" scope="request" />
  <spring:url value="/resources/css/" var="css" />
  <spring:url value="/resources/js/" var="js" />
  <spring:url value="/resources/fonts/" var="fonts" />

  <link rel="stylesheet" href="${fonts}notoserif.css">
  <link rel="stylesheet" href="${fonts}font-awesome.css">
  <link rel="stylesheet" href="${css}my.css">
  <link rel="stylesheet" href="${css}bundle.css">
  <link rel="stylesheet" href="${css}loaders.min.css">
  <link rel="stylesheet" href="${css}question.css">
  <link rel="stylesheet" href="${css}prism.css">
  <!-- <link rel="stylesheet" href="${css}loader-default.css"> -->

  <script>
    window.config = { basename: '/spring4ajax' };
  </script>

</head>
<body>
  <div id="app" class="wrapper"></div>
  <script src="${js}/bundle.js"></script>
  <script src="${js}/prism.js"></script>
</body>
</html>
