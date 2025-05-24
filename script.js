$("#weather-form").on("submit", function (e) {
  e.preventDefault();
  $("#weather-result").show();
  $("#weather-result").css("display", "inline");
  const city = $("#city").val().trim();
  const apiKey = "4592b95a03040677d681bcb471f96f27"; // 🔑 Replace with your real API key

  if (city === "") {
    $("#error-message").text("Please enter a city name.");
    $("#weather-result").text("");
    return;
  }

  // Clear previous results and error messages
  $("#error-message").text("");
  $("#weather-result").text("Weather data loading...");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function (data) {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const pressure = data.main.pressure;
      const visibility = data.visibility;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      $("#weather-result").html(`
          <h2>Weather in ${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="${desc}">
          <p>Temperature: ${temp}°C</p>
          <p>Feels Like: ${data.main.feels_like}°C</p>
          <p>Discription: ${desc}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed}m/s</p>
          <p>Pressure: ${pressure}hPa</p>
          <p>Visibility: ${visibility}m</p>
          <p>Sunrise: ${new Date(
            data.sys.sunrise * 1000
          ).toLocaleTimeString()}</p>
          <p>Sunset: ${new Date(
            data.sys.sunset * 1000
          ).toLocaleTimeString()}</p>
          <p>Cloudiness: ${data.clouds.all}%</p>
          <h4>Timezone: ${data.timezone / 3600} hours</h4>
          <h4>Coordinates: ${data.coord.lat}°N, ${data.coord.lon}°E</h4>
          <p>Last updated: ${new Date(data.dt * 1000).toLocaleString()}</p>
        `);
    },
    error: function () {
      $("#weather-result").hide();
      $("#error-message").text(
        "Could not find weather for the city or Check your internet connection."
      );
    },
  });
});
