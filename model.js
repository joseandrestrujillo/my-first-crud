class Element {
    constructor(content){
        this.content = content;
        this.checked = false;
    }
}
export default class Model {
    constructor(){
        this.list = [];
        if ((typeof(Storage) !== "undefined") & (JSON.parse(localStorage.getItem("list-crud")) !== null)) {
            this.list = JSON.parse(localStorage.getItem("list-crud"));
        }
        this.view;
        this.controller;
        
    }
    saveLocal(){
        if (typeof(Storage) !== "undefined"){
            localStorage.setItem("list-crud", JSON.stringify(this.list));
        }
    }
    addElement(title) {
        let element = new Element(title);
        this.list.push(element);
        this.saveLocal();
        this.view.updateList();
    }
    updateCheck(id){
        this.list[id].checked = !this.list[id].checked;
        this.saveLocal();
    }
    deleteElement(index) {
        this.list.forEach((value, indice)=>{
            if(indice > index){
                let aux = value;
                value = this.list[indice - 1];
                this.list[indice - 1] = aux;
            }
         });
        this.list.pop();
        this.view.updateList();
        this.saveLocal();
    }
    editElement(index, newContent){
        this.list[index].content = newContent; /*document.querySelector("#input-name").value;*/
        this.saveLocal();
        this.view.updateList();
    }
    filter(){
        let complete = document.querySelector('input[name="complete"]:checked').value;
        const search = document.querySelector("#text-filter").value;
        let showVector =[];
        complete = parseBool(complete);
        this.list.forEach((value) => {
            if((value.content.includes(search)) & (complete === "both" ? (true) : (value.checked === complete))){
                showVector.push(true);
            }else{
                showVector.push(false);
            }
        });
        this.list.updateList(showVector);
    }
}