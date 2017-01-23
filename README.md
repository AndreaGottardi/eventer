# eventer
Utility for easy events handling

## Installing
You can easily install it as a dependency for your project with npm

```
npm install eventer
```

_Not working for now. I'll need to clone this repo and remove *.git* folder_

## Using it

### Add event listener

First you'll need to import and then create an Eventer main object, you can pass true to the constructor to tell eventer that you want him to extend the default *HTMLElement* prototype, this is under param to avoid unwanted behaviour and conflicts with other libraries or tools.

```javascript
	import {Eventer} from './lib/Eventer/eventer';
	var eventer = new Eventer(true);
```

Then you can access all the four methods exposed by Eventer objects.
To bind an event you simply need to call *bindEvent* this way

```javascript
	eventer.bindEvent( eventName, DOMElement, eventFunction  );
```

where *eventName* is the event name to listen to, *DOMElement* is the non-live DOM instance of the element (usualy retrived with querySelector) and *eventFunction* is the callback function to trigger when the event is fired. You can also use the *on* shorthand with the same parameters

Plus, if you have passed *true* to the constructor you are able to use the *eventerOn* method directly on the HTMLElement.

```javascript
	document.querySelector('.bottone').eventerOn('click', function() {
		// Your awesome code here...
	});
```
### Remove event listener

If you need to remove event you can use one of these methods

```javascript
	eventer.unbindEvent( eventName, DOMElement, eventFunction );
	eventer.unbindAll( eventName, DOMElement );
	eventer.clearAll( DOMElement );
```
or you may rather use the *off* event, witch is a shorthand for the above three methods, it will handle their call depending on the params type and number

```javascript
	eventer.off( eventName, DOMElement, eventFunction );
	// or
	eventer.off( eventName, DOMElement );
```
