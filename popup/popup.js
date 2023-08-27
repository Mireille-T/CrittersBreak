const settings = {}; // in-page cache of setting changes

window.addEventListener("load", async event => {
    revertSettings();

    document.getElementById("my-critters-btn").addEventListener("click", function(){
        openTab("my-critters")
    });
    document.getElementById("settings-btn").addEventListener("click", function(){
        openTab("settings")
    });
    document.querySelector('input[type=submit]').addEventListener("click", saveSettings);
    document.querySelector('input[type=reset]').addEventListener("click", revertSettings);

    // async stuff below; anything
    var state = await chrome.runtime.sendMessage({ getState: true });
    if (state != -1) { // already a timer running; cannot start timer
        document.querySelector('input[type=button]').classList.add("disabled");
    } else {
        document.querySelector('input[type=button]').addEventListener("click", startContent);
    }
})

function openTab(tabName) {
    if (document.getElementsByClassName("open")[0].id != tabName) {
        document.getElementsByClassName("open")[0].classList.toggle("open");
        document.getElementById(tabName).classList.toggle("open");
        document.getElementsByClassName("selectedTab")[0].classList.toggle("selectedTab");
        document.getElementById(`${tabName}-btn`).classList.toggle("selectedTab");
    }
}

function revertSettings() {
    chrome.storage.sync.get("settings", function (result) {
        // If result is null, use default values
        try {
            document.getElementById("interval").value = result.settings.breakInterval;
        } catch (error) {
            document.getElementById("interval").value = 25;
        }

        try {
            document.getElementById("duration").value = result.settings.breakDuration;
        } catch (error) {
            document.getElementById("duration").value = 5;
        }

        try {
            document.getElementById("dimming").checked = result.settings.dimming;
        } catch (error) {
            document.getElementById("dimming").checked = true;
        }
    });
}

function saveSettings() {
    settings.breakInterval = document.getElementById("interval").value;
    settings.breakDuration = document.getElementById("duration").value;
    settings.dimming = document.getElementById("dimming").checked;
    chrome.storage.sync.set({settings});
}

function startContent() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { startContent: true });
    });
    document.querySelector('input[type=button]').removeEventListener("click", startContent);
    document.querySelector('input[type=button]').classList.add("disabled");
}