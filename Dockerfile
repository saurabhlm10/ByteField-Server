# Use the official Node.js image, compatible with Prisma requirements if also used for other purposes
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the script that will run the user's code
COPY execute.js .

# Command to run when the container starts
# This CMD should be overridden by whatever command is needed to execute the user-submitted code
CMD ["node", "execute.js"]
