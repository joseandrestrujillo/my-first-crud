/**
 * El CRUD debe contener:
 * -Opción de añadir un elemento nuevo.
 * -Opción de eliminar un elemento ya existente.
 * -Opción de editar un elemento existente.
 * -Filtro de realizado o no realizado.
 * -Buscador de palabras.
 * -Todo debe guardarse en el localStorage
 */
const areaTexto = document.querySelector("#text-area");
const lista = document.querySelector("#list");
const edit = document.querySelector("#edit-form");
const filterForm = document.querySelector("#filters");
const addForm = document.querySelector("#addform");
let arrayElements = [];

if ((typeof(Storage) !== "undefined") & (JSON.parse(localStorage.getItem("lista-crud")) !== null)) {
    arrayElements = JSON.parse(localStorage.getItem("lista-crud"));
}


updateList();

filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrar();
});

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addElement();
    areaTexto.value = "";
});
class Elemento {
    constructor(content){
        this.content = content;
        this.checked = false;
    }
}

function updateCheck(elemento){
    elemento.checked = !elemento.checked;
    if (typeof(Storage) !== "undefined"){
        localStorage.setItem("lista-crud", JSON.stringify(arrayElements));
    }
}

 function updateList(vectorMostrar = undefined){
     edit.innerHTML = "";
     lista.innerHTML = "";
     if(vectorMostrar === undefined){
        arrayElements.forEach((item, index)=>{
            let li = document.createElement("li");
                li.innerHTML = `
                ${item.content}
                    <input type="checkbox" id="complete-${index}" onclick="updateCheck(arrayElements[${index}])">
                    <button class="delete" onclick="deleteElement(${index})">x</button>
                    <button class="open-edit" onclick="openEdit(${index})">Edit</button>
                `;
                lista.appendChild(li);
               if(item.checked){
                    const strCheck = `#complete-${index}`;
                    document.querySelector(strCheck).checked = true;
                }
        });
     }else{
        arrayElements.forEach((item, index)=>{
            if(vectorMostrar[index]){
                let li = document.createElement("li");
                li.innerHTML = `
                ${item.content}
                    <input type="checkbox" id="complete-${index}" onclick="updateCheck(arrayElements[${index}])">
                    <button class="delete" onclick="deleteElement(${index})">x</button>
                    <button class="open-edit" onclick="openEdit(${index})">Edit</button>
                `;
                lista.appendChild(li);
               if(item.checked){
                    const strCheck = `#complete-${index}`;
                    document.querySelector(strCheck).checked = true;
                }
            }
        })
     }
     
 }
 function addElement() {
     let title = areaTexto.value;
     let element = new Elemento(title);
     arrayElements.push(element);
     updateList();
     if (typeof(Storage) !== "undefined"){
         localStorage.setItem("lista-crud", JSON.stringify(arrayElements));
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
        localStorage.setItem("lista-crud", JSON.stringify(arrayElements));
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
        localStorage.setItem("lista-crud", JSON.stringify(arrayElements));
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
 function filtrar(){
    let complete = document.querySelector('input[name="complete"]:checked').value;
    const search = document.querySelector("#text-filter").value;
    let vectorMostrar =[];
    complete = parseBool(complete);
    arrayElements.forEach((value) => {
        if((value.content.includes(search)) & (complete === "both" ? (true) : (value.checked === complete))){
            vectorMostrar.push(true);
        }else{
            vectorMostrar.push(false);
        }
    });
    updateList(vectorMostrar);
 }