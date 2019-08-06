import axios from 'axios';
import WebService from './WebService';
import produce from 'immer/dist/immer';


const url = 'https://anapioficeandfire.com/api/characters';
const urlFakeApi = 'https://reqres.in/api/';

const urlCountries = 'https://restcountries.eu/rest/v2/name/';

const urlWeatherApi= 'https://api.openweathermap.org/data/2.5/weather?id=';
const keyWeather = '2eb6775dfcc18a8571bc9dd8c9a6ff3b';

export default {
	async createFakeApi({ name, job }) {
		return await WebService.post(urlFakeApi + 'users', {
			name,
			job
		});
	},
	async getCharacter({ character }) {
		return await WebService.get(url + '/' + character);
	},
	async getListUsers() {
		return await WebService.get(urlFakeApi + 'users?page=2');
	},

	async getCountryDetails({ country }) {
		return await WebService.get(urlCountries + country + '?fullText=true');
	},

/*	async getByCityId({ cityId }) {
		return await WebService.get(urlWeatherApi+cityId+ '&appid='+keyWeather);
	}, */
	async getByCityId({ cityId }) {
		console.log("urk:"+cityId);
		return await WebService.get( cityId);
	},
};
//&appid=YOUR_API_KEY 