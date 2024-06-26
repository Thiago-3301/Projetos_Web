const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener("click", function () {
        const value = charKeyBtn.dataset.value;
        input.value += value;
    });
});

document.getElementById("clear").addEventListener("click", function(){
    input.value = "";
    input.focus();
});

document.addEventListener("keydown", function(ev){
    if(ev.key === "Enter"){
        ev.preventDefault(); 
        calculate();
        
    } else if (ev.key === "Backspace") {
        ev.preventDefault(); 
        input.value = input.value.slice(0, -1);
    } else if (!allowedKeys.includes(ev.key)) {
        ev.preventDefault(); 
    }
});

document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
    resultInput.value = "ERROR";
    resultInput.classList.add("error");
    const result = eval(input.value);
    resultInput.value = result;
    resultInput.classList.remove("error");
}

document.getElementById("themeSwitcher").addEventListener("click", function(){
    if(main.dataset.theme === "dark"){
        root.style.setProperty("--bg-color", "#f1f5f9");
        root.style.setProperty("--border-color", "#aaa");
        root.style.setProperty("--font-color", "#212529");
        root.style.setProperty("--primary-color", "#26834a");
        main.dataset.theme = "light";
    }else{
        root.style.setProperty("--bg-color", "#212529");
        root.style.setProperty("--border-color", "#666");
        root.style.setProperty("--font-color", "#f1f5f9");
        root.style.setProperty("--primary-color", "#4dff91");
        main.dataset.theme = "dark";
    }
});

document.getElementById("copyToClipboard").addEventListener("click", function(ev){
    const button = ev.currentTarget;
    if(button.innerText === "Copiar"){
        button.innerText = "Copiado!";
        button.classList.add("success");
        navigator.clipboard.writeText(resultInput.value);
    }else{
        button.innerText = "Copiar";
        button.classList.remove("success");
    }
});
