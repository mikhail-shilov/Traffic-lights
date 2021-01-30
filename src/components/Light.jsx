import '../App.css';
import {useState, useEffect} from "react";

function Light(props) {

    let classNames = ['light', `light--${props.type}`];

    if (props.isActive) {
        classNames = [...classNames, 'light--active']
    }

    const [counter, setCounter] = useState(Math.round(props.interval / 1000));

    useEffect(() => {
        if (props.isActive) {
            if (counter > 0) {
                setTimeout(() => {
                    setCounter(counter - 1)
                }, 1000);
            } else {
                setCounter(Math.round(props.interval / 1000));
            }
        }
    }, [counter,props.isActive]);

    return (
        <div className={classNames.join(' ')}>
            {props.isActive && counter}
        </div>
    );
}

export default Light;
