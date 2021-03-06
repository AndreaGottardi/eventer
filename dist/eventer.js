(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Eventer", [], factory);
	else if(typeof exports === 'object')
		exports["Eventer"] = factory();
	else
		root["Eventer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Eventer main class - Developed by Andrea Gorrardi and Borra Daniele

var Eventer = function () {
	function Eventer(extend) {
		_classCallCheck(this, Eventer);

		// Array of ojects, each object is composed by
		// a property with the DOMElement, reference and his id, and another
		// obects array with the event name and the function
		// reference associated with the event
		this._internals = [];
		// This is a value used to associate an unique id
		// to an HTML element
		this.lastIndex = 0;

		// FIXME _self is used to reference on extend function
		var _self = this;

		// If extend is setted to true, we're going to extend
		// the HTMLElement prototype
		if (extend) {
			HTMLElement.prototype.on = function (eventName, eventFunction, useCapture) {
				_self.on(eventName, this, eventFunction, useCapture);
				return this;
			};
			HTMLElement.prototype.off = function (eventName, eventFunction) {
				if (typeof eventName == 'undefined' && typeof eventFunction == 'undefined') {
					_self.off(this);
				} else {
					_self.off(eventName, this, eventFunction);
				}
				return this;
			};
		}
	}

	// bindEvent is the main addEventListener function,
	// eventName rappresent the event name to listen to
	// DOMElement is the non-live DOM instance of the element (usualy retrived with querySelector)
	// eventFunction is the callback function to trigger when the event is fired


	_createClass(Eventer, [{
		key: 'bindEvent',
		value: function bindEvent(eventName, DOMElement, eventFunction, useCapture) {
			// Let's check params
			if (typeof eventName != 'string') throw 'First argument must be a string, representing an event';
			if ((typeof DOMElement === 'undefined' ? 'undefined' : _typeof(DOMElement)) != 'object') throw 'Second argument mus be a DOMElement compatile object';
			if (typeof eventFunction != 'function') throw 'Third argument must be a function';

			var found = this._getInternal(DOMElement);
			if (this._internals[found]) {
				// We have this element already in store
				this._internals[found].functions.push({
					event: eventName,
					handler: eventFunction
				});
			} else {
				// Let's add a new one
				var identifier = this._getIdentifier();
				this._internals.push({
					element: { id: identifier, reference: DOMElement },
					functions: [{
						event: eventName,
						handler: eventFunction
					}]
				});
				// And save the id in the DOMElement
				DOMElement.eventerId = identifier;
			}

			// After we've saved our records let's add the actual listener
			DOMElement.addEventListener(eventName, eventFunction, useCapture);
		}

		// Just a shorthand for bindEvent

	}, {
		key: 'on',
		value: function on(eventName, DOMElement, eventFunction) {
			this.bindEvent(eventName, DOMElement, eventFunction);
		}

		// This remove a specific event handler from a specific element

	}, {
		key: 'unbindEvent',
		value: function unbindEvent(eventName, DOMElement, eventFunction) {
			var found = this._getInternal(DOMElement);
			var removed = 0;
			if (this._internals[found]) {
				for (var i = 0; i < this._internals[found].functions.length && removed === 0; i++) {
					var currentFunction = this._internals[found].functions[i];
					if (currentFunction.event == eventName && currentFunction.handler == eventFunction) {
						DOMElement.removeEventListener(eventName, currentFunction.handler);
						this._internals[found].functions.splice(i, 1);
						removed++;
					}
				}
			}
			return removed;
		}

		// This remove all the listener for a specific event
		// within a specific element, return the number of unbinded events

	}, {
		key: 'unbindAll',
		value: function unbindAll(eventName, DOMElement) {
			var found = this._getInternal(DOMElement);
			var removed = 0;
			if (this._internals[found]) {
				for (var i = 0; i < this._internals[found].functions.length; i++) {
					var currentFunction = this._internals[found].functions[i];
					if (currentFunction.event == eventName) {
						DOMElement.removeEventListener(eventName, currentFunction.handler);
						removed++;
					}
				}
				this._internals[found].functions = [];
			}
			return removed;
		}

		// This one remove all the event listeners for a specific element
		// regardless of the event type

	}, {
		key: 'clearAll',
		value: function clearAll(DOMElement) {
			var found = this._getInternal(DOMElement);
			var removed = 0;
			if (this._internals[found]) {
				for (var i = 0; i < this._internals[found].functions.length; i++) {
					var currentFunction = this._internals[found].functions[i];
					DOMElement.removeEventListener(currentFunction.event, currentFunction.handler);
					removed++;
				}
				// Clear functions array
				this._internals[found].functions = [];
			}
			return removed;
		}

		// Shorthand for all the above three functions,
		// depending on the parameters number
		// return the functions return on success or false if none has been called

	}, {
		key: 'off',
		value: function off(eventName, DOMElement, eventFunction) {
			if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) == 'object') {
				// Instead of eventName we've receved DOMElement
				DOMElement = eventName;
				return this.clearAll(DOMElement);
			}
			if (typeof eventName == 'string' && (typeof DOMElement === 'undefined' ? 'undefined' : _typeof(DOMElement)) == 'object' && typeof eventFunction == 'undefined') {
				return this.unbindAll(eventName, DOMElement);
			}
			if (typeof eventName == 'string' && (typeof DOMElement === 'undefined' ? 'undefined' : _typeof(DOMElement)) == 'object' && typeof eventFunction == 'function') {
				return this.unbindEvent(eventName, DOMElement, eventFunction);
			}
			return false;
		}
	}, {
		key: 'getListeners',
		value: function getListeners(DOMElement) {
			return this._internals[this._getInternal(DOMElement)].functions;
		}

		// Some utilities

	}, {
		key: '_getIdentifier',
		value: function _getIdentifier() {
			return ++this.lastIndex;
		}
	}, {
		key: '_getInternal',
		value: function _getInternal(DOMElement) {
			// Look for the DOMElement in the collection
			// using normal for beacuse it's 98% better for performance
			var found = false;
			for (var i = 0; i < this._internals.length && !found; i++) {
				var internal = this._internals[i];
				if (internal.element.reference.eventerId == DOMElement.eventerId) found = i;
			}
			return found;
		}
	}]);

	return Eventer;
}();

module.exports = Eventer;

/***/ })
/******/ ]);
});