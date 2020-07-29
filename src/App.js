import React, {useEffect, useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {wsController} from "./services/socket-index";
import {useTimerState} from './store/socket/socket-selectors';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const {time:servTime, status} = useTimerState();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const innerTimerRef = useRef();

  useEffect(()=> {
    innerTimerRef.current = window.setInterval(()=> {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => window.clearInterval(innerTimerRef.current);
  }, []);

  useEffect(() => {
    wsController.setDispatch(dispatch);
    wsController.listen();
    const servTimer = window.setInterval(() => {
      wsController.getTime();
    }, 5000);
    return () => window.clearInterval(servTimer);
  },[]);

  useEffect(() => {
    if(servTime && Date.parse(servTime) > Date.parse(time)) {
      setTime(servTime);
      innerTimerRef.current && window.clearInterval(innerTimerRef.current);
      innerTimerRef.current = window.setInterval(()=> {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    }
  },[servTime]);

  return (
    <div className="app-container">
      <h5>status: {status}</h5>
      <h2>{time}</h2>
    </div>
  );
}

export default App;
