const url = "http://worldtimeapi.org/api/timezone/";
let onStart = false;

const time = document.getElementById('time');
const dropdown = document.getElementById("dropdown");
const utcSpan = document.getElementById('UTC');
const timeZoneContinent = document.getElementById('timezone-continent');
const timeZoneCity = document.getElementById('timezone-city');


function fillClock(day, utc, continent_city) {
  let today = new Date(day);
  time.textContent = (today.getUTCHours() < '10' ? '0' : '') + today.getUTCHours()
    + ":" + (today.getUTCMinutes() < '10' ? '0' : '') + today.getUTCMinutes()
    + ":" + (today.getUTCSeconds() < '10' ? '0' : '') + today.getUTCSeconds();
  utcSpan.textContent = utc;
  timeZoneContinent.textContent = continent_city.split('/')[0];
  timeZoneCity.textContent = continent_city.split('/')[1].replace('_', ' ');
};

const worldTimeApiFetch2 = function (url) {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
          let time = new Date(res.utc_datetime);
          time = time.setSeconds(time.getSeconds()+ res.raw_offset);
          fillClock(time, res.utc_offset, res.timezone);
        }
      )
};

dropdown.addEventListener("change", () => {
    let input = dropdown.value;
    if (input != '-select continent-') {
    worldTimeApiFetch2(url + input);
    start();
    } else {
      console.log('Fejl i input');
    }
  }
);



function start () {
  if (!onStart){
  setInterval(() => worldTimeApiFetch2(url + dropdown.value), 1000);
  onStart = true;
  }
};
