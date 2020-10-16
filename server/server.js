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
  let queryText = `SELECT * FROM "calc_history" ORDER BY "id" DESC LIMIT 10;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('results from get:', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error completing child info post query', err);
      res.sendStatus(500);
    });
});

app.post('/calculator', (req, res) => {
  console.log('I got a request!', req.body);
  let newMathObject = req.body;
  const queryText = `INSERT INTO "calc_history" 
    ("firstNumber", "mathOperator", "secondNumber", "solution")
    VALUES ($1, $2, $3, $4);`;
  // Server-side validation
  if (newMathObject.mathOperator === undefined) {
    res.sendStatus(400);
    alert('math operator must be defined');
    return;
  }
  serverSideCalc(newMathObject);
  function serverSideCalc() {
    //if data-oper = logic
    if (newMathObject.mathOperator === '-') {
      calcSolution = newMathObject.firstNumber - newMathObject.secondNumber;
      console.log('answer is:', calcSolution);
    } else if (newMathObject.mathOperator === '+') {
      calcSolution =
        Number(newMathObject.firstNumber) + Number(newMathObject.secondNumber);
      console.log('answer is:', calcSolution);
    } else if (newMathObject.mathOperator === '/') {
      calcSolution = newMathObject.firstNumber / newMathObject.secondNumber;
      console.log('answer is:', calcSolution);
    } else if (newMathObject.mathOperator === '*') {
      calcSolution = newMathObject.firstNumber * newMathObject.secondNumber;
      console.log('answer is:', calcSolution);
    } else {
      console.log('this aint right');
    }

    pool
      .query(queryText, [
        req.body.firstNumber,
        req.body.mathOperator,
        req.body.secondNumber,
        '1',
      ])

      .then(() => {
        console.log('we are sending:', pool.query);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error completing child info post query', err);
        res.sendStatus(500);
      });
  }

  // add new key to object
  newMathObject.solution = calcSolution;
});
app.delete('/calculator', (req, res) => {
  let queryText = ` DROP TABLE "calc_history";
 
 CREATE TABLE "calc_history" (
    "id" SERIAL PRIMARY KEY,
    "firstNumber" VARCHAR (80) NOT NULL,
  "mathOperator" VARCHAR (80) NOT NULL,
  "secondNumber" VARCHAR (80) NOT NULL,
    "solution" VARCHAR (80) NOT NULL,
    "time" TIME DEFAULT NOW()
    )
   ;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('dropped table and rebuilt it');
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error completing child info post query', err);
      res.sendStatus(500);
    });
});
