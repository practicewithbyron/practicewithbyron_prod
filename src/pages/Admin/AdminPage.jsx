import React from "react";
import { Loading } from "../Loading/loading";
import { Button } from "../../components/Button/Button";
import { UpdateUserCatalog } from "../../db/Update/updateUserCatalog";
import { Login } from './../../db/login';

export const AdminPage = () => {
    const [loading, setLoading] = useState(false);

    if(loading)
    {
        return (
            <Loading/>
        )
    }
    else
    {
        return (
            <div className="flex-column">
                <div className="flex-row">
                    <input id="username" type="text" placeholder="username"/>
                    <input id="password" type="text" placeholder="password"/>
                    <Button text="Login" func={() => {
                        Login("a2@a.com", "Password1234.")
                    }}/>
                </div>
                <Button text="Update User Catalog" func={() => {
                    UpdateUserCatalog(Cookies.)
                }}/>
            </div>
        )
    }


}