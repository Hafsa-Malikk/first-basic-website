
const form = document.querySelector('#addForm');
const btnSubmit = document.querySelector('input[type="submit"]');
const itemList = document.getElementById('items');
const filterItem = document.getElementById('filter');


form.addEventListener('submit',eventCaller);
itemList.addEventListener('click',removeList);
filterItem.addEventListener('keydown',filterItems);

function eventCaller(e){
    e.preventDefault();
    
    const inputValue =document.getElementById('item');
    const list = document.getElementById('items');
    const newItem = document.createElement('li');
    const btn = document.createElement('button');
    newItem.className="list-group-item";
    newItem.textContent = inputValue.value;

    btn.classList.add('btn','btn-danger','btn-sm','float-end','delete');
    btn.textContent = 'X';

    newItem.appendChild(btn);

    list.appendChild(newItem);

    inputValue.value = '';

}


// inputField.addEventListener('keydown',function(event){
//     if(event.key === "Enter"){
//         eventCaller();
//     }
// });


function removeList(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Do you want to delete? ")){
            let delItem = e.target.parentElement;
            itemList.removeChild(delItem);
        }
    }
}

function filterItems(e){
    let text = e.target.value.toLowerCase();
    let list = document.getElementsByTagName('li');
    Array.from(list).forEach(function(item){
        let itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!= -1){
            item.style.display = "block";
        }
        else{
            item.style.display = 'none';
        }
    });


}























// let items = document.querySelectorAll('.list-group-item');
// let oddItems = document.querySelectorAll('.list-group-item:nth-child(odd)');
// let evenItems = document.querySelectorAll('.list-group-item:nth-child(even)');
// const header = document.querySelector('#main-header');
// const container = document.querySelector('header .container');
// const heading = document.querySelector('.container h1');

// const newDiv = document.createElement('div');

// newDiv.id = 'newDiv';
// newDiv.className = 'newDivClass';
// newDiv.setAttribute('title','header-div');

// newDiv.textContent = "Hello World!!";


// container.insertBefore(newDiv,heading);

// newDiv.style.fontSize = '1rem';
// newDiv.style.color = '#ccc';


// const input = document.querySelector('input');

// input.placeholder = "Enter your text";

// console.log(header);

// header.style.borderBottom = '2px solid #ccc';

// for(let i =0;i <items.length;i++){

//     oddItems[i].style.backgroundColor = '#ccc';
//     evenItems[i].style.backgroundColor = '#f4f4f4';
    
// }