async function getWeather() {
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=-7.8014&longitude=110.3647&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_min";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
  
      // change weather info
      const currentTemp = document.querySelector("#temperature");
      const currentDate = document.querySelector("#date");
      const currentWind = document.querySelector("#wind");
      const currentHum = document.querySelector("#humidity");
      const currentPre = document.querySelector("#precipitation");
      const currentTempFeel = document.querySelector("#tempFeel");
  
      currentTemp.innerHTML = data.current.temperature_2m + "°C";
      currentDate.innerHTML = data.current.time;
      currentWind.innerHTML = data.current.wind_speed_10m + "km/h";
      currentHum.innerHTML = data.current.relative_humidity_2m + "%";
      currentPre.innerHTML = data.current.precipitation + " mm";
      currentTempFeel.innerHTML = data.current.apparent_temperature + "°C";
  
      // current condition info
      const currentCondition = document.querySelector("#condition");
      const currentIcon = document.querySelector("#weather-icon");
      const currentCode = data.current.weather_code;
      const currentDay = data.current.is_day === 0 ? "night" : "day";
  
      currentCondition.innerHTML = code[currentCode][currentDay].description;
      currentIcon.src = code[currentCode][currentDay].image;
  
      // looping through forecast
      const forecastContent = document.querySelector("#forecast");
  
      data.daily.time.forEach((time, i) => {
        const loopedCode = data.daily.weather_code[i];
  
        forecastContent.innerHTML += 
        `<div id="forecast" class="forecast">
            <div class="day">
                <h3>${time}</h3>
                <img src="${code[loopedCode][currentDay].image}" alt="Sunny">
                <p>${data.daily.temperature_2m_min[i]}°C</p>
                <p>${code[loopedCode][currentDay].description}</p>
            </div>
        </div>`;
        
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  getWeather();
  