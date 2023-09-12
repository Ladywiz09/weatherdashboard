//api key from weatherapi.com
const apiKey = '66351a111227dbdbda208d1c2cff15a4';
const getAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}`;
const city = 'Birmingham';
const cardBodyToday = document.querySelector('.card-body-today');
const citiesHistory = document.querySelector('.cities-history');
const fiveDayForecast = document.querySelector('.five-day-forecast');
const cardCurrentCity = document.querySelector('.card-current-city');
const cardCurrentDate = document.querySelector('.card-current-date');
const storecityHist = JSON.parse(localStorage.getItem('city'));



//Current calendar date and time
const currentDate = moment().format('dddd, MMMM Do YYYY');
const currentTime = moment().format('h:mm:ss a');

const cityHistory = [];

$('.search').on("click", function (event) {
	    event.preventDefault();
	    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	    if (city === "") {
		    return;
	    };
	    cityHistory.push(city);

	    localStorage.setItem('city', JSON.stringify(cityHistory));
	    fiveDayForecast.empty();
	    getcitiesHistory();
	    getCurrentWeather();
});

    //Creates a list of cities from search history
    function getcitiesHistory() {
        citiesHistory.empty();

        for (let i = 0; i < cityHistory.length; i++) {

            const rowEl = $('<row>');
            const btnEl = $('<button>').text(`${citiesHistory[i]}`)

            rowEl.addClass('row histBtnRow');
            btnEl.addClass('btn btn-secondary btn-lg btn-block')
            btnEl.attr('type', 'button');

            citiesHistory.prepend(rowEl);
            rowEl.append(btnEl);
        } if (!city) {
            return;
        }

        //Allows user to click on a city from the search history and display the weather
        $('.histBtn').on("click", function (event) {
            event.preventDefault();
            city = $(this).text();
            fiveDayForecast.empty();
            getCurrentWeather();
        });
    };
    //Gets weather data from today's date and creats a 5 Day forecast
    function getCurrentWeather() {
        const getCurrentAPI = `https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={key}`;
     
        ('.card-body-today').empty();

            $ajax({
                URL: getCurrentAPI,
                Method: 'GET',
            }).then(function (response) {
                ('.card-current-city').text(response.name);
                ('.card-current-date').text(date);
                ('.icons').attr('src', `https://openweathermap.org/img/wn/{response.weather[0].icon}@2x.png`);
                //Temperature
                const Temp = $('<p>').text(`Temperature: {response.temperature} °F`);
                cardBodyToday.append(Temp);
                //Feels Like
                const feelTemp = $('<p>').text(`Feels Like: {response.main.feels_like} °F`);
                cardBodyToday.append(feelTemp);
                //Humidity
                const Humidity = $('<p>').text(`Humidity: {response.main.humidity} %`);
                cardBodyToday.append(Humidity);
                const windSpeed = $('<p>').text(`Wind Speed: {response.wind.speed} MPH`);
		        cardBodyToday.append(windSpeed);
                }

              );

            };
            getFiveDayForecast();


    function getFiveDayForecast() {
        const get5DayAPI = `https://api.openweathermap.org/data/2.5/forecast?q={city}&units=imperial&appid={key}`;
       
            $ajax({
                URL: get5DayAPI,
                Method: 'GET',

            }).then(function (response) {
                const fiveDayArray = response.list;
                const myWeatherapp = [];

            
            fiveDayArray.forEach(function (value) {
                const testObj = {
                    date: value.dt_txt,
                    temp: value.main.temp,
                    feels_like: value.main.feels_like,
                    humidity: value.main.humidity,
                    icon: value.weather[0].icon
                }
        
            if (value.dt_txt.split(' ')[1] === "12:00:00") {
                myWeatherapp.push(testObj);
                }

            })


            for (let i = 0; i < myWeatherapp.length; i++) {

                const divCardEl = ('<div>');
                divCardEl.attr('class', 'card bg-light mb-3');
                divCardEl.attr('style', 'max-width: 400px;');
                fiveDayForecast.append(divCardEl);
    
                const divHeaderEl = ('<div>');
                divHeaderEl.attr('class', 'card-header')
                const m = moment(`{myWeatherapp[i].date}`).format('MM-DD-YYYY');
                divHeaderEl.text(m);
                divHeaderEl.append(divHeaderEl)
    
                const divBodyEl = ('<div>');
                divBodyEl.attr('class', 'card-body');
                divCardEl.append(divBodyEl);
    
                const divIconEl = ('<img>');
                divIconEl.attr('class', 'icons');
                divIconEl.attr('src', `https://openweathermap.org/img/wn/{myWeatherapp[i].icon}@2x.png`);
                divIconEl.append(divIconEl);
    
                //Temp
                const Temp = ('<p>').text(`Temperature: {myWeatherapp[i].temp} °F`);
                divBodyEl.append(Temp);
                //Feels Like
                const FeelTemp = ('<p>').text(`Feels Like: {myWeatherapp[i].feels_like} °F`);
                divBodyEl.append(FeelTemp);
                //Humidity
                const Humidity = ('<p>').text(`Humidity: {myWeatherapp[i].humidity} %`);
                divBodyEl.append(Humidity);

            }

        });
    }

//Allows for the example to load for Birmingham
    function loadCity() {

	    if (storecityHist !== null) {
		    cityHistory = storecityHist}

	    getcitiesHistory();
	    getCurrentWeather();
        getFiveDayForecast();
        };

    loadCity();


