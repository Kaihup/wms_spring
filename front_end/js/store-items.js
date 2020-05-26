/*function pageStoreItems(){
    //console.log("JAJA");
    var deliveryId = sessionStorage.getItem("showDeliveryId");
    console.log(deliveryId);
    document.getElementById("showDId").innerHTML = deliveryId;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8082/getBODelivery/"+deliveryId, true);
	xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            //console.log(this.responseText);
            var object = JSON.parse(this.responseText);
            console.log(object);
            document.getElementById("showBOId").innerHTML = object.lines[0].backOrder.id;
            document.getElementById("showDDate").innerHTML = object.deliveryDate;
            document.getElementById("showDeviating").innerHTML = object.deviating;
            document.getElementById("showStatus").innerHTML = object.currentStatus;
            var storeItemsTable = "<table class='table img-table table-striped'><thead>" +
                "<tr><th scope='col'>Product name</th>" +
                "<th scope='col'>Amount ordered</th>" +
                "<th scope='col'>Amount to store</th>" +
                "<th scope='col'>Actually stored</th>" +
                "<th scope='col'>Store in Box no.</th>" +
                "<th scope='col'>Confirmation</th></tr>" +
                "</thead><tbody>";
            for (var x=0; x<object.lines.length;x++){
                var amountToStore = object.lines[x].amountReceived;
                //console.log(object.lines[x]);
                //console.log(object.lines[x]);
                //console.log(object.lines[x]);
                var xhr1 = new XMLHttpRequest();
                xhr1.open("GET", "http://localhost:8082/findEmptySpots/"+ object.lines[x].product.id +
                    "/"+ object.lines[x].amountReceived, false);
                xhr1.setRequestHeader("Content-Type", "application/json");
                xhr1.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        var boxes = JSON.parse(this.responseText);
                        for(var y=0; y < boxes.length; y++){
                            console.log(boxes);
                            var box = boxes[y];
                            var availableAmount = box.maxProductItems - box.currentItems;
                            var storeAmount = (amountToStore >= availableAmount) ? 
                                availableAmount : amountToStore;
                            amountToStore -= storeAmount;
                            console.log(object);
                            console.log(x);
                            var showName = (y==0) ? object.lines[x].product.name : "";
                            var showAmount = (y==0) ? object.lines[x].amountReceived : "";
                            storeItemsTable += "<tr><td>"+showName+"</td>" +
                                "<td >"+ showAmount +"</td>" +
                                "<td id=ipToStore"+x+y+">"+ storeAmount +"</td>" +
                                "<td><input type=\"number\" class=\"form-control\" " +
                                    "id=ipActuallyStored"+x+y+" oninput=confirmButtonCheck("+x+","+y+")></td>" +
                                "<td id=ipBoxID"+x+y+">"+ box.id +"</td>" +
                                "<td><button type=\"button\" class=\"btn btn-outline-warning\"" +
                                    " id=ipConfirmStorage"+x+y+" onclick=confirmStorage("+x+","+y+")>Confirm</button></td></tr>";
                            
                        }
                        document.getElementById("storeItemsTable").innerHTML = storeItemsTable;
                    }
                }
                xhr1.send();                
            }
        }
    }
    xhr.send();    
}*/

function pageStoreItems() {
	//console.log("JAJA");
	var deliveryId = sessionStorage.getItem("showDeliveryId");
	console.log(deliveryId);
	document.getElementById("showDId").innerHTML = deliveryId;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", baseUrl + "/getStorageLines/" + deliveryId, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			//console.log(this.responseText);
			var object = JSON.parse(this.responseText);
			console.log(object);
			document.getElementById("showBOId").innerHTML =
				object[0].delivery.lines[0].backOrder.id;
			document.getElementById("showDDate").innerHTML =
				object[0].delivery.deliveryDate;
			document.getElementById("showDeviating").innerHTML =
				object[0].delivery.deviating;
			document.getElementById("showStatus").innerHTML =
				object[0].delivery.currentStatus;
			var storeItemsTable =
				"<table class='table img-table table-striped'><thead>" +
				"<tr><th scope='col'>Product name</th>" +
				"<th scope='col'>Amount received</th>" +
				"<th scope='col'>Amount to store</th>" +
				"<th scope='col'>Actually stored</th>" +
				"<th scope='col'>Store in Box no.</th>" +
				"<th scope='col'>Confirmation</th></tr>" +
				"</thead><tbody>";
			var line = 1;
			for (var x = 0; x < object.length; x++) {
				var showName =
					x > 0
						? object[x].product.id == object[x - 1].product.id
							? ""
							: object[x].product.name
						: object[x].product.name;
				var showAmount = object[x].delivery.lines[0].amountReceived;
				if (x > 0) {
					if (object[x].product.id == object[x - 1].product.id) {
						showAmount = "";
					} else {
						showAmount = object[x].delivery.lines[line].amountReceived;
						line++;
					}
				}
				var id = object.id;
				storeItemsTable +=
					"<tr><td>" +
					showName +
					"</td>" +
					"<td >" +
					showAmount +
					"</td>" +
					"<td id=ipToStore" +
					id +
					">" +
					object[x].amountToStore +
					"</td>" +
					'<td><input type="number" class="form-control" value=' +
					object[x].actuallyStored +
					" id=ipActuallyStored" +
					id +
					" oninput=confirmButtonCheck(" +
					id +
					")></td>" +
					"<td id=ipBoxID" +
					id +
					">" +
					object[x].box.id +
					"</td>" +
					'<td><button type="button" class="btn btn-outline-warning"' +
					" id=ipConfirmStorage" +
					id +
					" onclick=confirmStorage(" +
					id +
					"," +
					object[x].id +
					")>Confirm</button></td></tr>";
			}
			document.getElementById("storeItemsTable").innerHTML = storeItemsTable;
		}
	};
	xhr.send();
}

function confirmStorage(id, storageLineId) {
	var a = document.getElementById("ipActuallyStored" + id).value;
	var b = document.getElementById("ipToStore" + id).innerHTML;
	if (a != b) {
		alert(
			"The actually stored amount does not equal the amount to store. Are you sure you counted right?"
		);
		return;
	}
	document.getElementById("ipActuallyStored" + id).disabled = true;
	document.getElementById("ipConfirmStorage" + id).innerHTML = "Confirmed";
	document.getElementById("ipConfirmStorage" + id).disabled = true;
	//set storage line to confirmed --> add actually stored --> productitems status to IN_STORAGE
}

function confirmButtonCheck(id) {
	var a = document.getElementById("ipActuallyStored" + id).value;
	var b = document.getElementById("ipToStore" + id).innerHTML;
	if (a == b) {
		document.getElementById("ipConfirmStorage" + id).className =
			"btn btn-outline-success";
	} else {
		document.getElementById("ipConfirmStorage" + id).className =
			"btn btn-outline-warning";
	}
}
