$(document).ready(function() {
	// chat
	$('.add-dlg-button').click(function() {
	 	$('.message-list').prepend(function() {
	 		let clone = $('.template').clone();
	 		$(clone).removeClass('template hidden').find('h3').text($('.chat-menu input').val());
	 		return clone;
	 	});
	 	$('.chat-menu input').val('');
	});


	// converter
	function convertCurrency(val, selector, currencySymbol, currencySymbolChanged, factor) {
		$(selector).val(function(j, v) {
			while (val[0] === currencySymbol) {
				val = val.slice(1, val.length);
			}
			v = factor * Number(val);
			v = currencySymbolChanged + v.toFixed(1);
			if (v.length > 6) {
				v = v.slice(0, 6) + '+';
			}
			return v.toUpperCase();
		});
	}

	function isANumberString(string) {
	    var numReg = /^[0-9]*$/;
	    return numReg.test(string.toString());
	}

	function resetValues() {
		$('#usd').val('$0.0');
		$('#gbr').val('₤0.0');
		$('#euro').val('€0.0');
	}

	$('.currency-input').on('input', function(e) {
		$(this).val(function(i, val) {
			if (isANumberString(val)) {
				if ($(e.target).is('#usd')) {
					convertCurrency(val, '#gbr', '$', '₤', 0.79);
					convertCurrency(val, '#euro', '$', '€', 0.9414);
					
					while (val[0] === '$') {
						val = val.slice(1, val.length);
					}
				} else if ($(e.target).is('#gbr')){
					convertCurrency(val, '#usd', '₤', '$', 1.26);
					convertCurrency(val, '#euro', '₤', '€', 1.19);
					
					while (val[0] === '₤') {
						val = val.slice(1, val.length);
					}
				} else {
					convertCurrency(val, '#usd', '€', '$', 1.0624);
					convertCurrency(val, '#gbr', '€', '₤', 0.84);
					
					while (val[0] === '€') {
						val = val.slice(1, val.length);
					}
				}
				return val.toUpperCase();
			}
		});
	}).on('focus', function(e) {
		$(this).val(function(i, val) {
			if ($(e.target).is('#usd')) {
				return val.replace('$', '').toUpperCase();
			} else if ($(e.target).is('#gbr')) {
				return val.replace('₤', '').toUpperCase();
			} else {
				return val.replace('€', '').toUpperCase();
			}
		});
	}).on('blur', function(e) {
		$(this).val(function(i, val) {
			if ($(e.target).is('#usd')) {
				val = '$' + val;
			} else if ($(e.target).is('#gbr')) {
				val = '₤' + val;
			} else {
				val = '€' + val;
			}
			if (val.length === 1) {
				val += '0.0';
				resetValues();
			}
			return val;
		});
	});

	$('.add-currency').click(function() {
		$('.currency-list li:last-child').toggleClass('hidden');
		$('.add-currency div').toggleClass('imgAddCurrency');
		$('.add-currency div').toggleClass('imgRemoveCurrency');
	});


	// weather
	let weatherInfo = [];
	weatherInfo.push({ temperature: '73', place: 'Zagora, Greece', time: '8:34 am' });
	weatherInfo.push({ temperature: '20', place: 'Minsk, Belarus', time: '10:23 am' });
	weatherInfo.push({ temperature: '90', place: 'Palanga, Lithuania', time: '11:46 am' });

	function changeSlidesInfo(e) {
		let index = $(e.target).index();
		$('.temperature').text(weatherInfo[index].temperature + '°');
		$('#place').text(weatherInfo[index].place);
		$('#time').text(weatherInfo[index].time);
	}

	weatherInfo.forEach(info => {
		$('.placeList').append('<li>');
		$('.placeList li:last-child').text(info.place);
	});

	$('.scale-button').click(function(e) {
		let FButton = $('.scale-button')[0];
		let CButton = $('.scale-button')[1];
		let target = $(e.target);
		let temperature = parseInt($('.temperature').text());

		if (!target.is('.selected-scale')) {
			if (target.is(FButton)) {
				$(FButton).addClass('selected-scale');
				$(CButton).removeClass('selected-scale');
				temperature = temperature * 9/5 + 32;
				weatherInfo.forEach(info => info.temperature = (info.temperature * 9/5 + 32).toFixed());
			} else {
				$(FButton).removeClass('selected-scale');
				$(CButton).addClass('selected-scale');
				temperature = (temperature - 32) * 5/9;
				weatherInfo.forEach(info => info.temperature = ((info.temperature - 32) * 5/9).toFixed());
			}
			$('.temperature').text(temperature.toFixed() + '°');
		}
	});

	$('.add-place-button').click(function() {
		['#input-temperature', '#input-place', '#input-link'].forEach(selector => {
			$(selector).val('');
			$(selector).removeClass('epmty');
		});
		$('.input-info').toggleClass('hidden');
	});

	$('#add-button').click(function() {
		if ($('#input-temperature').val() && $('#input-place').val() && $('#input-link').val()) {
			weatherInfo.push({ 
				temperature: Number($('#input-temperature').val()) || 0, 
				place: $('#input-place').val(), 	
				link: $('#input-link').val(),
				time: '12:11 am' 
			});
			let newId = 'slide-dot-' + weatherInfo.length;
			let newClass = 'slide-' + weatherInfo.length;

			$('.placeList').append('<li>');
			$('.placeList li:last-child').text(weatherInfo[weatherInfo.length - 1].place).click(function(e) {
				let index = $(e.target).index() - 1;
				$('.slider label:eq(' + index + ')').trigger('click');	
				$('.placeList').toggleClass('hidden');
			});

			$('.input-info').toggleClass('hidden');
			$('.weather-board').append('<input id=' + newId + ' type="radio" name="slides">');
			$('#' + newId).after('<div class=' + '"slide ' + newClass + '"></div>');
			$('.' + newClass).css('background', 'url(' + weatherInfo[weatherInfo.length - 1].link + ')');
			$('.' + newClass).css('background-size', 'cover');

			$('.slider').append('<label></label>');
			$('.slider label:last-child').attr('for', newId).click(function(e) {
				changeSlidesInfo(e);
			});
		} else {
			['#input-temperature', '#input-place', '#input-link'].forEach(selector => {
				if (!$(selector).val()) {
					$(selector).addClass('epmty');
				} else {
					$(selector).removeClass('epmty');
				}
			});
		}
	});

	$('.slider label').click(function(e) {
		changeSlidesInfo(e);
	});

	$('.placeList li').click(function(e) {
		let index = $(e.target).index() - 1;
		$('.slider label:eq(' + index + ')').trigger('click');	
		$('.placeList').toggleClass('hidden');
	});

	$('.list-view-button').click(function() {
		$('.placeList').toggleClass('hidden');
	});


	// login-block
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function checkIfApproved() {
		if ($('.valid').length === 2) {
			$('.login-block button').addClass('approved');
		}
	}

	function addTooltip(selector, text, signIn) {
		let newClass = signIn ? 'signin-tooltip' : 'signup-tooltip';

		$(selector).click(function(e) {
			if ($(e.target).is('.approved')) {
				$('.tooltip').addClass(newClass).css('display', 'block').delay(800).fadeOut(800, () => {
					$('.tooltip').removeClass(newClass)
				});
				$('.tooltip p').text(text);
			}
		});
	}

	$('#email').on('input', function(e) {
		if (validateEmail($('#email').val())) {
			$('.email-block').removeClass('invalid').addClass('valid');
			checkIfApproved();
		} else {
			$('.email-block').removeClass('valid').addClass('invalid');
			$('.login-block button').removeClass('approved');
		}
	});

	$('#password').on('input', function(e) {
		if ($('#password').val().length >= 8) {
			$('.password-block').removeClass('invalid').addClass('valid');
			checkIfApproved();
		} else {
			$('.password-block').removeClass('valid').addClass('invalid');
			$('.login-block button').removeClass('approved');
		}
	});

	addTooltip('.signup-button', 'Signed up', false);
	addTooltip('.signin-button', 'Signed in', true);


	// circles
	$('.circle-button').click(function() {
		let colorArr = [];
		let bigSum = false;
		let circleType = ['.circle-fill-', '.circle-around-'];

		function pushToColorArr(selector, id, color) {
			colorArr.push({
				value: Number($(selector).val()),
				selector: id,
				color: color
			});
		}
		pushToColorArr('.circle-input-first-value', 'first-value', '#56e5f6');
		pushToColorArr('.circle-input-second-value', 'second-value', '#4cd9c0');
		pushToColorArr('.circle-input-third-value', 'third-value', '#ec747d');
		let sum = colorArr.reduce((sum, current) => {
			return sum + current.value;
		}, 0);

		function changeCssProperty(selector, angle, zIndex) {
			circleType.forEach(type => {
				$(type + selector).css({
					'-webkit-transform': 'rotate(' + angle + 'deg)',
					'-ms-transform': 'rotate(' + angle + 'deg)',
					'transform': 'rotate(' + angle + 'deg)',
					'z-index': zIndex
				});
			});
		}

		function addSmallPart(rotate, color) {
			changeCssProperty('value', rotate.toFixed(2), 0);
			circleType.forEach(type => {
				$(type + 'value').css({
					'border': '80px solid ' + color,
					'border-top-color': 'transparent',
					'border-left-color': 'transparent',
					'border-bottom-color': 'transparent'
				});
			});
		}

		function changeBorderColor(selector, property, color) {
			circleType.forEach(type => {
				$(type + selector).css(property, color);
			});
		}

		if (sum > 100 || !sum) {
			alert('Error! Check input value');
			['first', 'second', 'third'].forEach(order => {
				$('.circle-input-' + order + '-value').val('');
			});
		} else {
			let bottom = 0;
			let circleHeight = $('.circle-straight').css('height');
			let deg = -45;
			let index = 1;

			if (sum > 75) {
				bigSum = true;
			}
			$('.percent').text(sum.toFixed() + '%');
			colorArr = colorArr.sort((a, b) => {
				return a.value - b.value;
			});

			colorArr.forEach((obj, i) => {
				// circle-straight
				let height = (parseInt(circleHeight) * obj.value) / 100;

				$('.circle-straight-' + obj.selector).css({
					'height': height + 'px',
					'bottom': bottom + 'px'
				});
				bottom += height;

				// circle-fill && circle-around
				let fillAngle = 3.6 * obj.value;
				let small = 315 - (deg + fillAngle);

				changeBorderColor(obj.selector, 'border-color', 'transparent');
				circleType.forEach(type => {
					$(type + 'value').css({
						'z-index': '0',
						'border': '80px solid #efefef',
						'border-top-color': 'transparent',
						'border-left-color': 'transparent',
						'border-bottom-color': 'transparent'
					});
				});

				if (fillAngle) {
					changeBorderColor(obj.selector, 'border-right-color', obj.color);
				} 
				if (fillAngle > 90) {
					if (i === 2 && fillAngle - 90 < 90 && small < 90) {
						addSmallPart((90 + 45 + small) * (-1), obj.color);
					} else {
						changeBorderColor(obj.selector, 'border-bottom-color', obj.color);
						if (fillAngle > 180) {
							if (i === 2 && fillAngle - 180 < 90 && small < 90) {
								addSmallPart((90 + 45 + small) * (-1), obj.color);
							} else { 
								changeBorderColor(obj.selector, 'border-left-color', obj.color);
								if (fillAngle > 270) {
									addSmallPart((90 + 45 + small) * (-1), obj.color);
								}
							}
						}
					}
				}
				changeCssProperty(obj.selector, deg.toFixed(2), index);
				
				deg += fillAngle;
				index++;
			});

			if (!bigSum) {
				changeCssProperty('value', deg.toFixed(2), 5);
			}
		}
	});


	// calendar
	$("#datepicker").datepicker({
		minDate: 0
	});
});