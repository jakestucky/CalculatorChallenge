const express = require('express');
const bodyParser = require('body-parser');
//create app for express to look for
const app = express();
//create listener  app.listen(port,function)
const PORT = process.env.PORT || 5000;
//bring in DB pool.js info
const pool = require('../server/public/modules/pool');
//Listener
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
//serve static files
console.log('look at me I am a server');

let serverSideCalcArray = [];
let calcSolution;

// GET /calculator
// Respond with array of calc solves
app.get('/calculator', (req, res) => {
  res.send(serverSideCalcArray);
  console.log('sending back the array', serverSideCalcArray);
});

app.post('/calculator', (req, res) => {
  // console.log('I got a request!', req.body);
  // let newMathObject = req.body;
  // Server-side validation
  // if (newMathObject.mathOperator === undefined) {
  //   res.sendStatus(400);
  //   alert('math operator must be defined');
  //   return;
  // }
  const queryText = `INSERT INTO "calc_history" 
    ("firstNumber", "mathOperator", "secondNumber")
    VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [
      req.body.firstNumber,
      req.body.mathOperator,
      req.body.secondNumber,
    ])

    .then(() => {
      console.log('we are sending:', pool.query);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Error completing child info post query', err);
      res.sendStatus(500);
    });
  // serverSideCalc = (newMathObject) => {
  //   //if data-oper = logic
  //   if (newMathObject.mathOperator === '-') {
  //     calcSolution = newMathObject.firstNumber - newMathObject.secondNumber;
  //     console.log('answer is:', calcSolution);
  //   } else if (newMathObject.mathOperator === '+') {
  //     calcSolution =
  //       Number(newMathObject.firstNumber) + Number(newMathObject.secondNumber);
  //     console.log('answer is:', calcSolution);
  //   } else if (newMathObject.mathOperator === '/') {
  //     calcSolution = newMathObject.firstNumber / newMathObject.secondNumber;
  //     console.log('answer is:', calcSolution);
  //   } else if (newMathObject.mathOperator === '*') {
  //     calcSolution = newMathObject.firstNumber * newMathObject.secondNumber;
  //     console.log('answer is:', calcSolution);
  //   } else {
  //     console.log('this aint right');
  //   }
  // }; //db call to add to DB

  // res.sendStatus(201);

  // add new key to object
  // newMathObject.solution = calcSolution;
  // serverSideCalcArray.push(newMathObject);

  // console.log('new obj', newMathObject);
});
app.delete('/calculator', (req, res) => {
  serverSideCalcArray = [];
  res.sendStatus(201);
});
