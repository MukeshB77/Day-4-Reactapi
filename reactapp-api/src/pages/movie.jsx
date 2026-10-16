import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'
import { Commet } from 'react-loading-indicators';
import Card from "../components/ui/card.jsx";   
import './movie.css';

function movie() {
  

  const[page,setPage] = useState(1);
  const[count, setCount] = React.useState(0)
  const[data,setData] = useState([])
  const[hello,setHello]=useState("batman") 

  const[loading,setLoading]=useState(true);

useEffect(()=>{
   async function fetchload(){
    setLoading(true);
    try{
  const res= await fetch( `https://www.omdbapi.com/?s=${hello}&page=${page}&apikey=eae6de7d`);
  // const res= await fetch( `http://www.omdbapi.com/?i=tt3896198&apikey=eae6de7d`);
      console.log("HTTP Status Code:", res.status);

  const data = await res.json();4
  setData(data.Search ?? []);
  console.log(data);
setLoading(false);
}
  catch(error){
    
    console.log("Errorrrrrrrrrrrrrrrrrrr",error);
    
  }
  finally{
    setLoading(false);
  }
  
  }



  fetchload();




},[page,count])


const event=(e)=>{
  setHello(e.target.value);
}

const render=()=>setCount(count+1);


  return (







    <div style={{display:"flex",flexDirection:"column"}}>
      <header>
         Movies
        <input className='search' type="text" value={hello} onChange={event} placeholder='Search' />
        <button style={{margin:"0px", padding:'10px', height:'45px'}} onClick={render}>search</button>
       
        
        
        </header>
    <div className='contain'>



{loading?(

    <Commet color="#6b6b6b" size="medium" text="" textColor="" />

):(
   
    data?.map((item,key)=>{
        return(
        <div className='parts' key={key}>
          <Card title={item.Title} description={item.Year} imageUrl={item.Poster}/>
        </div>
        )
       })

)}


      

</div>
<div className='pagenext'>
  <button onClick={()=>setPage((page)=>page-1)}>Previous</button>
  <h1>{page}</h1>
  <button onClick={()=>setPage((page)=>page+1)}>Next</button>
</div>



    </div>
  )
}

export default movie