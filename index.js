let addBtn = document.querySelector('.add-btn');
let modalCont = document.querySelector('.modal-cont')
let allPriorityColors = document.querySelectorAll('.priority-color')
let textAreaCont = document.querySelector('.textArea-cont')
let maincont = document.querySelector('.main-cont')
let addTaskflag = false
let modalPriorityColor = 'lightpink'

addBtn.addEventListener('click',(event)=>{
    addTaskflag = !addTaskflag;
    if (addTaskflag == true){
        modalCont.style.display = 'flex'
    }
    else{
        modalCont.style.display = 'none'
    }

})

//selecting all ticket color
allPriorityColors.forEach(colorEle =>{
    colorEle.addEventListener('click',(event)=>{
        //remove active class from all divs
        allPriorityColors.forEach(priorityColor =>{
            priorityColor.classList.remove('active')
        })
        //add active classs on div that is clicked
        colorEle.classList.add('active')
        modalPriorityColor = colorEle.classList[0]
    })
})

//ticket creation
modalCont.addEventListener('keydown',(event)=>{
    let keyPressed = event.key
    if (keyPressed==='Shift'){
        //ticket create
        let ticketDesc = textAreaCont.value
        let ticketId = shortid()
        createTicket(modalPriorityColor,ticketId,ticketDesc)
        //close modal
        modalCont.style.display = 'none'
        addTaskflag = !addTaskflag
        //clear textarea
        textAreaCont.value=''
    }
})

function createTicket (ticketColor,ticketId,ticketDesc) {

    let ticketCont = document.createElement('div')

    ticketCont.classList.add('ticket-cont');


    maincont.appendChild(ticketCont)}