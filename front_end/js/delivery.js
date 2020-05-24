function showDeliveries() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			//console.log(this.responseText);
			var deliveryRows = JSON.parse(this.responseText);
			//console.log(productsRow);
			var deliveryTable = "";
			if (!deliveryRows.length) {
				deliveryTable +=
					"<p>The delivery overview is empty. There are no deliveries to show<br>";
			} else {
				deliveryTable +=
					"<table class='table table-striped'><thead>" +
					"<tr><th scope='col' onclick=sortTable(0)>BackOrder ID</th>" +
					"<th scope='col' onclick=sortTable(1)>BackOrderDelivery ID</th>" +
					"<th scope='col' onclick=sortTable(2)>Status</th>" +
					"<th scope='col' onclick=sortTable(3)>Delivery date</th>" +
					"<th scope='col' onclick=sortTable(4)>License plate</th>" +
					"<th scope='col'>Details</th>" +
					"</tr>" +
					"</thead><tbody>";

				for (var x = 0; x < deliveryRows.length; x++) {
					//if(deliveryRows[x].currentStatus == "COMPLETE") continue;
					var showOrStore = (deliveryRows[x].currentStatus == "COMPLETE") ? "Store" : "Show";
					deliveryTable +=
						"<tr id=" +
						deliveryRows[x].id +
						"><td>" +
						deliveryRows[x].lines[0].backOrder.id +
						"</td>" +
						"<td>" +
						deliveryRows[x].id +
						"</td>" +
						"<td>" +
						deliveryRows[x].currentStatus +
						"</td>" +
						"<td>" +
						deliveryRows[x].deliveryDate +
						"</td>" +
						"<td>" +
						deliveryRows[x].licensePlateDeliverer +
						"</td>" +
						"<td>" +
						'<button type="button" class="btn btn-outline-secondary" onclick=changeWindow(' +
						deliveryRows[x].id +
						")>"+ showOrStore +"</button>" +
						"</td>" +
						"</tr>";
				}
				deliveryTable += "</tbody></table>";
			}
			document.getElementById("deliveryTable").innerHTML = deliveryTable;
		}
	};
	xhr.open("GET", "http://localhost:8082/allBODeliveries", true);
	xhr.send();
}

function markDeliveryArrived() {
	var delId = document.getElementById("ipbodid").value;
	var licensePlate = document.getElementById("iplicense").value;
	var row = document.getElementById("" + delId + "");
	if (row == null) {
		alert("This delivery can't be marked as arrived.");
	} else if (row.cells[2].innerHTML == "EXPECTED") {
		console.log("YESS");
		var xhr = new XMLHttpRequest();
		xhr.open(
			"POST",
			"http://localhost:8082/setDeliveryArrived/" + delId + "/" + licensePlate,
			true
		);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				showDeliveries();
				document.getElementById("ipbodid").value = "";
				document.getElementById("iplicense").value = "";
			}
		};
		xhr.send();
	} else {
		alert("This delivery can't be marked as arrived.");
	}
}

function changeWindow(deliveryId){
    sessionStorage.setItem("showDeliveryId", deliveryId);
    navigateShow('pages/delivery-details.html', pageDetails);
}

function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("deliveryTable").getElementsByTagName("TABLE")[0];
	console.log(table);
	switching = true;
	dir = "asc";
	while (switching) {
	  switching = false;
	  rows = table.rows;
	  for (i = 1; i < (rows.length - 1); i++) {
		shouldSwitch = false;
		x = rows[i].getElementsByTagName("TD")[n];
		y = rows[i + 1].getElementsByTagName("TD")[n];
		if (dir == "asc") {
		  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			shouldSwitch = true;
			break;
		  }
		} else if (dir == "desc") {
		  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			shouldSwitch = true;
			break;
		  }
		}
	  }
	  if (shouldSwitch) {
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		switchcount ++;
	  } else {
		if (switchcount == 0 && dir == "asc") {
		  dir = "desc";
		  switching = true;
		}
	  }
	}
  }