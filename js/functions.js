var oldFashioned = false;

function showLatLon(e) {
	var lat, lon;

	if(e.coords) {
		lat = e.coords.latitude;
		lon = e.coords.longitude;
	} else if(typeof(e.latitude) != 'undefined' && typeof(e.longitude) != 'undefined') {
		lat = e.latitude;
		lon = e.longitude;
	} else {
		$('#latlon p').html('Sorry, no luck finding your location :(');
		return;
	}

	lat = parseFloat(lat).toFixed(5);
	lon = parseFloat(lon).toFixed(5);

	$('#latlon .lat').html(lat).parent().attr('data-clipboard-text', lat);
	$('#latlon .lon').html(lon).parent().attr('data-clipboard-text', lon);

	$('#latlon p').html(
		'Click the fields below to copy them to your clipboard.'
	);

	if(oldFashioned) {
		$('#latlon').append('<p class="old-fashioned">This isn&rsquo;t accurate as it&rsquo;s using your IP address rather than your browser&rsquo;s geolocation library.</p>')
	}

	var clipLat = new ZeroClipboard(
		$('#latcopy')
	);

	var clipLon = new ZeroClipboard(
		$('#loncopy')
	);

	clipLat.addEventListener('onComplete',
		function() {
			$('#latlon p').fadeOut('fast',
				function() {
					$(this).html('Latitude copied to clipboard').fadeIn('fast');
				}
			);
		}
	);

	clipLon.addEventListener('onComplete',
		function() {
			$('#latlon p').fadeOut('fast',
				function() {
					$(this).html('Longitude copied to clipboard').fadeIn('fast');
				}
			);
		}
	);

	$(window).resize(
		function() {
			clipLat.reposition();
			clipLon.reposition();
		}
	);

	$('#latlon h1').show();
}

function useAJAX() {
	$('#latlon p').html('Trying the old-fashioned way...');
	oldFashioned = true;
	$.getJSON('/json/?callback=?', showLatLon);
}
