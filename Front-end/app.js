function showProducts() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            console.log(this.responseText);
            var productsRow = JSON.parse(this.responseText);
            console.log(productsRow);
            var result = "<table class='table table-striped'><thead>";
            result += "<tr><th scope='col'> Name </th>" +
                "<th scope='col'>Price</th>" +
                "<th scope='col'>EAN code</th>" +
                "<th scope='col'>Description</th>" +
                "<th scope='col'>Lenght</th>" +
                "<th scope='col'>Width</th>" +
                "<th scope='col'>Height</th>" +
                "<th scope='col'>Weight</th></tr>" +
                "</thead><tbody>";

            for (var x = 0; x < productsRow.length; x++) {
                result += "<tr><td>" + productsRow[x].name + "</td>" +
                    "<td>" + productsRow[x].price + "</td>" +
                    "<td>" + productsRow[x].eanCode + "</td>" +
                    "<td>" + productsRow[x].description + "</td>" +
                    "<td>" + productsRow[x].length + "</td>" +
                    "<td>" + productsRow[x].width + "</td>" +
                    "<td>" + productsRow[x].height + "</td>" +
                    "<td>" + productsRow[x].weight + "</td>";
            }
            result += "</tbody></table>";
            document.getElementById("result").innerHTML = result;
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
    xhr.open("POST", "http://localhost:8082/newProduct", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(objJSON);

}