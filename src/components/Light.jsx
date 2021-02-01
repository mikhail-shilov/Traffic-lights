import '../App.css';

function Light(props) {
    let classNames = ['light', `light--${props.type}`];
    if (props.isActive && props.counter !== 2) classNames = [...classNames, 'light--active'];

    return (
        <div className={classNames.join(' ')}>
            {props.isActive && props.counter > 0 && props.counter}
        </div>
    );
}

export default Light;
