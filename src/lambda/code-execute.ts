module.exports.handler = async (event: any) => {
  const { code } = event.body ? JSON.parse(event.body) : event;

  let capturedLogs: any = [];
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    capturedLogs.push(args.join(" "));
    originalConsoleLog.apply(console, args);
  };

  try {
    const result = eval(code);

    // Restore the original console.log after successful execution
    console.log = originalConsoleLog;

    return {
      statusCode: 200,
      body: JSON.stringify({ result: capturedLogs.join("\n") + "\n" }),
    };
  } catch (error: any) {
    console.log = originalConsoleLog;
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Failed to execute code",
        message: error.message,
      }),
    };
  }
};
