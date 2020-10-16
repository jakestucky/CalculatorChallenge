# Weekend Challenge: Server Side Calculator

Welcome to the weekend challenge!

You are going to be building a server-side calculator. The logic for the calculator **must** be implemented on the server.

## Required Features

### Calculator

[x]-Create a user interface where the user can input two values (2 input elements) and the select type of mathematical operation. When the submit (`=` button) is clicked, capture this input, bundle it up in an object, and send this object to the server via a POST. There should also be a 'C' button that will clear the user input fields.
[x]- install server
[x]- create file structure
[x]- 2 inputs fields
[x]- buttons for the following math operations ( + - \* / )
[x]- on click listener for each button
[x]- create a = button that capture the 2 inputs, bundle it up in an object, [ ]- send this object to the server via a POST
[x]- create a C button that clears inputs

Build out the server-side logic to compute the numbers as appropriate. The server should be able to handle Addition, Subtraction, Multiplication, and Division. Once the calculation is complete, send back the OK. You should do a GET request after the POST to get the actual calculation.

[x]-create function for the logic for each item
[x]- ajax get request to server
[x]- server side app.get

### History

Keep a historical record of all math operations and solutions on the server. Display a list of all previous calculations on the page when it loads using a GET request. Update the list when a new calculation is made.

[x]- get request to server to get the array of all items
[x]- append to DOM the history of calculations
[x]- append to the DOM the solution

> NOTE: History should exist even after refreshing the page. It's expected that the history will go away after restarting the server. We'll talk about long term data storage next week.

---

## ![base mode interface](images/baseMode.png)

> Note: Do not use eval() to complete this assignment.

## Stretch Goals

- Convert the interface to look and behave like a calculator as shown below.

  _Interfaces that mirror real world objects are often more intuitive and self-explanatory for users._

---

## ![calculator interface](images/stretchGoal_interface.gif)

[x]- Only allow the POST call to happen if all necessary input is ready.

[x]-_Data integrity is superfluously important! Sometimes users hit tje "go button" without fully inputting the needed fields. Show an alert if they left something empty and don't send bad or incomplete data to the server._

[x]- Allow a user to clear the history by clicking on a button. Technically this shouldn't be a GET or a POST. Look into making a DELETE request!

_GETs are used to, well, get information from the server. POSTs are used to send new info to the server. DELETEs are used for, you guessed it, deleting info already on the server._

[x]-- Allow a user to click on an entry in the History list to re-run that calculation. This should display the answer on the calculator interface like a normal calculation.

_Anticipating a user's wants and adding the feature in the interface is often a logical progression that ends up in stretch goals for project._

[ ]- Deploy to Heroku!

_Deploying a project makes it available to the masses and is a necessary step for which to prepare when planning a project._
