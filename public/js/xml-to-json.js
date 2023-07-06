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

// Example usage
var xmlString =
    "<root><item id='1'>First item</item><item id='2'>Second item</item></root>";
var jsonResult = xmlToJSON(xmlString);
console.log(jsonResult);
