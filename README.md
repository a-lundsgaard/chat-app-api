# chat-app-dis

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