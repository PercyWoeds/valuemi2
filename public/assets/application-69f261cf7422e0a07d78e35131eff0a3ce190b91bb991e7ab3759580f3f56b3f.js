/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */

(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);

// Document ready (on load)
  function documentReady() {
    fixPngs();
    tableColors();
    textClasses();
    dropdowns();
  }


  // Add an item to a product kit
  function addItemToCredit() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#invoice_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();    
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Please enter a valid quantity");
      } else if(price == "" || !isNumeric(price)) {
        alert("Please enter a valid price");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Please enter a valid discount");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        
        listItemsCredit();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal();
      }
    } else {
      alert("Please find a product to add first.");
    }
  }

  // List items in a kit
  function listItemsCredit() {
    var items = $("#items").val();
    var company_id = $("#invoice_company_id").val();
    
    $.get('/invoices/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }

  // Update price total for invoice
  function updateItemTotal() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html(total);
    } else {
      $("#ac_item_total").html("0.00");
    }
  }




  // On ready
  $(document).ready(function() {
    documentReady();
    
    $("#loading")
      .hide()
      .ajaxStart(function() {
        showLoading();
      })
      .ajaxStop(function() {
        hideLoading();
      })
    ;
  });




/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */


;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */
;(function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value;};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options);});},result:function(handler){return this.bind("result",handler);},search:function(handler){return this.trigger("search",[handler]);},flushCache:function(){return this.trigger("flushCache");},setOptions:function(options){return this.trigger("setOptions",[options]);},unautocomplete:function(){return this.trigger("unautocomplete");}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);var blockSubmit;$.browser.opera&&$(input.form).bind("submit.autocomplete",function(){if(blockSubmit){blockSubmit=false;return false;}});$input.bind(($.browser.opera?"keypress":"keydown")+".autocomplete",function(event){hasFocus=1;lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev();}else{onChange(0,true);}break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next();}else{onChange(0,true);}break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp();}else{onChange(0,true);}break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown();}else{onChange(0,true);}break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){event.preventDefault();blockSubmit=true;return false;}break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break;}}).focus(function(){hasFocus++;}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults();}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true);}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break;}}}if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value]);}$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback);});}).bind("flushCache",function(){cache.flush();}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])cache.populate();}).bind("unautocomplete",function(){select.unbind();$input.unbind();$(input.form).unbind(".autocomplete");});function selectCurrent(){var selected=select.selected();if(!selected)return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){var seperator=options.multipleSeparator.length;var cursorAt=$(input).selection().start;var wordAt,progress=0;$.each(words,function(i,word){progress+=word.length;if(cursorAt<=progress){wordAt=i;return false;}progress+=seperator;});words[wordAt]=v;v=words.join(options.multipleSeparator);}v+=options.multipleSeparator;}$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true;}function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return;}var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$input.addClass(options.loadingClass);if(!options.matchCase)currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow);}else{stopLoading();select.hide();}};function trimWords(value){if(!value)return[""];if(!options.multiple)return[$.trim(value)];return $.map(value.split(options.multipleSeparator),function(word){return $.trim(value).length?$.trim(word):null;});}function lastWord(value){if(!options.multiple)return value;var words=trimWords(value);if(words.length==1)return words[0];var cursorAt=$(input).selection().start;if(cursorAt==value.length){words=trimWords(value)}else{words=trimWords(value.replace(value.substring(cursorAt),""));}return words[words.length-1];}function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$(input).selection(previousValue.length,previousValue.length+sValue.length);}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200);};function hideResultsNow(){var wasVisible=select.visible();select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result){if(options.multiple){var words=trimWords($input.val()).slice(0,-1);$input.val(words.join(options.multipleSeparator)+(words.length?options.multipleSeparator:""));}else{$input.val("");$input.trigger("result",null);}}});}};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show();}else{hideResultsNow();}};function request(term,success,failure){if(!options.matchCase)term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data);}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param;});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed);}});}else{select.emptyList();failure(term);}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]};}}return parsed;};function stopLoading(){$input.removeClass(options.loadingClass);};};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0];},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)s=s.toLowerCase();var i=s.indexOf(sub);if(options.matchContains=="word"){i=s.toLowerCase().search("\\b"+sub.toLowerCase());}if(i==-1)return false;return i==0||options.matchContains;};function add(q,value){if(length>options.cacheLength){flush();}if(!data[q]){length++;}data[q]=value;}function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row);}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value);});}setTimeout(populate,25);function flush(){data={};length=0;}return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x);}});}}return csub;}else
if(data[q]){return data[q];}else
if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x;}});return csub;}}}return null;}};};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE);}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false;}).mousedown(function(){config.mouseDownOnSelect=true;}).mouseup(function(){config.mouseDownOnSelect=false;});if(options.width>0)element.css("width",options.width);needsInit=false;}function target(event){var element=event.target;while(element&&element.tagName!="LI")element=element.parentNode;if(!element)return[];return element;}function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight;});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight());}else if(offset<list.scrollTop()){list.scrollTop(offset);}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1;}else if(active>=listItems.size()){active=0;}}function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available;}function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i]);}listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0;}if($.fn.bgiframe)list.bgiframe();}return{display:function(d,q){init();data=d;term=q;fillList();},next:function(){moveSelect(1);},prev:function(){moveSelect(-1);},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active);}else{moveSelect(-8);}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active);}else{moveSelect(8);}},hide:function(){element&&element.hide();listItems&&listItems.removeClass(CLASSES.ACTIVE);active=-1;},visible:function(){return element&&element.is(":visible");},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0]);},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:$(input).width(),top:offset.top+input.offsetHeight,left:offset.left}).show();if(options.scroll){list.scrollTop(0);list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight;});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")));}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data");},emptyList:function(){list&&list.empty();},unbind:function(){element&&element.remove();}};};$.fn.selection=function(start,end){if(start!==undefined){return this.each(function(){if(this.createTextRange){var selRange=this.createTextRange();if(end===undefined||start==end){selRange.move("character",start);selRange.select();}else{selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}}else if(this.setSelectionRange){this.setSelectionRange(start,end);}else if(this.selectionStart){this.selectionStart=start;this.selectionEnd=end;}});}var field=this[0];if(field.createTextRange){var range=document.selection.createRange(),orig=field.value,teststring="<->",textLength=range.text.length;range.text=teststring;var caretAt=field.value.indexOf(teststring);field.value=orig;this.selection(caretAt,caretAt+textLength);return{start:caretAt,end:caretAt+textLength}}else if(field.selectionStart!==undefined){return{start:field.selectionStart,end:field.selectionEnd}}};})(jQuery);
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(3($){$.2e.1u({19:3(b,d){5 c=W b=="1B";d=$.1u({},$.M.1T,{Y:c?b:P,y:c?P:b,1J:c?$.M.1T.1J:10,X:d&&!d.1D?10:48},d);d.1y=d.1y||3(a){6 a};d.1v=d.1v||d.1R;6 A.I(3(){1M $.M(A,d)})},L:3(a){6 A.11("L",a)},1k:3(a){6 A.14("1k",[a])},2b:3(){6 A.14("2b")},28:3(a){6 A.14("28",[a])},24:3(){6 A.14("24")}});$.M=3(o,r){5 t={2Y:38,2S:40,2N:46,2I:9,2E:13,2B:27,2x:3I,2v:33,2p:34,2n:8};5 u=$(o).3r("19","3o").Q(r.2Q);5 p;5 m="";5 n=$.M.3c(r);5 s=0;5 k;5 h={1F:C};5 l=$.M.32(r,o,1Z,h);5 j;$.1Y.2X&&$(o.2U).11("45.19",3(){4(j){j=C;6 C}});u.11(($.1Y.2X?"43":"42")+".19",3(a){s=1;k=a.2M;3V(a.2M){O t.2Y:a.1d();4(l.N()){l.30()}w{12(0,D)}R;O t.2S:a.1d();4(l.N()){l.2D()}w{12(0,D)}R;O t.2v:a.1d();4(l.N()){l.2C()}w{12(0,D)}R;O t.2p:a.1d();4(l.N()){l.2A()}w{12(0,D)}R;O r.17&&$.1c(r.S)==","&&t.2x:O t.2I:O t.2E:4(1Z()){a.1d();j=D;6 C}R;O t.2B:l.Z();R;3J:1P(p);p=1O(12,r.1J);R}}).2t(3(){s++}).3E(3(){s=0;4(!h.1F){2r()}}).2q(3(){4(s++>1&&!l.N()){12(0,D)}}).11("1k",3(){5 c=(1r.7>1)?1r[1]:P;3 1N(q,a){5 b;4(a&&a.7){16(5 i=0;i<a.7;i++){4(a[i].L.J()==q.J()){b=a[i];R}}}4(W c=="3")c(b);w u.14("L",b&&[b.y,b.F])}$.I(15(u.K()),3(i,a){21(a,1N,1N)})}).11("2b",3(){n.1o()}).11("28",3(){$.1u(r,1r[1]);4("y"2h 1r[1])n.1e()}).11("24",3(){l.1p();u.1p();$(o.2U).1p(".19")});3 1Z(){5 e=l.2g();4(!e)6 C;5 v=e.L;m=v;4(r.17){5 b=15(u.K());4(b.7>1){5 f=r.S.7;5 c=$(o).18().1I;5 d,1H=0;$.I(b,3(i,a){1H+=a.7;4(c<=1H){d=i;6 C}1H+=f});b[d]=v;v=b.3f(r.S)}v+=r.S}u.K(v);1l();u.14("L",[e.y,e.F]);6 D}3 12(b,c){4(k==t.2N){l.Z();6}5 a=u.K();4(!c&&a==m)6;m=a;a=1m(a);4(a.7>=r.29){u.Q(r.26);4(!r.1s)a=a.J();21(a,3a,1l)}w{1q();l.Z()}};3 15(b){4(!b)6[""];4(!r.17)6[$.1c(b)];6 $.4h(b.23(r.S),3(a){6 $.1c(b).7?$.1c(a):P})}3 1m(a){4(!r.17)6 a;5 c=15(a);4(c.7==1)6 c[0];5 b=$(o).18().1I;4(b==a.7){c=15(a)}w{c=15(a.22(a.37(b),""))}6 c[c.7-1]}3 1G(q,a){4(r.1G&&(1m(u.K()).J()==q.J())&&k!=t.2n){u.K(u.K()+a.37(1m(m).7));$(o).18(m.7,m.7+a.7)}};3 2r(){1P(p);p=1O(1l,4g)};3 1l(){5 c=l.N();l.Z();1P(p);1q();4(r.36){u.1k(3(a){4(!a){4(r.17){5 b=15(u.K()).1n(0,-1);u.K(b.3f(r.S)+(b.7?r.S:""))}w{u.K("");u.14("L",P)}}})}};3 3a(q,a){4(a&&a.7&&s){1q();l.35(a,q);1G(q,a[0].F);l.20()}w{1l()}};3 21(f,d,g){4(!r.1s)f=f.J();5 e=n.31(f);4(e&&e.7){d(f,e)}w 4((W r.Y=="1B")&&(r.Y.7>0)){5 c={4f:+1M 4e()};$.I(r.2Z,3(a,b){c[a]=W b=="3"?b():b});$.4d({4c:"4b",4a:"19"+o.49,2V:r.2V,Y:r.Y,y:$.1u({q:1m(f),47:r.X},c),44:3(a){5 b=r.1A&&r.1A(a)||1A(a);n.1i(f,b);d(f,b)}})}w{l.2T();g(f)}};3 1A(c){5 d=[];5 b=c.23("\\n");16(5 i=0;i<b.7;i++){5 a=$.1c(b[i]);4(a){a=a.23("|");d[d.7]={y:a,F:a[0],L:r.1z&&r.1z(a,a[0])||a[0]}}}6 d};3 1q(){u.1h(r.26)}};$.M.1T={2Q:"41",2P:"3Z",26:"3Y",29:1,1J:3W,1s:C,1f:D,1w:C,1g:10,X:3U,36:C,2Z:{},1X:D,1R:3(a){6 a[0]},1v:P,1G:C,E:0,17:C,S:", ",1y:3(b,a){6 b.22(1M 3T("(?![^&;]+;)(?!<[^<>]*)("+a.22(/([\\^\\$\\(\\)\\[\\]\\{\\}\\*\\.\\+\\?\\|\\\\])/2K,"\\\\$1")+")(?![^<>]*>)(?![^&;]+;)","2K"),"<2J>$1</2J>")},1D:D,1E:3S};$.M.3c=3(g){5 h={};5 j=0;3 1f(s,a){4(!g.1s)s=s.J();5 i=s.2H(a);4(g.1w=="3R"){i=s.J().1k("\\\\b"+a.J())}4(i==-1)6 C;6 i==0||g.1w};3 1i(q,a){4(j>g.1g){1o()}4(!h[q]){j++}h[q]=a}3 1e(){4(!g.y)6 C;5 f={},2G=0;4(!g.Y)g.1g=1;f[""]=[];16(5 i=0,2F=g.y.7;i<2F;i++){5 c=g.y[i];c=(W c=="1B")?[c]:c;5 d=g.1v(c,i+1,g.y.7);4(d===C)1V;5 e=d.3Q(0).J();4(!f[e])f[e]=[];5 b={F:d,y:c,L:g.1z&&g.1z(c)||d};f[e].1U(b);4(2G++<g.X){f[""].1U(b)}};$.I(f,3(i,a){g.1g++;1i(i,a)})}1O(1e,25);3 1o(){h={};j=0}6{1o:1o,1i:1i,1e:1e,31:3(q){4(!g.1g||!j)6 P;4(!g.Y&&g.1w){5 a=[];16(5 k 2h h){4(k.7>0){5 c=h[k];$.I(c,3(i,x){4(1f(x.F,q)){a.1U(x)}})}}6 a}w 4(h[q]){6 h[q]}w 4(g.1f){16(5 i=q.7-1;i>=g.29;i--){5 c=h[q.3O(0,i)];4(c){5 a=[];$.I(c,3(i,x){4(1f(x.F,q)){a[a.7]=x}});6 a}}}6 P}}};$.M.32=3(e,g,f,k){5 h={H:"3N"};5 j,z=-1,y,1t="",1S=D,G,B;3 2y(){4(!1S)6;G=$("<3M/>").Z().Q(e.2P).T("3L","3K").1Q(1K.2w);B=$("<3H/>").1Q(G).3G(3(a){4(U(a).2u&&U(a).2u.3F()==\'2s\'){z=$("1L",B).1h(h.H).3D(U(a));$(U(a)).Q(h.H)}}).2q(3(a){$(U(a)).Q(h.H);f();g.2t();6 C}).3C(3(){k.1F=D}).3B(3(){k.1F=C});4(e.E>0)G.T("E",e.E);1S=C}3 U(a){5 b=a.U;3A(b&&b.3z!="2s")b=b.3y;4(!b)6[];6 b}3 V(b){j.1n(z,z+1).1h(h.H);2o(b);5 a=j.1n(z,z+1).Q(h.H);4(e.1D){5 c=0;j.1n(0,z).I(3(){c+=A.1a});4((c+a[0].1a-B.1b())>B[0].3x){B.1b(c+a[0].1a-B.3w())}w 4(c<B.1b()){B.1b(c)}}};3 2o(a){z+=a;4(z<0){z=j.1j()-1}w 4(z>=j.1j()){z=0}}3 2m(a){6 e.X&&e.X<a?e.X:a}3 2l(){B.2z();5 b=2m(y.7);16(5 i=0;i<b;i++){4(!y[i])1V;5 a=e.1R(y[i].y,i+1,b,y[i].F,1t);4(a===C)1V;5 c=$("<1L/>").3v(e.1y(a,1t)).Q(i%2==0?"3u":"3P").1Q(B)[0];$.y(c,"2k",y[i])}j=B.3t("1L");4(e.1X){j.1n(0,1).Q(h.H);z=0}4($.2e.2W)B.2W()}6{35:3(d,q){2y();y=d;1t=q;2l()},2D:3(){V(1)},30:3(){V(-1)},2C:3(){4(z!=0&&z-8<0){V(-z)}w{V(-8)}},2A:3(){4(z!=j.1j()-1&&z+8>j.1j()){V(j.1j()-1-z)}w{V(8)}},Z:3(){G&&G.Z();j&&j.1h(h.H);z=-1},N:3(){6 G&&G.3s(":N")},3q:3(){6 A.N()&&(j.2j("."+h.H)[0]||e.1X&&j[0])},20:3(){5 a=$(g).3p();G.T({E:W e.E=="1B"||e.E>0?e.E:$(g).E(),2i:a.2i+g.1a,1W:a.1W}).20();4(e.1D){B.1b(0);B.T({2L:e.1E,3n:\'3X\'});4($.1Y.3m&&W 1K.2w.3l.2L==="1x"){5 c=0;j.I(3(){c+=A.1a});5 b=c>e.1E;B.T(\'3k\',b?e.1E:c);4(!b){j.E(B.E()-2R(j.T("2O-1W"))-2R(j.T("2O-3j")))}}}},2g:3(){5 a=j&&j.2j("."+h.H).1h(h.H);6 a&&a.7&&$.y(a[0],"2k")},2T:3(){B&&B.2z()},1p:3(){G&&G.3i()}}};$.2e.18=3(b,f){4(b!==1x){6 A.I(3(){4(A.2d){5 a=A.2d();4(f===1x||b==f){a.4n("2c",b);a.3h()}w{a.4m(D);a.4l("2c",b);a.4k("2c",f);a.3h()}}w 4(A.3g){A.3g(b,f)}w 4(A.1C){A.1C=b;A.3e=f}})}5 c=A[0];4(c.2d){5 e=1K.18.4j(),3d=c.F,2a="<->",2f=e.3b.7;e.3b=2a;5 d=c.F.2H(2a);c.F=3d;A.18(d,d+2f);6{1I:d,39:d+2f}}w 4(c.1C!==1x){6{1I:c.1C,39:c.3e}}}})(4i);',62,272,'|||function|if|var|return|length|||||||||||||||||||||||||else||data|active|this|list|false|true|width|value|element|ACTIVE|each|toLowerCase|val|result|Autocompleter|visible|case|null|addClass|break|multipleSeparator|css|target|moveSelect|typeof|max|url|hide||bind|onChange||trigger|trimWords|for|multiple|selection|autocomplete|offsetHeight|scrollTop|trim|preventDefault|populate|matchSubset|cacheLength|removeClass|add|size|search|hideResultsNow|lastWord|slice|flush|unbind|stopLoading|arguments|matchCase|term|extend|formatMatch|matchContains|undefined|highlight|formatResult|parse|string|selectionStart|scroll|scrollHeight|mouseDownOnSelect|autoFill|progress|start|delay|document|li|new|findValueCallback|setTimeout|clearTimeout|appendTo|formatItem|needsInit|defaults|push|continue|left|selectFirst|browser|selectCurrent|show|request|replace|split|unautocomplete||loadingClass||setOptions|minChars|teststring|flushCache|character|createTextRange|fn|textLength|selected|in|top|filter|ac_data|fillList|limitNumberOfItems|BACKSPACE|movePosition|PAGEDOWN|click|hideResults|LI|focus|nodeName|PAGEUP|body|COMMA|init|empty|pageDown|ESC|pageUp|next|RETURN|ol|nullData|indexOf|TAB|strong|gi|maxHeight|keyCode|DEL|padding|resultsClass|inputClass|parseInt|DOWN|emptyList|form|dataType|bgiframe|opera|UP|extraParams|prev|load|Select|||display|mustMatch|substring||end|receiveData|text|Cache|orig|selectionEnd|join|setSelectionRange|select|remove|right|height|style|msie|overflow|off|offset|current|attr|is|find|ac_even|html|innerHeight|clientHeight|parentNode|tagName|while|mouseup|mousedown|index|blur|toUpperCase|mouseover|ul|188|default|absolute|position|div|ac_over|substr|ac_odd|charAt|word|180|RegExp|100|switch|400|auto|ac_loading|ac_results||ac_input|keydown|keypress|success|submit||limit|150|name|port|abort|mode|ajax|Date|timestamp|200|map|jQuery|createRange|moveEnd|moveStart|collapse|move'.split('|'),0,{}))
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2);return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(b){b.namespaces.g_vml_||
b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},
initElement:function(b){if(!b.getContext){b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();
break;case "height":a.style.height=a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I(),d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=
h}}return c}function O(b,a){a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+
1),h=b.substring(d+1,f).split(",");a="#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(b){switch(b){case "butt":return"flat";case "round":return"round";case "square":default:return"square"}}function H(b){this.m_=I();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;
var a=b.ownerDocument.createElement("div");a.style.width=b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};
i.lineTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+
0.6666666666666666*(f.x-this.currentX_),y:this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&&!h)l+=0.125;var n=this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,
a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.fill();this.currentPath_=f};i.createLinearGradient=function(b,
a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==
5){a=arguments[1];c=arguments[2];d=arguments[3];f=arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",
this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,
'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',!!b,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',
!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius),
" ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),
z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+
o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),
'"',' weight="',K,'px"',' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),
this);this.m_=this.mStack_.pop()};function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(b,a,c){if(!!ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,
0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)};i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=
M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();
/*
 Highcharts JS v1.2.5 (2010-04-13)

 (c) 2010 Torstein Hsi

 License: www.highcharts.com/license
*/

(function(){function jc(a){if(!a||a.constructor!=Array)a=[a];return a}function Qa(a){return a!==ma&&a!==null}function da(){var a=arguments,b,c;for(b=0;b<a.length;b++){c=a[b];if(Qa(c))return c}}function Gb(a,b,c){var d,e="",f=c?"print":"",g=function(i){return V("style",{type:"text/css",media:i?"print":""},null,va.getElementsByTagName("HEAD")[0])};kc||(kc=g());for(d in b)e+=Pb(d)+":"+b[d]+";";if(Ra){b=va.styleSheets;c&&g(true);for(c=b.length-1;c>=0&&b[c].media!=f;)c--;f=b[c];f.addRule(a,e)}else kc.appendChild(va.createTextNode(a+
" {"+e+"}\n"))}function H(a,b){a||(a={});for(var c in b)a[c]=b[c];return a}function Vc(a){Ba=aa(Ba,a);Cc();return Ba}function Ca(a){Qb||(Qb=V(Va));a&&Qb.appendChild(a);Qb.innerHTML=""}function ab(a,b){var c=function(){};c.prototype=new a;H(c.prototype,b);return c}function Hb(a,b){if(typeof a=="string")return a;else if(a.linearGradient){var c=b.createLinearGradient.apply(b,a.linearGradient);p(a.stops,function(d){c.addColorStop(d[0],d[1])});return c}}function V(a,b,c,d,e){a=va.createElement(a);b&&H(a,
b);e&&ra(a,{padding:0,border:"none",margin:0});c&&ra(a,c);d&&d.appendChild(a);return a}function ra(a,b){if(Ra)if(b.opacity!==ma)b.filter="alpha(opacity="+b.opacity*100+")";H(a.style,b)}function Wc(a,b,c,d){var e=Ba.lang;a=a;var f=isNaN(b=Da(b))?2:b;b=c===ma?e.decimalPoint:c;d=d===ma?e.thousandsSep:d;e=a<0?"-":"";c=parseInt(a=Da(+a||0).toFixed(f))+"";var g=(g=c.length)>3?g%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+Da(a-c).toFixed(f).slice(2):"")}function lc(a,
b,c){function d(y){return y.toString().replace(/^([0-9])$/,"0$1")}if(!Qa(b))return"Invalid date";b=new Date(b*Sa);var e=b[mc](),f=b[nc](),g=b[Ib](),i=b[Rb](),k=b[Sb](),j=Ba.lang,r=j.weekdays;j=j.months;b={a:r[f].substr(0,3),A:r[f],d:d(g),e:g,b:j[i].substr(0,3),B:j[i],m:d(i+1),y:k.toString().substr(2,2),Y:k,H:d(e),I:d(e%12||12),l:e%12||12,M:d(b[oc]()),p:e<12?"AM":"PM",P:e<12?"am":"pm",S:d(b.getSeconds())};for(var v in b)a=a.replace("%"+v,b[v]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a}function Cc(){var a=
Ba.global.useUTC;Tb=a?Date.UTC:function(b,c,d,e,f,g){return(new Date(b,c,da(d,1),da(e,0),da(f,0),da(g,0))).getTime()};oc=a?"getUTCMinutes":"getMinutes";mc=a?"getUTCHours":"getHours";nc=a?"getUTCDay":"getDay";Ib=a?"getUTCDate":"getDate";Rb=a?"getUTCMonth":"getMonth";Sb=a?"getUTCFullYear":"getFullYear";Dc=a?"setUTCMinutes":"setMinutes";Ec=a?"setUTCHours":"setHours";pc=a?"setUTCDate":"setDate";Fc=a?"setUTCMonth":"setMonth";Gc=a?"setUTCFullYear":"setFullYear"}function Hc(a){for(var b={x:a.offsetLeft,
y:a.offsetTop};a.offsetParent;){a=a.offsetParent;b.x+=a.offsetLeft;b.y+=a.offsetTop;if(a!=va.body&&a!=va.documentElement){b.x-=a.scrollLeft;b.y-=a.scrollTop}}return b}function Xc(a){function b(l,h){var s;h=da(h,true);na(t,"addSeries",{options:l},function(){s=d(l);s.isDirty=true;t.isDirty=true;h&&t.redraw()});return s}function c(){var l=t.isDirty;p(ya,function(h){if(h.isDirty){h.cleanData();h.getSegments();if(h.options.legendType=="point")l=true}});Cb=null;if(Ub){p(Ka,function(h){h.setScale()});j();
p(Ka,function(h){h.isDirty&&h.redraw()})}p(ya,function(h){h.isDirty&&h.visible&&h.redraw()});if(l){if(Jb&&Jb.renderHTML){Jb.renderHTML(true);Jb.drawGraphics(true)}t.isDirty=false}ub&&ub.resetTracker&&ub.resetTracker();na(t,"redraw")}function d(l){var h=l.type||A.defaultSeriesType,s=bb[h],q=t.hasRendered;if(q)if(Ea&&h=="column")s=Ic;else if(!Ea&&h=="bar")s=Vb;h=new s;h.init(t,l);if(!q&&h.inverted)Ea=true;if(h.isCartesian)Ub=h.isCartesian;ya.push(h);return h}function e(){var l=a.loading;if(!vb){vb=
V(Va,{className:"highcharts-loading"},H(l.style,{left:ga+F,top:I+F,width:sa+F,height:ka+F,zIndex:10,display:"none"}),oa);V("span",{innerHTML:a.lang.loading},l.labelStyle,vb)}ra(vb,{display:""});Db(vb,{opacity:l.style.opacity},{duration:l.showDuration})}function f(){Db(vb,{opacity:0},{duration:a.loading.hideDuration,complete:function(){ra(vb,{display:"none"})}})}function g(l){var h,s,q;for(h=0;h<Ka.length;h++)if(Ka[h].options.id==l)return Ka[h];for(h=0;h<ya.length;h++)if(ya[h].options.id==l)return ya[h];
for(h=0;h<ya.length;h++){q=ya[h].data;for(s=0;s<q.length;s++)if(q[s].id==l)return q[s]}return null}function i(){var l=va.getElementById(qc);if(l)lb=Hc(l)}function k(){var l=a.xAxis||{},h=a.yAxis||{},s;l=jc(l);p(l,function(q,M){q.index=M;q.isX=true});h=jc(h);p(h,function(q,M){q.index=M});Ka=l.concat(h);t.xAxis=[];t.yAxis=[];Ka=qb(Ka,function(q){s=new Fa(t,q);t[s.isXAxis?"xAxis":"yAxis"].push(s);return s});j()}function j(){A.alignTicks!==false&&p(Ka,function(l){l.adjustTickAmount()})}function r(){var l=
[];p(ya,function(h){l=l.concat(Wb(h.data,function(s){return s.selected}))});return l}function v(){return Wb(ya,function(l){return l.selected})}function y(l){var h=Ba.lang;t.toolbar.add("zoom",h.resetZoom,h.resetZoomTitle,function(){na(t,"selection",{resetSelection:true},y);t.toolbar.remove("zoom")});!l||l.resetSelection?p(Ka,function(s){s.setExtremes(null,null,false)}):p(l.xAxis.concat(l.yAxis),function(s){var q=s.axis;if(t.tracker[q.isXAxis?"zoomX":"zoomY"])q.setExtremes(s.min,s.max,false)});c()}
function R(){var l=a.title,h=a.subtitle;if(!t.titleLayer){var s=new pa("title-layer",oa,null,{zIndex:2});l&&l.text&&V("h2",{className:"highcharts-title",innerHTML:l.text},l.style,s.div);h&&h.text&&V("h3",{className:"highcharts-subtitle",innerHTML:h.text},h.style,s.div);t.titleLayer=s}}function E(){var l=true;for(var h in t.resources)t.resources[h]||(l=false);l&&K()}function K(){k();p(ya,function(l){l.translate();l.setTooltipPoints();l.createArea()});t.render=Wa;setTimeout(function(){Wa();na(t,"load")},
0)}function C(){Xa=A.renderTo;qc="highcharts-"+rc++;if(typeof Xa=="string")Xa=va.getElementById(Xa);Xa.innerHTML="";if(!Xa.offsetWidth){rb=Xa.cloneNode(0);ra(rb,{position:wa,top:"-9999px",display:""});va.body.appendChild(rb)}var l=(rb||Xa).offsetHeight;mb=A.width||(rb||Xa).offsetWidth||600;Ga=A.height||(l>I+cb?l:0)||400;oa=V(Va,{className:"highcharts-container"+(A.className?" "+A.className:""),id:qc},H({position:Xb,overflow:db,width:mb+F,height:Ga+F,textAlign:"left"},A.style),rb||Xa)}function Wa(){var l,
h=a.labels,s=a.credits;l=2*(A.borderWidth||0)+(A.shadow?8:0);Jc.drawRect(l/2,l/2,mb-l,Ga-l,A.borderColor,A.borderWidth,A.borderRadius,A.backgroundColor,A.shadow);Jc.drawRect(ga,I,sa,ka,null,null,null,A.plotBackgroundColor,null,Yb);(new pa("plot-border",oa,null,{zIndex:4})).drawRect(ga,I,sa,ka,A.plotBorderColor,A.plotBorderWidth,null,null,A.plotShadow);Ra&&Gb(".highcharts-image-map",{display:"none"},"print");Ub&&p(Ka,function(q){q.render()});R();h.items&&p(h.items,function(){var q=H({className:"highcharts-label"},
this.attributes);sc.drawHtml(this.html,q,H(h.style,this.style))});p(ya,function(q){q.render()});Jb=t.legend=new nb(t);if(!t.toolbar)t.toolbar=Kb(t);if(s.enabled&&!t.credits)t.credits=V("a",{className:"highcharts-credits",href:s.href,innerHTML:s.text,target:s.target},H(s.style,{zIndex:8}),oa);t.hasRendered=true;if(rb){Xa.appendChild(oa);Ca(rb);i()}}function La(){function l(h){var s=h.attributes,q,M;if(s){q=s.length;for(q=q-1;q>=0;q-=1){M=s[q].name;try{if(typeof h[M]=="function")h[M]=null}catch(ea){}}}if(s=
h.childNodes){q=s.length;for(q=q-1;q>=0;q--){s=h.childNodes[q];l(s);s.childNodes.length||Ca(s)}}}p(ya,function(h){h.destroy()});ya=[];l(oa)}function Fa(l,h){function s(){h=aa(L?Zb:tc,Y?la?Yc:Kc:la?Zc:$c,h)}function q(){var m=[],n;Ma=Ta=null;$b=[];p(ya,function(u){n=false;p(["xAxis","yAxis"],function(J){if((J=="xAxis"&&L||J=="yAxis"&&!L)&&(u.options[J]==h.index||u.options[J]===ma&&h.index==0)){u[J]=Ya;$b.push(u);n=true}});if(!u.visible&&A.ignoreHiddenSeries)n=false;if(n){var x;if(!L){x=u.options.stacking;
ac=x=="percent";if(x){var z=m[u.type]||[];m[u.type]=z}if(ac){Ma=0;Ta=99}}if(u.isCartesian){p(u.data,function(J){var G=J.x,ja=J.y;if(Ma===null)Ma=Ta=J[wb];if(L)if(G>Ta)Ta=G;else{if(G<Ma)Ma=G}else if(Qa(ja)){if(x)z[G]=z[G]?z[G]+ja:ja;J=z?z[G]:ja;if(!ac)if(J>Ta)Ta=J;else if(J<Ma)Ma=J;if(x)eb[u.type][G]={total:J,cum:J}}});if(!L&&/(area|column|bar)/.test(u.type))if(Ma>=0){Ma=0;Lc=true}else if(Ta<0){Ta=0;Mc=true}}}})}function M(m,n,u){var x=1,z=0;if(u){x*=-1;z=sb}if(xb){x*=-1;z-=x*sb}if(n){if(xb)m=sb-m;
m=m/yb+W}else m=x*(m-W)*yb+z;return m}function ea(m,n,u){if(u){var x,z,J;x=M(m);var G;m=z=x+bc;x=J=Ga-x-bc;if(Y){x=I;J=Ga-cb;if(m<ga||m>ga+sa)G=true}else{m=ga;z=mb-fb;if(x<I||x>I+ka)G=true}G||Nc.drawLine(m,x,z,J,n,u)}}function xa(m,n,u){m=Lb(m,W);n=Math.min(n,ha);var x=(n-m)*yb;ea(m+(n-m)/2,u,x)}function D(m,n,u,x,z,J,G){var ja,ba,gb,N=h.labels;if(n=="inside")z=-z;if(la)z=-z;n=ba=M(m+zb)+bc;ja=gb=Ga-M(m+zb)-bc;if(Y){ja=Ga-cb-(la?ka:0)+Ua;gb=ja+z}else{n=ga+(la?sa:0)+Ua;ba=n-z}x&&Eb.drawLine(n,ja,ba,
gb,u,x);if(J&&N.enabled)if((m=cc.call({index:G,isFirst:m==fa[0],isLast:m==fa[fa.length-1],value:Ha&&Ha[m]?Ha[m]:m}))||m===0)Eb.addText(m,n+N.x-(zb&&Y?zb*yb*(xb?-1:1):0),ja+N.y-(zb&&!Y?zb*yb*(xb?1:-1):0),N.style,N.rotation,N.align)}function ia(m,n){var u;da(h.allowDecimals,true);Mb=n?1:ta.pow(10,Za(ta.log(m)/ta.LN10));u=m/Mb;n||(n=[1,2,2.5,5,10]);for(var x=0;x<n.length;x++){m=n[x];if(u<=(n[x]+(n[x+1]||n[x]))/2)break}m*=Mb;return m}function U(){fa=[];for(var m=Ba.global.useUTC,n=1E3/Sa,u=6E4/Sa,x=36E5/
Sa,z=864E5/Sa,J=6048E5/Sa,G=2592E6/Sa,ja=31556952E3/Sa,ba=[["second",n,[1,2,5,10,15,30]],["minute",u,[1,2,5,10,15,30]],["hour",x,[1,2,3,4,6,8,12]],["day",z,[1,2]],["week",J,[1,2]],["month",G,[1,2,3,4,6]],["year",ja,null]],gb=ba[6],N=gb[1],Z=gb[2],$a=0;$a<ba.length;$a++){gb=ba[$a];N=gb[1];Z=gb[2];if(ba[$a+1]){var ad=(N*Z[Z.length-1]+ba[$a+1][1])/2;if(Ia<=ad)break}}if(N==ja&&Ia<5*N)Z=[1,2,5];ba=ia(Ia/N,Z);var tb;Z=new Date(W*Sa);Z.setMilliseconds(0);if(N>=n)Z.setSeconds(N>=u?0:ba*Za(Z.getSeconds()/
ba));if(N>=u)Z[Dc](N>=x?0:ba*Za(Z[oc]()/ba));if(N>=x)Z[Ec](N>=z?0:ba*Za(Z[mc]()/ba));if(N>=z)Z[pc](N>=G?1:ba*Za(Z[Ib]()/ba));if(N>=G){Z[Fc](N>=ja?0:ba*Za(Z[Rb]()/ba));tb=Z[Sb]()}if(N>=ja){tb-=tb%ba;Z[Gc](tb)}N==J&&Z[pc](Z[Ib]()-Z[nc]()+h.startOfWeek);$a=1;n=Z.getTime()/Sa;tb=Z[Sb]();u=Z[Rb]();for(x=Z[Ib]();n<ha&&$a<sa;){fa.push(n);if(N==ja)n=Tb(tb+$a*ba,0)/Sa;else if(N==G)n=Tb(tb,u+$a*ba)/Sa;else if(!m&&(N==z||N==J))n=Tb(tb,u,x+$a*ba*(N==z?1:7));else n+=N*ba;$a++}fa.push(n);h.labels.formatter||(cc=
function(){return lc(h.dateTimeLabelFormats[gb[0]],this.value,1)})}function X(){var m=function(x){var z=(Mb<1?O(1/Mb):1)*10;return O(x*z)/z},n;n=Za(W/Ia)*Ia;var u=ta.ceil(ha/Ia)*Ia;fa=[];for(n=m(n);n<=u;){fa.push(n);n=m(n+Ia)}if(Ha){W-=0.5;ha+=0.5}cc||(cc=function(){return this.value})}function ca(){hb?U():X();var m=fa[0],n=fa[fa.length-1];if(h.startOnTick)W=m;else W>m&&fa.shift();if(h.endOnTick)ha=n;else ha<n&&fa.pop()}function za(){if(!hb&&!Ha){var m=Fb,n=fa.length;Fb=Cb[wb];if(n<Fb){for(;fa.length<
Fb;)fa.push(fa[fa.length-1]+Ia);yb*=(n-1)/(Fb-1)}if(Qa(m)&&Fb!=m)Ya.isDirty=true}}function P(){var m,n,u,x=W,z=ha;m=h.maxZoom;var J;q();W=da(Oc,h.min,Ma);ha=da(Pc,h.max,Ta);if(ha-W<m){J=(m-ha+W)/2;W=Lb(W-J,da(h.min,W-J));ha=ta.min(W+m,da(h.max,W+m))}if(!Ha&&!ac){m=ha-W||1;if(!Qa(h.min)&&Qc&&(Ma<0||!Lc))W-=m*Qc;if(!Qa(h.max)&&Rc&&(Ta>0||!Mc))ha+=m*Rc}Ia=Ha||W==ha?1:h.tickInterval=="auto"?(ha-W)*h.tickPixelInterval/sb:h.tickInterval;if(!hb&&h.tickInterval=="auto")Ia=ia(Ia);uc=h.minorTickInterval=="auto"&&
Ia?Ia/5:h.minorTickInterval;ca();yb=sb/(ha-W||1);Cb||(Cb={x:0,y:0});if(!hb&&fa.length>Cb[wb])Cb[wb]=fa.length;if(!L)for(n in eb)for(u in eb[n])eb[n][u].cum=eb[n][u].total;Ya.isDirty=W!=x||ha!=z}function Aa(m,n,u){u=da(u,true);na(Ya,"setExtremes",{min:m,max:n},function(){if(Ha){if(m<0)m=0;if(n>Ha.length-1)n=Ha.length-1}Oc=m;Pc=n;u&&l.redraw()})}function w(m,n){Ha=m;da(n,true)&&o()}function qa(){return{min:W,max:ha,dataMin:Ma,dataMax:Ta}}function S(m){var n=m.width,u=n?vc:wc;u.push(m);n?ea(m.value,
m.color,m.width):xa(m.from,m.to,m.color)}function Na(m){p([wc,vc],function(n){for(var u=0;u<n.length;u++)if(n[u].id==m){n.splice(u,1);break}});Q()}function o(){ub.resetTracker&&ub.resetTracker();Q();p($b,function(m){m.isDirty=true})}function Q(){var m=h.title,n=h.alternateGridColor,u=h.minorTickWidth,x=h.lineWidth,z,J;z=$b.length&&Qa(W)&&Qa(ha);Eb.clear();Nc.clear();if(z){n&&p(fa,function(G,ja){if(ja%2==0&&G<ha)xa(G,fa[ja+1]!==ma?fa[ja+1]:ha,n)});p(wc,function(G){xa(G.from,G.to,G.color)});if(uc&&
!Ha)for(z=W;z<=ha;z+=uc){ea(z,h.minorGridLineColor,h.minorGridLineWidth);u&&D(z,h.minorTickPosition,h.minorTickColor,u,h.minorTickLength)}p(fa,function(G,ja){J=G+zb;ea(J,h.gridLineColor,h.gridLineWidth);D(G,h.tickPosition,h.tickColor,h.tickWidth,h.tickLength,!(G==W&&!h.showFirstLabel||G==ha&&!h.showLastLabel),ja)});p(vc,function(G){ea(G.value,G.color,G.width)})}if(x){u=ga+(la?sa:0)+Ua;z=Ga-cb-(la?ka:0)+Ua;Eb.drawLine(Y?ga:u,Y?z:I,Y?mb-fb:u,Y?z:Ga-cb,h.lineColor,x)}if(m&&m.enabled&&m.text){x=Y?ga:
I;u=Y?sa:ka;x={low:x+(Y?0:u),middle:x+u/2,high:x+(Y?u:0)}[m.align];u=(Y?I+ka:ga)+(Y?1:-1)*(la?-1:1)*m.margin-(Ra?parseInt(m.style.fontSize||m.style.font.replace(/^[a-z ]+/,""))/3:0);Eb.addText(m.text,Y?x:u+(la?sa:0)+Ua,Y?u-(la?ka:0)+Ua:x,m.style,m.rotation||0,{low:"left",middle:"center",high:"right"}[m.align])}Eb.strokeText();Ya.isDirty=false}var L=h.isX,la=h.opposite,Y=Ea?!L:L,eb={bar:{},column:{},area:{},areaspline:{}};s();var Ya=this,hb=h.type=="datetime",Ua=h.offset||0,wb=L?"x":"y",sb=Y?sa:ka,
yb,bc=Y?ga:cb,Eb=new pa("axis-layer",oa,null,{zIndex:7}),Nc=new pa("grid-layer",oa,null,{zIndex:1}),Ma,Ta,$b,Oc,Pc,ha=null,W=null,Qc=h.minPadding,Rc=h.maxPadding,Lc,Mc,ac,Sc=h.events,xc,wc=h.plotBands||[],vc=h.plotLines||[],Ia,uc,Mb,fa,Fb,cc=h.labels.formatter,Ha=h.categories||L&&l.columnCount,xb=h.reversed,zb=Ha&&h.tickmarkPlacement=="between"?0.5:0;if(Ea&&L&&xb===ma)xb=true;la||(Ua*=-1);if(Y)Ua*=-1;H(Ya,{addPlotBand:S,addPlotLine:S,adjustTickAmount:za,categories:Ha,getExtremes:qa,isXAxis:L,options:h,
render:Q,setExtremes:Aa,setScale:P,setCategories:w,translate:M,redraw:o,removePlotBand:Na,removePlotLine:Na,reversed:xb,stacks:eb});for(xc in Sc)Oa(Ya,xc,Sc[xc]);P()}function Kb(){function l(M,ea,xa,D){if(!q[M]){ea=V(Va,{innerHTML:ea,title:xa,onclick:D},H(a.toolbar.itemStyle,{zIndex:1003}),s.div);q[M]=ea}}function h(M){Ca(q[M]);q[M]=null}var s,q={};s=new pa("toolbar",oa,null,{zIndex:1004,width:"auto",height:"auto"});return{add:l,remove:h}}function ob(l,h){function s(o){o=o||Pa.event;if(!o.target)o.target=
o.srcElement;if(!o.pageX)o.pageX=o.clientX+(va.documentElement.scrollLeft||va.body.scrollLeft);if(!o.pageY)o.pageY=o.clientY+(va.documentElement.scrollTop||va.body.scrollTop);return o}function q(o){var Q={xAxis:[],yAxis:[]};p(Ka,function(L){var la=L.translate,Y=L.isXAxis,eb=Ea?!Y:Y;Q[Y?"xAxis":"yAxis"].push({axis:L,value:la(eb?o.pageX-lb.x-ga:ka-o.pageY+lb.y+I,true)})});return Q}function M(){ib.onmousedown=function(o){o=s(o);o.preventDefault&&o.preventDefault();l.mouseIsDown=Nb=true;X=o.pageX;ca=
o.pageY;if(Ub&&(w||qa)){P||(P=V(Va,null,{position:wa,border:"none",background:"#4572A7",opacity:0.25,width:S?0:sa+F,height:Na?0:ka+F}));sc.div.appendChild(P)}};ib.onmousemove=function(o){o=s(o);o.returnValue=false;if(Nb){za=Math.sqrt(Math.pow(X-o.pageX,2)+Math.pow(ca-o.pageY,2))>10;if(S){var Q=o.pageX-X;ra(P,{width:Da(Q)+F,left:(Q>0?0:Q)+X-lb.x-ga+F})}if(Na){o=o.pageY-ca;ra(P,{height:Da(o)+F,top:(o>0?0:o)+ +ca-lb.y-I+F})}}else ea(o);return false};ib.onmouseup=function(){var o;if(P){var Q={xAxis:[],
yAxis:[]},L=P.offsetLeft,la=P.offsetTop,Y=P.offsetWidth,eb=P.offsetHeight;if(za){p(Ka,function(Ya){var hb=Ya.translate,Ua=Ya.isXAxis,wb=Ea?!Ua:Ua,sb=hb(wb?L:ka-la-eb,true);hb=hb(wb?L+Y:ka-la,true);Q[Ua?"xAxis":"yAxis"].push({axis:Ya,min:ta.min(sb,hb),max:Lb(sb,hb)})});na(l,"selection",Q,y);o=true}Ca(P);P=null}l.mouseIsDown=Nb=za=false};ib.onmouseout=function(o){o=o||Pa.event;if((o=o.relatedTarget||o.toElement)&&o!=dc&&o.tagName!="AREA"){D();l.mouseIsDown=Nb=za=false}};ib.onclick=function(o){o=s(o);
o.cancelBubble=true;if(!za)if(U&&o.target.tagName=="AREA"){var Q=U.plotX,L=U.plotY;H(U,{pageX:lb.x+ga+(Ea?sa-L:Q),pageY:lb.y+I+(Ea?ka-Q:L)});na(l.hoverSeries,"click",H(o,{point:U}));U.firePointEvent("click",o)}else{H(o,q(o));na(l,"click",o)}za=false}}function ea(o){var Q=l.hoverPoint,L=l.hoverSeries;if(L){Q||(Q=L.tooltipPoints[Ea?o.pageY-lb.y-I:o.pageX-lb.x-ga]);if(Q&&Q!=U){U&&U.firePointEvent("mouseOut");Q.firePointEvent("mouseOver");Ab&&Ab.refresh(Q);U=Q}}}function xa(){var o="highchartsMap"+bd++;
l.imagemap=ib=V("map",{name:o,id:o,className:"highcharts-image-map"},null,oa);dc=V("img",{useMap:"#"+o},{width:sa+F,height:ka+F,left:ga+F,top:I+F,opacity:0,border:"none",position:wa,clip:"rect(1px,"+sa+"px,"+ka+"px,1px)",zIndex:9},ib);if(!Ra)dc.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}function D(){Ab&&Ab.hide();if(l.hoverSeries){l.hoverSeries.setState();U=l.hoverSeries=null}}function ia(o){var Q=0,L,la=ib.childNodes;for(L=0;L<la.length;L++)if(la[L].isLegendArea){Q=
L+1;break}ib.insertBefore(o,la[Q])}var U,X,ca,za,P,Aa=A.zoomType,w=/x/.test(Aa),qa=/y/.test(Aa),S=w&&!Ea||qa&&Ea,Na=qa&&!Ea||w&&Ea;xa();if(h.enabled)l.tooltip=Ab=jb(h);M();setInterval(function(){yc&&yc()},32);H(this,{insertAtFront:ia,zoomX:w,zoomY:qa,resetTracker:D})}function jb(l){function h(ia,U){var X=ia.tooltipPos;U=ia.series;var ca=l.borderColor||ia.color||U.color||"#606060",za=t.inverted,P,Aa,w,qa=ea.offsetHeight;w=ia.tooltipText;M=U;P=X?X[0]:za?sa-ia.plotY:ia.plotX;X=X?X[1]:za?ka-ia.plotX:
ia.plotY;if(P>=0&&P<=sa&&X>=0&&X<=ka)Aa=true;if(w===false||!Aa)q();else{ea.innerHTML=w;ra(ea,{overflow:ec});Aa=ea.offsetWidth-xa;w=ea.offsetHeight-xa;ra(ea,{overflow:db});if(Aa>(D.w||0)+20||Aa<(D.w||0)-20||w>D.h||D.c!=ca||qa!=ea.offsetHeight){D.clear();D.drawRect(xa/2,xa/2,Aa+20,w,ca,xa,l.borderRadius,l.backgroundColor,l.shadow);H(D,{w:Aa,h:w,c:ca})}ca=P-D.w+ga-35;P=X-D.h+10+I;if(ca<5){ca=5;P-=20}if(P<5)P=5;else if(P+D.h>Ga)P=Ga-D.h-5;s(O(ca),O(P));U.drawPointState(ia,"hover");kb.style.visibility=
ec}}function s(ia,U){var X=kb.style.visibility==db,ca=X?ia:(kb.offsetLeft+ia)/2;X=X?U:(kb.offsetTop+U)/2;ra(kb,{left:ca+F,top:X+F});yc=Da(ia-ca)>1||Da(U-X)>1?function(){s(ia,U)}:null}function q(){if(kb)kb.style.visibility=db;M&&M.drawPointState()}var M,ea,xa=l.borderWidth,D;kb=V(Va,null,{position:wa,visibility:db,overflow:db,padding:"0 50px 5px 0",zIndex:8},oa);D=new pa("tooltip-box",kb,null,{width:mb+F,height:Ga+F});ea=V(Va,{className:"highcharts-tooltip"},H(l.style,{maxWidth:mb-40+F,textOverflow:"ellipsis",
position:Xb,zIndex:2}),kb);return{refresh:h,hide:q}}var nb=function(l){function h(Aa){if(Aa){p(U,function(w){Ca(w.legendItem)});U=[]}P&&za.reverse();p(za,function(w){if(w.options.showInLegend){var qa=w.options.legendType=="point"?w.data:[w];p(qa,function(S){S.simpleSymbol=/(bar|pie|area|column)/.test(w.type);S.legendItem=M=V("li",{innerHTML:q.labelFormatter.call(S),className:S.visible?"":Ob},null,D.firstChild);if(S.options&&S.options.showCheckbox)S.checkbox=V("input",{type:"checkbox",checked:S.selected,
defaultChecked:S.selected},q.itemCheckboxStyle,M);Oa(M,"mouseover",function(){S.setState("hover")});Oa(M,"mouseout",function(){S.setState()});Oa(M,"click",function(Na){Na=Na.target;var o="legendItemClick",Q=function(){S.setVisible()};if(Na.tagName=="INPUT")na(S,"checkboxClick",{checked:Na.checked},function(){S.select()});else S.firePointEvent?S.firePointEvent(o,null,Q):na(S,o,null,Q)});U.push(S)})}});P&&za.reverse()}function s(Aa){if(Aa){X.clear();Ca(ca);ca=null}if(za.length){if(q.borderWidth||q.backgroundColor)X.drawRect(D.offsetLeft,
D.offsetTop,D.offsetWidth,D.offsetHeight,q.borderColor,q.borderWidth,q.borderRadius,q.backgroundColor,q.shadow);p(U,function(w){if(w.legendItem){var qa=w.legendItem,S=D.offsetLeft+qa.offsetLeft;qa=D.offsetTop+qa.offsetTop+qa.offsetHeight/2;var Na=w.legendItem.className==Ob,o=Na?q.itemHiddenStyle.color:w.color;!w.simpleSymbol&&w.options&&w.options.lineWidth&&X.drawLine(S,qa,S+xa,qa,o,w.options.lineWidth);if(w.simpleSymbol)X.drawRect(S,qa-6,16,12,null,0,2,o);else if(w.options&&w.options.marker&&w.options.marker.enabled)w.drawMarker(X,
S+xa/2,qa,aa(w.options.marker,Na?{fillColor:o,lineColor:o}:null))}});if(ib){ca=V("area",{shape:"rect",isLegendArea:true,coords:[D.offsetLeft-ga,D.offsetTop-I,D.offsetLeft+D.offsetWidth-ga,D.offsetTop+D.offsetHeight-I].join(",")});ub.insertAtFront(ca);ca.onmouseover=function(w){w=w||Pa.event;w=w.relatedTarget||w.fromElement;if(w!=D&&!Nb){Ab&&Ab.hide();ra(D,{zIndex:10})}};D.onmouseout=ca.onmouseout=function(w){w=w||Pa.event;if((w=w.relatedTarget||w.toElement)&&(w==dc||w.tagName=="AREA"&&w!=ca))ra(D,
{zIndex:7})}}}}var q=l.options.legend;if(q.enabled){var M,ea=q.layout,xa=q.symbolWidth,D,ia="#"+oa.id+" .highcharts-legend li",U=[],X=new pa("legend",oa,null,{zIndex:7}),ca,za=l.series,P=q.reversed;this.dom=D=V(Va,{className:"highcharts-legend highcharts-legend-"+ea,innerHTML:'<ul style="margin:0;padding:0"></ul>'},H({position:wa,zIndex:7},q.style),oa);Gb(ia,H(q.itemStyle,{paddingLeft:xa+q.symbolPadding+F,"float":ea=="horizontal"?"left":"none"}));Gb(ia+":hover",q.itemHoverStyle);Gb(ia+"."+Ob,q.itemHiddenStyle);
Gb(".highcharts-legend-horizontal li",{"float":"left"});h();s();return{renderHTML:h,drawGraphics:s}}};Pa.G_vmlCanvasManager&&Pa.G_vmlCanvasManager.init_(document);Zb=aa(Zb,Ba.xAxis);tc=aa(tc,Ba.yAxis);Ba.xAxis=Ba.yAxis=null;a=aa(Ba,a);var A=a.chart,T=A.margin;T=typeof T=="number"?[T,T,T,T]:T;var I=T[0],fb=T[1],cb=T[2],ga=T[3],Xa,rb,oa,qc,mb,Ga;C();var t=this;T=A.events;var zc,ib,Ab,Nb,Jc=new pa("chart-background",oa),vb,sc,ka,sa,ub,dc,Jb,lb=Hc(oa),Ub=A.showAxes,Ka=[],Cb,ya=[],Yb,Ea,yc,kb;fc=Bb=0;
Oa(Pa,"resize",i);Oa(Pa,"unload",La);if(T)for(zc in T)Oa(t,zc,T[zc]);t.addLoading=function(l){t.resources[l]=false};t.clearLoading=function(l){t.resources[l]=true;E()};t.options=a;t.series=ya;t.container=oa;t.resources={};t.inverted=Ea=a.chart.inverted;t.chartWidth=mb;t.chartHeight=Ga;t.plotWidth=sa=mb-ga-fb;t.plotHeight=ka=Ga-I-cb;t.plotLeft=ga;t.plotTop=I;t.redraw=c;t.addSeries=b;t.getSelectedPoints=r;t.getSelectedSeries=v;t.showLoading=e;t.hideLoading=f;t.get=g;t.destroy=La;t.updatePosition=i;
t.plotLayer=sc=new pa("plot",oa,null,{position:wa,width:sa+F,height:ka+F,left:ga+F,top:I+F,overflow:db,zIndex:3});if(A.plotBackgroundImage){t.addLoading("plotBack");Yb=V("img");Yb.onload=function(){t.clearLoading("plotBack")};Yb.src=A.plotBackgroundImage}p(a.series||[],function(l){d(l)});t.tracker=ub=new ob(t,a.tooltip);E()}function Tc(a){for(var b=[],c=[],d=0;d<a.length;d++){b[d]=a[d].plotX;c[d]=a[d].plotY}this.xdata=b;this.ydata=c;a=[];this.y2=[];var e=c.length;this.n=e;this.y2[0]=0;this.y2[e-1]=
0;a[0]=0;for(d=1;d<e-1;d++){var f=b[d+1]-b[d-1];f=(b[d]-b[d-1])/f;var g=f*this.y2[d-1]+2;this.y2[d]=(f-1)/g;a[d]=(c[d+1]-c[d])/(b[d+1]-b[d])-(c[d]-c[d-1])/(b[d]-b[d-1]);a[d]=(6*a[d]/(b[d+1]-b[d-1])-f*a[d-1])/g}for(b=e-2;b>=0;b--)this.y2[b]=this.y2[b]*this.y2[b+1]+a[b]}var ma,va=document,Pa=window,ta=Math,O=ta.round,Za=ta.floor,Lb=ta.max,Da=ta.abs,gc=ta.cos,hc=ta.sin,B=navigator.userAgent,Ra=/msie/i.test(B)&&!Pa.opera,cd=/AppleWebKit/.test(B),kc,bd=0,Bb,fc,Uc={},rc=0,Sa=1,Qb,Va="div",wa="absolute",
Xb="relative",db="hidden",Ob="highcharts-"+db,ec="visible",F="px",Tb,oc,mc,nc,Ib,Rb,Sb,Dc,Ec,pc,Fc,Gc,ua=(B=Pa.HighchartsAdapter)||{},p=ua.each,Wb=ua.grep,qb=ua.map,aa=ua.merge,Pb=ua.hyphenate,Oa=ua.addEvent,na=ua.fireEvent,Db=ua.animate,Ac=ua.getAjax,bb={};if(!B&&Pa.jQuery){var pb=jQuery;p=function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===false)return c};Wb=pb.grep;qb=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=b.call(a[d],a[d],d,a);return c};aa=function(){var a=
arguments;return pb.extend(true,null,a[0],a[1],a[2],a[3])};Pb=function(a){return a.replace(/([A-Z])/g,function(b,c){return"-"+c.toLowerCase()})};Oa=function(a,b,c){pb(a).bind(b,c)};na=function(a,b,c,d){var e=pb.Event(b),f="detached"+b;H(e,c);if(a[b]){a[f]=a[b];a[b]=null}pb(a).trigger(e);if(a[f]){a[b]=a[f];a[f]=null}d&&!e.isDefaultPrevented()&&d(e)};Db=function(a,b,c){pb(a).animate(b,c)};Ac=function(a,b){pb.get(a,null,b)};pb.extend(pb.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}})}else if(!B&&
Pa.MooTools){p=$each;qb=function(a,b){return a.map(b)};Wb=function(a,b){return a.filter(b)};aa=$merge;Pb=function(a){return a.hyphenate()};Oa=function(a,b,c){if(!a.addEvent)if(a.nodeName)a=$(a);else H(a,new Events);a.addEvent(b,c)};na=function(a,b,c,d){b=new Event({type:b,target:a});b=H(b,c);b.preventDefault=function(){d=null};a.fireEvent&&a.fireEvent(b.type,b);d&&d(b)};Db=function(a,b,c){a=new Fx.Morph($(a),H(c,{transition:Fx.Transitions.Quad.easeInOut}));a.start(b)};Ac=function(a,b){(new Request({url:a,
method:"get",onSuccess:b})).send()}}B='normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif';ua={enabled:true,align:"center",x:0,y:15,style:{color:"#666",font:B.replace("12px","11px")}};var Ba={colors:["#4572A7","#AA4643","#89A54E","#80699B","#3D96AE","#DB843D","#92A8CD","#A47D7C","#B5CA92"],symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:["January","February","March","April","May","June","July","August","September",
"October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],decimalPoint:".",resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:true},chart:{margin:[50,50,60,80],borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:true,plotBorderColor:"#C0C0C0"},title:{text:"Chart title",style:{textAlign:"center",color:"#3E576F",font:B.replace("12px","16px"),margin:"10px 0 0 0"}},subtitle:{text:"",
style:{textAlign:"center",color:"#6D869F",font:B,margin:0}},plotOptions:{line:{allowPointSelect:false,showCheckbox:false,animation:true,events:{},lineWidth:2,shadow:true,marker:{enabled:true,symbol:"auto",lineWidth:0,radius:4,lineColor:"#FFFFFF",fillColor:"auto",states:{hover:{},select:{fillColor:"#FFFFFF",lineColor:"auto",lineWidth:2}}},point:{events:{}},dataLabels:aa(ua,{enabled:false,y:-6,formatter:function(){return this.y}}),showInLegend:true,states:{hover:{lineWidth:3,marker:{}},select:{marker:{}}}}},
labels:{style:{position:wa,color:"#3E576F",font:B}},legend:{enabled:true,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:5,shadow:true,style:{bottom:"10px",left:"80px",padding:"5px"},itemStyle:{listStyle:"none",margin:0,padding:"0 2em 0 0",font:B,cursor:"pointer",color:"#3E576F",position:Xb},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:wa,right:0},symbolWidth:16,symbolPadding:5},loading:{hideDuration:100,
labelStyle:{font:B.replace("normal","bold"),position:Xb,top:"1em"},showDuration:100,style:{position:wa,backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:true,formatter:function(){var a=this,b=a.series,c=b.xAxis,d=a.x;return"<b>"+(a.point.name||b.name)+"</b><br/>"+(Qa(d)?"X value: "+(c&&c.options.type=="datetime"?lc("%Y-%m-%d %H:%M:%S",d):d)+"<br/>":"")+"Y value: "+a.y},backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:2,borderRadius:5,shadow:true,snap:10,style:{color:"#333333",
font:B,fontSize:"9pt",padding:"5px",whiteSpace:"nowrap"}},toolbar:{itemStyle:{color:"#4572A7",cursor:"pointer",margin:"20px",font:B}},credits:{enabled:true,text:"Highcharts.com",href:"http://www.highcharts.com",style:{position:wa,right:"10px",bottom:"5px",color:"#999",textDecoration:"none",font:B.replace("12px","10px")},target:"_self"}},Zb={dateTimeLabelFormats:{second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:false,gridLineColor:"#C0C0C0",
labels:ua,lineColor:"#C0D0E0",lineWidth:1,max:null,min:null,maxZoom:null,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",minorTickWidth:1,showFirstLabel:true,showLastLabel:false,startOfWeek:1,startOnTick:false,tickColor:"#C0D0E0",tickInterval:"auto",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{enabled:false,text:"X-values",align:"middle",margin:35,style:{color:"#6D869F",
font:B.replace("normal","bold")}},type:"linear"},tc=aa(Zb,{endOnTick:true,gridLineWidth:1,tickPixelInterval:72,showLastLabel:true,labels:{align:"right",x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:true,tickWidth:0,title:{enabled:true,margin:40,rotation:270,text:"Y-values"}}),$c={labels:{align:"right",x:-8,y:3},title:{rotation:270}},Zc={labels:{align:"left",x:8,y:3},title:{rotation:90}},Kc={labels:{align:"center",x:0,y:14},title:{rotation:0}},Yc=aa(Kc,{labels:{y:-5}});B=Ba.plotOptions;
ua=B.line;B.spline=aa(ua);B.scatter=aa(ua,{lineWidth:0,states:{hover:{lineWidth:0}}});B.area=aa(ua,{fillColor:"auto"});B.areaspline=aa(B.area);B.column=aa(ua,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,pointPadding:0.1,states:{hover:{brightness:0.1,shadow:false},select:{color:"#C0C0C0",borderColor:"#000000",shadow:false}}});B.bar=aa(B.column,{dataLabels:{align:"left",x:5,y:0}});B.pie=aa(ua,{borderColor:"#FFFFFF",borderWidth:1,center:["50%","50%"],legendType:"point",size:"90%",
slicedOffset:10,states:{hover:{brightness:0.1,shadow:false}}});Cc();var Bc=function(a){function b(i){if(g=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i))f=[parseInt(g[1]),parseInt(g[2]),parseInt(g[3]),parseFloat(g[4])];else if(g=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(i))f=[parseInt(g[1],16),parseInt(g[2],16),parseInt(g[3],16),1]}function c(){return f&&!isNaN(f[0])?"rgba("+f.join(",")+")":a}function d(i){if(typeof i=="number"&&
i!=0)for(var k=0;k<3;k++){f[k]+=parseInt(i*255);if(f[k]<0)f[k]=0;if(f[k]>255)f[k]=255}return this}function e(i){f[3]=i;return this}var f=[],g;b(a);return{get:c,brighten:d,setOpacity:e}},pa=function(a,b,c,d){var e=this,f=b.style;c=H({className:"highcharts-"+a},c);d=H({width:f.width,height:f.height,position:wa,top:0,left:0,margin:0,padding:0,border:"none"},d);a=V(Va,c,d,b);H(e,{div:a,width:parseInt(d.width),height:parseInt(d.height)});e.svg=Ra?"":'<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+
e.width+'px" height="'+e.height+'">';e.basicSvg=e.svg};pa.prototype={getCtx:function(){if(!this.ctx){var a=V("canvas",{id:"highcharts-canvas-"+rc++,width:this.width,height:this.height},{position:wa},this.div);if(Ra){G_vmlCanvasManager.initElement(a);a=va.getElementById(a.id)}this.ctx=a.getContext("2d")}return this.ctx},getSvg:function(){if(!this.svgObject){var a=this,b=a.div,c=a.width;a=a.height;if(Ra){if(!va.namespaces.g_vml_){va.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml");va.createStyleSheet().cssText=
"g_vml_\\:*{behavior:url(#default#VML)}"}this.svgObject=V(Va,null,{width:c+F,height:a+F,position:wa},b)}else this.svgObject=V("object",{width:c,height:a,type:"image/svg+xml"},{position:wa,left:0,top:0},b)}return this.svgObject},drawLine:function(a,b,c,d,e,f){var g=this.getCtx();if(a==c)a=c=O(a)+f%2/2;if(b==d)b=d=O(b)+f%2/2;g.lineWidth=f;g.lineCap="round";g.beginPath();g.moveTo(a,b);g.strokeStyle=e;g.lineTo(c,d);g.closePath();g.stroke()},drawPolyLine:function(a,b,c,d,e){var f=this.getCtx(),g=[];if(d&&
c){p(a,function(i){g.push(i===ma?i:i+1)});for(d=1;d<=3;d++)this.drawPolyLine(g,"rgba(0, 0, 0, "+0.05*d+")",6-2*d)}f.beginPath();for(d=0;d<a.length;d+=2)f[d==0?"moveTo":"lineTo"](a[d],a[d+1]);H(f,{lineWidth:c,lineJoin:"round"});if(b&&c){f.strokeStyle=Hb(b,f);f.stroke()}if(e){f.fillStyle=Hb(e,f);f.fill()}},drawRect:function(a,b,c,d,e,f,g,i,k,j){var r=function(){var R;if(c>0&&d>0){v.beginPath();if(g){v.moveTo(a,b+g);v.lineTo(a,b+d-g);v.quadraticCurveTo(a,b+d,a+g,b+d);v.lineTo(a+c-g,b+d);v.quadraticCurveTo(a+
c,b+d,a+c,b+d-g);v.lineTo(a+c,b+g);v.quadraticCurveTo(a+c,b,a+c-g,b);v.lineTo(a+g,b);v.quadraticCurveTo(a,b,a,b+g)}else v.rect(a,b,c,d);v.closePath();R=true}return R},v=this.getCtx(),y=(f||0)%2/2;a=O(a)+y;b=O(b)+y;c=O(c-2*y);d=O(d-2*y);if(k)for(k=1;k<=3;k++)this.drawRect(a+1,b+1,c,d,"rgba(0, 0, 0, "+0.05*k+")",6-2*k,g);j&&v.drawImage(j,a,b,c,d);if(r()){if(i){v.fillStyle=Hb(i,v);v.fill();Pa.G_vmlCanvasManager&&r()}if(f){v.strokeStyle=Hb(e,v);v.lineWidth=f;v.stroke()}}},drawSymbol:function(a,b,c,d,
e,f,g){var i=this.getCtx(),k=/^url\((.*?)\)$/;i.beginPath();if(a=="square"){a=0.707*d;i.moveTo(b-a,c-a);i.lineTo(b+a,c-a);i.lineTo(b+a,c+a);i.lineTo(b-a,c+a);i.lineTo(b-a,c-a)}else if(a=="triangle"){c++;i.moveTo(b,c-1.33*d);i.lineTo(b+d,c+0.67*d);i.lineTo(b-d,c+0.67*d);i.lineTo(b,c-1.33*d)}else if(a=="triangle-down"){c--;i.moveTo(b,c+1.33*d);i.lineTo(b-d,c-0.67*d);i.lineTo(b+d,c-0.67*d);i.lineTo(b,c+1.33*d)}else if(a=="diamond"){i.moveTo(b,c-d);i.lineTo(b+d,c);i.lineTo(b,c+d);i.lineTo(b-d,c);i.lineTo(b,
c-d)}else k.test(a)?V("img",{onload:function(){var j=this,r=Uc[j.src]||[j.width,j.height];ra(j,{left:O(b-r[0]/2)+F,top:O(c-r[1]/2)+F,visibility:ec});Uc[j.src]=r},src:a.match(k)[1]},{position:wa,visibility:Ra?ec:db},this.div):i.arc(b,c,d,0,2*ta.PI,true);if(g){i.fillStyle=g;i.fill()}if(f&&e){i.strokeStyle=f||"rgb(100, 100, 255)";i.lineWidth=e||2;i.stroke()}},drawHtml:function(a,b,c){V(Va,H(b,{innerHTML:a}),H(c,{position:wa}),this.div)},drawText:function(){this.addText.apply(this,arguments);this.strokeText()},
addText:function(a,b,c,d,e,f){if(a||a===0){var g=this,i,k=g.div,j,r="";d=d||{};var v=d.color||"#000000";f=f||"left";var y=parseInt(d.fontSize||d.font.replace(/^[a-z ]+/,""));for(var R in d)r+=Pb(R)+":"+d[R]+";";p(["MozTransform","WebkitTransform","transform"],function(Wa){if(Wa in k.style)j=Wa});if(!e||j){a=V("span",{innerHTML:a},H(d,{position:wa,left:b+F,whiteSpace:"nowrap",bottom:O(g.height-c-y*0.25)+F,color:v}),k);r=a.offsetWidth;if(f=="right")ra(a,{left:b-r+F});else f=="center"&&ra(a,{left:O(b-
r/2)+F});if(e){f={left:0,center:50,right:100}[f];a.style[j]="rotate("+e+"deg)";a.style[j+"Origin"]=f+"% 100%"}}else if(Ra){i=true;d=(e||0)*ta.PI*2/360;e=gc(d);d=hc(d);R=g.width;y=y/3||3;var E=f=="left",K=f=="right",C=E?b:b-R*e;b=K?b:b+R*e;E=E?c:c-R*d;c=K?c:c+R*d;C+=y*d;b+=y*d;E-=y*e;c-=y*e;if(Da(C-b)<0.1)C+=0.1;if(Da(E-c)<0.1)E+=0.1;g.svg+='<g_vml_:line from="'+C+", "+E+'" to="'+b+", "+c+'" stroked="false"><g_vml_:fill on="true" color="'+v+'"/><g_vml_:path textpathok="true"/><g_vml_:textpath on="true" string="'+
a+'" style="v-text-align:'+f+";"+r+'"/></g_vml_:line>'}else{i=true;g.svg+='<g><text transform="translate('+b+","+c+") rotate("+(e||0)+')" style="fill:'+v+";text-anchor:"+{left:"start",center:"middle",right:"end"}[f]+";"+r.replace(/"/g,"'")+'">'+a+"</text></g>"}g.hasObject=i}},strokeText:function(){if(this.hasObject){var a=this.getSvg(),b=this.svg;if(Ra)a.innerHTML=b;else{a.data="data:image/svg+xml,"+b+"</svg>";cd&&this.div.appendChild(a)}}},clear:function(){var a=this,b=this.div;b=b.childNodes;a.ctx&&
a.ctx.clearRect(0,0,a.width,a.height);if(a.svgObject){Ca(a.svgObject);a.svgObject=null;a.svg=a.basicSvg}for(var c=b.length-1;c>=0;c--){a=b[c];/(SPAN|IMG)/.test(a.tagName)&&Ca(a)}},hide:function(){ra(this.div,{display:"none"})},show:function(){ra(this.div,{display:""})},destroy:function(){Ca(this.div);return null}};var ic=function(){};ic.prototype={init:function(a,b){var c=this;c.series=a;c.applyOptions(b);return c},applyOptions:function(a){var b=this,c=b.series;if(typeof a=="number"||a===null)b.y=
a;else if(typeof a=="object"&&typeof a.length!="number"){H(b,a);b.options=a}else if(typeof a[0]=="string"){b.name=a[0];b.y=a[1]}else if(typeof a[0]=="number"){b.x=a[0];b.y=a[1]}if(b.x===ma)b.x=c.autoIncrement()},destroy:function(){var a=this;a.stateLayer&&a.stateLayer.destroy();for(prop in a)a[prop]=null},select:function(a,b){var c=this,d=c.series,e=d.chart,f,g,i=da(c.stateLayer,d.singlePointLayer,e.singlePointLayer);c.selected=a=da(a,!c.selected);d.isDirty=true;c.firePointEvent(a?"select":"unselect");
i&&i.clear();p(e.series,function(k){f=k.stateLayers;b||p(k.data,function(j){if(j.selected&&j!=c){j.selected=false;na(j,"unselect");k.isDirty=true}});if(k.isDirty){for(g in f)f[g].clear();k.render()}})},update:function(a,b){var c=this,d=c.series;b=da(b,true);c.firePointEvent("update",{options:a},function(){c.applyOptions(a);d.isDirty=true;b&&d.chart.redraw()})},remove:function(a){var b=this,c=b.series,d=c.chart,e=c.data;a=da(a,true);b.firePointEvent("remove",null,function(){p(e,function(f,g){f==b&&
e.splice(g,1)});if(b.layer)b.layer=b.layer.destroy();if(b.legendItem){Ca(b.legendItem);b.legendItem=null;d.isDirty=true}c.isDirty=true;a&&d.redraw()})},firePointEvent:function(a,b,c){var d=this,e=this.series;e=e.options;if(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])this.importEvents();if(a=="click"&&e.allowPointSelect)c=function(f){d.select(null,f.ctrlKey||f.metaKey||f.shiftKey)};na(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=this,b=aa(a.series.options.point,
a.options);b=b.events;var c;a.events=b;for(c in b)Oa(a,c,b[c]);this.hasImportedEvents=true}},setTooltipText:function(){var a=this;a.tooltipText=a.series.chart.options.tooltip.formatter.call({series:a.series,point:a,x:a.category,y:a.y,percentage:a.percentage,total:a.stackTotal})}};var Ja=function(){this.isCartesian=true;this.type="line";this.pointClass=ic};Ja.prototype={init:function(a,b){var c=this,d,e=a.series.length;c.chart=a;b=c.setOptions(b);H(c,{index:e,options:b,name:b.name||"Series "+(e+1),
state:"",visible:b.visible!==false,selected:b.selected==true});a=b.events;for(d in a)Oa(c,d,a[d]);c.getColor();c.getSymbol();c.getData(b)},getData:function(a){var b=this,c=b.chart,d="series"+rc++;if(!a.data&&a.dataURL){c.addLoading(d);Ac(a.dataURL,function(e){b.dataLoaded(e);c.clearLoading(d)})}else b.dataLoaded(a.data)},dataLoaded:function(a){var b=this,c=b.chart,d=b.options,e=[""],f=d.dataParser,g={},i;if(d.dataURL&&!f)f=function(k){return eval(k)};if(f)a=f.call(b,a);b.layerGroup=i=new pa("series-group",
c.plotLayer.div,null,{zIndex:2});d.states.hover.enabled&&e.push("hover");p(e,function(k){g[k]=new pa("state-"+k,i.div)});b.stateLayers=g;b.setData(a,false)},autoIncrement:function(){var a=this,b=a.options,c=a.xIncrement;c=da(c,b.pointStart,0);a.pointInterval=da(a.pointInterval,b.pointInterval,1);a.xIncrement=c+a.pointInterval;return c},cleanData:function(){var a=this;a=a.data;var b;a.sort(function(c,d){return c.x-d.x});for(b=a.length-1;b>=0;b--)a[b-1]&&a[b-1].x==a[b].x&&a.splice(b-1,1)},getSegments:function(){var a=
-1,b=[],c=this.data;p(c,function(d,e){if(d.y===null){e>a+1&&b.push(c.slice(a+1,e));a=e}else e==c.length-1&&b.push(c.slice(a+1,e+1))});this.segments=b},setOptions:function(a){var b=this.chart.options.plotOptions;a=aa(b[this.type],b.series,a);b=a.marker;var c=a.states.hover.marker;if(c.lineWidth===ma)c.lineWidth=b.lineWidth+1;if(c.radius===ma)c.radius=b.radius+1;return a},getColor:function(){var a=this.chart.options.colors;this.color=this.options.color||a[Bb++]||"#0000ff";if(Bb>=a.length)Bb=0},getSymbol:function(){var a=
this.chart.options.symbols,b=this.options.marker.symbol||"auto";if(b=="auto")b=a[fc++];this.symbol=b;if(fc>=a.length)fc=0},addPoint:function(a,b,c){var d=this,e=d.data;a=(new d.pointClass).init(d,a);b=da(b,true);e.push(a);c&&e.shift();d.isDirty=true;b&&d.chart.redraw()},setData:function(a,b){var c=this;c.xIncrement=null;a=qb(jc(a),function(d){return(new c.pointClass).init(c,d)});c.data=a;c.cleanData();c.getSegments();c.isDirty=true;da(b,true)&&c.chart.redraw()},remove:function(a){var b=this,c=b.chart;
a=da(a,true);if(!b.isRemoving){b.isRemoving=true;na(b,"remove",null,function(){Ca(b.layerGroup.div);p(b.areas,function(d){Ca(d)});Ca(b.legendItem);b.legendItem=null;p(c.series,function(d,e){d==b&&c.series.splice(e,1)});c.isDirty=true;a&&c.redraw()})}b.isRemoving=false},translate:function(){var a=this.chart,b=this,c=b.options.stacking,d=b.xAxis.categories,e=b.yAxis,f=e.stacks[b.type];p(this.data,function(g){var i=g.x,k=g.y,j;g.plotX=b.xAxis.translate(g.x);if(c&&b.visible&&f[i]){j=f[i];i=j.total;j.cum=
j=j.cum-k;k=j+k;if(c=="percent"){j=i?j*100/i:0;k=i?k*100/i:0}g.percentage=i?g.y*100/i:0;g.stackTotal=i;g.yBottom=e.translate(j,0,1)}if(k!==null)g.plotY=e.translate(k,0,1);g.clientX=a.inverted?a.plotHeight-g.plotX+a.plotTop:g.plotX+a.plotLeft;g.category=d&&d[g.x]!==ma?d[g.x]:g.x})},setTooltipPoints:function(a){var b=this,c=b.chart,d=c.inverted,e=[],f=d?c.plotHeight:c.plotWidth,g,i,k=[];if(a)b.tooltipPoints=null;p(b.segments,function(j){e=e.concat(j)});if(b.xAxis.reversed)e=e.reverse();p(e,function(j,
r){b.tooltipPoints||j.setTooltipText();g=e[r-1]?e[r-1].high+1:0;for(i=j.high=e[r+1]?Za((j.plotX+(e[r+1]?e[r+1].plotX:f))/2):f;g<=i;)k[d?f-g++:g++]=j});b.tooltipPoints=k},drawLine:function(a){var b,c=this,d=c.options,e=c.chart,f=d.animation&&c.animate,g=c.stateLayers[a],i=d.lineColor||c.color,k=d.fillColor=="auto"?Bc(c.color).setOpacity(d.fillOpacity||0.75).get():d.fillColor,j=e.inverted,r=(j?0:e.plotHeight)-c.yAxis.translate(0);if(a)d=aa(d,d.states[a]);f&&c.animate(true);p(c.segments,function(v){var y=
[],R=[];p(v,function(E,K){if(K&&d.step){K=v[K-1];y.push(j?e.plotWidth-K.plotY:E.plotX,j?e.plotHeight-E.plotX:K.plotY)}y.push(j?e.plotWidth-E.plotY:E.plotX,j?e.plotHeight-E.plotX:E.plotY)});if(/area/.test(c.type)){for(b=0;b<y.length;b++)R.push(y[b]);if(d.stacking&&c.type!="areaspline")for(b=v.length-1;b>=0;b--)R.push(v[b].plotX,v[b].yBottom);else R.push(j?r:v[v.length-1].plotX,j?e.plotHeight-v[v.length-1].plotX:r,j?r:v[0].plotX,j?e.plotHeight-v[0].plotX:r);g.drawPolyLine(R,null,null,d.shadow,k)}d.lineWidth&&
g.drawPolyLine(y,i,d.lineWidth,d.shadow)});f&&c.animate()},animate:function(a){var b=this,c=b.chart,d=c.inverted,e=b.layerGroup.div;if(b.visible)if(a)ra(e,H({overflow:db},d?{height:0}:{width:0}));else{Db(e,d?{height:c.plotHeight+F}:{width:c.plotWidth+F},{duration:1E3});this.animate=null}},drawPoints:function(a){var b=this,c=b.stateLayers[a];a=b.options;var d=a.marker;a=b.data;var e=b.chart,f=e.inverted;d.enabled&&p(a,function(g){if(g.plotY!==ma)b.drawMarker(c,f?e.plotWidth-g.plotY:g.plotX,f?e.plotHeight-
g.plotX:g.plotY,aa(d,g.marker));g.selected&&b.drawPointState(g,"select",c)})},drawMarker:function(a,b,c,d){if(d.lineColor=="auto")d.lineColor=this.color;if(d.fillColor=="auto")d.fillColor=this.color;if(d.symbol=="auto")d.symbol=this.symbol;a.drawSymbol(d.symbol,b,c,d.radius,d.lineWidth,d.lineColor,d.fillColor)},drawDataLabels:function(){if(this.options.dataLabels.enabled){var a=this,b,c,d=a.data,e=a.options.dataLabels,f,g=a.dataLabelsLayer,i=a.chart,k=i.inverted,j=a.type,r=j=="pie",v;if(g)g.clear();
else a.dataLabelsLayer=g=new pa("data-labels",a.layerGroup.div,null,{zIndex:1});e.style.color=e.color=="auto"?a.color:e.color;p(d,function(y){var R=y.plotX,E=y.plotY,K=y.tooltipPos;f=e.formatter.call({x:y.x,y:y.y,series:a,point:y});b=(k?i.plotWidth-E:R)+e.x;c=(k?i.plotHeight-R:E)+e.y;if(K){b=K[0]+e.x;c=K[1]+e.y}if(r){if(!y.dataLabelsLayer)y.dataLabelsLayer=new pa("data-labels",y.layer.div,null,{zIndex:3});g=y.dataLabelsLayer}v=e.align;if(j=="column")b+={center:y.w/2,right:y.w}[v]||0;if(f)g[r?"drawText":
"addText"](f,b,c,e.style,e.rotation,v)});r||g.strokeText()}},drawPointState:function(a,b,c){var d=this.chart,e=d.inverted,f=b=="hover";c=c||d.singlePointLayer;var g=this.options;if(f){if(!c)c=d.singlePointLayer=new pa("single-point",d.plotLayer.div,null,{zIndex:3});c.clear()}if(b){var i=g.states[b].marker;b=g.marker.states[b];if(f&&b.radius===ma)b.radius=i.radius+2;if((f=aa(g.marker,a.marker,i,b))&&f.enabled)this.drawMarker(c,e?d.plotWidth-a.plotY:a.plotX,e?d.plotHeight-a.plotX:a.plotY,f)}},destroy:function(){var a=
this,b;p(a.data,function(c){c.destroy()});for(b in a)a[b]=null},render:function(){var a=this,b,c=a.stateLayers;a.drawDataLabels();if(a.visible)for(b in c){a.drawLine(b);a.drawPoints(b)}else a.setVisible(false,false);if(!a.hasRendered&&c.hover){c.hover.hide();hasRendered=true}a.isDirty=false},redraw:function(){var a=this;a.translate();a.setTooltipPoints(true);a.createArea();a.clear();a.render()},clear:function(){var a=this.stateLayers;for(var b in a){a[b].clear();a[b].cleared=true}if(this.dataLabelsLayer){this.dataLabelsLayer.clear();
this.hasDrawnDataLabels=false}},setState:function(a){a=a||"";if(this.state!=a){var b=this,c=b.stateLayers,d=c[a];c=c[b.state];var e=b.singlePointLayer||b.chart.singlePointLayer;b.state=a;if(d)if(a)d.show();else{c&&c.hide();e&&e.clear()}}},setVisible:function(a,b){var c=this,d=c.chart,e=c.layerGroup,f=c.legendItem,g=c.areas,i=c.visible;if(c.visible=a=a===ma?!i:a){c.isDirty=true;e.show()}else e.hide();if(f){f.className=a?"":Ob;d.legend.drawGraphics(true)}g&&p(g,function(k){a?d.tracker.insertAtFront(k):
Ca(k)});d.options.chart.ignoreHiddenSeries&&c.options.stacking&&p(d.series,function(k){if(k.options.stacking&&k.visible)k.isDirty=true});b!==false&&d.redraw();na(c,a?"show":"hide")},show:function(){this.setVisible(true)},hide:function(){this.setVisible(false)},select:function(a){var b=this;b.selected=a=a===ma?!b.selected:a;if(b.checkbox)b.checkbox.checked=a;na(b,a?"select":"unselect")},getAreaCoords:function(){var a=this,b=this.chart,c=b.inverted,d=b.plotWidth,e=b.plotHeight,f=a.xAxis.reversed,g,
i=b.options.tooltip.snap,k=[];p(a.splinedata||a.segments,function(j,r){if((g=j.length>1&&j[0].x>j[1].x)&&!f||f&&!g)j=j.reverse();var v=[],y=[],R=[];p([y,R],function(E){for(var K=0,C=0,Wa,La,Fa=[j[0]],Kb=E==y?1:-1,ob,jb,nb,A,T,I,fb;j[C];){if(j[C].plotX>j[K].plotX+i||C==j.length-1){Wa=j[C];La=j.slice(K,C-1);p(La,function(cb){if(Kb*cb.plotY<Kb*Wa.plotY)Wa=cb});if(O(j[K].plotX)<O(Wa.plotX)||j[C].plotX>j[K].plotX+i)Fa.push(Wa);K=C}C++}Fa[Fa.length-1]!=j[j.length-1]&&Fa.push(j[j.length-1]);for(C=0;C<Fa.length;C++)if(C>
0){jb=Fa[C].plotX;ob=Fa[C].plotY;K=Fa[C-1].plotX;La=Fa[C-1].plotY;A=jb-Fa[C-1].plotX;I=T=ob-Fa[C-1].plotY;nb=-A;fb=ta.sqrt(ta.pow(I,2)+ta.pow(nb,2));if(C==1){K-=i/fb*A;La-=i/fb*T}else if(C==Fa.length-1){jb+=i/fb*A;ob+=i/fb*T}A=Kb*i/fb;K=O(K+A*I);La=O(La+A*nb);jb=O(jb+A*I);nb=O(ob+A*nb);if(E[E.length-1]&&E[E.length-1][0]>K)for(ob=false;!ob;){T=E.pop();I=E[E.length-1];if(!I)break;A=(La-nb)/(K-jb);T=(I[1]-T[1])/(I[0]-T[0]);T=(-T*I[0]+I[1]+A*K-La)/(A-T);A=A*(T-K)+La;if(T>I[0]){E.push([O(T),O(A),1]);ob=
true}}else isNaN(K)||E.push([K,La]);E[E.length-1]&&E[E.length-1][0]<jb&&E.push([jb,nb])}});for(r=0;r<y.length;r++)v.push(c?d-y[r][1]:y[r][0],c?e-y[r][0]:y[r][1]);for(r=R.length-1;r>=0;r--)v.push(c?d-R[r][1]:R[r][0],c?e-R[r][0]:R[r][1]);v.length||v.push(O(j[0].plotX),O(j[0].plotY));v.length&&k.push([v.join(",")])});return k},createArea:function(){if(this.options.enableMouseTracking!==false){var a,b=this,c=b.options,d=b.chart,e=d.tracker,f=b.getAreaCoords(),g=[],i=b.areas,k;i&&p(i,function(j){Ca(j)});
p(f,function(j){k=/^[0-9]+,[0-9]+$/.test(j[0]);a=V("area",{shape:k?"circle":"poly",chart:d,coords:j[0]+(k?","+d.options.tooltip.snap:""),onmouseover:function(){if(!(!b.visible||d.mouseIsDown)){var r=d.hoverSeries;d.hoverPoint=j[1];c.events.mouseOver&&na(b,"mouseOver",{point:d.hoverPoint});r&&r!=b&&r.setState();/(column|bar|pie)/.test(b.type)||e.insertAtFront(a);b.setState("hover");d.hoverSeries=b}},onmouseout:function(){var r=d.hoverSeries;r&&c.events.mouseOut&&na(r,"mouseOut")}});if(c.cursor=="pointer")a.href=
"javascript:;";e.insertAtFront(a);g.push(a)});b.areas=g}}};B=ab(Ja);bb.line=B;B=ab(Ja,{type:"area"});bb.area=B;B=ab(Ja,{type:"spline",translate:function(){var a=this;Ja.prototype.translate.apply(a,arguments);a.splinedata=a.getSplineData()},drawLine:function(){var a=this,b=a.segments;a.segments=a.splinedata;Ja.prototype.drawLine.apply(a,arguments);a.segments=b},getSplineData:function(){var a=this,b=a.chart,c=[],d;p(a.segments,function(e){if(a.xAxis.reversed)e=e.reverse();var f=[],g,i;p(e,function(k,
j){g=e[j+2]||e[j+1]||k;i=e[j-2]||e[j-1]||k;g.plotX>0&&i.plotY<b.plotWidth&&f.push(k)});if(f.length>1)d=O(Lb(b.plotWidth,f[f.length-1].clientX-f[0].clientX)/3);c.push(e.length>1?d?(new Tc(f)).get(d):[]:e)});return a.splinedata=c}});bb.spline=B;Tc.prototype={get:function(a){a||(a=50);var b=this.n;b=(this.xdata[b-1]-this.xdata[0])/(a-1);var c=[],d=[];c[0]=this.xdata[0];d[0]=this.ydata[0];for(var e=[{plotX:c[0],plotY:d[0]}],f=1;f<a;f++){c[f]=c[0]+f*b;d[f]=this.interpolate(c[f]);e[f]={plotX:c[f],plotY:d[f]}}return e},
interpolate:function(a){for(var b=this.n-1,c=0;b-c>1;){var d=(b+c)/2;if(this.xdata[Za(d)]>a)b=d;else c=d}b=Za(b);c=Za(c);d=this.xdata[b]-this.xdata[c];var e=(this.xdata[b]-a)/d;a=(a-this.xdata[c])/d;return e*this.ydata[c]+a*this.ydata[b]+((e*e*e-e)*this.y2[c]+(a*a*a-a)*this.y2[b])*d*d/6}};B=ab(B,{type:"areaspline"});bb.areaspline=B;var Vb=ab(Ja,{type:"column",init:function(){Ja.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&p(b.series,function(c){if(c.type==a.type)c.isDirty=
true})},translate:function(){var a=this,b=a.chart,c=0,d;Ja.prototype.translate.apply(a);p(b.series,function(C){if(C.type==a.type)if(C.options.stacking){Qa(d)||(d=c++);C.columnIndex=d}else C.columnIndex=c++});var e=a.options,f=a.data,g=b.inverted,i=b.plotWidth,k=b.plotHeight,j=a.closestPoints;j=Da(f[1]?f[j].plotX-f[j-1].plotX:g?k:i);var r=j*e.groupPadding,v=j-2*r;v=v/c;var y=e.pointWidth;e=Qa(y)?(v-y)/2:v*e.pointPadding;var R=da(y,v-2*e);b=(b.options.xAxis.reversed?c-a.columnIndex:a.columnIndex)||
0;var E=-(j/2)+r+b*v+e,K=a.yAxis.translate(0);p(f,function(C){C.plotX+=E;C.w=R;C.y0=(g?i:k)-K;C.h=(C.yBottom||C.y0)-C.plotY})},drawLine:function(){},getSymbol:function(){},drawPoints:function(a){var b=this,c=b.options,d=b.chart,e=c.animation&&b.animate,f=d.inverted,g=b.data,i=b.stateLayers[a];e&&this.animate(true);p(g,function(k){if(k.plotY!==ma)i.drawRect(f?k.h>=0?d.plotWidth-k.plotY-k.h:d.plotWidth-k.plotY:k.plotX,f?d.plotHeight-k.plotX-k.w:k.h>=0?k.plotY:k.plotY+k.h,f?Da(k.h):k.w,f?k.w:Da(k.h),
c.borderColor,c.borderWidth,c.borderRadius,k.color||b.color,c.shadow);k.selected&&b.drawPointState(k,"select",i)});e&&b.animate()},drawPointState:function(a,b,c){var d=this,e=d.chart,f=d.options,g=a?a.options:null,i=e.inverted;c=c||d.singlePointLayer;if(b=="hover"){if(!c)c=d.singlePointLayer=new pa("single-point",d.layerGroup.div);c.clear()}if(b&&this.options.states[b]){b=aa(f,f.states[b],g);c.drawRect(i?e.plotWidth-a.plotY-a.h:a.plotX,i?e.plotHeight-a.plotX-a.w:a.plotY,i?a.h:a.w,i?a.w:a.h,b.borderColor,
b.borderWidth,b.borderRadius,Bc(b.color||this.color).brighten(b.brightness).get(),b.shadow)}},getAreaCoords:function(){var a=[],b=this.chart,c=b.inverted;p(this.data,function(d){var e=Lb(Da(d.h),3)*(d.h<0?-1:1),f=c?b.plotWidth-d.plotY-e:d.plotX,g=c?b.plotHeight-d.plotX-d.w:d.plotY,i=g+(c?d.w:e);e=f+(c?e:d.w);if(!c&&Da(e-f)<1)e=f+1;else if(c&&Da(g-i)<1)g=i+1;a.push([qb([f,i,f,g,e,g,e,i],O).join(","),d])});return a},cleanData:function(){var a=this,b=a.data,c,d,e,f;Ja.prototype.cleanData.apply(a);for(f=
b.length-1;f>=0;f--)if(b[f-1]){c=b[f].x-b[f-1].x;if(d===ma||c<d){d=c;e=f}}a.closestPoints=e},animate:function(a){var b=this,c=b.chart,d=c.inverted,e=b.layerGroup.div;if(a)e.style[d?"left":"top"]=(d?-c.plotWidth:c.plotHeight)+F;else{Db(e,c.inverted?{left:0}:{top:0});b.animate=null}},remove:function(){var a=this,b=a.chart;b.hasRendered&&p(b.series,function(c){if(c.type==a.type)c.isDirty=true});Ja.prototype.remove.apply(a,arguments)}});bb.column=Vb;var Ic=ab(Vb,{type:"bar",init:function(a){a.inverted=
this.inverted=true;Vb.prototype.init.apply(this,arguments)}});bb.bar=Ic;B=ab(Ja,{type:"scatter",getAreaCoords:function(){var a=this.data,b=[];p(a,function(c){b.push([[O(c.plotX),O(c.plotY)].join(","),c])});return b},cleanData:function(){}});bb.scatter=B;B=ab(ic,{setState:function(a){this.series.drawPointState(this,a)},init:function(){ic.prototype.init.apply(this,arguments);var a=this,b=a.series,c=b.chart.options.colors;H(a,{visible:a.visible!==false,name:da(a.name,"Slice"),color:a.color||c[Bb++]});
if(Bb>=c.length)Bb=0;if(!a.layer)a.layer=new pa("pie",b.layerGroup.div);b=function(){a.slice()};Oa(a,"select",b);Oa(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.layer,d=b.legendItem;(b.visible=a=a===ma?!b.visible:a)?c.show():c.hide();if(d){d.className=a?"":Ob;b.series.chart.legend.drawGraphics(true)}},slice:function(a,b){var c=this,d=c.series;b=da(b,true);c.sliced=Qa(a)?a:!c.sliced;d.isDirty=true;b&&d.chart.redraw()}});B=ab(Ja,{type:"pie",isCartesian:false,pointClass:B,getColor:function(){},
translate:function(){var a=0,b=this,c=-0.25,d=b.options,e=d.slicedOffset,f=d.center,g=b.chart;b=b.data;var i=2*ta.PI,k;f.push(d.size);f=qb(f,function(j,r){return/%$/.test(j)?g["plot"+(r?"Height":"Width")]*parseInt(j)/100:j});p(b,function(j){a+=j.y});p(b,function(j){k=a?j.y/a:0;j.start=c*i;c+=k;j.end=c*i;j.percentage=k*100;j.center=[f[0],f[1]];j.size=f[2];var r=(j.end+j.start)/2;j.centerSliced=qb([gc(r)*e+f[0],hc(r)*e+f[1]],O)});this.setTooltipPoints()},render:function(){this.drawPoints();this.drawDataLabels()},
drawPoints:function(){var a=this;p(this.data,function(b){a.drawPoint(b,b.layer.getCtx(),b.color);b.visible===false&&b.setVisible(false);b.selected&&a.drawPointState(b,"select",b.layer)})},getSymbol:function(){},drawPointState:function(a,b,c){var d=this,e=d.options;if(a){c=c||a.stateLayer;if(b=="hover"){if(!c)c=a.stateLayer=new pa("single-point",a.layer.div);c.clear()}if(b&&d.options.states[b]){b=aa(e,e.states[b]);this.drawPoint(a,c.getCtx(),b.color||a.color,b.brightness)}}d.hoverPoint&&d.hoverPoint.stateLayer&&
d.hoverPoint.stateLayer.clear();d.hoverPoint=a},drawPoint:function(a,b,c,d){var e=this.options,f=a.sliced?a.centerSliced:a.center,g=f[0];f=f[1];var i=a.size,k=e.borderWidth,j=Ra&&a.percentage==100?a.start:a.end;if(a.y>0){b.fillStyle=Hb(Bc(c).brighten(d).get(b),b);b.strokeStyle=e.borderColor;b.lineWidth=k;b.beginPath();b.moveTo(g,f);b.arc(g,f,i/2,a.start,j,false);b.lineTo(g,f);b.closePath();b.fill();k&&b.stroke()}},getAreaCoords:function(){var a=[];p(this.data,function(b){for(var c=b.center[0],d=b.center[1],
e=b.size/2,f=b.start,g=b.end,i=[],k=f;k;k+=0.25){if(k>=g)k=g;i=i.concat([c+gc(k)*e,d+hc(k)*e]);if(k>=g)break}i=i.concat([c,d]);b.tooltipPos=[c+2*gc((f+g)/2)*e/3,d+2*hc((f+g)/2)*e/3];a.push([qb(i,O).join(","),b])});return a},setData:function(){var a=this,b=a.data,c;if(b)for(c=b.length-1;c>=0;c--)b[c].remove();Ja.prototype.setData.apply(a,arguments)},clear:function(){p(this.data,function(a){a.layer.clear();a.dataLabelsLayer&&a.dataLabelsLayer.clear();a.stateLayer&&a.stateLayer.clear()})}});bb.pie=B;
Highcharts={numberFormat:Wc,dateFormat:lc,defaultOptions:Ba,setOptions:Vc,Chart:Xc,extendClass:ab,seriesTypes:bb,Layer:pa}})();
// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
/** 
 * @license Highcharts JS v1.2.5 (2010-04-13)
 * 
 * (c) 2010 Torstein Hønsi
 * 
 * License: www.highcharts.com/license
 */

/*
 * Roadmap
 * 
 * 2.0 (summer 2010)
 * - Rewritten rendering engine to SVG/VML
 * - Save as image
 * - Print chart - open in a popup and call window.print.
 * - Improvements to the toolbar object to allow the two above
 * 
 * 2.1 (summer/autumn 2010)
 * - Logarithmic axis
 * - Built-in table parser
 * - Base value for column, bar and area series
 * - Automatic margin size based on axis label size and legend. Anti-collision logic for labels.
 * - Floating columns and bars
 * - Candlestick charts
 * - Stock charts?
 * - Radar charts?
 * 
 * 2.2 (autumn 2010)
 * - Improve pies: shadow, better dataLabels, 3D view.
 *
 */



(function() {

// encapsulated variables
var 
	// abstracts to make compiled code smaller
	undefined,
	doc = document,
	win = window,
	math = Math,
	mathRound = math.round,
	mathFloor = math.floor,
	mathMax = math.max,
	mathAbs = math.abs,
	mathCos = math.cos,
	mathSin = math.sin,	
	
	
	// some variables
	userAgent = navigator.userAgent,
	isIE = /msie/i.test(userAgent) && !win.opera,
	isWebKit = /AppleWebKit/.test(userAgent),
	styleTag,
	canvasCounter = 0,
	colorCounter,
	symbolCounter,
	symbolSizes = {},
	idCounter = 0,
	timeFactor = 1, // 1 = JavaScript time, 1000 = Unix time
	garbageBin,
	
	// some constants for frequently used strings
	DIV = 'div',
	ABSOLUTE = 'absolute',
	RELATIVE = 'relative',
	HIDDEN = 'hidden',
	HIGHCHARTS_HIDDEN = 'highcharts-' + HIDDEN,
	VISIBLE = 'visible',
	PX = 'px',
	
	// time methods, changed based on whether or not UTC is used
	makeTime,
	getMinutes,
	getHours,
	getDay,
	getDate,
	getMonth,
	getFullYear,
	setMinutes,
	setHours,
	setDate,
	setMonth,
	setFullYear,
	
	// check for a custom HighchartsAdapter defined prior to this file
	globalAdapter = win.HighchartsAdapter,
	adapter = globalAdapter || {}, 
	
	// Utility functions. If the HighchartsAdapter is not defined, adapter is an empty object
	// and all the utility functions will be null. In that case they are populated by the 
	// default adapters below.
	each = adapter.each,
	grep = adapter.grep,
	map = adapter.map,
	merge = adapter.merge,
	hyphenate = adapter.hyphenate,
	addEvent = adapter.addEvent,
	fireEvent = adapter.fireEvent,
	animate = adapter.animate,
	getAjax = adapter.getAjax,
	
	// lookup over the types and the associated classes
	seriesTypes = {};
	
	
// the jQuery adapter
if (!globalAdapter && win.jQuery) {
	var jQ = jQuery;
	each = function(arr, fn) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (fn.call(arr[i], arr[i], i, arr) === false) {
				return i;
			}
		}
	};
	grep = jQ.grep;
	map = function(arr, fn){
		//return jQuery.map(arr, fn);
		var results = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			results[i] = fn.call(arr[i], arr[i], i, arr);
		}
		return results;
		
	}
	merge = function(){
		var args = arguments;
		return jQ.extend(true, null, args[0], args[1], args[2], args[3]);
	}
	hyphenate = function (str){
		return str.replace(/([A-Z])/g, function(a, b){ return '-'+ b.toLowerCase() });
	}
	addEvent = function (el, event, fn){
		jQ(el).bind(event, fn);
	}
	fireEvent = function(el, type, eventArguments, defaultFunction) {
		var event = jQ.Event(type),
			detachedType = 'detached'+ type;
		extend(event, eventArguments);
		
		// Prevent jQuery from triggering the object method that is named the
		// same as the event. For example, if the event is 'select', jQuery
		// attempts calling el.select and it goes into a loop.
		if (el[type]) {
			el[detachedType] = el[type];
			el[type] = null;	
		}
		
		// trigger it
		jQ(el).trigger(event);
		
		// attach the method
		if (el[detachedType]) {
			el[type] = el[detachedType];
			el[detachedType] = null;
		}
		
		if (defaultFunction && !event.isDefaultPrevented()) {
  			defaultFunction(event);
		}	
	}

	animate = function (el, params, options) {
		jQ(el).animate(params, options);
	}
	getAjax = function (url, callback) {
		jQ.get(url, null, callback);
	}
	
	jQ.extend( jQ.easing, {
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		}
	});
	
// the MooTools adapter
} else if (!globalAdapter && win.MooTools) {
	
	each = $each;
	
	map = function (arr, fn){
		return arr.map(fn);
	}
	
	grep = function(arr, fn) {
		return arr.filter(fn)
	}
	
	merge = $merge;
	
	hyphenate = function (str){
		return str.hyphenate();
	}
	
	addEvent = function (el, type, fn) {
		// if the addEvent method is not defined, el is a custom Highcharts object
		// like series or point
		if (!el.addEvent) {
			if (el.nodeName) el = $(el); // a dynamically generated node
			else extend(el, new Events()); // a custom object
		} 
		el.addEvent(type, fn);
	}
	fireEvent = function(el, event, eventArguments, defaultFunction) {
		// create an event object that keeps all functions		
		event = new Event({ 
			type: event,
			target: el
		});
		event = extend (event, eventArguments);
		// override the preventDefault function to be able to use
		// this for custom events
		event.preventDefault = function() {
			defaultFunction = null;
		}
		// if fireEvent is not available on the object, there hasn't been added
		// any events to it above
		if (el.fireEvent) el.fireEvent(event.type, event);
		
		// fire the default if it is passed and it is not prevented above
		if (defaultFunction) defaultFunction(event);
		
	}
	animate = function (el, params, options){
		var myEffect = new Fx.Morph($(el), extend(options, {
	 		transition: Fx.Transitions.Quad.easeInOut
	 	}));
		myEffect.start(params);
	}
	getAjax = function (url, callback) {
		(new Request({
			url: url,
			method: 'get',
			onSuccess: callback
		})).send();			
	}
} 

/**
 * Check if an element is an array, and if not, make it into an array. Like
 * MooTools' $.splat.
 */
function splat(obj) {
	if (!obj || obj.constructor != Array) obj = [obj];
	return obj; 
}

/**
 * Returns true if the object is not null or undefined. Like MooTools' $.defined.
 * @param {Object} obj
 */
function defined (obj) {
	return obj !== undefined && obj !== null;
}

/**
 * Return the first value that is defined. Like MooTools' $.pick.
 */
function pick() {
	var args = arguments,
		i,
		arg;
	for (i = 0; i < args.length; i++) {
		arg = args[i];
		if (defined(arg)) return arg;
	};
}

/**
 * Dynamically add a CSS rule to the page
 * @param {String} selector
 * @param {Object} declaration
 * @param {Boolean} print Whether to add the styles only to print media. IE only.
 */
function addCSSRule(selector, declaration, print) {
	
	var key,
		serialized = '',
		styleSheets,
		last,
		media = print ? 'print' : '',
		createStyleTag = function(print) {
			return createElement(
				'style', { 
					type: 'text/css',
					media: print ? 'print' : ''
				}, 
				null, 
				doc.getElementsByTagName('HEAD')[0]
			);

		};
	
	// add the style tag the first time
	if (!styleTag) styleTag = createStyleTag();
		
		
	// serialize the declaration
	for (key in declaration)
		serialized += hyphenate(key) +':'+ declaration[key] + ';';
	
	if (!isIE) { // create a text node in the style tag
		styleTag.appendChild(
			doc.createTextNode(
				selector + " {" + serialized + "}\n"
			)
		);
	} else { // get the last stylesheet and add rules
		var styleSheets = doc.styleSheets, 
			index,
			styleSheet;
			
		if (print) { // only in IE for now
			createStyleTag(true);
		}
		
		index = styleSheets.length - 1;
		while (index >= 0 && styleSheets[index].media != media) index--; 
		
		styleSheet = styleSheets[index];
		styleSheet.addRule(selector, serialized);
	}
}
/**
 * Extend an object with the members of another
 * @param {Object} a The object to be extended
 * @param {Object} b The object to add to the first one
 */
function extend(a, b) {
	if (!a) a = {};
	for (var n in b) a[n] = b[n];
	return a;
}

/**
 * Merge the default options with custom options and return the new options structure
 * @param {Object} options The new custom options
 */
function setOptions(options) {
	defaultOptions = merge(defaultOptions, options);
	
	// apply UTC
	setTimeMethods();
	
	return defaultOptions;
}

/**
 * Discard an element by moving it to the bin and delete
 * @param {Object} The HTML node to discard
 */
function discardElement(element) {
	// create a garbage bin element, not part of the DOM
	if (!garbageBin) garbageBin = createElement(DIV);
	
	// move the node and empty bin
	if (element) garbageBin.appendChild(element);
	garbageBin.innerHTML = '';
}

var defaultFont = 'normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',

defaultLabelOptions = {
	enabled: true,
	// rotation: 0,
	align: 'center',
	x: 0,
	y: 15,
	/*formatter: function() {
		return this.value;
	},*/
	style: {
		color: '#666',
		font: defaultFont.replace('12px', '11px') 
		//'10px bold "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'	
	}
},
defaultOptions = {
	colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', 
		'#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
	symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
	lang: {
		loading: 'Loading...',
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
				'August', 'September', 'October', 'November', 'December'],
		weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		decimalPoint: '.',
		resetZoom: 'Reset zoom',
		resetZoomTitle: 'Reset zoom level 1:1',
		thousandsSep: ','
	},
	global: {
		useUTC: true
	},
	chart: {
		//alignTicks: false,
		//className: null,
		/*events: {
		 * 	load,
		 * 	selection
		 * },
		 */
		margin: [50, 50, 60, 80],
		borderColor: '#4572A7',
		//borderWidth: 0,
		borderRadius: 5,		
		defaultSeriesType: 'line',
		ignoreHiddenSeries: true,
		//inverted: false,
		//shadow: false,
		//style: {},
		//backgroundColor: null,
		//plotBackgroundColor: null,
		plotBorderColor: '#C0C0C0'
		//plotBorderWidth: 0,
		//plotShadow: false,
		//zoomType: ''
	},
	title: {
		text: 'Chart title',
		style: {
			textAlign: 'center',
			color: '#3E576F',
			font: defaultFont.replace('12px', '16px'),
			margin: '10px 0 0 0'
		}

	},
	subtitle: {
		text: '',
		style: {
			textAlign: 'center',
			color: '#6D869F',
			font: defaultFont,
			margin: 0
		}
	},
	
	plotOptions: {
		line: { // base series options
			allowPointSelect: false,
			//allowDrag: false, // point dragging - not yet implemented
			//dragType: 'y',
			showCheckbox: false,
			animation: true,
			//cursor: 'default',
			//enableMouseTracking: true,
			events: {},
			lineWidth: 2,
			shadow: true,
			// stacking: null,
			marker: { 
				enabled: true,
				symbol: 'auto',
				lineWidth: 0,
				radius: 4,
				lineColor: '#FFFFFF',
				fillColor: 'auto',
				states: { // states for a single point
					hover: {
						//radius: base + 2
					},
					select: {
						fillColor: '#FFFFFF',
						lineColor: 'auto',
						lineWidth: 2
					}					
				}
			},
			point: {
				events: {}
			},
			dataLabels: merge(defaultLabelOptions, {
				enabled: false,
				y: -6,
				formatter: function() {
					return this.y;
				}
			}),
			
			//pointStart: 0,
			//pointInterval: 1,
			showInLegend: true,
			states: { // states for the entire series
				hover: {
					//enabled: false,
					lineWidth: 3,
					marker: {
						// lineWidth: base + 1,
						// radius: base + 1
					}
				},
				select: {
					marker: {}
				}
			}
		}
	},
	labels: {
		//items: [],
		style: {
			position: ABSOLUTE,
			color: '#3E576F',
			font: defaultFont
		}
	},
	legend: {
		enabled: true,
		layout: 'horizontal',
		labelFormatter: function() {
			return this.name
		},
		//borderWidth: 0,
		borderColor: '#909090',
		borderRadius: 5,
		shadow: true,
		//backgroundColor: null,
		style: {
			bottom: '10px',
			left: '80px',
			padding: '5px'
		},
		itemStyle: {
			listStyle: 'none',
			margin: 0,
			padding: '0 2em 0 0', // make room for the checkbox
			font: defaultFont,
			cursor: 'pointer',
			color: '#3E576F',
			position: RELATIVE // to allow absolute placement of the checkboxes
		},
		itemHoverStyle: {
			color: '#000'
		},
		itemHiddenStyle: {
			color: '#CCC'
		},
		itemCheckboxStyle: {
			position: ABSOLUTE,
			right: 0
		},
		//reversed: false, // docs
		symbolWidth: 16,
		symbolPadding: 5
	},
	
	loading: {
		hideDuration: 100,
		labelStyle: {
			font: defaultFont.replace('normal', 'bold'),
			position: RELATIVE,
			top: '1em'
		},
		showDuration: 100,
		style: {
			position: ABSOLUTE,
			backgroundColor: 'white',
			opacity: 0.5,
			textAlign: 'center'
		}
	},
	
	tooltip: {
		enabled: true,
		formatter: function() {
			var pThis = this,
				series = pThis.series,
				xAxis = series.xAxis,
				x = pThis.x;
			return '<b>'+ (pThis.point.name || series.name) +'</b><br/>'+
				(defined(x) ? 
					'X value: '+ (xAxis && xAxis.options.type == 'datetime' ? 
						dateFormat('%Y-%m-%d %H:%M:%S', x) : x) +'<br/>':
					'')+
				'Y value: '+ pThis.y;
		},
		backgroundColor: 'rgba(255, 255, 255, .85)',
		borderWidth: 2,
		borderRadius: 5,
		shadow: true,
		snap: 10,
		style: {
			color: '#333333',
			font: defaultFont,
			fontSize: '9pt',
			padding: '5px',
			whiteSpace: 'nowrap'
		}
	},
	
	toolbar: {
		itemStyle: {
			color: '#4572A7',
			cursor: 'pointer',
			margin: '20px',
			font: defaultFont
		}
	},
	
	credits: {
		enabled: true,
		text: 'Highcharts.com',
		href: 'http://www.highcharts.com',
		style: {
			position: ABSOLUTE,
			right: '10px',
			bottom: '5px',
			color: '#999',
			textDecoration: 'none',
			font: defaultFont.replace('12px', '10px')
		},
		target: '_self'
	}
};

// Axis defaults
//defaultOptions.xAxis = merge(defaultOptions.axis);
var defaultXAxisOptions =  {
	// alternateGridColor: null,
	// categories: [],
	dateTimeLabelFormats: {
		second: '%H:%M:%S',
		minute: '%H:%M',
		hour: '%H:%M',
		day: '%e. %b',
		week: '%e. %b',
		month: '%b \'%y',
		year: '%Y'
	},
	endOnTick: false,
	gridLineColor: '#C0C0C0',
	// gridLineWidth: 0,
	// reversed: false,
	
	labels: defaultLabelOptions,
	lineColor: '#C0D0E0',
	lineWidth: 1,
	max: null,
	min: null,
	maxZoom: null,
	minorGridLineColor: '#E0E0E0',
	minorGridLineWidth: 1,
	minorTickColor: '#A0A0A0',
	//minorTickInterval: null,
	minorTickLength: 2,
	minorTickPosition: 'outside', // inside or outside
	minorTickWidth: 1,
	//plotBands: [],
	//plotLines: [],
	//reversed: false,
	showFirstLabel: true,
	showLastLabel: false,
	startOfWeek: 1, 
	startOnTick: false,
	tickColor: '#C0D0E0',
	tickInterval: 'auto',
	tickLength: 5,
	tickmarkPlacement: 'between', // on or between
	tickPixelInterval: 100,
	tickPosition: 'outside',
	tickWidth: 1,
	title: {
		enabled: false,
		text: 'X-values',
		align: 'middle', // low, middle or high
		margin: 35,
		//rotation: 0,
		//side: 'outside',
		style: {
			color: '#6D869F',
			font: defaultFont.replace('normal', 'bold')
		}
	},
	type: 'linear' // linear or datetime
},

defaultYAxisOptions = merge(defaultXAxisOptions, {
	endOnTick: true,
	gridLineWidth: 1,
	tickPixelInterval: 72,
	showLastLabel: true,
	labels: {
		align: 'right',
		x: -8,
		y: 3
	},
	lineWidth: 0,
	maxPadding: 0.05,
	minPadding: 0.05,
	startOnTick: true,
	tickWidth: 0,
	title: {
		enabled: true,
		margin: 40,
		rotation: 270,
		text: 'Y-values'
	}
}),

defaultLeftAxisOptions = {
	labels: {
		align: 'right',
		x: -8,
		y: 3
	},
	title: {
		rotation: 270
	}
},
defaultRightAxisOptions = {
	labels: {
		align: 'left',
		x: 8,
		y: 3
	},
	title: {
		rotation: 90
	}
},
defaultBottomAxisOptions = { // horizontal axis
	labels: {
		align: 'center',
		x: 0,
		y: 14
	},
	title: {
		rotation: 0
	}
},
defaultTopAxisOptions = merge(defaultBottomAxisOptions, {
	labels: {
		y: -5
	}
});


 

// Series defaults
var defaultPlotOptions = defaultOptions.plotOptions, 
	defaultSeriesOptions = defaultPlotOptions.line; 
//defaultPlotOptions.line = merge(defaultSeriesOptions);
defaultPlotOptions.spline = merge(defaultSeriesOptions);
defaultPlotOptions.scatter = merge(defaultSeriesOptions, {
	//dragType: 'xy', // n/a
	lineWidth: 0,
	states: {
		hover: {
			lineWidth: 0
		}
	}
});
defaultPlotOptions.area = merge(defaultSeriesOptions, {
	// lineColor: null, // overrides color, but lets fillColor be unaltered
	// fillOpacity: .75,
	fillColor: 'auto'

});
defaultPlotOptions.areaspline = merge(defaultPlotOptions.area);
defaultPlotOptions.column = merge(defaultSeriesOptions, {
	borderColor: '#FFFFFF',
	borderWidth: 1,
	borderRadius: 0,
	groupPadding: 0.2,
	pointPadding: 0.1,
	states: {
		hover: {
			brightness: 0.1,
			shadow: false
		},
		select: {
			color: '#C0C0C0',
			borderColor: '#000000',
			shadow: false
		}
	}
});
defaultPlotOptions.bar = merge(defaultPlotOptions.column, {
	dataLabels: {
		align: 'left',
		x: 5,
		y: 0
	}
});
defaultPlotOptions.pie = merge(defaultSeriesOptions, {
	//dragType: '', // n/a
	borderColor: '#FFFFFF',
	borderWidth: 1,
	center: ['50%', '50%'],
	legendType: 'point',
	size: '90%',
	slicedOffset: 10,
	states: {
		hover: {
			brightness: 0.1,
			shadow: false
		}
	}
	
});

// set the default time methods
setTimeMethods();


// class-like inheritance
function extendClass(parent, members) {
	var object = function(){};
	object.prototype = new parent();
	extend(object.prototype, members);
	return object;
}
/*
function reverseArray(arr) {
	var reversed = [];
	for (var i = arr.length - 1; i >= 0; i--)
		reversed.push( arr[i]);
	return reversed;
}
*/
// return a deep value without throwing an error
/*function deepStructure(obj, path) {
	// split the path into an array
	path = path.split('.'), i = 0;
	// recursively set obj to the path
	while (path[i] && obj) obj = obj[path[i++]];
	
	if (i == path.length) return obj;
}*/

/**
 * Create a color from a string or configuration object
 * @param {Object} val
 */
function setColor(val, ctx) {
	if (typeof val == 'string') {
		return val;

	} else if (val.linearGradient) {
		var gradient = ctx.createLinearGradient.apply(ctx, val.linearGradient);
		each (val.stops, function(stop) {
			gradient.addColorStop(stop[0], stop[1]);
		});
		return gradient;
	}
}


var Color = function(input) {
	var rgba = [], result;
	function parse(input) {
		
		// rgba
		if((result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(input)))
			rgba = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseFloat(result[4])];	

		// hex
		else if((result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(input)))
			rgba = [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16), 1];
	
	}
	function get() {
		// it's NaN if gradient colors on a column chart
		if (rgba && !isNaN(rgba[0])) return 'rgba('+ rgba.join(',') +')';
		else return input;
	}
	
	function brighten(alpha) {
		if (typeof alpha == 'number' && alpha != 0) {
			for (var i = 0; i < 3; i++) {
				rgba[i] += parseInt(alpha * 255);
				if (rgba[i] < 0) rgba[i] = 0;
				if (rgba[i] > 255) rgba[i] = 255;
			}
		}
		return this;
	}
	
	function setOpacity(alpha) {
		rgba[3] = alpha;
		return this;
	}	
	
	parse(input);
	
	// public methods
	return {
		get: get,
		brighten: brighten,
		setOpacity: setOpacity
	};
};

	//defaultMarkers = ['circle'];


function createElement (tag, attribs, styles, parent, nopad) {
	var el = doc.createElement(tag);
	if (attribs) extend(el, attribs);
	if (nopad) setStyles(el, {padding: 0, border: 'none', margin: 0});
	if (styles) setStyles(el, styles);
	if (parent) parent.appendChild(el);	
	return el;
};

function setStyles (el, styles) {
	//for (var x in styles) el.style[x] = styles[x];
	if (isIE) {
		if (styles.opacity !== undefined) 
			styles.filter = 'alpha(opacity='+ (styles.opacity * 100) +')';	
	}
	
	extend(el.style, styles);

};

/**
 * Format a number and return a string based on input settings
 * @param {Number} number The input number to format
 * @param {Number} decimals The amount of decimals
 * @param {String} decPoint The decimal point, defaults to the one given in the lang options
 * @param {String} thousandsSep The thousands separator, defaults to the one given in the lang options
 */
function numberFormat (number, decimals, decPoint, thousandsSep) {
	var lang = defaultOptions.lang,
		// http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
		n = number, c = isNaN(decimals = mathAbs(decimals)) ? 2 : decimals,
    	d = decPoint === undefined ? lang.decimalPoint : decPoint,
    	t = thousandsSep === undefined ? lang.thousandsSep : thousandsSep, s = n < 0 ? "-" : "",
    	i = parseInt(n = mathAbs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
		(c ? d + mathAbs(n - i).toFixed(c).slice(2) : "");
};

/**
 * Based on http://www.php.net/manual/en/function.strftime.php 
 * @param {String} format
 * @param {Number} timestamp
 * @param {Boolean} capitalize
 */
function dateFormat(format, timestamp, capitalize) {
	function pad (number) {
		return number.toString().replace(/^([0-9])$/, '0$1');
	}
	
	if (!defined(timestamp)) return 'Invalid date';
	
	
	var date = new Date(timestamp * timeFactor),
	
		// get the basic time values
		hours = date[getHours](),
		day = date[getDay](),
		dayOfMonth = date[getDate](),
		month = date[getMonth](),
		fullYear = date[getFullYear](),
		lang = defaultOptions.lang,
		langWeekdays = lang.weekdays,
		langMonths = lang.months,
		
		// list all format keys
		replacements = {

			// Day
			'a': langWeekdays[day].substr(0, 3), // Short weekday, like 'Mon'
			'A': langWeekdays[day], // Long weekday, like 'Monday'
			'd': pad(dayOfMonth), // Two digit day of the month, 01 to 31 
			'e': dayOfMonth, // Day of the month, 1 through 31 
			
			// Week (none implemented)			
			
			// Month
			'b': langMonths[month].substr(0, 3), // Short month, like 'Jan'
			'B': langMonths[month], // Long month, like 'January'
			'm': pad(month + 1), // Two digit month number, 01 through 12
			
			// Year
			'y': fullYear.toString().substr(2, 2), // Two digits year, like 09 for 2009
			'Y': fullYear, // Four digits year, like 2009
			
			// Time
			'H': pad(hours), // Two digits hours in 24h format, 00 through 23
			'I': pad((hours % 12) || 12), // Two digits hours in 12h format, 00 through 11
			'l': (hours % 12) || 12, // Hours in 12h format, 1 through 12
			'M': pad(date[getMinutes]()), // Two digits minutes, 00 through 59
			'p': hours < 12 ? 'AM' : 'PM', // Upper case AM or PM
			'P': hours < 12 ? 'am' : 'pm', // Lower case AM or PM
			'S': pad(date.getSeconds()) // Two digits seconds, 00 through  59
			
		};


	// do the replaces
	for (var key in replacements) format = format.replace('%'+ key, replacements[key]);
		
	// Optionally capitalize the string and return
	return capitalize ? format.substr(0, 1).toUpperCase() + format.substr(1) : format;
};

/**
 * Set the time methods globally based on the useUTC option. Time method can be either 
 * local time or UTC (default).
 */
function setTimeMethods() {
	var useUTC = defaultOptions.global.useUTC;
	
	makeTime = useUTC ? Date.UTC : function(year, month, date, hours, minutes, seconds) {
		return new Date(
			year, 
			month, 
			pick(date, 1), 
			pick(hours, 0), 
			pick(minutes, 0), 
			pick(seconds, 0)
		).getTime();
	};
	getMinutes = useUTC ? 'getUTCMinutes' : 'getMinutes';
	getHours = useUTC ? 'getUTCHours' : 'getHours';
	getDay = useUTC ? 'getUTCDay' : 'getDay';
	getDate = useUTC ? 'getUTCDate' : 'getDate';
	getMonth = useUTC ? 'getUTCMonth' : 'getMonth';
	getFullYear = useUTC ? 'getUTCFullYear' : 'getFullYear';
	setMinutes = useUTC ? 'setUTCMinutes' : 'setMinutes';
	setHours = useUTC ? 'setUTCHours' : 'setHours';
	setDate = useUTC ? 'setUTCDate' : 'setDate';
	setMonth = useUTC ? 'setUTCMonth' : 'setMonth';
	setFullYear = useUTC ? 'setUTCFullYear' : 'setFullYear';
		
};

/**
 * Return the absolute page position of an element
 * @param {Object} el
 */
function getPosition (el)	{
	var p = { x: el.offsetLeft, y: el.offsetTop };
	while (el.offsetParent)	{
		el = el.offsetParent;
		p.x += el.offsetLeft;
		p.y += el.offsetTop;
		if (el != doc.body && el != doc.documentElement) {
			p.x -= el.scrollLeft;
			p.y -= el.scrollTop;
		}
	}
	return p;
}


var Layer = function (name, appendTo, props, styles) {
	var layer = this,
		div,
		appendToStyle = appendTo.style;
	props = extend({
		className: 'highcharts-'+ name
	}, props);
	styles = extend({
		width: appendToStyle.width, //appendTo.offsetWidth + PX,
		height: appendToStyle.height, //appendTo.offsetHeight + PX,
		position: ABSOLUTE,
		top: 0,
		left: 0,
		margin: 0,
		padding: 0,
		border: 'none'		
	}, styles);
	
	div = createElement(DIV, props, styles, appendTo);
	
	extend(layer, {
		div: div,
		width: parseInt(styles.width),
		height: parseInt(styles.height)
	});
	
	// initial SVG string
	layer.svg = isIE ? '' : '<?xml version="1.0" encoding="utf-8"?>'+
		'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" '+
		'xmlns:xlink="http://www.w3.org/1999/xlink" width="'+ layer.width 
		+'px" height="'+ layer.height +'">';
			
	// save it for later
	layer.basicSvg = layer.svg;	
}
Layer.prototype = {
	getCtx: function() {
		if (!this.ctx) {
			var cvs = createElement('canvas', {
				id: 'highcharts-canvas-' + idCounter++,
				width: this.width,
				height: this.height
			}, {
				position: ABSOLUTE
			}, this.div);
			
			if (isIE) {
				G_vmlCanvasManager.initElement(cvs);
				cvs = doc.getElementById(cvs.id);
			}
		
			this.ctx = cvs.getContext('2d');			
		}
		
		return this.ctx;
	},
	getSvg: function() {
		if (!this.svgObject) {
			var layer = this,
				div = layer.div,
				width = layer.width,
				height = layer.height;
			if (isIE) {
				// create xmlns if excanvas hasn't done it
		        if (!doc.namespaces["g_vml_"]) {
					doc.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml");
					// setup default css
					doc.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}";
		        }
				this.svgObject = createElement(DIV, null, {
					width: width + PX,
					height: height + PX,
					position: ABSOLUTE
				}, div);
	
		    
			} else {
				// create an object and inject SVG into it
				this.svgObject = createElement('object', { 
					width: width,
					height: height,
					type: 'image/svg+xml'
				}, {
					position : ABSOLUTE,
					left: 0,
					top: 0
				}, div);
			}
		}
		return this.svgObject;
	},
	drawLine: function(x1, y1, x2, y2, color, width) {		
		var ctx = this.getCtx(), xBefore = x1;
		
		// normalize to a crisp line
		if (x1 == x2) x1 = x2 = mathRound(x1) + (width % 2 / 2);
		if (y1 == y2) y1 = y2 = mathRound(y1) + (width % 2 / 2);
		
		// draw path
		ctx.lineWidth = width;
		ctx.lineCap = 'round'; /* If this is not set, plotBands appear
			like 'square' in Firefox/Win. Reason unknown. */ 
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.strokeStyle = color;
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();
	},
	
	drawPolyLine: function(points, color, width, shadow, fillColor) {
		var ctx = this.getCtx(),
			shadowLine = [];
		// the shadow
		if (shadow && width) {
			each (points, function(point) { // add 1px offset
				shadowLine.push(point === undefined ? point : point + 1);
			}); 
			for (var i = 1; i <= 3; i++) // three lines of differing thickness and opacity
				this.drawPolyLine(shadowLine, 'rgba(0, 0, 0, '+ (0.05 * i) +')', 6 - 2 * i);
		}
		
		// the line path
		ctx.beginPath();
		for (i = 0; i < points.length; i += 2) 
			ctx[i == 0 ? 'moveTo' : 'lineTo'](points[i], points[i + 1]);
		
		// common properties
		extend(ctx, {
			lineWidth: width,
			lineJoin: 'round'
		});
		
		// stroke 
	    if (color && width)	{
			ctx.strokeStyle = setColor(color, ctx); 
			ctx.stroke();
		}
		
		// fill
		if (fillColor) {
			ctx.fillStyle = setColor(fillColor, ctx);
			ctx.fill();
		}
		
	},
	drawRect: function(x, y, w, h, color, width, radius, fill, shadow, image) {
		// must (?) be done twice to apply both stroke and fill in excanvas
		var drawPath = function() {
			var ret;
			if (w > 0 && h > 0) { // zero or negative dimensions break Opera 10
				ctx.beginPath();
				if (!radius) {
					ctx.rect(x, y, w, h);
				} else {
					ctx.moveTo(x, y + radius);
					ctx.lineTo(x, y + h - radius);
					ctx.quadraticCurveTo(x, y + h, x + radius, y + h); // change: use bezier
					ctx.lineTo(x + w - radius, y + h);
					ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - radius);
					ctx.lineTo(x + w, y + radius);
					ctx.quadraticCurveTo(x + w, y , x + w - radius, y);
					ctx.lineTo(x + radius, y);
					ctx.quadraticCurveTo(x , y, x, y + radius);
				}
				ctx.closePath();
				ret = true;
			}
			return ret;
		};
		
		var ctx = this.getCtx(), normalizer = (width || 0) % 2 / 2;

		// normalize for sharp edges
		x = mathRound(x) + normalizer;
		y = mathRound(y) + normalizer;
		w = mathRound(w - 2 * normalizer);
		h = mathRound(h - 2 * normalizer);

				
		// apply the drop shadow
		if (shadow) for (var i = 1; i <= 3; i++) {
	    	this.drawRect(x + 1, y + 1, w, h, 'rgba(0, 0, 0, '+ (0.05 * i) +')', 
	    		6 - 2 * i, radius);
		}

		// apply the background image behind everything
		if (image) ctx.drawImage(image, x, y, w, h);
		
		if (drawPath()) {
			if (fill) {
				ctx.fillStyle = setColor(fill, ctx);
				ctx.fill();
				// draw path again
				if (win.G_vmlCanvasManager) drawPath();
			}
			if (width) {
				ctx.strokeStyle = setColor(color, ctx);
				ctx.lineWidth = width;
				ctx.stroke();
			}
		}

	},
	drawSymbol: function(symbol, x, y, radius, lineWidth, lineColor, fillColor) {
		var ctx = this.getCtx(),
			imageRegex = /^url\((.*?)\)$/;
		ctx.beginPath();
		
		if (symbol == 'square') {
			var len = 0.707 * radius;
			ctx.moveTo(x - len, y - len);
			ctx.lineTo(x + len, y - len);
			ctx.lineTo(x + len, y + len);
			ctx.lineTo(x - len, y + len);
			ctx.lineTo(x - len, y - len);
			
		} else if (symbol == 'triangle') {
			y++;
			ctx.moveTo(x, y - 1.33 * radius);
			ctx.lineTo(x + radius, y + 0.67 * radius);
			ctx.lineTo(x - radius, y + 0.67 * radius);
			ctx.lineTo(x, y - 1.33 * radius);
			
		} else if (symbol == 'triangle-down') {
			y--;
			ctx.moveTo(x, y + 1.33 * radius);
			ctx.lineTo(x - radius, y - 0.67 * radius);
			ctx.lineTo(x + radius, y - 0.67 * radius);
			ctx.lineTo(x, y + 1.33 * radius);
			
		} else if (symbol == 'diamond') {
			ctx.moveTo(x, y - radius);
			ctx.lineTo(x + radius, y);
			ctx.lineTo(x, y + radius);
			ctx.lineTo(x - radius, y);
			ctx.lineTo(x, y - radius);
			
		} else if (imageRegex.test(symbol)) {
			createElement('img', {
				onload: function() {
					var img = this,
						size = symbolSizes[img.src] || [img.width, img.height];
					setStyles(img, {
						left: mathRound(x - size[0] / 2) + PX,
						top: mathRound(y - size[1] / 2) + PX,
						visibility: VISIBLE
					})
					// Bug workaround: Opera (10.01) fails to get size the second time
					symbolSizes[img.src] = size;
				},
				src: symbol.match(imageRegex)[1]
			}, {
				position: ABSOLUTE,
				visibility: isIE ? VISIBLE : HIDDEN // hide until left and top are set in Gecko
			}, this.div);
			
		} else { // default: circle
			ctx.arc(x, y, radius, 0, 2*math.PI, true);
		} 
	
		if (fillColor) {
			ctx.fillStyle = fillColor;
			ctx.fill();
			
			// draw path again
			//if (isIE) ctx.arc(x, y, radius, 0, 2*Math.PI, true);
		}
		if (lineColor && lineWidth) {
			ctx.strokeStyle = lineColor || "rgb(100, 100, 255)";
	    	ctx.lineWidth = lineWidth || 2;
	    	ctx.stroke();
		}
	},
	drawHtml: function(html, attributes, styles) {
		createElement(
			DIV, 
			extend(attributes, { innerHTML: html }), 
			extend(styles, { position: ABSOLUTE}),
			this.div
		);
	},
	/**
	 * Add text and draw it. For those browsers adding the text to an SVG object,
	 * it is better for performance to add all strings before the object 
	 * is created. This function takes the same arguments as addText.
	 * 
	 * @param {string} str
	 * @param {number} x
	 * @param {number} y
	 * @param {object} style
	 * @param {number} rotation
	 * @param {string} align
	 */
	drawText: function() {
		this.addText.apply(this, arguments);
		this.strokeText();
	},
	addText: function(str, x, y, style, rotation, align) {
		if (str || str === 0) {
			
			// declare variables
			var layer = this,
				hasObject,
				div = layer.div,
				CSStransform,
				css = '', 
				style = style || {},
				fill = style.color || '#000000',
				align = align || 'left',
				fontSize = parseInt(style.fontSize || style.font.replace(/^[a-z ]+/, '')),
				span,
				spanWidth,
				transformOriginX;
		
			
			// prepare style
			for (var key in style) css += hyphenate(key) +':'+ style[key] +';';
			
			// what transform property is supported?
			each (['MozTransform', 'WebkitTransform', 'transform'], function(str) {
				if (str in div.style) CSStransform = str;
			});
			
			// if the text is not rotated, or if the browser supports CSS transform,
			// write a simple span
			if (!rotation || CSStransform) {
				span = createElement('span', {
					innerHTML: str
				}, extend(style, {
					position: ABSOLUTE,
					left: x + PX,
					whiteSpace: 'nowrap',
					bottom: mathRound(layer.height - y - fontSize * 0.25) + PX,
					color: fill
				}), div);
				
				// fix the position according to align and rotation
				spanWidth = span.offsetWidth;
				
				if (align == 'right') setStyles(span, {
					left: (x - spanWidth) + PX
				});
				else if (align == 'center') setStyles(span, { 
					left: mathRound(x - spanWidth / 2) + PX
				});
				
				if (rotation) {  // ... and CSStransform
					transformOriginX = { left: 0, center: 50, right: 100 }[align]
					span.style[CSStransform] = 'rotate('+ rotation +'deg)';
					span.style[CSStransform +'Origin'] = transformOriginX +'% 100%';					
				}
				
			} else if (isIE) {
				// to achieve rotated text, the ie text is drawn on a vector line that
				// is extrapolated to the left or right or both depending on the 
				// alignment of the text
				hasObject = true;
				var radians = (rotation || 0) * math.PI * 2 / 360, // deg to rad
					costheta = mathCos(radians),
					sintheta = mathSin(radians),
					length = layer.width, // the text is not likely to be longer than this
					baselineCorrection = fontSize / 3 || 3,
					left = align == 'left',
					right = align == 'right',
					x1 = left ? 	x : x - length * costheta,
					x2 = right ?	x : x + length * costheta,
					y1 = left ? 	y : y - length * sintheta,
					y2 = right ?	y : y + length * sintheta;
					
					
				// IE seems to always draw the text with v-text-align middle, so we need 
				// to correct for that by moving the path
				x1 += baselineCorrection * sintheta;
				x2 += baselineCorrection * sintheta;
				y1 -= baselineCorrection * costheta;
				y2 -= baselineCorrection * costheta;
				
				if (mathAbs(x1 - x2) < 0.1) x1 += 0.1; // strange IE painting bug
				if (mathAbs(y1 - y2) < 0.1) y1 += 0.1; // strange IE painting bug
				layer.svg += 
					'<g_vml_:line from="'+ x1 +', '+ y1 +'" to="'+ x2 +', '+ y2 +'" stroked="false">'+
						'<g_vml_:fill on="true" color="'+ fill +'"/>'+
						'<g_vml_:path textpathok="true"/>'+
						'<g_vml_:textpath on="true" string="'+ str +'" '+
							'style="v-text-align:'+ align + 
							';'+ css +'"/>'+
					'</g_vml_:line>';
			
			// svg browsers
			} else { 
				hasObject = true;
				layer.svg +=  
					'<g>'+
						'<text transform="translate('+ x +','+ y +
							') rotate('+ (rotation || 0) +')" '+
							'style="fill:'+ fill +';text-anchor:'+ 
							{ left: 'start', center: 'middle', right: 'end' }[align] +
				 			';'+ css.replace(/"/g, "'") +'">'+	str+
						'</text>'+
					'</g>';
			}
			
			layer.hasObject = hasObject;
		}
	},
	/*
	Experimental text rendering using canvas text. Speed and possibly weight are the advantages.
	Excanvas trunk supports canvas text, but not current version (2009-11-03). Older Gecko and Webkit
	browsers and Opera needs SVG approach, so all in all there is not much weight spared by this one.
	Furthermore, CanvasText looks crappy in Firefox, but on the other hand, SVG object make the tooltip
	animation slow.
	
	2009-11-07: Preliminary conclusion:
		- IE: Use VML on a textpath. The con is that IE8 renders all text as bold italic. Possibly
			experiment with CSS text rotation for whole 90 degrees if that's supported by IE8.
		- Firefox >= 3.5 (Gecko 1.9.1 was it?) and Webkit > ?: Use CSS transforms to rotate the text.
			Canvas and textFill would be a better and faster alternative, but the text is very badly
			drawn in Firefox. When that's fixed in future versions, go for Canvas and textFill instead.
		- Opera, older Gecko and older Webkit: Use SVG. It is slow, and all the text has to be added 
			before written to the SVG object. Hence the addText and strokeText functions. When Opera 
			starts supporting textFill or text rotate, use that instead.
		
	
	_addText: function(str, x, y, style, rotation, anchor) {
		if (str || str === 0) {
		
			// declare variables
			var css = '', 
				style = style || {},
				fill = style.color || '#000000',
				anchor = anchor || 'start',
				ctx,
				span,
				font = (style.font || '') +' '+ (style.fontSize || '') +' '+ 
					(style.fontWeight || '') +' '+ (style.fontFamily || ''),
				align = { start: 'left', middle: 'center', end: 'right' }[anchor],
				rotation = (rotation || 0) * math.PI * 2 / 360, // deg to rad
				fontSize = parseInt(style.fontSize || font); 
				
			// prepare style
			for (var key in style) css += hyphenate(key) +':'+ style[key] +';';
			
			if (rotation) {
				var ctx = this.getCtx();
				ctx.font = font;
				ctx.fillStyle = fill;
				ctx.textAlign = align;
				
				ctx.translate(x, y);
				ctx.rotate(rotation);
				ctx.fillText(str, 0, 0);
				ctx.rotate(-rotation);
				ctx.translate(-x, -y);
			} else {

			}
			
		}
	},*/
	strokeText: function() {
		if (this.hasObject) {
			var svgObject = this.getSvg(),
				svg = this.svg;
			if (isIE) {
				svgObject.innerHTML = svg;
			} else {
				svgObject.data = 
					'data:image/svg+xml,'+ svg +'</svg>';
					
				// append it again for Chrome to update
				if (isWebKit) this.div.appendChild(svgObject);
	
			}
		}
	},
	clear: function() {
		var layer = this,
			div = this.div,
			childNodes = div.childNodes,
			node;
		if (layer.ctx) layer.ctx.clearRect(0, 0, layer.width, layer.height);
		if (layer.svgObject) {
			discardElement(layer.svgObject);
			layer.svgObject = null;
			layer.svg = layer.basicSvg;
		}
		
		// remove all spans
		for (var i = childNodes.length - 1; i >= 0; i--) {
			node = childNodes[i];			
			if (/(SPAN|IMG)/.test(node.tagName)) discardElement(node);
		} 
		
	},
	hide: function() {
		setStyles (this.div, {
			display: 'none'
		})
		
		//jQuery(this.div).fadeOut(250);
		
		// A possible way to fade out in IE would be to get all the shapes
		// in the layer and change the opacities of their FillColor and StrokeColor
		/*var shapes = this.div.getElementsByTagName('shape');
		each (shapes, function(shape) {
			//shape.style.filter = 'alpha(opacity=59)';
			
		})	
		var layer = this;
		setTimeout(function() {
			layer.div.style.visibility = HIDDEN
		}, 2000);*/
	},
	show: function() {
		setStyles (this.div, {
			display: ''
		})
		//jQuery(this.div).fadeIn(50);
	},
	/**
	 * Discard layer DOM elements and null the reference
	 */
	destroy: function() {
		discardElement(this.div);
		return null;
	}
};


function Chart (options) {
	/**
	 * Add a series dynamically after  time
	 * 
	 * @param {Object} options The config options
	 * @param {Boolean} redraw Whether to redraw the chart after adding. Defaults to true.
	 * 
	 * @return {Object} series The newly created series object
	 */
	function addSeries(options, redraw) {
		var series;
		
		redraw = pick(redraw, true); // defaults to true
		
		fireEvent(chart, 'addSeries', { options: options }, function() {
			series = initSeries(options);
			series.isDirty = true;
			
			chart.isDirty = true; // the series array is out of sync with the display
			if (redraw) chart.redraw();
		});
		
		return series;
	};

	/**
	 * Redraw legend, axes or series based on updated data
	 */
	function redraw() {
		var redrawLegend = chart.isDirty;
			
		// handle updated data in the series		
		each (series, function(serie) {
			if (serie.isDirty) { // prepare the data so axis can read it
				serie.cleanData();
				serie.getSegments();
				
				if (serie.options.legendType == 'point') redrawLegend = true;
			}
		});
		
		// reset maxTicks
		maxTicks = null;
		if (hasCartesianSeries) {
			// set axes scales
			each (axes, function(axis) {
				axis.setScale();
			})
			adjustTickAmounts();
	
			// redraw axes
			each (axes, function(axis) {
				if (axis.isDirty) axis.redraw();
			})
		}
		
		// redraw affected series
		each (series, function(serie) {
			if (serie.isDirty && serie.visible) serie.redraw();
		});
		
		// handle added or removed series 
		if (redrawLegend) { // series or pie points are added or removed
			// draw legend graphics
			if (legend && legend.renderHTML) {
				legend.renderHTML(true);
				legend.drawGraphics(true);
			}
			
			chart.isDirty = false;
		}

		// hide tooltip and hover states
		if (tracker && tracker.resetTracker) tracker.resetTracker();			
		
		
		// fire the event
		fireEvent(chart, 'redraw');
	}
	
	/** 
	 * Initialize an individual series, called internally before render time
	 */
	function initSeries(options) {
		var type = options.type || optionsChart.defaultSeriesType,
			typeClass = seriesTypes[type],
			serie,
			hasRendered = chart.hasRendered;
			
			
		// an inverted chart can't take a column series and vice versa
		if (hasRendered) {
			if (inverted && type == 'column') typeClass = BarSeries;
			else if (!inverted && type == 'bar') typeClass = ColumnSeries;
		}
		
		serie = new typeClass();
		
		serie.init(chart, options);
		
		// set internal chart properties
		if (!hasRendered && serie.inverted) inverted = true;
		if (serie.isCartesian) hasCartesianSeries = serie.isCartesian;
		
		series.push(serie);
		
		return serie;
	}
	
	/**
	 * Dim the chart and show a loading text or symbol
	 */
	function showLoading() {
		var loadingOptions = options.loading;

		// create the layer at the first call
		if (!loadingLayer) {
			loadingLayer = createElement(DIV, {
				className: 'highcharts-loading'
			}, extend(loadingOptions.style, {
				left: marginLeft + PX,
				top: marginTop + PX,
				width: plotWidth + PX,
				height: plotHeight + PX,
				zIndex: 10,
				display: 'none'
			}), container);
			
			createElement('span', {
				innerHTML: options.lang.loading
			}, loadingOptions.labelStyle, loadingLayer);
		}
		
		// show it
		setStyles(loadingLayer, { display: '' });
		animate(loadingLayer, {
			opacity: loadingOptions.style.opacity
		}, {
			duration: loadingOptions.showDuration
		});
	}
	/**
	 * Hide the loading layer
	 */
	function hideLoading() {
		animate(loadingLayer, {
			opacity: 0
		}, {
			duration: options.loading.hideDuration, 
			complete: function() {
				setStyles(loadingLayer, { display: 'none' });
			}
		});

	}
	
	/**
	 * Get an axis, series or point object by id.
	 * @param id {String} The id as given in the configuration options
	 */
	function get(id) {
		var i,
			j,
			match,
			data;
		
		// search axes
		for (i = 0; i < axes.length; i++) {
			if (axes[i].options.id == id) return axes[i];
		}
		
		// search series
		for (i = 0; i < series.length; i++) {
			if (series[i].options.id == id) return series[i];
		}
		
		// search points
		for (i = 0; i < series.length; i++) {
			data = series[i].data;
			for (j = 0; j < data.length; j++) {
				if (data[j].id == id) return data[j];
			}
		}
		return null;	
	}
	
	/**
	 * Update the chart's position after it has been moved, to match
	 * the mouse positions with the chart
	 */
	function updatePosition() {
		var container = doc.getElementById(containerId);
		if (container) {
			position = getPosition(container);
		}
	}
	
	/** 
	 * Create the Axis instances based on the config options
	 */
	function getAxes() {
		var xAxisOptions = options.xAxis || {},
			yAxisOptions = options.yAxis || {},
			axis;
			
		// make sure the options are arrays and add some members
		xAxisOptions = splat(xAxisOptions);
		each(xAxisOptions, function(axis, i) {
			axis.index = i; 
			axis.isX = true;
		});
		
		yAxisOptions = splat(yAxisOptions);
		each(yAxisOptions, function(axis, i) {
			axis.index = i;
		});
		
		// concatenate all axis options into one array
		axes = xAxisOptions.concat(yAxisOptions);
		
		// loop the options and construct axis objects
		chart.xAxis = [];
		chart.yAxis = [];
		axes = map (axes, function(axisOptions) {
			axis = new Axis(chart, axisOptions);
			chart[axis.isXAxis ? 'xAxis' : 'yAxis'].push(axis);
			
			return axis;
		});
		
		adjustTickAmounts();	
	};
	
	/**
	 * Adjust all axes tick amounts
	 */
	function adjustTickAmounts() {
		if (optionsChart.alignTicks !== false) each (axes, function(axis) {
			axis.adjustTickAmount();
		});	
	}
	/**
	 * Get the currently selected points from all series
	 */
	function getSelectedPoints() {
		var points = [];
		each(series, function(serie) {
			points = points.concat( grep( serie.data, function(point) {
				return point.selected;
			}));
		});
		return points;
	};
	
	/**
	 * Get the currently selected series
	 */
	function getSelectedSeries() {
		return grep (series, function (serie) {
			return serie.selected;
		});
	}
	
	/**
	 * Zoom into a given portion of the chart given by axis coordinates
	 * @param {Object} event
	 */
	function zoom(event) {
		var lang = defaultOptions.lang;
		
		// add button to reset selection
		chart.toolbar.add('zoom', lang.resetZoom, lang.resetZoomTitle, function() {
			//zoom(false);
			fireEvent(chart, 'selection', { resetSelection: true }, zoom);
			chart.toolbar.remove('zoom');
		});
		
		
		// if zoom is called with no arguments, reset the axes
		if (!event || event.resetSelection) each(axes, function(axis) { 
			axis.setExtremes(null, null, false);
		});
			
		// else, zoom in on all axes
		else {
			each (event.xAxis.concat(event.yAxis), function(axisData) {
				var axis = axisData.axis;
					
				// don't zoom more than maxZoom
				if (chart.tracker[axis.isXAxis ? 'zoomX' : 'zoomY'])
					axis.setExtremes(axisData.min, axisData.max, false);
			});
		}
		
		// redraw chart
		redraw();
		
	}
	
	/**
	 * Function: (private) showTitle
	 * 
	 * Show the title and subtitle of the chart
	 */
	function showTitle () {
		var title = options.title,
			subtitle = options.subtitle;
			
		if (!chart.titleLayer) {
			var titleLayer = new Layer('title-layer', container, null, {
				zIndex: 2
			});
			
			// title
			if (title && title.text) createElement('h2', {
				className: 'highcharts-title',
				innerHTML: title.text
			}, title.style, titleLayer.div);
			
			// subtitle
			if (subtitle && subtitle.text) createElement('h3', {
				className: 'highcharts-subtitle',
				innerHTML: subtitle.text
			}, subtitle.style, titleLayer.div);
			
			chart.titleLayer = titleLayer;
		}
	}
	/**
	 * Load graphics and data required to draw the chart
	 */
	function checkResources() {
		var allLoaded = true;
		for (var n in chart.resources) {
			if (!chart.resources[n]) allLoaded = false;
		}
		if (allLoaded) resourcesLoaded();
	};
	
	/**
	 * Prepare for first rendering after all data are loaded
	 */
	function resourcesLoaded() {
		
		getAxes();
		
		
		// Prepare for the axis sizes
		each(series, function(serie) {
			serie.translate();
			serie.setTooltipPoints();
			/*if (options.tooltip.enabled) */ serie.createArea();
		});	
		
		chart.render = render;
		
		setTimeout(function() { // IE(7) needs timeout
			render();
			fireEvent(chart, 'load');
			
		}, 0); 
		
	}
	
	/**
	 * Get the containing element, determine the size and create the inner container
	 * div to hold the chart
	 */
	function getContainer() {
		renderTo = optionsChart.renderTo;
		containerId = 'highcharts-'+ idCounter++;
	
		if (typeof renderTo == 'string') {
			renderTo = doc.getElementById(renderTo);
		}
	
		// remove previous chart
		renderTo.innerHTML = '';
		
		// If the container doesn't have an offsetWidth, it has or is a child of a node
		// that has display:none. We need to temporarily move it out to a visible
		// state to determine the size, else the legend and tooltips won't render
		// properly 
		if (!renderTo.offsetWidth) {
			renderToClone = renderTo.cloneNode(0);
			setStyles(renderToClone, {
				position: ABSOLUTE,
				top: '-9999px',
				display: ''
			});
			doc.body.appendChild(renderToClone);
		}
		
		// get the width and height
		var renderToOffsetHeight = (renderToClone || renderTo).offsetHeight;
		chartWidth = optionsChart.width || (renderToClone || renderTo).offsetWidth || 600;
		chartHeight = optionsChart.height || 
			// the offsetHeight of an empty container is 0 in standard browsers, but 19 in IE7:
			(renderToOffsetHeight > marginTop + marginBottom ? renderToOffsetHeight : 0) || 
			400;
		
		// create the inner container
		container = createElement(DIV, {
				className: 'highcharts-container' + 
					(optionsChart.className ? ' '+ optionsChart.className : ''),
				id: containerId
			}, extend({
				position: RELATIVE,
				overflow: HIDDEN,
				width: chartWidth + PX,
				height: chartHeight + PX,
				textAlign: 'left'
			}, optionsChart.style),
			renderToClone || renderTo
		);
	}
	/**
	 * Render all graphics for the chart
	 */
	function render () {
		var mgn, 
			div, 
			i, 
			labels = options.labels, 
			credits = options.credits;
		
		
		// Chart area
		mgn = 2 * (optionsChart.borderWidth || 0) + (optionsChart.shadow ? 8 : 0);
		backgroundLayer.drawRect(mgn / 2, mgn / 2, chartWidth - mgn, chartHeight - mgn, 
			optionsChart.borderColor, optionsChart.borderWidth, optionsChart.borderRadius, 
			optionsChart.backgroundColor, optionsChart.shadow);
		
		
		// Plot background
		backgroundLayer.drawRect(
			marginLeft, 
			marginTop, 
			plotWidth, 
			plotHeight, 
			null, 
			null, 
			null, 
			optionsChart.plotBackgroundColor, 
			null, 
			plotBackground
		);
		
		// Plot area border
		(new Layer('plot-border', container, null, {
			zIndex: 4 // in front of grid lines and graphs, behind axis lines
		})).drawRect(
			marginLeft, 
			marginTop, 
			plotWidth, 
			plotHeight, 
			optionsChart.plotBorderColor, 
			optionsChart.plotBorderWidth, 
			null, 
			null, 
			optionsChart.plotShadow
		);
			
		
		// Printing CSS for IE
		if (isIE) addCSSRule('.highcharts-image-map', { display: 'none' }, 'print');
		
		
		// Axes
		if (hasCartesianSeries) each(axes, function(axis) { 
			axis.render();
		});
	
		// Title
		showTitle();
		
		
		// Labels
		if (labels.items)	each (labels.items, function () {
			var attributes = extend({ className: 'highcharts-label' }, this.attributes);
			plotLayer.drawHtml(this.html, attributes, extend(labels.style, this.style));
		});

		// The series
		each (series, function(serie) {
			serie.render();
		});
		
		// Legend
		legend = chart.legend = new Legend(chart);

		
		// Toolbar (don't redraw)
		if (!chart.toolbar) chart.toolbar = Toolbar(chart);
		
		// Credits
		if (credits.enabled && !chart.credits) 
			chart.credits = createElement('a', {
				className: 'highcharts-credits',
				href: credits.href,
				innerHTML: credits.text,
				target: credits.target
			}, extend(credits.style, {
				zIndex: 8
			}), container);

		// Set flag
		chart.hasRendered = true;
		
		// If the chart was rendered outside the top container, put it back in
		if (renderToClone) {
			renderTo.appendChild(container);
			discardElement(renderToClone);
			updatePosition()
		}
	};
	
	/**
	 * Clean up memory usage
	 */
	function destroy() {
		

		/**
		 * Clear certain attributes from the element
		 * @param {Object} d
		 */
		function purge(d) {
		    var a = d.attributes, i, l, n;
		    if (a) {
		        l = a.length;
		        for (i = l - 1; i >= 0; i -= 1) {
		            n = a[i].name;
					
					try {
			            //if (typeof d[n] != 'object' && !/^(width|height)$/.test(n)) {
						if (typeof d[n] == 'function') {
							d[n] = null;
			            }
					} catch (e) {
						// IE/excanvas produces errors on some of the properties
					}
					
		        }
		    }
			
		    a = d.childNodes;
		    if (a) {
		        l = a.length;
		        for (i = l - 1; i >= 0; i--) {
		            var node = d.childNodes[i];
					purge(node);	
					
					if (!node.childNodes.length) discardElement(node);			
		        }
		    }
			
		}
		
		// destroy each series
		each (series, function(serie) {
			serie.destroy();
		});
		series = [];
		
		
		purge(container);
	};
	
	/**
	 * Create a new axis object
	 * @param {Object} chart
	 * @param {Object} options
	 */
	function Axis (chart, options) {
		
		/**
		 * Set the options by merging the inheritance line
		 */
		function setOptions() {
			options = merge(
				isXAxis ? defaultXAxisOptions : defaultYAxisOptions,
				//defaultOptions[isXAxis ? 'xAxis' : 'yAxis'],
				horiz ? 
					(opposite ? defaultTopAxisOptions : defaultBottomAxisOptions) :
					(opposite ? defaultRightAxisOptions : defaultLeftAxisOptions),
				options
			);		
		};

		/**
		 * Get the minimum and maximum for the series of each axis 
		 */
		function getSeriesExtremes() {
			var stack = [],
				run;
				
			// reset dataMin and dataMax in case we're redrawing
			dataMin = dataMax = null;
			
			// get an overview of what series are associated with this axis
			associatedSeries = [];
			
			each(series, function(serie) {
				run = false;
				
				
				// match this axis against the series' given or implicated axis
				each(['xAxis', 'yAxis'], function(strAxis) {
					if (
						// we're in the right x or y dimension, and...
						(strAxis == 'xAxis' && isXAxis || strAxis == 'yAxis' && !isXAxis) && (
							// the axis number is given in the options and matches this axis index, or
							(serie.options[strAxis] == options.index) || 
							// the axis index is not given
							(serie.options[strAxis] === undefined && options.index == 0)
						)
					) {
						serie[strAxis] = axis;
						associatedSeries.push(serie);
						
						// the series is visible, run the min/max detection
						run = true;		
					}
				});
				// ignore hidden series if opted 
				if (!serie.visible && optionsChart.ignoreHiddenSeries) run = false;				
				
				if (run) {
					
					var stacking;
		
					if (!isXAxis) {
						stacking = serie.options.stacking;
						usePercentage = stacking == 'percent';
	
						// create a stack for this particular series type
						if (stacking) {
							var typeStack = stack[serie.type] || [];
							stack[serie.type] = typeStack;
						}
						if (usePercentage) {
							dataMin = 0;
							dataMax = 99;			
						}
					} 
					if (serie.isCartesian) { // line, column etc. need axes, pie doesn't
						each(serie.data, function(point, i) {
							var pointX = point.x,
								pointY = point.y;
							
							// initial values
							if (dataMin === null) {

								// start out with the first point
								dataMin = dataMax = point[xOrY]; 
							}
		
							// x axis
							if (isXAxis) {
								if (pointX > dataMax) dataMax = pointX;
								else if (pointX < dataMin) 	dataMin = pointX;
								
							}
							
							// y axis
							else if (defined(pointY)) {
								if (stacking) 
									typeStack[pointX] = typeStack[pointX] ? typeStack[pointX] + pointY : pointY;
								
								var stackedPoint = typeStack ? typeStack[pointX] : pointY;
								if (!usePercentage) {
									if (stackedPoint > dataMax) dataMax = stackedPoint;
									else if (stackedPoint < dataMin) dataMin = stackedPoint;
								}
								if (stacking) stacks[serie.type][pointX] = { 
									total: stackedPoint,
									cum: stackedPoint 
								};
							}
						});
						
							
						// For column, areas and bars, set the minimum automatically to zero
						// and prevent that minPadding is added in setScale
						if (!isXAxis && /(area|column|bar)/.test(serie.type)) {
							if (dataMin >= 0) {
								dataMin = 0;
								ignoreMinPadding = true;
							} else if (dataMax < 0) {
								dataMax = 0;
								ignoreMaxPadding = true;
							}
						}
					}
				}
			});
			
			
		};
	
		/**
		 * Translate from axis value to pixel position on the chart, or back
		 * 
		 */
		function translate(val, backwards, cvsCoord) {
			var sign = 1,
				cvsOffset = 0,
				returnValue;
			if (cvsCoord) {
				sign *= -1; // canvas coordinates inverts the value
				cvsOffset = axisLength;
			}
			if (reversed) { // reversed axis
				sign *= -1; 
				cvsOffset -= sign * axisLength;
			}
			
			if (backwards) { // reverse translation
				if (reversed) val = axisLength - val;
				returnValue = val / transA + min; // from chart pixel to value				
			
			} else { // normal translation
				returnValue = sign * (val - min) * transA + cvsOffset; // from value to chart pixel
			}
			
			return returnValue;
		};
		
		/**
		 * Add a single line across the plot
		 */
		function drawPlotLine(value, color, width) {
			
			if (width) {
				var x1, 
					y1, 
					x2, 
					y2,
					translatedValue = translate(value),
					skip;
					
				x1 = x2 = translatedValue + transB;
				y1 = y2 = chartHeight - translatedValue - transB;
				
				if (horiz) { // horizontal axis, vertical plot line 
					y1 = marginTop;
					y2 = chartHeight - marginBottom;
					if (x1 < marginLeft || x1 > marginLeft + plotWidth) skip = true;
					
				} else { // vertical axis, horizontal plot line
					x1 = marginLeft;
					x2 = chartWidth - marginRight;
					if (y1 < marginTop || y1 > marginTop + plotHeight) skip = true;
				}
				if (!skip) gridLayer.drawLine(x1, y1, x2, y2, color, width);
				
			}
		};
		/**
		 * Add a masked band across the plot
		 * @param {Number} from chart axis value
		 * @param {Number} to chart axis value
		 * @param {String} color
		 */
		function drawPlotBand(from, to, color) {
			// keep within plot area
			from = mathMax(from, min);
			to = Math.min(to, max);  
			
			var width = (to - from) * transA;
			drawPlotLine(from + (to - from) / 2, color, width);
			
		}
		
		/**
		 * Add a tick mark an a label
		 */
		function addTick(pos, tickPos, color, width, len, withLabel, index) {
			var x1, y1, x2, y2, str, labelOptions = options.labels;
			
			// negate the length
			if (tickPos == 'inside') len = -len;
			if (opposite) len = -len;
			
			// set the initial positions
			x1 = x2 = translate(pos + tickmarkOffset) + transB;
			y1 = y2 = chartHeight - translate(pos + tickmarkOffset) - transB;
			
			if (horiz) {
				y1 = chartHeight - marginBottom - (opposite ? plotHeight : 0) + offset;
				y2 = y1 + len;
			} else {
				x1 = marginLeft + (opposite ? plotWidth : 0) + offset;
				x2 = x1 - len;				
			}
			
			if (width) axisLayer.drawLine(x1, y1, x2, y2, color, width);
			
			
			// write the label
			if (withLabel && labelOptions.enabled) {
				str = labelFormatter.call({
					index: index,
					isFirst: pos == tickPositions[0],
					isLast: pos == tickPositions[tickPositions.length - 1],
					value: (categories && categories[pos] ? categories[pos] : pos)
				});
				if (str || str === 0) axisLayer.addText(
					str,
					x1 + labelOptions.x - (tickmarkOffset && horiz ? tickmarkOffset * transA * (reversed ? -1 : 1) : 0),
					y1 + labelOptions.y - (tickmarkOffset && !horiz ? tickmarkOffset * transA * (reversed ? 1 : -1) : 0),
					labelOptions.style, 
					labelOptions.rotation,
					labelOptions.align
				);
			}
			
		};
		
		/**
		 * Take an interval and normalize it to multiples of 1, 2, 2.5 and 5
		 * @param {Number} interval
		 */
		function normalizeTickInterval(interval, multiples) {
			var normalized,
				allowDecimals = pick(options.allowDecimals, true);
				
			// round to a tenfold of 1, 2, 2.5 or 5
			magnitude = multiples ? 1 : math.pow(10, mathFloor(math.log(interval) / math.LN10));
			normalized = interval / magnitude;
			
			// multiples for a linear scale
			if (!multiples) multiples = [1, 2, 2.5, 5, 10];
			
			// normalize the interval to the nearest multiple
			for (var i = 0; i < multiples.length; i++) {
				interval = multiples[i];
				if (normalized <= (multiples[i] + (multiples[i+1] || multiples[i])) / 2) {
					break;
				}
			}
			
			// multiply back to the correct magnitude
			interval *= magnitude;
			return interval;
		};
	
		/**
		 * Set the tick positions to a time unit that makes sense, for example
		 * on the first of each month or on every Monday.
		 */
		function setDateTimeTickPositions() {
			tickPositions = [];
			var useUTC = defaultOptions.global.useUTC,
				oneSecond = 1000 / timeFactor,
				oneMinute = 60000 / timeFactor,
				oneHour = 3600000 / timeFactor,
				oneDay = 24 * 3600000 / timeFactor,
				oneWeek = 7 * 24 * 3600000 / timeFactor,
				oneMonth = 30 * 24 * 3600000 / timeFactor,
				oneYear = 31556952000 / timeFactor,
			
				units = [[
					'second',						// unit name
					oneSecond,						// fixed incremental unit
					[1, 2, 5, 10, 15, 30]			// allowed multiples
				], [
					'minute',						// unit name
					oneMinute,				// fixed incremental unit
					[1, 2, 5, 10, 15, 30]			// allowed multiples
				], [
					'hour',							// unit name
					oneHour,			// fixed incremental unit
					[1, 2, 3, 4, 6, 8, 12]			// allowed multiples
				], [
					'day',							// unit name
					oneDay,		// fixed incremental unit
					[1, 2]							// allowed multiples
				], [
					'week',							// unit name
					oneWeek,	// fixed incremental unit
					[1, 2]							// allowed multiples
				], [
					'month',
					oneMonth,
					[1, 2, 3, 4, 6]
				], [
					'year',
					oneYear,
					null
				]],
			
				unit = units[6], // default unit is years
				interval = unit[1], 
				multiples = unit[2];
			
			// loop through the units to find the one that best fits the tickInterval
			for (var i = 0; i < units.length; i++)  {
				unit = units[i];
				interval = unit[1];
				multiples = unit[2];
				
				
				if (units[i+1]) {
					// lessThan is in the middle between the highest multiple and the next unit.
					var lessThan = (interval * multiples[multiples.length - 1] + 
								units[i + 1][1]) / 2;
							
					// break and keep the current unit
					if (tickInterval <= lessThan) break;
				}
			}
			
			// prevent 2.5 years intervals, though 25, 250 etc. are allowed
			if (interval == oneYear && tickInterval < 5 * interval)
				multiples = [1, 2, 5];
	
			// get the minimum value by flooring the date
			var multitude = normalizeTickInterval(tickInterval / interval, multiples),
				minYear, // used in months and years as a basis for Date.UTC()
				minDate = new Date(min * timeFactor);
				
				
			minDate.setMilliseconds(0);
			
			if (interval >= oneSecond) // second
				minDate.setSeconds(interval >= oneMinute ? 0 :
					multitude * mathFloor(minDate.getSeconds() / multitude));
	
			if (interval >= oneMinute) // minute
				minDate[setMinutes](interval >= oneHour ? 0 :
					multitude * mathFloor(minDate[getMinutes]() / multitude));
	
			if (interval >= oneHour) // hour
				minDate[setHours](interval >= oneDay ? 0 :
					multitude * mathFloor(minDate[getHours]() / multitude));
	
			if (interval >= oneDay) // day
				minDate[setDate](interval >= oneMonth ? 1 :
					multitude * mathFloor(minDate[getDate]() / multitude));
					
			if (interval >= oneMonth) { // month
				minDate[setMonth](interval >= oneYear ? 0 :
					multitude * mathFloor(minDate[getMonth]() / multitude));
				minYear = minDate[getFullYear]();
			}
			
			if (interval >= oneYear) { // year
				minYear -= minYear % multitude;
				minDate[setFullYear](minYear);
			}
			
			// week is a special case that runs outside the hierarchy
			if (interval == oneWeek) {
				// get start of current week, independent of multitude
				minDate[setDate](minDate[getDate]() - minDate[getDay]() + 
					options.startOfWeek);
			}	
			
			
			// get tick positions
			var i = 1, // prevent crash just in case
				time = minDate.getTime() / timeFactor,
				minYear = minDate[getFullYear](),
				minMonth = minDate[getMonth](),
				minDateDate = minDate[getDate]();
				
			// iterate and add tick positions at appropriate values
			while (time < max && i < plotWidth) {
				tickPositions.push(time);
				
				// if the interval is years, use Date.UTC to increase years
				if (interval == oneYear) {
					time = makeTime(minYear + i * multitude, 0) / timeFactor;
				
				// if the interval is months, use Date.UTC to increase months
				} else if (interval == oneMonth) {
					time = makeTime(minYear, minMonth + i * multitude) / timeFactor;
					
				// if we're using global time, the interval is not fixed as it jumps
				// one hour at the DST crossover
				} else if (!useUTC && (interval == oneDay || interval == oneWeek)) {
					time = makeTime(minYear, minMonth, minDateDate + 
						i * multitude * (interval == oneDay ? 1 : 7));
					
				// else, the interval is fixed and we use simple addition
				} else {
					time += interval * multitude;
				}
				
				i++;
			}
			// push the last time
			tickPositions.push(time);
			
			// dynamic label formatter 
			if (!options.labels.formatter) labelFormatter = function() {
				return dateFormat(options.dateTimeLabelFormats[unit[0]], this.value, 1);
			}
		}
			
			
		/**
		 * Set the tick positions of a linear axis to round values like whole tens or every five.
		 */
		function setLinearTickPositions() {
			
			var correctFloat = function(num) { // JS round off float errors
					var invMag = (magnitude < 1 ? mathRound(1 / magnitude) : 1) * 10;
					
					return mathRound(num * invMag) / invMag
				},
				
				i,
				roundedMin = mathFloor(min / tickInterval) * tickInterval,
				roundedMax = math.ceil(max / tickInterval) * tickInterval;
				// default extreme ticks when axis does not start and end on a tick
				//firstTickPosition = roundedMin + tickInterval,
				//lastTickPosition = roundedMax - tickInterval,
			
				
				//invMag = (magnitude < 1 ? 1 / magnitude : 1) * 10; // round off JS float errors;
				
			tickPositions = [];
			
			// populate the intermediate values
			// todo: round off float errors occur here!
			i = correctFloat(roundedMin);
			while (i <= roundedMax) {
			//for (i = roundedMin; i <= roundedMax; i += tickInterval) {
				//i = mathRound(i * invMag) / invMag
				tickPositions.push(i);
				i = correctFloat(i + tickInterval);
			}
				
			// pad categorised axis to nearest half unit
			if (categories) {
				 min -= 0.5;
				 max += 0.5;
			}

			// dynamic label formatter 
			if (!labelFormatter) labelFormatter = function() {
				return this.value;
			}
			
		};
		
		/**
		 * Set the tick positions to round values and optionally extend the extremes
		 * to the nearest tick
		 */
		function setTickPositions() {
			if (isDatetimeAxis)	setDateTimeTickPositions();
			else setLinearTickPositions();
			
			// reset min/max or remove extremes based on start/end on tick
			var roundedMin = tickPositions[0],
				roundedMax = tickPositions[tickPositions.length - 1];
					
			
			if (options.startOnTick) {
				min = roundedMin;
			} else if (min > roundedMin) {
				tickPositions.shift();
			}
			if (options.endOnTick) {
				max = roundedMax;
			} else if (max < roundedMax) {
				tickPositions.pop();
			}	
		}
		
		/**
		 * When using multiple axes, adjust the number of ticks to match the highest
		 * number of ticks in that group
		 */ 
		function adjustTickAmount() {
			if (!isDatetimeAxis && !categories) { // only apply to linear scale
				var oldTickAmount = tickAmount,
					calculatedTickAmount = tickPositions.length;
					
				// set the axis-level tickAmount to use below
				tickAmount = maxTicks[xOrY];
				
					
				if (calculatedTickAmount < tickAmount) {
					while (tickPositions.length < tickAmount)
						tickPositions.push(tickPositions[tickPositions.length - 1] + tickInterval);
					transA *= (calculatedTickAmount - 1) / (tickAmount - 1);
				}
				if (defined(oldTickAmount) && tickAmount != oldTickAmount) axis.isDirty = true;	
				
			}
		};
	
		/**
		 * Set the scale based on data min and max, user set min and max or options
		 */
		function setScale() {
			var length, 
				type, 
				i,
				total,
				oldMin = min,
				oldMax = max,
				maxZoom = options.maxZoom,
				zoomOffset;
			
			// get data extremes if needed
			getSeriesExtremes();
			
			
			// initial min and max from the extreme data values
			min = pick(userSetMin, options.min, dataMin);
			max = pick(userSetMax, options.max, dataMax);
			
			// maxZoom exceeded, just center the selection
			if (max - min < maxZoom) { 
				zoomOffset = (maxZoom - max + min) / 2;
				// if min and max options have been set, don't go beyond it
				min = mathMax(min - zoomOffset, pick(options.min, min - zoomOffset));
				max = math.min(min + maxZoom, pick(options.max, min + maxZoom));
			}
				
			// pad the values to get clear of the chart's edges
			if (!categories && !usePercentage) {
				length = (max - min) || 1;
				if (!defined(options.min) && minPadding && (dataMin < 0 || !ignoreMinPadding)) 
					min -= length * minPadding; 
				if (!defined(options.max) && maxPadding && (dataMax > 0 || !ignoreMaxPadding)) 
					max += length * maxPadding;
			}
			
			// tickInterval
			if (categories || min == max) tickInterval = 1;
			else tickInterval = options.tickInterval == 'auto' ? 
					(max - min) * options.tickPixelInterval / axisLength : 
					options.tickInterval;
					
			if (!isDatetimeAxis && options.tickInterval == 'auto') // linear
				tickInterval = normalizeTickInterval(tickInterval);
			
			// minorTickInterval
			minorTickInterval = (options.minorTickInterval == 'auto' && tickInterval) ?
					tickInterval / 5 : options.minorTickInterval;
					
			// get fixed positions based on tickInterval
			setTickPositions();
			
			// the translation factor used in translate function			
			transA = axisLength / ((max - min) || 1);
			
			// record the greatest number of ticks for multi axis
			if (!maxTicks) maxTicks = { // first call, or maxTicks have been reset after a zoom operation
				x: 0,
				y: 0
			};				
			if (!isDatetimeAxis && tickPositions.length > maxTicks[xOrY]) 
				maxTicks[xOrY] = tickPositions.length;
				
			// reset stacks
				
			//if (!isXAxis) for (type in stacks) each (stacks[type], function(stack, i) {
			if (!isXAxis) for (type in stacks) for (i in stacks[type]) {
				stacks[type][i].cum = stacks[type][i].total;
			}


			
			// mark as dirty
			axis.isDirty = (min != oldMin || max != oldMax);
		};
		
		/**
		 * Set the extremes and optionally redraw
		 * @param {Number} newMin
		 * @param {Number} newMax
		 * @param {Boolean} redraw
		 * 
		 */
		function setExtremes(newMin, newMax, redraw) {
			redraw = pick(redraw, true); // defaults to true
				
			fireEvent(axis, 'setExtremes', { // fire an event to enable syncing of multiple charts
				min: newMin,
				max: newMax
			}, function() { // the default event handler
				// make sure categorized axes are not exceeded
				if (categories) {
					if (newMin < 0) newMin = 0;
					if (newMax > categories.length - 1) newMax = categories.length - 1;
				}
				
				// set the new values
				//userSetMin = pick(newMin, min);
				//userSetMax = pick(newMax, max);
				//if (defined(newMin)) userSetMin = newMin;
				//if (defined(newMax)) userSetMax = newMax;
				
				// this fails on zooming when a series is hidden and ignoreHiddenSeries is true
				//userSetMin = pick(newMin, options.min, dataMin);
				//userSetMax = pick(newMax, options.max, dataMax);
				
				userSetMin = newMin;
				userSetMax = newMax;
			
				
				// redraw
				if (redraw) chart.redraw();
			});
			
		};
		
		/**
		 * Set new axis categories and optionally redraw
		 * @param {Array} newCategories
		 * @param {Boolean} doRedraw
		 */
		function setCategories(newCategories, doRedraw) {
				categories = newCategories;
				if (pick(doRedraw, true)) redraw();
		};
		
		
		/* *
		 * Reset min and max and set the scale again from data min and max
		 * /
		function reset() {
			//min = max = tickInterval = minorTickInterval = tickPositions = null;
			setScale();
		}*/
		
		/**
		 * Get the actual axis extremes
		 */
		function getExtremes() {
			return {
				min: min,
				max: max,
				dataMin: dataMin,
				dataMax: dataMax
			}
		}
		
		/**
		 * Add a plot band or plot line after render time
		 * 
		 * @param item {Object} The plotBand or plotLine configuration object
		 */
		function addPlotBandOrLine(item) {
			var isLine = item.width,
				collection = isLine ? plotLines : plotBands;	

			collection.push(item);
			
			if (isLine) drawPlotLine(item.value, item.color, item.width);
			else drawPlotBand(item.from, item.to, item.color);			
		}
		
		/**
		 * Remove a plot band or plot line from the chart by id
		 * @param {Object} id
		 */
		function removePlotBandOrLine(id) {
			each ([plotBands, plotLines], function(collection) {
				for (var i = 0; i < collection.length; i++) {
	
					if (collection[i].id == id) {
						collection.splice(i, 1);
						break;
					}
				}
			});
			render();
		}
		
		
		/**
		 * Redraw the axis to reflect changes in the data or axis extremes
		 */
		function redraw() {
			
			// hide tooltip and hover states
			if (tracker.resetTracker) tracker.resetTracker();
		
			// render the axis
			render();
			
			// mark associated series as dirty and ready for redraw
			each (associatedSeries, function(series) {
				series.isDirty = true;
			});
						
		}
		
		function render() {
			var axisTitle = options.title,
				alternateGridColor = options.alternateGridColor,
				minorTickWidth = options.minorTickWidth,
				lineWidth = options.lineWidth,
				lineLeft,
				lineTop,
				tickmarkPos,
				hasData = associatedSeries.length && defined(min) && defined(max);
			
			
			// clear the axis layers before new grid and ticks are drawn
			axisLayer.clear();
			gridLayer.clear();
			
			// return if there's no series on this axis
			//if (!associatedSeries.length || !defined(min) || !defined(max)) return;
			
			// If the series has data draw the ticks. Else only the line and title
			if (hasData) {
			
				// alternate grid color
				if (alternateGridColor) {
					each(tickPositions, function(pos, i) {
						if (i % 2 == 0 && pos < max) {
							drawPlotBand(
								pos, 
								tickPositions[i + 1] !== undefined ? tickPositions[i + 1] : max, 
								alternateGridColor
							);
						}
					});
				}
				
				// custom plot bands (behind grid lines)
				each (plotBands, function(plotBand) {
					drawPlotBand(plotBand.from, plotBand.to, plotBand.color);
				});
				
				// minor grid lines
				if (minorTickInterval && !categories) for (var i = min; i <= max; i += minorTickInterval) {
					drawPlotLine(i, options.minorGridLineColor, options.minorGridLineWidth);
					if (minorTickWidth) addTick(
						i, 
						options.minorTickPosition, 
						options.minorTickColor, 
						minorTickWidth, 
						options.minorTickLength
					);
				}
				// grid lines and tick marks
				each(tickPositions, function(pos, index) {
					tickmarkPos = pos + tickmarkOffset;
					
					// add the grid line
					drawPlotLine(tickmarkPos, options.gridLineColor, options.gridLineWidth);
					
					// add the tick mark
					addTick(
						pos, 
						options.tickPosition, 
						options.tickColor, 
						options.tickWidth, 
						options.tickLength, 
						!((pos == min && !options.showFirstLabel) || (pos == max && !options.showLastLabel)),
						index
					);
				});
			
			
				
				// custom plot lines (in front of grid lines)
				each (plotLines, function(plotLine) {
					drawPlotLine(plotLine.value, plotLine.color, plotLine.width);
				});
			
			} // end if hasData
			
			// axis line
			if (lineWidth) {
				lineLeft = marginLeft + (opposite ? plotWidth : 0) + offset;
				lineTop = chartHeight - marginBottom - (opposite ? plotHeight : 0) + offset;
				axisLayer.drawLine(
					horiz ? 
						marginLeft: 
						lineLeft,
					horiz ? 
						lineTop: 
						marginTop, 
					horiz ? 
						chartWidth - marginRight : 
						lineLeft,
					horiz ? 
						lineTop:
						chartHeight - marginBottom, 
					options.lineColor, 
					lineWidth
				);
			}
			
			// title
			if (axisTitle && axisTitle.enabled && axisTitle.text) {
				
				// compute anchor points for each of the title align options
				var margin = horiz ? 
						marginLeft : marginTop,
					length = horiz ? plotWidth : plotHeight;
					
				// the position in the length direction of the axis
				var alongAxis = { 
					low: margin + (horiz ? 0 : length), 
					middle: margin + length / 2, 
					high: margin + (horiz ? length : 0)
				}[axisTitle.align];
				
				// the position in the perpendicular direction of the axis
				var offAxis = (horiz ? marginTop + plotHeight : marginLeft) +
					(horiz ? 1 : -1) * // horizontal axis reverses the margin
					(opposite ? -1 : 1) * // so does opposite axes
					axisTitle.margin 
					- (isIE ? parseInt(
						axisTitle.style.fontSize || axisTitle.style.font.replace(/^[a-z ]+/, '')
					) / 3 : 0); // preliminary fix for vml's centerline
				
				axisLayer.addText(
					axisTitle.text,
					horiz ? 
						alongAxis: 
						offAxis + (opposite ? plotWidth : 0) + offset, // x
					horiz ? 
						offAxis - (opposite ? plotHeight : 0) + offset: 
						alongAxis, // y
					axisTitle.style, 
					axisTitle.rotation || 0,
					{ low: 'left', middle: 'center', high: 'right' }[axisTitle.align]
				);
				
			}
			// stroke tick labels and title
			axisLayer.strokeText();
			
			axis.isDirty = false;
		};
		
		
		// Run Axis
		var isXAxis = options.isX,
			opposite = options.opposite, // needed in setOptions			
			horiz = inverted ? !isXAxis : isXAxis,
			stacks = {
				bar: {},
				column: {},
				area: {},
				areaspline: {}
			};
	
		setOptions(); // do the merging
	
		var axis = this,
			isDatetimeAxis = options.type == 'datetime',
			offset = options.offset || 0,
			xOrY = isXAxis ? 'x' : 'y',
			axisLength = horiz ? plotWidth : plotHeight,
		
			transA,							 	// translation factor
			transB = horiz ? marginLeft : marginBottom, 		// translation addend
			axisLayer = new Layer('axis-layer', container, null, { zIndex: 7}), /* The
				axis layer is in front of the series because the axis line must hide
				graphs and bars. Grid lines are drawn on the grid layer. */
			gridLayer = new Layer('grid-layer', container, null, { zIndex: 1 }),
			dataMin,
			dataMax,
			associatedSeries,
			userSetMin,
			userSetMax,
			max = null,
			min = null,
			minPadding = options.minPadding,
			maxPadding = options.maxPadding,
			ignoreMinPadding, // can be set to true by a column or bar series
			ignoreMaxPadding,
			usePercentage,
			events = options.events,
			eventType,
			plotBands = options.plotBands || [],
			plotLines = options.plotLines || [],
			tickInterval,
			minorTickInterval,
			magnitude,
			tickPositions, // array containing predefined positions
			tickAmount,
			zoom = 1,
			//var axisLabelsLayer = new Layer((horiz ? 'x' : 'y') +'-axis-labels');
			labelFormatter = options.labels.formatter, // can be overwritten by dynamic format
			// column plots are always categorized
			categories = options.categories || (isXAxis && chart.columnCount), 
			reversed = options.reversed,
			tickmarkOffset = (categories && options.tickmarkPlacement == 'between') ? 0.5 : 0;
			//var hasWrittenTitle;
			
		// inverted charts have reversed xAxes as default
		if (inverted && isXAxis && reversed === undefined) reversed = true;
			
		// negate offset
		if (!opposite) offset *= -1;
		if (horiz) offset *= -1; 
		
			
		// expose some variables
		extend (axis, {
			addPlotBand: addPlotBandOrLine,
			addPlotLine: addPlotBandOrLine,
			adjustTickAmount: adjustTickAmount,
			categories: categories,
			getExtremes: getExtremes,
			isXAxis: isXAxis,
			options: options,
			render: render,
			setExtremes: setExtremes,
			setScale: setScale,
			setCategories: setCategories,
			translate: translate,
			redraw: redraw,
			removePlotBand: removePlotBandOrLine,
			removePlotLine: removePlotBandOrLine,
			//reset: reset,
			reversed: reversed,
			stacks: stacks
		});
		
		// register event listeners
		for (eventType in events) {
			addEvent(axis, eventType, events[eventType]);
		}
		
		// set min and max
		setScale();
			
	
	}; // end Axis
	
	function Toolbar(chart) {
		var toolbarLayer, buttons = {};
		
		toolbarLayer = new Layer('toolbar', container, null, { 
			zIndex: 1004, 
			width: 'auto', 
			height: 'auto'
		});
		
		
		function add(id, text, title, fn) {
			if (!buttons[id]) {
				var button = createElement(DIV, {
						innerHTML: text,
						title: title,
						onclick: fn
					}, extend(options.toolbar.itemStyle, { 	
						zIndex: 1003
					}), toolbarLayer.div);
				buttons[id] = button;
			}
		}
		function remove(id) {
			discardElement(buttons[id]);
			buttons[id] = null;
		}
		
		// public
		return {
			add: add,
			remove: remove
		}
	};
	
	function MouseTracker (chart, options) {
		/**
		 * Get the currently hovered point
		 */
		function getActivePoint() {
			return activePoint;
		};
		
		/**
		 * Add IE support for pageX and pageY
		 * @param {Object} e The event object in standard browsers
		 */
		function normalizeMouseEvent(e) {
			// common IE normalizing
			e = e || win.event;
			if (!e.target) e.target = e.srcElement;
				
			// pageX and pageY
			if (!e.pageX)
				e.pageX = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft);
			
			if (!e.pageY)
				e.pageY = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop);
				
			return e;
		}
		
		/**
		 * Get the click position in terms of axis values.
		 * 
		 * @param {Object} e A mouse event
		 */
		function getMouseCoordinates(e) {
			var coordinates = {
				xAxis: [],
				yAxis: []
			}; 
			each (axes, function(axis, i) {
				var translate = axis.translate,
					isXAxis = axis.isXAxis,
					isHorizontal = inverted ? !isXAxis : isXAxis;
					
				coordinates[isXAxis ? 'xAxis' : 'yAxis'].push({
					axis: axis,
					value: translate(
						isHorizontal ? 
							e.pageX - position.x - marginLeft  : 
							plotHeight - e.pageY + position.y + marginTop ,
						true
					)								
				})
			});
			return coordinates;
		}
		
		/* *
		 * Drop a point after dragging to change it's value
		 * 
		 * @todo: 
		 * - x dimension
		 * /
		function dropDragPoint() {
			if (hasDragged && dragPoint) {
				var yAxis = dragPointCoordinates.yAxis,
					i = 0;
					
				// identify the point's yAxis
				for (i; i < yAxis.length; i++) { 
					if (yAxis[i].axis == dragPoint.series.yAxis) {
						break;
					}					
				}
				// update the point
				dragPoint.update(yAxis[i].value);
				dragPoint = null;				
			}
		}
		*/
		/**
		 * Set the JS events on the container element
		 */
		function setDOMEvents () {
			
			imagemap.onmousedown = function(e) {
				e = normalizeMouseEvent(e);
				
				// record the start position
				if (e.preventDefault) e.preventDefault();
				chart.mouseIsDown = mouseIsDown = true;
				mouseDownX = e.pageX;
				mouseDownY = e.pageY;
					
				
				// make a selection
				if (hasCartesianSeries && (zoomX || zoomY)) {
					if (!selectionMarker) selectionMarker = createElement(DIV, null, {
						position: ABSOLUTE,
						border: 'none',
						background: '#4572A7',
						opacity: 0.25,
						width: zoomHor ? 0 : plotWidth + PX,
						height: zoomVert ? 0 : plotHeight + PX
					});
					plotLayer.div.appendChild(selectionMarker);
				}
				
				// drag a point
				/* else if (activePoint && e.target.tagName == 'AREA') {
					var seriesOptions = activePoint.series.options,
						dragType = seriesOptions.dragType;
					
					if (seriesOptions.allowDrag) {
						allowXDrag = /x/.test(dragType);
						allowYDrag = /y/.test(dragType);
					}
					// define the point
					if (allowXDrag || allowYDrag) dragPoint = activePoint;
				}
				*/
			};
			
			
			// Use native browser event for this one. It's faster, and MooTools
			// doesn't use clientX and clientY.
			imagemap.onmousemove = function(e) {
				e = normalizeMouseEvent(e);
				e.returnValue = false;
				if (mouseIsDown) { // make selection
				
					// determine if the mouse has moved more than 10px
					hasDragged = Math.sqrt(
						Math.pow(mouseDownX - e.pageX, 2) + 
						Math.pow(mouseDownY - e.pageY, 2)
					) > 10;
					
					// adjust the width of the selection marker
					if (zoomHor) {
						var xSize = e.pageX - mouseDownX;
						setStyles(selectionMarker, {
							width: mathAbs(xSize) + PX,
							left: ((xSize > 0 ? 0 : xSize) 
								 + mouseDownX - position.x - marginLeft) + PX
						});
					}
					// adjust the height of the selection marker
					if (zoomVert) {
						var ySize = e.pageY - mouseDownY;
						setStyles(selectionMarker, {
							height: mathAbs(ySize) + PX,
							top: ((ySize > 0 ? 0 : ySize) +
								 + mouseDownY - position.y - marginTop) + PX
						});
					}
					
					/* Removed to prevent bloating. Can be added as a separate component later. 
					// drag a point
					if (hasDragged && dragPoint) {
		
						// draw the hover point
						dragPoint.series.drawPointState(dragPoint, 'hover');

						// record the coordinates
						dragPointCoordinates = getMouseCoordinates(e);
						
						if (allowXDrag) {
							// update the plot coordinates
							dragPoint.plotX = e.pageX - position.x - marginLeft;
							// get the tooltip text and refresh the tooltip
							dragPoint.x = dragPoint.series.xAxis.translate(
								dragPoint.plotX, 
								true
							);
						}
						if (allowYDrag) {
							// update the plot coordinates
							dragPoint.plotY = e.pageY - position.y - marginTop;
							// get the tooltip text and refresh the tooltip
							dragPoint.y = dragPoint.series.yAxis.translate(
								plotHeight - dragPoint.plotY, 
								true
							);
						}
						
						// adjust height for columns
						dragPoint.h = (dragPoint.yBottom || dragPoint.y0) - dragPoint.plotY;
						
						dragPoint.setTooltipText();
						tooltip.refresh(dragPoint, dragPoint.series);						
					}
					*/
					
				} else {
					// show the tooltip
					onmousemove(e);
				}
				return false;
			};
			imagemap.onmouseup = function() {
				var selectionIsMade;
				
				if (selectionMarker) {
					var selectionData = {
							xAxis: [],
							yAxis: []
						},
						selectionLeft = selectionMarker.offsetLeft,
						selectionTop = selectionMarker.offsetTop,
						selectionWidth = selectionMarker.offsetWidth,
						selectionHeight = selectionMarker.offsetHeight;
						
						
					// a selection has been made
					if (hasDragged) {
						
						// record each axis' min and max
						each (axes, function(axis, i) {
							var translate = axis.translate,
								isXAxis = axis.isXAxis,
								isHorizontal = inverted ? !isXAxis : isXAxis,
								selectionMin = translate(
									isHorizontal ? 
										selectionLeft : 
										plotHeight - selectionTop - selectionHeight, 
									true
								),
								selectionMax = translate(
									isHorizontal ? 
										selectionLeft + selectionWidth : 
										plotHeight - selectionTop, 
									true
								);
								
							selectionData[isXAxis ? 'xAxis' : 'yAxis'].push({
								axis: axis,
								min: math.min(selectionMin, selectionMax), // for reversed axes
								max: mathMax(selectionMin, selectionMax)
							});
							
						});
						fireEvent(chart, 'selection', selectionData, zoom);

						selectionIsMade = true;
					}					
					
					discardElement(selectionMarker);
					selectionMarker = null;
				}
				
				chart.mouseIsDown = mouseIsDown = hasDragged = false;
				/*
				else {
					dropDragPoint();
				}*/
			};
			
			// MooTools 1.2.4 doesn't handle this 'mouseleave' in IE
			imagemap.onmouseout = function(e) {
				e = e || win.event;
				var	related = e.relatedTarget || e.toElement;
				
				// check that the mouse has really left the imagemap
				if (related && related != trackerImage && related.tagName != 'AREA') {
			
					// reset the tracker
					resetTracker();
					
					// if the user is pushing a point, drop it
					//dropDragPoint();
					
					// reset mouseIsDown and hasDragged
					chart.mouseIsDown = mouseIsDown = hasDragged = false;
					
				}
			}
			
			// MooTools 1.2.3 doesn't fire this in IE when using addEvent
			imagemap.onclick = function(e) {
				e = normalizeMouseEvent(e);
				 
				e.cancelBubble = true; // IE specific
				
				if (!hasDragged) {
					if (activePoint && e.target.tagName == 'AREA') {
						var plotX = activePoint.plotX,
							plotY = activePoint.plotY;
							
						// add page position info
						extend(activePoint, {
							pageX: position.x + marginLeft + 
								(inverted ? plotWidth - plotY : plotX),
							pageY: position.y + marginTop + 
								(inverted ? plotHeight - plotX : plotY)
						});
						
						// the series click event
						fireEvent(chart.hoverSeries, 'click', extend(e, {
							point: activePoint
						}));
						
						// the point click event
						activePoint.firePointEvent('click', e);
					
					} else { 
						extend (e, getMouseCoordinates(e));
							
						
						// fire a click event in the chart
						fireEvent(chart, 'click', e);
					}
					
					
				}
				// reset mouseIsDown and hasDragged
				//chart.mouseIsDown = mouseIsDown = hasDragged = false;
				hasDragged = false;
			};
			
			
			 
		};
		/**
		 * Refresh the tooltip on mouse move
		 */
		function onmousemove (e) {
			var point = chart.hoverPoint,
				series = chart.hoverSeries;
			
			if (series) {
		
				// get the point
				if (!point) point = series.tooltipPoints[
					inverted ? 
						e.pageY - position.y - marginTop : 
						e.pageX - position.x - marginLeft
				];
			
				// a new point is hovered, refresh the tooltip
				if (point && point != activePoint) {
					
					// trigger the events
					if (activePoint) activePoint.firePointEvent('mouseOut');
					point.firePointEvent('mouseOver');

					// refresh the tooltip
					if (tooltip) tooltip.refresh(point);
					activePoint = point;
					
					
				}				
			}
		};
		

		
		/**
		 * Create the image map that listens for mouseovers
		 */
		function createImageMap () {
			var id = 'highchartsMap'+ canvasCounter++;
			
			chart.imagemap = imagemap = createElement('map', {
					name: id,
					id: id,
					className: 'highcharts-image-map'
				}, null, container);
			
			// Append the image to the image map to allow events to 
			// bubble up
			trackerImage = createElement('img', {
				useMap: '#'+ id
			}, {
				width: plotWidth + PX,
				height: plotHeight + PX,
				left: marginLeft + PX,
				top: marginTop + PX,
				opacity: 0,
				border: 'none',
				position: ABSOLUTE,
				// Workaround: if not clipped, the left axis will flicker in 
				// IE8 when hovering the chart
				clip: 'rect(1px,'+ plotWidth +'px,'+ plotHeight +'px,1px)', 
				zIndex: 9
			}, imagemap);
			
						
			// Blank image for modern browsers. IE doesn't need a valid 
			// image for the image map to work, and fails in SSL mode
			// if it's present.
			if (!isIE) trackerImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		};
		
		/**
		 * Reset the tracking by hiding the tooltip, the hover series state and the hover point
		 */
		function resetTracker() {
			// hide the tooltip
			if (tooltip) tooltip.hide();
			
			// hide the hovered series and point
			if (chart.hoverSeries) {
				chart.hoverSeries.setState();
				chart.hoverSeries = null;
				activePoint = null;
			}
		}
		/**
		 * Bring a specific area to the front so that the user can follow a line. The
		 * legend area should always stay on top. Series tracker areas are brought to the
		 * top after the legend area.
		 * @param {Object} area The area DOM element
		 */
		function insertAtFront(area) {
			var before = 0,
				i,
				childNodes = imagemap.childNodes;
			for (i = 0; i < childNodes.length; i++) {
				if (childNodes[i].isLegendArea) {
					before = i + 1;
					break;
				}
			}
			imagemap.insertBefore(area, childNodes[before]);				
		}
		
		//if (!options.enabled) return;
		
		// Run MouseTracker
		var activePoint,
			mouseDownX, 
			mouseDownY,
			hasDragged,
			selectionMarker,
			/*dragPoint,
			dragPointCoordinates,
			allowXDrag,
			allowYDrag,*/
			zoomType = optionsChart.zoomType,
			zoomX = /x/.test(zoomType),
			zoomY = /y/.test(zoomType),
			zoomHor = zoomX && !inverted || zoomY && inverted,
			zoomVert = zoomY && !inverted || zoomX && inverted;
			
			
		// public
		createImageMap();
		if (options.enabled) chart.tooltip = tooltip = Tooltip(options);
		
		setDOMEvents();
		
		// set the fixed interval ticking for the smooth tooltip
		setInterval(function() {
			if (tooltipTick) tooltipTick();
		}, 32);
		
		// expose properties
		extend (this, {
			insertAtFront: insertAtFront,
			zoomX: zoomX,
			zoomY: zoomY,
			resetTracker: resetTracker
		});
	};
	

	
	/**
	 * The overview of the chart's series
	 * @param {Object} chart
	 */
	var Legend = function(chart) {
		// already existing			
		//if (chart.legend) return;
			
		var options = chart.options.legend;
			
		if (!options.enabled) return;
		
		var li,
			layout = options.layout,
			symbolWidth = options.symbolWidth,
			dom,
			topRule = '#'+ container.id +' .highcharts-legend li', // apply once for each chart
			allItems = [],
			legendLayer = new Layer('legend', container, null, { zIndex: 7 }),
			legendArea,
			series = chart.series,
			reversedLegend = options.reversed;
			
		
		// Don't use Layer prototype because this needs to sit above the chart in zIndex
		this.dom = dom = createElement(DIV, {
			className: 'highcharts-legend highcharts-legend-'+ layout,
			innerHTML: '<ul style="margin:0;padding:0"></ul>'
		}, extend({
			position: ABSOLUTE,
			zIndex: 7
		}, options.style), container);
			
		// Add the CSS for all states
		addCSSRule(topRule, extend(options.itemStyle, {
			paddingLeft: (symbolWidth +	options.symbolPadding) + PX,
			'float': layout == 'horizontal' ? 'left' : 'none'
		}));
		addCSSRule(topRule +':hover', options.itemHoverStyle);
		addCSSRule(topRule +'.'+ HIGHCHARTS_HIDDEN, options.itemHiddenStyle);
		addCSSRule('.highcharts-legend-horizontal li', { 'float': 'left' });
		
		renderHTML();
		drawGraphics();
		
		function renderHTML(clear) {
			if (clear) {
				each (allItems, function(item) {
					discardElement(item.legendItem);
				});
				allItems = [];
			}

			// add HTML for each series
			if (reversedLegend) {
				series.reverse();
			} 
			each(series, function(serie) {
				if (!serie.options.showInLegend) return;
				
				// use points or series for the legend item depending on legendType
				var items = (serie.options.legendType == 'point') ?
						serie.data : [serie];
						
					
				each(items, function(item) {
					// let these series types use a simple symbol
					item.simpleSymbol = /(bar|pie|area|column)/.test(serie.type);
					
					
					// generate the list item
					item.legendItem = li = createElement('li', {
							innerHTML: options.labelFormatter.call(item),
							className: item.visible ? '' : HIGHCHARTS_HIDDEN
						}, 
						null, //item.visible ? style : merge(style, options.itemHiddenStyle), 
						dom.firstChild
					);
					
					
					// add the checkbox
					if (item.options && item.options.showCheckbox) {
						item.checkbox = createElement('input', {
							type: 'checkbox',
							checked: item.selected,
							defaultChecked: item.selected // required by IE7
						}, options.itemCheckboxStyle, li);
					}
					
					// add the events
					addEvent(li, 'mouseover', function() {
						item.setState('hover');
					});
					addEvent(li, 'mouseout', function() {
						item.setState();
					});
					addEvent(li, 'click', function(event) {
						var target = event.target,
							strLegendItemClick = 'legendItemClick',
							fnLegendItemClick = function() {
								item.setVisible();
							};
						
						// click the input
						if (target.tagName == 'INPUT') {
							fireEvent (item, 'checkboxClick', { 
									checked: target.checked 
								}, 
								function() {
									item.select();
								}
							);
							
						// click the name or symbol
						} else if (item.firePointEvent) { // point
							item.firePointEvent (strLegendItemClick, null, fnLegendItemClick);
						} else {
							fireEvent (item, strLegendItemClick, null, fnLegendItemClick);
						}
					});
					
					// add it all to an array to use below
					allItems.push(item);
				});
			});
			if (reversedLegend) {
				series.reverse();
			}
		}
		
		
		/**
		 * Draw the box behind the legend and the symbols
		 * @param {Boolean} clear Whether to clear out previous graphics
		 */
		function drawGraphics(clear) {
			if (clear) {
				legendLayer.clear();
				discardElement(legendArea);
				legendArea = null;
			}
			if (series.length) {
			
				// draw the box around the legend
				if (options.borderWidth || options.backgroundColor) 
						legendLayer.drawRect(
					dom.offsetLeft, 
					dom.offsetTop,
					dom.offsetWidth, 
					dom.offsetHeight, 
					options.borderColor, 
					options.borderWidth, 
					options.borderRadius, 
					options.backgroundColor, 
					options.shadow
				);
	
	
			
				// Add the symbol after the list is complete.		
				each(allItems, function(item) {
					if (!item.legendItem) return;
	
					var li = item.legendItem,
						symbolX = dom.offsetLeft + li.offsetLeft,
						symbolY = dom.offsetTop + li.offsetTop + li.offsetHeight / 2,
						markerOptions,
						isHidden = item.legendItem.className == HIGHCHARTS_HIDDEN,
						color = isHidden ? 
							options.itemHiddenStyle.color : 
							item.color;
							
					// draw the line
					if (!item.simpleSymbol && item.options && item.options.lineWidth)
						legendLayer.drawLine(
							symbolX, 
							symbolY, 
							symbolX + symbolWidth, 
							symbolY, 
							color, 
							item.options.lineWidth
						);
					// draw a simple symbol
					if (item.simpleSymbol) // bar|pie|area|column
						legendLayer.drawRect(
							symbolX,
							symbolY - 6,
							16,
							12,
							null,
							0,
							2,
							color
						);
						
					// draw the marker
					else if (item.options && item.options.marker && item.options.marker.enabled)
						item.drawMarker(
							legendLayer, 
							symbolX + symbolWidth / 2, 
							symbolY, 
							merge(item.options.marker, isHidden ? {
								fillColor: color,
								lineColor: color
							}: null)
						);
				});
				
				// Add an area that detects mouseovers and puts the legend in front so it can be clicked
				if (imagemap) {
					legendArea = createElement('area', {
						shape: 'rect',
						isLegendArea: true,
						coords: [
							dom.offsetLeft - marginLeft, 
							dom.offsetTop - marginTop, 
							dom.offsetLeft + dom.offsetWidth - marginLeft,
							dom.offsetTop + dom.offsetHeight - marginTop
						].join(',')
					});
					// insert at the top
					tracker.insertAtFront(legendArea);
					
					// note: using addEvent and mouseleave, mouseenter doesn't work with Moo in IE
					legendArea.onmouseover = function(e) {
						e = e || win.event;
						var	relatedTarget = e.relatedTarget || e.fromElement;
						if (relatedTarget != dom && !mouseIsDown) {
							if (tooltip) tooltip.hide();
							setStyles(dom, {
								zIndex: 10
							});
						}		
					}
					dom.onmouseout = legendArea.onmouseout = function(e) {
						e = e || win.event;
						var	relatedTarget = e.relatedTarget || e.toElement;
						if (relatedTarget && (relatedTarget == trackerImage || 
								(relatedTarget.tagName == 'AREA' && relatedTarget != legendArea))) 
							setStyles(dom, {
								zIndex: 7
							});
					}
				}
			} // if series.length
		}
		
		// expose redrawGraphics
		return {
			renderHTML: renderHTML,
			drawGraphics: drawGraphics
		};
	};
	
	function Tooltip (options) {
		var currentSeries,
			innerDiv,
			borderWidth = options.borderWidth,
			boxLayer;
		
		tooltipDiv = createElement(DIV, null, {
			position: ABSOLUTE,
			visibility: HIDDEN,
			overflow: HIDDEN,
			padding: '0 50px 5px 0',
			zIndex: 8
		}, container);
		
		// the rounded corner box
		boxLayer = new Layer('tooltip-box', tooltipDiv, null, {
			width: chartWidth + PX,
			height: chartHeight + PX
		});
		
		// an inner element for the contents
		innerDiv = createElement(DIV, { 
				className: "highcharts-tooltip"
			}, extend(options.style, {
				maxWidth: (chartWidth - 40) + PX,
				//overflow: HIDDEN, interferes with the text width detection
				textOverflow: 'ellipsis',
				position: RELATIVE,
				zIndex: 2
			}), tooltipDiv
		);
		
		
		/**
		 * Refresh the tooltip's text and position. 
		 * @param {Object} point
		 * 
		 */
		function refresh(point, series) {
			var tooltipPos = point.tooltipPos,
				series = point.series,
				//chartOptions = chart.options,
				borderColor = options.borderColor || point.color || series.color || '#606060',
				//categories = series.xAxis ? series.xAxis.categories : null,
				inverted = chart.inverted,//chart.options.chart.inverted,
				x,
				y,
				boxX,
				boxY,
				boxWidth,
				boxHeight,
				oldInnerDivHeight = innerDiv.offsetHeight,
				show,
				text = point.tooltipText;
				
			
			// register the current series
			currentSeries = series;
			
			// get the reference point coordinates (pie charts use tooltipPos)
			x = tooltipPos ? tooltipPos[0] : (inverted ? plotWidth - point.plotY : point.plotX);
			y = tooltipPos ? tooltipPos[1] : (inverted ? plotHeight - point.plotX : point.plotY);
				
				
			// hide tooltip if the point falls outside the plot
			if (x >= 0 && x <= plotWidth && y >= 0 && y <= plotHeight) {
				show = true;
			}
			
			// update the inner HTML
			if (text === false || !show) { 
				hide();
			} else {
				innerDiv.innerHTML = text;
				
				// Draw a rounded border. Draw the border with 20px extra width to minimize
				// the need to redraw it later. Next time, only redraw if the width of the 
				// box is more than 20px wider or smaller than the old box.
				setStyles(innerDiv, { overflow: VISIBLE });
				boxWidth = innerDiv.offsetWidth - borderWidth;
				boxHeight = innerDiv.offsetHeight - borderWidth;
				setStyles(innerDiv, { overflow: HIDDEN });
				
				if (boxWidth > (boxLayer.w || 0) + 20 || boxWidth < (boxLayer.w || 0) - 20 || 
						boxHeight > boxLayer.h || boxLayer.c != borderColor ||
						oldInnerDivHeight != innerDiv.offsetHeight ) {
				    boxLayer.clear();		
				    boxLayer.drawRect(
						borderWidth / 2, 
						borderWidth / 2, 
				    	boxWidth + 20,
				    	boxHeight, 
				    	borderColor, 
						borderWidth, 
						options.borderRadius, 
				    	options.backgroundColor, 
						options.shadow
					);
					
					// register size
					extend(boxLayer, {
						w: boxWidth,
						h: boxHeight,
						c: borderColor
					});
				}
				
				// keep the box within the chart area
				boxX = x - boxLayer.w + marginLeft - 35;
				boxY = y - boxLayer.h + 10 + marginTop;
				
				// it is too far to the left, and there is space to the right
				/*if ((inverted || boxX < 5) && x + marginLeft + boxLayer.w < chartWidth - 100) 
					boxX = x + marginLeft + 15; // right align*/
				
				// it is too far to the left, lift it up
				if (boxX < 5) {
					boxX = 5;
					boxY -= 20;
				}
				
				
				if (boxY < 5) boxY = 5; // above
				else if (boxY + boxLayer.h > chartHeight) 
					boxY = chartHeight - boxLayer.h - 5; // below
				
				// do the move
				move(mathRound(boxX), mathRound(boxY));
		
			    // show the hover mark
				series.drawPointState(point, 'hover');
			
				tooltipDiv.style.visibility = VISIBLE;
			}
		
		};
		
		// Provide a soft movement of the tooltip
		function move(finalX, finalY) {
			
			var hidden = (tooltipDiv.style.visibility == HIDDEN),
				x = hidden ? finalX : (tooltipDiv.offsetLeft + finalX) / 2, 
				y = hidden ? finalY : (tooltipDiv.offsetTop + finalY) / 2;
			
			setStyles( tooltipDiv, {
				left: x + PX, 
				top: y + PX
			});
			
			// run on next tick of the mouse tracker
			if (mathAbs(finalX - x) > 1 || mathAbs(finalY - y) > 1) {
				tooltipTick = function() {
					move(finalX, finalY);
				};
			} else {
				tooltipTick = null;
			}
		};
		function hide() {
			if (tooltipDiv) tooltipDiv.style.visibility = HIDDEN;
			if (currentSeries) currentSeries.drawPointState();
		};
		
		// public members
		return {
			refresh: refresh,
			hide: hide
		}		
	};
	
		
	

		
	//--- Run Chart ---
	// Override defaults for inverted axis
	/*if (options.chart && options.chart.inverted) defaultOptions = 
		merge(defaultOptions, invertedDefaultOptions);*/
	// Make sure the VML canvas manager is initialized. It initializes on doc.ready by default,
	// which in some cases is too late for Highcharts.
	if (win.G_vmlCanvasManager) {
		win.G_vmlCanvasManager.init_(document);
	}
		
	// Pull out the axis options to enable multiple axes
	defaultXAxisOptions = merge(defaultXAxisOptions, defaultOptions.xAxis);
	defaultYAxisOptions = merge(defaultYAxisOptions, defaultOptions.yAxis);
	defaultOptions.xAxis = defaultOptions.yAxis = null;
		
	// Handle regular options
	options = merge(defaultOptions, options);
	
	var optionsChart = options.chart;
	

		
	// handle margins
	var optionsMargin = optionsChart.margin,
		margin = typeof optionsMargin == 'number' ? 
			[optionsMargin, optionsMargin, optionsMargin, optionsMargin] :
			optionsMargin,
		marginTop = margin[0],
		marginRight = margin[1],
		marginBottom = margin[2],
		marginLeft = margin[3],
		renderTo,
		renderToClone,
		container,
		containerId,
		chartWidth,
		chartHeight;
		
	// create the container
	// todo: move this to render and don't render anything to the container before that
	getContainer();
	
	
	var chart = this,
		//container = doc.getElementById(optionsChart.renderTo),
		//container,
		chartEvents = optionsChart.events,
		eventType,
		imagemap,
		tooltip,
		mouseIsDown,
		backgroundLayer = new Layer('chart-background', container),
		//chartHeight, 
		//chartWidth,
		loadingLayer,
		plotLayer,
		plotHeight,
		plotWidth,
		//ctx, 
		tracker,
		trackerImage,
		legend,
		//xAxis, 
		//yAxis,
		position = getPosition(container),
		hasCartesianSeries = optionsChart.showAxes,
		axes = [],
		maxTicks, // handle the greatest amount of ticks on grouped axes
		series = [], 
		resourcesLoaded, 
		plotBackground,
		inverted,
		tooltipTick,
		tooltipDiv;
		
		
	// Set to zero for each new chart
	colorCounter = 0;
	symbolCounter = 0;
	
	// Update position on resize and scroll
	addEvent(win, 'resize', updatePosition);
	
	// Destroy the chart and free up memory
	addEvent(win, 'unload', destroy);
	
	// Chart event handlers
	if (chartEvents) for (eventType in chartEvents) { 
		addEvent(chart, eventType, chartEvents[eventType]);
	}
	
	// Chart member functions
	chart.addLoading = function (loadingId) {
		chart.resources[loadingId] = false;
	}
	chart.clearLoading = function (loadingId) {
		chart.resources[loadingId] = true;
		checkResources();
	}
	
	
	chart.options = options;
	chart.series = series;
	chart.container = container;
	
	chart.resources = {};
	
	chart.inverted = inverted = options.chart.inverted
	
	chart.chartWidth = chartWidth;
	chart.chartHeight = chartHeight;
	
	chart.plotWidth = plotWidth = chartWidth - marginLeft - marginRight;
	chart.plotHeight = plotHeight = chartHeight - marginTop - marginBottom;
	
	chart.plotLeft = marginLeft;
	chart.plotTop = marginTop;
	
	// API methods
	chart.redraw = redraw;
	chart.addSeries = addSeries;
	chart.getSelectedPoints = getSelectedPoints;
	chart.getSelectedSeries = getSelectedSeries;
	chart.showLoading = showLoading;
	chart.hideLoading = hideLoading;
	chart.get = get;
	chart.destroy = destroy;
	
	chart.updatePosition = updatePosition; // docs
	
	chart.plotLayer = plotLayer = new Layer('plot', container, null, {
		position: ABSOLUTE,
		width: plotWidth + PX,
		height: plotHeight + PX,
		left: marginLeft + PX,
		top: marginTop + PX,
		overflow: HIDDEN,
		zIndex: 3
	});
	
	
	// Wait for loading of plot area background
	if (optionsChart.plotBackgroundImage) {
		chart.addLoading('plotBack');
		plotBackground = createElement('img');
		plotBackground.onload = function() {
			chart.clearLoading('plotBack');
		}
		plotBackground.src = optionsChart.plotBackgroundImage;
	}
	
	// Initialize the series
	//initSeries();
	each (options.series || [], function(serieOptions) {
		initSeries(serieOptions);
	});
	
	// Mouse tracker must be initiated after series because it depends on inverted
	chart.tracker = tracker = new MouseTracker(chart, options.tooltip);
	
	
	checkResources();
	
};

/**
 * The Point object and prototype. Inheritable and used as base for PiePoint
 */
var Point = function() {};
Point.prototype = {

	/**
	 * Initialize the point
 	 * @param {Object} series The series object containing this point
 	 * @param {Object} options The data in either number, array or object format
	 */
	init: function(series, options) {
		var point = this;
		point.series = series;
		point.applyOptions(options);
		
		return point;
	},
	/**
	 * Apply the options containing the x and y data and possible some extra properties.
	 * This is called on point init or from point.update.
	 * 
	 * @param {Object} options
	 */
	applyOptions: function(options) {
		var point = this,
			series = point.series,
			n;
	
		
		// onedimensional array input
		if (typeof options == 'number' || options === null) {
			//point.x = i;
			point.y = options;	
		}
		
		// object input
		else if (typeof options == 'object' && typeof options.length != 'number') {
			
			// copy options directly to point
			//for (n in options) point[n] = options[n];
			extend(point, options);
			
			point.options = options;
			// set x and y
			//point.x = options.x;
			//point.y = options.y;
		}
		
		// categorized data with name in first position
		else if (typeof options[0] == 'string') {
			point.name = options[0];
			//point.x = i;
			point.y = options[1];
		}
		
		// two-dimentional array
		else if (typeof options[0] ==  'number') {
			point.x = options[0];
			point.y = options[1];
		}
		
		/* 
		 * If no x is set by now, get auto incremented value. All points must have an
		 * x value, however the y value can be null to create a gap in the series
		 */
		if (point.x === undefined) point.x = series.autoIncrement();
	},
	
	/**
	 * Clear memory
	 */
	destroy: function() {
		var point = this;
		
		if (point.stateLayer) point.stateLayer.destroy();
		for (prop in point) point[prop] = null; 
	},
	
	/**
	 * Toggle the selection status of a point
	 * @param {Boolean} selected Whether to select or unselect the point.
	 * @param {Boolean} accumulate Whether to add to the previous selection. By default,
	 * 		this happens if the control key (Cmd on Mac) was pressed during clicking.
	 */
	select: function(selected, accumulate) {
		var point = this,
			series = point.series,
			chart = series.chart,
			stateLayers,
			state,
			singlePointLayer = pick(point.stateLayer, series.singlePointLayer, chart.singlePointLayer);
			
		//point.selected = !point.selected;
		// if called without an argument, toggle
		//series.selected = selected = (selected === undefined) ? !series.selected : selected;
		point.selected = selected = pick(selected, !point.selected);
		
		series.isDirty = true;
		point.firePointEvent(selected ? 'select' : 'unselect');
		
		// remove the hover marker so the user can see the underlying marker changes to selected
		if (singlePointLayer) singlePointLayer.clear();
		
		
		each (chart.series, function (series) {
			stateLayers = series.stateLayers;
			
			// unselect all other points unless Ctrl or Cmd + click
			if (!accumulate) each (series.data, function(loopPoint) {
				if (loopPoint.selected && loopPoint != point) {
					loopPoint.selected = false;
					fireEvent(loopPoint, 'unselect');
					series.isDirty = true;
				}
			});
			
			
			// Just render the series, not the entire chart. Also, don't redraw
			// with new translation and all. 
			if (series.isDirty) {
				for (state in stateLayers) {
					stateLayers[state].clear();
				}
				series.render();
			}
		})
		
	},
	
	/**
	 * Update the point with new options (typically x/y data) and optionally redraw the series.
	 * 
	 * @param {Object} options Point options as defined in the series.data array
	 * @param {Boolean} redraw Whether to redraw the chart or wait for an explicit call
	 * 
	 */
	update: function(options, redraw) {
		var point = this,
			series = point.series;
		redraw = pick(redraw, true);
		
		// fire the event with a default handler of doing the update
		point.firePointEvent('update', { options: options }, function() {

			point.applyOptions(options);
	
			// redraw
			series.isDirty = true;
			if (redraw) series.chart.redraw();
		});
	},
	
	/**
	 * Remove a point and optionally redraw the series and if necessary the axes
	 * @param {Boolean} redraw Whether to redraw the chart or wait for an explicit call
	 */
	remove: function(redraw) {
		var point = this,
			series = point.series,
			chart = series.chart,
			data = series.data;
		
		redraw = pick(redraw, true);
		
		// fire the event with a default handler of removing the point			
		point.firePointEvent('remove', null, function() {

			// loop through the data to locate the point and remove it
			each(data, function(existingPoint, i) {
				if (existingPoint == point) {
					data.splice(i, 1);
				}
			})
			
			// pies have separate point layers and legend items
			if (point.layer) point.layer = point.layer.destroy();
			if (point.legendItem) {
				discardElement(point.legendItem);
				point.legendItem = null;
				chart.isDirty = true;
			}
			
			// redraw
			series.isDirty = true;
			if (redraw) chart.redraw();
		})
			
		
	},
	
	/**
	 * Fire an event on the Point object. Must not be renamed to fireEvent, as this
	 * causes a name clash in MooTools
	 * @param {String} eventType
	 * @param {Object} eventArgs Additional event arguments
	 * @param {Function} defaultFunction Default event handler
	 */
	firePointEvent: function(eventType, eventArgs, defaultFunction) {
		var point = this,
			series = this.series,
			seriesOptions = series.options;
		
		// load event handlers on demand to save time on mouseover/out
		if (seriesOptions.point.events[eventType] || (
				point.options && point.options.events && point.options.events[eventType])) 
			this.importEvents();
			
		// add default handler if in selection mode
		if (eventType == 'click' && seriesOptions.allowPointSelect)
			defaultFunction = function (event) {
				// Control key is for Windows, meta (= Cmd key) for Mac, Shift for Opera
				point.select(null, event.ctrlKey || event.metaKey || event.shiftKey);
			} 
			
		fireEvent(this, eventType, eventArgs, defaultFunction);
	},
	/**
	 * Import events from the series' and point's options. Only do it on 
	 * demand, to save processing time on hovering.
	 */
	importEvents: function() {
		if (!this.hasImportedEvents) {
			var point = this,
				options = merge (point.series.options.point, point.options),
				events = options.events,
				eventType;
				
			point.events = events;
			
			for (eventType in events) {
				addEvent(point, eventType, events[eventType]);
			}
			this.hasImportedEvents = true;
		}
	},
	
	setTooltipText: function() {
		var point = this;
		point.tooltipText = point.series.chart.options.tooltip.formatter.call({
			series: point.series,
			point: point,
			x: point.category, 
			y: point.y,
			percentage: point.percentage,
			total: point.stackTotal
		});
	}	
};

/**
 * The base function which all other series types inherit from
 * @param {Object} chart
 * @param {Object} options
 */
var Series = function() {
	this.isCartesian = true;
	this.type = 'line';
	this.pointClass = Point;
};

Series.prototype = {
	init: function(chart, options) {
		var series = this,
			eventType,
			events,
			pointEvent,
			index = chart.series.length;
			
		series.chart = chart;
		options = series.setOptions(options); // merge with plotOptions
		
		// set some variables
		extend (series, {
			index: index,
			options: options,
			name: options.name || 'Series '+ (index + 1),
			state: '',
			visible: options.visible !== false, // true by default
			selected: options.selected == true // false by default
		});
		
		// register event listeners
		events = options.events;
		for (eventType in events) {
			addEvent(series, eventType, events[eventType]);
		}
		
		series.getColor();
		series.getSymbol();
		
		// get the data and go on when the data is loaded
		series.getData(options);
			
	},
	getData: function(options) {
		var series = this,
			chart = series.chart,
			loadingId = 'series'+ idCounter++;
		
		// Ajax loaded data
		if (!options.data && options.dataURL) {
			chart.addLoading(loadingId);
			getAjax(options.dataURL, function(data) {
				series.dataLoaded(data);
				chart.clearLoading(loadingId);
			});
		} else {
			series.dataLoaded(options.data);
		}
	},
	dataLoaded: function(data) {
		var series = this,
			chart = series.chart,
			options = series.options,
			enabledStates = [''],
			//data = series.data,
			dataParser = options.dataParser,
			stateLayers = {},
			layerGroup,
			point,
			//pointInterval = options.pointInterval || 1,
			x;
		
		// if no dataParser is defined for ajax loaded data, assume JSON and eval the code
		if (options.dataURL && !dataParser) 
			dataParser = function(data){
				return eval(data);
			}
		// dataParser is defined, run parsing
		if (dataParser) data = dataParser.call(series, data);
		
		
		// create the group layer (TODO: move to render?)
		series.layerGroup = layerGroup = new Layer('series-group', chart.plotLayer.div, null, {
			zIndex: 2 // labels are underneath
		});
		
		if (options.states.hover.enabled) enabledStates.push('hover');
		each(enabledStates, function(state) { // create the state layers
			stateLayers[state] = new Layer('state-'+ state, layerGroup.div);
		});
		series.stateLayers = stateLayers;
		
		series.setData(data, false);
	
	},
	
	/**
	 * Return an auto incremented x value based on the pointStart and pointInterval options. 
	 * This is only used if an x value is not given for the point that calls autoIncrement.
	 */
	autoIncrement: function() {
		var series = this,
			options = series.options,
			xIncrement = series.xIncrement;
			
		xIncrement = pick(xIncrement, options.pointStart, 0);
		
		series.pointInterval = pick(series.pointInterval, options.pointInterval, 1);
		
		series.xIncrement = xIncrement + series.pointInterval;
		return xIncrement;
	},
	
	/**
	 * Sort the data and remove duplicates
	 * 
	 * @todo: For reversed x axis, reverse the data once and for all here
	 */
	cleanData: function() {
		var series = this,
			data = series.data,
			i;
			//smallestInterval,
			//closestPoints,
			//interval;
			
		// sort the data points
		data.sort(function(a, b){
			return (a.x - b.x);
		});
		
		// remove points with equal x values
		// record the closest distance for calculation of column widths
		for (i = data.length - 1; i >= 0; i--) {
			if (data[i - 1]) {
				if (data[i - 1].x == data[i].x)	data.splice(i - 1, 1); // remove the duplicate
				
				/*interval = data[i].x - data[i - 1].x
				if (smallestInterval === undefined || interval < smallestInterval) {
					smallestInterval = interval;
					closestPoints = i;	
				}*/
			}
		}
		//series.closestPoints = closestPoints;
	},		
		
	/**
	 * Divide the series data into segments divided by null values. Also sort
	 * the data points and delete duplicate values.
	 */
	getSegments: function() {
		var lastNull = -1,
			segments = [],
			data = this.data;
		
		// create the segments
		each (data, function(point, i) {
			if (point.y === null) {
				if (i > lastNull + 1)
					segments.push(data.slice(lastNull + 1, i));
				lastNull = i;	
			} else if (i == data.length - 1) { // last value
				segments.push(data.slice(lastNull + 1, i + 1));
			}
		});
		
		
		this.segments = segments;
		
		
	},
	
	/**
	 * Set the series options by merging from the options tree
	 * @param {Object} options
	 */
	setOptions: function(options) {
		var plotOptions = this.chart.options.plotOptions,
			options = merge(
				plotOptions[this.type], 
				plotOptions.series,
				options
			),
			normalSeriesMarkerOptions = options.marker,
			hoverSeriesMarkerOptions = options.states.hover.marker;
			
		// default hover values are dynamic based on basic state 
		//var stateOptions = seriesOptions.states[state].marker;
		if (hoverSeriesMarkerOptions.lineWidth === undefined) 
			hoverSeriesMarkerOptions.lineWidth = normalSeriesMarkerOptions.lineWidth + 1;
		if (hoverSeriesMarkerOptions.radius === undefined) 
			hoverSeriesMarkerOptions.radius = normalSeriesMarkerOptions.radius + 1;
		//markerOptions = merge(markerOptions, stateOptions);
		
		return options;
		
	},
	getColor: function(){
		var defaultColors = this.chart.options.colors;
		this.color = this.options.color || defaultColors[colorCounter++] || '#0000ff';
		if (colorCounter >= defaultColors.length) 
			colorCounter = 0;
	},
	getSymbol: function(){
		var defaultSymbols = this.chart.options.symbols,
			symbol = this.options.marker.symbol || 'auto';
		if (symbol == 'auto') symbol = defaultSymbols[symbolCounter++];
		this.symbol = symbol;
		if (symbolCounter >= defaultSymbols.length) 
			symbolCounter = 0;
	},
	
	/**
	 * Add a point dynamically after chart load time
	 * @param {Object} options Point options as given in series.data
	 * @param {Boolean} redraw Whether to redraw the chart or wait for an explicit call
	 * @param {Boolean} shift If shift is true, a point is shifted off the start 
	 * 		of the series as one is appended to the end.
	 */
	addPoint: function(options, redraw, shift) {
		var series = this,
			data = series.data,
			point = (new series.pointClass).init(series, options);
			
		redraw = pick(redraw, true);
			
		data.push(point);
		if (shift) data.shift();
		
		
		// redraw
		series.isDirty = true;
		if (redraw) series.chart.redraw();
	},
	
	/**
	 * Replace the series data with a new set of data
	 * @param {Object} data
	 * @param {Object} redraw
	 */
	setData: function(data, redraw) {
		var series = this;
		
		// data.push(point);
		// if (shift) data.shift();
		
		// generate the point objects
		//x = options.pointStart || 0;
		series.xIncrement = null; // reset for new data
		data = map(splat(data), function(pointOptions) {
			return (new series.pointClass).init(series, pointOptions);
			//return new PiePoint(series, pointOptions);
			//x += pointInterval;
			//return point;
		});
		
		// set the data
		series.data = data;
	
		series.cleanData();	
		series.getSegments();
		
		// redraw
		series.isDirty = true;
		if (pick(redraw, true)) series.chart.redraw();
	},
	
	
	/**
	 * Remove a series and optionally redraw the chart
	 * 
	 * @param {Boolean} redraw Whether to redraw the chart or wait for an explicit call
	 */
	
	remove: function(redraw) {
		var series = this,
			chart = series.chart;
			
		redraw = pick(redraw, true);
		
		if (!series.isRemoving) {  /* prevent triggering native event in jQuery
				(calling the remove function from the remove event) */ 
			series.isRemoving = true;

			// fire the event with a default handler of removing the point			
			fireEvent(series, 'remove', null, function() {
				
				// remove the layer group
				discardElement(series.layerGroup.div);
				
				// remove the area
				each (series.areas, function(area) {
					discardElement(area);
				});
						
				// remove legend item
				discardElement(series.legendItem);
				series.legendItem = null;
				
				
				// loop through the chart series to locate the series and remove it
				each(chart.series, function(existingSeries, i) {
					if (existingSeries == series) {
						chart.series.splice(i, 1);
					}
				})
				
				// redraw
				chart.isDirty = true;
				if (redraw) chart.redraw();
			})
			
		} 
		series.isRemoving = false
	},
	
	/**
	 * Translate data points from raw values 0 and 1 to x and y.
	 */
	translate: function() {
		var chart = this.chart, 
			series = this, 
			stacking = series.options.stacking,
			categories = series.xAxis.categories,
			yAxis = series.yAxis,
			stack = yAxis.stacks[series.type];
			
		// do the translation
		each(this.data, function(point) {
			var xValue = point.x, 
				yValue = point.y, 
				yBottom, 
				pointStack,
				pointStackTotal;
			point.plotX = series.xAxis.translate(point.x);
			
			// calculate the bottom y value for stacked series
			if (stacking && series.visible && stack[xValue]) {
				pointStack = stack[xValue];
				pointStackTotal = pointStack.total;
				pointStack.cum = yBottom = pointStack.cum - yValue; // start from top
				yValue = yBottom + yValue;
				
				if (stacking == 'percent') {
					yBottom = pointStackTotal ? yBottom * 100 / pointStackTotal : 0;
					yValue = pointStackTotal ? yValue * 100 / pointStackTotal : 0;
				}
				point.percentage = pointStackTotal ? point.y * 100 / pointStackTotal : 0;
				point.stackTotal = pointStackTotal;
				point.yBottom = yAxis.translate(yBottom, 0, 1);
			}
			
			// set the y value
			if (yValue !== null) 
				point.plotY = yAxis.translate(yValue, 0, 1);
			
			// set client related positions for mouse tracking
			point.clientX = chart.inverted ? 
				chart.plotHeight - point.plotX + chart.plotTop : 
				point.plotX + chart.plotLeft; // for mouse tracking
				
			// some API data
			point.category = categories && categories[point.x] !== undefined ? 
				categories[point.x] : point.x;
				
				
		});
	},
	/**
	 * Memoize tooltip texts and positions
	 */
	setTooltipPoints: function (renew) {
		var series = this,
			chart = series.chart,
			inverted = chart.inverted,
			//concatenated = [],
			data = [],
			plotSize = inverted ? chart.plotHeight : chart.plotWidth,
			low,
			high,
			tooltipPoints = []; // a lookup array for each pixel in the x dimension
			
		// renew
		if (renew) series.tooltipPoints = null;
			
		// concat segments to overcome null values
		each (series.segments, function(segment){
			data = data.concat(segment);
		});
		
		// loop the concatenated data and apply each point to all the closest
		// pixel positions
		if (series.xAxis.reversed) data = data.reverse();//reverseArray(data);
		each (data, function(point, i) {
			
			
			if (!series.tooltipPoints) // only create the text the first time, not on zoom
				point.setTooltipText();
			
			low = data[i - 1] ? data [i - 1].high + 1 : 0;
			high = point.high = data[i + 1] ? (
				mathFloor((point.plotX + (data[i + 1] ? 
					data[i + 1].plotX : plotSize)) / 2)) :
					plotSize;
			
			while (low <= high) {
				tooltipPoints[inverted ? plotSize - low++ : low++] = point;
			}
		});
		series.tooltipPoints = tooltipPoints;
	},
	
	
	/**
	 * Draw the actual graph
	 */
	drawLine: function(state) {
		var i, 
			j, 
			series = this, 
			options = series.options, 
			chart = series.chart, 
			doAnimation = options.animation && series.animate,
			layer = series.stateLayers[state], 
			data = series.data, 
			color = options.lineColor || series.color, 
			fillColor = options.fillColor == 'auto' ? 
				Color(series.color).setOpacity(options.fillOpacity || 0.75).get() : 
				options.fillColor, 
			inverted = chart.inverted, 
			y0 = (inverted ? 0 : chart.plotHeight) - series.yAxis.translate(0);
		
		// get state options
		if (state) 
			options = merge(options, options.states[state]);
			
		
		// initiate the animation
		if (doAnimation) series.animate(true);
		
		// divide into segments
		each(series.segments, function(segment){
			var line = [], 
				area = [];
			
			// get the points
			each(segment, function(point, i) {
				if (i && options.step) {
					var lastPoint = segment[i - 1];
					line.push (
						inverted ? chart.plotWidth - lastPoint.plotY : point.plotX, 
						inverted ? chart.plotHeight - point.plotX : lastPoint.plotY						
					);
				}

				line.push(
					inverted ? chart.plotWidth - point.plotY : point.plotX, 
					inverted ? chart.plotHeight - point.plotX : point.plotY
				);
			});
			
			// draw the area
			if (/area/.test(series.type)) {
				for (i = 0; i < line.length; i++) 
					area.push(line[i]);
				if (options.stacking && series.type != 'areaspline') {
					// follow stack back. Todo: implement areaspline
					for (i = segment.length - 1; i >= 0; i--) 
						area.push(segment[i].plotX, segment[i].yBottom);
					
				
				} else { // follow zero line back
					area.push(
						inverted ? y0 : segment[segment.length - 1].plotX, 
						inverted ? chart.plotHeight - segment[segment.length - 1].plotX : y0, 
						inverted ? y0 : segment[0].plotX, 
						inverted ? chart.plotHeight - segment[0].plotX : y0
					);
				}
				layer.drawPolyLine(area, null, null, options.shadow, fillColor);
			}
			// draw the line
			if (options.lineWidth) layer.drawPolyLine(line, color, options.lineWidth, options.shadow);
		});
		
		// experimental animation
		if (doAnimation) series.animate();
		
	},
	/**
	 * Experimental animation
	 */
	animate: function(init) {
		var series = this,
			chart = series.chart,
			inverted = chart.inverted,
			div = series.layerGroup.div;
		
		if (series.visible) {
			if (init) { // initialize the animation
				setStyles (
					div, 
					extend(
						{ overflow: HIDDEN }, 
						inverted ? { height: 0 } : { width: 0 }
					)
				);
			} else { // run the animation
				animate(
					div, 
					inverted ? { height: chart.plotHeight + PX } : { width: chart.plotWidth + PX }, 
					{ duration: 1000 }
				);
		
				// delete this function to allow it only once
				this.animate = null;
			}
		}
	},
	
	/**
	 * Draw the markers
	 */
	drawPoints: function(state){
		var series = this, i,  //state = series.state,
		layer = series.stateLayers[state], 
			seriesOptions = series.options, 
			markerOptions = seriesOptions.marker, 
			data = series.data, 
			chart = series.chart, 
			inverted = chart.inverted;
		
		/*if (state) {
			// default hover values are dynamic based on basic state 
			var stateOptions = seriesOptions.states[state].marker;
			if (stateOptions.lineWidth === undefined) 
				stateOptions.lineWidth = markerOptions.lineWidth + 1;
			if (stateOptions.radius === undefined) 
				stateOptions.radius = markerOptions.radius + 1;
			markerOptions = merge(markerOptions, stateOptions);
		}*/
		
		if (markerOptions.enabled) {
			each(data, function(point){
				if (point.plotY !== undefined) 
					series.drawMarker(
						layer, 
						inverted ? chart.plotWidth - point.plotY : point.plotX, 
						inverted ? chart.plotHeight - point.plotX : point.plotY, 
						merge(markerOptions, point.marker)
					);
				
				// draw the selected mode marker on top of the default one
				if (point.selected)	series.drawPointState(point, 'select', layer);
				
			});
		}
	},
	/**
	 * Some config objects, like marker, have a state value that depends on the base value
	 * @param {Object} props
	 */
	/*getDynamicStateValues: function(base, state, props) {
	 each (props, function(value, key) {
	 if (state[key] === undefined) state[key] = base[key] + value;
	 });
	 return state;
	 },*/
	/**
	 * Draw a single marker into a given layer and position
	 */
	drawMarker: function(layer, x, y, options) {
		if (options.lineColor == 'auto') 
			options.lineColor = this.color;
		if (options.fillColor == 'auto') 
			options.fillColor = this.color;
		if (options.symbol == 'auto') 
			options.symbol = this.symbol;
		layer.drawSymbol(
			options.symbol, 
			x, 
			y, 
			options.radius, 
			options.lineWidth, 
			options.lineColor, 
			options.fillColor
		);
	},
	
	/**
	 * Draw the data labels
	 */
	drawDataLabels: function() {
		if (this.options.dataLabels.enabled) {
			var series = this, 
				i, 
				x, 
				y, 
				data = series.data, 
				options = series.options.dataLabels, 
				color, 
				str, 
				dataLabelsLayer = series.dataLabelsLayer, 
				chart = series.chart, 
				inverted = chart.inverted,
				seriesType = series.type,
				isPie = (seriesType == 'pie'), 
				align;
				
			// create a separate layer for the data labels
			if (dataLabelsLayer) {
				dataLabelsLayer.clear();
			} else {
				series.dataLabelsLayer = dataLabelsLayer = new Layer('data-labels', 
					series.layerGroup.div, 
					null, {
						zIndex: 1
					});
			}
				
			// determine the color
			options.style.color = options.color == 'auto' ? series.color : options.color;
			
			// make the labels for each point
			each(data, function(point){
				var plotX = point.plotX,
					plotY = point.plotY,
					tooltipPos = point.tooltipPos;
					
				str = options.formatter.call({
					x: point.x,
					y: point.y,
					series: series,
					point: point
				});
				x = (inverted ? chart.plotWidth - plotY : plotX) + options.x;
				y = (inverted ? chart.plotHeight - plotX : plotY) + options.y;
				
				// special case for pies
				if (tooltipPos) {
					x = tooltipPos[0] + options.x;
					y = tooltipPos[1] + options.y;
				}
				// special for pies
				if (isPie) {
					if (!point.dataLabelsLayer) point.dataLabelsLayer =  
						new Layer('data-labels', point.layer.div, null, { zIndex: 3} );
					dataLabelsLayer = point.dataLabelsLayer;
				}
				
				// in columns, align the string to the column
				align = options.align;
				if (seriesType == 'column') 
					x += {
						center: point.w / 2,
						right: point.w
					}[align] || 0;
					
				
				if (str) dataLabelsLayer[isPie ? 'drawText' : 'addText'](
					str, 
					x, 
					y, 
					options.style, 
					options.rotation, 
					align
				);
					
			});
			if (!isPie) dataLabelsLayer.strokeText();
			
			// only draw once - todo: different labels in different states and single point label?
			//series.hasDrawnDataLabels = true;
		}
	},
	
	/**
	 * Draw a single point in a specific state
	 */
	drawPointState: function(point, state, layer){
		var chart = this.chart, 
			inverted = chart.inverted,
			isHoverState = state == 'hover',
			layer = layer || chart.singlePointLayer,
			options = this.options,
			stateOptions;
		
		// a specific layer for the currently active point
		if (isHoverState) {
			if (!layer) layer = chart.singlePointLayer = new Layer(
				'single-point', 
				chart.plotLayer.div, 
				null, 
				{ zIndex: 3 }
			);
			layer.clear();
		}
		
		if (state) {
			// merge series hover marker and marker hover marker
			var seriesStateOptions = options.states[state].marker, 
				pointStateOptions = options.marker.states[state];
			
			// the default for hover points is two more than normal radius
			if (isHoverState && pointStateOptions.radius === undefined) 
				pointStateOptions.radius = seriesStateOptions.radius + 2;
				
			// merge all options
			stateOptions = merge(
				options.marker, 
				point.marker, 
				seriesStateOptions, 
				pointStateOptions
			);
			
			// draw the marker
			if (stateOptions && stateOptions.enabled) 
				this.drawMarker(
					layer, 
					inverted ? chart.plotWidth - point.plotY : point.plotX, 
					inverted ? chart.plotHeight - point.plotX : point.plotY, 
					stateOptions
				);
		}
	},
	
	/**
	 * Clear DOM objects and free up memory
	 */
	destroy: function() {
		var series = this,
			prop;
		
		each (series.data, function(point) {
			point.destroy();
		});
		
		for (prop in series) series[prop] = null; 
	},
	
	/**
	 * Render the graph and markers
	 */
	render: function() {
		var series = this,
			state, 
			stateLayers = series.stateLayers;
			
		series.drawDataLabels();
		if (series.visible) for (state in stateLayers) {
			series.drawLine(state);
			series.drawPoints(state);			
		}
		else series.setVisible(false, false);
		
		// initially hide other states than normal
		if (!series.hasRendered && stateLayers.hover) {
			stateLayers.hover.hide();
			hasRendered = true;
		}
		
		series.isDirty = false; // means data is in accordance with what you see
		
	},
	
	/**
	 * Redraw the series after an update in the axes.
	 */
	redraw: function() {
		var series = this;
		
		series.translate();
		series.setTooltipPoints(true);
		/*if (series.chart.options.tooltip.enabled) */series.createArea();
		series.clear();
		
		series.render();
	},
	
	
	/**
	 * Clear all graphics and HTML from the series layer group
	 */
	clear: function(){
		var stateLayers = this.stateLayers;
		for (var state in stateLayers) {
			stateLayers[state].clear();
			stateLayers[state].cleared = true;
		}
		if (this.dataLabelsLayer) {
			this.dataLabelsLayer.clear();
			this.hasDrawnDataLabels = false;
		}
	},
	
	/**
	 * Set the state of the graph and redraw
	 */
	setState: function(state) {
		state = state || '';
		if (this.state != state) {
			
			var series = this, 
				stateLayers = series.stateLayers, 
				newStateLayer = stateLayers[state],
				oldStateLayer = stateLayers[series.state],
				singlePointLayer = series.singlePointLayer || series.chart.singlePointLayer;
			
			series.state = state;
			
			if (newStateLayer) { // if not, hover state is disabled
				
				if (state) 
					newStateLayer.show();
				else {
					if (oldStateLayer) oldStateLayer.hide();
					if (singlePointLayer) singlePointLayer.clear();
				}
			}
		}
	},
	
	/**
	 * Set the visibility of the graph
	 * 
	 * @param vis {Boolean} True to show the series, false to hide. If undefined,
	 *        the visibility is toggled.
	 */
	setVisible: function(vis, redraw) {
		var series = this,
			chart = series.chart,
			//imagemap = chart.imagemap,
			layerGroup = series.layerGroup,
			legendItem = series.legendItem,
			areas = series.areas,
			oldVisibility = series.visible;
		
		// if called without an argument, toggle visibility
		series.visible = vis = vis === undefined ? !oldVisibility : vis;
		
		if (vis) {
			series.isDirty = true; // when series is initially hidden
			
			layerGroup.show();
		} else { 
			layerGroup.hide();
		}
			
		if (legendItem) { 
			legendItem.className = vis ? '' : HIGHCHARTS_HIDDEN;
			chart.legend.drawGraphics(true);
		}
			
		// hide or show areas
		if (areas) each (areas, function(area) {
			if (vis)
				//imagemap.insertBefore(area, imagemap.childNodes[1]);
				chart.tracker.insertAtFront(area); 
			else
				discardElement(area);
		});
		
		// rescale
		if (chart.options.chart.ignoreHiddenSeries) {
			
			// in a stack, all other series are affected
			if (series.options.stacking) each (chart.series, function(otherSeries) {
				if (otherSeries.options.stacking && otherSeries.visible) 
					otherSeries.isDirty = true;
			}); 
			
		}
		if (redraw !== false) chart.redraw();
		
		fireEvent(series, vis ? 'show' : 'hide');
	},
	
	/**
	 * Show the graph
	 */
	show: function() {
		this.setVisible(true);
	},
	
	/**
	 * Hide the graph
	 */
	hide: function() {
		this.setVisible(false);
	},
	
	
	/**
	 * Set the selected state of the graph
	 * 
	 * @param selected {Boolean} True to select the series, false to unselect. If
	 *        undefined, the selection state is toggled.
	 */
	select: function(selected) {
		var series = this;
		// if called without an argument, toggle
		series.selected = selected = (selected === undefined) ? !series.selected : selected;

		if (series.checkbox) series.checkbox.checked = selected;
		
		fireEvent(series, selected ? 'select' : 'unselect');
	},
	
	/**
	 * Calculate the mouseover area coordinates for a given data series
	 */
	getAreaCoords: function(){
	
		var data = this.data, 
			series = this, 
			datas = [], 
			chart = this.chart, 
			inverted = chart.inverted, 
			plotWidth = chart.plotWidth, 
			plotHeight = chart.plotHeight, 
			reversedXAxis = series.xAxis.reversed,
			reversedData,
			snap = chart.options.tooltip.snap,
			dataIsReverse,
			i = 0, 
			ret = [];
		
		each(series.splinedata || series.segments, function(data, i) {
			//if (reversedXAxis) data.reverse();//reverseArray(data);
			
			// Reverse the data in case of a reversed x axis. Spline data
			// is already reversed at this point, so we need to actually
			// inspect the data x values.
			reversedData = data.length > 1 && data[0].x > data[1].x;
			if (reversedData && !reversedXAxis || reversedXAxis && !reversedData) {
				data = data.reverse();
			}
			
			var coords = [], outlineTop = [], outlineBottom = [];
			each([outlineTop, outlineBottom], function(outline){
				var last = 0, i = 0, extreme, slice, 
					peaks = [data[0]], // add the first point at init
 					sign = outline == outlineTop ? 1 : -1, 
					intersects, 
					num, 
					x, y, lastX, lastY, x1, y1, x2, y2, dX, dY, pX, pY, l, factor, p1, p2, mA, mB, iX, iY, area;
				
				// pull out the highest and lowest peaks in slices of {snap} width,
				// push these peaks into the peaks array.
				while (data[i]) {
					if (data[i].plotX > data[last].plotX + snap || i == data.length - 1) {
						extreme = data[i];
						slice = data.slice(last, i - 1);
						each(slice, function(point) {
							if (sign * point.plotY < sign * extreme.plotY) {
								extreme = point;
							}
						});
						// push it only if we have moved on along the x axis
						if (mathRound(data[last].plotX) < mathRound(extreme.plotX) ||
								data[i].plotX > data[last].plotX + snap) {
							peaks.push(extreme);
						}
						
						last = i;
					}
					i++;
				}
				
				// push the last point
				if (peaks[peaks.length - 1] != data[data.length-1])
					peaks.push(data[data.length - 1]);
					
				
				
				// loop through the peaks and calculate rectangles {snap} pixels
				// away from the peaks.
				//peaks = data;
				for (i = 0; i < peaks.length; i++) {
				
					// clickable area
					if (i > 0) {
						// vector from last point to this
						x = peaks[i].plotX;
						y = peaks[i].plotY;
						lastX = peaks[i - 1].plotX;
						lastY = peaks[i - 1].plotY;
						
						
						dX = x - peaks[i - 1].plotX;
						dY = y - peaks[i - 1].plotY;
						
						
						
						// perpendicular vector
						pX = dY;
						pY = -dX;
						
						// length of the perpendicular vector
						l = math.sqrt(math.pow(pX, 2) + math.pow(pY, 2));
						
						
						// extend the line by {snap} pixels
						if (i == 1) {
							lastX -= (snap / l) * dX;
							lastY -= (snap / l) * dY;
						
						} else if (i == peaks.length - 1) {
							x += (snap / l) * dX;
							y += (snap / l) * dY;
						}
						
						// factors compared to snap
						factor = sign * snap / l;
						
						// incremental calculation of the top and bottom line
						
						// the new upper parallel vector
						x1 = mathRound(lastX + factor * pX);
						y1 = mathRound(lastY + factor * pY);
						x2 = mathRound(x + factor * pX);
						y2 = mathRound(y + factor * pY);
						
						// loop back until this line intersects a previous line
						if (outline[outline.length - 1] && outline[outline.length - 1][0] > x1) {
							intersects = false;
							while (!intersects) {
								p2 = outline.pop();
								p1 = outline[outline.length - 1];
								if (!p1) 
									break;
								// get intersection point
								// http://www.ultrashock.com/forums/showthread.php?t=81785
								mA = (y1 - y2) / (x1 - x2);
								mB = (p1[1] - p2[1]) / (p1[0] - p2[0]);
								
								iX = ((-mB * p1[0]) + p1[1] + (mA * x1) - y1) / (mA - mB);
								iY = (mA * (iX - x1)) + y1;
								
								if (iX > p1[0]) {
									outline.push([mathRound(iX), mathRound(iY), 1]);
									intersects = true;
								}
								
							}
						}
						else {
							if (!isNaN(x1)) 
								outline.push([x1, y1]);
						}
						if (outline[outline.length - 1] && outline[outline.length - 1][0] < x2) 
							outline.push([x2, y2]);
					}
				}
				
				
				
			});
			
			// area for detecting moveover
			for (i = 0; i < outlineTop.length; i++) { // top of the area
				coords.push(
					inverted ? plotWidth - outlineTop[i][1] : outlineTop[i][0], 
					inverted ? plotHeight - outlineTop[i][0] : outlineTop[i][1]
				);
				
			}
			for (i = outlineBottom.length - 1; i >= 0; i--) { // bottom of the area
				coords.push(
					inverted ? plotWidth - outlineBottom[i][1] : outlineBottom[i][0], 
					inverted ? plotHeight - outlineBottom[i][0] : outlineBottom[i][1]
				);
			}
			
			// single point: make circle
			if (!coords.length) {
				coords.push(mathRound(data[0].plotX), mathRound(data[0].plotY));
			}
			
			// visualize
			//series.stateLayers[''].drawPolyLine(coords, '#afaf00', 1);
			
			if (coords.length) ret.push([coords.join(',')]);
			
			// undo reverse
			//if (reversedXAxis) data.reverse();
		});
		
		return ret;
	},
	
	createArea: function() {
		if (this.options.enableMouseTracking === false) return;
		
		var area, 
			series = this,
			options = series.options,
			chart = series.chart,
			inverted = chart.inverted,
			tracker = chart.tracker,
			//cursor = series.options.cursor,
			coordsArray = series.getAreaCoords(), 
			firstArea, 
			seriesAreas = [],
			existingAreas = series.areas, 
			isCircle;
			
			
		// remove old areas in case of updating
		if (existingAreas) each (existingAreas, function(area) {
			discardElement(area);
		})
			
		// create each area
		each(coordsArray, function(coords) {
			isCircle = /^[0-9]+,[0-9]+$/.test(coords[0]);
			area = createElement('area', {
				shape: isCircle ? 'circle' : 'poly',
				chart: chart,
				coords: coords[0] + (isCircle ? ','+ chart.options.tooltip.snap : ''),
				onmouseover: function(e) {
					if (!series.visible || chart.mouseIsDown) return;
					
					var hoverSeries = chart.hoverSeries;
					
					// for column/scatterplots, register that we entered a new column
					// coords[1] contains the reference to a point - if
					// no such reference is given, the area refers to 
					// a series
					chart.hoverPoint = coords[1];
					
					// trigger the event, but to save processing time, 
					// only if defined
					if (options.events.mouseOver) { 
						fireEvent(series, 'mouseOver', {
							point:  chart.hoverPoint
						});
					}
					
					// set normal state to previous series
					if (hoverSeries && hoverSeries != series) 
						hoverSeries.setState();
					
					// bring to front	
					if (!/(column|bar|pie)/.test(series.type)) {
						//imagemap.insertBefore(this, imagemap.childNodes[1]);
						tracker.insertAtFront(area);
					}
					
					// hover this
					series.setState('hover');
					chart.hoverSeries = series;
				},
				onmouseout: function() {
					// trigger the event only if listeners exist
					var hoverSeries = chart.hoverSeries;
					if (hoverSeries && options.events.mouseOut) { 
						fireEvent(hoverSeries, 'mouseOut');
					}
				}
			});
			
			// add a href to make the cursor appear - simply adding
			// the style is not enough for IE.
			if (options.cursor == 'pointer') {
				area.href = 'javascript:;';
				
				/*if (options.allowDrag) {
					setStyles(area, { cursor: {
						'x': inverted ? 'ns-resize' : 'ew-resize',
						'xy': 'move',
						'y': inverted ? 'ew-resize' : 'ns-resize'
					}[options.dragType] });
				}*/
			}
		
			
			// insert latest on top
			tracker.insertAtFront(area);
			seriesAreas.push(area);
		});
		series.areas = seriesAreas;
		
	}
	
}; // end Series prototype


/**
 * LineSeries object
 */
var LineSeries = extendClass(Series);
seriesTypes.line = LineSeries;
	

/**
 * AreaSeries object
 */
var AreaSeries = extendClass(Series, {
	type: 'area'
});
seriesTypes.area = AreaSeries;
		

/**
 * SplineSeries object
 */
var SplineSeries = extendClass( Series, {
	type: 'spline',
	/**
	 * Translate the points and get the spline data
	 */
	translate: function() {
		var series = this;
		
		// do the partent translate
		Series.prototype.translate.apply(series, arguments);
		
		// get the spline data
		series.splinedata = series.getSplineData();
		
	},
	/**
	 * Draw the actual spline line with interpolated values
	 * @param {Object} state
	 */
	drawLine: function(state) {
		var series = this,
			realSegments = series.segments; 
		
		// temporarily set the segments to reflect the spline
		series.segments = series.splinedata;// || series.getSplineData();
		
		// draw the line
		Series.prototype.drawLine.apply(series, arguments);
		
		// reset the segments
		series.segments = realSegments;	
	},
	/**
	 * Get interpolated spline values
	 */
	getSplineData: function() {
		var series = this, 
			chart = series.chart,
			//data = this.data,
			splinedata = [],
			num;
			
		each (series.segments, function(data) {
			if (series.xAxis.reversed) data = data.reverse();//reverseArray(data);
			var croppedData = [],
				nextUp,
				nextDown;
			
			// to save calculations, only add data within the plot
			each (data, function(point, i) {
				nextUp = data[i+2] || data[i+1] || point;
				nextDown = data[i-2] || data[i-1] || point;
				if (nextUp.plotX > 0 && nextDown.plotY < chart.plotWidth) {
					croppedData.push(point);
				}
			});
			
				
			// 3px intervals:
			if (croppedData.length > 1) {
				num = mathRound(mathMax(chart.plotWidth, 
					croppedData[croppedData.length-1].clientX	- croppedData[0].clientX) / 3);
			}
			splinedata.push (
				data.length > 1 ? // if the data.length is one, it's a single point so we can't spline it
					num ? (new SplineHelper(croppedData)).get(num) : [] :
					data
			);
		});
		series.splinedata = splinedata;
		return splinedata;
	}
});
seriesTypes.spline = SplineSeries;
		

/**
 * Calculate the spine interpolation.
 * 
 * @todo: Implement true Bezier curves like shown at http://www.math.ucla.edu/~baker/java/hoefer/Spline.htm
 */
function SplineHelper (data) {
	var xdata = [];
	var ydata = [];
	for (var i = 0; i < data.length; i++) {
		xdata[i] = data[i].plotX;
		ydata[i] = data[i].plotY;
	}
	this.xdata = xdata;
	this.ydata = ydata;
	var delta = [];
	this.y2 = [];

	var n = ydata.length;
	this.n = n;

	// Natural spline 2:derivate == 0 at endpoints
	this.y2[0]    = 0.0;
	this.y2[n-1] = 0.0;
	delta[0] = 0.0;

	// Calculate 2:nd derivate
	for(var i=1; i < n-1; i++) {
	    var d = (xdata[i+1]-xdata[i-1]);
	    /*if( d == 0  ) {
			error: ('Invalid input data for spline. Two or more consecutive input X-values are equal. Each input X-value must differ since from a mathematical point of view it must be a one-to-one mapping, i.e. each X-value must correspond to exactly one Y-value.');
	    }*/
	    var s = (xdata[i]-xdata[i-1])/d;
	    var p = s*this.y2[i-1]+2.0;
	    this.y2[i] = (s-1.0)/p;
	    delta[i] = (ydata[i+1]-ydata[i])/(xdata[i+1]-xdata[i]) -
		         (ydata[i]-ydata[i-1])/(xdata[i]-xdata[i-1]);
	    delta[i] = (6.0*delta[i]/(xdata[i+1]-xdata[i-1])-s*delta[i-1])/p;
	}

	// Backward substitution
	for(var j=n-2; j >= 0; j-- ) {
	    this.y2[j] = this.y2[j]*this.y2[j+1] + delta[j];
	}
};
SplineHelper.prototype = {
// Return the two new data vectors
get: function(num) {
	if (!num) num = 50;
	var n = this.n ;
	var step = (this.xdata[n-1]-this.xdata[0]) / (num-1);
	var xnew=[];
	var ynew=[];
	xnew[0] = this.xdata[0];
	ynew[0] = this.ydata[0];
	var data = [{ plotX: xnew[0], plotY: ynew[0] }];//[[xnew[0], ynew[0]]];

	for(var j = 1; j < num; j++ ) {
	    xnew[j] = xnew[0]+j*step;
	    ynew[j] = this.interpolate(xnew[j]);
	    data[j] = { plotX: xnew[j], plotY: ynew[j] };//[xnew[j], ynew[j]];
	}

	return data;
},

// Return a single interpolated Y-value from an x value
interpolate: function(xpoint) {
	var max = this.n-1;
	var min = 0;

	// Binary search to find interval
	while( max-min > 1 ) {
	    var k = (max+min) / 2;
		if( this.xdata[mathFloor(k)] > xpoint )
			max=k;
	    else
			min=k;
	}
	var intMax = mathFloor(max), intMin = mathFloor(min);

	// Each interval is interpolated by a 3:degree polynom function
	var h = this.xdata[intMax]-this.xdata[intMin];
	/*if( h == 0  ) {
	    error: ('Invalid input data for spline. Two or more consecutive input X-values are equal. Each input X-value must differ since from a mathematical point of view it must be a one-to-one mapping, i.e. each X-value must correspond to exactly one Y-value.');
	}*/


	var a = (this.xdata[intMax]-xpoint)/h;
	var b = (xpoint-this.xdata[intMin])/h;
	return a*this.ydata[intMin]+b*this.ydata[intMax]+
	     ((a*a*a-a)*this.y2[intMin]+(b*b*b-b)*this.y2[intMax])*(h*h)/6.0;
}

};


/**
 * AreaSplineSeries object
 */
var AreaSplineSeries = extendClass(SplineSeries, {
	type: 'areaspline'
});
seriesTypes.areaspline = AreaSplineSeries
		

/**
 * ColumnSeries object
 */
var ColumnSeries = extendClass(Series, {
	type: 'column',
	
	init: function() {
		Series.prototype.init.apply(this, arguments);
		
		var series = this,
			chart = series.chart;
		
		
		// record number of column series to calculate column width
		//if (!series.options.stacking) series.countColumn = true;
		
		// if the series is added dynamically, force redraw of other
		// series affected by a new column
		if (chart.hasRendered) each (chart.series, function(otherSeries) {
			if (otherSeries.type == series.type) otherSeries.isDirty = true;
		});
	},
	
	translate: function() {
		var series = this,
			chart = series.chart,
			columnCount = 0,
			stackedIndex; // the index of the first column in a stack
		
		Series.prototype.translate.apply(series);
		
		// Get the total number of column type series.
		// This is called on every series. Consider moving this logic to a 
		// chart.orderStacks() function and call it on init, addSeries and removeSeries
		each (chart.series, function(otherSeries) {
			if (otherSeries.type == series.type) {
				if (!otherSeries.options.stacking) {
					otherSeries.columnIndex = columnCount++;
				} else {
					if (!defined(stackedIndex)) stackedIndex = columnCount++;
					otherSeries.columnIndex = stackedIndex;
				}
			}
		});
		
		// calculate the width and position of each column based on 
		// the number of column series in the plot, the groupPadding
		// and the pointPadding options
		var options = series.options,
			data = series.data,
			inverted = chart.inverted,
			plotWidth = chart.plotWidth,
			plotHeight = chart.plotHeight,
			closestPoints = series.closestPoints,
			categoryWidth = mathAbs(
				data[1] ? data[closestPoints].plotX - data[closestPoints - 1].plotX : 
				(inverted ? plotHeight : plotWidth)
			),
			groupPadding = categoryWidth * options.groupPadding,
			groupWidth = categoryWidth - 2 * groupPadding,
			pointOffsetWidth = groupWidth / columnCount,
			optionPointWidth = options.pointWidth,
			pointPadding = defined(optionPointWidth) ? (pointOffsetWidth - optionPointWidth) / 2 : 
				pointOffsetWidth * options.pointPadding,
			pointWidth = pick(optionPointWidth, pointOffsetWidth - 2 * pointPadding),
			columnIndex = (chart.options.xAxis.reversed ? columnCount - 
				series.columnIndex : series.columnIndex) || 0,
			pointX = -(categoryWidth / 2) + groupPadding + columnIndex *
				pointOffsetWidth + pointPadding,
			//pointY0 = plotWidth - chart.xAxis.translate(0),
			translatedY0 = series.yAxis.translate(0);
			
		// record the new values
		each (data, function(point) {
			point.plotX += pointX;
			point.w = pointWidth;
			point.y0 = (inverted ? plotWidth : plotHeight) - translatedY0;
			point.h = (point.yBottom || point.y0) - point.plotY;
		});
		
		
	},
	
	drawLine: function() {
	},
	
	getSymbol: function(){
	},
	
	drawPoints: function(state) {
		var series = this,
			options = series.options,
			chart = series.chart,
			doAnimation = options.animation && series.animate,
			plot = chart.plot,
			inverted = chart.inverted,
			data = series.data,
			layer = series.stateLayers[state];
			
		// make ready for animation
		if (doAnimation) this.animate(true);
	    
		// draw the columns
		// todo: record the rectangle coordinates and reuse them for the mouseover area
		each (data, function(point) {
			if (point.plotY !== undefined) layer.drawRect(
				inverted ? 
					(point.h >= 0 ? chart.plotWidth - point.plotY - point.h : chart.plotWidth - point.plotY) :				
					point.plotX,
				inverted ? chart.plotHeight - point.plotX - point.w : 
					(point.h >= 0 ? point.plotY : point.plotY + point.h), // for negative bars, subtract h (Opera) 
				inverted ? mathAbs(point.h) : point.w, 
				inverted ? point.w : mathAbs(point.h),
				options.borderColor, 
				options.borderWidth, 
				options.borderRadius, 
				point.color || series.color,
				options.shadow
			);
			
			// draw the selected mode marker on top of the default one
			if (point.selected)	series.drawPointState(point, 'select', layer);
		});
		if (doAnimation) series.animate();
	},
	

	/**
	 * Draw a single point in hover state
	 */
	drawPointState: function(point, state, layer) {
		// local vars
		var series = this,
			chart = series.chart,
			seriesOptions = series.options,
			pointOptions = point ? point.options : null,	
			plot = chart.plot,
			inverted = chart.inverted,
			//singlePointLayer = series.singlePointLayer;
			layer = layer || series.singlePointLayer; 
			
		// use one layer each series as opposed to the chartwide singlePointLayer for line-type series.
		/*if (!singlePointLayer) singlePointLayer = series.singlePointLayer = new Layer(
				'single-point-layer', 
				series.layerGroup.div
			);
		singlePointLayer.clear();*/
				
		// a specific layer for the currently active point
		if (state == 'hover') {
			if (!layer) layer = series.singlePointLayer = new Layer(
				'single-point',  
				series.layerGroup.div
			);
			layer.clear();
		}
		
		// draw the column
		if (state && this.options.states[state]) {
			var options = merge(
				seriesOptions, 
				seriesOptions.states[state],
				pointOptions
			);
			layer.drawRect(
				inverted ? chart.plotWidth - point.plotY - point.h : point.plotX, 
				inverted ? chart.plotHeight - point.plotX - point.w : point.plotY, 
				inverted ? point.h : point.w, 
				inverted ? point.w : point.h, 
				options.borderColor, 
				options.borderWidth, 
				options.borderRadius, 
				Color(options.color || this.color).brighten(options.brightness).get(), 
				options.shadow		
			)
		}
	},
	
	getAreaCoords: function() {
		var areas = [],
			chart = this.chart,
			inverted = chart.inverted;
		each (this.data, function(point) {
			var pointH = mathMax(mathAbs(point.h), 3) * (point.h < 0 ? -1 : 1),
				x1 = inverted ? chart.plotWidth - point.plotY - pointH : point.plotX,
				y2 = inverted ? chart.plotHeight - point.plotX - point.w  : point.plotY,
				y1 = y2 + (inverted ? point.w : pointH),
				x2 = x1 + (inverted ? pointH : point.w);
				
			// make sure tightly packed colums can receive mouseover
			if (!inverted && mathAbs(x2 - x1) < 1) x2 = x1 + 1;
			else if (inverted && mathAbs(y2 - y1) < 1) y2 = y1 + 1;
				
			// push an array containing the coordinates and the point
			areas.push([
				map([
					x1, y1, 
					x1, y2, 
					x2, y2, 
					x2, y1
				], mathRound).join(','),
				point
			]);
		});
		return areas;
	},
	
	cleanData: function() {
		var series = this,
			data = series.data,
			interval,
			smallestInterval,
			closestPoints,
			i;
			
		// apply the parent method
		Series.prototype.cleanData.apply(series);
			
		// find the closes pair of points
		for (i = data.length - 1; i >= 0; i--) {
			if (data[i - 1]) {
				interval = data[i].x - data[i - 1].x;
				if (smallestInterval === undefined || interval < smallestInterval) {
					smallestInterval = interval;
					closestPoints = i;	
				}
			}
		}
		series.closestPoints = closestPoints;
	},
	
	animate: function(init) {
		var series = this,
			chart = series.chart,
			inverted = chart.inverted,
			div = series.layerGroup.div,
			dataLabelsLayer = series.dataLabelsLayer;
		if (init) { // initialize the animation
			div.style[inverted ? 'left' : 'top'] = 
				(inverted ? -chart.plotWidth : chart.plotHeight) + PX;
			
				
		} else { // run the animation
			animate(div, chart.inverted ? { left: 0 } : { top: 0 });		
			
			// delete this function to allow it only once
			series.animate = null;
		}
		
	},
	/**
	 * Remove this series from the chart
	 */
	remove: function() {
		var series = this,
			chart = series.chart;
			
		// column and bar series affects other series of the same type
		// as they are either stacked or grouped
		if (chart.hasRendered) each (chart.series, function(otherSeries) {
			if (otherSeries.type == series.type) otherSeries.isDirty = true;
		});
		
		Series.prototype.remove.apply(series, arguments);
	}
});
seriesTypes.column = ColumnSeries;

var BarSeries = extendClass(ColumnSeries, {
	type: 'bar',
	init: function(chart) {
		chart.inverted = this.inverted = true;
		ColumnSeries.prototype.init.apply(this, arguments);
	}
});
seriesTypes.bar = BarSeries;
		

/**
 * The scatter series class
 */
var ScatterSeries = extendClass(Series, {
	type: 'scatter', 
	/**
	 * Calculate the mouseover area coordinates for a given data series
	 */
	getAreaCoords: function () {

		var data = this.data,
			coords, 
			ret = [];
			
			
		each (data, function(point) {
			// create a circle for each point
			ret.push([[mathRound(point.plotX), mathRound(point.plotY)].join(','), point]);
		});
		return ret;
	},
	/**
	 * Cleaning the data is not necessary in a scatter plot
	 */
	cleanData: function() {}
});
seriesTypes.scatter = ScatterSeries;

/**
 * Extended point object for pies
 */
var PiePoint = extendClass(Point, {
	setState: function(state) {
		this.series.drawPointState(this, state);
	},
	init: function () {
		
		Point.prototype.init.apply(this, arguments);
		
		var point = this,
			series = point.series,
			defaultColors = series.chart.options.colors,
			toggleSlice;
		
		//visible: options.visible !== false,
		extend(point, {
			visible: point.visible !== false,
			name: pick(point.name, 'Slice'),
			color: point.color || defaultColors[colorCounter++]
		});
		
		// loop back to zero
		if (colorCounter >= defaultColors.length) colorCounter = 0;
		
		// create an individual layer
		if (!point.layer) point.layer = new Layer('pie', series.layerGroup.div);
		
		// add event listener for select
		toggleSlice = function() {
			point.slice();
		}
		addEvent(point, 'select', toggleSlice);
		addEvent(point, 'unselect', toggleSlice);
		
		return point;
	},
	setVisible: function(vis) {
		var point = this, 
			layer = point.layer,
			legendItem = point.legendItem;
			
		
		// if called without an argument, toggle visibility
		point.visible = vis = vis === undefined ? !point.visible : vis;
		
		if (vis) 
			layer.show();
		else 
			layer.hide();
	
		if (legendItem) { 
			legendItem.className = vis ? '' : HIGHCHARTS_HIDDEN;
			point.series.chart.legend.drawGraphics(true);
		}
	},
	/**
	 * Set or toggle whether the slice is cut out from the pie
	 * @param {Boolean} sliced When undefined, the slice state is toggled 
	 * @param {Boolean} redraw Whether to redraw the chart. True by default.
	 */
	slice: function(sliced, redraw) {
		var point = this,
			series = point.series;
		
		// redraw is true by default
		redraw = pick(redraw, true);
			
		// if called without an argument, toggle
		point.sliced = defined(sliced) ? sliced : !point.sliced;
		
		series.isDirty = true;
		
		if (redraw) series.chart.redraw();
		
	}
});


/**
 * The Pie series class
 */
var PieSeries = extendClass(Series, {
	type: 'pie',
	isCartesian: false,
	pointClass: PiePoint,
	getColor: function() {
		// pie charts have a color each point
	},
	translate: function() {
		var sum = 0,
			series = this,
			cumulative = -0.25, // start at top
			options = series.options,
			slicedOffset = options.slicedOffset,
			positions = options.center,
			size = options.size,
			chart = series.chart,
			data = series.data,
			circ = 2 * math.PI,
			fraction;
			
		// get positions - either an integer or a percentage string must be given
		positions.push(options.size);
		positions = map (positions, function(length, i) {
			return /%$/.test(length) ? 
				// i == 0: centerX, relative to width
				// i == 1: centerY, relative to height
				// i == 2: size, relative to height
				chart['plot' + (i ? 'Height' : 'Width')] * parseInt(length) / 100:
				length;
		});
					
		// get the total sum
		each (data, function(point) {
			sum += point.y;
		});
		
		each (data, function(point) {
			// set start and end angle
			fraction = sum ? point.y / sum : 0
			point.start = cumulative * circ;
			cumulative += fraction;
			point.end = cumulative * circ;
			point.percentage = fraction * 100;
			
			// set size and positions
			point.center = [positions[0], positions[1]];
			point.size = positions[2];
			
			// center for the sliced out slice
			var angle = (point.end + point.start) / 2;
			point.centerSliced = map([
				mathCos(angle) * slicedOffset + positions[0], 
				mathSin(angle) * slicedOffset + positions[1]
			], mathRound);
			
		});
		
		this.setTooltipPoints();
	},
	
	/**
	 * Render the graph and markers
	 */
	render: function() {
		//if (!this.pointsDrawn) 
		this.drawPoints();
		this.drawDataLabels();
	},
	
	/**
	 * Draw the data points
	 * @param {Object} state The state of this graph
	 */
	drawPoints: function(state) {
		var series = this;
		
		// draw the slices
		each (this.data, function(point) {
			series.drawPoint(point, point.layer.getCtx(), point.color);
			
			if (point.visible === false) point.setVisible(false);
			
			// draw the selected mode marker on top of the default one
			if (point.selected)	series.drawPointState(point, 'select', point.layer);
			
			//if (point.sliced) this.slice(point);		
		});
		
		//series.pointsDrawn = true;
	},
	
	getSymbol: function(){
	},
	

	/**
	 * Draw a single point in hover state
	 */
	drawPointState: function(point, state, layer) {
		var series = this,
			seriesOptions = series.options;

		
		if (point) { // drawPointState can be called without arguments to clear states

			// create a special state layer nested in this point's main layer
			/*stateLayer = point.stateLayer;
			if (!stateLayer) 
				stateLayer = point.stateLayer = new Layer('state-layer', point.layer.div);
			stateLayer.clear();*/
			
			// a specific layer for the currently active point
			
			layer = layer || point.stateLayer;
			if (state == 'hover') {
				if (!layer) layer = point.stateLayer = new Layer(
					'single-point',  
					point.layer.div
				);
				layer.clear();
			}
			
			// draw the point
			if (state && series.options.states[state]) {
				var options = merge(seriesOptions, seriesOptions.states[state]);
				this.drawPoint(
					point, 
					layer.getCtx(), 
					options.color || point.color, 
					options.brightness
				);
			}
			
		}
		// clear the old point on register the new one
		if (series.hoverPoint && series.hoverPoint.stateLayer) series.hoverPoint.stateLayer.clear();
		series.hoverPoint = point;
	},
	
	/**
	 * Draw a single point (pie slice)
	 * @param {Object} point The point object
	 * @param {Object} ctx The canvas context to draw it into
	 * @param {Object} color The color of the point
	 * @param {Object} brightness The brightness relative to the color
	 */
	drawPoint: function(point, ctx, color, brightness) {
		var options = this.options,
			center = point.sliced ? point.centerSliced : point.center,
			centerX = center[0],
			centerY = center[1],
			size = point.size,
			borderWidth = options.borderWidth,
			/* IE7 and IE6 fail to render a full circle unless start and
			end points are equal: */
			end = isIE && point.percentage == 100 ? point.start : point.end;
			
		// Todo: make Layer.prototype.drawArc method
		if (point.y > 0) { // drawing 0 will draw a full disc in IE
			ctx.fillStyle = setColor(Color(color).brighten(brightness).get(ctx), ctx);
			ctx.strokeStyle = options.borderColor;
			ctx.lineWidth = borderWidth;
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, size / 2, point.start, end, false);
			ctx.lineTo(centerX, centerY);
			ctx.closePath();
			ctx.fill();
			if (borderWidth) ctx.stroke(); // in WebKit, a zero width line will display as 1 if stroked
		}
	},
	/**
	 * Pull the slice out from the pie
	 * @param {Object} point
	 */
	/*slice: function(point) {
		var centerSliced = point.centerSliced;
		setStyles(point.layer, {
			left: centerSliced[0] + PX,
			top: centerSliced[1] + PX
		});
	},*/
	/**
	 * Get the coordinates for the mouse tracker area
	 */
	getAreaCoords: function() {
		var areas = [];
		var series = this;
		each (this.data, function(point) {
			var centerX = point.center[0],
				centerY = point.center[1],
				radius = point.size / 2,
				start = point.start,
				end = point.end,
				coords = [];
				
			// start building the coordinates from the start point
			// with .25 radians (~15 degrees) increments the coordinates
			for (var angle = start; angle; angle += 0.25) {
				if (angle >= end) angle = end;
				coords = coords.concat([
					centerX + mathCos(angle) * radius,
					centerY + mathSin(angle) * radius
				])
				if (angle >= end) break;
			}
			
			// wrap it up with the center point		
			coords = coords.concat([
				centerX, centerY
			]);
						
			// set tooltip position in the center of the sector
			point.tooltipPos = [
				centerX + 2 * mathCos((start + end) / 2) * radius / 3,
				centerY + 2 * mathSin((start + end) / 2) * radius / 3
			];
			
			// push an array containing the coordinates and the point
			areas.push([
				map(coords, mathRound).join(','),
				point
			])
			
		});
		return areas;
	},
	
	/**
	 * Extend the default setData method by first removing the old points
	 */
	setData: function() {
		// destroy old points, since the pie has one layer each point
		var series = this,
			data = series.data,
			i;
		if (data) {
			for (i = data.length - 1; i >= 0; i--) {
				data[i].remove();
			}
		}
		
		Series.prototype.setData.apply(series, arguments);
	},
	
	/**
	 * Clear all graphics and HTML from the series layer group
	 */
	clear: function() {
		/*var stateLayers = this.stateLayers;
		for (var state in stateLayers) {
			stateLayers[state].clear();
			stateLayers[state].cleared = true;
		}
		if (this.dataLabelsLayer) {
			this.dataLabelsLayer.clear();
			this.hasDrawnDataLabels = false;
		}*/
		// pies have separate layers per point
		each (this.data, function(point) {
			point.layer.clear();
			if (point.dataLabelsLayer) point.dataLabelsLayer.clear();
			if (point.stateLayer) point.stateLayer.clear();
		});
	}
});
seriesTypes.pie = PieSeries;


// global variables
Highcharts = {
	/*'load': function(arr) {
		each (arr, function(url) {
			getAjax(url, function(script) {
				eval(script)
			})
		})
	},*/
	numberFormat: numberFormat,
	dateFormat: dateFormat,
	defaultOptions: defaultOptions,
	setOptions: setOptions,
	Chart: Chart,
	extendClass: extendClass,
	seriesTypes: seriesTypes,
	Layer: Layer
}


})();
(function() {
  $(document).ready(ready);

  $(document).on('page:load', ready);

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  // Technique from Juriy Zaytsev
  // http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
  function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
      el.setAttribute(eventName, 'return;');
      isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
  }

  function isForm(element) {
    return Object.isElement(element) && element.nodeName.toUpperCase() == 'FORM'
  }

  function isInput(element) {
    if (Object.isElement(element)) {
      var name = element.nodeName.toUpperCase()
      return name == 'INPUT' || name == 'SELECT' || name == 'TEXTAREA'
    }
    else return false
  }

  var submitBubbles = isEventSupported('submit'),
      changeBubbles = isEventSupported('change')

  if (!submitBubbles || !changeBubbles) {
    // augment the Event.Handler class to observe custom events when needed
    Event.Handler.prototype.initialize = Event.Handler.prototype.initialize.wrap(
      function(init, element, eventName, selector, callback) {
        init(element, eventName, selector, callback)
        // is the handler being attached to an element that doesn't support this event?
        if ( (!submitBubbles && this.eventName == 'submit' && !isForm(this.element)) ||
             (!changeBubbles && this.eventName == 'change' && !isInput(this.element)) ) {
          // "submit" => "emulated:submit"
          this.eventName = 'emulated:' + this.eventName
        }
      }
    )
  }

  if (!submitBubbles) {
    // discover forms on the page by observing focus events which always bubble
    document.on('focusin', 'form', function(focusEvent, form) {
      // special handler for the real "submit" event (one-time operation)
      if (!form.retrieve('emulated:submit')) {
        form.on('submit', function(submitEvent) {
          var emulated = form.fire('emulated:submit', submitEvent, true)
          // if custom event received preventDefault, cancel the real one too
          if (emulated.returnValue === false) submitEvent.preventDefault()
        })
        form.store('emulated:submit', true)
      }
    })
  }

  if (!changeBubbles) {
    // discover form inputs on the page
    document.on('focusin', 'input, select, texarea', function(focusEvent, input) {
      // special handler for real "change" events
      if (!input.retrieve('emulated:change')) {
        input.on('change', function(changeEvent) {
          input.fire('emulated:change', changeEvent, true)
        })
        input.store('emulated:change', true)
      }
    })
  }

  function handleRemote(element) {
    var method, url, params;

    var event = element.fire("ajax:before");
    if (event.stopped) return false;

    if (element.tagName.toLowerCase() === 'form') {
      method = element.readAttribute('method') || 'post';
      url    = element.readAttribute('action');
      params = element.serialize();
    } else {
      method = element.readAttribute('data-method') || 'get';
      url    = element.readAttribute('href');
      params = {};
    }

    new Ajax.Request(url, {
      method: method,
      parameters: params,
      evalScripts: true,

      onComplete:    function(request) { element.fire("ajax:complete", request); },
      onSuccess:     function(request) { element.fire("ajax:success",  request); },
      onFailure:     function(request) { element.fire("ajax:failure",  request); }
    });

    element.fire("ajax:after");
  }

  function handleMethod(element) {
    var method = element.readAttribute('data-method'),
        url = element.readAttribute('href'),
        csrf_param = $$('meta[name=csrf-param]')[0],
        csrf_token = $$('meta[name=csrf-token]')[0];

    var form = new Element('form', { method: "POST", action: url, style: "display: none;" });
    element.parentNode.insert(form);

    if (method !== 'post') {
      var field = new Element('input', { type: 'hidden', name: '_method', value: method });
      form.insert(field);
    }

    if (csrf_param) {
      var param = csrf_param.readAttribute('content'),
          token = csrf_token.readAttribute('content'),
          field = new Element('input', { type: 'hidden', name: param, value: token });
      form.insert(field);
    }

    form.submit();
  }


  document.on("click", "*[data-confirm]", function(event, element) {
    var message = element.readAttribute('data-confirm');
    if (!confirm(message)) event.stop();
  });

  document.on("click", "a[data-remote]", function(event, element) {
    if (event.stopped) return;
    handleRemote(element);
    event.stop();
  });

  document.on("click", "a[data-method]", function(event, element) {
    if (event.stopped) return;
    handleMethod(element);
    event.stop();
  });

  document.on("submit", function(event) {
    var element = event.findElement(),
        message = element.readAttribute('data-confirm');
    if (message && !confirm(message)) {
      event.stop();
      return false;
    }

    var inputs = element.select("input[type=submit][data-disable-with]");
    inputs.each(function(input) {
      input.disabled = true;
      input.writeAttribute('data-original-value', input.value);
      input.value = input.readAttribute('data-disable-with');
    });

    var element = event.findElement("form[data-remote]");
    if (element) {
      handleRemote(element);
      event.stop();
    }
  });

  document.on("ajax:after", "form", function(event, element) {
    var inputs = element.select("input[type=submit][disabled=true][data-disable-with]");
    inputs.each(function(input) {
      input.value = input.readAttribute('data-original-value');
      input.removeAttribute('data-original-value');
      input.disabled = false;
    });
  });
  
  
function ajaxFileStream() {
    var url = "/Home/GetFileStream";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (oEvent) {
        console.log(oReq.response);
        var blob = new Blob([oReq.response], { type: "application/pdf" });
        var win = window.open('', '_blank');
        var URL = window.URL || window.webkitURL;
        var dataUrl = URL.createObjectURL(blob);
        win.location = dataUrl;
    };
    oReq.send();
}

  Ajax.Responders.register({
    onCreate: function(request) {
      var csrf_meta_tag = $$('meta[name=csrf-token]')[0];

      if (csrf_meta_tag) {
        var header = 'X-CSRF-Token',
            token = csrf_meta_tag.readAttribute('content');

        if (!request.options.requestHeaders) {
          request.options.requestHeaders = {};
        }
        request.options.requestHeaders[header] = token;
      }
    }
  });
})();
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







;
