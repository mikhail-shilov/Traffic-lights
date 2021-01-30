import './App.css';
import {useState, useEffect} from "react";
import Light from "./components/light";
import {BrowserRouter, useHistory} from "react-router-dom";


function App() {
    const [model, setModel] = useState({
        lightsFull: [
            {type: 'deny', isActive: true, interval: 5000},
            {type: 'alert', isActive: false, interval: 5000},
            {type: 'allow', isActive: false, interval: 5000},
        ],
        isForward: false,
        isEnabled: true
    });

    const lights = model.lightsFull.map((light, index) => {
        return <Light key={index} type={light.type} isActive={light.isActive} interval={light.interval}>
            {light.toString()}
        </Light>
//        return <div key={index} className={light ? `light light--active` : `light`}>{light.toString()}</div>
    })
    const lightUpdater = (model) => {
        if (model.isEnabled) {
            let lightsFull = [...model.lightsFull];
            let direction = model.isForward;

            const activeLight = lightsFull.findIndex(item => {
                return item.isActive
            });

            //lightsFull[activeLight].isActive = false;
            lightsFull[activeLight] = {...lightsFull[activeLight], isActive: false};
            if (activeLight === lightsFull.length - 1 || activeLight === 0) {
                direction = !direction;

            }
            //lightsFull[activeLight + (direction ? 1 : -1)].isActive = true;
            lightsFull[activeLight + (direction ? 1 : -1)] = {
                ...lightsFull[activeLight + (direction ? 1 : -1)],
                isActive: true
            };

            console.log(model);

            return {...model, lightsFull: lightsFull, isForward: direction};
        }
        return model;
    }

    const toggleSwitch = () => {
        setModel({...model, isEnabled: !model.isEnabled});
        return 0;
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setModel(model => lightUpdater(model));
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    const ToggleWTF = () => {

    }

    return (
        <BrowserRouter>
            <div className="App">

                <button onClick={() => setModel(model => lightUpdater(model))}>Switch</button>
                <button onClick={toggleSwitch}>{model.isEnabled ? `Off` : `On`}</button>
                <button onClick={ToggleWTF}>WTF</button>

                {lights}
            </div>
        </BrowserRouter>
    );
}

export default App;
