const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "123456789";

//LOCAL DO ARQUIVO (SIMULA O BANCO DE DADOS)
const localUsuarios = path.join(__dirname,'usuario.json')

// FUNÇÃO PARA LER O ARQUIVO USUARIOS
const consultarUsuarios = ()=>{
    const data = fs.readFileSync(localUsuarios, "utf-8")
    return JSON.parse(data)
}

//FUNÇÃO PARA GRAVAR DADOS NO ARQUIVO USUARIOS
const salvarusuarios = (users)=>{
    fs.writeFileSync(localUsuarios,JSON.stringify(users,null,2))
}


// ROTA LOGIN

app.post("/login", async(req,res)=>{
    const {email,senha}= req.body;
    const users = consultarUsuarios();
    const user =users.find(user=>user.email ===email)

    if(!user){
        return res.status(400).json({message:"Usuário/senha inválidos"})
    }
    const hashSenha = await bcrypt.compare(senha,user.senha);
    if(!hashSenha){
       return res.status(400).json({message:"senha inválida"})
    }
    const token = jwt.sign({id:user.id,email:user.email},SECRET_KEY,{expiresIn: "2m"});
    res.json({message:"Login realizado com sucesso", token})
})

//ROTA REGISTER
app.post("/register", async(req,res)=>{
    //destruct - passando os parametros que serão utilizados na requisição
    const {email,senha}= req.body

    if(!email || !senha){ 
        return res.status(400).json({message: "email e senha inválidos"})
    }

    const users = consultarUsuarios();
    if(users.find(user=>user.email === email)){
        return res.status(400).json({mssage:"email já cadastrado"})
    }

//CRIANDO A CRIPTOGRAFIA
const hashSenha = await bcrypt.hash(senha,10);
const novoUsuario = {id:Date.now(),email, senha:hashSenha};
users.push(novoUsuario);
salvarusuarios(users);

res.status(201).json({message:"Usuário registrado com sucesso"})

})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})

