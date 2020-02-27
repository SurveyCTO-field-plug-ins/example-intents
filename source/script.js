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
    // Since the intent parameters are expected in a JSON string format, we first need to convert from JSON to an object
    var intentParamsObj = JSON.parse(intentParams);
    // Then, we can launch the intent using the current values from the config fields
    launchIntent(intentName, intentParamsObj, function(error, result) {
        if (error) {
            // Something went wrong while launching the intent. 
            intentResultStatusEl.value = "error";
            intentResultsValueEl.innerHTML = error;
            return;
        } else {
            // If nothing went wrong
            intentResultStatusEl.value = "success";
            intentResultsValueEl.innerHTML = result;
        }
    });
}

// Define what happens when the "Clear results" button is clicked
clearIntentResultsBtn.onclick = function() {
    intentResultStatusEl.value = null;
    intentResultsValueEl.innerHTML = null;
    saveResultsContainerEl.innerHTML = null;
}

// Define what happens when the "Save results" button is clicked
saveIntentResultsBtn.onclick = function() {
    var results = String(intentResultsValueEl.innerHTML);
    setAnswer(results);
    saveResultsContainerEl.innerHTML = "Results have been successfully saved!";
}
