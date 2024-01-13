import React, {useState, useEffect} from "react";

import "../../App.css";
import "./CatalogPage.css";
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";
import { Error } from "../Error/Error";
import { Loading } from "../Loading/loading";
import { CourseList } from "../../components/CourseList/CourseList";

export const Temp = () => {
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
    

    if(error){
        return <Error title="Internal Server Error" message={error.message}/>
    }
    else if(isFetching){
        return (
            <Loading/>
        )
    }else{
        console.log(data)
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
                    <CourseList data={data} error={error} isFetching={isFetching}/>
                </div>
            </div>
        )
    }
}