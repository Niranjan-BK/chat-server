const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true})

const autoscroll = () => {
    const $newMessages = $messages.lastElementChild
    const newMessageStyles = getComputedStyle($newMessages)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom) 
    const newMessageHight = $newMessages.offsetHeight + newMessageMargin

    const visibleHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight
    const scrollOffset = $messages.scrollTop + visibleHeight
    console.log(`scrollTop: ${$messages.scrollTop}, visibleHeight : ${visibleHeight}, containerHeight: ${containerHeight}, scrollOffset: ${scrollOffset}`)
    if (containerHeight - newMessageHight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, username, (error) => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
        if (error)
            return console.log(error)
        console.log('The message was delivered!');
    })
})


socket.emit('join', username, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})