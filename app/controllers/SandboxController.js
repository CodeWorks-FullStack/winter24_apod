import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class SandboxController {
  constructor() {
    console.log('🥪🎮');
    // this.fetchFavoriteApods()
    AppState.on('account', this.fetchFavoriteApods)
    AppState.on('account', this.showFavpodsButton)
    AppState.on('myApods', this.drawMyApods)
  }


  async fetchFavoriteApods() {
    try {
      console.log('🐕🥪🌌');
      await sandboxService.fetchFavoriteApods()
    } catch (error) {
      console.error(error)
      Pop.toast("Could not fetch favorite APODs", 'error')
    }
  }

  setActiveApod(apodId) {
    sandboxService.setActiveApod(apodId)
  }

  async saveApod() {
    try {
      console.log('💾🌌');
      await sandboxService.saveApod()
      Pop.toast("Saved!")
    } catch (error) {
      console.error(error)
      Pop.toast("Could not save APOD", 'error')
    }
  }

  async deleteApod(apodId) {
    try {
      event.stopPropagation() // stops the delete button click from also running the set active click
      console.log('💣🌌', apodId);
      const confimred = await Pop.confirm("Are you sure you want to delete this APOD?")
      if (!confimred) return

      await sandboxService.deleteApod(apodId)
    } catch (error) {
      console.error(error)
      Pop.toast("Could not delete APOD", 'error')
    }
  }

  drawMyApods() {
    let myApodsListHTML = ''
    AppState.myApods.forEach(apod => myApodsListHTML += apod.ListTemplate)
    setHTML('my-apods', myApodsListHTML)
  }

  showFavpodsButton() {
    const buttonElm = document.getElementById('favpods-button')
    buttonElm.classList.remove('d-none')
  }
}