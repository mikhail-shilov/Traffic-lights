export const lightUpdater = () => {

    let goForward = false;
    return (inputLights) => {
        let lights = [...inputLights];
        const activeLight = lights.indexOf(true);
        lights[activeLight] = false;


        if (activeLight === lights.length - 1 || activeLight === 0) {
            debugger
            goForward = !goForward;
        }
        lights[activeLight + (goForward ? 1 : -1)] = true;
        console.log(lights)
        return lights;
    }
}