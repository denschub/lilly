var Storage = (function() {
  function Storage() {
    this._storage = {};
    Events.on("ui:refreshButton:click", this.load.bind(this));
    Events.on("storage:remove", this.remove.bind(this));
    Events.on("storage:changedLocal", this.save.bind(this));
  }

  Storage.prototype.addUrl = function(category, url) {
   if (!validUrl(url)) {
      app.ui.flash("red");
      return false;
    }

    if (!this._storage.urls) this._storage.urls = {};
    if (!this._storage.urls[category]) this._storage.urls[category] = [];

    this.getTitle(url, function(category, url, title) {
      var link = {
        "title": title,
        "url": url
      };

      this._storage.urls[category].push(link);
      this.save();
    }.bind(this, category));
  };

  Storage.prototype.getByCategory = function(category) {
    if (!category) return [];
    return this._storage.urls[category];
  }

  Storage.prototype.remove = function(category, index) {
    this._storage.urls[category].splice(index, 1);
    Events.trigger("storage:changedLocal");
  }

  Storage.prototype.load = function(firstLoad) {
    var request = new XMLHttpRequest();
    request.open("GET", "/backend/storage", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        try {
          this._storage = JSON.parse(request.responseText);
          if (firstLoad) {
            mapHashToView();
          } else {
            app.ui.flash("green");
            Events.trigger("storage:changedLocal");
          }
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

  Storage.prototype.getTitle = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", "/backend/gettitle", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        callback(url, request.responseText);
        app.ui.stopLoadingSpinner();
      } else {
        app.ui.stopLoadingSpinner();
      }
    }.bind(this);

    request.onerror = function() {
      app.ui.stopLoadingSpinner();
    };

    app.ui.startLoadingSpinner();
    request.send(url);
  };

  return Storage;
})();
