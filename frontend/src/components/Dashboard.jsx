import {Link, useNavigate} from  'react-router-dom'
import { useState,useEffect } from 'react'
import {Chart} from 'react-google-charts'

//CONFIGURAÇÃO DE OPÇÕES DO CHART
export const options={
  isStacked:true,
  height:300,
  legend:{position:"top",maxLines:3},
}

const Dashboard = () => {

  //HOOK- useState manipula o estado para armazenar os dados do grafico
  const [grafico,setGrafico]= useState();
  const [loading, setLoading] = useState(true);
  const [error,setError] =useState(null)

  
  //HOOk- useNavigate- ele redireciona para outro componentes
  const navigate = useNavigate();

  //Função handleLogout

  const handleLogout =()=>{
    localStorage.removeItem("token");
    navigate("/");
  };

  //HOOK - useEffect - realiza um efeito colateral na página

  useEffect(()=>{
    const fetchData = async ()=>{
      //tratamento de erros
      try{
        //pega a url da api no servidor backend
        const response = await fetch("http://localhost:5001/dashboard")

        if(!response.ok){
          console.error("Erro ao buscar a api")
        }
        //converte os dados para json
        const apiData = await response.json();
        //verifica se os dados vieram da api no formato json
        if(apiData && apiData.length > 0){
          setGrafico(apiData);
        }else{
          console.error("erro ao receber os dados da api")
        }
        

      }
      catch(error){
        setError(error,"Erro ao buscar os dados na api")
      } finally{
      setLoading(false)
      }     
    }
    fetchData()
  },[])//o array vazio garante que o fetch ocorra apenas uma 
  // vez executar o componente


  return (
    <div>
      <h1>Bem-Vindo ao Dasboard</h1>
      <button onClick={handleLogout}> 
        Logout
      </button>

      <Chart
        chartType='AreaChart'
        width="100%"
        height="400px"
        data={grafico}
        options={options}
      />
    </div>
  )
}



export default Dashboard