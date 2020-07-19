"use strict"
var checked=0;//user check count
let todoList=[];//to store objects loaded
$(document).ready( () => {
    //loading json  from url using ajax


    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (this.readyState==4&&this.status==200) {
             const todos=this.responseText;
             todoList=JSON.parse(todos);
             loadtodoList();
             
        }
    };
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();
    //show ajax list to page
    const loadtodoList = () => {
        let todoItems='';
        todoList.forEach(element => {
            const {id,title,completed} = element;
            if (completed === true) {
                todoItems += `<p><button type="button" class="checkbutton" disabled  onclick="clickEvent(${id})"><i class="fa fa-check"></i></button> ${id}. ${title} </p>`;
            } else {
                todoItems += `<p><button type="button" class="checkbutton"  onclick="clickEvent(${id})"></button> ${id}. ${title} </p>`;//`<p><input type="checkbox"  onchange="clickEvent(checked,${id})"  > ${id}. ${title} </p>`
            }
        });
        $("#list").html(todoItems);
        $('input[type="checkbox"]').css("backgroundColor","red")
    }
    //toggle navbar
    $(".fa-bars").click(() =>{
        console.log("working")
    })

})
const current = document.getElementsByClassName("checkbutton");
const clickEvent = (id) => {
    const pr = clickEvent1(id);
    pr.then( success => checkFive(success) )
    .catch( num => checkFive(num))
    .then( msg => alert(msg));
}

//selecting 5 items  checking
function checkFive(checkNumber){
    return new Promise((resolve,reject) => {
        if (checkNumber>=5) {
            resolve(`Congrats: ${checkNumber} Tasks have been Successfully Completed `);
        }
    })
}
       

function clickEvent1(id){//the promise returned to check task completed
    return new Promise((resolve,reject) => {
        const status=todoList[id-1].completed;
    if (!status) {
            ++checked;
            current[id-1].innerHTML=`<i class="fa fa-check"></i>`;
            todoList[id-1].completed=true;
            resolve(checked)

    } else {        
            checked--;
            current[id-1].innerHTML=``
            todoList[id-1].completed=false;
            reject(checked)

    }
    })
}

//navbar query
let arr =[false,false]
function myfunction(x){
    if(arr[x]) $(`.link${x}`).css({ "opacity" : "0", "pointer-events" : "none"});
    else $(`.link${x}`).css({ "opacity" : "1", "pointer-events" : "all"});
    arr[x] = !arr[x]
}
$(window).resize(function(){
    if ($(window).width() > 700) {  
        $(`.link0`).css({ "opacity" : "1", "pointer-events" : "all"});
        $(`.link1`).css({ "opacity" : "1", "pointer-events" : "all"});
    } 
    else{
        $(`.link0`).css({ "opacity" : "0", "pointer-events" : "none"});
        $(`.link1`).css({ "opacity" : "0", "pointer-events" : "none"});
        arr =[false,false]
    }    
});