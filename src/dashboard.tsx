import React from 'react'
import { useNavigate } from 'react-router-dom';
function Dashboard() {

    let arrList= [
        {id:"testone",title:'Title One',content:'First test content'},
        {id:"testtwo",title:'Title Two',content:'Second test content',navid:'secondPage'},
        {id:"testthree",title:'Title 3',content:'Third test content',navid:'againDashboard'},
        {id:"testFour",title:'Title 4',content:'First test content'},
        {id:"testFive",title:'Title 5',content:'First test content'},
        {id:"testSix",title:'Title 6',content:'First test content'},
        {id:"testSeven",title:'Title 7',content:'First test content'},
        {id:"testEight",title:'Title 8',content:'First test content'},
        {id:"testNine",title:'Title 9',content:'First test content'},
        {id:"testTen",title:'Title 10',content:'First test content'},
        {id:"testeleven",title:'Title 11',content:'First test content'},
        {id:"testTwelve",title:'Title 12',content:'First test content'},
    ]


    

    const navigate= useNavigate();
    const gotToNewPage=(id:any)=>{
        const value = id == "testone" ? '/page1' : ( id == "testtwo" ? '/page2' : '/page3' );
        console.log(value);
        navigate(value);

        // if(id=="testone"){
        //     navigate("/page1");
        // }
        // else if(id=="testtwo"){
        //     navigate("/page2");
        // }
        // else{
        //     navigate("/page3");

        // }
      }


  return (
    <div className='tour-container'>
        welcome to dashboard page
        {arrList.map((user: any) => (
          <div key={user.id} className='grid-class'>
            <div className='grid-column'>
            <h3 id={user.id}>{user.title}</h3>
                <div className='helloworld'>
                    {user.content} 
                    <button id={user.navid} onClick={() => gotToNewPage(user.id)} className="btn">Go to content Page {user.id}</button>

                </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Dashboard
