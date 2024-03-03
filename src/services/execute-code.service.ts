import AWS from "aws-sdk";
import CustomError from "../utils/customError.util";

// Configure AWS
AWS.config.update({ region: "ap-south-1" }); // Update this to your region

const ecs = new AWS.ECS();
const cloudwatchlogs = new AWS.CloudWatchLogs();

export class ExecuteCodeService {
  async executeCode(code: string): Promise<any> {
    // Define ECS parameters
    const params = {
      cluster: "js-code-execution", // Specify your ECS Cluster name
      taskDefinition: "js-code-execution-task", // Specify your task definition name
      launchType: "FARGATE",
      networkConfiguration: {
        // Required for FARGATE launch type
        awsvpcConfiguration: {
          subnets: [
            "subnet-056003deedcdc2d81",
            "subnet-042b5566f5efe4378",
            "subnet-0c3ef27e81d83d558",
          ], // Specify your subnet IDs
          assignPublicIp: "ENABLED",
          securityGroups: ["sg-085d49f4220be3153"], // Specify your security group IDs
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: "JS-Code-Execution", // Specify your container name as defined in the task definition
            environment: [
              {
                name: "CODE", // Environment variable to pass the code, adjust if using a different method
                value: code,
              },
            ],
          },
        ],
      },
      count: 1, // Number of tasks to run
    };

    try {
      const runTaskResponse = await ecs.runTask(params).promise();

      if (runTaskResponse.tasks && runTaskResponse.tasks[0]) {
        const taskArn = runTaskResponse.tasks[0].taskArn;
        if (taskArn) {
          console.log("Task started:", taskArn);

          // Retrieve logs for the container
          const logGroupName = "/ecs/js-code-execution-task"; // Update with your log group name

          const taskArnParts = taskArn.split("/");
          const taskId = taskArnParts[taskArnParts.length - 1];
          const logStreamName = `ecs/JS-Code-Execution/${taskId}`;

          // Wait for the task to reach the STOPPED state
          await this.waitForTaskStopped(params.cluster, taskArn);

          const logEventsResponse = await cloudwatchlogs
            .getLogEvents({
              logGroupName: logGroupName,
              logStreamName: logStreamName,
            })
            .promise();

          let logMessages = "";

          if (logEventsResponse.events) {
            // Process log events
            logEventsResponse.events.forEach((event) => {
              console.log(event.message);
              // Append each log message to the logMessages string, followed by a newline character for formatting
              logMessages += event.message + "\n";
            });
          } else {
            console.log("No log events found.");
          }

          // Return the concatenated log messages
          return logMessages;
        } else {
          console.error("Task ARN is undefined");
          throw new CustomError("Failed to execute code", 400);
        }
      } else {
        console.error("No tasks started");
        throw new CustomError("Failed to execute code", 400);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw new CustomError("Failed to execute code", 500);
    }
  }

  async waitForTaskStopped(cluster: string, taskArn: string): Promise<void> {
    console.log("Waiting for task to be stopped");
    let taskStopped = false;
    while (!taskStopped) {
      const describeTasksResponse = await ecs
        .describeTasks({ cluster, tasks: [taskArn] })
        .promise();
      const task =
        describeTasksResponse.tasks && describeTasksResponse.tasks[0];
      if (task && task.lastStatus === "STOPPED") {
        taskStopped = true;
      } else {
        // Wait for a few seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
}
