function getStation(id){

    return world.stations.find(
    station => station.id === id
);

}
function getTrainPosition(train){

    const start = getStation(train.from);

    const end = getStation(train.to);

    const x = start.x + (end.x - start.x) * train.progress;

    const y = start.y + (end.y - start.y) * train.progress;

    return {x,y};

}
function getSignalPosition(signal){

    const start = getStation(signal.from);

    const end = getStation(signal.to);

    const x = start.x + (end.x - start.x) * signal.progress;

    const y = start.y + (end.y - start.y) * signal.progress;

    return {x, y};

}

renderNetwork();
function animate() {
console.log("Animation Running", state.simulationRunning);
    if (state.simulationRunning) {

        world.trains.forEach(train => {

            const signal = world.signals.find(s =>
    s.from === train.from && s.to === train.to
);

if(signal && signal.state === "GREEN"){

    train.progress += 0.003;
if(train.progress >= 1){

    train.progress = 0;

    if(train.id === "12012"){

        world.signals[0].state = "RED";

        world.signals[1].state = "GREEN";

    }

}
}
            console.log(train.progress);
            if (train.progress >= 1) {
                train.progress = 0;
            }

        });

        renderNetwork();
    }

    requestAnimationFrame(animate);

}
window.getStation = getStation;
window.getTrainPosition = getTrainPosition;
window.getSignalPosition = getSignalPosition;
window.animate = animate;
animate();