$(document).ready(function() {

	
	updateBuses();
	updateNames();
	getAnnouncements();
	var updateClock1 = window.setInterval(function() {updateNames();}, 2000)
	var updateClock2 = window.setInterval(function() {updateBuses();}, 2000)
	var updateClock3 = window.setInterval(function() {getAnnouncements();}, 5000)


	function getAnnouncements() {
	
		var announceBox = document.getElementById("announce");

		$.ajax({
			url:'/getannouncements',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					announceBox.innerHTML = response.announcements;
				} else {
					alert("Error getting announcements.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving announcements.");
			}
		});

	}

	function updateNames() {

		$.ajax({
			url:'/getnames',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var names = parseNames(response.namelist);
					updateTaxiTable(names);
				} else {
					alert("Error updating table.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving names.");
			}
		});
	}

	
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


	function updateTaxiTable(names) {
		
		//Clearing the table before updating it.
		var table = document.getElementById("t02body");
		while (table.rows.length > 0) {
			table.deleteRow(0);
		}

		var i = 0;
		var row = table.insertRow();
		var cell;

		names.forEach( name => {
			if (i < 2) {
				if (name.charAt((name.length-1)) == '1') {
					cell = row.insertCell(i);
					cell.className = "cell";
					cell.style.backgroundColor = "white";
					name = name.slice(0, -1);
					cell.innerHTML = name;
					i++;
				} else if (name.charAt((name.length-1)) == '2') {
					cell = row.insertCell(i);
					cell.className = "cell";
					cell.style.backgroundColor = "#fc5e45";
					name = name.slice(0, -1);
					cell.innerHTML = name;
					i++;
				}
			} else {
				if (name.charAt((name.length-1)) == '1') {
					row = table.insertRow();
					i = 0;
					cell = row.insertCell(i);
					cell.className = "cell";
					cell.style.backgroundColor = "white";
					name = name.slice(0, -1);
					cell.innerHTML = name;
					i++;
				} else if (name.charAt((name.length-1)) == '2') {
					row = table.insertRow();
					i = 0;
					cell = row.insertCell(i);
					cell.className = "cell";
					cell.style.backgroundColor = "#fc5e45";
					name = name.slice(0, -1);
					cell.innerHTML = name;
					i++;
				}
			}
		});

		if (i < 2) {

			for (j = 2-i; j > 0; j--) {
				cell = row.insertCell(i);
				cell.className = "empty";
				i++;
			}

		}

	}


	function updateBuses() {
		
		$.ajax({
			url:'/getbuses',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var buses = response.buses.split('/');
					updateBusesTable(buses);
				} else {
					alert("Error updating buses.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving bus statuses.");
			}
		});

	}


	function updateBusesTable(buses) {

		var imgPath = document.getElementById("bus01").src.split('/');
		var file = (imgPath.length - 1);

		buses.forEach( bus => {
			var busId = "bus" + bus.slice(0, -1);
			var busImg = document.getElementById(busId);
			if (bus.charAt(bus.length-1) == 1) {
				imgPath[file] = "whitebus.jpg";
				var newPath = imgPath.join('/');
				busImg.src = newPath;
			} else if (bus.charAt(bus.length-1) == 2) {
				imgPath[file] = "bluebus.jpg";
				var newPath = imgPath.join('/');
				busImg.src = newPath;
			} else if (bus.charAt(bus.length-1) == 3) {
				imgPath[file] = "yellowbus.jpg";
				var newPath = imgPath.join('/');
				busImg.src = newPath;
			}

		});

	}

});