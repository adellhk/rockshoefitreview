server = 'http://localhost:3000/'
$(document).ready(function() {
	console.log('loaded');
	bindGoButton();
	bindHiButton();
});

function bindGoButton() {
	$('#GoButton').on('click', function(event) {
		$('#MessageBox').text(requestConversion({input_grade: '5.11d'}))
	});
}

function bindHiButton() {
	$('#HiButton').on('click', function(event) {
		requestHi();
		// console.log(requestHi())
		// $('#MessageBox').text(requestHi())
	});
}

function requestHi() {
	$.ajax({
		url: server + 'hi',
		type: 'GET',
		dataType: 'JSON'
	})
	.done(function(serverData) {
		console.log("successfully called 'requestHi'");
		message = serverData.message;
		return message; // this needs to be a promise
	})
	.fail(function(serverData) {
		console.log("error "+serverData.responseText);
		return serverData.responseText
	});
	
}

function requestConversion(payload) {
	$.ajax({
		url: server + 'convert',
		type: 'POST',
		dataType: 'JSON',
		data: payload
	})
	.done(function(serverData) {
		console.log("success");
		return serverData
	})
	.fail(function(serverData) {
		console.log("error");
		return 'failed'
	})
}