import socketserver, http.server, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 3456
with socketserver.TCPServer(("127.0.0.1", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    httpd.serve_forever()
