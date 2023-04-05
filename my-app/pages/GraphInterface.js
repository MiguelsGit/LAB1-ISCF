import { getDatabase, ref, onValue} from 'firebase/database';
import { app } from '../config/firebaseConfig';
import { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto"

export default function GraphInterface({ interval }) {
  const [readData, setReadData] = useState({
    timestamp: [],
    x: [],
    y: [],
    z: [],
  });

  const canvasRefX = useRef(null);
  const chartRefX = useRef(null);
  const canvasRefY = useRef(null);
  const chartRefY = useRef(null);
  const canvasRefZ = useRef(null);
  const chartRefZ = useRef(null);

  useEffect(() => {
    // Get a reference to the database
    const dB = getDatabase(app);

    // Get a reference to the "acceleration" node in your database
    const accRef = ref(dB, 'accelaration');

    let intervalId;

    const fetchData = () => {
      onValue(accRef, (snapshot) => {
        const data = snapshot.val();
        const timestamp = [];
        const x = [];
        const y = [];
        const z = [];

        for (const key in data) {
          const { timestamp: timestampValue, x: xValue, y: yValue, z: zValue } = data[key].data;
          timestamp.push(timestampValue);
          x.push(xValue);
          y.push(yValue);
          z.push(zValue);
        }

        setReadData({ x, y, z, timestamp });
      });
    };

    fetchData();

    // Set up a timer to fetch data at the specified interval
    intervalId = setInterval(fetchData, interval);
  }, [interval]);
  
  useEffect(() => {
    const ctxX = canvasRefX.current.getContext("2d");  
    if (!chartRefX.current) {   
      chartRefX.current = new Chart(ctxX, {
        type: "line",
        data: {
          labels: readData.timestamp,
          datasets: [
            {
              label: "X",
              data: readData.x,
              borderColor: "black",
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
        },
      });
    }
    else{
        chartRefX.current.data.labels = readData.timestamp;
        chartRefX.current.data.datasets[0].data = readData.x;
        chartRefX.current.update();
    }
  }, [readData.x, canvasRefX, chartRefX, readData.timestamp]);
  
  useEffect(() => {
    const ctxY = canvasRefY.current.getContext("2d");  
    if (!chartRefY.current) {   
      chartRefY.current = new Chart(ctxY, {
        type: "line",
        data: {
          labels: readData.timestamp,
          datasets: [
            {
              label: "Y",
              data: readData.y,
              borderColor: "red",
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
        },
      });
    }
    else{
      chartRefY.current.data.labels = readData.timestamp;
      chartRefY.current.data.datasets[0].data = readData.y;
      chartRefY.current.update();
    }
  }, [readData.y, canvasRefY, chartRefY, readData.timestamp]);
  
  useEffect(() => {
    const ctxZ = canvasRefZ.current.getContext("2d");  
    if (!chartRefZ.current) {   
      chartRefZ.current = new Chart(ctxZ, {
        type: "line",
        data: {
          labels: readData.timestamp,
          datasets: [
            {
              label: "Z",
              data: readData.z,
              borderColor: "blue",
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
        },
      });
    }
    else{
      chartRefZ.current.data.labels = readData.timestamp;
      chartRefZ.current.data.datasets[0].data = readData.z;
      chartRefZ.current.update();
    }
  }, [readData.z, canvasRefZ, chartRefZ, readData.timestamp]);
  
  
  return (
    <div>
      <canvas ref={canvasRefX}></canvas>
      <canvas ref={canvasRefY}></canvas>
      <canvas ref={canvasRefZ}></canvas>
    </div>
  );
};