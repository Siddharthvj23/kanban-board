let addBtn = document.querySelector('.add-btn');
let modalCont = document.querySelector('.modal-box')
let addTaskflag = false

addBtn.addEventListener('click',(event)=>{
    addTaskflag = !addTaskflag;
    if (addTaskflag == true){
        modalCont.style.display = 'flex'
    }
    else{
        modalCont.style.display = 'none'
    }

})

