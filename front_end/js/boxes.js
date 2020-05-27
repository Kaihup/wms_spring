/* BOX FUCNTIONS */
function showBoxes() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			//console.log(this.responseText);
			var boxesRow = JSON.parse(this.responseText);
			//console.log(boxesRow);
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
					"<th scope='col'>Current items CHECKED_IN</th>" +
					"<th scope='col'>Current items IN_STORAGE</th>" +
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
						boxesRow[x].currentItemsCheckedIn +
						"</td><td>" +
						boxesRow[x].currentItemsInStorage +
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
	xhr.open("GET", baseUrl + "/allboxes", true);
	xhr.send();
}

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
				productDropdown +=
					"<option selected disabled value =''> Choose...</option>";
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
	xhr.open("GET", baseUrl + "/allproducts", true);
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
	xhr.open("POST", baseUrl + "/newbox/" + productp, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
	document.getElementById("boxesTable");
}
