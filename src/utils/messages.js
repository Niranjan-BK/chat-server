const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

generateLocationMessage = (username, URL) => {
    return {
        username,
        URL,
        createdAt: new Date().getDate()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}