import React, {useState, useEffect} from "react";
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";
import { Error } from "../Error/Error";
import { Loading } from "../Loading/loading";
import { CourseList } from "../../components/CourseList/CourseList";

import Cookies from "js-cookie";

import "../../App.css";
import "./CatalogPage.css";
import { ReadUserCatalog } from './../../db/Read/ReadUserCatalog';
import { IsLoggedIn } from "../../IsLoggedIn";

export const CatalogPage = () => {
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


    const getPurchasedList = () => {
        const temp = [];
        data?.detail.forEach(el => {
            if(dataUser.includes(el.name))
            {
                temp.push(true);
            }
            else{
                temp.push(false);
            }
        })

        return temp;
    }
    

    if(error){
        return <Error title="Internal Server Error" message={error.message}/>
    }
    else if(isFetching || isFetchingUser){
        return (
            <Loading/>
        )
    }else{
        return (
            <div class="full-height primary-background padding-top-100">
                <div className="catalogPage-section1 horizontal-align flex-column">
                    <h1 class="color-white font-size-4rem letter-spacing-2px margin-bottom-20px">
                        Catalog
                    </h1>
                    <h2 class="font-size-21 white-text text-align-center margin-bottom-5px">
                        All the practice questions you need to ace your exam.
                    </h2>
                    <h2 class="font-size-21 white-text text-align-center margin-bottom-30px">
                        All here in one place.
                    </h2>
                    <input placeholder="Find a product" className="catalogPage-input" type="text" onChange={event => {}}/>
                </div>

                <div className="catalogPage-section2 greyBackground-image">
                    <CourseList data={data} error={error} isFetching={isFetching} purchasedList={getPurchasedList()}/>
                </div>
            </div>
        )
    }
}

// export const CatalogPage = () => {

//     return (
//         <Temp/>
//     )
    // const [isFetching, setIsFetching] = useState(true);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState(null);
    // const [filter, setFilter] = useState("Java");
    // const [filteredArray, setFilteredArray] = useState([]);

    // const [isFetchingUser, setIsFetchingUser] = useState(true);
    // const [dataUser, setDataUser] = useState(null);

    // useEffect(() => {
    //     if (isFetching) {
    //       ReadAllCatalogs()
    //         .then((res) => {
    //           setData(res.data);
    //         })
    //         .catch((err) => {
    //           setError(err);
    //         })
    //         .finally(() => {
    //           setIsFetching(false);
    //         });
    //     }
    // }, [isFetching]);

    // useEffect(() => {
    //     if(isFetchingUser){
    //         const tokenFromCookie = Cookies.get('jwtToken');
    //         if(tokenFromCookie){
    //             ReadUserCatalog(Cookies.get('jwtToken'))
    //             .then(res => {
    //                 console.log(res);
    //                 setDataUser(res.data.detail);
    //             })
    //             .finally(() => {
    //                 setIsFetchingUser(false)
    //             });  
    //         }
    //     }
    // }, [dataUser, isFetchingUser])
      
    // useEffect(() => {
    // // Only filter and update filteredArray if filter or data change
    // if (filter && data) {
    //     const temp = data.detail.filter((el) => el.catagory === filter);
    //     setFilteredArray(temp);
    // }
    // }, [filter, data]);

    // if(error){
    //     return <Error title="Internal Server Error" message={error.message}/>
    // }
    // else if(isFetching || isFetchingUser){
    //     console.log(dataUser);
    //     return (
    //         <Loading/>
    //     )
    // }else if(filteredArray){

    //     return (
    //         <div className="flex-column complete-center full-height page-margin" style={{marginLeft:"60px"}}>
    //             <h1 style={{padding: "15px"}}>Catalog</h1>
    //             <div id="catalogpage-entry" className="flex-row height-100vh">
    //                 <div id="catalog" className="flex-column">
    //                     <CatalogWidget text="Java" setFilter={setFilter}/>
    //                     <CatalogWidget text="C++" setFilter={setFilter}/>
    //                     <CatalogWidget text="Javascript" setFilter={setFilter}/>
    //                 </div>
    //                 <div id="catalog-items" className="flex-row flex-wrap" style={{gap: "20px", padding: "20px", height: "fit-content"}}>
    //                 {
    //                     filteredArray?.map((el) => {
    //                         if (!dataUser.includes(el.name)) {
    //                         return (
                                // <Link to={`/catalog/${el.name}`} key={el.name}>
                                // <WidgetComponent text={el.name} img={el.name + ".png"} desc={el.description} />
                                // </Link>
    //                         );
    //                         } else {
    //                         return null; // Return null for elements you don't want to render
    //                         }
    //                     })
    //                 }
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
// }