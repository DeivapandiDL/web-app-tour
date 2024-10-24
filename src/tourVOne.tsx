import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function TourVOne(arrList:any,{sendDataToParent}:any) {
  let arr = arrList.arrList;
  const navigate = useNavigate();
  let initialLoad = 0;
useEffect(() =>{
  
if(initialLoad == 0){
  tourInit()
  initialLoad = 1;
}
},[])


let tempPos:string = 'next';
const tourInit = () =>{
  let el = document.createElement('div');
  el.classList.add("app-tour-container");
  el?.insertAdjacentHTML('beforeend', '<div class="appTourTitle"><h4></h4><button class="tourClose">X</button></div><div class="tourContent"></div><div><button id="prevTourBtn" style="margin-right:10px">Prev</button><button class="nextTourBtn">Next</button></div>');
  document.body.appendChild(el);
  
  let tourClose = document.querySelector(".app-tour-container .tourClose");
  let tourNext =  document.querySelector(".app-tour-container .nextTourBtn");
  let tourprev =  document.querySelector(".app-tour-container #prevTourBtn");

  if(tourClose)tourClose.addEventListener("click", getCloseBtnClick);
  if (tourNext) {
    tourNext.addEventListener("click" ,getNextBtnClick)
    confirmNavExist(0);
    predicButton();
  }
  if (tourprev) {
    tourprev.addEventListener("click" ,getPrevBtnClick)
  }
}

let currentUrl:boolean = false;
const dataToSend = 'Hello from Child!';
let arrCount = 0;
const getNextBtnClick = () => {
  if(tempPos == 'done'){
    getCloseBtnClick();
  }
  else{ 
  tempPos = 'next';
  console.log(arr[arrCount].targetId);
  arrCount = arrCount + 1;
  predicButton();
  confirmNavExist(arrCount)
  }
}
const confirmNavExist = (count:number) =>{
  if(arr[count].navid && arr[count].navid != '' || arr[count].navPath && arr[count].navPath != '') {
  if(arr[count].navid && arr[count].navid != ''){
        let navClick = document.getElementById(arr[count].navid);
        if(navClick)navClick.click();
    }
    else if(arr[count].navPath && arr[count].navPath != ''){
        navigate(arr[count].navPath)
    }
      const navPromise = new Promise((resolve,rejects) =>{
      let inverval = arr[count].navTimer ? arr[count].navTimer / 100 : 500;
      let proInterval = setInterval(() =>{
        let doc = document.getElementById(arr[count].targetId)
        inverval = inverval * 100;
        if(doc){
          currentUrl = true;
          resolve(setDivScrollPosition(count));
          clearInterval(proInterval)
        }
        else if(inverval == arr[count].navTimer){
          clearInterval(proInterval)
          rejects(getNextBtnClick())
        }
      },inverval)
    })
    }
    else{
      setDivScrollPosition(count);
    }
  
  
}
const setDivScrollPosition = (count:number) => { 
  document.querySelector(".app-tour-container")?.classList.remove("tourFadeIn");
  let elem = document.getElementById(arr[count].targetId)
  if(elem){
    let offHeight:any;
    var clip:any;
    const prom = new Promise((resolve) => {
      setTimeout(() => {
      offHeight = elem?.offsetHeight;
      clip = {top:elem?.offsetTop,left:elem?.offsetLeft}
      // clip = elem?.getBoundingClientRect()
      let offSetTop = elem? elem.offsetTop - 150 : null;
      resolve(scrollToSmoothly(offSetTop, 300))
    });
    })
    prom.then(
      function(value){ 
        setTimeout(() =>{
        getposition(clip,offHeight,arr[arrCount])
      },1000);
      }
    )
  }
  else{
    switch(tempPos){
      case 'done':
      getCloseBtnClick()
      break;
      case 'next':
      getNextBtnClick();
      break;
      case 'prev':
         getPrevBtnClick()
    }
  }
  console.log("next");
}


const getposition = (clip:any,offHeight:any,arr:any) =>{
  let doc = document.querySelector(".app-tour-container");
  let title = doc?.querySelector('.appTourTitle h4');
  let content = doc?.querySelector('.tourContent');
      if(doc){ 
        doc?.classList.add("tourFadeIn");
        if(title)title.innerHTML = arr.title;
        if(content)content.innerHTML = arr.content;
        doc.setAttribute("style","top:"+(clip.top + offHeight + 10)+"px;left:"+clip.left+"px")
      }
}

const getPrevBtnClick = () => {
  tempPos = 'prev';
  arrCount = arrCount - 1;
  predicButton()
  confirmNavExist(arrCount)
}

const predicButton = () => {
  var prevDone = document.querySelector("#prevTourBtn");
  if(arrCount == 0){
    if(prevDone)
      prevDone?.setAttribute("style","display:none")
  }
  else{
    prevDone?.setAttribute("style","display:inline;margin-right:10px")
  }
  if(arrCount == arr.length - 1){
    let nextDone = document.querySelector(".nextTourBtn");
    if(nextDone)
      nextDone.innerHTML = "Done";
      tempPos = 'done';
  }
  else {
    let nextDone = document.querySelector(".nextTourBtn");
    if(nextDone)
      nextDone.innerHTML = "Next";
  }
}


const getCloseBtnClick = () => {
 document.querySelector(".app-tour-container")?.remove();
}


const scrollToSmoothly = (pos:any, time:any) => {
  var currentPos = window.pageYOffset;
  let start:any = null;
  if(time == null) time = 300;
  window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
          window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
      } else {
          window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
      }
      if (progress < time) {
          window.requestAnimationFrame(step);
      } else {
          window.scrollTo(0, pos);
      }
  });
}
  return (
    <div></div>
  )
}

export default TourVOne
