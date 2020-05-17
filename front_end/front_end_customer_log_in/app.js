function addNewCustomer() {
	var firstnamep = document.getElementById("ipfirstname").value;
	var lastnamep = document.getElementById("iplastname").value;
	var streetaddressp = document.getElementById("ipstreetaddress").value;
	var streetaddresstwop = document.getElementById("ipstreetaddresstwo").value;
	var cityp = document.getElementById("ipcity").value;
	var statep = document.getElementById("ipstate").value;
	var zipcodep = document.getElementById("ipzipcode").value;
	var countryp = document.getElementById("ipcountry").value;
	var phonenumberp = document.getElementById("ipphonenumber").value;
	var mobilephonenumberp = document.getElementById("ipmobilenumber").value;
	var emailp = document.getElementById("ipemail").value;
	var passwordp = document.getElementById("ippassword").value;
	//var repeatpasswordp = document.getElementById("iprepeatpassword").value;


	var theObject = {};
	theObject.firstName = firstnamep;
	theObject.lastName = lastnamep;
	theObject.streetAddress = streetaddressp;
	theObject.streetAddresstwo = streetaddresstwop
	theObject.city = cityp;
	theObject.state = statep;
	theObject.zipCode = zipcodep;
	theObject.country = countryp;
	theObject.phoneNumber = phonenumberp;
	theObject.mobilePhoneNumber = mobilephonenumberp;
	theObject.email = emailp;
	theObject.password = passwordp;
	
	var objJSON = JSON.stringify(theObject);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8082/newcustomer", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(objJSON);
}

/*
function makeName(){
	var inlogName = document.getElementById("ipemail")
}
*/

function sendData(inlogname, inlogpassword){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var listOfCustomers = JSON.parse(this.responseText);
				listOfCustomers.forEach(element => {
				if(element.email == document.getElementById(inlogname).value){
					if(element.password == document.getElementById(inlogpassword).value){
						alert("it works again");
					}
				}
			});
		}
	};
	xhr.open("GET", "http://localhost:8082/getcustomers",true)
	xhr.send();
}