function showProducts() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			//console.log(this.responseText);
			var productsRow = JSON.parse(this.responseText);
			//console.log(productsRow);
			var catalogTable = "";
			if (!productsRow.length) {
				catalogTable +=
					"<p>The catalog is empty. There are no products to show<br>" +
					"Add new products to the form on top of this page</p>";
			} else {
				catalogTable +=
					"<table class='table img-table table-striped'><thead>" +
					"<tr><th scope='col'>Image</th>" +
					"<th scope='col'>Name</th>" +
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

				for (var x = productsRow.length - 1; x >= 0; x--) {
					catalogTable += "<tr style='height: 80px;'><td>";
					var fileData = productsRow[x].fileData;
					if (fileData) {
						catalogTable +=
							"<div class='thumbnail'><img class='rounded thumbnail'    src='data:image/png;base64," +
							fileData.data +
							"'></div>";
					}
					catalogTable +=
						"</td><td class='font-weight-bold'>" +
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
						"</td><td>" +
						'<input type="checkbox" onchange="checkbackorderline(\'' +
						productsRow[x].id +
						"','" +
						productsRow[x].name +
						"','" +
						this +
						"')\">" +
						"</td><td>" +
						'<button type="button" class="btn btn-outline-secondary" onclick="editProduct(\'' +
						productsRow[x].id +
						"')\" id=ipedit>Edit</button>" +
						"</td><td>" +
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

function getLastFileDataId() {
	console.log("follow: in getLastFileDataId()");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log("follow: getLastFileDataId() readyState == 4");
			const lastFileDataID = JSON.parse(this.responseText);
			//console.log(lastFileDataID);
			postProduct(lastFileDataID);

			//var catalogTable = "";
		}
	};
	xhr.open("GET", "http://localhost:8082/getLastFileDataId", true);
	xhr.send();
}

function confirmPostProduct() {
	console.log("FIRST PART");
	console.log("follow: confirmPostProduct");
	var file = document.getElementById("ipfile").files[0];
	if (file) {
		console.log("follow: confirmPostProduct with file");
		handleFileSelect(file);
	} else {
		console.log("follow: confirmPostProduct without file");
		fileId = document.getElementById("fileDataIdhidden").value;
		document.getElementById("fileDataIdhidden").value = "";
		console.log("follow: hidden fileId = " + fileId);
		postProduct(fileId);
	}
}

function handleFileSelect(file) {
	var maxMbSize = 2; // 2MB appears to be the max for XHttpRequest send function
	if (file.size / 1_000_000 > maxMbSize) {
		console.log("follow: file size = " + file.size / 1_000_000);
		console.log("follow: file to big, max size = 2MB");
		return null;
	} else {
		console.log("follow: handle the file");
		//var file = document.getElementById('files').files[0]; // FileList object
		var reader = new FileReader();
		// Read in the image file as a data URL.
		if (file) {
			reader.readAsBinaryString(file);
		}
		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				console.log("MIDDLE PART");
				var fileData = {};
				const fileName = file.name;
				const lastDot = fileName.lastIndexOf(".");

				const name = fileName.substring(0, lastDot);
				const ext = fileName.substring(lastDot + 1);

				const binaryData = e.target.result;
				//Converting Binary Data to base 64
				const base64String = window.btoa(binaryData);

				fileData.name = name;
				fileData.extension = ext;
				fileData.data = base64String;

				postFileData(fileData);
			};
		})(file);
	}
}

function postFileData(fileData) {
	console.log("LAST PART");
	console.log("follow: inside postFileData");
	console.log(fileData.data);

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log("follow: postFileData() readyState == 4");
			getLastFileDataId();
		}
	};

	var objJSON = JSON.stringify(fileData);
	xhr.open("POST", "http://localhost:8082/postFileData", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
}

function postProduct(fileId) {
	console.log("follow: inside postProduct()");
	var editState = false;
	if (document.getElementById("ipaddoredit").innerHTML == "Update product") {
		console.log("follow: editState = true");
		editState = true;
	}
	var xhr = new XMLHttpRequest();
	var theObject = {};
	theObject.id = document.getElementById("idhidden").value;
	if (theObject.id) {
		console.log(
			"follow: The prodcut id form #idhidden in postProduct = " + theObject.id
		);
	}

	theObject.name = document.getElementById("ipname").value;
	theObject.price = document.getElementById("ipprice").value;
	theObject.eanCode = document.getElementById("ipeanCode").value;
	theObject.description = document.getElementById("ipdescription").value;
	theObject.length = document.getElementById("iplength").value;
	theObject.width = document.getElementById("ipwidth").value;
	theObject.height = document.getElementById("ipheight").value;
	theObject.weight = document.getElementById("ipweight").value;
	if (fileId) {
		theObject.fileData = { id: fileId };
	} else {
		console.log("follow: no fileId selected or found in hidden input field");
		console.log("follow: fileId = " + fileId);
	}

	var objJSON = JSON.stringify(theObject);
	xhr.onreadystatechange = function () {
		showProducts();
	};

	if (editState) {
		xhr.open("POST", "http://localhost:8082/editproduct", true);
		console.log("endpoint: /editproduct");
	} else {
		xhr.open("POST", "http://localhost:8082/newproduct", true);
		console.log("endpoint: /newproduct");
	}
	console.log(theObject);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);

	document.getElementById("ipname").value = "";
	document.getElementById("ipprice").value = "";
	document.getElementById("ipeanCode").value = "";
	document.getElementById("ipdescription").value = "";
	document.getElementById("iplength").value = "";
	document.getElementById("ipwidth").value = "";
	document.getElementById("ipheight").value = "";
	document.getElementById("ipweight").value = "";

	// document.getElementById("ipfile").files[0].name = null;
	document.getElementById("ipfile").value = "";
	document.getElementById("ipfileLabel").innerHTML = "Choose product image";
	if (editState) {
		console.log("end of edit product");
		document.getElementById("ipaddoredit").innerHTML = "Add product to catalog";
		document.getElementById("idhidden").value = "";
	} else {
		console.log("end of post product");
	}
}

function deleteProduct(id) {
	console.log("follow: in deleteProuct()");
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
			// document.getElementById("ipfile").value = product.fileData.data;
			// document.getElementById("ipfile").files[0] = product.fileData.data;
			var fileSelectText = "Choos product image";
			if (product.fileData) {
				document.getElementById("fileDataIdhidden").value = product.fileData.id;
				fileSelectText =
					product.fileData.name + "." + product.fileData.extension;
			}
			document.getElementById("ipfileLabel").innerHTML = fileSelectText;
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
					console.log(this.responseText);
					var boid = this.responseText;
					var bodyboid = {};
					bodyboid.id = boid;
					var list = document.getElementById("backorderTable").rows;
					for (var x = 1; x < list.length; ) {
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
			};
		}
	};
}
