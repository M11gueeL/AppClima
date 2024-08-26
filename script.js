const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Los dos campos son obligatorios.');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
});

function callAPI(city, country) {
	const apiKey = '59e1aa737e60e2338a26726dc4523e30 ';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

	fetch(url)
		.then(data => {
			return data.json();
		})
		.then(dataJSON => {
			if (dataJSON.code === '404') {
				showError('Ciudad no encontrada');
			} else {
				clearHTML();
				showWheater(dataJSON);
			}
		})
		.catch(error => {
			console.log(error);
		})
}

function showWheater(data) {
	const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
	
	const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

	const content = document.createElement('div');
	content.innerHTML = `
		<h5>Clima en ${name}</h5>
		<img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
		<h2>${degrees}°C</h2>
		<p>Maxima: ${max}°C</p>
		<p>Minima: ${min}°C</p>			
	`;

	result.appendChild(content);
}

function showError (message) {
	console.log(message);
	const alert = document.createElement('p');
	alert.classList.add('alert-message');
	alert.innerHTML = message;

	form.appendChild(alert);
	setTimeout(() => {
		alert.remove();
	}, 3000);
}

function kelvinToCentigrade (temp) {
	return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
