var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

const cleanerDate = (dateString) => {
  return dateString.slice(0, 10);
};


document.addEventListener("DOMContentLoaded", ()=> {
  let tempF = true;
  $.ajax({
    url: `http://api.aerisapi.com/forecasts/11101?client_id=${mykey}&client_secret=${secretkey}`,
    method: "GET"
  }).then((res) => {
    let data = res.response[0].periods;
    let root = $("#root");
    let celciusTemps = [];
    let fTemps = [];
    data.forEach((day, i) => {
      let iconPath = "./icons/" + day.icon
      let celciusMax = day.maxTempC + "° C"
      let celciusMin = day.minTempC + "° C"
      celciusTemps.push({celciusMax, celciusMin})
      let fMax = day.maxTempF + "° F"
      let fMin = day.minTempF + "° F"
      fTemps.push({fMax, fMin})
      let newDay = $("<div> </div>")
      newDay.addClass(`.weekday weekday${i}`)
      root.append( newDay )
      newDay.append(`<div class="day-name">${cleanerDate(day.dateTimeISO)}</div>`);
      newDay.append(`<img class="icon" src=${iconPath} alt=""/>`);
      newDay.append(`<div class="day-max">High: ${fMax}</div>`);
      newDay.append(`<div class="day-min">Low: ${fMin}</div>`);
    });

  $(".toggle").on("click", () => {
    if(tempF) {
      let allHighs = $(".day-max");
      for (let i = 0; i < allHighs.length; i++) {
        allHighs[i].innerHTML = "High: " +  celciusTemps[i].celciusMax;
      }
      let allLows = $(".day-min");
      for (let i = 0; i < allLows.length; i++) {
        allLows[i].innerHTML = "Low: " + celciusTemps[i].celciusMin;
      }
    } else {
        let allHighs = $(".day-max");
        for (let i = 0; i < allHighs.length; i++) {
          allHighs[i].innerHTML = "High: " +  fTemps[i].fMax;
        }
        let allLows = $(".day-min");
        for (let i = 0; i < allLows.length; i++) {
          allLows[i].innerHTML = "Low: " + fTemps[i].fMin;
        }
    }
    tempF = !tempF;
  });

  });




});
