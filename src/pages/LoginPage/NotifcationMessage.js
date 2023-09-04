import "./LoginPage.css";
import "../../App.css";

export const NotificationMessage = (containerId, messageText) => {
    const container = document.getElementById(containerId);
    const message = document.createElement("p");
    message.classList.add("message-text");
    message.innerHTML = messageText;
    message.classList.add("message__animation");

    container.appendChild(message);

    //Animation for popup message
    setTimeout(() => 
    {
        message.classList.remove("message__animation");
        message.classList.add("message__fadeout");
        setTimeout(() => 
        {
            message.classList.remove("message__fadeout");
            container.removeChild(message);
        }, 1000);
    }, 3000);
}