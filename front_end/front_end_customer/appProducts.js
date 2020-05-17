window.onload = showProducts();

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
					"<th scope='col'>Weight</th>" +
					"<th scope='col'>Backorder</th>" +
					"<th scope='col'>Edit</th>" + 
					"<th scope='col'>Delete</th></tr>" +
					"</thead><tbody>";

				for (var x = 0; x < productsRow.length; x++) {
					catalogTable +=
						"<tr><td>" +
						productsRow[x].name +
						"</td>" +
						"<td>" +
						productsRow[x].inStock +
						"</td>" +
						"<td>" +
						productsRow[x].price +
						"</td>" +
						"<td>" +
						productsRow[x].eanCode +
						"</td>" +
						"<td>" +
						productsRow[x].description +
						"</td>" +
						"<td>" +
						productsRow[x].length +
						"</td>" +
						"<td>" +
						productsRow[x].width +
						"</td>" +
						"<td>" +
						productsRow[x].height +
						"</td>" +
						"<td>" +
						productsRow[x].weight +
						"</td>" +
						"<td>" +
						"<input type=\"checkbox\" onchange=\"checkbackorderline('"+productsRow[x].id+"','"+productsRow[x].name+"','"+this+"')\">" +
						"</td>" +
						"<td>" +
						"<button type=\"button\" class=\"btn btn-warning\" onclick=\"editProduct('"+productsRow[x].id + "')\" id=ipedit>Edit</button>" +
						"</td>" +
						"<td>" +
						"<button type=\"button\" class=\"btn btn-warning\" onclick=\"deleteProduct('"+productsRow[x].id+"')\" >Delete</button>" +
						"</td></tr>";
				}
				catalogTable += "</tbody></table>";
			}
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
	// xhr.onreadystatechange = function(){
	//     alert("The product is saved");
	// }
	xhr.open("POST", "http://localhost:8082/newproduct", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
}

function deleteProduct(id){	
	var youSure = confirm("Are you sure you want to delete this product?");
	if (youSure == true) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8082/deleteproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(id);
	  } 
}

function editProduct(id){
	var xhr = new XMLHttpRequest();
	var changeProduct = document.getElementById("ipedit").innerHTML;
	if(changeProduct == "Update"){
		var theObject = {};
		theObject.name = document.getElementById("ipname").value;
		theObject.price = document.getElementById("ipprice").value;
		theObject.eanCode = document.getElementById("ipeanCode").value;
		theObject.description = document.getElementById("ipdescription").value;
		theObject.length = document.getElementById("iplength").value;
		theObject.width = document.getElementById("ipwidth").value;
		theObject.height = document.getElementById("ipheight").value;
		theObject.weight = document.getElementById("ipweight").value;
		document.getElementById("ipedit").innerHTML = "Edit";
		theObject.id = id;
	
		var objJSON = JSON.stringify(theObject);
		xhr.open("POST", "http://localhost:8082/editproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(objJSON);
	}

	else if(changeProduct == "Edit"){
		xhr.onreadystatechange = function() {
			if(this.readyState == 4){
				var product = JSON.parse(this.responseText);
				document.getElementById("ipname").value = product.name;
				document.getElementById("ipprice").value = product.price;
				document.getElementById("ipeanCode").value = product.eanCode;
				document.getElementById("iplength").value = product.length;
				document.getElementById("ipwidth").value = product.width;
				document.getElementById("ipheight").value = product.height;
				document.getElementById("ipweight").value = product.weight;
				document.getElementById("ipdescription").value = product.description;
				document.getElementById("ipedit").innerHTML = "Update";
			}
		}
		xhr.open("POST", "http://localhost:8082/getproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(id);
	}
}