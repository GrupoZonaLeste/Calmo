import express from "express"
const app = express()

app.get("/teste", (req, res) => {
    res.json({"ola": "mundo"})
})

app.listen(5000 , () => {
    console.log("teste111")
})