var Storage = (function() {
  function Storage() {
    this._storage = {};
  }

  Storage.prototype.addUrl = function(category, url) {
    var link = {
      "title": "TODO",
      "url": url
    };

    if(!this._storage.urls) this._storage.urls = {};
    if(!this._storage.urls[category]) this._storage.urls[category] = [];

    this._storage.urls[category].push(link);
    this.save();
    return this._storage.urls[category].indexOf(link);
  };

  Storage.prototype.load = function() {
    var request = new XMLHttpRequest();
    request.open("GET", "/backend/storage", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        try {
          this._storage = JSON.parse(request.responseText);
          app.ui.flash("green");
        } catch(e) {
          app.ui.flash("red");
        }
        app.ui.stopLoadingSpinner();
      } else {
        app.ui.flash("red");
        app.ui.stopLoadingSpinner();
      }
    }.bind(this);

    request.onerror = function() {
      app.ui.flash("red");
      app.ui.stopLoadingSpinner();
    };

    app.ui.startLoadingSpinner();
    request.send();
  };

  Storage.prototype.save = function() {
    var request = new XMLHttpRequest();
    request.open("POST", "/backend/storage", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        app.ui.flash("green");
        app.ui.stopLoadingSpinner();
      } else {
        app.ui.flash("red");
        app.ui.stopLoadingSpinner();
      }
    }.bind(this);

    request.onerror = function() {
      app.ui.flash("red");
      app.ui.stopLoadingSpinner();
    };

    app.ui.startLoadingSpinner();
    request.send(JSON.stringify(this._storage, null, "  "));
  };

  return Storage;
})();
