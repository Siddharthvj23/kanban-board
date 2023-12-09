let addBtn = document.querySelector('.add-btn');
let modalCont = document.querySelector('.modal-cont')
let allPriorityColors = document.querySelectorAll('.priority-color')
let textAreaCont = document.querySelector('.textArea-cont')
let maincont = document.querySelector('.main-cont')
const saveBtn = document.querySelector('#save-btn')
const deleteButton = document.querySelector('.remove-btn')
let addTaskflag = false
let ticketStatus = 'To-Do'
let deleteTickerModeIsOn = false

const statusToColorMapping = {
    'To-Do': 'lightpink',
    'In-Process': 'lightgreen',
    'Review': 'lightblue',
    'Done': 'lightbrown'
}
const orderOfStatuses = Object.keys(statusToColorMapping)

addBtn.addEventListener('click', () => {
    addTaskflag = !addTaskflag;
    if (addTaskflag == true) {
        modalCont.style.display = 'flex'
    }
    else {
        modalCont.style.display = 'none'
    }

})

//selecting all ticket color
allPriorityColors.forEach((element) => {
    element.addEventListener('click', () => {
        allPriorityColors.forEach((element) => {
            element.classList.remove('active');
        })
        element.classList.add('active');
        ticketStatus = element.innerText;
    })
})

//ticket creation
saveBtn.addEventListener('click', (event) => {
    //ticket create
    let ticketDesc = textAreaCont.value
    // let ticketId = shortid()
    createTicket(ticketStatus, ticketDesc)
    //close modal
    modalCont.style.display = 'none'
    addTaskflag = !addTaskflag
    //clear textarea
    textAreaCont.value = ''
})

// activate delete mode
deleteButton.addEventListener('click', (event) => {
    deleteTickerModeIsOn = !deleteTickerModeIsOn
    if (deleteTickerModeIsOn) {
        alert("Delete Ticket Mode is Activated!")
        deleteButton.style.color = 'red'
    } else {
        deleteButton.style.color = 'white'
    }
})

function createTicket(ticketStatus, ticketDesc) {
    let ticketCont = document.createElement('div')
    ticketCont.classList.add('ticket-cont');
    const color = statusToColorMapping[ticketStatus]

    ticketCont.innerHTML = `
    <div class="ticket-color ${color}">${ticketStatus}</div>
    <div class="ticket-id">${shortid()}</div>
    <div class="task-area">${ticketDesc}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `
    ticketCont.addEventListener('click', () => {
        if (deleteTickerModeIsOn) {
            ticketCont.remove()
        }
    })

    const ticketStatusBox = ticketCont.querySelector('.ticket-color')
    ticketStatusBox.addEventListener('click', () => {
        const currentPosition = orderOfStatuses.findIndex((value) => {
            return value === ticketStatusBox.innerText
        })
        const ticketStatus = ticketStatusBox.innerText;
        const currentColor = statusToColorMapping[ticketStatus]
        ticketStatusBox.classList.remove(currentColor)

        const isLastPosition = currentPosition === orderOfStatuses.length - 1;
        if (isLastPosition) {
            ticketStatusBox.innerText = orderOfStatuses[0]
            ticketStatusBox.classList.add(statusToColorMapping[orderOfStatuses[0]])
        } else {
            const nextPostion = currentPosition + 1;
            const newStatus = orderOfStatuses[nextPostion]
            ticketStatusBox.innerText = newStatus
            ticketStatusBox.classList.add(statusToColorMapping[newStatus])
        }
    })

    let isLocked = true;
    const lockContainer = ticketCont.querySelector('.ticket-lock');
    const taskArea = ticketCont.querySelector('.task-area')
    lockContainer.addEventListener('click', () => {
        const iconElement = lockContainer.children[0]
        isLocked = !isLocked
        if (isLocked) {
            iconElement.classList.remove('fa-unlock')
            iconElement.classList.add('fa-lock')
            taskArea.setAttribute('contenteditable', 'false')
        } else {
            iconElement.classList.remove('fa-lock')
            iconElement.classList.add('fa-unlock')
            taskArea.setAttribute('contenteditable', 'true')
        }
    })

    maincont.appendChild(ticketCont)
}
