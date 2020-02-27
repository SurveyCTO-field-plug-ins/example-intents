// References to field elements
var intentName = document.getElementById('intentName');
var intentParams = document.getElementById('intentParams');
var launchIntentBtn = document.getElementById('launchIntent');
var prefillSMSBtn = document.getElementById('prefillSMS');
var intentResultStatusEl = document.getElementById('intentResultStatus');
var intentResultsValueEl = document.getElementById('intentResultsValue');
var clearIntentResultsBtn = document.getElementById('clearIntentResults');

// Define what happens when the "Launch" button is clicked
launchIntentBtn.onclick = function() {
    // Since the parameters are expected in a JSON string format, we first need to convert from JSON to an object
    var intentParamsObj = JSON.parse(intentParams.value);
    // Then, we can launch the intent using the current values from the config fields
    launchIntent(intentName.value, intentParamsObj, function(error, result) {
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

// Define the SMS example configuration
prefillSMSBtn.onclick = function() {
    var intentParamsObj = {
        uri_data: 'smsto: 555-555-5555',
        sms_body: 'Some text message...'
    };
    intentName.value = 'android.intent.action.SENDTO';
    intentParams.value = JSON.stringify(intentParamsObj);
}

// Define what happens when the "Clear results" button is clicked
clearIntentResultsBtn.onclick = function() {
    intentResultStatusEl.value = null;
    intentResultsValueEl.innerHTML = null;
}
