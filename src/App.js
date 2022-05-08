import './App.css';
import Graph from './components/Graph';
import Covidreport from './components/Covidreport';
import { useEffect, useState } from 'react';
import axios from './axios';
import Spinner from './components/Spinner/Spinner';
function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countrySummary, setCountrySummary] = useState({});
  const [days,setDays]=useState(7);
  const [country,setCountry]=useState('');
  const [covidCountArray,setCovidCountArray]=useState([]);
  const [label,setLabel]=useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/summary`)
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setCountrySummary(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  const formatDate = (date) =>{
    const d= new Date(date);

    const year=d.getFullYear();
    const month=`0${d.getMonth()+1}`.slice(-2);
    const _date=d.getDate();
    return `${year}-${month}-${_date}`;
  }

  const countryHandler=(e)=>{
    setCountry(e.target.value);
    console.log("coun"+e);
    const d= new Date();
    const to=formatDate(d);
    const from=formatDate(d.setDate(d.getDate()-7));
    getCovidReportByDateRange(e.target.value,from,to);
  }

  const daysHandler=(e)=>{
    
    setDays(e.target.value);
    const d= new Date();
    const to=formatDate(d);
    const from=formatDate(d.setDate(d.getDate()- e.target.value));
    getCovidReportByDateRange(country,from,to)
    
  }

  const getCovidReportByDateRange = (countrySlug, from ,to) => {
//Fetching Data 
    axios.get(`https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res =>{
      console.log(res);
      // Mapping data over Cases to showCase on YAxis
      const yAxisCovidCount = res.data.map(d=> d.Cases);
      // Mapping data over Cases to showCase on XAxis
      const xAxisLabel = res.data.map(d=>d.Date);
      // console.log(yAxisCovidCount);

      //Matching Country Option & Country Slug & settingUp data according to it
      const covidDetails= countrySummary.Countries.find(country => country.Slug ===countrySlug );
      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalDeaths(covidDetails.TotalDeaths);
      setTotalRecovered(covidDetails.TotalRecovered);
      setLabel(xAxisLabel);

      setCovidCountArray(yAxisCovidCount);
    })
    .catch(error =>{
      console.log(error);
    })
  }



  if (loading) {
    return <Spinner />
  }

  return (
    <div className="App">
      <Covidreport
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeath={totalDeaths}
        country={country}
      />
{/* Options to select Country & days */}
      <div className='optionClass'>
        <select value={country} onChange={countryHandler}>
          <option value="">Select Country</option>
          {
            countrySummary.Countries && countrySummary.Countries.map(country => 
              <option value={country.Slug} key={country.Slug}>{country.Country}</option>
            )
          }
        </select>

        <select value={days} onChange={daysHandler}>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>

        </select>
      </div>


{/*  Showing Graph Data */}
      <Graph 
      yAxis={covidCountArray}
      label={label}
      />
    </div>
  );
}

export default App;
