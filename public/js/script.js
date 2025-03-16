/**
 * Event listener to ensure that the "Calculate" button triggers the calculate function 
 * when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Attach an event listener to the "calculateButton" which triggers the calculate() function on click
    document.getElementById("calculateButton").addEventListener("click", calculate);
})

/**
 * This function performs the arithmetic calculation. It validates the user inputs, 
 * sends a request to the backend API, and updates the UI with the result or any error message.
 */
function calculate(){
     // Retrieve the input values for number1, number2, and the selected operation from the form
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    var operation = document.getElementById("operation").value;

    // Validate that an operation is selected
    if(operation === ""){
        // Alert the user if no operation is selected
        alert("Please select an operation"); // Exit the function to prevent further processing
        return;
    }

    // Special validation for square root (only number1 is needed)
    if (operation === "square-root") {
        if (number1 === "" || number1 === undefined) {
            alert("Please enter a number for square root");
            return;
        }
        number2 = null; // Ensure number2 is null since it's not needed
    } else {
    // For other operations, both numbers are required
    if(number1 === "" || number1 === undefined || number2 === "" || number2 === undefined){
        // Alert the user if either number is missing
        alert("Please enter both numbers");
        return; // Exit the function to prevent further processing
    }
}

    // Send a POST request to the backend API to perform the calculation
    fetch(`http://localhost:3000/${operation}`, {
        method: "POST", // Set the request method to POST
        headers: {"Content-Type": "application/json"}, // Set the content type to JSON for the body data
        body: JSON.stringify({ 
            operation: operation, // Pass the operation (addition, subtraction, etc.)
            number1: parseFloat(number1), // Convert number1 to a float before sending it
            number2: parseFloat(number2) // Convert number2 to a float before sending it
        })
    })

    // Process the server's response in JSON format
    .then(response => response.json())
    .then(data => {
        // If the response contains an error field, alert the user
        if(data.error){
            alert(data.error);
        }else{
            // If no error, display the result of the operation in the result div
            document.getElementById("result").innerText = `Result: ${data.result}`;
        }
    })
}