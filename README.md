# chat-app-dis

## Run the project

To run this project you must install node.js (latest recommended)

1. Make sure to have the .env file with the correct variables at the root of the project
2. Navigate to the root of the project
3. Install the project dependencies:

```zsh
yarn install
```

4. Run the project and set up the database schemas (if they do not already exist)

```zsh
yarn run dev
```

If on Windows, you may need to run the following command instead:

```zsh
yarn run dev:win
```

The project should now be running at `localhost:4000`


## Run with Docker

1. Open a terminal and navigate to the root directory of your project.

2. Build the Docker image by running the following command

```bash
docker build -t apollo-server-app .
```

3. Run the Docker container using the command below.

```bash
docker run -p 4000:4000 apollo-server-app
```

This command maps port 4000 of the container to port 4000 on your local machine and starts the container.

The Apollo Server app should now be running inside the Docker container, and you can access it at http://localhost:4000.

Note: Make sure you have Docker installed and running on your machine before following the steps above.