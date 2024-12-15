async function getWeather(latitude, longitude) {
    const apiKey = "a2485e185326d1f0ad4651550044c137"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
  
      const cityName = data.name;
      const temp = Math.round(data.main.temp);
      const minTemp = Math.round(data.main.temp_min);
      const maxTemp = Math.round(data.main.temp_max);
      const humidity = data.main.humidity; // Current humidity in %
      const windSpeed = data.wind.speed; // Current wind speed in km/h
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const weatherCondition = data.weather[0].main;
  
      // Update UI
      document.getElementById("city").innerText = cityName;
      document.getElementById("temperature").innerText = `${temp}°C`;
      document.getElementById("weather-info").innerText = `${maxTemp}°C / ${minTemp}°C • Sunset ${sunsetTime} • 0% Rain`;
  
      // Set weather icon based on condition
      const weatherImage = document.getElementById("weather-image");
      if (weatherCondition === "Clear") {
        weatherImage.src = "clear.png";
      } else if (weatherCondition === "Clouds") {
        weatherImage.src = "clouds.png";
      } else if (weatherCondition === "Rain") {
        weatherImage.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      } else if (weatherCondition === "Snow") {
        weatherImage.src = "snow.png";
      } else if (weatherCondition === "Thunderstorm") {
        weatherImage.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
      } else if (weatherCondition === "Mist") {
        weatherImage.src = "mist.png";
      } else if (weatherCondition === "Fog") {
        weatherImage.src = "https://cdn-icons-png.flaticon.com/512/1163/1163622.png";
      } else {
        weatherImage.src = "https://cdn-icons-png.flaticon.com/512/131/131043.png"; // Default icon
      }
  
      // Evaluate spraying conditions
      const result = evaluateSprayingConditions(temp, humidity, windSpeed);
      console.log(result);
      alert(result);
  
    } catch (error) {
      document.getElementById("city").innerText = "Unable to fetch city name";
      console.error(error);
    }
  }
  
  function evaluateSprayingConditions(temperature, humidity, windSpeed) {
      // Define thresholds
      const tempMin = 15; // Minimum ideal temperature (°C)
      const tempMax = 25; // Maximum ideal temperature (°C)
      const humidityMin = 50; // Minimum ideal humidity (%)
      const windSpeedMin = 3; // Minimum ideal wind speed (km/h)
      const windSpeedMax = 7; // Maximum ideal wind speed (km/h)
  
      // Determine condition scores
      const tempScore = (temperature >= tempMin && temperature <= tempMax) ? 1 : 0;
      const humidityScore = (humidity >= humidityMin) ? 1 : 0;
      const windSpeedScore = (windSpeed >= windSpeedMin && windSpeed <= windSpeedMax) ? 1 : 0;
  
      // Combine scores into an index
      const suitabilityIndex = tempScore + humidityScore + windSpeedScore;
      let spraying_condition=document.querySelector("#real-cond");
      // Interpret the index
      if (suitabilityIndex === 3) {
          return "Good conditions for spraying";
          spraying_condition.value="Good conditions for spraying";
          spraying_condition.style.backgroundColor="lightgreen";
          
      } else if (suitabilityIndex === 2) {
          return "Marginal conditions for spraying";
          spraying_condition.value="Marginal conditions for spraying";
          spraying_condition.style.backgroundColor="coral";
      } else {
          return "Poor conditions for spraying";
          spraying_condition.value="Poor conditions for spraying";
          spraying_condition.style.backgroundColor="red";
      }
  }
  
  async function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getWeather(latitude, longitude);
        },
        () => {
          document.getElementById("city").innerText = "Location access denied";
        }
      );
    } else {
      document.getElementById("city").innerText = "Geolocation not supported";
    }
  }
  
  // Initialize app
  fetchLocation();
  