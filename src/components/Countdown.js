import React, { useRef, useEffect, useState } from "react";

function Button(props){
 
    function btnClick(){      
        props.onClickHandler();
    }

    return (
        <button type={props.btnType} onClick={btnClick}>{props.label}</button>    
    );     
}

const format = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;

    return minutes + ':' + seconds;
  }

function Clock(props){

    if(props.time===0){
        props.timeFinish();
    }

    return (
        <div className="displayedTime">
        <h1>{format(props.time)}</h1>
        </div>
    );     
}

export default function Countdown() {
  
    const [num, setNum] = useState(0);
    const [pause, setPause] = useState(true);
    
    let intervalRef = useRef();
    
    const decreaseNum = () => 
    {
        setNum((prev) => (prev-1)>=0 ? prev-1 : 0);
    }

    useEffect(() => {

    if(pause===false)
      intervalRef.current = setInterval(decreaseNum, 1000);
  
      return () => clearInterval(intervalRef.current);
    }, []);

    let strRef=React.useRef();

    function onSubmit(event) {
        event.preventDefault();
        const strSeconds = strRef.current.value;
        if(strSeconds.match(/[0-9]/)) {
            strRef.current.value = '';
            handleCountdown(parseInt(strSeconds, 10));
        }
        }

    const handleClick = () => {
        if (!pause) {
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(decreaseNum, 1000);        
        }
        setPause((prev) => !prev);
        };
        
    const handleCountdown=(seconds)=> {
    
        setNum(seconds);
        setPause(false);
    }
    
    const timeFinish=(timeLeft)=>
    {
        setPause(true);
    }

    const handleClickReset=()=>{

        setNum(0);
        setPause(true);
    }
    
    return (
        <div>
            <Clock time={num} timeFinish={timeFinish}/>
            <form onSubmit={onSubmit}>
            <input type="text" ref={strRef} placeholder="enter time in seconds"/>
            <Button btnType="submit" onClickHandler={handleClick} label={pause ? "Run" : "Pause"}/>
            </form>
            <Button onClickHandler={handleClickReset} label="Reset"/>
        </div>
    );
}