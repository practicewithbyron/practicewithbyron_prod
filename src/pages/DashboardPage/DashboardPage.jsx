import React, { useEffect, useState, useRef } from "react";
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
import { IsLoggedIn } from "../../IsLoggedIn";
import { ReadCatalog } from "../../db/Read/ReadCatalog";

function LearningPathRelocate(){
    window.location.href = "/learningpath"
}

export const DashboardPage = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    const [filteredList, setFilteredList] = useState([]);
    const [input, setInput] = useState("");

    const [catalogs, setCatalogs] = useState([]);
    const [catalogsFetching, setCatalogsFetching] = useState(false);

    useEffect(() => {
        setFilteredList(catalogs.filter(el => {
            return(
                el.name.toLowerCase().startsWith(input.toLowerCase())
            )
        }))
    }, [input, data, catalogs])

    useEffect(() => {
        if(isFetching){
            IsLoggedIn("dashboard");
            ReadUserCatalog(Cookies.get('jwtToken'))
            .then(res => {
                setData(res.data.detail);       
            })
            .catch(err => {
                setError(err)
            }) 
            .finally(() => {
                setIsFetching(false);
            })
        }
    }, [isFetching]);

    useEffect(() => {
        const fetchData = async () => {
          setCatalogsFetching(true);
    
          if (data) {
            try {
              const promises = data.map(async (el) => {
                const cat = await ReadCatalog(el, Cookies.get('jwtToken'));
                return cat.data.detail[0];
              });
    
              const results = await Promise.all(promises);
    
              setCatalogs([...results]);
            } catch (err) {
              setError(err);
            } finally {
              setCatalogsFetching(false);
            }
          }
        };
        fetchData();
      }, [data]);
        

    if(isFetching){
        return (
            <Loading/>
        )
    }
    else if(error){
        // Unauthorized (jwt expires) or jwt missing (not logged in)
        return(
            <Error title="Internal Server Error" message={error.message}/>
        )
    }
    else if(data.length === 0){
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
                        LearningPathRelocate();
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
                            catalogsFetching ? (
                                <Loading/>
                            ) : (
                                <></>
                            )
                        }
                        {
                            input === "" ?
                            (
                                catalogs.map((el) => {
                                    return(
                                        <Link to={`/practice/${el.name}`}>
                                            <WidgetComponent img={`${el.name}.png`} text={el.name} desc={el.shortDescription} price={el.price} difficulty={el.difficulty} starRating={el.starRating}/>
                                        </Link>
                                    )
                            })) : (
                                filteredList?.map(el => {
                                    return(
                                        <Link to={`/practice/${el.name}`}>
                                            <WidgetComponent img={`${el.name}.png`} text={el.name} desc={el.shortDescription} price={el.price} difficulty={el.difficulty} starRating={el.starRating}/>
                                        </Link>
                                    )
                                })
                            )
                        }
                    </div>
                    <Button text={"Go to your learning plan"} func={() => {LearningPathRelocate();}}/>
                </div>
            </div>
        )
    }




}