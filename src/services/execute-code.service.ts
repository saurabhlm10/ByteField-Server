import { exec } from "child_process";
import util from "util";
import path from "path";
import fs from "fs";
import CustomError from "../utils/customError.util";

const execPromise = util.promisify(exec);

export class ExecuteCodeService {
  async executeCode(code: string): Promise<string> {
    const tempFilePath = path.join("/tmp", `code-${Date.now()}.js`);
    await fs.promises.writeFile(tempFilePath, code);

    try {
      // Define the Docker run command
      const dockerRunCmd = `docker run -v "${tempFilePath}:/usr/src/app/code.js" js-execution-environment`;

      // Execute the Docker container
      const { stdout, stderr } = await execPromise(dockerRunCmd);

      if (stderr) throw new Error(stderr);

      // Clean up the temporary file
      await fs.promises.unlink(tempFilePath);

      return stdout;
    } catch (error: any) {
      // Ensure the temporary file is cleaned up even if execution fails
      await fs.promises.unlink(tempFilePath);
      console.log("ERROR", error.message);
      throw new CustomError(error.message, 400);
    }
  }
}
