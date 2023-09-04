import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "../../App.css";
import "./PracticeChart.css";
import "./PracticePage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export function MyChart({correct, incorrect, skipped, passPercentage, setReviewQuestions}) {
    const data = {
        labels: ["Incorrect", "Correct", "Skipped"],
        datasets: [
            {
            label: '# of Questions',
            data: [incorrect, correct, skipped],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', //red
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', //red
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
            },
        ],
    };

    
    const options = {
        plugins: {
        legend: {
            display: false,
        },
        },
    };
    const percentageAcheived = (correct / (incorrect + skipped + correct)).toFixed(2) * 100;
    return(
        <div className='flex-row' style={{ width: '300px', height: '300px' }}>
            <Doughnut data={data}/>
            <div className="flex-column">
                {
                    passPercentage < percentageAcheived ? <h3 className="pass-text text">Passed, {passPercentage}% required to pass</h3> : 
                        <h3 className="fail-text text">Failed, {passPercentage}% required to pass</h3>
                }
                <h1>{percentageAcheived}%</h1>      
                <h4 style={{whiteSpace: "nowrap"}}>correct {correct} / {(incorrect + skipped + correct)}</h4>
                <button className='start-button' style={{marginTop: "10px"}} onClick={() => {
                    setReviewQuestions(true);
                }}>Review questions</button>
            </div>

        </div>
    );
}
