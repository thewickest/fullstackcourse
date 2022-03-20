const Weather = ({weather}) =>{
    if(weather!=null){
        return (
            <div>
                <h1>Weather in name</h1>
                <p>temperature {weather.main.temp-273} Celsius</p>
                <img src={'http://openweathermap.org/img/wn/'
                    +weather.weather[0].icon+'@2x.png'}/>
                <p>wind {weather.wind.speed}m/s</p>
            </div>
        )
    }else{return<></>}
}

export default Weather