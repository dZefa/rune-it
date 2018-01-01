# RuneIT

Rune IT or Rune Intelligent Testing, is a web app to live test a rune build as you build it.

You first pick a champion you would like to run this build on. 
Then you start building your rune as you normally would but with Rune IT, you will be testing each entry against the most popular and most winningest builds.
Each keystone you pick, the app will reveal two things:
  1. The keystone most summoners pick next
  2. The keystone with the highest winrate in addition to what you have selected so far

These comparisons are done live with data from High Elo ranked games.

Also, for those playing a new champ in a ranked game, we have a quick look up for both the most popular rune build and the most winningest rune build.

Unfortunately, the app is not finished yet with plans to finish in the near future.

Please email danchong625@gmail.com with subject: RuneIT Contribution or open an issue, if you would like to contribute to the app.

This app was started for RIOT Games API Challenge 2017.

### Disclaimer

This product is not finished and key connections/components are not available. 

Currently unfinished:

- Seeding Data automatically from REST server using worker
- Working Front-End Client to display data and for user interaction. (Basically nothing is done on the Front-End yet)
- Several end points in REST server to "test" builds
- Rune Parser: To parse the hashed rune build from the service inside the Rest server to send up to the client.
- Tests: Add tests to make sure everything is working the way it should on any environment
- CLI tools: Tools to pre-seed the data found in REST-server (rune data and champ data)

# Get Started

In order to get the app started for development, a few key steps are needed.

* Install [MongoDB](https://www.mongodb.com/) & make sure you have a local mongo server instance running.

* Copy and fill out *.env.copy files in `client`, `REST-server`, `services/matchList-service` folders into their own respective `client.env`, `server.env`, `matchList.env` files.

* Install dependencies and run setup

```bash
npm install
```

* Start the application
```bash
npm run build-prod # in one window
npm run start-rest-server # in another window
npm run start-service # in another window
```

* Seed the data (Using postman or similar)
```bash
call end point:
  http://localhost:3000/updateMatch
and then:
  http://localhost:3000/updateChampData
```

Take a look into the database if you would like see the updated Champion data.

# System Architecture

## Client

The front-end codebase is written in [ReactJS](https://reactjs.org/) and styled using a base of [Bootstrap](https://v4-alpha.getbootstrap.com/).

## Rest Server

The RESTful JSON Data API is written in Javascript using NodeJS and [expressJS](https://expressjs.com/).

## MatchList Service

The Service is written in Javascript using NodeJS and [expressJS](https://expressjs.com/). This service updates the database with new matches and runes, as well as updating champion info with the newly added runes.

# Tech Stack Used so Far

- React
- React-Router
- NodeJS
- Express
- MongoDB
- Mongoose
- Webpack
- Babel
- Axios
- Bluebird