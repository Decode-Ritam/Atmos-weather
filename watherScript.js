// ............Initial chacking file........
console.log('weather script is rady to work')

// Target the input field and close button
let inputField = document.getElementById("myinput");
let closeButton = document.getElementById("closeButton");
let searchContainer = document.getElementById('searchContainer');
let myContainer = document.getElementById('myContainer');
let listItems = myContainer.getElementsByTagName("li");
let innerMessage = document.getElementById("innerMessage");

// Function to show inputfield close icon
function showCloseButton() {
    closeButton.innerHTML = "&times;"; // Set innerHTML to "&times;"
    closeButton.style.display = "inline"; // Show the close button
}

// Function to hide inputfield close icon
function hideCloseButton() {
    closeButton.innerHTML = ""; // Clear innerHTML
    closeButton.style.display = "none"; // Hide the close button
}


inputField.addEventListener("input", function () {

    // ...........Add input event listener to the input field for hide/close exsicute.............

    // Check if the input field has text content
    if (inputField.value.trim() !== "") {

        // If input field has some Text, show the close button
        showCloseButton();

        // Add click event listener to the close button
        closeButton.addEventListener("click", function () {
            // Clear the input value
            inputField.value = "";
            // Hide the close button
            hideCloseButton();
            // Set display to "none" if inputField is not empty, otherwise, it stays "none"
            searchContainer.style.display = "none";
        });

    } else {
        // If input field has no Text, hide the close button
        hideCloseButton();
    }



    // .........Add input event listener to the input field for showing/hiding search container.........

    // Check if the input field has text content
    if (inputField.value.trim() !== "") {
        // Show the search container
        searchContainer.style.display = 'block';
    } else {
        // Hide the search container if input is empty
        searchContainer.style.display = 'none';
    }


    // ................search box give history fillter so that help for auto complete..........

    let inputValue = inputField.value.toLowerCase();
    let found = false;

    Array.from(listItems).forEach(function (element) {
        let historyData = element.innerText.toLowerCase();
        if (historyData.includes(inputValue)) {
            element.style.display = "block";
            found = true;
        }
        else {
            element.style.display = "none";
        }
    });
    // Display a message when no matching items are found
    if (!found) {
        innerMessage.style.display = "block";
    } else {
        innerMessage.style.display = "none";
    }

});

// Add click event listener to search container List items................
searchContainer.addEventListener('click', function (event) {
    // Check if the clicked element is an <li> inside the search container
    if (event.target.tagName === 'LI') {
        // Set input field value to the clicked item's text content
        inputField.value = event.target.textContent;
        // Search cllick event fier
        document.querySelector('.btn').click();
        // Hide the search container after selecting an item
        searchContainer.style.display = 'none';
    }
});


function handleKeyPress(event) {
    if (event.key === "Enter" && document.getElementById("myinput").value !== "") {
        // If Enter key is pressed and the input is not empty, trigger the click event of the search button
        event.preventDefault(); // Prevents form submission (if the input is inside a form)
        document.querySelector('.btn').click();
    }
}


//   My API KIY Hard coded....
let api_key = "9822bf14a1c27f08d2c6aeeecb03d5d3";


// Check if the browser supports Geolocation
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Success callback
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;


            // Call openweathermap API Get location
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
                .then(response => response.json())
                .then(data => {
                    // Extract the location name from the API response
                    var locationName = data.name;
                    console.log(data)
                    document.getElementById("current-location").innerHTML = locationName;
                    // Call searchResult only if locationName is successfully fetched
                    searchResult();

                })
                .catch(error => {
                    console.error('Error fetching location name:', error);
                    document.getElementById("current-location").innerHTML = "L.Error";
                });
        },
        function (error) {
            // Error callback
            switch (error.code) {
                // Handle errors as needed
            }
        }
    );
} else {
    // Browser doesn't support Geolocation
    document.getElementById("current-location").innerHTML = "F.error";
}













const searchResult = async () => {


    // Searching initiate then  searchContainer close
    searchContainer.style.display = "none";

    //   JavaScript progress code....
    let progress = document.querySelector('.progress');
    progress.style.backgroundColor = "#0009ff";
    progress.style.transition = "1s";

    // .........searchbar validation for empty search...........
    let element2 = document.querySelector('.weatherLocation');
    let element = document.querySelector('.searchbar');

    if (element.value === '0' && element2.value === '0') {
        alert("Enter a valid city before you search!")
        return 0;
    }

    const errorTextCriteria = 'L.Error,L.Error';

    if (element2.textContent.includes(errorTextCriteria)) {
        alert("Location fetch error or is invalid!");
        return 0;
    }

    progress.style.width = "20%";
    // .............This is for current weather data get request..............
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value || element2.textContent}&appid=${api_key}&units=metric`

    try {
        let response = await fetch(url)

        progress.style.width = "40%";
        let data = await response.json();
        progress.style.width = "60%";

        // Check if the city was found
        if (response.ok) {
            // City found, process the weather data
            // console.log(data);
            // Your code to handle the weather data goes here
            // console.log(`Status: ${data.cod} This is valid city check info in displayed`);

        } else {
            progress.style.backgroundColor = "#b1e7ff";
            progress.style.transition = "0s";
            progress.style.width = "0%";
            // Display an appropriate message to the user or handle it accordingly
            window.alert(`Status: ${data.cod} City not found. Please enter a valid city name.`);
            return
        }

        // -----------Decode some data form  response----------

        // Reusable function to format timestamp to time string
        function formatTimestampToTime(timestamp) {
            const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
            const options = { hour12: true, hour: 'numeric', minute: 'numeric' };
            return date.toLocaleTimeString('en-US', options);
        }

        // Decode sunrise and sunset data
        const sunriseTime = formatTimestampToTime(data.sys.sunrise);
        const sunsetTime = formatTimestampToTime(data.sys.sunset);

        // Target all id or class for update weather data
        let weatherLocation = document.getElementsByClassName('weatherLocation')
        let temparacher = document.getElementsByClassName('weathertemp')
        let windSpeedvalue = document.querySelector('.windSpeedvalue')
        let humidityvalue = document.querySelector('.humidityvalue')
        let Visibilityvalue = document.querySelector('.Visibilityvalue')
        let Pressurevalue = document.querySelector('.Pressurevalue')
        let felltempvalue = document.querySelector('.felltempvalue')
        let weather = document.querySelector('.weather')
        let weatherstatus = document.querySelector('.weatherstatus')
        let navwethericon = document.querySelector('.navwethericon')
        let location_time = document.querySelector('.location-time')
        let location_date = document.querySelector('.location-date')
        let sunrisetime = document.querySelector('.sunrisetime')
        let sunsettime = document.querySelector('.sunsettime')

        // Iterate through the collection and update the content
        for (let i = 0; i < weatherLocation.length; i++) {
            weatherLocation[i].innerHTML = data.name;
        }
        for (let i = 0; i < temparacher.length; i++) {
            temparacher[i].innerHTML = Math.floor(data.main.temp) + "°C";
        }
        windSpeedvalue.innerHTML = data.wind.speed + " km/h";
        humidityvalue.innerHTML = data.main.humidity + " %";
        Visibilityvalue.innerHTML = data.visibility / 1000 + " km";
        Pressurevalue.innerHTML = data.main.pressure + " mb";
        felltempvalue.innerHTML = Math.floor(data.main.feels_like) + " °C";
        weather.innerHTML = data.weather[0].description;


        sunrisetime.innerHTML = sunriseTime;
        sunsettime.innerHTML = sunsetTime;

        // Set inline style for wind direction image rotation
        const currentDirectionImg = document.querySelector('.current-windDirection');
        const currentDirectionvalue = document.querySelector('.windDirection-valu');

        // Extract the wind direction value from the data, defaulting to 0 if not present
        const currentwindDirectionRotation = data.wind.deg || 0;

        // Apply the rotation to the wind direction image using inline style
        currentDirectionImg.style.transform = `rotate(${currentwindDirectionRotation}deg)`;

        // Update the inner HTML content with the wind direction value
        currentDirectionvalue.innerHTML = data.wind.deg + " °";

        // Map of weather icons to image URLs
        const iconMapping = {
            "01d": "Img folder/clear 2.png",
            "01n": "Img folder/MoonTime.png",
            "02d": "Img folder/mist 1.png",
            "02n": "Img folder/mist 1.png",
            "03d": "https://openweathermap.org/img/wn/03d@2x.png",
            "03n": "https://openweathermap.org/img/wn/03d@2x.png",
            "04d": "Img folder/clouds 1.png",
            "04n": "Img folder/clouds 1.png",
            "09d": "Img folder/drizzle 1.png",
            "09n": "Img folder/drizzle 1.png",
            "10d": "Img folder/rain 1.png",
            "10n": "Img folder/rain 1.png",
            "11d": "https://openweathermap.org/img/wn/11d@2x.png",
            "11n": "https://openweathermap.org/img/wn/11d@2x.png",
            "13d": "https://openweathermap.org/img/wn/13d@2x.png",
            "13n": "https://openweathermap.org/img/wn/13d@2x.png",
            "50d": "https://openweathermap.org/img/wn/50n@2x.png",
            "50n": "https://openweathermap.org/img/wn/50n@2x.png",
        };

        const iconCode = data.weather[0].icon;

        // Set the src attribute based on the weather condition
        weatherstatus.src = iconMapping[iconCode] || "Img folder/clear 2.png";
        navwethericon.src = iconMapping[iconCode] || "Img folder/clear 2.png";



        // Assuming the timezone offset is -18000 seconds (5 hours behind UTC)
        const timezoneOffsetSeconds = data.timezone;

        // Function to format date and time
        function formatDateTime(timezoneOffsetSeconds) {
            // Create a new Date object representing the current UTC time
            const utcTime = new Date();

            // Adjust the UTC time based on the timezone offset
            const localTime = new Date(utcTime.getTime() + timezoneOffsetSeconds * 1000);

            // Format the local date using Intl.DateTimeFormat
            const LocalDate = new Intl.DateTimeFormat('en-IN', {
                timeZone: 'UTC',     // Specify the UTC time zone
                weekday: 'long',     // Display the full weekday name
                day: 'numeric',      // Display the day of the month
                month: 'long',       // Display the full month name
                year: 'numeric'      // Display the year
            }).format(localTime);

            // Format the local Time using Intl.DateTimeFormat
            const LocalTime = new Intl.DateTimeFormat('en-IN', {
                timeZone: 'UTC',     // Specify the UTC time zone
                hour: 'numeric',
                minute: 'numeric',
                // second: 'numeric'      // Display the year
            }).format(localTime);

            // View the current local date
            location_time.innerHTML = LocalTime;
            location_date.innerHTML = LocalDate;

        }
        // Initial call to format and display date and time
        formatDateTime(timezoneOffsetSeconds);




        progress.style.width = "80%";

    } catch (error) {
        progress.style.backgroundColor = "#b1e7ff";
        progress.style.transition = "0s";
        progress.style.width = "0%";
        console.error(`Error Message: ${error.message}`);
    }

    progress.style.width = "90%";




    // .........................This is for Hourly forcast data get request....................................

    let myurl = `https://api.openweathermap.org/data/2.5/forecast?q=${element.value || element2.textContent}&appid=${api_key}&units=metric`

    let response = await fetch(myurl)
    let mydata = await response.json();

    progress.style.width = "100%";

    // Function to update the weather information for a specific hour
    function updateHourElement(hourElement, weatherData) {

        const weatherIcon = weatherData.weather[0].icon;

        // Extract the last 8 characters from dt_txt to get HH:mm:ss
        const timeString = weatherData.dt_txt.slice(-8, -3);
        // Round wind speed to 4 digits
        const roundedWindSpeed = weatherData.wind.speed.toFixed(1);
        // Set wind direction image source
        // Set inline style for wind direction image rotation
        const windDirectionImg = hourElement.querySelector('.hour-WindDirection img');
        const windDirectionRotation = weatherData.wind.deg || 0;
        windDirectionImg.style.transform = `rotate(${windDirectionRotation}deg)`;

        hourElement.querySelector('.hour-Timestamp').textContent = timeString;;
        // hourElement.querySelector('.hour-Weather-status img').src = `Img folder/${weatherData.weather[0].icon}.png`;
        hourElement.querySelector('.hour-Weather-Temp').textContent = `${Math.round(weatherData.main.temp)}°C`;
        hourElement.querySelector('.hour-WindDirection-Speed').textContent = `${roundedWindSpeed} km/h`;


        // Mapping between weatherIcon values and image paths
        const iconMappings = {
            "01d": "Img folder/clear 2.png",
            "01n": "Img folder/MoonTime.png",
            "02d": "Img folder/mist 1.png",
            "02n": "Img folder/MoonTime.png",
            "03d": "https://openweathermap.org/img/wn/03d@2x.png",
            "03n": "Img folder/MoonTime.png",
            "04d": "Img folder/clouds 1.png",
            "04n": "Img folder/MoonTime.png",
            "09d": "Img folder/drizzle 1.png",
            "09n": "Img folder/MoonTime.png",
            "10d": "Img folder/rain 1.png",
            "10n": "Img folder/MoonTime.png",
            "11d": "https://openweathermap.org/img/wn/11d@2x.png",
            "11n": "Img folder/MoonTime.png",
            "13d": "https://openweathermap.org/img/wn/13d@2x.png",
            "13n": "Img folder/MoonTime.png",
            "50d": "https://openweathermap.org/img/wn/50n@2x.png",
            "50n": "Img folder/MoonTime.png"
        };

        // Change the src attribute based on the weather condition
        const iconPath = iconMappings[weatherIcon] || "clear 2.png"; // Replace "default.png" with a default image path if needed
        hourElement.querySelector('.hour-Weather-status img').src = ` ${iconPath}`;





    }

    // Function to update all hour elements in the HTML
    function updateHourElements() {
        const hourContainer = document.querySelector('.hour');

        if (hourContainer && mydata.list) {
            const hourElements = hourContainer.children;

            for (let i = 0; i < hourElements.length; i++) {
                if (mydata.list[i]) {
                    updateHourElement(hourElements[i], mydata.list[i]);
                }
            }
        }
    }

    // Call the function to update hour elements
    updateHourElements();

    // .........................This is for day forcast code....................................

    // Function to update the weather information for a specific day
    function updateDayElement(dayElement, myweatherData) {

        // Extracting necessary information from myweatherData
        const weatherIcon = myweatherData.weather[0].icon;
        const weatherDescription = myweatherData.weather[0].description;
        const minTemperature = myweatherData.main.temp.toFixed(0);
        const maxTemperature = myweatherData.main.feels_like.toFixed(0);
        const date = new Date(myweatherData.dt * 1000); // Convert timestamp to date object
        const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        // Updating UI elements
        // dayElement.querySelector('.icon img').src = `Img folder/${weatherIcon}.png`;
        dayElement.querySelector('.State-weather').textContent = weatherDescription;
        dayElement.querySelector('.temp').textContent = `Temp ${minTemperature}°C`;
        dayElement.querySelector('.feels').textContent = `Feels ${maxTemperature}°C`;
        dayElement.querySelector('.date').textContent = `${dayOfWeek}, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;

        // Mapping between weatherIcon values and image paths
        const weatherIconMapHourly = {
            "01d": "Img folder/clear 2.png",
            "01n": "Img folder/clear 2.png",
            "02d": "Img folder/mist 1.png",
            "02n": "Img folder/mist 1.png",
            "03d": "https://openweathermap.org/img/wn/03d@2x.png",
            "03n": "https://openweathermap.org/img/wn/03d@2x.png",
            "04d": "Img folder/clouds 1.png",
            "04n": "Img folder/clouds 1.png",
            "09d": "Img folder/drizzle 1.png",
            "09n": "Img folder/drizzle 1.png",
            "10d": "Img folder/rain 1.png",
            "10n": "Img folder/rain 1.png",
            "11d": "https://openweathermap.org/img/wn/11d@2x.png",
            "11n": "https://openweathermap.org/img/wn/11d@2x.png",
            "13d": "https://openweathermap.org/img/wn/13d@2x.png",
            "13n": "https://openweathermap.org/img/wn/13d@2x.png",
            "50d": "https://openweathermap.org/img/wn/50n@2x.png",
            "50n": "https://openweathermap.org/img/wn/50n@2x.png",
        };

        const iconURL = weatherIconMapHourly[weatherIcon] || "Img folder/clear 2.png";
        dayElement.querySelector('.icon img').src = iconURL;
    }




    // Function to update all day elements in the HTML
    function updateDayElements() {
        const dayContainer = document.querySelector('.dayContainer');

        if (dayContainer && mydata.list) {

            // Filter the list array to get only the daily data with 00:00:00 time
            const dailyData = mydata.list.filter(item => item.dt_txt.includes('06:00:00'));

            // Iterate over the filtered dailyData array
            for (let i = 0; i < dailyData.length; i++) {
                const dayElement = dayContainer.children[i];
                if (dayElement) {
                    updateDayElement(dayElement, dailyData[i]);
                }
            }
        }
    }

    // Call the function to update day elements
    updateDayElements();

    setTimeout(() => {
        progress.style.backgroundColor = "#b1e7ff";
    }, 1000);
    setTimeout(() => {
        progress.style.width = "0%";
    }, 2000);

}





