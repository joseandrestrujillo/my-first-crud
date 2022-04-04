export default class Controller {
    constructor(view, model){
        this.textArea = document.querySelector("#text-area");
        this.addForm = document.querySelector("#addform");
        this.filterForm = document.querySelector("#filters");
        this.filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.filter();
        });
        this.addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.model.addElement(this.textArea.value);
            this.textArea.value = "";
        });
        this.view = view;
        this.model = model;
    }
    
    updateButtons(index){
        let idCheck = `#complete-${index}`;
        let idDelete = `#delete-${index}`;
        let idEdit = `#edit-${index}`;
        document.querySelector(idCheck).addEventListener("click",function updateCheck(){
            this.model.updateCheck(index)
        });
        document.querySelector(idDelete).addEventListener("click", function updateDelete(){
            this.model.deleteElement(index)
        }) ;
        document.querySelector(idEdit).addEventListener("click", function updateEdit(){
            this.view.showEdit(index, `li-${index}`)
        }) ;
    }

    updateControls(showVector = undefined){
        if( this.model.list !== []){
            if(showVector === undefined){
                this.model.list.forEach((item, index) => {
                    this.updateButtons(index);
                });
            }else{
                this.model.list.forEach((item, index) => {
                    if(showVector[index]){
                        this.updateButtons(index);
                    }
                });
            }
        }
    }
    parseBool(complete){
        switch(complete){
            case "both":{
                return "both";
            }
            case "complete":{
                return true;
            }
            case "incomplete":{
                return false;
            }
        }
    }
    filter(){
        let complete = document.querySelector('input[name="complete"]:checked').value;
        const search = document.querySelector("#text-filter").value;
        let showVector =[];
        complete = this.parseBool(complete);
        this.model.list.forEach((value) => {
            if((value.content.includes(search)) & (complete === "both" ? (true) : (value.checked === complete))){
                showVector.push(true);
            }else{
                showVector.push(false);
            }
        });
        this.view.updateList(showVector);
     }
}