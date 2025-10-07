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

// Local do arquivo (simula o banco de dados)
const localUsuarios = path.json(__dirname, 'usuario.json')

// Criando uma função para ler o arquivo usuario
const consultarUsuarios = ()=>{
    const data = fs.readFileSync(localUsuarios, "utf-8")
    return JSON.parse(data)
}

// Função para gravar usuario
const salvarUsuarios =(users)=>{
    fs.writeFileSync(localUsuarios,JSON.stringify(users,null,2))
}



app.listen(prot,()=>{
    console.log(`Servidor rodando na porta http://localhost:$(port)`);
})