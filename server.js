require('./config/config');

const express =  require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Screen} = require('./models/screen');
let {isAvailable} = require('./util/checkSeatAvaibility');
let {getUnreservedSeats} = require('./util/unreservedSeats');
let {getSeatAvailableAtChoice} = require('./util/checkSeatOfChoice');

let app = express();
app.use(bodyParser.json());

const port = process.env.PORT;


//API to accept details of movie screen
app.post('/screens', async (req, res) => {

  try {
    let screen = new Screen(req.body);
    await screen.save();
    res.send();
  } catch (e) {
      res.status(400).send(e);
  }

});

//API to reserve tickets for given seats in a given screen
app.post('/screens/:screen_name/reserve', async (req, res) => {

  try {
    let screenName = req.params.screen_name;
    let seats = req.body.seats;
    await isAvailable(screenName, seats);
    res.send("Reservation is successful");
  } catch (e) {
      res.status(400).send(e);
  }

});

/*
API to get the available seats for a given screen
And also
API to get information of available tickets at a given position
Same endpoint will be used for both. We will differentiate from queries.
*/
app.get('/screens/:screen_name/seats', async (req, res) => {

  try {
    let query = req.query;
    if(query.status && query.status === 'unreserved'){//to get the available seats for a given screen
      let unreservedSeats = await getUnreservedSeats(req.params.screen_name);
      res.send(unreservedSeats);
    }else if (query.numSeats && query.choice) {//to get information of available tickets at a given position
      let seatOfChoice = await getSeatAvailableAtChoice(req.params.screen_name, query.numSeats, query.choice);
      res.send(seatOfChoice);
    }else {//return error 404 if any other endpoint is used.
      return res.status(404).send('Page not found');
    }
  } catch (e) {
      res.status(400).send(e);
  }

});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
