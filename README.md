# My first CRUD in JavaScript Vanilla
This is my first CRUD project and it is based on JavaScript Vanilla. I have tried to include the most important concepts of web development in JS in this project in order to learn as much as possible from it. The CRUD includes:
- Add a new item option.
- Delete an existing item.
- Edit an existing item.
- Possibly to mark an item as complete.
- Filter option to search items by a word or if there are completed or not.
- All items will be save on the localStorage.

## The project's structure
This project has been developed with the MVC pattern. I decide to use it because, without it, the code turn into usually knows "espagueti code" and it could be unscalable and hard to maintain. To implement the pattern I have created four JavaScript files:
- **"view.js"**: This file contains the class View. Its function is controlate the interface and manipulate the DOM.
-**"model.js"**: This file contains the class Model. Its function is process the data from the controler and save/load/edit the local storage data.
-**"controller.js"**: This file contains the class Controller. Its function is process user interaction with the DOM and controlate the model and view actions.
- **"main.js"**: This is the main file and contains the Model, View and Controller implements. Its function is link the model, the view and the controller.

## The project's interface
The project's interface has been developed with a CSS framework know as Bootstrap. 