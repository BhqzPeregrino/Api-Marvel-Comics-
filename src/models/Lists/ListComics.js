export class ListComics {
    #comics = []
  
    addComics(comics) {
      this.#comics.push(comics)
    }
  
    getComics() {
      return this.#comics
    }
  }
  