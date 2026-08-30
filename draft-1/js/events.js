function addEvent(message){

    const eventList = document.getElementById("eventList");

    const item = document.createElement("li");

    item.textContent = message;

    eventList.prepend(item);

}
window.addEvent = addEvent;