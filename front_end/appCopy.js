window.onload = showProducts();

function showProducts() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var productsRow = JSON.parse(this.responseText);
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
					"<th scope='col'>Id-button</th></tr>" +
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
						"<button type=\"button\" class=\"btn btn-warning\" onclick=\"showProduct('"+productsRow[x].id+"')\">show ID</button>" +
						"</td>";
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

function showProduct(id){	
	console.log("Product ID: "+id);
}

function checkbackorderline(id, naam, check){
	var table = document.getElementById("backorderTable");
	var rid = id;
	if (document.getElementById(rid)== null){
		var row = table.insertRow(1);
		row.id = id;
		var inputid = "ip"+id;
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = naam;
		cell2.innerHTML = "<input type=\"number\" id='"+inputid+"'>";
	} else {
		table.deleteRow(document.getElementById(rid).rowIndex);
	}	
}


function sendbackorder(){
	var table = document.getElementById("backorderTable");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8082/newBackOrder", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send("{}");
	xhr.onreadystatechange = function() {
		if (this.readyState == 4){
			var xhr2 = new XMLHttpRequest();
			xhr2.open("GET", "http://localhost:8082/getLatestBackOrderId", true);
			xhr2.send();
			xhr2.onreadystatechange = function () {
				if (this.readyState == 4) {
					console.log(this.responseText);
					var boid = this.responseText;
					var bodyboid = {};
					bodyboid.id = boid;
					var list = document.getElementById("backorderTable").rows;
					for(var x = 1; x < list.length; ){
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
						xhr3.send(objJSON);
						document.getElementById("backorderTable").deleteRow(x);
					
					} 
					
					showProducts();
					console.log("backorder verzonden");
				}	
			}		
		}	
	}
}
