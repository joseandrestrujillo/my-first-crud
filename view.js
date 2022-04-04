export default class View{
    constructor(){
        this.list = document.querySelector("#list");
        this.edit = document.querySelector("#edit-form");
        this.model;
    }
    renderCard(item, index){
        let li = document.createElement("li");
        li.id = `li-${index}`;
        li.classList = "card m-0 mt-2 mb-2 bg-dark";
        li.innerHTML = `
            <div class="bg-light d-flex flex-row align-items-center justify-content-between p-4 m-0">
                <span class="font-monospace card-title fs-5 text-center fw-bold">
                    ${item.content}
                </span>
                <span class="form-switch d-flex align-items-center">
                    <input  id="complete-${index}" type="checkbox" class="form-check-input m-1">
                    <button id="delete-${index}" class="btn btn-danger m-1">x</button>
                    <button id="edit-${index}" class="btn btn-success m-1">Edit</button>
                </span>
            </div>
        `;
        this.list.appendChild(li);
        if(item.checked){
            const strCheck = `#complete-${index}`;
            document.querySelector(strCheck).checked = true;
        }
    }
    updateList(showVector = undefined){
        this.edit.innerHTML = "";
        this.list.innerHTML = "";
        if(showVector === undefined){
           this.model.list.forEach((item, index)=>{
               this.renderCard(item, index);
           });
        }else{
           this.model.list.forEach((item, index)=>{
               if(showVector[index]){
                   this.renderCard(item, index);
               }
           })
        }
        this.controller.updateControls(showVector);
    }
    showEdit(index, id){
        let li = document.getElementById(id);
        if(li.childElementCount === 1){
            let form = document.createElement("form");
            form.id = "edit-form"
            form.classList = " bg-dark input-group w-75 m-auto p-3";
            form.innerHTML =`
                <input  id="input-name" class="form-control" type="text" placeholder="Introduce el nombre de la tarea">
                <button id="submit-edit" class="btn btn-outline-light">Change</button>
            `;
            li.appendChild(form);
            document.querySelector("#edit-form").addEventListener("submit", () => this.model.editElement(index, document.querySelector("#input-name").value));
        }else{
            li.children[1].remove();
        }
     }
}