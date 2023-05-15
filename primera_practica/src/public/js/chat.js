//prompt to ask email
const socket = io()
const email = prompt('What is your email?');
//send email to server
//if enter in input chat  send message
//if enter in input chat  send message

// const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('chat-input')
const messageContainer = document.getElementById('chat-messages')


messageInput.addEventListener('keyup', async e => {
    if (e.key === "Enter") {
    e.preventDefault()
    const message ={ 
        message : messageInput.value,
        usermail : email
    }
    const url = '/api/messages';
    
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response =>
        response.json()
      )
      .then(data => {
            socket.emit('messagefromcliente', message)
      })
      .catch(error => {
        console.error('Ha ocurrido un error:', error);
      });

    messageInput.value = ''
    console.log("faaaa")
    }
    
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'message'
    messageElement.innerHTML = `
    <div class="message-content">
        <p class="user-chat">${message.usermail}</p>
        <p>${message.message}</p>
    </div>
    `
    //add the msg in the top of the chat, no tin the bottom
    messageContainer.prepend(messageElement)

    //add animation to the new message 
    messageElement.animate([
        { transform: 'translateY(50px)' },
        { transform: 'translateY(0)' }
    ], {
        duration: 500,
        easing: 'ease-out'
    })

}


socket.on('chat', message => {
    console.log(message)
    appendMessage(message)
})
