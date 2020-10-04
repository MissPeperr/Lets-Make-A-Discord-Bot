const config = require("./config.json")
const fetch = require('node-fetch')
const {funTag, surpriseTag} = require('./tag.js')

const giphyManager = {
    surprise: (message) => {
        return fetch(`http://api.giphy.com/v1/gifs/random?tag=${surpriseTag}&lang=en&api_key=${config.giphyKey}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(giphyData => {
                message.channel.send(giphyData.data.url)
            })
    },
    fun: (message) => {
        return fetch(`http://api.giphy.com/v1/gifs/random?tag=${funTag}&lang=en&api_key=${config.giphyKey}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(giphyData => {
                message.channel.send(giphyData.data.url)
            })
    }
}

module.exports = giphyManager;