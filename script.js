// Get the output display element
const output = document.getElementById("result");

// Get all the calculator buttons
const buttons = document.getElementsByClassName("button");

// Loop through each button and add an event listener
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // Check if the output contains "="
        if (output.textContent.includes("=")) {
            output.textContent = "0";
        }
        // Get the text content of the clicked button
        const buttonText = buttons[i].textContent.trim();
        // Perform different actions based on the button clicked
        switch(i) {
            // AC
            case 0:
                // Clear the output display
                output.textContent = "0";
                break;
            // C
            case 1:
                output.textContent = output.textContent.slice(0, -1);
                if (output.textContent === "") {
                    output.textContent = "0";
                }
                break;
            // Percent
            case 2:
                output.textContent = (parseFloat(output.textContent) / 100).toString();
                break;
            // Divide
            case 3:
                appendOperator('/');
                break;
            // Multiply
            case 7:
                appendOperator('*');
                break;
            // Minus
            case 11:
                appendMinus();
                break;
            // Add
            case 15:
                appendOperator('+');
                break;
             // Zero
            case 17:
                handleZeroButton();
                break;
            // Decimal Point
            case 18:
                appendDecimal();
                break;
            // Equal
            case 19:
                evaluateExpression();
                break;
            // Any number input from 1 - 9
            default:
                appendNumber(buttonText);
        }
    });
}

// Function to append a number to the output
function appendNumber(buttonText) {
    // If output is "0", replace it with button text
    if (output.textContent === "0") {
        output.textContent = buttonText;
    }
    // If output is not "0" and doesn't start with "-" or contain a ".", append the button text
    else if (!output.textContent.startsWith('-') && !output.textContent.includes('.')) {
        output.textContent += buttonText;
    }
    // If output starts with "-" or contains a ".", append the button text without leading zeros
    else {
        // Remove leading zeros before appending the button text
        output.textContent += buttonText.replace(/^0+/, '');
    }
}

// Function to handle the Zero button
function handleZeroButton() {
    output.textContent += "0";
}


// Function to append a decimal point to the output
function appendDecimal() {
    // If output does not contain a decimal point and doesn't end with an operator, append "."
    if (!output.textContent.includes('.') && !isOperator(output.textContent.slice(-1)) && !(output.textContent.endsWith('- '))) {
        output.textContent += ".";
    } 
    // If the last digit before the decimal point is not a decimal, append "."
    else if (!output.textContent.endsWith(".")) {
        output.textContent += ".";
    }
}




// Function to append an operator to the output
function appendOperator(operator) {
    // Implement the operator by checking if the previous operation is not the same, then append the operator
    if (!isOperator(output.textContent.slice(-1))) {
        output.textContent += operator;
    }
}

// Function to append a minus sign to the output
function appendMinus() {
    // If output is zero or already starts with a minus sign, replace it with a minus sign
    if (output.textContent === "0" || output.textContent === "-0" || output.textContent === "Error") {
        output.textContent = "-";
    }
    // If the previous character is not an operator, append a binary minus for subtraction
    else if (!isOperator(output.textContent.slice(-1))) {
        output.textContent += '-';
    }
    // If the previous character is an operator, append a unary minus for negative numbers
    else {
        output.textContent += '-'; // Append a unary minus
    }
}


// Function to evaluate the expression
function evaluateExpression() {
    try {
        // Evaluate the expression
        const result = eval(output.textContent);
        // Check if the result is an integer or not
        if (Number.isInteger(result)) {
            // If the result is an integer, display it without decimal places
            output.textContent = '=' + result.toString();
        } else {
            // If the result has decimal places, round it to two decimal places
            output.textContent = '=' + result.toFixed(2);
        }
    } catch (error) {
        // Handle errors (e.g., divide by zero)
        output.textContent = "Error";
    }
}

// Function to check if a character is an operator
function isOperator(character) {
    return character === '/' || character === '*' || character === '-' || character === '+';
}