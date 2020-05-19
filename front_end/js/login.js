function sendData() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var listOfCustomers = JSON.parse(this.responseText);
			for (const value of listOfCustomers) {
				if (
					value.email == document.getElementById("ipemail").value &&
					value.password == document.getElementById("ippassword").value
				) {
					alert("Login succesfull");
					window.location.href = "placeorder.html";
					return;
				}
			}
			alert("Wrong e-mail or password, try again");
			document.getElementById("ipemail").value = "";
			document.getElementById("ippassword").value = "";
		}
	};

	xhr.open("GET", "http://localhost:8082/getcustomers", true);
	xhr.send();
}
