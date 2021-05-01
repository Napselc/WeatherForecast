const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('Submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    const url = "http://localhost:3000/weather?address="+ location
    fetch(url).then((response)=>{

    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            console.log(data.location)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
     })

  })
     
})
