function setLoadingSpinner() {
  document.getElementById("loader").classList.add("fa-spin");
}

function unsetLoadingSpinner() {
  document.getElementById("loader").classList.remove("fa-spin");
}

function dropCancelHandler(event) {
  if (event.preventDefault) event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  return false;
}

function flash(color) {
  document.body.classList.add("flash-"+color);
  window.setTimeout(function() {
    document.body.classList.remove("flash-"+color);
  }, 2100);
}

function dropHandler(category, event) {
  event.preventDefault();
  setLoadingSpinner();
  var url = event.dataTransfer.getData('Text');
  if(validUrl(url)) {
    flash("green");
    unsetLoadingSpinner();
  } else {
    flash("red");
    unsetLoadingSpinner();
  }
}

function validUrl(url) {
  /**
   * this regex is extracted from jquery-validation by Jörn Zaefferer
   * Copyright (c) 2013 Jörn Zaefferer Licensed under the MIT license.
   * See https://github.com/jzaefferer/jquery-validation
   */
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

document.addEventListener("DOMContentLoaded", function() {
  var dropzones = document.querySelectorAll(".dropzone");
  for(var i=0; i < dropzones.length; i++) {
    dropzones[i].addEventListener("dragenter", dropCancelHandler);
    dropzones[i].addEventListener("dragover", dropCancelHandler);
    dropzones[i].addEventListener("drop", dropHandler.bind(this, dropzones[i].id));
  }
});
