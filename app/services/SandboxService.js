import { AppState } from "../AppState.js";
import { Apod } from "../models/Apod.js";
import { api } from "./AxiosService.js"


class SandboxService {
  async deleteApod(apodId) {
    const response = await api.delete(`api/apods/${apodId}`) // modifies the remote data through the api
    console.log('💣🌌📡', response.data);
    const indexToRemove = AppState.myApods.findIndex(apod => apod.id == apodId)
    AppState.myApods.splice(indexToRemove, 1)
  }
  setActiveApod(apodId) {
    const selectedApod = AppState.myApods.find(apod => apod.id == apodId)
    AppState.activeApod = selectedApod
  }
  async fetchFavoriteApods() {
    const response = await api.get('api/apods')
    console.log('🥪🌌📡', response.data);
    const apods = response.data.map(apodData => new Apod(apodData))
    AppState.myApods = apods
    console.log(AppState.myApods);
  }
  async saveApod() {
    const apodToSave = AppState.activeApod
    // NOTE do not forget to send your grandchildren money in the birthday card
    const response = await api.post('api/apods', apodToSave) // Posts need a destination (api/apods), and a body/payload (apodToSave)
    console.log('💾🥪🌌', response.data);
    // TODO push to list of my apods
    const savedApod = new Apod(response.data)
    AppState.myApods.push(savedApod)
  }

}

export const sandboxService = new SandboxService()