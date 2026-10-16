// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'
import Card from './components/ui/card'
import './App.css';


function App() {


  const[page,setPage] = useState(1);
  const[count, setCount] = React.useState(0)
  const[data,setData] = useState([])
  const[hello,setHello]=useState("batman") 
useEffect(()=>{
   async function fetchload(){
  const res= await fetch( `https://www.omdbapi.com/?s=${hello}&page=${page}&apikey=eae6de7d`);
  // const res= await fetch( `http://www.omdbapi.com/?i=tt3896198&apikey=eae6de7d`);

  const data = await res.json();
  setData(data.Search ?? []);
  console.log(data);
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

      { data?.map((item,key)=>{
        return(
        <div className='parts' key={key}>
          <Card title={item.Title} description={item.Year} imageUrl={item.Poster}/>
        </div>
        )
       })
}

</div>
<div className='pagenext'>
  <button onClick={()=>setPage((page)=>page-1)}>Previous</button>
  <h1>{page}</h1>
  <button onClick={()=>setPage((page)=>page+1)}>Next</button>
</div>



    </div>
  )
}

export default App
