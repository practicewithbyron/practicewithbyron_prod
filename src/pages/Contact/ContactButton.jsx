import React from "react";
import { Notification } from './../../Notification';
import { Button } from "../../components/Button/Button";
import { validateName } from "./validateName";
import { validateEmail } from './validateEmail';

import emailjs from 'emailjs-com';

import "animate.css";


var IsFormValid = true;
var PopUpMessages = [];

function ValidateInput(containerId, validatingDelegate, popUpMessage)
{
    var container = document.getElementById(containerId);
    if(validatingDelegate)
    {
        PopUpMessages.push(popUpMessage);
        container.classList.add("contactInput-invalid");
        IsFormValid = false;
    }
    else
    {
        container.classList.remove("contactInput-invalid")
    }
}

function CreatePopUpMessage()
{
    var toReturn = "Invalid"
    PopUpMessages.forEach((message, i) => 
    {
        //First Element
        if(i === 0)
        {
            toReturn += " " + message;
        }
        //Last Element
        else if(i === PopUpMessages.length - 1)
        {
            toReturn += " and " + message;
        }
        //Any other Element
        else
        {
            toReturn += ", " + message
        }
    })
    return toReturn;
}

const ContactButton = () => {
    IsFormValid = true;
    PopUpMessages = [];

    return(
        <div className="row__container">
            <Button text={"Send"} func={() => 
                {   
                    var name = document.getElementById("name-input");
                    var email = document.getElementById("email-input");
                    var subject = document.getElementById("subject-input");
                    var body = document.getElementById("body-input");

                    //Reset FormValidation
                    IsFormValid = true;

                    ValidateInput("nameInput-container", !validateName(name.value), "Name");
                    ValidateInput("emailInput-container", !validateEmail(email.value), "Email");
                    ValidateInput("subjectInput-container", !subject.value, "Subject");
                    ValidateInput("bodyInput-container", !body.value, "Body");

                    if(IsFormValid) //If the form is valid
                    {
                        emailjs.send('service_bbx7jtd', 'template_la38aux', {from_name: name.value, 
                            from_email: email.value, from_subject: subject.value, from_body: body.value}, 
                            "Jyyg6I50BeHll1dDt")
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                         }, function(error) {
                            console.log('FAILED...', error);
                         });

                        Notification("success", "Success", "Message sent!")

                        var form = document.getElementById("contactform");
                        form.reset();
                    }
                    else
                    {
                        Notification("error", "Error", CreatePopUpMessage());
                    }

                    
                }}/>
        </div>
    )
}

export default ContactButton