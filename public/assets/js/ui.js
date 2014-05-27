var Ui = (function() {
  function Ui() {}

  Ui.prototype.bindEvents = function() {
    var dropzones = document.querySelectorAll(".dropzone");
    for(var i=0; i < dropzones.length; i++) {
      dropzones[i].addEventListener("dragenter", this.dropCancelHandler);
      dropzones[i].addEventListener("dragover", this.dropCancelHandler);
      dropzones[i].addEventListener("drop", this.dropHandler.bind(this, dropzones[i].id));
    }

    document.getElementById("refresh").addEventListener(
      "click",
      this.refreshClickHandler
    );
  };

  Ui.prototype.startLoadingSpinner = function() {
    document.getElementById("loader").classList.add("fa-spin");
  };

  Ui.prototype.stopLoadingSpinner = function() {
    document.getElementById("loader").classList.remove("fa-spin");
  };

  Ui.prototype.flash = function(color) {
    document.body.classList.add("flash-"+color);
    window.setTimeout(function() {
      document.body.classList.remove("flash-"+color);
    }, 2100);
  };

  Ui.prototype.dropCancelHandler = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    return false;
  };

  Ui.prototype.dropHandler = function(category, event) {
    event.preventDefault();
    var url;
    if (event.dataTransfer.types.contains("text/x-moz-text-internal")) {
      url = event.dataTransfer.getData("text/x-moz-text-internal");
    } else {
      url = event.dataTransfer.getData("Text");
    }
    if(validUrl(url)) {
      app.storage.addUrl(category, url);
    } else {
      this.flash("red");
    }
  };

  Ui.prototype.refreshClickHandler = function(event) {
    event.preventDefault();
    app.storage.load();
  };

  return Ui;
})();
