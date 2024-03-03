// Assuming the environment variable CODE contains the JavaScript code
const code = process.env.CODE;

if (!code) {
  console.error("No code provided");
  process.exit(1);
}

try {
  // Safely evaluate the code
  eval(code);
} catch (error) {
  console.error("Error executing code:", error);
}
