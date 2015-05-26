var server = 'http://localhost:3000/'
// var server = 'https://climbing-grade-conversion-api.herokuapp.com/'
$(document).ready(function() {
	bindGradeConvertForm();
	setupStandards();
});

function bindGradeConvertForm() {
	$('#gradeConvertForm').on('submit', function(event){
		event.preventDefault();
		foreignGrade = this.inputGrade.value;
		updateConversionResults(convertToGrade(standardizeInputGrade(foreignGrade)));
	});
}

function updateConversionResults(results) {
	var message = 'French: '+results.french+','+' uk: '+results.uk+','+' australian: '+results.australian+','+' yds: '+results.yds;
	$('#conversionResults').text(message)
}

// Conversion logic

var standardizeFrench = {
	'1': 1,
	'2': [1, 2],
	'3': 2,
	'4': 3,
	'4+': 4,
	'5a': 5,
	'5b': 6,
	'6a': 7,
	'6a+': 8,
	'6b': 9,
	'6b+': 10,
	'6c': 11,
	'6c+': 12,
	'7a': 13,
	'7a+': 14,
	'7b': 15,
	'7b+': 16,
	'7c': 17,
	'7c+': 18,
	'8a': 19,
	'8a+': 20,
	'8b': 21,
	'8b+': 22,
	'8c': 23,
	'8c+': 24,
	'9a': 25
}

var standardizeUk = {
	'HVD': 1,
	'MS': 2,
	'S': 3,
	'VS': 4,
	'HVS': 6,
	'E1 5b': 7,
	'E2 5c': 8,
	'E3 5c': 10,
	'E4 6a': 12,
	'E5 6b': 14,
	'E6 6b': 16,
	'E7 6c': 19,
	'E8 7a': 21,
	'E9 7b': 23,
	'E10 7c': 25
}

var standardizeAustralian = {
	'8': 1,
	'9': 1,
	'10': 2,
	'11': 2,
	'12': 2,
	'13-': 3,
	'13+': 4,
	'14': 5,
	'15': 6,
	'19': [7, 8],
	'20': [8, 9],
	'21': [10, 11],
	'22': [11, 12],
	'23': 13,
	'24': 14,
	'25': 15,
	'26': 16,
	'27': 17,
	'28': 18,
	'29': 19,
	'30': 20,
	'31': 21,
	'32': 22,
	'33': 23,
	'34': 24,
	'35': 25
}

var standardizeUiaa = {
	'I': 1,
	'II': 1,
	'III': 2,
	'IV': 3,
	'V-': 4,
	'V': 5,
	'V+': 6,
	'VI+': [7, 8],
	'VII-': 8,
	'VII': 9,
	'VII+': [10, 11],
	'VIII-': 11,
	'VIII': [13, 14],
	'VIII+': [14, 15],
	'IX-': 16,
	'IX': [17, 18],
	'IX+': [18, 19],
	'X-': 20,
	'X': [21, 22],
	'X+': [22, 23],
	'XI-': 24,
	'XI': 25
}

var standardizeYds = {
	'5.2': 1,
	'5.3': 1,
	'5.4': 2,
	'5.5': 2,
	'5.6': 3,
	'5.7': 4,
	'5.8': 5,
	'5.9': 6,
	'5.10a': 7,
	'5.10b': 8,
	'5.10c': 9,
	'5.10d': 10,
	'5.11a': 11,
	'5.11b': 12,
	'5.11c': 13,
	'5.11d': 13,
	'5.12a': 14,
	'5.12b': 15,
	'5.12c': 16,
	'5.12d': 17,
	'5.13a': 18,
	'5.13b': 19,
	'5.13c': 20,
	'5.13d': 21,
	'5.14a': 22,
	'5.14b': 23,
	'5.14c': 24,
	'5.14d': 25,
	'5.15a': 25	
}

function setupStandards() {
	standards = $.extend(true, {}, standardizeYds, standardizeUiaa, standardizeAustralian, standardizeUk, standardizeFrench);
}

function getKeyByValue(object, value) {
	if( object.hasOwnProperty ) {
		for( var prop in object) {
			if( object[prop] === value) {
				return prop
			}
		}
	} else {
		return undefined;
	}
}

function standardizeInputGrade(inputGrade) {
	return standards[inputGrade];
}

function convertToGrade(standardGrade) {
	paired_translations = {};
	paired_translations['french'] = getKeyByValue(standardizeFrench, standardGrade);
	paired_translations['yds'] = getKeyByValue(standardizeYds, standardGrade);
	paired_translations['uk'] = getKeyByValue(standardizeUk, standardGrade);
	paired_translations['uiaa'] = getKeyByValue(standardizeUiaa, standardGrade);
	paired_translations['australian'] = getKeyByValue(standardizeAustralian, standardGrade);
	return paired_translations;
}