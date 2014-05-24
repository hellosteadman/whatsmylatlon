def application(environ, start_response):
    from pygeoip import GeoIP
    from os import path
    from urlparse import parse_qs
    import json

    status = '200 OK'
    ip = environ.get('HTTP_X_FORWARDED_FOR',
        environ.get('REMOTE_ADDR')
    )

    qs = parse_qs(environ.get('QUERY_STRING', ''))
    callback = qs.get('callback', '')

    if any(callback):
        callback = callback[0]
    else:
        callback = None

    if ip:
        filename = path.join(path.dirname(__file__), 'data', 'GeoLiteCity.dat')
        geo = GeoIP(filename)
        record = geo.record_by_name(ip)

        if record:
            response_headers = [('Content-type', 'application/json')]
            start_response(status, response_headers)

            if callback:
                yield '%s(' % callback

            yield json.dumps(record)
            if callback:
                yield ')'
