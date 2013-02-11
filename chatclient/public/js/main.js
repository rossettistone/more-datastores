var message = {
  username: "chickenfur-mrev",
  message: "shawn if you can read this come help us we are stuck under a soda machine",
  // roomname: "4chan", // optional; used in an extra credit option below
  // hax: "alert('hi')" // optional; used in an extra credit option below

}

var chatRooms = ['Messages'];
var selectedRoom = "Messages";


var postAMessage = function(){
  console.log(message)
	$.ajax({
		  // beforeSend: headerSetter,
      url: "/1/classes/"+selectedRoom,
		  type: "POST",
		  contentType: "application/json",
		  data: message,
		  success: function(data){
        console.log(data);
		 		console.log('success');
		  }
	});
};

var getMessages = function(){
	$.ajax("/1/classes/"+ selectedRoom, { 
	  // beforeSend: headerSetter,
	  type: "GET",
	  dataType: "json",
	  success: function(data){
	  	$("#scrollFrame").html('');
	    $("#scrollFrame").append(data.username);
	    formatMessages(data);
	  },
	  error: function(jqXHR, textStatus, errorThrown){
	  	console.log(errorThrown);
	  }

	});
};

var formatMessages = function(data) {
	_.each(data.reverse(), function(i) {
		var messageString = "<div id='messageBox'><span id='username'>"
		+ i.username +" said: </span> <span id='messagetext'>"
		+ i.message + "  <span class='date'>"+ moment(i.updatedAt).fromNow() + "</span></span></div>";
		$("#scrollFrame").append(messageString);
		if(i.hax){
			//eval(i.hax); 
		}
	})
};

var newMessage = function(){
  message.username = $('#username').val();
	message.message = $('#message').val();
	// message.hax =$('#haXmessage').val();
	// message.date = new Date();
	postAMessage();

	//$('#username').val("");
  $('#message').val("");
	   
};


$(document).ready(function() {
  // Handler for .ready() called.

  	$('#chatRoomOptions').on('click',function(){
  		selectedRoom = $(this).val();
  		getMessages();
  	});

  $('input#message').on('keydown',function(event){
  	// 13 is keycode for enter
  	if(event.which ===13){
      newMessage();
  	}


  });
	$('#sendButton').on("click", function(){
		newMessage();
	});

	$('#createRoom').on("click", function() {
		var newRoom = $('#roomName').val();
		if (!_.contains(chatRooms, newRoom)) {
			chatRooms.push(newRoom);
			$("#chatRoomOptions").html("");
			_.each(chatRooms, function(i){ 
				var newOption = "<option value='"+i+"' id='"+i+"' >" +i+ "</option>";
				$("#chatRoomOptions").append(newOption);
				$("#" + i).on("click", function() {
					selectedRoom = newRoom;
					$("#scrollFrame").html("");
					getMessages();
				});
			});	
		}
		$('#roomName').val("");
	});
  
    
	window.setInterval(function() { getMessages();}, 1000)
	getMessages();
});

