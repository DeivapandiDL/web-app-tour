import { rejects } from 'assert';
import { resolve } from 'path';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface arrListIF {
  id:string;
  title:string;
  content:string;
  navid?:string;
  navTimer?:number;
  navPath?:string;
}

function AppTour(arrList1:any) {
    let [tourindex,setTourIndex] = useState(0);
  const navigate = useNavigate();
    let [arrList,setArrList] = useState(arrList1);
    let [arr,setArr] = useState<arrListIF[]>([]);
    useEffect(() =>{
      arr = arrList?.arrList1
      setArr(arr)
      getarrIndex('start')
    },[])

    let steps = '';
    const getarrIndex = (step:string) => {
      steps = step;
      document.querySelector(".app-tour-container")?.classList.remove('tourFadeIn');
      let invalue = 0;
      switch(step){
        case 'start':
          invalue = 0;
          break;
        case 'next':
          invalue = tourindex + 1;
          break;
        case 'prev':
          invalue = tourindex - 1;
          break;
        case 'done':
          invalue = tourindex + 1;
          break;
      }
      tourindex = invalue;
      setTourIndex(tourindex)
      mapTourList(tourindex,step)
    }

    



    const mapTourList = (index:number,step?:string) => {
        if(index == arr.length){
          document.querySelector(".tourOverlay")?.remove();
          document.querySelector(".app-tour-container")?.classList.remove("tourFadeIn");
        }
          if(arr[index].navid || arr[index].navPath){ 
            let navid = arr[index].navid;
            if(navid){ 
            let navClick = document.getElementById(navid ? navid.toString() : '');
            if(navClick){ 
               navClick.click()
            }
          }
          else { 
            let navPath = arr[index]?.navPath
            if(navPath && step != 'start')
              navigate(navPath)
          }
            const newProm = new Promise((resolve, rejects) =>{
                const myInterval = setInterval(() =>{
                  if(findDivId(index)){
                    clearInterval(myInterval)
                    resolve(focusonDivId(index))
                    return;
                  }
                },500)
                setTimeout(() =>{
                  resolve(focusonDivId(index+1))
                },arr[index]?.navTimer)
            })
        }
        
        else{
          focusonDivId(index)
        }
    }

      const findDivId = (index:number) =>{
        let overlay = document.querySelector(".tourOverlay")
        if(!overlay)
          window.document.body.insertAdjacentHTML( 'afterbegin', '<div class="tourOverlay" style="color:blue;"> With some data...</div>' );
        document.querySelector(".app-tour-container")?.classList.add('tourFadeIn');
        let fcsId = document.getElementById(arr[index].id.toString())
        if(fcsId){
          return true;
        }
        else{
          return false;
        }
      }

      const focusonDivId = (index:number) => { 
        let fcsId = document.getElementById(arr[index].id.toString())
        if(fcsId){
          let clip = fcsId.getBoundingClientRect();
          
          setTimeout(() =>{
            document.querySelector(".app-tour-container")?.setAttribute("style","top:"+clip.top+"px;left:"+clip.left+"px");
          })
        }
        else{
          document.querySelector(".tourOverlay")?.remove();
          if(steps == 'next'){ 
            document.querySelector('.app-tour-container')?.insertAdjacentText('beforeend', 'more text');
          }
        }
    }

    

    

    


  return (<>
    {<div id="app-tour-container" className={tourindex >= 0 ? 'app-tour-container' : '' }>
       { tourindex >= 0 && arr[tourindex]?.content ? <div>{arr[tourindex].content} <br/></div> : ''}
       { tourindex >= 1 ? <button onClick={() => getarrIndex('prev')}>Previous</button> : ''}
     <button onClick={() => getarrIndex(tourindex == arr.length ? 'done' : 'next')}>
        {tourindex >= 0 ? (tourindex == arr.length - 1 ? 'Done' : 'Next') :  'Click Here'}
    </button> 

    </div> }
    </>
  )
}


export default AppTour
