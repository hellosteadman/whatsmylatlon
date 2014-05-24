# What's My Lat-Lon?

This is a simple HTML5/JavaScript web app
that tells a user their current latitude and
longitude, via the `window.navigator`
JavaScript library, and a GeoIP fallback.

## `window.navigator`

This performs a lookup on the user's
current location. If it's available, it's
displayed to the user and they're able to
copy and paste the values thanks to
ZeroClipboard.

## GeoIP fallback

This is provided via a simple WSGI
application found in the json directory.
It takes the `REMOTE_ADDR` value of the
HTTP header sent by the browser, and
checks that IP address with the
[GeoIP database](http://dev.maxmind.com/geoip/legacy/geolite/).

## Front-end requirements

To install the app you'll need the
[Bower](http://bower.io/) package manager.
When you've checked out this repo, enter
the project directory in your terminal
and type the following:

```
bower install jquery zeroclipboard html5shiv
```

That'll create a directory called
bower_components and install all the
necessary packages there.

## JSON callback requirements

To use the WSGI application you'll need
something like
[gunicorn](http://gunicorn.org/) and a
way to pass requests from the /json/ URL
to the gunicorn server (Nginx or
Apache can do this).
