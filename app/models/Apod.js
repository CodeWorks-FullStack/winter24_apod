import { AppState } from "../AppState.js"



export class Apod {
  // NOTE this constructor needs to construct data from two different sources, so some of  it's properties, need 2 possible values
  constructor(data) {
    this.imgUrl = data.hdurl || data.imgUrl
    this.description = data.explanation || data.description
    this.author = data.copyright || data.author
    this.date = data.date
    // sandbox stuff
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get ApodTemplate() {
    return `
    <article class="text-shadow">
      <h3>${this.date}</h3>
      <p>${this.description}</p>
      <div class="d-flex justify-content-between">
        <h4>${this.author}</h4>
          ${this.SaveButton}
      </div>
    </article>
    `
  }

  get ListTemplate() {
    return `
      <div onclick="app.SandboxController.setActiveApod('${this.id}')" class="mb-3 p-1 rounded" role="button">
        <img class="preview-img" src="${this.imgUrl}" />
        <span>${this.date}</span>
        <button onclick="app.SandboxController.deleteApod('${this.id}')" class="btn btn-outline-danger" title="delete APOD">Delete</button>
      </div>
    `
  }

  // NOTE if a piece of our template is CONDITIONAL, we need to redraw the whole template, when a piece of data in that condition changes
  get SaveButton() {
    if (AppState.account != null) {
      return `<button onclick="app.SandboxController.saveApod()" class="btn btn-outline-light">Save <i class="mdi mdi-floppy"></i></button>`
    }
    return '<i>login to save this APOD</i>'
  }
}