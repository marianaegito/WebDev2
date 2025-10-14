import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const API_URL = "http://localhost:5001"

const Login = () => {

  // HOOK- useState- manipula o estado da variavel
  const [email, setEmail] =useState("");
  const [senha,setSenha] =useState("");
  const [message, setMessage] =useState("");

 // HOOK- useNavigate - redireciona para outros componentes
  const navigate =useNavigate();

  
  // FUNÇÃO handleLogin

  const handleLogin=async (e)=>{
    e.preventDefault();
    try{
    const response = await axios.post(`${API_URL}/login`,{email,senha});
    localStorage.setItem("token",response.data.token)
    setMessage("Login realizado com sucesso")
    setTimeout(()=>navigate("/dashboard"),1500)
    }
    catch(error){
      setMessage(error,"Erro ao realizar o login")
    }
   
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
              required
            />
          </div>

           <div>
            <label htmlFor='senha'>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e)=>setSenha(e.target.value)} 
              required
            />
          </div>
          <button>
            Entrar
          </button>
        
        </form>
          {<p>{message}</p>}
          <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
      </div>

    </div>
  )
}

export default Login