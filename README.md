# xml-to-json
A simple way to convert XML data to JSON

# Using in browser (Plain JavaScript)
Copy the code in the file /public/js/xml-to-json.js and see the example usage.

```
function xmlToJSON(xml) {
  // Create a new DOMParser
  var parser = new DOMParser();

  // Parse the XML string into an XMLDocument
  var xmlDoc = parser.parseFromString(xml, "text/xml");

  // Create an empty object to hold the JSON data
  var jsonObj = {};

  // Recursive function to convert an XML element to JSON
  function parseElement(element, obj) {
    // Get the element's child nodes
    var nodes = element.childNodes;

    // Iterate over the child nodes
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      // Process element nodes only
      if (node.nodeType === 1) {
        var name = node.nodeName;

        // Check if the element already exists in the JSON object
        if (obj[name]) {
          // If it's an array, push the new value
          if (Array.isArray(obj[name])) {
            obj[name].push(parseElement(node, {}));
          }
          // If it's a single object, convert it to an array and push the new value
          else {
            var temp = obj[name];
            obj[name] = [temp, parseElement(node, {})];
          }
        }
        // If it doesn't exist, create a new object
        else {
          obj[name] = parseElement(node, {});
        }
      }
      // Process text nodes
      else if (node.nodeType === 3) {
        var text = node.textContent.trim();
        // Skip empty text nodes
        if (text.length > 0) {
          obj = text;
        }
      }
    }

    return obj;
  }

  // Start parsing from the root element
  var rootElement = xmlDoc.documentElement;
  jsonObj[rootElement.nodeName] = parseElement(rootElement, {});

  // Return the JSON object
  return jsonObj;
}

```

# Using the function in NodeJS application
In NodeJS, the function requires xmldom to use DOMParser so you have to install it before using the xmlToJSON() function.
Install the package using:
npm install xmldom

See below for NodeJS:
```
const { DOMParser } = require("xmldom");

function xmlToJSON(xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const jsonObj = {};
  function parseElement(element, obj) {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType === 1) {
        const name = node.nodeName;
        if (obj[name]) {
          if (Array.isArray(obj[name])) {
            obj[name].push(parseElement(node, {}));
          } else {
            const temp = obj[name];
            obj[name] = [temp, parseElement(node, {})];
          }
        } else {
          obj[name] = parseElement(node, {});
        }
      } else if (node.nodeType === 3) {
        const text = node.textContent.trim();
        if (text.length > 0) {
          obj = text;
        }
      }
    }

    return obj;
  }
  const rootElement = xmlDoc.documentElement;
  jsonObj[rootElement.nodeName] = parseElement(rootElement, {});
  return jsonObj;
}

```

# Example usage
```
const xmlData = "<root><name>John Doe</name><age>30</age></root>";
const json = xmlToJSON(xmlData);
console.log(json);

```

# Using in Wappler (NodeJS) projects
You need to install/include the runJS module in your project. 
See extensions folder

The example API requires an URL to an XML data.
