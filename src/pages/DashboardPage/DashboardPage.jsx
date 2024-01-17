import React, {useEffect, useState} from "react";
import { Button } from "../../components/Button/Button";
import { IsLoggedIn } from "../../IsLoggedIn";
import { ReadUserCatalog } from "../../db/Read/ReadUserCatalog";
import { CourseList } from './../../components/CourseList/CourseList';
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";
import { Loading } from "../Loading/loading";
import { Error } from "../Error/Error";
import Cookies from "js-cookie";

import "./DashboardPage.css";
import "../../App.css";


export const DashboardPage = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    // const [filter, setFilter] = useState("Java");
    // const [filteredArray, setFilteredArray] = useState([]);

    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        if (isFetching) {
          ReadAllCatalogs()
            .then((res) => {
              setData(res.data.detail);
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
        const tokenFromCookie = Cookies.get('jwtToken');
        if(IsLoggedIn(`catalog`)){
            ReadUserCatalog(tokenFromCookie)
            .then(res => {
                setDataUser(res.data.detail);
            })
            .finally(() => {
                setIsFetchingUser(false)
            });  
        }
    }, [data])

    const getOwnedList = () => {
        const temp = [];
        data?.forEach(el => {
            if(dataUser?.includes(el.name))
            {
                temp.push(el);
            }
        })

        return temp;
    }

    if(isFetching || isFetchingUser){
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
    else if(dataUser?.length === 0){
        return (
            <div class="dashboard-container min-height-inherit primary-background padding-top-100 overflow-hidden">
                <div className="dashboardPage-section1 horizontal-align flex-column">
                    <h1 class="color-white font-size-4rem letter-spacing-2px margin-bottom-30px">
                        Dashboard
                    </h1>
                    <h2 class="font-size-21 white-text text-align-center margin-bottom-5px">
                        Welcome to your dashboard, get started by heading to the
                    </h2>
                    <div class="dashboard-subtitle horizontal-align align-items-center margin-top-15px">
                        <div class="background-orange padding-10-15px border-radius-20 margin-right-7 cursor-pointer dashboardOrangeButton-container" onClick={() => {
                            window.location.href = "/catalog";
                        }}>
                            <h2 class="white-text font-size-175 textwrap-nowrap">
                                Catalog Page
                            </h2>
                        </div>
                        <h2 class="font-size-19 white-text text-align-center">
                            and getting a course! All your courses will be displayed here.
                        </h2>
                    </div>
                </div>
                <div className="dashboardPage-section2 greyBackground2-image">
                    <div class="dashboardButton-container">
                        <Button text="Get some questions!" func={() => {
                                window.location.href = "/catalog";
                        }}/>
                    </div>
                    <div class="dashboardButton-container">
                        <Button text="Go to learning plan" func={() => {
                                window.location.href = "/learningpath";
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div class="min-height-inherit primary-background padding-top-100">
                <div className="dashboardPage-section1 horizontal-align flex-column">
                    <h1 class="color-white font-size-4rem letter-spacing-2px margin-bottom-20px">
                        Dashboard
                    </h1>
                    <h2 class="font-size-21 white-text text-align-center margin-bottom-5px">
                        All the questions you've purchased
                    </h2>
                    <h2 class="font-size-21 white-text text-align-center margin-bottom-20px">
                        Here in one place
                    </h2>
                    <input placeholder="Find a product" className="dashboardPage-input" type="text" onChange={event => {}}/>
                </div>
    
                <div className="dashboardPage-section2 greyBackground2-image">
                    <CourseList data={getOwnedList()} error={error} isFetching={isFetching} purchasedList={Array.from({ length: dataUser?.length }, () => true)}/>
                </div>
            </div>
        )
    }
}
    // const [isFetching, setIsFetching] = useState(true);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState(null);
    
    // const [filteredList, setFilteredList] = useState([]);
    // const [input, setInput] = useState("");

    // const [catalogs, setCatalogs] = useState([]);
    // const [catalogsFetching, setCatalogsFetching] = useState(false);

    // useEffect(() => {
    //     setFilteredList(catalogs.filter(el => {
    //         return(
    //             el.name.toLowerCase().startsWith(input.toLowerCase())
    //         )
    //     }))
    // }, [input, data, catalogs])

    // useEffect(() => {
    //     if(isFetching){
    //         IsLoggedIn("dashboard");
    //         ReadUserCatalog(Cookies.get('jwtToken'))
    //         .then(res => {
    //             setData(res.data.detail);       
    //         })
    //         .catch(err => {
    //             setError(err)
    //         }) 
    //         .finally(() => {
    //             setIsFetching(false);
    //         })
    //     }
    // }, [isFetching]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       setCatalogsFetching(true);
    
    //       if (data) {
    //         try {
    //           const promises = data.map(async (el) => {
    //             const cat = await ReadCatalog(el, Cookies.get('jwtToken'));
    //             return cat.data.detail[0];
    //           });
    
    //           const results = await Promise.all(promises);
    
    //           setCatalogs([...results]);
    //         } catch (err) {
    //           setError(err);
    //         } finally {
    //           setCatalogsFetching(false);
    //         }
    //       }
    //     };
    //     fetchData();
    //   }, [data]);
        

    // if(isFetching){
    //     return (
    //         <Loading/>
    //     )
    // }
    // else if(error){
    //     // Unauthorized (jwt expires) or jwt missing (not logged in)
    //     return(
    //         <Error title="Internal Server Error" message={error.message}/>
    //     )
    // }
    // else if(data.length === 0){
    //     return (
    //         <div id="dashboardpage-entry" className="flex-column center-content full-height">
    //             <div id="dashboard-form" className="dashboard-form center-content">
    //                 <h1 className="dashboard-text center-text" >
    //                     <span style={{color: "var(--primary-color)"}}><b></b>Welcome to your dashboard</span><br/>
    //                 </h1>
    //                 <h2 className="center-text dashboard-text">
    //                     Get started by heading to the <a href="/catalog">catalog page</a> and getting a course! <br/> All your courses will be displayed here.
    //                 </h2>
    //                 <Button text="Start Preparing" func={() => {
    //                     LearningPathRelocate();
    //                 }}/>
    //             </div>
    //         </div>
    //     )
    // }
    // else{
    //     return(
    //         <div id="dashboardpage-entry" className="flex-column center-content page-margin">
    //             <div id="dashboard-form" className="dashboardForm">
    //                 <h1 className="dashboard-text" >Dashboard</h1>
    //                 <div className="flex-row">
    //                     <input placeholder="Find a product" className="dashboard-input" type="text" onChange={event => {setInput(event.target.value)}}/>
    //                 </div>
    
    //                 <div className="flex-row flex-wrap dashboardWidget-container">
    //                     {
    //                         catalogsFetching ? (
    //                             <Loading/>
    //                         ) : (
    //                             <></>
    //                         )
    //                     }
    //                     {
    //                         input === "" ?
    //                         (
    //                             catalogs.map((el) => {
    //                                 return(
    //                                     <Link to={`/practice/${el.name}`}>
    //                                         <WidgetComponent img={`${el.name}.png`} text={el.name} desc={el.shortDescription} price={el.price} difficulty={el.difficulty} starRating={el.starRating}/>
    //                                     </Link>
    //                                 )
    //                         })) : (
    //                             filteredList?.map(el => {
    //                                 return(
    //                                     <Link to={`/practice/${el.name}`}>
    //                                         <WidgetComponent img={`${el.name}.png`} text={el.name} desc={el.shortDescription} price={el.price} difficulty={el.difficulty} starRating={el.starRating}/>
    //                                     </Link>
    //                                 )
    //                             })
    //                         )
    //                     }
    //                 </div>
    //                 <Button text={"Go to your learning plan"} func={() => {LearningPathRelocate();}}/>
    //             </div>
    //         </div>
    //     )
    // }
