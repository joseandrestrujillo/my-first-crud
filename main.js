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
const arrayElem = [];
function addElement() {
    let title = areaTexto.value;
    arrayElem.push(title);
    lista.innerHTML = "";
    arrayElem.forEach((item, index)=>{
        lista.innerHTML += ` <li id="li-${index}" class="list-element">${item}<button class="delete" onclick="deleteElement(${index})">x</button></li>`
    })
}
function deleteElement(index) {
    lista.removeChild(lista.querySelector(`#li-${index}`));
}