/* LOAD HEAD HEADER AND FOOTER */
$(document).ready(function () {
	$("#header").load("core-structure/header.html");
	$("#footer").load("core-structure/footer.html");
	$("#page-content").load("pages/catalog.html");
	showProducts();
});
