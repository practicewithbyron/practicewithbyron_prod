export function TriggerNotification(messageContainer){
    messageContainer.classList.toggle("notShowing");
    messageContainer.classList.toggle("animate__jackInTheBox");
    setTimeout(() => {
      messageContainer.classList.toggle("animate__jackInTheBox");
      messageContainer.classList.toggle("animate__fadeOut");
      setTimeout(() => {
        messageContainer.classList.toggle("animate__fadeOut");
        messageContainer.classList.toggle("notShowing"); //Hide
      }, 1000) //How long the fadeout is
    }, 3000) //How long the animation and seeing the messsage takes
}