import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './App.css';
import clickSound from './click.mp3';

function App() {
    const colors = ["red", "green", "orange", "blue", "pink"];
    const [count, setCount] = useState(0);
    const [currentColor, setBG] = useState(0);
    const [clicksPerSecond, setClicksPerSecond] = useState(0);
    const [play] = useSound(clickSound);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState(5);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            setClicksPerSecond(count / duration);
            if (count > highScore) {
                setHighScore(count);
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    function startTest() {
        setCount(0);
        setTimeLeft(duration);
        setIsRunning(true);
    }

    function reset() {
        setCount(0);
        setBG(0);
        setTimeLeft(0);
        setIsRunning(false);
        setClicksPerSecond(0);
    }

    document.addEventListener("keydown", reset, false);

    return (
        <div onClick={() => {
            if (isRunning) {
                setCount(count + 1);
                setBG(currentColor === colors.length - 1 ? 0 : currentColor + 1);
                play();
            }
        }} style={{ backgroundColor: colors[currentColor] }} className="App">
            <h1>{count}</h1>
            <h4>Clicks per second: {clicksPerSecond.toFixed(2)}</h4>
            <h4>Time left: {timeLeft}s</h4>
            <h4>High Score: {highScore}</h4>
            <h4>Click anywhere! Press any key to reset.</h4>
            <select onChange={(e) => setDuration(Number(e.target.value))} value={duration}>
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
            </select>
            <button onClick={startTest}>Start Test</button>
            {!isRunning && timeLeft === 0 && <h2>Game Over! Your score: {count}</h2>}
        </div>
    );
}

export default App;
