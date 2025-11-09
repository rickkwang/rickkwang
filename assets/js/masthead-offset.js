(function () {
  "use strict";

  var docEl = document.documentElement;
  var bodyEl = document.body;
  var masthead = null;
  var frame = null;
  var raf = window.requestAnimationFrame || function (cb) { return window.setTimeout(cb, 16); };
  var supportsCssVars = window.CSS && window.CSS.supports && window.CSS.supports("--masthead-test: 0");

  function applyOffset(value) {
    if (!value) {
      return;
    }

    docEl.style.setProperty("--masthead-offset", value);

    if (!supportsCssVars) {
      bodyEl.style.paddingTop = value;
      docEl.style.scrollPaddingTop = value;
      var sidebars = document.querySelectorAll(".sidebar");
      for (var i = 0; i < sidebars.length; i += 1) {
        sidebars[i].style.paddingTop = value;
      }
    }
  }

  function setOffset() {
    frame = null;
    if (!masthead) {
      masthead = document.querySelector(".masthead");
      if (!masthead) {
        return;
      }
    }

    var height = masthead.getBoundingClientRect().height;
    if (height) {
      applyOffset(height + "px");
    }
  }

  function requestSetOffset() {
    if (!frame) {
      frame = raf(setOffset);
    }
  }

  function init() {
    masthead = document.querySelector(".masthead");
    if (!masthead) {
      return;
    }

    requestSetOffset();
    window.addEventListener("resize", requestSetOffset, false);
    window.addEventListener("orientationchange", requestSetOffset, false);

    if ("ResizeObserver" in window) {
      var observer = new ResizeObserver(requestSetOffset);
      observer.observe(masthead);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", requestSetOffset);
})();
