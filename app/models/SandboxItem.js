

// NOTE this could be a way to abstract out the sandbox properties
export class SandboxItem {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}