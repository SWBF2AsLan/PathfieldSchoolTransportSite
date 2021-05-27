$(document).ready(function() {

	updateNames();


	$("#namelistbutton").click(function() {

		var unparsedNames = document.getElementById("namelist").value;

		var parsedNames = parseNames(unparsedNames, 'package');

		$.ajax({
			url:'/names/sendnames',
			method:'post',
			dataType:'json',
			data:{'namelist':parsedNames},
			success:function(response) {
				if (response.msg=='success') {
					alert("Name list updated.");
					updateNames();
				} else {
					alert("Error updating name list.");
					updateNames();
				}
			},
			error:function(response) {
				alert("Server error occured.");
				updateNames();
			}
		});	
			
	});


	

	//Function to either wrap or unwrap the names entered so they are either ready to be posted or used to populate the table.
	function parseNames(namelist, op) {

		var parsedNames = namelist.split('\n');
		
		if (op == 'package') {
			//Check for and remove name repetitions.
			for (i = 0; i < parsedNames.length; i++) {
				var numRepeats = 0;
				var repeatInd = [];
				for (j = 0; j < parsedNames.length; j++) {
					if ((i !== j) && (parsedNames[i] == parsedNames[j])) {
						numRepeats++;
						repeatInd[numRepeats] = j;
					}
				}
				if (numRepeats > 0) {
					parsedNames[i] = parsedNames[i] + " #1";
					while (numRepeats > 0) {
						parsedNames[repeatInd[numRepeats]] = (parsedNames[repeatInd[numRepeats]] + " #" + (numRepeats + 1).toString());
						numRepeats--;
					}
				}
			}

			//Assign default status for each name.
			parsedNames.forEach((name, index) => {
				if (name) {
					parsedNames[index] = name + "0";
				}
			});
			var finalNames = parsedNames.join('\n');
			return finalNames;
		} else if (op == 'unpackage') {
			parsedNames.forEach((name, index) => {
				if (name) {
					parsedNames[index] = name.slice(0, -1);
				}
			});
			var finalNames = parsedNames.join('\n');
			return finalNames;
		}
	}


	function updateTextArea(names) {

		var txtArea = document.getElementById("namelist");
		
		txtArea.value = names;

	}

	//Get name list;
	function updateNames() {


		$.ajax({
			url:'/names/getnames',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var names = parseNames(response.namelist, 'unpackage');
					updateTextArea(names);
				} else {
					alert("Error updating table.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving names.");
			}
		});
	}



});
