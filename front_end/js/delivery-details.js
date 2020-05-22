function pageDetails(){
    console.log("JAJA");
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
                var detailTable = "<table class='table img-table table-striped'><thead>" +
                "<tr><th scope='col'>Product name</th>" +
                "<th scope='col'>Amount ordered</th>" +
                "<th scope='col'>Amount received</th>" +
                "<th scope='col'>Confirmation</th>" +
                "<th scope='col'>Deviation handling</th></tr>" +
                "</thead><tbody>";
                for (var x=0; x<object.lines.length;x++){
                    detailTable += "<tr><td>"+object.lines[x].product.name+"</td>" +
                        "<td>"+ object.lines[x].amount +"</td>" +
                        "<td><input type=\"number\" class=\"form-control\" placeholder=\"\" id=\"ipAmountReceived\"></td>" +
                        "<td><button type=\"button\" class=\"btn btn-outline-secondary\" id=ipConfirm"+x+" onclick=confirmation()>Confirm</button></td>" +
                        "<td><button type=\"button\" class=\"btn btn-outline-secondary\" id=ipResolve hidden=true>Resolve deviation</button></td></tr>";
                }
                document.getElementById("deliveryDetailTable").innerHTML = detailTable;
                if (object.currentStatus == "EXPECTED") {
                    for (var x=0; x<object.lines.length;x++){
                        document.getElementById("ipConfirm"+x).disabled = true;
                    }
                }
            }
        }
        xhr.send();    
}

function confirmation(){
    console.log("confirm");

}
