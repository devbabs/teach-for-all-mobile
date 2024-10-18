import axios from 'axios';
import {Platform, StatusBar} from 'react-native';
import Config from 'react-native-config';
import { store } from '../state-management/store';

export const Http = axios.create({
	baseURL: Config.API_URL,
	timeout: 480000,
});

Http.interceptors.request.use(
	config => {
		const token = store.getState()?.authentication?.token;

		if (config.headers) {
			config.headers.Accept = `application/json`;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		if (Platform.OS === 'ios') {
			StatusBar.setNetworkActivityIndicatorVisible(true);
		}

		return config;
	},
	error => {
		if (Platform.OS === 'ios') {
			StatusBar.setNetworkActivityIndicatorVisible(false);
		}
		return Promise.reject(error);
	},
);

Http.interceptors.response.use(
	response => {
		if (Platform.OS === 'ios') {
			StatusBar.setNetworkActivityIndicatorVisible(false);
		}

		return response;
	},
	error => {
		if (Platform.OS === 'ios') {
			StatusBar.setNetworkActivityIndicatorVisible(false);
		}

		return Promise.reject(error);
	},
);