export function GetWeather(call, callback) {

  console.log('Request received: ' + JSON.stringify(call.request));

  const { city } = call.request;
  const weather = /^[aeiou]/i.test(city) ? 'Rainy' : 'Sunny';
  const defer = 1000 + Math.random() * 2000;

  const response = { city, weather };

  setTimeout(() => {
    console.log('Response sent: ' + JSON.stringify(response));
    callback(null, response);
  }, defer);
}