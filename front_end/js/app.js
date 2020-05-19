/* PRODUCT FUCNTIONS */

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
