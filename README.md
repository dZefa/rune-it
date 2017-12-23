# RuneIT

Find best runes per Champion by winrate.
Compare your rune builds with other top players.

RIOT Games API Challenge 2017

# Get Started

In order to get the app started for development, a few key steps are needed.

* Create a local/remote postgreSQL database. It is recommended that you create a free instance on ElephantSQL.

* Copy and fill out copy.*.env files in `client` and `server` folders into their own respective `client.env`, `server.env` files.

* Install dependencies and run setup

```bash
npm install
npm run setup
```

* Start the application
```bash
npm run build-prod # in another window
npm run start-server # in one window
```

# System Architecture

## Client

The front-end codebase is written in [ReactJS](https://reactjs.org/) and styled using a base of [Bootstrap](https://v4-alpha.getbootstrap.com/).

## Rest Server

The RESTful JSON Data API is written in Javascript using NodeJS and [expressJS](https://expressjs.com/).
