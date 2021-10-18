let wetter = {
  //Api Key 
  apiKey: 'cda2a17e18a88d1ffceb8aeff99c405d',
  //URL Api um die PLZ zu suchen
  fetchWetter: function(zip) {
    fetch(        
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
      zip + ",ch&units=metric&lang=de&appid=" +
      this.apiKey
    )
    .then ((res) => {
      //Fehlermeldung anzeigen wenn keine gültige PZL zu finden ist
      if(!res.ok){
        alert("Du musst eine gültige Postleizahl eingeben.");
      }
      return res.json();
    })
    .then((data) => this.displayWetter(data));
  },
  // Die verschiedenen daten Wetter im Frontend anzeigen zu lassen
  displayWetter: function(data) {
    console.log(data);
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity, pressure, temp_max, temp_min} = data.main;
    const {speed} = data.wind;
    const {sunset, sunrise} = data.sys;
    document.querySelector(".city").innerText =  name;
    document.querySelector(".icon").src = 
    "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =  humidity + "%";
    document.querySelector(".tempMaxMin").innerText = "max: " + temp_max  + " min: " + temp_min;
    document.querySelector(".sonneAuf").innerText = "Aufgang: " + window.moment(sunrise * 1000).format('HH:mm') + " Uhr";
    document.querySelector(".sonneUn").innerText =  "Untergang: " + window.moment(sunset * 1000).format('HH:mm') + " Uhr";
    document.querySelector(".wind").innerText =  speed +  " km/h";
    document.querySelector(".luftDruck").innerText = pressure + " mb";
  },
  search: function () {
    this.fetchWetter(document.querySelector(".search-bar").value);
  },
};
//Nach Städte oder Dörfe suchen und anzeigen
document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    wetter.search();
  }
});
//Beim Aktuallisieren der Seite kommt immer Luzern (PLZ)
wetter.fetchWetter(6007);