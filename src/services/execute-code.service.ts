import CustomError from "../utils/customError.util";

export class ExecuteCodeService {
  async executeCode(code: string): Promise<string> {
    let capturedLogs: any = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      capturedLogs.push(args.join(" "));
      originalConsoleLog.apply(console, args);
    };

    try {
      const result = eval(code);
      // Optionally, append the result of the eval to capturedLogs or handle it separately
    } catch (error: any) {
      console.error("Error during code execution:", error);
      // Restore the original console.log immediately in case of error
      console.log = originalConsoleLog;

      // Log the error to capturedLogs or handle it as needed
      capturedLogs.push(`Error during code execution: ${error.message}`);

      // Throwing a CustomError to be handled by the caller
      throw new CustomError(`Failed to execute code: ${error.message}`, 400);
    }

    // Restore the original console.log after successful execution
    console.log = originalConsoleLog;
    console.log("Captured Logs:", capturedLogs.join("\n"));

    // Return the captured logs as the result, or adjust according to your needs
    return capturedLogs.join("\n") + "\n";
  }
}
