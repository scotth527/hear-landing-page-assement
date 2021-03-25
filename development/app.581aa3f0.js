// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/scss/app.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../assets/images/founders.jpeg":[["founders.54f52bf7.jpeg","../src/assets/images/founders.jpeg"],"../src/assets/images/founders.jpeg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/assets/data/questions.js":[function(require,module,exports) {
var questions = [{
  question: "What has prevented you from getting hearing aids sooner?",
  answers: ["Not sure if I need them", "I can’t afford them", "I need more information", "I’ve been too busy"]
}, {
  question: "How old are your hearing aids?",
  answers: ["2 years old or less", "3 years old", "4 years old", "5 years old or more"]
}, {
  question: "How much does hearing loss restrict you in your daily life?",
  answers: ["Not at all", "Barely", "Moderately", "Severely"]
}, {
  question: "When do you want to improve your hearing?",
  answers: ["As soon as possible", "Within the next few weeks", "Within the next few months", "I don't know"]
}, {
  question: "What is your current employment status?",
  answers: ["Employed", "Unemployed", "Retired", "Homemaker"]
}];
module.exports = {
  questions: questions
};
},{}],"../src/app.js":[function(require,module,exports) {
"use strict";

require("./scss/app.scss");

var _require = require('./assets/data/questions.js'),
    questions = _require.questions; // const fs = require('fs');
// var path = require('path');


console.log("Hello world!", questions);
var CAROUSEL_CONTAINER = document.getElementById('carousel');
var current_slide_index = 0;
var answers = [];

var create_slides = function create_slides() {
  for (var _i = 0; _i < questions.length; _i++) {
    var slideContainer = document.createElement("div");
    slideContainer.id = "slide-".concat(_i);
    slideContainer.className = "slide slide-".concat(_i, " ").concat(_i == 0 ? "active-slide" : "inactive-slide");
    var question = document.createElement("h1");
    question.className = "carousel-question__heading";
    var question_text = document.createTextNode(questions[_i]['question']);
    question.appendChild(question_text);
    var choiceContainer = document.createElement("div");
    choiceContainer.className = "choice-container flex-grid";

    for (var j = 0; j < questions[_i]['answers'].length; j++) {
      var _answers = questions[_i]['answers'];
      var choice_button = document.createElement("div");
      choice_button.className = "carousel-choice__button";
      var radio_button = document.createElement("input");
      var choice_label = document.createElement("label");
      var choice_text = _answers[j];
      choiceContainer.appendChild(choice_button);
    }

    slideContainer.appendChild(question);
    slideContainer.appendChild(choiceContainer);
  }
};

create_slides();

var select_choice = function select_choice(e, index) {};

var record_choice = function record_choice(e) {
  console.log(e.target.value);
}; //Function that swaps out the active and inactive class, which hides all inactive
//and displays the current active.
// index param is an integer to identify the desired active slide


var change_slide = function change_slide(index) {
  var slides = CAROUSEL_CONTAINER.children;

  for (var _i2 = 0; _i2 < slides.length; _i2++) {
    if (slides[_i2].classList.contains('slide')) {
      console.log("I", _i2, slides[_i2]);

      if (_i2 == index) {
        slides[_i2].classList.remove('inactive-slide');

        slides[_i2].classList.add('active-slide');
      } else {
        slides[_i2].classList.remove('active-slide');

        slides[_i2].classList.add('inactive-slide');
      }
    } else {
      continue;
    }
  }
};

var increment_carousel_index = function increment_carousel_index() {
  //Prevent going to next slide if on the last slide
  if (current_slide_index == questions.length) return;
  current_slide_index = current_slide_index + 1;
  change_slide(current_slide_index);
};

var decrement_carousel_index = function decrement_carousel_index() {
  //Prevent going back if on first question
  if (current_slide_index == 0) return;
  current_slide_index = current_slide_index - 1;
  change_slide(current_slide_index);
};

var check_user_has_selected = function check_user_has_selected(index) {
  if (answers[index]) {
    return true;
  } else {
    render_error_message(index);
  }
}; //Finds the selected slide and adds the error message


var render_error_message = function render_error_message(index) {
  var current_slide = document.getElementById("slide-".concat(i));
};

var clear_error_message = function clear_error_message() {};

var summarize_choices = function summarize_choices() {}; // let read_text = () => {
// }
// function loadJSON(callback) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', './assets/data/questions.json', true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       callback(JSON.parse(xobj.responseText));
//     }
//   };
//   xobj.send(null);
// }
//
// loadJSON(function(json) {
//   console.log("Here is the json", json); // this will log out the json object
// });
//let question_path = path.join(__dirname, './', 'assets', 'texts', 'questions.txt');
// //"../src/assets/texts/questions.txt"
// var text = fs.readFileSync(question_path);
// var textByLine = text.split("\n")
// fetch('questions.txt')
//     .then(response => response.text())
//     .then(data => {
//         console.log("Data", data);
//     })
},{"./scss/app.scss":"../src/scss/app.scss","./assets/data/questions.js":"../src/assets/data/questions.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63865" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/app.js"], null)
//# sourceMappingURL=/app.581aa3f0.js.map