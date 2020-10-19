console.log('in Client.JS');
$(document).ready(onReady);

setInterval(refreshCalculator, 500);

let newMathObject;
function onReady() {
  console.log('IM ready');
  //onClick listener events
  $(document).on('click', '#additionBtn', additionClick);
  $(document).on('click', '#subtractionBtn', subtractionClick);
  $(document).on('click', '#multiplicationBtn', multiplyClick);
  $(document).on('click', '#divisionBtn', divisionClick);
  $(document).on('click', '#equalsBtn', equalsClick);
  $(document).on('click', '#clearBtn', clearClick);
  $(document).on('click', '#delButton', delOnClick);
  $(document).on('click', '.solutionsDisplay', solutionClick);
  refreshCalculator();
}
//the logic here is to clear any existing data value and then add data-oper with button clicked
function additionClick() {
  // $('#firstNumberIn').data('');
  $('#firstNumberIn').data('oper', '+');
  console.log('should set data-oper to add');
}
function clearClick() {
  $('#firstNumberIn').val('');
  $('#secondNumberIn').val('');
  $('#firstNumberIn').data('oper', '');
}
// delete button stretch goal
function delOnClick() {
  $.ajax({
    type: 'DELETE',
    url: '/calculator',
  }).then(function (response) {
    console.log(response);
    //deletes the displayed answer
    $('#calcSolution').text('');
  });
  refreshCalculator();
}

function divisionClick() {
  // $('#firstNumberIn').data('');
  $('#firstNumberIn').data('oper', '/');
  console.log('should set data-oper to divide');
}
function multiplyClick() {
  // $('#firstNumberIn').data('');
  $('#firstNumberIn').data('oper', '*');
  console.log('should set data-oper to multi');
}
//Stretch goal click a equation in the history to rerun that problem
function solutionClick() {
  console.log($(this));
  console.log($(this).children('#firstNum'));
  //target
  newMathObject = {
    firstNumber: $(this).children('#firstNum').text(),
    mathOperator: $(this).children('#mathOperator').text(),
    secondNumber: $(this).children('#secondNum').text(),
  };
  console.log('you clicked an answer', newMathObject);
  //create ajax connection to post to /calculator
  $.ajax({
    url: '/calculator',
    method: 'POST',
    data: newMathObject,
  })
    .then(function (response) {
      console.log('sent a calculation', response);
    })
    .catch(function (errorInfo) {
      console.log('ruh-roh', errorInfo);
    });
  //refresh the dom and show all items
  refreshCalculator();
}
function subtractionClick() {
  // $('#firstNumberIn').data('');
  $('#firstNumberIn').data('oper', '-');
  console.log('should set data-oper to sub');
}

//create new object and pass in the values from the dom
function equalsClick() {
  //check that fields are both filled for form
  if ($('#firstNumberIn').val() !== '' && $('#secondNumberIn').val() !== '') {
    if (
      //check to ensure a operator data is assigned or fail it
      $('#firstNumberIn').data('oper') === '-' ||
      $('#firstNumberIn').data('oper') === '+' ||
      $('#firstNumberIn').data('oper') === '*' ||
      $('#firstNumberIn').data('oper') === '/'
    ) {
      newMathObject = {
        firstNumber: $('#firstNumberIn').val(),
        mathOperator: $('#firstNumberIn').data('oper'),
        secondNumber: $('#secondNumberIn').val(),
      };
      //create ajax connection to post to /calculator
      $.ajax({
        url: '/calculator',
        method: 'POST',
        data: newMathObject,
      })
        .then(function (response) {
          console.log('sent a calculation', response);
        })
        .catch(function (errorInfo) {
          console.log('ruh-roh', errorInfo);
        });
      //refresh the dom and show all items
    } else {
      alert('all fields must be fulled, and an operator selected');
      return false;
    }
  } else {
    alert('all fields must be fulled, and an operator selected');
    return false;
  }
  refreshCalculator();
}

function refreshCalculator() {
  $.ajax({
    url: '/calculator',
    method: 'GET',
  })
    .then((databaseCalcRows) => {
      console.log('We got a response!', databaseCalcRows);
      // Render the activities
      {
        $('tbody').empty();
        for (let numbers of databaseCalcRows) {
          $('tbody').append(`
        <tr class="solutionsDisplay">
        <span>
          <td id="firstNum" data-value"${numbers.firstNumber}">${numbers.firstNumber}</td>
          <td id="mathOperator" data-value"${numbers.mathOperator}">${numbers.mathOperator}</td>
          <td id="secondNum" data-value"${numbers.secondNumber}">${numbers.secondNumber}</td>
          <td data-value"${numbers.firstNumber}"> = ${numbers.solution}</td>
         </span>
          </tr>
      `);
          //set the displayed value to be the first item in the 10 object array
          $('#calcSolution').text(databaseCalcRows[0].solution);
          //reset the data-oper to '' to trigger the check/fail logic
          // $('#firstNumberIn').data('oper', '');
        }
      }
    }) //end AJAX .then
    .catch(() => {
      //default value for empty DB in the event get fails
      $('#calcSolution').text(' ');
    }); // end of AJAX .catch
} //end for loop
