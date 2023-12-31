import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { CatalogWidget } from "../../components/CatalogWidget/CatalogWidget";
import { WidgetComponent } from "../../components/Widget/WidgetComponent";
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";
import { ReadUserCatalog } from "../../db/Read/ReadUserCatalog";
import { Error } from "../Error/Error";

import Cookies from "js-cookie";

import "../../App.css"

export const CatalogPage = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState("Java");
    const [filteredArray, setFilteredArray] = useState([]);

    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        if (isFetching) {
          ReadAllCatalogs()
            .then((res) => {
              setData(res.data);
            })
            .catch((err) => {
              setError(err);
            })
            .finally(() => {
              setIsFetching(false);
            });
        }
    }, [isFetching]);

    useEffect(() => {
        if(isFetchingUser){
            const tokenFromCookie = Cookies.get('jwtToken');
            if(tokenFromCookie){
                ReadUserCatalog(Cookies.get('jwtToken'))
                .then(res => {
                    console.log(res);
                    setDataUser(res.data.detail);
                })
                .finally(() => {
                    setIsFetchingUser(false)
                });  
            }
        }
    }, [dataUser, isFetchingUser])
      
    useEffect(() => {
    // Only filter and update filteredArray if filter or data change
    if (filter && data) {
        const temp = data.detail.filter((el) => el.catagory === filter);
        setFilteredArray(temp);
    }
    }, [filter, data]);

    if(error){
        return <Error title="Internal Server Error" message={error.message}/>
    }
    else if(isFetching || isFetchingUser){
        console.log(dataUser);
        return (
            <Loading/>
        )
    }else if(filteredArray){

        return (
            <div className="flex-column complete-center full-height page-margin" style={{marginLeft:"60px"}}>
                <h1 style={{padding: "15px"}}>Catalog</h1>
                <div id="catalogpage-entry" className="flex-row height-100vh">
                    <div id="catalog" className="flex-column">
                        <CatalogWidget text="Java" setFilter={setFilter}/>
                        <CatalogWidget text="C++" setFilter={setFilter}/>
                        <CatalogWidget text="Javascript" setFilter={setFilter}/>
                    </div>
                    <div id="catalog-items" className="flex-row flex-wrap" style={{gap: "20px", padding: "20px", height: "fit-content"}}>
                    {
                        filteredArray?.map((el) => {
                            if (!dataUser.includes(el.name)) {
                            return (
                                <Link to={`/catalog/${el.name}`} key={el.name}>
                                <WidgetComponent text={el.name} img={el.name + ".png"} desc={el.description} />
                                </Link>
                            );
                            } else {
                            return null; // Return null for elements you don't want to render
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}