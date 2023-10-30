import React from "react"
import { ErrorAlert } from './components/Alert/ErrorAlert';
import { SuccessAlert } from "./components/Alert/SuccessAlert";
import { InfoAlert } from "./components/Alert/InfoAlert";

// Renders errors or successfull transactions on the screen.
export function Notification(type, title, message){
    if(type === "error")
    {
      return (
        <ErrorAlert errorTitle={title} errorMessage={message}/>
      )
    }
    else if(type === "success")
    {
      return (
        <SuccessAlert successTitle={title} successMessage={message}/>
      )
    }
    else if(type === "info")
    {
      return (
        <InfoAlert infoTitle={title} infoMessage={message}/>
      )
    }
  }