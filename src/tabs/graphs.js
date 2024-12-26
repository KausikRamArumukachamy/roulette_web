// import React, { useState, useEffect } from 'react';
// import './graphs.css';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function Graph() {
//   const [lastDraw, setLastDraw] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');
//   const [lastRow, setLastRow] = useState(null);
//   const [redBlackData, setRedBlackData] = useState({
//     red_statistics: [],
//     black_statistics: [],
//   });
//   const [oddEvenData, setOddEvenData] = useState({
//     odd_statistics: [],
//     even_statistics: [],
//   });
//   const [lowHighData, setLowHighData] = useState({
//     low_statistics: [],
//     high_statistics: [],
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchLastRow();
//     fetchRedBlackData();
//     fetchOddEvenData();
//     fetchLowHighData();
//   }, []);

//   const handleAddLastDraw = async () => {
//     if (isNaN(lastDraw) || lastDraw.trim() === '') {
//       alert('Please enter a valid number for the last draw.');
//       return;
//     }

//     try {
//       const payload = { number: parseInt(lastDraw, 10) };

//       const response = await fetch('http://localhost:8000/add-last-draw', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send last draw to the backend.');
//       }

//       const data = await response.json();
//       setResponseMessage(data.message || 'Last draw added successfully!');
//       setLastDraw(''); // Clear the input field
//       fetchLastRow(); // Refresh the last row
//       fetchRedBlackData(); // Fetch updated red-black data
//       fetchOddEvenData(); // Fetch updated odd-even data
//       fetchLowHighData(); // Fetch updated low-high data
//     } catch (error) {
//       console.error('Error sending last draw:', error);
//       alert('An error occurred while sending the last draw.');
//     }
//   };

//   const handleRemoveLastDraw = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/remove-last-draw', {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to remove the last draw.');
//       }

//       const data = await response.json();
//       setResponseMessage(data.message || 'Last draw removed successfully!');
//       fetchLastRow(); // Refresh the last row

//       // Remove last statistic from all lists
//       setRedBlackData((prevData) => ({
//         red_statistics: prevData.red_statistics.slice(0, -1),
//         black_statistics: prevData.black_statistics.slice(0, -1),
//       }));
//       setOddEvenData((prevData) => ({
//         odd_statistics: prevData.odd_statistics.slice(0, -1),
//         even_statistics: prevData.even_statistics.slice(0, -1),
//       }));
//       setLowHighData((prevData) => ({
//         low_statistics: prevData.low_statistics.slice(0, -1),
//         high_statistics: prevData.high_statistics.slice(0, -1),
//       }));
//     } catch (error) {
//       console.error('Error removing last draw:', error);
//       alert('An error occurred while removing the last draw.');
//     }
//   };

//   const fetchLastRow = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get-last-row');
//       if (!response.ok) {
//         throw new Error('Failed to fetch last row');
//       }
//       const data = await response.json();
//       setLastRow(data.last_row); // Update state with the last row data
//     } catch (error) {
//       console.error('Error fetching last row:', error);
//       alert('An error occurred while fetching the last row.');
//     }
//   };

//   // Fetch data for red-black, odd-even, and low-high stats
//   const fetchRedBlackData = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get-redblack-stats');
//       if (!response.ok) {
//         throw new Error('Failed to fetch red-black data');
//       }

//       const data = await response.json();
//       setRedBlackData((prevData) => ({
//         red_statistics: [...prevData.red_statistics, data.last_red_statistic],
//         black_statistics: [...prevData.black_statistics, data.last_black_statistic],
//       }));
//     } catch (error) {
//       console.error('Error fetching red-black data:', error);
//       alert('An error occurred while fetching red-black data.');
//     }
//   };

//   const fetchOddEvenData = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get-oddeven-stats');
//       if (!response.ok) {
//         throw new Error('Failed to fetch odd-even data');
//       }

//       const data = await response.json();
//       setOddEvenData((prevData) => ({
//         odd_statistics: [...prevData.odd_statistics, data.last_odd_statistic],
//         even_statistics: [...prevData.even_statistics, data.last_even_statistic],
//       }));
//     } catch (error) {
//       console.error('Error fetching odd-even data:', error);
//       alert('An error occurred while fetching odd-even data.');
//     }
//   };

//   const fetchLowHighData = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get-lowhigh-stats');
//       if (!response.ok) {
//         throw new Error('Failed to fetch low-high data');
//       }

//       const data = await response.json();
//       setLowHighData((prevData) => ({
//         low_statistics: [...prevData.low_statistics, data.last_low_statistic],
//         high_statistics: [...prevData.high_statistics, data.last_high_statistic],
//       }));
//     } catch (error) {
//       console.error('Error fetching low-high data:', error);
//       alert('An error occurred while fetching low-high data.');
//     }
//   };

//   // Chart data for Red-Black stats
//   const redBlackChartData = {
//     labels: redBlackData.red_statistics.map((_, index) => index + 1),
//     datasets: [
//       {
//         label: 'Red Statistics',
//         data: redBlackData.red_statistics,
//         borderColor: 'red',
//         fill: false,
//       },
//       {
//         label: 'Black Statistics',
//         data: redBlackData.black_statistics,
//         borderColor: 'black',
//         fill: false,
//       },
//     ],
//   };

//   // Chart data for Odd-Even stats
//   const oddEvenChartData = {
//     labels: oddEvenData.odd_statistics.map((_, index) => index + 1),
//     datasets: [
//       {
//         label: 'Odd Statistics',
//         data: oddEvenData.odd_statistics,
//         borderColor: 'green',
//         fill: false,
//       },
//       {
//         label: 'Even Statistics',
//         data: oddEvenData.even_statistics,
//         borderColor: 'blue',
//         fill: false,
//       },
//     ],
//   };

//   // Chart data for Low-High stats
//   const lowHighChartData = {
//     labels: lowHighData.low_statistics.map((_, index) => index + 1),
//     datasets: [
//       {
//         label: 'Low Statistics',
//         data: lowHighData.low_statistics,
//         borderColor: 'orange',
//         fill: false,
//       },
//       {
//         label: 'High Statistics',
//         data: lowHighData.high_statistics,
//         borderColor: 'purple',
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <div className="graph">
//       {/* Last Draw Section */}
//       <div className="last-draw-container">
//         <label htmlFor="last-draw" className="last-draw-label">
//           Last Draw:
//         </label>
//         <input
//           type="number"
//           id="last-draw"
//           placeholder="Enter last draw"
//           className="last-draw-input"
//           value={lastDraw}
//           onChange={(e) => setLastDraw(e.target.value)}
//         />
//         <div className="last-draw-buttons">
//           <button className="last-draw-button" onClick={handleAddLastDraw}>
//             Add Last Draw
//           </button>
//           <button className="last-draw-button" onClick={handleRemoveLastDraw}>
//             Remove Last Draw
//           </button>
//         </div>
//       </div>

//       {responseMessage && <p className="response-message">{responseMessage}</p>}

//       <div className="graph-container">
//         {/* Dataframe Section */}
//         <div className="graph-item">
//           <h4>Dataframe</h4>
//           {lastRow ? (
//             <div className="dataframe-table-container">
//               <table className="dataframe-table">
//                 <thead>
//                   <tr>
//                     <th>Number</th>
//                     <th>Colour</th>
//                     <th>Odd/Even</th>
//                     <th>High/Low</th>
//                     <th>Red Statistic</th>
//                     <th>Black Statistic</th>
//                     <th>Odd Statistic</th>
//                     <th>Even Statistic</th>
//                     <th>High Statistic</th>
//                     <th>Low Statistic</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{lastRow.number}</td>
//                     <td>{lastRow.colour}</td>
//                     <td>{lastRow.odd_even}</td>
//                     <td>{lastRow.high_low}</td>
//                     <td>{lastRow.red_statistic}</td>
//                     <td>{lastRow.black_statistic}</td>
//                     <td>{lastRow.odd_statistic}</td>
//                     <td>{lastRow.even_statistic}</td>
//                     <td>{lastRow.high_statistic}</td>
//                     <td>{lastRow.low_statistic}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>Loading last row...</p>
//           )}
//         </div>

//         {/* Graphs Section */}
//         <div className="graph-item">
//           <h4>Red-Black Graph</h4>
//           <div className="graph-placeholder">
//             <Line data={redBlackChartData} />
//           </div>
//         </div>

//         <div className="graph-item">
//           <h4>Odd-Even Graph</h4>
//           <div className="graph-placeholder">
//             <Line data={oddEvenChartData} />
//           </div>
//         </div>

//         <div className="graph-item">
//           <h4>Low-High Graph</h4>
//           <div className="graph-placeholder">
//             <Line data={lowHighChartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Graph;

import React, { useState, useEffect } from 'react';
import './graphs.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Graph() {
  const [lastDraw, setLastDraw] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [lastRow, setLastRow] = useState(null);
  const [redBlackData, setRedBlackData] = useState({
    red_statistics: [],
    black_statistics: [],
  });
  const [oddEvenData, setOddEvenData] = useState({
    odd_statistics: [],
    even_statistics: [],
  });
  const [lowHighData, setLowHighData] = useState({
    low_statistics: [],
    high_statistics: [],
  });

  const [allStatsData, setAllStatsData] = useState({
    red_statistics:[],
    black_statistics:[],
    odd_statistics:[],
    even_statistics:[],
    low_statistics:[],
    high_statistics:[]
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchLastRow();
    fetchStatsData();
  }, []);

  const handleAddLastDraw = async () => {
    if (isNaN(lastDraw) || lastDraw.trim() === '') {
      alert('Please enter a valid number for the last draw.');
      return;
    }

    try {
      const payload = { number: parseInt(lastDraw, 10) };

      const response = await fetch('http://localhost:8000/add-last-draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send last draw to the backend.');
      }

      const data = await response.json();
      setResponseMessage(data.message || 'Last draw added successfully!');
      setLastDraw(''); // Clear the input field
      fetchLastRow(); // Refresh the last row
      fetchStatsData();
    } catch (error) {
      console.error('Error sending last draw:', error);
      alert('An error occurred while sending the last draw.');
    }
  };

  const handleRemoveLastDraw = async () => {
    try {
      const response = await fetch('http://localhost:8000/remove-last-draw', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove the last draw.');
      }

      const data = await response.json();
      setResponseMessage(data.message || 'Last draw removed successfully!');
      fetchLastRow(); // Refresh the last row
      fetchStatsData();

    } catch (error) {
      console.error('Error removing last draw:', error);
      alert('An error occurred while removing the last draw.');
    }
  };

  const fetchLastRow = async () => {
    try {
      const response = await fetch('http://localhost:8000/get-last-row');
      if (!response.ok) {
        throw new Error('Failed to fetch last row');
      }
      const data = await response.json();
      setLastRow(data.last_row); // Update state with the last row data
    } catch (error) {
      console.error('Error fetching last row:', error);
      alert('An error occurred while fetching the last row.');
    }
  };

  // Fetch data for red-black, odd-even, and low-high stats

  const fetchStatsData = async () => {
    try{
      const response = await fetch('http://localhost:8000/get-last-60-stats');
      if (!response.ok){
        throw new Error('Failed to fetch all the stats data');
      }

      const data = await response.json();
      setAllStatsData(data);
    } catch(error) {
      console.error('Error fetching all the stats data:', error);
      alert('An error occured while fetching all the data.');
    }
  }

  // Chart data for Red-Black stats
  const redBlackChartData = {
    labels: allStatsData.red_statistics.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Red Statistics',
        data: allStatsData.red_statistics,
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Black Statistics',
        data: allStatsData.black_statistics,
        borderColor: 'black',
        fill: false,
      },
    ],
  };

  // Chart data for Odd-Even stats
  const oddEvenChartData = {
    labels: allStatsData.odd_statistics.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Odd Statistics',
        data: allStatsData.odd_statistics,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Even Statistics',
        data: allStatsData.even_statistics,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  // Chart data for Low-High stats
  const lowHighChartData = {
    labels: allStatsData.low_statistics.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Low Statistics',
        data: allStatsData.low_statistics,
        borderColor: 'orange',
        fill: false,
      },
      {
        label: 'High Statistics',
        data: allStatsData.high_statistics,
        borderColor: 'purple',
        fill: false,
      },
    ],
  };

  return (
    <div className="graph">
      {/* Last Draw Section */}
      <div className="last-draw-container">
        <label htmlFor="last-draw" className="last-draw-label">
          Last Draw:
        </label>
        <input
          type="number"
          id="last-draw"
          placeholder="Enter last draw"
          className="last-draw-input"
          value={lastDraw}
          onChange={(e) => setLastDraw(e.target.value)}
        />
        <div className="last-draw-buttons">
          <button className="last-draw-button" onClick={handleAddLastDraw}>
            Add Last Draw
          </button>
          <button className="last-draw-button" onClick={handleRemoveLastDraw}>
            Remove Last Draw
          </button>
        </div>
      </div>

      {responseMessage && <p className="response-message">{responseMessage}</p>}

      <div className="graph-container">
        {/* Dataframe Section */}
        <div className="graph-item">
          <h4>Dataframe</h4>
          {lastRow ? (
            <div className="dataframe-table-container">
              <table className="dataframe-table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Colour</th>
                    <th>Odd/Even</th>
                    <th>High/Low</th>
                    <th>Red Statistic</th>
                    <th>Black Statistic</th>
                    <th>Odd Statistic</th>
                    <th>Even Statistic</th>
                    <th>High Statistic</th>
                    <th>Low Statistic</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lastRow.number}</td>
                    <td>{lastRow.colour}</td>
                    <td>{lastRow.odd_even}</td>
                    <td>{lastRow.high_low}</td>
                    <td>{lastRow.red_statistic}</td>
                    <td>{lastRow.black_statistic}</td>
                    <td>{lastRow.odd_statistic}</td>
                    <td>{lastRow.even_statistic}</td>
                    <td>{lastRow.high_statistic}</td>
                    <td>{lastRow.low_statistic}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading last row...</p>
          )}
        </div>

        {/* Graphs Section */}
        <div className="graph-item">
          <h4>Red-Black Graph</h4>
          <div className="graph-placeholder">
            <Line data={redBlackChartData} />
          </div>
        </div>

        <div className="graph-item">
          <h4>Odd-Even Graph</h4>
          <div className="graph-placeholder">
            <Line data={oddEvenChartData} />
          </div>
        </div>

        <div className="graph-item">
          <h4>Low-High Graph</h4>
          <div className="graph-placeholder">
            <Line data={lowHighChartData} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Graph;