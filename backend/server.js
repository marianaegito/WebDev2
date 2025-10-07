const express = require("express")
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("cors")
const cors = require("cors")

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const SECRET_KEY="123456789";



app.listen(prot,()=>{
    console.log(`Servidor rodando na porta http://localhost:$(port)`);
})