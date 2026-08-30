console.log("Renderer Loaded");
const svg = document.getElementById("railway-svg");
let zoomLevel = 1;
let panX = 0;
let panY = 0;
function updateCamera() {

    svg.style.transform =
        `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;

}
function resetCamera() {

    zoomLevel = 1;

    panX = 0;

    panY = 0;

    updateCamera();

}
svg.addEventListener("wheel", (event) => {

    event.preventDefault();

    if (event.deltaY < 0) {

        zoomLevel += 0.1;

    } else {

        zoomLevel -= 0.1;

    }

    zoomLevel = Math.max(0.5, Math.min(2.5, zoomLevel));

    updateCamera();

});
let isDragging = false;
let startX = 0;
let startY = 0;

svg.addEventListener("mousedown", (event) => {

    isDragging = true;

    startX = event.clientX;
    startY = event.clientY;

});

svg.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    panX += dx;
panY += dy;

updateCamera();

    startX = event.clientX;
    startY = event.clientY;

});

svg.addEventListener("mouseup", () => {

    isDragging = false;

});

svg.addEventListener("mouseleave", () => {

    isDragging = false;

});
console.log(typeof svg);
function drawStation(x, y, name) {
    console.log("DRAW STATION CALLED", name);

    // Station Circle
    const station = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    station.setAttribute("cx", x);
    station.setAttribute("cy", y);
    station.setAttribute("r", 8);
    station.setAttribute("fill", "#2ECC71");

    svg.appendChild(station);

    // Station Label
    const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    label.setAttribute("x", x);

    label.setAttribute("y", y - 18);

    label.setAttribute("fill", "#FFFFFF");

    label.setAttribute("font-size", "18");
    label.setAttribute("font-family", "Arial, sans-serif");

    label.setAttribute("text-anchor", "middle");

    label.textContent = name;
    console.log("Drawing station:", name);
    svg.appendChild(label);

}
function drawTrack(x1, y1, x2, y2, lines) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy);

    // Perpendicular unit vector
    const offsetX = -dy / length;
    const offsetY = dx / length;

    const spacing = 8;

    for (let i = 0; i < lines; i++) {

        const offset =
            (i - (lines - 1) / 2) * spacing;

        const startX = x1 + offsetX * offset;
        const startY = y1 + offsetY * offset;

        const endX = x2 + offsetX * offset;
        const endY = y2 + offsetY * offset;

        const track =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );

        track.setAttribute("x1", startX);
        track.setAttribute("y1", startY);

        track.setAttribute("x2", endX);
        track.setAttribute("y2", endY);

        track.setAttribute("stroke", "#2388FF");

        track.setAttribute("stroke-width", "3");

        svg.appendChild(track);

    }

}
function drawTrain(x, y, color){

    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    const body = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    body.setAttribute("x",x-18);

    body.setAttribute("y",y-10);

    body.setAttribute("width",36);

    body.setAttribute("height",20);

    body.setAttribute("rx",6);

    body.setAttribute("fill",color);

    const window=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    window.setAttribute("x",x-6);

    window.setAttribute("y",y-6);

    window.setAttribute("width",12);

    window.setAttribute("height",8);

    window.setAttribute("fill","#222");

    group.appendChild(body);

    group.appendChild(window);

    svg.appendChild(group);

}
function drawSignal(x, y, state){

    const signal = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    signal.setAttribute("cx", x);

    signal.setAttribute("cy", y);

    signal.setAttribute("r", 7);

    signal.setAttribute(
        "fill",
        state === "GREEN" ? "#2ECC71" : "#E74C3C"
    );

    signal.setAttribute("stroke", "white");

    signal.setAttribute("stroke-width", "2");

    svg.appendChild(signal);

}
function renderNetwork(){

    // Clear SVG

    svg.innerHTML = "";

    // Draw Tracks

    world.tracks.forEach(track => {

    const start = getStation(track.from);
    const end = getStation(track.to);

    drawTrack(
    start.x,
    start.y,
    end.x,
    end.y,
    track.lines
);

});
    // Draw Signals

world.signals.forEach(signal => {

    const position = getSignalPosition(signal);

    drawSignal(

        position.x,

        position.y,

        signal.state

    );

});
    // Draw Stations

    world.stations.forEach(station=>{

        drawStation(

            station.x,

            station.y,

            station.name

        );

    });

    // Draw Trains

    world.trains.forEach(train=>{

    const position = getTrainPosition(train);

    drawTrain(

        position.x,

        position.y,

        train.color

    );

});
const aiText = document.getElementById("aiDecisionText");

aiText.textContent = aiDecision();
}
window.renderNetwork = renderNetwork;
document
    .getElementById("resetViewBtn")
    .addEventListener("click", () => {

        resetCamera();

    });