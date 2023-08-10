window.addEventListener("load", event => {
    document.getElementById("my-critters-btn").addEventListener("click", function(){
        openTab("my-critters")
    });
    document.getElementById("settings-btn").addEventListener("click", function(){
        openTab("settings")
    });
})


function openTab(tabName) {
    if (document.getElementsByClassName("open")[0].id != tabName) {
        document.getElementsByClassName("open")[0].classList.toggle("open");
        document.getElementById(tabName).classList.toggle("open");
    }
}