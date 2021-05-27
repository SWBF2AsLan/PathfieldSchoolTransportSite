$(document).ready(function() {

	getAnnouncements();

	$("#announcementsbutton").click(function() {

		var announcements = document.getElementById("announcements").value;

		$.ajax({
			url:'/announcements/sendannouncements',
			method:'post',
			dataType:'json',
			data:{'text':announcements},
			success:function(response) {
				if (response.msg=='success') {
					alert("Announcements updated.");
					getAnnouncements();
				} else {
					alert("Error updating Announcements.");
					getAnnouncements();
				}
			},
			error:function(response) {
				alert("Server error occured.");
				getAnnouncements();
			}
		});	
			
	});

	function getAnnouncements() {

		$.ajax({
			url:'/announcements/getannouncements',
			method:'get',
			dataType:'json',
			success:function(response) {
				if (response.msg=='success') {
					var announcements = response.announcements;
					var txtArea = document.getElementById("announcements");
					txtArea.value = announcements;
				} else {
					alert("Error retrieving announcements.");
				}
			},
			error:function(response) {
				alert("Server error occured retrieving announcements.");
			}
		});

	}

});
