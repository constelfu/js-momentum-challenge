const API_KEY = "ca6184eccdd93c025e2eb92df9dd0c3d";
// 무료 API가 아닌 경우 gitignore로 가려주는 게 좋다


function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
          const city = document.querySelector("#weather span:nth-child(1)");
          const weather = document.querySelector("#weather span:nth-child(2)");
          city.innerText = data.name;
          weather.innerText = `${data.weather[0].main} / ${data.main.temp}도`;   
    });
}
function onGeoError() {
    weather.innerText = "위치 액세스 허용해주세요";
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);