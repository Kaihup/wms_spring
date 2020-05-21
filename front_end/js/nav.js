function navload() {
	$(document).ready(function () {
		$("#page-content").load("pages/login.html");
	});

	$("#link-login").click(function () {
		$("#page-content").load("pages/login.html");
		console.log("page login");
	});

	$("#link-catalog").click(function () {
		$("#page-content").load("pages/catalog.html");
		showProducts();
		console.log("page catalog");
	});

	$("#link-boxes").click(function () {
		$("#page-content").load("pages/boxes.html");
		showBoxes();
		productDropdown();
		console.log("page boxes");
	});
}

function navigate(pagePath) {
	$("#page-content").load(pagePath);
	console.log("navigate to " + pagePath);
}