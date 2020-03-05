// References to field elements
var intentConfigName = document.getElementById('intentConfigName');
var intentConfigParams = document.getElementById('intentConfigParams');
var launchIntentBtn = document.getElementById('launchIntent');
var intentResultStatusEl = document.getElementById('intentResultStatus');
var intentResultsValueEl = document.getElementById('intentResultsValue');
var clearIntentResultsBtn = document.getElementById('clearIntentResults');
var saveIntentResultsBtn = document.getElementById('saveIntentResults');
var saveResultsContainerEl = document.getElementById('saveResultsContainer');

// References to values stored in the plug-in parameters
var intentName = getPluginParameter('intentName');
var intentParams = getPluginParameter('intentParams');

// First, show the current values form the fieldParams object
intentConfigName.innerHTML = intentName;
intentConfigParams.innerHTML = intentParams;


// Define the 'launch intent' function
launchIntentBtn.onclick = function() {
    var intentParamsObj;

    try {
        // Since the intent parameters are expected in a JSON string format, we first need to convert from JSON to an object
        intentParamsObj = JSON.parse(intentParams);
    } catch(err) { // deal with potential errors while parsing the JSON.
        intentResultStatusEl.value = "error"; // update the return status
        intentResultsValueEl.value = err.message || err; // show the error message
        return;
    }

    // Then, we can launch the intent using the current values from the config fields
    launchIntent(intentName, intentParamsObj, function(error, result) {
        if (error) {
            // Something went wrong while launching the intent...
            intentResultStatusEl.value = "error"; // update the return status
            intentResultsValueEl.value = error; // show the error message
        } else {
            // If nothing went wrong...
            intentResultStatusEl.value = "success"; // update the return status
            var resultString = JSON.stringify(result); // Since the returned values are expected to be objects, we first need to convert them to a string
            intentResultsValueEl.value = resultString; // show the results
        }
    });
}

// Define what happens when the "Clear results" button is clicked
clearIntentResultsBtn.onclick = function() {
    intentResultStatusEl.value = null;
    intentResultsValueEl.value = null;
    saveResultsContainerEl.innerHTML = null;
}

// Define what happens when the "Save results" button is clicked
saveIntentResultsBtn.onclick = function() {
    var results = String(intentResultsValueEl.value);
    setAnswer(results);
    saveResultsContainerEl.innerHTML = "Results have been successfully saved!";
}
