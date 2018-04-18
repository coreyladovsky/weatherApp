var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

const cleanerDate = (dateString) => {
  return dateString.slice(0, 10);
};


document.addEventListener("DOMContentLoaded", ()=> {
  $.ajax({
    url: `http://api.aerisapi.com/forecasts/11101?client_id=${mykey}&client_secret=${secretkey}`,
    method: "GET"
  }).then((res) => {
    let data = res.response[0].periods;
    let root = $("#root");
    data.forEach((day, i) => {
      let iconPath = "./icons/" + day.icon
      let newDay = $("<div> </div>")
      newDay.addClass(`.weekday weekday${i}`)
      root.append( newDay )
      newDay.append(`<div class="day-name">${cleanerDate(day.dateTimeISO)}</div>`);
      newDay.append(`<img class="icon" src=${iconPath} alt=""/>`);
      newDay.append(`<div class="day-max">High: ${day.maxTempF} F</div>`);
      newDay.append(`<div class="day-min">Low: ${day.minTempF} F</div>`);
    });





  });
});
