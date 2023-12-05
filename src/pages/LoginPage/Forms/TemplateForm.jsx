import React from "react";

import "../../../App.css";
import "../LoginPage.css";

export const TemplateForm = ({FormContent}) => {
    return(
        <div id="loginpage-entry" className="center-content" style={{margin: "50px auto 0 auto"}}>
            <div id="loginform-content" className="login-form loginForm-container center-content">
                <>
                    {
                        FormContent
                    }
                </>
            </div>
        </div>
    )
}