chrome.runtime.sendMessage({ todo: "showPageAction" });

window.addEventListener('load', (event) => { // run once window has finished loading
    renderTab();
});

var initialTime = 60; // time in seconds
var currentTime = 0;

function renderTab() { // render tab for timer display
    var pixelFont = new FontFace('Pixeloid Sans', 'url("../assets/fonts/PixeloidSans.woff")', { style: 'normal', weight: 'normal' });
    document.fonts.add(pixelFont);

    let tabDiv = document.createElement("div");
    tabDiv.setAttribute("id", "crittersbreak-tab");
    document.body.appendChild(tabDiv);

    tabDiv.innerHTML = '<p id="crittersBreak-timeDisplay">5:00</p>'
    // style settings
    // body
    tabDiv.style.backgroundColor = "#ffffff";
    tabDiv.style.color = "#303030";
    tabDiv.style.fontFamily = "'Pixeloid Sans'";
    tabDiv.style.fontSize = "36px";
    tabDiv.style.position = "fixed";
    tabDiv.style.right = "0px";
    tabDiv.style.top = "200px";
    tabDiv.style.width = "120px";
    tabDiv.style.height = "60px";
    tabDiv.style.borderRadius = "5px 0 0 5px";
    tabDiv.style.display = "flex";
    tabDiv.style.justifyContent = "center";
    tabDiv.style.alignItems = "center";
    tabDiv.style.zIndex = 10000;

    document.getElementById("crittersBreak-timeDisplay").style.margin = "0";
}

// Converting string to required date format
let deadline = new Date("Jan 5, 2024 15:37:25").getTime();

// To call defined fuction every second
let timer = setInterval(function () {
    if (currentTime == 0) currentTime = initialTime;
    let minutesNum = (currentTime - (currentTime % 60)) / 60;
    var minutesStr = "" + minutesNum;
    if (minutesNum == 0) minutesStr = "00"
    else if (minutesNum < 10) minutesStr = "0" + minutesStr;

    let secondsNum = currentTime - (minutesNum * 60);
    var secondsStr = "" + secondsNum;
    if (secondsNum == 0) secondsStr = "00"
    else if (secondsNum < 10) secondsStr = "0" + secondsStr;

    console.log(minutesNum + ", " + secondsNum);

    document.getElementById("crittersBreak-timeDisplay").innerHTML = minutesStr + ":" + secondsStr;

    if (currentTime > 0) currentTime--;
}, 1000);