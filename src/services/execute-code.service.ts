export class ExecuteCodeService {
  async executeCode(code: string): Promise<string> {
    console.log(`Execution code: ${code}`);
    return `Result of executing: ${code}`;
  }
}
