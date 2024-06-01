const spinner = document.querySelector('.lds-roller')
const publi = document.querySelector("#publications")
const table = document.querySelector("#table")
const rows = document.querySelectorAll(".row")
let selected

async function RecupererNoms (){
    AfficherSpinner(true)

    let response = await fetch("https://jsonplaceholder.typicode.com/users")
    response = await response.json()

    AfficherSpinner(false)

    for (i of [0, 1]){
        for (j of [0, 1, 2, 3, 4]){
            let user = response[i*5+j]
            rows[i].innerHTML += `<div class='nom' id='${user['id']}'>${user['name']}</div>`
        }
    }

    document.querySelectorAll(".nom").forEach(btn => {
        btn.addEventListener("click", afficherPub)
    })
}

function AfficherSpinner(test){
    table.style.display = test ? "none" : "table"
    spinner.style.display = test ? "block" : "none"
    publi.style.alignItems = test ? "center" : "baseline"
}

async function afficherPub(e){
    if (selected === e.target) return
    if (selected) selected.classList.remove("checked")
    selected = e.target
    selected.classList.add("checked")
    const id = selected.id

    AfficherSpinner(true)

    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    response = await response.json()

    AfficherSpinner(false)

    let i = true
    table.innerHTML = '<tr><th align="left" style="width: 15%;">userId</th><th align="right" style="width: 15%;">id</th><th align="left" style="width: 30%;">title</th><th align="center" style="width: 40%;">body</th></tr>'
    response.forEach(elt =>{
        table.innerHTML += `<tr ${i ? 'class="grey"' : ''}><td align="left">${id}</td><td align="right">${elt["id"]}</td><td align="left">${elt["title"]}</td><td align="center">${elt["body"]}</td></tr>`
        i = !i
    })
}

RecupererNoms()