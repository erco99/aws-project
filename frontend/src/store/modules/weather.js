import { getHourlyWeather, getDailyWeather } from "@/api/weather";

const state = {
    weatherData: {
        fullHourly: null,
        fullDaily: null,
    },
    dataReady: false
}

const mutations = {
    SET_FULL_HOURLY: (state, data) => {
        state.weatherData.fullHourly = data
    },
    SET_FULL_DAILY: (state, data) => {
        state.weatherData.fullDaily = data
    },
    SET_DATA_READY: (state, data) => {
        state.dataReady = data
    }
}

const actions = {
    fetchWeather({ commit }, { latitude, longitude, from }) {
        return new Promise((resolve, reject) => {
            getHourlyWeather({latitude, longitude, from}).then(res => {
                commit('SET_FULL_HOURLY', res.data.weather_data)
            }).then(() => {
                getDailyWeather({latitude, longitude, from}).then(res => {
                    commit('SET_FULL_DAILY', res.data.weather_data)
                    commit('SET_DATA_READY', true)
                    resolve()
                }).catch(error => {
                    reject(error)
                });
            }).catch(error => {
                reject(error)
            });
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}