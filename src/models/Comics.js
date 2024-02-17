export class Comics {

    #idComic
    #name
    #path
    #extension
    #creator = []
    #event = []
    #story = []
  
    setName(name) {
      this.#name = name
    }

    getName() {
      return this.#name
    }
  
    setPath(path) {
      this.#path = path
    }
  
    getPath() {
      return this.#path
    }

    setId(id){
      this.#idComic = id
    }
    
    getId(){
      return this.#idComic
    }

    setExtension(extension){
      this.#extension = extension
    }

    getExtension(){
      return this.#extension
    }

    setCreator(creator){
      this.#creator.push(creator)
    }

    getCreators(){
      return this.#creator
    }

    setEvent(event){
      this.#event.push(event)
    }

    getEvents(){
      return this.#event
    }

    setStory(story){
      this.#story.push(story)
    }

    getStories(){
      return this.#story
    }

  }
  