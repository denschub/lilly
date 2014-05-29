function validUrl(url) {
  /**
   * this regex is extracted from jquery-validation by Jörn Zaefferer
   * Copyright (c) 2013 Jörn Zaefferer Licensed under the MIT license.
   * See https://github.com/jzaefferer/jquery-validation
   */
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

window.app = {
  config: {
    categories: [
      {
        name: "tech",
        icon: "fa-code"
      },
      {
        name: "article",
        icon: "fa-file-text"
      },
      {
        name: "entertain",
        icon: "fa-film"
      },
      {
        name: "other",
        icon: "fa-bookmark"
      }
    ]
  },
  ui: new Ui(),
  storage: new Storage()
};

function mapHashToView() {
  var hash = "", segments = [];

  if (!location.hash) {
    hash = "add";
  } else {
    hash = location.hash.replace("#", "");
    segments = hash.split('/');
  }

  if ((segments.length > 1) && (segments[0] == "list")) {
    Events.trigger("ui:view:changeView", "list");
    Events.trigger("ui:view:changeCategory", segments[1]);
  } else {
    Events.trigger("ui:view:changeView", segments[0]);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  app.storage.load(true);
  app.ui.bindViewEvents();
  app.ui.renderGeneralComponents();
});

window.addEventListener("hashchange", mapHashToView);
