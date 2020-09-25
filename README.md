## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

- Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

- Use [http://localhost:8080/feed](http://localhost:8080/feed) to get an array of JSONs with all the questions

- Use [http://localhost:8080/questions/new](http://localhost:8080/question/new) in a HTTP client to post a Javascript Object of a question



## Installation of DB

For **docker** run on command line:

- get docker
- docker pull mongo
- docker run --name devxican -P -d mongo

In case of an error running anything on Docker on Windows 10, follow these two commands

### `>cd "C:\Program Files\Docker\Docker"`
### `>DockerCli.exe -SwitchDaemon`

https://docs.nodebb.org

## Direct dependencies used:

- [express-generator](https://www.npmjs.com/package/express-generator)
  with the next flags: express --view=ejs

- [mongodb driver](https://www.npmjs.com/package/mongodb)
