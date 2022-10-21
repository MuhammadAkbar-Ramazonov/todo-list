const elForm = document.querySelector(".hero-form");
const elInput = elForm.querySelector(".hero-input");
const elList = document.querySelector(".hero-list");

const arr = []


elForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  const elInputValue = elInput.value;
  const obj = {
      num: "",
      textValue: elInputValue,
  }

  arr.push(obj);
  elForm.reset();
  elList.innerHTML = "";

  for (let i = 0; i < arr.length; i++) { 
    arr[i].num = i+1;
    const elItem = document.createElement("li");
    elItem.classList.add("p-4", "bg-warning", "rounded-3", "d-flex", "mb-4", "align-items-center");
    
    const elNumber = document.createElement("span");
    elNumber.classList.add("d-inline-block", "me-2");
    elNumber.textContent = arr[i].num + ".";
    elItem.appendChild(elNumber);
    
    const elCheckBox = document.createElement("input");
    elCheckBox.classList.add("form-check-input", "me-3");
    elCheckBox.setAttribute("type", "checkbox");
    elItem.appendChild(elCheckBox);
    
    const elText = document.createElement("p")
    elText.classList.add("me-4", "mb-0");
    elText.textContent = arr[i].textValue;
    elItem.appendChild(elText);
    
    const elDelate = document.createElement("button");
    elDelate.classList.add("btn", "btn-danger", "me-3");
    elDelate.textContent = "Remove"
    elItem.appendChild(elDelate);
    
    const elAdd = document.createElement("button");
    elAdd.classList.add("btn", "btn-primary");
    elAdd.textContent = "Add";
    elItem.appendChild(elAdd);
    
    elList.appendChild(elItem);
}
})