let {Screen} = require('./../models/screen');

//function to check and return best choice of seat
//if user specify the number of seats she wants and a choice of seat
let getSeatAvailableAtChoice = (screenName, numSeats, choice) => {

  return new Promise((resolve, reject) => {
    Screen.findOne({name: screenName}).then((screen) => {
      if(!screen) return reject('No such screen name exist.');
      let choiceRow = choice.substring(0,1);
      let choiceSeatNo = Number(choice.substring(1));
      let aisleSeats = screen.seatInfo.get(choiceRow).aisleSeats;
      let aisleSeatsSet = new Set(aisleSeats);
      let reservedSeats = screen.seatInfo.get(choiceRow).reservedSeats;
      let reservedSeatsSet = new Set(reservedSeats);
      let numberOfSeats = screen.seatInfo.get(choiceRow).numberOfSeats;
      if (reservedSeatsSet.has(choiceSeatNo)) {
        return reject("Seat is already reserved!!");
      }
      let i = j = choiceSeatNo;
      while(j-i < numSeats-1){
        if(i>0 && !reservedSeatsSet.has(i-1) && (!aisleSeatsSet.has(i) || i==choiceSeatNo)){
          i--;
        }else if (j<numberOfSeats && !reservedSeatsSet.has(j+1) && (!aisleSeatsSet.has(j) || j==choiceSeatNo)) {
          j++;
        }else{
          break;
        }
      }
      if(j-i != numSeats-1){
        return reject('Sorry no such seats available!!');
      }
      let result = '{"availableSeats": {"'+ choiceRow +'": [';
      for(let a=i; a<=j; a++){
        result+= a + ', ';
      }
      result = result.slice(0, -2) + ']}}';
      return resolve(JSON.parse(result));
    }, (err) => {
      return reject(err);
    });
  });

};

module.exports = {getSeatAvailableAtChoice};
