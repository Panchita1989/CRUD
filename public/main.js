const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vedar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
})