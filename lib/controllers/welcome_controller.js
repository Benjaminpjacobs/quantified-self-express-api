const getIndex = (request, response) => {
    response.sendFile('public/index.html')
}

module.exports = {
    getIndex: getIndex
}