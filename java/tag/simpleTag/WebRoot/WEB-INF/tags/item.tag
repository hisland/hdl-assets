<%@ tag pageEncoding="UTF-8"%>
<%@ attribute name="name" %>
<%@ attribute name="id" %>
<%@ attribute name="text" %>
<div class="ls1-item">
	<div class="ls1-text">${ text }:</div>
	<div class="ls1-ipts">
		<jsp:doBody />
	</div>
</div>