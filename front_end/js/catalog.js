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
					"<th scope='col'>Length</th>" +
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
						'<input type="checkbox" onchange="checkbackorderline(\'' +
						productsRow[x].id +
						"','" +
						productsRow[x].name +
						"','" +
						this +
						"')\">" +
						"</td>" +
						"<td>" +
						'<button type="button" class="btn btn-outline-secondary" onclick="editProduct(\'' +
						productsRow[x].id +
						"')\" id=ipedit>Edit</button>" +
						"</td>" +
						"<td>" +
						'<button type="button" class="btn btn-outline-danger" onclick="deleteProduct(\'' +
						productsRow[x].id +
						"')\" >Delete</button>" +
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
	if (document.getElementById("ipaddoredit").innerHTML == "Update product") {
		var xhr = new XMLHttpRequest();
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
		theObject.id = document.getElementById("idhidden").value;
		document.getElementById("ipaddoredit").innerHTML = "Add product to catalog";

		xhr.onreadystatechange = function () {
			showProducts();
		};

		var objJSON = JSON.stringify(theObject);
		xhr.open("POST", "http://localhost:8082/editproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(objJSON);
	} else {
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
			showProducts(); //Andere function ook gebruiken voor hierboven.
		};
		xhr.open("POST", "http://localhost:8082/newproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(objJSON);
	}

	document.getElementById("ipname").value = "";
	document.getElementById("ipprice").value = "";
	document.getElementById("ipeanCode").value = "";
	document.getElementById("ipdescription").value = "";
	document.getElementById("iplength").value = "";
	document.getElementById("ipwidth").value = "";
	document.getElementById("ipheight").value = "";
	document.getElementById("ipweight").value = "";
}

function deleteProduct(id) {
	var youSure = confirm("Are you sure you want to delete this product?");
	if (youSure == true) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8082/deleteproduct", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(id);
	}
	xhr.onreadystatechange = function () {
		showProducts();
	};
}

function editProduct(id) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var product = JSON.parse(this.responseText);
			document.getElementById("ipname").value = product.name;
			document.getElementById("ipprice").value = product.price;
			document.getElementById("ipeanCode").value = product.eanCode;
			document.getElementById("iplength").value = product.length;
			document.getElementById("ipwidth").value = product.width;
			document.getElementById("ipheight").value = product.height;
			document.getElementById("ipweight").value = product.weight;
			document.getElementById("ipdescription").value = product.description;
			document.getElementById("ipaddoredit").innerHTML = "Update product";
			document.getElementById("idhidden").value = id;
		}
	};
	xhr.open("POST", "http://localhost:8082/getproduct", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(id);
}

function checkbackorderline(id, naam, check) {
	var table = document.getElementById("backorderTable");
	var rid = id;
	if (document.getElementById(rid) == null) {
		var row = table.insertRow(1);
		row.id = id;
		var inputid = "ip" + id;
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = naam;
		cell2.innerHTML = '<input type="number" id=\'' + inputid + "'>";
	} else {
		table.deleteRow(document.getElementById(rid).rowIndex);
	}
}

function sendbackorder() {
	var members = createDeliveries();	
	var table = document.getElementById("backorderTable");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8082/newBackOrder", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send("{}");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open("GET", "http://localhost:8082/getLatestBackOrderId", true);
			xhr2.send();
			xhr2.onreadystatechange = function () {
				if (this.readyState == 4) {
					console.log(members);
					console.log("nr of members: " + members.length);
					var delArr = createDeliveryArray((table.rows.length - 1), members);
					//console.log(this.responseText);
					var boid = this.responseText;
					var bodyboid = {};
					bodyboid.id = boid;
					var list = document.getElementById("backorderTable").rows;
					
					for (var x = 1, y = 0; x < list.length; ) {
						
						var inputid = "ip" + list[x].id;
						var amountp = document.getElementById(inputid).value;
						var prid = list[x].id;

						var theObject = {};
						var prbody = {};
						prbody.id = prid;
						theObject.backOrder = bodyboid;
						theObject.amount = amountp;
						theObject.product = prbody;
						var objJSON = JSON.stringify(theObject);
						console.log(objJSON);
						var xhr3 = new XMLHttpRequest();
						xhr3.open("POST", "http://localhost:8082/newBackOrderLine", true);
						xhr3.setRequestHeader("Content-Type", "application/json");
						xhr3.onreadystatechange = function(){
							if (this.readyState == 4){
								var xhr4 = new XMLHttpRequest();
								xhr4.open("POST", "http://localhost:8082/connectDeliveryLine/"+delArr[y]+"/"+this.responseText, true);
								xhr4.setRequestHeader("Content-Type", "application/json");
								xhr4.send();
								y++;
									
							}
						}
						xhr3.send(objJSON);
						document.getElementById("backorderTable").deleteRow(x);
					}

					showProducts();
					console.log("backorder verzonden");
				}
			};
		}
	};
}

function createDeliveries(){
	var table = document.getElementById("backorderTable");
	var nrOfLines = table.rows.length-1;
	var nrOfDeliveries = 1;	
	if (nrOfLines > 5) {
		var prob = Math.random();
		console.log("random nr: "+prob)
		nrOfDeliveries = (prob > 0.8) ? 3 : (prob > 0.3) ? 2 : 1;
	} else if (nrOfLines > 2) {
		var prob = Math.random();
		console.log("random nr: "+prob)
		nrOfDeliveries = (prob > 0.95) ? 3 : (prob > 0.75) ? 2 : 1;
	}
	console.log("nrOfDeliveries: "+nrOfDeliveries);
	var memberArray = [];
	for (var x = 1; x <= nrOfDeliveries; x++) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8082/newBODelivery", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send("{ \"member\":"+x+" }");
		xhr.onreadystatechange = function(){
			if (this.readyState == 4){
				memberArray.push(this.responseText);
			}
		}
	}
	return memberArray;
}

function createDeliveryArray(nrOfLines, deliveryMembers){
	var del = deliveryMembers.length;
	var array = new Array(nrOfLines);
	if (del == 1){
		for (var x = 0; x < array.length; x++){
			array[x] = deliveryMembers[0];
		}
	} else if (del == 2){
		for (var x = 0; x < array.length; x++){
			array[x] = ((x%2) == 1) ? deliveryMembers[1] : deliveryMembers[0];
		}
	} else {
		for (var x = 0; x < array.length; x++){
			array[x] = ((x%3) == 0) ? deliveryMembers[0] : ((x%3) == 1)? deliveryMembers[1] : deliveryMembers[2];
		}
	}
	console.log("deliveryarray: ");
	console.log(array);
	return array;
}