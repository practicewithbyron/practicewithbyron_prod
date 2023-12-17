import { Store } from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'

// Renders errors or successfull transactions on the screen.
export const Notification = (type, title, message) => {
    if(type === "error")
    {
      return (
        Store.addNotification({
          title: title,
          message: message,
          type: "danger",
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
    else if(type === "success")
    {
      return (
        Store.addNotification({
          title: title,
          message: message,
          type: "success",
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
    else if(type === "info")
    {
      return (
        Store.addNotification({
          title: title,
          message: message,
          type: "info",
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
  }