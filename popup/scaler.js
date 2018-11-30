/* initialise variables */

var instrumentList = document.querySelector('.instrument-box select');
var refreshButton = document.querySelector('.instrument-box button');
var baseURL = "https://testnet.bitmex.com/api/v1";

/*  add event listeners to buttons */

function listenForClicks() {
    document.addEventListener("click", (e) => {
        
        function reportError(error) {
            console.error(`Could not retrieve instruments: ${error}`);
        }

        function getInstruments(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "getInstruments"
              });
        }

        if (e.target.id == "refresh-instruments") {
            browser.tabs.query({active: true, currentWindow: true})
              .then(getInstruments)
              .catch(reportError);
        }

    });
}

function reportExecuteScriptError(error) {
    document.querySelector(".outer-wrapper").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "../content/scaler.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);



