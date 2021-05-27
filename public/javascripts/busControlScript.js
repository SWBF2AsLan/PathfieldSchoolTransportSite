$(document).ready(function() {
	
	updateBuses();
	var updateClock = window.setInterval(function() {updateBuses();}, 2000)

	var table = document.getElementById("t01body");
	table.onclick = function(click) {

		var cell = click.target;
		if (cell instanceof HTMLImageElement) {
			
			var path = cell.src.split("/");
			var last = (path.length - 1);
			var file = path[last];

			busId = cell.id.slice(-2);

			if (file == "whitebus.jpg") {
				sendStatusChange(busId, 1);
			} else if (file == "bluebus.jpg") {
				sendStatusChange(busId, 2);
			} else if (file == "yellowbus.jpg") {
				sendStatusChange(busId, 3);
			}

		}
	}


	function updateBuses() {
		
		$.ajax({
			url:'/buses/getbuses',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var buses = response.buses.split('/');
					updateTable(buses);
				} else {
					alert("Error updating buses.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving bus statuses.");
			}
		});

	}


	function updateTable(buses) {

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


	function sendStatusChange(busId, status) {
		
		$.ajax({
			url:'/buses/sendstatus',
			method:'post',
			dataType:'json',
			data:{'busId':busId, 'status':status},
			success:function(response) {
				if (response.msg=='success') {
					updateBuses();
				} else {
					alert("Error updating status of bus #" + busId.toString() + ".");
					updateBuses();
				}
			},
			error:function(response) {
				alert("Server error occured.");
				updateBuses();
			}
		});

	}

});