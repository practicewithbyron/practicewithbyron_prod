import React, { useEffect } from "react";
import { Loading } from "../Loading/loading";
import { UpdateUserCatalog } from "../../db/Update/updateUserCatalog";
import { UpdateUserPassword } from "../../db/Update/updateUserPassword";
import { CreateIncorrectQuestions } from "../../db/Create/createIncorrectQuestions";
import { FindIncorrectQuestionsByUser } from "../../db/Read/findIncorrectQuestionsByUser";
import { ReadUserCatalog } from "../../db/Read/ReadUserCatalog";
import { ReadAllCatalogQuestions } from "../../db/Read/ReadAllCatalogQuestions";

export const AdminPage = () => {

    //const {data, isFetching, error} = CreateUser("dada@addad.com", "dawdawa");
    //const {data, isFetching, error} = UpdateUserCatalog("643278ad2fb059fe23d19872", "PCEP-41-01")
    //const {data, isFetching, error} = UpdateUserPassword("643278ad2fb059fe23d19872", "TheNewestPasswrord");
    //const {data, isFetching, error} = CreateIncorrectQuestions("643278ad2fb059fe23d19872", "JSA-41-01", ["642b048d6431c01ffe1fbd8f", "642b048d6431c01ffe1fbd8d"])
    //const {data, isFetching, error} = FindIncorrectQuestionsByUser("643278ad2fb059fe23d19872");
    //const {data, isFetching, error} = FindUserCatalog("643278ad2fb059fe23d19872");
    const {data, isFetching, error} = ReadAllCatalogQuestions("CPA-21-02");

    console.log(data);

    if(error){
        console.log("error");
        return <h1>Error</h1>
    }
    else if(isFetching){
        return (
            <Loading/>
        )
    }
    else{
        return (
            <div style={{marginTop: "80px"}}>
                <h1>
                    Admin Page
                </h1>
                {
                    <h1>Inserted Id: </h1>
                }
            </div>
        )
    }
}