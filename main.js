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
 let arrayIndex = [];
 let elements = {};
 let currentIndex = 0;
 
 function updateList(){
     edit.innerHTML = "";
     lista.innerHTML = "";
     arrayIndex.forEach((item, index)=>{
         lista.innerHTML += ` <li id="li-${item}" class="list-element">${elements[item]}<button class="delete" onclick="deleteElement(${item})">x</button><button class="open-edit" onclick="openEdit(${item})">Edit</button></li>`
     })
 }
 function addElement() {
     let title = areaTexto.value;
     elements[currentIndex] = title;
     arrayIndex.push(currentIndex);
     currentIndex++;
     updateList();
 }
 function deleteElement(index) {
     arrayIndex = arrayIndex.filter(e => e!= index);
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
    elements[index] = document.querySelector("#input-name").value;
    updateList();
 }