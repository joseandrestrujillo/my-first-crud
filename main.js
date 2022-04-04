/**
The CRUD must includes:
- Add a new item option.
- Delete an existing item.
- Edit an existing item.
- Possibly to mark an item as complete.
- Filter option to search items by a word or if there are completed or not.
- All items will be save on the localStorage.
 */
import Model from "./model.js"
import View from "./view.js"
import Controller from "./controller.js"

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
model.view = view;
model.controller = controller;
view.model = model;
view.controller = controller;

view.updateList();