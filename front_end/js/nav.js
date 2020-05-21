function navload() {
	$(document).ready(function () {
		/* TERUGZETTEN NAAR LOGIN NA TESTEN */ $("#page-content").load(
			"pages/catalog.html"
		);
		showProducts(); /* VERWIJDER NA TESTEN */
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

	$("#link-BOdeliveries").click(function () {
		$("#page-content").load("pages/delivery.html");
		console.log("page login");
	});
}

function navigate(pagePath) {
	$("#page-content").load(pagePath);
	console.log("navigate to " + pagePath);
}
