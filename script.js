const inputEl = document.getElementById("input-el");
const searchBtn = document.getElementById("search-btn");
let climateImg = document.getElementById("climate");
const weather = document.querySelector("main");
const clearBtn = document.querySelector("span");

clearBtn.style.display = "none";

async function getWeather(){
    document.querySelector(".error").style.display = "none";
    const cityName = inputEl.value;
    const apiKey = "059ad5ddb4c4973d44f2780c7f195795";

    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const response = await fetch(Url);
    const data = await response.json();
    console.log(data);

    if(data.cod === 200){
        clearBtn.style.display = "none";

        let temp = Math.round(data.main.temp);
        let newTemp = Math.floor(temp/10);

        document.querySelector(".temp").innerHTML = newTemp+"°c";
        document.querySelector(".city").innerHTML = data.name;
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main === "Rain"){
            climateImg.src = "images/rain.png";
        }else if(data.weather[0].main === "Clouds"){
            climateImg.src = "images/clouds.png";
        }else if(data.weather[0].main === "Clear"){
            climateImg.src = "images/clear.png";
        }else if(data.weather[0].main === "Drizzle"){
            climateImg.src = "images/drizzle.png";
        }else if(data.weather[0].main === "Mist"){
            climateImg.src = "images/mist.png";
        }else if(data.weather[0].main === "Snow"){
            climateImg.src = "images/snow.png";
        }
        inputEl.value = "";
        weather.style.display = "block";
    }else{
        weather.style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
}

searchBtn.addEventListener("click", ()=>{
    getWeather();
})

clearBtn.onclick = ()=>{
    inputEl.value = "";
    clearBtn.style.display = "none";
}
function toggleClearBtn(){
    if(inputEl.value.length > 0){
        clearBtn.style.display = "inline";
    }else{
        clearBtn.style.display = "none";
    }
}