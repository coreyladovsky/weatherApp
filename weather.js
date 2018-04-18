var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;


const cleanerDate = (dateString) => {
  let date = dateString.slice(0, 10);
  return date.slice(5) +  "-" + date.slice(0, 4);
};


document.addEventListener("DOMContentLoaded", ()=> {
  $.ajax({
    url: `http://api.aerisapi.com/forecasts/11101?client_id=${mykey}&client_secret=${secretkey}`,
    method: "GET"
  }).then((res) => {
    let data = res.response[0].periods;
    let root = $("#root");
    let celciusTemps = [];
    let fTemps = [];
    data.forEach((day, i) => {
      let iconPath = "./icons/" + day.icon;
      let celciusMax = day.maxTempC + "° C";
      let celciusMin = day.minTempC + "° C";
      celciusTemps.push({celciusMax, celciusMin});
      let fMax = day.maxTempF + "° F";
      let fMin = day.minTempF + "° F";
      fTemps.push({fMax, fMin});
      let newDay = $("<div> </div>");
      newDay.addClass(`.weekday weekday${i}`);
      root.append( newDay );
      newDay.append(`<div class="day-name">${cleanerDate(day.dateTimeISO)}</div>`);
      newDay.append(`<img class="icon" src=${iconPath} alt=""/>`);
      newDay.append(`<div class="day-max">High: ${fMax}</div>`);
      newDay.append(`<div class="day-min">Low: ${fMin}</div>`);
    });

    let tempF = true;
    $(".toggle").on("click", () => {
      if(tempF) {
        changeTemps(celciusTemps);
      } else {
        changeTemps(fTemps, true);
      }
      tempF = !tempF;
    });

  });
});

const changeTemps = (tempArray, f) => {
  let allHighs = $(".day-max");
  let allLows = $(".day-min");
  for (let i = 0; i < allHighs.length; i++) {
    if(f) {
      allHighs[i].innerHTML = "High: " +  tempArray[i].fMax;
      allLows[i].innerHTML = "Low: " + tempArray[i].fMin;
    } else {
      allHighs[i].innerHTML = "High: " +  tempArray[i].celciusMax;
      allLows[i].innerHTML = "Low: " + tempArray[i].celciusMin;
    }
  }
};
