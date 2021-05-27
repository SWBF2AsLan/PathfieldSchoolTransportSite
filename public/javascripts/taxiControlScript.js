$(document).ready(function() {

	updateNames();
	var updateClock = window.setInterval(function() {updateNames();}, 2000);


	

	//Function to either wrap or unwrap the names entered so they are either ready to be posted or used to populate the table.
	function parseNames(namelist) {

		var parsedNames = namelist.split('\n');
		
		var finalNames = [];

		var i = 0;
		parsedNames.forEach( name => {
			if (name) {
				finalNames[i] = name;
				i++;
			}
		});
		return finalNames;
		
	}


	function updateTable(names) {

		//Clearing the table before updating it.
		var table = document.getElementById("t01body");
		while (table.rows.length > 0) {
			table.deleteRow(0);
		}

		var i = 0;
		var row = table.insertRow();
		var cell;

		names.forEach( name => {
			if (i < 6) {
				cell = row.insertCell(i);
				cell.style="cursor:pointer;";
				cell.className = "cell";
				if (name.charAt((name.length-1)) == '0') {
					cell.style.backgroundColor = "white";
					name = name.slice(0, -1);
				} else if (name.charAt((name.length-1)) == '1') {
					cell.style.backgroundColor = "#81d473";
					name = name.slice(0, -1);
				} else if (name.charAt((name.length-1)) == '2') {
					cell.style.backgroundColor = "#fc5e45";
					name = name.slice(0, -1);
				} else {
					cell.style.backgroundColor = "#dc6cfc";
				}
				cell.innerHTML = name;
				i++;
			} else {
				row = table.insertRow();
				i = 0;
				cell = row.insertCell(i);
				cell.className = "cell";
				if (name.charAt((name.length-1)) == '0') {
					cell.style.backgroundColor = "white";
					name = name.slice(0, -1);
				} else if (name.charAt((name.length-1)) == '1') {
					cell.style.backgroundColor = "#81d473";
					name = name.slice(0, -1);
				} else if (name.charAt((name.length-1)) == '2') {
					cell.style.backgroundColor = "#fc5e45";
					name = name.slice(0, -1);
				} else {
					cell.style.backgroundColor = "#dc6cfc";
				}
				cell.innerHTML = name;
				i++;
			}
		});

		//Fill in rest of row with empty cells.
		if (i < 6) {

			for (j = 6-i; j > 0; j--) {
				cell = row.insertCell(i);
				cell.className = "empty";
				i++;
			}

		}

		table.onclick = function(click) {  
  		
			var cell = click.target;

			if (cell.className == "cell") {
				if (cell.style.backgroundColor == "white") {
					sendStatusChange(cell.innerHTML, 0);
				} else if (cell.style.backgroundColor == "rgb(129, 212, 115)") {
					sendStatusChange(cell.innerHTML, 1);
				} else if (cell.style.backgroundColor == "rgb(252, 94, 69)") {
					sendStatusChange(cell.innerHTML, 2);
				} else {
					sendStatusChange(cell.innerHTML, 3)
				}
			}
		};

	}

	//Update our table.
	function updateNames() {


		$.ajax({
			url:'/taxis/getnames',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var names = parseNames(response.namelist);
					updateTable(names);
				} else {
					alert("Error updating table.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving names.");
			}
		});
	}

	//Tell the server we want to change the status of one of the students.
	function sendStatusChange(name, status) {
		
		$.ajax({
			url:'/taxis/sendstatus',
			method:'post',
			dataType:'json',
			data:{'name':name, 'status':status},
			success:function(response) {
				if (response.msg=='success') {
					updateNames();
				} else {
					alert("Error updating status of " + name + ".");
					updateNames();
				}
			},
			error:function(response) {
				alert("Server error occured.");
				updateNames();
			}
		});

	}

});
