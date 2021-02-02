import {useState, useEffect, useCallback} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {getCookie} from "./Tools/getCookie";
import './App.css';
import Light from "./components/Light";

function App() {
    const history = useHistory();
    const location = useLocation();

    const [trafficLights] = useState([
        {type: 'red', interval: 10},
        {type: 'yellow', interval: 3},
        {type: 'green', interval: 15},
    ])
    const [isForward, setForward] = useState(true);
    const [activeMode, setMode] = useState();
    const [counter, setCounter] = useState();

    //Location parser (get state from url and read counter from cookie if page are reload)
    useEffect(() => {
        const path = location.pathname.slice(1);
        const modeIndex = trafficLights.findIndex(elem => elem.type === path);
        if (modeIndex === -1) {
            history.replace(trafficLights[0].type);
        } else {
            setMode(modeIndex);
            if (typeof activeMode === "undefined" && path === getCookie('light')) {
                setCounter(parseInt(getCookie('counter')));
            } else {
                setCounter(trafficLights[modeIndex].interval);
            }
        }
    }, [location.pathname, trafficLights, history]);

    //URL switcher
    const switchLight = useCallback(() => {
        let direction = isForward;
        const activeIndex = activeMode;
        if (activeIndex === 0) direction = true;
        if (activeIndex === trafficLights.length - 1) direction = false;
        const nextMode = trafficLights[activeIndex + (direction ? 1 : -1)].type;
        setForward(direction);
        history.replace(nextMode);
    }, [activeMode, history, isForward, trafficLights])

    //Rotate handlers
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter => counter - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (counter === 0) switchLight();
    }, [counter, switchLight]);

    //StateToCookie writer
    useEffect(() => {
        document.cookie = `light=${location.pathname.slice(1)}`;
        document.cookie = `counter=${counter}`;
    }, [counter, location.pathname])

    //Array of lights
    const lightsComponents = trafficLights.map((light, index) => <Light
        key={index}
        type={light.type}
        isActive={index === activeMode} //location.pathname.slice(1)
        counter={counter}/>
    )

    return (
        <main className="App">
            <div className={"traffic-light"}>{lightsComponents}</div>
        </main>
    );
}

export default App;
