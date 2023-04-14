import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())

const port = process.env.PORT || 5051

const moves = [
    "rock",
    "paper",
    "scissors"
]

app.get('/rps', (req, res) => {
    const choice = Math.floor(Math.random()*moves.length)
    const move = moves[choice]
    res.send(move)
})

app.listen(port, ()=>{
    console.log('server up on port', port)
})
