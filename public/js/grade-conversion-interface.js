var server = 'http://localhost:3000/'
$(document).ready(function() {
	console.log('loaded');
	bindGradeConvertForm();
});

function bindGradeConvertForm() {
	$('#gradeConvertForm').on('submit', function(event){
		event.preventDefault();
		payload = $(this).serialize();
		requestConversion(payload);
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
		updateConversionResults(serverData); //should be a promise. avoid cbh :)
	})
	.fail(function(serverData) {
		console.log("error");
		return 'failed'
	})
}

function updateConversionResults(results) {
	$('#conversionResults').text(results)
}