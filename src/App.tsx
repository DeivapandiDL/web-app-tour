import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./app-tour.css";
import Dashboard from './dashboard';
import AppTour from './app-tour';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


import { useState,useEffect } from "react";
import TourVOne from './tourVOne';


function App() {
  
  let data= [
        {targetId:"testone",title:'Title One',content:'First test content',navPath:'/',navTimer:5000},
        {targetId:"secondpageTitle",title:'Title Two',content:'Second test content',navid:'secondPage',navTimer:5000},
        // {targetId:"testthree",title:'Title Three',content:'Third test content',navPath:'/',navTimer:5000},
        {targetId:"testtwo",title:'Title Two',content:'Second test content',navPath:'/',navTimer:5000},
        {targetId:"testtthree",title:'Title Three',content:'Third test content'},
        {targetId:"testFour",title:'Title 4',content:'First test content'},
        {targetId:"testTen",title:'Title 5',content:'First test content'},
        {targetId:"testSix",title:'Title 6',content:'First test content'},
        {targetId:"testSeven",title:'Title 7',content:'First test content'},
        {targetId:"testEight",title:'Title 8',content:'First test content'},
        {targetId:"testNine",title:'Title 9',content:'First test content'},
        {targetId:"testFive",title:'Title 10',content:'First test content'},
        {targetId:"testeleven",title:'Title 11',content:'First test content'},
        {targetId:"testTwelve",title:'Title 12',content:'First test content'},
        // {id:"testFour",title:'Title Four',content:'Fourth test content'},
    ]
  const [arrList1,setArrList1] = useState(data)
  let [enableTour,setEnableTour] = useState(false);
  const startTour = () =>{
    setEnableTour(true);
  }

  const receiveDataFromTour = (item:string) => {
    enableTour = false;
    setEnableTour(enableTour);
  }
  
  
  return (
    <div className="App">
      <Router>
      <div>
        {
          enableTour ? (
            // <AppTour arrList1={arrList1}/>
            <TourVOne 
              arrList= {arrList1}
           
              ></TourVOne>

          ) : (
            ""
          )
        }
      </div>


        
     
        <div>
          {/* <nav>
            <ul>
              <li><Link to="/page1">Page1</Link></li>
              <li><Link to="/page2">Page2</Link></li>
              <li><Link to="/page3">Page3</Link></li>
            </ul>
          </nav> */}
          <button onClick={startTour}>Start Tour</button>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
