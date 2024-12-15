const url= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;
const key="a2485e185326d1f0ad4651550044c137";


async function checkWeather(city){
     const response= await fetch(url+city+`&appid=${key}`);
     var data = await response.json();
     console.log(data);
    document.querySelector("#city").innerHTML=data.name;
     document.querySelector("#temp").innerHTML=data.main.temp+"°C";
     document.querySelector("#humidity").innerHTML=data.main.humidity+"%";
     document.querySelector("#wind").innerHTML=data.wind.speed+"km/h";
    let image= document.querySelector("#img");
    let weathername=document.querySelector("#weather-name");

     if(data.weather[0].main=="Clouds"){
        image.src="/clouds.png"
        weathername.innerHTML="Clouds"
     }
     else if(data.weather[0].main=="Clear"){
        image.src="/clear.png"
         weathername.innerHTML="Clear Sky";
     }
     else if(data.weather[0].main=="Rain"){
        image.src="/rain.png"
         weathername.innerHTML="Rain Started";
     }
      else if(data.weather[0].main=="Drizzle"){
        image.src="/drizzle.png"
         weathername.innerHTML="Drizzle";
     }
     else if(data.weather[0].main=="Mist"){
        image.src="/mist"
         weathername.innerHTML="Mist";
     }
     
    
     // for spyaing condition
// Function to evaluate spraying conditions
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

    // Interpret the index
    if (suitabilityIndex === 3) {
        return "Good conditions for spraying";
    } else if (suitabilityIndex === 2) {
        return "Marginal conditions for spraying";
    } else {
        return "Poor conditions for spraying";
    }
}

// Example usage
 let temperature=data.main.temp;// Current temperature in °C
const humidity =data.main.humidity; // Current humidity in %
const windSpeed = data.wind.speed; // Current wind speed in km/h

const result = evaluateSprayingConditions(temperature, humidity, windSpeed);
console.log(result);
alert(result);
} ;
document.addEventListener('DOMContentLoaded', () => {
    const getcity = document.querySelector(".main-1 input");
    const button = document.querySelector(".main-1 button");

    button.addEventListener('click', () => {
        checkWeather(getcity.value);
    });
});
