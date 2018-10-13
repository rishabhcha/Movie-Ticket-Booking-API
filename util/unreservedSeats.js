let {Screen} = require('./../models/screen');

//function to get unreserved seats for a given screen name.
let getUnreservedSeats = (screenName) => {
  return new Promise((resolve, reject) => {
    Screen.findOne({name: screenName}).then((screen) => {
      if(!screen) return reject("No such screen name found. Please check properly and try again!!");
      let result = '{';
      let seatInfo = screen.seatInfo;
      for(let [key, value] of seatInfo){
        result+= '"'+key+'": ';
        let reservedSeats = value.reservedSeats;
        let numberOfSeats = value.numberOfSeats;
        let reservedSeatsSet = new Set(reservedSeats);
        let unreservedSeats = [];
        for(let i=0; i<numberOfSeats; i++){
          if(!reservedSeatsSet.has(i)){
            unreservedSeats.push(i);
          }
        }
        result+= '['+unreservedSeats+'], ';
      }
      result = result.slice(0, -2) + '}';
      result = '{"seats": ' + result + '}'
      return resolve(JSON.parse(result));
    }, (err) => {
      return reject(err);
    });
  });
};

module.exports = {getUnreservedSeats};
