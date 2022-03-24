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
 const edit = document.querySelector("#edit-form")
 let arrayElements = [];

 function eliminarIndice(index){
     arrayIndex.forEach((value, indice)=>{
        if(indice > index){
            aux = value;
            value = arrayIndex[indice - 1];
            arrayIndex[indice - 1] = aux;
        }
     });
     arrayIndex.pop();
 }

 function updateList(){
     edit.innerHTML = "";
     lista.innerHTML = "";
     arrayElements.forEach((item, index)=>{
         lista.innerHTML += ` <li id="li-${index}" class="list-element">${item}<button class="delete" onclick="deleteElement(${index})">x</button><button class="open-edit" onclick="openEdit(${index})">Edit</button></li>`
     })
 }
 function addElement() {
     let title = areaTexto.value;
     arrayElements.push(title);
     updateList();
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
 }

 function openEdit(index){
    edit.innerHTML = `
    Tarea
    <input type="text" placeholder="Introduce el nombre de la tarea" id="input-name">
    <button id="submit-edit" class="submit-edit" onclick="submitEdit(${index})">Cambiar</button>
    `
 }
 function submitEdit(index){
    arrayElements[index] = document.querySelector("#input-name").value;
    updateList();
 }