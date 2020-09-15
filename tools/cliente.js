// Cliente HTTP
// hostname: github.com
// uri: /users/nockzblack
class Cliente {
  constructor(host, port, protocol) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;

    if (protocol != "http" && protocol != "https") {
      console.log("ERORR!!");
    }
  }

  autentificarBasic(user, pass) {
    this.basicAuth = new Buffer.from(user + ":" + pass).toString("base64");
  }

  // procesar HEADERS para mantener session -> se realiza en la peteicion (request)
  procesarHeaders(req) {
    var headers = {
      Acept: "*/*",
      "User-Agent": "Cliente Node.js",
    };
    if (this.basicAuth != undefined) {
      headers.Authorization = "Basic " + this.basicAuth;
    }
    return headers;
  }

  // Relizar peticiones HTTP de tipo Get (obtener informacion)
  get(uri, callback) {
    var options = {
      hostname: this.host,
      port: this.port,
      method: "GET",
      path: this.protocol + "://" + this.host + uri, // https://api.github.com/users/nockzblack
      headers: this.procesarHeaders(),
    };

    this.request(options, null, callback);
  }

  post(uri, data, callback) {
    var options = {
      hostname: this.host,
      port: this.port,
      method: "POST",
      path: this.protocol + "://" + this.host + uri, // https://api.github.com/users/nockzblack
      headers: this.procesarHeaders(),
    };

    this.request(options, data, callback);
  }

  // request: manejo de peticiones
  request(options, data, callback) {
    // http o https
    var http = require(this.protocol); // http, o https

    var respuesta = {
      status: null,
      body: "",
      headers: null,
    };

    var auxRequest = http.request(options, (responseChannel) => {
      responseChannel.on("data", (chunk) => {
        respuesta.body += chunk;
      });

      responseChannel.on("end", () => {
        respuesta.status = responseChannel.statusCode;
        respuesta.headers = responseChannel.headers;
        callback(respuesta);
      });
    });

    if (data != undefined && data != null) {
      var body = JSON.stringify(data);
      auxRequest.setHeader("Content-Length", Buffer.byteLength(body));
      auxRequest.setHeader("Content-Type", "application/json");
      auxRequest.write(body);
    }

    auxRequest.end();
  }
}

module.exports = Cliente;
