import React, { useEffect, useState } from "react";
import { WidgetComponent } from "../../components/Widget/WidgetComponent";
import { Loading } from "../Loading/loading";
import { ReadUserCatalog } from "../../db/Read/ReadUserCatalog";
import { Error } from "../Error/Error";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import Cookies from "js-cookie";

import "./DashboardPage.css";
import "../../App.css";
import "../LoginPage/LoginPage.css";


export const DashboardPage = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    const [filteredList, setFilteredList] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        setFilteredList(data?.detail?.filter(el => {
            return(
                el.toLowerCase().startsWith(input.toLowerCase())
            )
        }))
    }, [input, data])


    if(isFetching){
        const tokenFromCookie = Cookies.get('jwtToken');
        console.log(tokenFromCookie);
        if(!tokenFromCookie){
            window.location.href = "/login";
        }
        ReadUserCatalog(Cookies.get('jwtToken'))
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });  
    }
        
    if(isFetching){
        return (
            <Loading/>
        )
    }
    else if(error){
        // Unauthorized (jwt expires) or jwt missing (not logged in)
        if(error.request.status === 401 || error.request.status === 422){
            window.location.href = "/login"
        }
        else{
            return(
                <Error title="Internal Server Error" message={error.message}/>
            )
        }
    }
    else if(data.detail.length === 0){
        return (
            <div id="dashboardpage-entry" className="flex-column center-content full-height">
                <div id="dashboard-form" className="dashboard-form center-content">
                    <h1 className="dashboard-text center-text" >
                        <span style={{color: "var(--primary-color)"}}><b></b>Welcome to your dashboard</span><br/>
                    </h1>
                    <h2 className="center-text dashboard-text">
                        Get started by heading to the <a href="/catalog">catalog page</a> and getting a course! <br/> All your courses will be displayed here.
                    </h2>
                    <Button text="Start Preparing" func={() => {
                        window.location.href = "/catalog";
                    }}/>
                </div>
            </div>
        )
    }
    else{
        return(
            <div id="dashboardpage-entry" className="flex-column center-content page-margin">
                <div id="dashboard-form" className="dashboardForm">
                    <h1 className="dashboard-text" >Dashboard</h1>
                    <div className="flex-row">
                        <input placeholder="Find a product" className="dashboard-input" type="text" onChange={event => {setInput(event.target.value)}}/>
                    </div>
    
                    <div className="flex-row flex-wrap dashboardWidget-container">
                        {
                            input === "" ?
                            (
                                data.detail.map(el => {
                                    return(
                                        <Link to={`/practice/${el}`}>
                                            <WidgetComponent img={`${el}.png`} text={el} desc="Some desc"/>
                                        </Link>
                                    )
                            })) : (
                                filteredList?.map(el => {
                                    return(
                                        <Link to={`/practice/${el}`}>
                                            <WidgetComponent img={`${el}.png`} text={el} desc="Some desc"/>
                                        </Link>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }




}