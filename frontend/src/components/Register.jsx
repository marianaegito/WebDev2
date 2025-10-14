

import {useState}from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  // HOOK- useState- manipula o estado da variavel

  const [email,setEmail]=useState("");
  const [senha,setSenha]=useState("");
  const [,setMessage]=useState("");
 
  // HOOK- useNavigate - redireciona para outros componentes
  const navigate = useNavigate();

// Função handleRegister

const handleRegister= async(e)=>{
  e.preventDefault();
  try{
    const response =await axios.post("http://localhost:5001/register",{email, senha});
    setMessage(response.data.message);
    setTimeout(()=>navigate("/"),1000);
  }
  catch(error){
    setMessage(error,"Erro ao cadastrar")
  }
}




  return (
    <div>
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
              required
            />
          </div>

           <div>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e)=>setSenha(e.target.value)} 
              required
            />
          </div>
          <button>
            Cadastrar
          </button>
        
        </form>
          {/* {message && <p>{message}</p>} */}
          <p>Já possui uma conta? <a href="/">Faça seu Login</a></p>
      </div>

    </div>
  )
}

export default Register