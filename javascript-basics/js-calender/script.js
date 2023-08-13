const select = document.querySelector("select");
const h1 = document.querySelector("h1");
const list = document.querySelector("ul");

select.addEventListener("change",()=>
{
    const option = select.value;

    let days = 31;
    if(option === "February"){
        days = 28;
    }
    else if(option === "April" || option === "June" || option === "September" || option === "November"){
        days = 30;
    }
    createCalender(days,option);
});

function createCalender(days,option){
    h1.textContent = option;
    list.innerHTML='';
    for(let i = 1; i <= days; i++){
        const listItem = document.createElement("li");
        listItem.textContent = i;
        list.appendChild(listItem);
    }


}