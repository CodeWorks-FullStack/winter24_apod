// @ts-ignore
import { AppState } from "../AppState.js";
import { baseURL } from "../env.js"
import { Apod } from "../models/Apod.js";

// const apiKey = 'api_key=2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1'

// @ts-ignore
const nasaAPi = axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key: '2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1'
  }
})

class ApodsService {
  async fetchApodByDate(date) {
    const response = await nasaAPi.get(`planetary/apod?date=${date}`)
    console.log('🗓️🌌📡', response.data);
    const apod = new Apod(response.data)
    AppState.activeApod = apod
  }
  async fetchApod() {
    // @ts-ignore
    // const response = await nasaAPi.get(`planetary/apod?api_key=2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1`)
    // const response = await nasaAPi.get(`planetary/apod?${apiKey}`)
    const response = await nasaAPi.get(`planetary/apod`)
    console.log('🌌📡', response.data);
    const apod = new Apod(response.data)
    AppState.activeApod = apod
  }

}

export const apodsService = new ApodsService()