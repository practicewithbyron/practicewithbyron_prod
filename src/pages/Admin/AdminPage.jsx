import React, {useState} from "react";
import { Loading } from "../Loading/loading";
import { Button } from "../../components/Button/Button";
import { UpdateUserCatalog } from "../../db/Update/updateUserCatalog";
import { Login } from './../../db/login';

export const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [jwtToken, setJWTToken] = useState("");
    const [error, setError] = useState("No errors");
    const [response, setResponse] = useState("");

    if(loading)
    {
        return (
            <Loading/>
        )
    }
    else
    {
        return (
            <div className="flex-column" style={{marginTop: "50px"}}>
                <div className="flex-row">
                    <input id="username" type="text" placeholder="username"/>
                    <input id="password" type="text" placeholder="password"/>
                    <div style={{maxWidth: "400px"}}>
                        <Button text="Login" func={() => {
                            setLoading(true);
                            Login(`${document.getElementById("username").text}`, `${document.getElementById("password").text}`)
                            .then(res => {
                                setJWTToken(res.data.detail.jwt);
                            })
                            .catch(err => {
                                setError(err);
                            })
                            .finally(() => {
                                setLoading(false);
                            })
                        }}/>
                    </div>
                    <div style={{maxWidth: "400px"}}>
                        <Button text="Copy" func={() => {
                            navigator.clipboard.writeText(jwtToken);
                        }}/>
                    </div>

                </div>
                <div className="flex-row">
                    <input id="jwt" type="text" placeholder="jwt"/> 
                    <Button text="Update User Catalog" func={() => {
                        UpdateUserCatalog(document.getElementById("jwt").text)
                        .then(res => {
                            setResponse(res);
                        })
                        .catch(err => {
                            setError(err);
                        })
                    }}/>   
                </div>
                <h1>{error}</h1>
            </div>
        )
    }


}