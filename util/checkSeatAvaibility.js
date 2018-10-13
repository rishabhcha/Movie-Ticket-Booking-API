let {Screen} = require('./../models/screen');

//function to check if given seats are available to be booked.
let isAvailable = (screenName, seats) => {

  return new Promise((resolve, reject) => {
    Screen.findOne({name: screenName}).then((screen) => {
      if(!screen) return reject("No such screen exist")
      for (var row in seats) {
        let actualRow = screen.seatInfo.get(row);
        if(!actualRow) return reject("No such row exist in this screen");
        let numberOfSeats = actualRow.numberOfSeats;
        let reservedSeats = actualRow.reservedSeats;
        let seatsToReserve = seats[row];
        var reservedSeatsSet = new Set(reservedSeats);
        for(i in seatsToReserve){
          if (seatsToReserve[i] >= numberOfSeats) {
            return reject("Please enter correct seat number. "+
            "Given seat number exceeds total number of seat in given row");
          }
          if (reservedSeatsSet.has(seatsToReserve[i])) {
            return reject("This seat is already reserved. Please try with some other seat!!");
          }
        }
        screen.seatInfo.get(row).reservedSeats.push(...seatsToReserve);
      }
      screen.save().then((scr) => {
        if(!scr){
          return reject("Failed to save changes in screen during reservation");
        }
        return resolve();
      });
    }, (err) => {
      return reject(err);
    });
  });

};

module.exports = {isAvailable};
