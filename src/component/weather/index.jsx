import { useEffect, useState } from "react";
import Search from "../search";


export default function Weather(){
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)


    // FETCH API
    async function fetchWeatherData(param){
        setLoading(true)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=634b8f40764452b77bbfd31556d6162d`)
            const data = await response.json()
            if(data){
                setData(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            throw new Error(error)
        }
    }


    // SEARCH BUTTON
    function SubmitSearch(){
        fetchWeatherData(search)
    }

    // TO SET DEFAULT CITY

    useEffect(()=>{
        fetchWeatherData('Lagos')
    },[])


    // DATE FUNCTION
    function getCurrentDate(){
        return new Date().toLocaleString('en-us',{
            weekday:'long',
            month:"long",
            day:"numeric",
            year:'numeric'
        })
    }
   
    return(
        <div>
            <Search 
                search={search}
                setSearch={setSearch}
                SubmitSearch={SubmitSearch}
            />
            {loading ? <div className="loading">Loading...</div> :<div>
                   <div className="city-Name">
                        <h2>
                            {data?.name}, <span>{data?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="Date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div >
                        <span className="temperature">{data?.main?.temp}</span>
                        <p className="description">
                            {
                                data && data.weather && data.weather[0] ? data.weather[0].description: ""
                            }
                        </p>
                    </div>
                    <div className="weather-info">
                        <div className="column">
                           <div>
                            <p className="wind">{data?.wind?.speed}</p>
                            <p>Wind Speed</p>
                           </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{data?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}