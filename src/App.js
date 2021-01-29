import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import {lightUpdater} from "./lightSwitch";

function App() {
    const [model, setModel] = useState([true, false, false]);
    const [timer, setTimer] = useState(20);

    const lights = model.map(light => {

        return <div className={light ? `light active` : `light`}>{light.toString()}</div>
    })



    const lightSwitcher = lightUpdater();


    const stopSwitch = useEffect(() => {
        const interval = setInterval(() => {
            setModel(model => lightSwitcher(model));
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (

        <div className="App">

            <button onClick={() => setModel(model => lightSwitcher(model))}>Switch</button>
            {lights}
        </div>
    );
}

export default App;
