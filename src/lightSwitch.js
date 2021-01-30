import './App.css';
import {useState, useEffect} from "react";
import Light from "./components/Light";
import {BrowserRouter, useHistory, useParams} from "react-router-dom";
import {useLocation} from "react-router";


function App() {
    // /yellow?interval=30&forward=true

    const history = useHistory();
    const location = useLocation();
    const {timer} = useParams();

    const [model, setModel] = useState({
        lights: [
            {type: 'red', isActive: true, interval: 5000},
            {type: 'yellow', isActive: false, interval: 3000},
            {type: 'green', isActive: false, interval: 8000},
        ],
        isForward: true,
        isEnabled: true
    });


    const modelUpdater = () => {
        console.log('Update model! After. Not Now.')
    }
    /*
        useEffect(() => {
            console.log(location);
            setTimeout(() => {
                setModel(model => getLightByPath(model));
            }, 3000);
        }, [location.pathname]);
    */
    const lights = model.lights.map((light, index) => {
        return (
            <Light
                key={index}
                type={light.type}
                isActive={location.pathname.slice(1) === light.type}
                interval={light.interval}
                handler={modelUpdater}
            />
        )
    })

    const lightSwitcher = (model) => {
        if (model.isEnabled) {
            let lights = [...model.lights];
            let direction = model.isForward;

            const activeLight = lights.findIndex(item => {
                return item.isActive
            });
            if (activeLight === lights.length - 1 || activeLight === 0) {
                direction = !direction;
            }
            const nextLight = activeLight + (direction ? 1 : -1);

            lights[activeLight] = {...lights[activeLight], isActive: false};
            lights[nextLight] = {...lights[nextLight], isActive: true};

            history.replace(lights[nextLight].type);


            return {...model, lights, isForward: direction};
        }
        return model;
    }


    const getLightByPath = (model) => {
        let lights = [...model.lights];
        let direction = model.isForward;
        let nextStepDirection = direction;

        const activeLight = lights.findIndex(item => {
            return item.type === location.pathname.slice(1)
        });

        if (activeLight === 0) {
            direction = true;
            nextStepDirection = true;
        }
        if (activeLight === lights.length - 1) {
            direction = false;
            nextStepDirection = false;
        }
        const nextLight = activeLight + (direction ? 1 : -1);

        lights[activeLight] = {...lights[activeLight], isActive: false};
        lights[nextLight] = {...lights[nextLight], isActive: true};

        history.replace(`${lights[nextLight].type}?timer=${lights[nextLight].interval}&forward=${nextStepDirection}`);
        console.log(timer);


        return {...model, lights, isForward: direction};
    }

    const toggleSwitch = () => {
        setModel({...model, isEnabled: !model.isEnabled});
        return 0;
    }

    /*
    useEffect(() => {
        const interval = setInterval(() => {
            setModel(model => lightSwitcher(model));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    */
    return (
        <BrowserRouter>
            <div className="App">
                <button onClick={() => setModel(model => getLightByPath(model))}>Switch</button>
                <button onClick={toggleSwitch}>{model.isEnabled ? `Off` : `On`}</button>
                {lights}
            </div>
        </BrowserRouter>
    );
}

