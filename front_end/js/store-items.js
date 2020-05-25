function pageStoreItems(){
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
                                "<td >"+ storeAmount +"</td>" +
                                "<td><input type=\"number\" class=\"form-control\" " +
                                    "id=ipActuallyStored"+x+y+"></td>" +
                                "<td >"+ box.id +"</td>" +
                                "<td><button type=\"button\" class=\"btn btn-outline-secondary\"" +
                                    " id=ipConfirmStorage"+x+y+">Confirm</button></td></tr>";
                            
                        }
                        document.getElementById("storeItemsTable").innerHTML = storeItemsTable;
                    }
                }
                xhr1.send();                
            }
        }
    }
    xhr.send();    
}