const stations = [

    {
        id: "NTERM",
        name: "North Terminal",
        type: "TERMINAL",
        x: 500,
        y: 60
    },

    {
        id: "NORTH_JN",
        name: "North Junction",
        type: "JUNCTION",
        x: 500,
        y: 140
    },

    {
        id: "PINEHURST",
        name: "Pinehurst",
        type: "MEDIUM",
        x: 350,
        y: 160
    },

    {
        id: "PINE_JN",
        name: "Pine Junction",
        type: "JUNCTION",
        x: 650,
        y: 180
    },

    {
        id: "WEST_JN",
        name: "West Junction",
        type: "JUNCTION",
        x: 280,
        y: 300
    },

    {
        id: "OAKDALE",
        name: "Oakdale",
        type: "SMALL",
        x: 120,
        y: 350
    },

    {
        id: "LAKE_JN",
        name: "Lake Junction",
        type: "JUNCTION",
        x: 300,
        y: 480
    },

    {
        id: "LAKEVIEW",
        name: "Lake View",
        type: "SMALL",
        x: 130,
        y: 520
    },

    {
        id: "CENTRAL",
        name: "Central City",
        type: "MAJOR",
        x: 500,
        y: 320
    },

    {
        id: "SOUTHCITY",
        name: "South City",
        type: "MEDIUM",
        x: 500,
        y: 450
    },

    {
        id: "SOUTH_JN",
        name: "South Junction",
        type: "JUNCTION",
        x: 500,
        y: 540
    },

    {
        id: "MTERM",
        name: "Mega Terminal",
        type: "TERMINAL",
        x: 500,
        y: 650
    },

    {
        id: "EAST_JN",
        name: "East Junction",
        type: "JUNCTION",
        x: 760,
        y: 320
    },

    {
        id: "RIVER_JN",
        name: "River Junction",
        type: "JUNCTION",
        x: 850,
        y: 430
    },

    {
        id: "RIVERDALE",
        name: "Riverdale",
        type: "MEDIUM",
        x: 900,
        y: 250
    },

    {
        id: "RIVERSIDE",
        name: "Riverside",
        type: "MEDIUM",
        x: 950,
        y: 480
    },

    {
        id: "EASTPORT",
        name: "Eastport",
        type: "SMALL",
        x: 980,
        y: 330
    },

    {
        id: "COACH_YARD",
        name: "Coaching Yard",
        type: "YARD",
        x: 650,
        y: 420
    },

    {
        id: "FREIGHT_YARD",
        name: "Freight Yard",
        type: "YARD",
        x: 850,
        y: 560
    },

    {
        id: "IND_YARD",
        name: "Industrial Yard",
        type: "YARD",
        x: 980,
        y: 650
    }

];
const tracks = [

    {
        id: "T01",
        from: "NTERM",
        to: "NORTH_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 110
    },

    {
        id: "T02",
        from: "NORTH_JN",
        to: "PINE_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 110
    },

    {
        id: "T03",
        from: "NORTH_JN",
        to: "PINEHURST",
        lines: 1,
        type: "BRANCH",
        speedLimit: 80
    },

    {
        id: "T04",
        from: "PINE_JN",
        to: "WEST_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 110
    },

    {
        id: "T05",
        from: "WEST_JN",
        to: "CENTRAL",
        lines: 4,
        type: "MAIN",
        speedLimit: 130
    },

    {
        id: "T06",
        from: "CENTRAL",
        to: "EAST_JN",
        lines: 4,
        type: "MAIN",
        speedLimit: 130
    },

    {
        id: "T07",
        from: "WEST_JN",
        to: "OAKDALE",
        lines: 1,
        type: "BRANCH",
        speedLimit: 80
    },

    {
        id: "T08",
        from: "WEST_JN",
        to: "LAKE_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 100
    },

    {
        id: "T09",
        from: "LAKE_JN",
        to: "LAKEVIEW",
        lines: 1,
        type: "BRANCH",
        speedLimit: 70
    },

    {
        id: "T10",
        from: "CENTRAL",
        to: "SOUTHCITY",
        lines: 2,
        type: "MAIN",
        speedLimit: 110
    },

    {
        id: "T11",
        from: "SOUTHCITY",
        to: "SOUTH_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 100
    },

    {
        id: "T12",
        from: "SOUTH_JN",
        to: "MTERM",
        lines: 4,
        type: "TERMINAL_APPROACH",
        speedLimit: 80
    },

    {
        id: "T13",
        from: "CENTRAL",
        to: "COACH_YARD",
        lines: 2,
        type: "YARD",
        speedLimit: 40
    },

    {
        id: "T14",
        from: "SOUTH_JN",
        to: "FREIGHT_YARD",
        lines: 2,
        type: "FREIGHT",
        speedLimit: 60
    },

    {
        id: "T15",
        from: "EAST_JN",
        to: "RIVER_JN",
        lines: 2,
        type: "MAIN",
        speedLimit: 100
    },

    {
        id: "T16",
        from: "EAST_JN",
        to: "RIVERDALE",
        lines: 1,
        type: "BRANCH",
        speedLimit: 80
    },

    {
        id: "T17",
        from: "EAST_JN",
        to: "EASTPORT",
        lines: 1,
        type: "BRANCH",
        speedLimit: 80
    },

    {
        id: "T18",
        from: "RIVER_JN",
        to: "RIVERSIDE",
        lines: 1,
        type: "BRANCH",
        speedLimit: 70
    },

    {
        id: "T19",
        from: "EAST_JN",
        to: "FREIGHT_YARD",
        lines: 2,
        type: "FREIGHT",
        speedLimit: 60
    },

    {
        id: "T20",
        from: "FREIGHT_YARD",
        to: "IND_YARD",
        lines: 1,
        type: "FREIGHT",
        speedLimit: 40
    }

];
const trains = [

    {
        id: "12012",
        name: "Rajdhani",
        from: "WEST_JN",
        to: "CENTRAL",
        progress: 0.5,
        speed: 95,
        color: "#FFD54F"
    },

    {
        id: "54321",
        name: "Passenger",
        from: "CENTRAL",
        to: "EAST_JN",
        progress: 0.4,
        speed: 60,
        color: "#4FC3F7"
    }

];

const signals = [

    {
        id: "S1",
        from: "WEST_JN",
        to: "CENTRAL",
        progress: 0.75,
        state: "GREEN"
    },

    {
        id: "S2",
        from: "CENTRAL",
        to: "EAST_JN",
        progress: 0.75,
        state: "RED"
    }

];
window.world = {

    stations,

    tracks,

    trains,

    signals

};
const state = {

    simulationRunning: false,

    conflictLogged: false

};

window.state = state;