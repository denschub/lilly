var http = require("http"),
    request = require("request"),
    fs = require("fs"),
    argv = require("minimist")(process.argv.slice(2)),
    entities = require("entities")

    storageFile = "var/storage.json";

fs.stat(storageFile, function(err, stat) {
  if (err == null) return;

  if(err.code == 'ENOENT') {
    fs.writeFile(storageFile, '{}', function(err) {
      if (err) throw err;
    })
  } else {
    throw err;
  }
});

http.createServer(function(req, res) {
  switch(req.url) {
    case "/storage":
      if (req.method === "POST") {
        var writeStream = fs.createWriteStream(storageFile, {
          flags: "w",
          encoding: "utf-8",
          autoClose: true
        });
        req.on("data", function(data) {
          writeStream.write(data);
        });
        req.on("end", function() {
          writeStream.end();
          res.writeHead(200, {"Content-Type": "text/plain"});
          res.end();
        });
      } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        var readStream = fs.createReadStream(storageFile, {
          encoding: "utf-8",
          autoClose: true
        });
        readStream.on("close", function() {
          res.end();
        });
        readStream.pipe(res);
      }
      break;
    case "/gettitle":
      if (req.method === "POST") {
        var url = "";
        req.on("data", function(data) {
          url += data;
        });
        req.on("end", function() {
          request({url: url, followAllRedirects: true}, function (error, response, body) {
            var title = "";
            if (!error) {
              title = body.match(/<title>([^]*)<\/title>/im);
              if ((title) && (title.length)) {
                title = entities.decodeHTML(title[1]).trim();
              } else {
                title = "[no title]";
              }
            }

            if (!title) title = "[no title]";

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(title);
          });
        });
      } else {
        res.writeHead(400);
        res.end();
      }
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
}).listen(argv.p, argv.h);
