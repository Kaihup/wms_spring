/* BOX FUCNTIONS */
function showBoxes() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var boxesRow = JSON.parse(this.responseText);
			console.log(boxesRow);
			var boxesTable = "";
			if (!boxesRow.length) {
				boxesTable +=
					"<p>There are no boxes to show.<br>" +
					"Add new boxes to the form on top of this page.</p>";
			} else {
				boxesTable +=
					"<table class='table table-striped'><thead>" +
					"<tr><th scope='col'> Box </th>" +
					"<th scope='col'>Product</th>" +
					"<th scope='col'>Current items in box</th>" +
					"<th scope='col'>Max items</th>" +
					"<th scope='col'>Lenght</th>" +
					"<th scope='col'>Width</th>" +
					"<th scope='col'>Height</th>" +
					"<th scope='col'>Max weight</th>" +
					"<th scope='col'>Edit</th>" +
					"<th scope='col'>Delete</th></tr>" +
					"</thead><tbody>";

				for (var x = 0; x < boxesRow.length; x++) {
					boxesTable +=
						"<tr><td>" +
						boxesRow[x].id +
						"</td><td>" +
						boxesRow[x].product.name +
						"</td><td>" +
						// Items in box
						"</td><td>" +
						boxesRow[x].maxProductItems +
						"</td><td>" +
						boxesRow[x].length +
						"</td><td>" +
						boxesRow[x].width +
						"</td><td>" +
						boxesRow[x].height +
						"</td><td>" +
						boxesRow[x].maxWeight +
						"</td><td>" +
						"<button type='button' class='btn btn-outline-dark btn-sm'>edit</button>" +
						"</td><td>" +
						"<button type='button' class='btn btn-outline-danger btn-sm'>delete</button>" +
						"</td>";
				}

				boxesTable += "</tbody></table>";
			}
			document.getElementById("boxesTable").innerHTML = boxesTable;
		}
	};
	xhr.open("GET", "http://localhost:8082/allboxes", true);
	xhr.send();
}

function postBox() {
	// var idp = document.getElementById("ipid").value;
	var productp = document.getElementById("ipproduct").value;
	var maxProductItemsp = document.getElementById("ipmaxProductItems").value;
	var lengthp = document.getElementById("iplength").value;
	var widthp = document.getElementById("ipwidth").value;
	var heightp = document.getElementById("ipheight").value;
	var maxWeightp = document.getElementById("ipmaxWeight").value;

	// var deletep = document.getElementById("ipdelete").value;

	var theObject = {};
	// theObject.product = {};

	theObject.maxProductItems = maxProductItemsp;
	theObject.length = lengthp;
	theObject.width = widthp;
	theObject.height = heightp;
	theObject.maxWeight = maxWeightp;
	// theObject.edit = editp;
	// theObject.delete = deletep ;

	var objJSON = JSON.stringify(theObject);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		console.log("The Box is saved");
		showBoxes();
	};
	xhr.open("POST", "http://localhost:8082/newbox/" + productp, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
	document.getElementById("boxesTable");
}

/* PRODUCT FUCNTIONS */

function productDropdown() {
	var jojo = document.getElementById("ipproduct");
	console.log(jojo);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var productsRow = JSON.parse(this.responseText);
			console.log(productsRow);
			var productDropdown = "";
			if (!productsRow.length) {
				//productsproductDropdownDropdown += // add: option disabled: No products
			} else {
				for (var x = 0; x < productsRow.length; x++) {
					productDropdown +=
						"<option value='" +
						productsRow[x].id +
						"'>" +
						productsRow[x].name +
						"</option>";
				}
			}
			document.getElementById("ipproduct").innerHTML = productDropdown;
		}
	};
	xhr.open("GET", "http://localhost:8082/allproducts", true);
	xhr.send();
}

/*
function showProducts() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var productsRow = JSON.parse(this.responseText);
			console.log(productsRow);
			var catalogTable = "";
			if (!productsRow.length) {
				catalogTable +=
					"<p>The catalog is empty. There are no products to show<br>" +
					"Add new products to the form on top of this page</p>";
			} else {
				catalogTable +=
					"<table class='table table-striped'><thead>" +
					"<tr><th scope='col'> Name </th>" +
					"<th scope='col'>In Stock</th>" +
					"<th scope='col'>Price</th>" +
					"<th scope='col'>EAN code</th>" +
					"<th scope='col'>Description</th>" +
					"<th scope='col'>Lenght</th>" +
					"<th scope='col'>Width</th>" +
					"<th scope='col'>Height</th>" +
					"<th scope='col'>Weight</th></tr>" +
					"</thead><tbody>";

				for (var x = 0; x < productsRow.length; x++) {
					catalogTable +=
						"<tr><td>" +
						productsRow[x].name +
						"</td><td>" +
						productsRow[x].inStock +
						"</td><td>" +
						productsRow[x].price +
						"</td><td>" +
						productsRow[x].eanCode +
						"</td><td>" +
						productsRow[x].description +
						"</td><td>" +
						productsRow[x].length +
						"</td><td>" +
						productsRow[x].width +
						"</td><td>" +
						productsRow[x].height +
						"</td><td>" +
						productsRow[x].weight +
						"</td>";
				}
				catalogTable += "</tbody></table>";
			}

			console.log(
				document.getElementsByTagName("html")[0].children[1].children[0]
					.children[1].children[0].children[5]
			);
			console.log(document.getElementById("catalogTable"));
			document.getElementById("catalogTable").innerHTML = catalogTable;
		}
	};
	xhr.open("GET", "http://localhost:8082/allproducts", true);
	xhr.send();
}

function postProduct() {
	var namep = document.getElementById("ipname").value;
	var pricep = document.getElementById("ipprice").value;
	var eanCodep = document.getElementById("ipeanCode").value;
	var descriptionp = document.getElementById("ipdescription").value;
	var lengthp = document.getElementById("iplength").value;
	var widthp = document.getElementById("ipwidth").value;
	var heightp = document.getElementById("ipheight").value;
	var weightp = document.getElementById("ipweight").value;

	var theObject = {};
	theObject.name = namep;
	theObject.price = pricep;
	theObject.eanCode = eanCodep;
	theObject.description = descriptionp;
	theObject.length = lengthp;
	theObject.width = widthp;
	theObject.height = heightp;
	theObject.weight = weightp;

	var objJSON = JSON.stringify(theObject);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		console.log("The product is saved");
		showProducts();
	};
	xhr.open("POST", "http://localhost:8082/newproduct", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
	document.getElementById("catalogTable");
}
*/