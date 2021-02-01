import '../App.css';
import {useState, useEffect} from "react";
import {getCookie} from "../Tools/common";

function Light(props) {

    const fullInterval = Math.round(props.interval / 1000);
    const [counter, setCounter] = useState(fullInterval);
    let classNames = ['light', `light--${props.type}`];
    if (props.isActive && counter !== 2) {
        classNames = [...classNames, 'light--active']
    }

    useEffect(() => {
        if (props.isActive) {
            if (counter > 0) {
                setTimeout(() => {
                    setCounter(counter - 1)
                    document.cookie = `time=${counter-1}`;
                    console.log(document.cookie);
                }, 1000);
            } else {
                setCounter(fullInterval);
            }
        }
    }, [counter, props.isActive]);

    return (
        <div className={classNames.join(' ')}>
            {props.isActive && counter}
        </div>
    );
}

export default Light;
