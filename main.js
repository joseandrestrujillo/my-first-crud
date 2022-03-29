/**
The CRUD must includes:
- Add a new item option.
- Delete an existing item.
- Edit an existing item.
- Possibly to mark an item as complete.
- Filter option to search items by a word or if there are completed or not.
- All items will be save on the localStorage.
 */
const textArea = document.querySelector("#text-area");
const list = document.querySelector("#list");
const edit = document.querySelector("#edit-form");
const filterForm = document.querySelector("#filters");
const addForm = document.querySelector("#addform");
let arrayElements = [];

if ((typeof(Storage) !== "undefined") & (JSON.parse(localStorage.getItem("list-crud")) !== null)) {
    arrayElements = JSON.parse(localStorage.getItem("list-crud"));
}


updateList();

filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filter();
});

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addElement();
    textArea.value = "";
});
class Element {
    constructor(content){
        this.content = content;
        this.checked = false;
    }
}

function updateCheck(element){
    element.checked = !element.checked;
    if (typeof(Storage) !== "undefined"){
        localStorage.setItem("list-crud", JSON.stringify(arrayElements));
    }
}

 function updateList(showVector = undefined){
     edit.innerHTML = "";
     list.innerHTML = "";
     if(showVector === undefined){
        arrayElements.forEach((item, index)=>{
            let li = document.createElement("li");
            li.classList = "card d-flex flex-row align-items-center justify-content-between p-4 m-2";
                li.innerHTML = `
                    <span class="font-monospace card-title fs-5 text-center fw-bold">
                        ${item.content}
                    </span>
                    <span class="form-switch d-flex align-items-center">
                        <input type="checkbox" class="form-check-input m-1" id="complete-${index}" onclick="updateCheck(arrayElements[${index}])">
                        <button class="btn btn-danger m-1" onclick="deleteElement(${index})">x</button>
                        <button class="btn btn-success m-1" onclick="openEdit(${index})">Edit</button>
                    </span>
                `;
                list.appendChild(li);
               if(item.checked){
                    const strCheck = `#complete-${index}`;
                    document.querySelector(strCheck).checked = true;
                }
        });
     }else{
        arrayElements.forEach((item, index)=>{
            if(showVector[index]){
                let li = document.createElement("li");
                li.classList = "card d-flex flex-row align-items-center justify-content-between p-4 m-2";
                li.innerHTML = `
                    <span class="font-monospace card-title fs-5 text-center fw-bold">
                        ${item.content}
                    </span>
                    <span class="form-switch d-flex align-items-center">
                        <input type="checkbox" class="form-check-input m-1" id="complete-${index}" onclick="updateCheck(arrayElements[${index}])">
                        <button class="btn btn-danger m-1" onclick="deleteElement(${index})">x</button>
                        <button class="btn btn-success m-1" onclick="openEdit(${index})">Edit</button>
                    </span>
                `;
                list.appendChild(li);
               if(item.checked){
                    const strCheck = `#complete-${index}`;
                    document.querySelector(strCheck).checked = true;
                }
            }
        })
     }
     
 }
 function addElement() {
     let title = textArea.value;
     let element = new Element(title);
     arrayElements.push(element);
     updateList();
     if (typeof(Storage) !== "undefined"){
         localStorage.setItem("list-crud", JSON.stringify(arrayElements));
     }
 }
 function deleteElement(index) {
    arrayElements.forEach((value, indice)=>{
        if(indice > index){
            aux = value;
            value = arrayElements[indice - 1];
            arrayElements[indice - 1] = aux;
        }
     });
     arrayElements.pop();
     updateList();
    if (typeof(Storage) !== "undefined"){
        localStorage.setItem("list-crud", JSON.stringify(arrayElements));
    }
 }

 function openEdit(index){
    edit.innerHTML = `
    Tarea
    <input type="text" placeholder="Introduce el nombre de la tarea" id="input-name">
    <button id="submit-edit" class="submit-edit" onclick="submitEdit(${index})">Cambiar</button>
    `
 }
 function submitEdit(index){
    arrayElements[index].content = document.querySelector("#input-name").value;
    updateList();
    if (typeof(Storage) !== "undefined"){
        localStorage.setItem("list-crud", JSON.stringify(arrayElements));
    }
 }
 function parseBool(complete){
     switch(complete){
         case "both":{
             return "both";
         }break;
         case "complete":{
             return true;
         }break;
         case "incomplete":{
             return false;
         }break;
     }
 }
 function filter(){
    let complete = document.querySelector('input[name="complete"]:checked').value;
    const search = document.querySelector("#text-filter").value;
    let showVector =[];
    complete = parseBool(complete);
    arrayElements.forEach((value) => {
        if((value.content.includes(search)) & (complete === "both" ? (true) : (value.checked === complete))){
            showVector.push(true);
        }else{
            showVector.push(false);
        }
    });
    updateList(showVector);
 }