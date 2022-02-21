

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react"
import { IUserInfo, IUserWord } from '../../interfaces';
import { getUserWords } from '../../services/sprint-service';

import "./stats.css";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);


const Stats = () => {
  const [chartData, setChartData] = useState([])
  const [userInfo, setUserInfo] = useState(null);

  const getLocalStorage = () => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      setUserInfo(userInfo);
    };
  };

  useEffect(() => {
    getLocalStorage();
  }, [])

  useEffect(() => {
    if (userInfo) {
      getUserWords((userInfo as IUserInfo).userId, (userInfo as IUserInfo).token)
        .then((res) => {
          setChartData(res.data);
          console.log(res.data);

        })
        .catch((error) => console.log(error));
    }
  }, [userInfo])

  const learnedWordsSprint = (chartData as IUserWord[]).filter((item) => item.optional.game?.sprint).length;
  const learnedWordsAudioCall = (chartData as IUserWord[]).filter((item) => item.optional.game?.audioCall).length;
  const percentCorAnswersAudioCall = (chartData as IUserWord[]).filter((item) => String(item.optional.game?.sprint) === 'true').length * 100 / learnedWordsSprint;
  const percentCorAnswersSprint = (chartData as IUserWord[]).filter((item) => String(item.optional.game?.audioCall) === 'true').length * 100 / learnedWordsAudioCall;
  const arrLargestSeriesCorAnswSprint = (chartData as IUserWord[]).filter((item) => item.optional.largestSeriesCorAnswS).map((item) => {
    return Number(item.optional.largestSeriesCorAnswS);
  });
  const largestSeriesCorAnswSprint = Math.max.apply(null, arrLargestSeriesCorAnswSprint);

  const arrAnswersAC = (chartData as IUserWord[]).reduce((newArr: number[], item) => {
    if (String(item.optional.game?.sprint) === 'true' && item.optional.largestSeriesCorAnswAC === 'label') {
      newArr.push(1)
    } else newArr.push(0)
    return newArr;
  }, [])

  let count = 0;
  let largestSeriesCorAnswAudioCall = 0;
  for (let i = arrAnswersAC.length - 1; i > 0; i--) {
    if (arrAnswersAC[i] === 1 && arrAnswersAC[i - 1] === 1) count++;
    else if (largestSeriesCorAnswAudioCall < count) largestSeriesCorAnswAudioCall = count;
  }

  return (
    <div className="content-wrap content-wrap-stats">
      <div className="content-stats">
        <h2>Statistics at {new Date().toDateString()}</h2>
        <div className='container-statistics'>
          <Bar
            data={{
              labels: ['Sprint'],
              datasets: [{
                label: 'learned words',
                data: [learnedWordsSprint],
                backgroundColor: 'red',
              },
              {
                label: 'Right answers(%)',
                data: [percentCorAnswersAudioCall],
                backgroundColor: 'green',
              },
              {
                label: 'The largest series of correct answers',
                data: [largestSeriesCorAnswSprint],
                backgroundColor: 'yellow',
              }]
            }}
          >
          </Bar>
          <Bar
            data={{
              labels: ['AudioCall'],
              datasets: [{
                label: 'learned words',
                data: [learnedWordsAudioCall],
                backgroundColor: 'red',
              },
              {
                label: 'Right answers(%)',
                data: [percentCorAnswersSprint],
                backgroundColor: 'green',
              },
              {
                label: 'The largest series of correct answers',
                data: [largestSeriesCorAnswAudioCall],
                backgroundColor: 'yellow',
              }]
            }}
          >
          </Bar>
        </div>
      </div>
    </div >
  );
};

export default Stats;
