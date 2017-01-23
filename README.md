# eventer
Utility for easy events handling

## Installing
You can easy install it as a dependency for your project with nop

```
npm install eventer
```

## Using it

### Add event listener

First you'll need to create an Eventer main object, you can pass true to the constructor to tell eventer that you want him to extend the default *HTMLElement* prototype, this is under param to avoid unwanted behaviour and conflicts with other libraries or tools.

```javascript
	var eventer = new Eventer(true);
```

Then you can accesso all the four methods exposed by Eventer objects.
To bind an event you simply need to call *bindEvent* linke this

```javascript
	eventer.bindEvent( eventName, DOMElement, eventFunction  );
```

where *eventName* rappresent the event name to listen to,
*DOMElement* is the non-live DOM instance of the element (usualy retrived with querySelector) and *eventFunction* is the callback function to trigger when the event is fired
You can also use the *on* shorthand with the same parameters

Plus, if you have passed *true* to the constructor you are able to use the *eventerBind* method directly on the HTMLElement.

```javascript
	document.querySelector('.bottone').eventerBind('click', function() {
		// Your awesome code here...
	});
```
### Remove event listener
