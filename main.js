// variables
const elForm = document.querySelector(".hero-form");
const elInput = elForm.querySelector(".hero-input");
const elFormBtn = elForm.querySelector(".form-btn");
const elList = document.querySelector(".hero-list");
const elAllNum = document.querySelector(".all-number");
const elUncomplateNum = document.querySelector(".uncomplate-number");
const elComplateNum = document.querySelector(".complate-number");

const arr = [];


// create element in the DOM
function NumArray(){
    elList.innerHTML = "";
    const chekNumber = {
        all: 0,
        uncomplate: 0,
        complate: 0,
    };
    
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = i;
        const elItem = document.createElement("li");
        const elNumber = document.createElement("span");
        const elCheckBox = document.createElement("input");
        const elText = document.createElement("p")
        const elBtnBox = document.createElement("div");
        const elEdit = document.createElement("button");
        const elSave = document.createElement("button");
        const elDelate = document.createElement("button");

        elItem.classList.add("p-4", "d-flex", "justify-content-center","w-100", "bg-warning", "rounded-3", "d-flex", "mb-4", "align-items-center");
        elNumber.classList.add("me-2", "d-inline-block");
        elNumber.textContent = (arr[i].id+1) + ".";
        elCheckBox.classList.add("checkbox", "form-check-input", "me-3");
        elCheckBox.setAttribute("type", "checkbox");
        elCheckBox.dataset.id = arr[i].id;
        elText.classList.add("me-4", "mb-0");
        
        elText.textContent = arr[i].title;

        if(arr[i].isComplate){
            elText.style.textDecoration = "line-through";
            elItem.classList.add("bg-secondary");
            elEdit.classList.add("bg-secondary");
            elSave.classList.add("bg-secondary");
            elDelate.classList.add("bg-secondary");

            elItem.classList.remove("bg-warning");

            elCheckBox.setAttribute("checked", "");
            chekNumber.complate++;
        }
        else{
            elCheckBox.removeAttribute("checked");
            chekNumber.uncomplate++;
        }


        elEdit.classList.add("edit-btn", "btn", "btn-info", "me-3");
        elEdit.textContent = "Edit";
        elEdit.dataset.id = arr[i].id;


        elSave.classList.add("save-btn", "btn", "btn-success", "me-3");
        elSave.textContent = "Save";
        elSave.dataset.id = arr[i].id;

        elDelate.classList.add("delate-btn", "btn", "btn-danger");
        elDelate.textContent = "Delate";
        elDelate.dataset.id = arr[i].id;

        elBtnBox.appendChild(elEdit);
        elBtnBox.appendChild(elSave);
        
        elBtnBox.appendChild(elDelate);

        elItem.appendChild(elNumber);
        elItem.appendChild(elCheckBox);
        elItem.appendChild(elText);
        elItem.appendChild(elBtnBox);

        elList.appendChild(elItem);
        chekNumber.all++;
    }

    elAllNum.textContent = chekNumber.all;
    elUncomplateNum.textContent = chekNumber.uncomplate;
    elComplateNum.textContent = chekNumber.complate;
};

// obj
const FormTypes = {
    edit: "edit",
    add: "add",
};

let formType = FormTypes.add;
let editId = null;

// events
elForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elInputValue = elInput.value;
    
    if(formType === FormTypes.add){
        const obj = {
            id: 0,
            title: elInputValue,
            isComplate: false,
        };
    
        arr.push(obj);
        elForm.reset();
        NumArray()
    }
    else if(formType === FormTypes.edit){
        const obj = {
            id: editId,
            title: elInputValue,
            isComplate: false,
        };

        const EditIndex = arr.findIndex(function(element){
            return element.id === obj.id
        });

        arr.splice(EditIndex, 1, obj);
        elForm.reset();
        NumArray();
        formType = FormTypes.add;
        elFormBtn.textContent = "Add";
    }
});

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".delate-btn") ){
        const delateBtnId = Number(evt.target.dataset.id);
        arr.splice(delateBtnId, 1);
        NumArray()
    }
    else if(evt.target.matches(".edit-btn")){
        const EditBtnId = Number(evt.target.dataset.id);

        const Edited = arr.find(function(todo){
            return todo.id === EditBtnId;
        });

        editId = EditBtnId
        elInput.value = Edited.title
        elFormBtn.textContent = "Edit";
        formType = FormTypes.edit;
    }
    else if(evt.target.matches(".checkbox")){
        const checkId = Number(evt.target.dataset.id);

        const checked = arr.find(function(todo){
            return todo.id === checkId;
        });

        if(!checked.isComplate){
            checked.isComplate = true;
        }
        else{
            checked.isComplate = false;
        }
        NumArray()
    }
});