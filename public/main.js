const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const deleteAll = document.querySelector('#delete-all')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vedar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload(true)
    })
    
})

deleteButton.addEventListener('click', _ =>{
    fetch('/quotes/one', {
        method: 'delete',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vedar'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload(true)
    })
    
})
deleteAll.addEventListener('click', _ =>{
    fetch('/quotes/all', {
        method: 'delete',
    })
    .then(res => {
       res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})