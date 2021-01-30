import './App.css';
import {useState, useEffect} from "react";
import Light from "./components/Light";

import {useHistory, useLocation} from "react-router-dom";


function App() {
    // /yellow?interval=30&forward=true

    const history = useHistory();
    const location = useLocation();

    const trafficLights = [
        {type: 'red', interval: 10000},
        {type: 'yellow', interval: 3000},
        {type: 'green', interval: 15000},
    ];

    const [forward, setForward] = useState(true);


    const getNextLight = () => {
        let direction = forward;
        const activeType = location.pathname.slice(1);
        const activeIndex = trafficLights.findIndex(elem => elem.type === activeType);
        if (activeIndex === 0) direction = true;
        if (activeIndex === trafficLights.length - 1) direction = false;
        const interval = trafficLights[activeIndex].interval;
        const nextType = trafficLights[activeIndex + (direction ? 1 : -1)].type;
        setForward(direction);
        setTimeout(() => {
            history.replace(nextType);
        }, interval);


    }
    //getNextLight();

    useEffect(() => {
        getNextLight();
    }, [location.pathname]);


    const lightsComponents = trafficLights.map((light, index) => {
        return (
            <Light
                key={index}
                type={light.type}
                isActive={light.type === location.pathname.slice(1)}
                interval={light.interval}
                switchHandler={null}
            />
        )
    })


    return (
        <main className="App">
            <div className={"traffic-light"}>{lightsComponents}</div>
        </main>
    );
}

export default App;
