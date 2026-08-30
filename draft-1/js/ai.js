function detectConflict(){

    const train1 = world.trains[0];

    const train2 = world.trains[1];

    if(
        train1.to === train2.to &&
        Math.abs(train1.progress - train2.progress) < 0.25
    ){
        return true;
    }

    return false;

}
function calculatePriority(train){

    if(train.name === "Rajdhani"){

        return 100;

    }

    return 50;

}
function aiDecision(){

    if(detectConflict()){

    if(!state.conflictLogged){

        addEvent("⚠ Conflict Detected");

        state.conflictLogged = true;

    }

    const train1 = world.trains[0];

const train2 = world.trains[1];

if(calculatePriority(train1) > calculatePriority(train2)){

    return "🚆 Give Priority to Rajdhani";

}

return "🚆 Give Priority to Passenger";

}

    return "✅ No Conflict";

}
window.detectConflict = detectConflict;
window.aiDecision = aiDecision;