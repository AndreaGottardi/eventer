// Eventer main class - Developed by Andrea Gorrardi and Borra Daniele

class Eventer {
	constructor() {
		// Array of ojects, each object is composed by
		// a property with the DOMElement, reference and his id, and another
		// obects array with the event name and the function
		// reference associated with the event
		this._internals = [];
		// This is a value used to associate an unique id
		// to an HTML element
		this.lastIndex = 0;
	}

	// bindEvent is the main addEventListener function,
	// eventName rappresent the event name to listen to
	// DOMElement is the non-live DOM instance of the element (usualy retrived with querySelector)
	// eventFunction is the callback function to trigger when the event is fired
	bindEvent( eventName, DOMElement, eventFunction  ) {
		this._internals.push({
			element: { id: this.getIdentifier(), reference: DOMElement },
			functions: []
		});
	}

	// Just a shorthand for bindEvent
	on( eventName, DOMElement, eventFunction ) {
		this.bindEvent( eventName, DOMElement, eventFunction );
	}

	// This remove a specific event handler from a specific element
	unbindEvent( eventName, DOMElement, eventFunction ) {

	}

	// This remove all the listener for a specific event
	// within a specific element
	unbindAll( eventName, DOMElement ) {

	}

	// This one remove all the event listeners for a specific element
	// regardless of the event type
	clearAll( DOMElement ) {

	}

	// Shorthand for all the above three functions,
	// depending on the parameters number
	off( eventName, DOMElement, eventFunction ) {

	}
}

export {Eventer};
