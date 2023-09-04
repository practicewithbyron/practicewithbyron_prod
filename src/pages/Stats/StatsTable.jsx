import React from 'react';
import { useTable } from 'react-table';

import "./StatsPage.css";
import "../../App.css";

const StatsTable = () => {
  // Sample data
  const data = [
    { attempt: "Full exam", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Incorrect question", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Generator functions", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Full exam", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Incorrect question", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Generator functions", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Full exam", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Incorrect question", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Generator functions", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Full exam", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Incorrect question", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
    { attempt: "Generator functions", answersCorrect: 56, percentage: "68%", pass: "passed", date: "26/08/2023"},
  ];

  // Columns configuration
  const columns = [
    { Header: 'Attempt', accessor: 'attempt' },
    { Header: 'Answers correct', accessor: 'answersCorrect' },
    { Header: 'Percentage', accessor: 'percentage' },
    { Header: 'Pass/Fail', accessor: 'pass' },
    { Header: 'Date', accessor: 'date' },

  ];


  return (
    <div style={{maxHeight: "100%", overflowY: "scroll"}}>
        <table className="custom-table stats-table">
        <thead>
            <tr className='statsTable-header statsTable-row'>
            {columns.map(column => (
                <th className='statsTable-head' key={column.accessor}>{column.Header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map(row => (
            <tr className="statsTable-row" key={row.id}>
                {columns.map(column => (
                <td  key={column.accessor}>{row[column.accessor]}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    </div>


  );
};

export default StatsTable;