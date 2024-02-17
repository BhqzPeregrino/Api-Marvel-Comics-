import { listComics } from "./dependencies.js"
import { Comics } from "../models/Comics.js"
import { Events } from "../models/Events.js"
import { Creators } from "../models/Creators.js"
import { Stories } from "../models/Stories.js"

document.getElementById("btn-api").addEventListener("click", function () {
  let url =
    "https://gateway.marvel.com:443/v1/public/comics?ts=1&limit=20&apikey=7fbbb30ae1ec5499d314d55c417a2e21&hash=43b4dedd1d4fa7e09921e311983cb595"

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data)

      data.data.results.forEach(element => {

        let comic = new Comics()
        comic.setId(element.id)
        comic.setName(element.title)
        comic.setPath(element.thumbnail.path)
        comic.setExtension(element.thumbnail.extension)

        element.creators.items.forEach(name => {
          let creator = new Creators()
          creator.setName(name.name)
          comic.setCreator(creator)
        })

        let event = new Events()
        event.setUrl(element.events.collectionURI)
        comic.setEvent(event)

        element.stories.items.forEach(item => {
          let story = new Stories
          story.setName(item.name)
          story.setType(item.type)
          comic.setStory(story)
        })
        
        listComics.addComics(comic)
      })

    })
})

let ul = document.getElementById("char-list")
let MostrarTodo = document.getElementById("btn-view")
MostrarTodo.addEventListener("click", function(){

  listComics.getComics().forEach(comics =>{
    let listChar = document.createElement("li")
    let charContainer = document.createElement("div")
    charContainer.classList.add("char-container");

    let divId = document.createElement("div")
    let id = document.createElement("p")
    id.innerHTML = comics.getId()
    divId.appendChild(id)
    charContainer.appendChild(divId)

    let divName = document.createElement("div")
    let name = document.createElement("p")
    name.innerHTML = comics.getName()
    divName.appendChild(name)
    charContainer.appendChild(divName)

    let divImg = document.createElement("div")
    let img = document.createElement("img")
    img.setAttribute("src",comics.getPath()+"."+comics.getExtension())
    divImg.appendChild(img)
    charContainer.appendChild(img)

    let btnDetails = document.createElement("button")
    btnDetails.innerText = "Ver detalles"
    btnDetails.classList.add("btn-marvel")
    btnDetails.addEventListener("click",function (){

      let ventana = document.createElement("div")
      ventana.classList.add("modal", "marvel")
      let ul = document.createElement("ul")

      comics.getCreators().forEach(creator => {
        let li = document.createElement("li")
        li.classList.add("li-modal")

        let divCreator = document.createElement("div")
        let nameCreator = document.createElement("p")
        nameCreator.innerHTML = `<p>Creador: ${creator.getName()}</p>`
        divCreator.appendChild(nameCreator)
        li.appendChild(divCreator)
        ul.appendChild(li)
      })
  
      comics.getEvents().forEach(url =>{
        let li = document.createElement("li")
        li.classList.add("li-modal")

        let divUrlEvent = document.createElement("div")
        let urlEvent = document.createElement("p")
        urlEvent.innerHTML = `<p>Evento: ${url.getUrl()}</p>`
        divUrlEvent.appendChild(urlEvent)
        li.appendChild(divUrlEvent)
        ul.appendChild(li)
      })
  
      comics.getStories().forEach(story =>{
        let li = document.createElement("li")
        li.classList.add("li-modal")

        let divStory = document.createElement("div")
        let nameStory = document.createElement("p")
        let type = document.createElement("label")
        nameStory.innerHTML = `<p>Nombre de historia: ${story.getName()}</p>`
        type.innerHTML = `<p>Tipo: ${story.getType()}</p>`
        divStory.appendChild(nameStory)
        divStory.appendChild(type)
        li.appendChild(divStory)
        ul.appendChild(li)
      })

      ventana.appendChild(ul)
      document.body.appendChild(ventana)
      ventana.addEventListener("click",function (){
        ventana.remove()
      })
    })
    charContainer.appendChild(btnDetails)


    listChar.appendChild(charContainer)
    ul.appendChild(listChar)
  })

})


