animate();
document
.getElementById("startBtn")
.addEventListener("click",()=>{

    console.log("START CLICKED");

    state.simulationRunning = true;

    addEvent("🚆 Simulation Started");

});
document
.getElementById("pauseBtn")
.addEventListener("click",()=>{

    state.simulationRunning = false;

});