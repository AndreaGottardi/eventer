// Eventer main class - Developed by Andrea Gorrardi and Borra Daniele

class Eventer {
	constructor( extend ) {
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
		if( extend ) {
			HTMLElement.prototype.eventerOn = function( eventName, eventFunction, useCapture ) {
				_self.on( eventName, this, eventFunction, useCapture );
			}
			HTMLElement.prototype.eventerOff = function( eventName, eventFunction ) {
				if( typeof eventName == 'undefined' && typeof eventFunction == 'undefined' ) {
					_self.off( this );
				} else {
					_self.off( eventName, this, eventFunction );
				}
			}
		}
	}

	// bindEvent is the main addEventListener function,
	// eventName rappresent the event name to listen to
	// DOMElement is the non-live DOM instance of the element (usualy retrived with querySelector)
	// eventFunction is the callback function to trigger when the event is fired
	bindEvent( eventName, DOMElement, eventFunction, useCapture  ) {
		// Let's check params
		if( typeof eventName != 'string' ) throw "First argument must be a string, representing an event";
		if( typeof DOMElement != 'object' ) throw "Second argument mus be a DOMElement compatile object";
		if( typeof eventFunction != 'function' ) throw "Last argument must be a function";

		var found = this._getInternal( DOMElement );
		if( this._internals[found] ) {
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
		DOMElement.addEventListener( eventName, eventFunction, useCapture );
	}

	// Just a shorthand for bindEvent
	on( eventName, DOMElement, eventFunction ) {
		this.bindEvent( eventName, DOMElement, eventFunction );
	}

	// This remove a specific event handler from a specific element
	unbindEvent( eventName, DOMElement, eventFunction ) {
		var found = this._getInternal( DOMElement );
		var removed = 0;
		if( this._internals[found] ) {
			for (var i = 0; i < this._internals[found].functions.length && removed === 0; i++) {
				var currentFunction = this._internals[found].functions[i];
				if( currentFunction.event == eventName && currentFunction.handler == eventFunction ) {
					DOMElement.removeEventListener( eventName, currentFunction.handler );
					this._internals[found].functions.splice( i, 1 );
					removed++;
				}
			}
		}
		return removed;
	}

	// This remove all the listener for a specific event
	// within a specific element, return the number of unbinded events
	unbindAll( eventName, DOMElement ) {
		var found = this._getInternal( DOMElement );
		var removed = 0;
		if( this._internals[found] ) {
			for (var i = 0; i < this._internals[found].functions.length; i++) {
				var currentFunction = this._internals[found].functions[i];
				if( currentFunction.event == eventName ) {
					DOMElement.removeEventListener( eventName, currentFunction.handler );
					removed++;
				}
			}
			this._internals[found].functions = [];
		}
		return removed;
	}

	// This one remove all the event listeners for a specific element
	// regardless of the event type
	clearAll( DOMElement ) {
		var found = this._getInternal( DOMElement );
		var removed = 0;
		if( this._internals[found] ) {
			for (var i = 0; i < this._internals[found].functions.length; i++) {
				var currentFunction = this._internals[found].functions[i];
				DOMElement.removeEventListener( currentFunction.event, currentFunction.handler );
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
	off( eventName, DOMElement, eventFunction ) {
		if( typeof eventName == 'object' ) {
			// Instead of eventName we've receved DOMElement
			DOMElement = eventName;
			return this.clearAll( DOMElement );
		}
		if( typeof eventName == 'string' && typeof DOMElement == 'object' && typeof eventFunction == 'undefined' ) {
			return this.unbindAll( eventName, DOMElement );
		}
		if( typeof eventName == 'string' && typeof DOMElement == 'object' && typeof eventFunction == 'function' ) {
			return this.unbindEvent( eventName, DOMElement, eventFunction );
		}
		return false;
	}

	getListeners( DOMElement ) {
		return this._internals[ this._getInternal( DOMElement ) ].functions;
	}

	// Some utilities
	_getIdentifier() {
		return ++this.lastIndex;
	}

	_getInternal( DOMElement ) {
		// Look for the DOMElement in the collection
		// using normal for beacuse it's 98% better for performance
		var found = false;
		for (var i = 0; i < this._internals.length && !found; i++) {
			var internal = this._internals[i];
			if( internal.element.reference.eventerId == DOMElement.eventerId ) found = i;
		}
		return found;
	}
}

module.exports = Eventer;
