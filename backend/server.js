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

// Rota Register 
app.post("/register", async(req,res)=>{
    // desttruct - passando os parametros que serão utilizados na requisiçãpo 
    const {email,senha}=req.body

    if(!email || !senha){
        return res.status(400).json({message:"email e senha e senha inválidas"})
    }

    const users = consultarUsuarios();
    if(users.find(user=>user.email === email)){
        return res.status(400).json({message:"email já cadastrado"})
    }

    // Criando a cripotografia
    const hashSenha = await bcrypt.hash(senha,10);
    const novoUsuario = {id:Date.now(),email, senha:hashSenha};
    users.push(novoUsuario);
    salvarUsuarios(users);

    res.status(201).json({message:"Usuário registrado com sucesso!"})
})


app.listen(prot,()=>{
    console.log(`Servidor rodando na porta http://localhost:$(port)`);
})