(function () {
  "use strict";

  var docEl = document.documentElement;
  var masthead = null;
  var frame = null;
  var raf = window.requestAnimationFrame || function (cb) { return window.setTimeout(cb, 16); };

  function setOffset() {
    frame = null;
    if (!masthead) {
      masthead = document.querySelector(".masthead");
      if (!masthead) {
        return;
      }
    }

    var height = masthead.getBoundingClientRect().height;
    var value = height ? height + "px" : null;
    if (value) {
      docEl.style.setProperty("--masthead-offset", value);
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
    window.addEventListener("resize", requestSetOffset, { passive: true });
    window.addEventListener("orientationchange", requestSetOffset);

    if ("ResizeObserver" in window) {
      var observer = new ResizeObserver(requestSetOffset);
      observer.observe(masthead);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", requestSetOffset);
})();
