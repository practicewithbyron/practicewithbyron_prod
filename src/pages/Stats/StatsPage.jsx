import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

import "./StatsPage.css";
import "../../App.css";
import StatsTable from './StatsTable';
import { Button } from "../../components/Button/Button";
import { IsLoggedIn } from "../../IsLoggedIn";

export const StatsPage = () => {
    const {exam} = useParams();

    useEffect(() => {
        IsLoggedIn(`stats/${exam}`);
    }, [exam])

    //Look at users previous attempts and give them a nice little graph

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["", "", "", "","", "", "", ""]
        }
    }

    const series = [
        {
            name: "percentages",
            data: [56, 51, 89, 19,56, 51, 89, 19]
        }
    ]

    return (
        <div>
            <div className="header-container">
                <h1 className="header">
                    Welcome, here is an overview of your results
                </h1>
            </div>
            <div className="flex-row stats-container full-height statsRow-1">
                <div className="statsItem-container statsGraph-container">
                    <div className="flex-column">
                        <h2 className="statsItem-header">Performance</h2>
                        <div style={{padding: "auto"}}>
                            <Chart
                                options={options}
                                series={series}
                                type="line"
                            />
                        </div>
                        <h2 className="statsItem-header">
                            Areas to improve
                        </h2>
                        <ul >
                            <li>
                                Generator functions
                            </li>
                            <li>
                                Advanced control functions
                            </li>
                            <li>
                                For loops
                            </li>
                        </ul>
                        <Link to={"/practice/" + exam}>
                            <Button text="Do exam" func={() => {}}/>
                        </Link>
                    </div>
                </div>

                <div className="statsItem-container statsTable-container" >
                    <h2 className="statsItem-header">Previous results</h2>
                    <StatsTable/>
                </div>

            </div>

        </div>
    );
}