import { Store } from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'

const notificationTemplate = (type, title, message) => {
  return (
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    })
  )
}

// Renders errors or successfull transactions on the screen.
export const Notification = (type, title, message) => {
    if(type === "error")
    {
      return (
        notificationTemplate("danger", title, message)
      );
    }
    else{
      return (
        notificationTemplate(type, title, message)
      );
    }
  }