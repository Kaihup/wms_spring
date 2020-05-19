<<<<<<< HEAD
function navload() {
	$("#link-login").click(function () {
		$("#page-content").load("pages/login.html");
		console.log("page login");
	});

	$("#link-catalog").click(function () {
		$("#page-content").load("pages/catalog.html");
		console.log("page catalog");
	});
}
=======
function navload(){
    $("#link-login").click(function() {
		$("#page-content").load("pages/login.html");
		console.log("page login");
  });

  $("#link-catalog").click(function() {
    $("#page-content").load("pages/catalog.html");
    console.log("page catalog");
    showProducts();
  });

  $("#link-registercustomer").click(function(){
    alert("boe");
    $("#page-content").load("pages/register-customer.html");
    console.log("customer register");
  });



}
>>>>>>> master
