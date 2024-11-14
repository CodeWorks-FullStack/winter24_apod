import { AppState } from "../AppState.js";
import { apodsService } from "../services/ApodsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class ApodsController {
  constructor() {
    console.log('🌌🎮');
    AppState.on('activeApod', this.drawActiveApod)
    AppState.on('account', this.drawActiveApod) // redraw the active after the account is here, to draw in the save button
    this.fetchApod()
  }

  async fetchApod() {
    try {
      await apodsService.fetchApod()
    } catch (error) {
      console.error(error)
      Pop.toast("Could not retrieve Astronomy Picture of the Day", 'error')
    }
  }

  async fetchApodByDate() {
    try {
      event.preventDefault()
      console.log('🌌🗓️');
      const formElm = event.target
      const date = formElm.date.value
      console.log('🗓️👉', date);
      await apodsService.fetchApodByDate(date)
    } catch (error) {
      console.error(error)
      Pop.toast("Could not retrieve Astronomy Picture of the Day", 'error')
    }
  }

  drawActiveApod() {
    console.log('✏️🌌');
    setHTML('active-apod', AppState.activeApod.ApodTemplate)
    document.body.style.backgroundImage = `url(${AppState.activeApod.imgUrl})`
  }
}