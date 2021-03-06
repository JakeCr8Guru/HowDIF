// dotenv
require("dotenv").config();
// Express
const express = require('express');
const app = express();
// BodyParser
const bodyParser = require('body-parser');
// Session
const sessionMiddleware = require('./modules/session-middleware');
// Passport
const passport = require('./strategies/user.strategy');
// ----- Route includes -----
const userRouter = require('./routes/user.router');
const emotionsRouter = require("./routes/emotions.router");

// ----- Body parser middleware -----
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----- Passport Session Configuration -----
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// ----- Routes -----
app.use('/api/user', userRouter);
app.use("/api/emotions", emotionsRouter);

// Serve static files
app.use(express.static('build'));

// App Set
const PORT = process.env.PORT || 5000;

// Listen here server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
