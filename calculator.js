const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

function clearDisplay() {
    display.textContent = "";
}

function appendValue(value) {
    display.textContent += value;
}

function calculate() {
    const expr = display.textContent.trim();

    // Give alert with nothing is inserted
    if (!expr) {
        display.textContent = "Nothing inserted!";
        return;
    }

    // Only allow integers and + - * /
    const valid = /^[0-9+\-*/\s]+$/.test(expr);
    if (!valid) {
        display.textContent = "Error";
        return;
    }

    try {
        const result = Function(`"use strict"; return (${expr});`)();
        display.textContent = String(result);
    } catch {
        display.textContent = "Error";
    }
}

// One click listener for all buttons
buttons.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "clear") {
        clearDisplay();
        return;
    }

    if (action === "equals") {
        calculate();
        return;
    }

    if (value) {
        appendValue(value);
    }
});