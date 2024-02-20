const fs = require("fs");

// Path to the file containing the user-submitted code
const codePath = "/usr/src/app/code.js";

// Read and execute the JavaScript code from the file
fs.readFile(codePath, "utf8", (err, code) => {
  if (err) {
    console.error("Error reading code file:", err);
    return;
  }
  try {
    // Safely evaluate the code
    eval(code);
  } catch (error) {
    console.error("Error executing code:", error);
  }
});
