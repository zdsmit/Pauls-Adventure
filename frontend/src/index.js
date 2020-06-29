const BASE_URL = "http://localhost:3000"
const SCENARIO_URL = `${BASE_URL}/scenarios`

let heroName
let heroineName
let itemType

function getScenario(id) {
  fetch(SCENARIO_URL)
  .then(res => res.json())
  .then(scenarios => {
    scenarios.data.forEach(scenario => {
      if (scenario.id == id) {createScenario(scenario)}
    })
  })
}

document.getElementById("start-button").addEventListener("click", function(event) {
  event.preventDefault()
  heroName = document.getElementById("male-first-name").value
  heroineName = document.getElementById("female-first-name").value
  itemType = document.getElementById("object").value
  getScenario(1)
})

function createScenario(scenario) {
  document.querySelector("header").innerHTML = ""
  document.querySelector("main").innerHTML = ""

  let hero = new Hero(heroName)
  let heroine = new Heroine(heroineName)
  let item = new Item(itemType)

  let div = document.createElement("div")

  let p = document.createElement("p")
  p.setAttribute("class", "scenario_text")
  let alteredText = nounFilter(scenario.attributes.text, hero.name, heroine.name, item.name)
  p.innerText = alteredText
  if (scenario.id == 7) {
    p.style.color = "red"
  }
  div.appendChild(p)

  let ol = document.createElement("ol")
  scenario.attributes.responses.forEach(response => {
    let li = document.createElement("li")
    li.innerText = response.text
    ol.appendChild(li)

    li.addEventListener("click", function() {
      div.removeChild(p)
      getScenario(response.result)
    })
  })

  p.appendChild(ol)
  document.querySelector("main").appendChild(div)
}

let insertOption = function(text, oldName, newName) {
  let split = text.split(" ")
  split.forEach(word => {
    let splitWord = word.split("")
    let filtered =  splitWord.filter(word => word != /[.,\/#!$%\^&\*;:{}=\-_`~()]/)
    console.log(filtered)
    if (splitWord[0] == oldName) {
      splitWord.splice(0, 1, newName)
    }
    //console.log(splitWord.join(" "))
    word = splitWord.join(" ")
  })
  //console.log(split)
  return split.join(" ")
}

let nounFilter = function(text, maleName, femaleName, itemType) {
  let filter1 = insertOption(text, "Paul", maleName)
  let filter2 = insertOption(filter1, "Lucy", femaleName)
  let filter3 = insertOption(filter2, "ring", itemType)
  return filter3
}

class Hero {

  constructor(name) {
    this.name = name
  }

}


class Heroine {

  constructor(name) {
    this.name = name
  }

}


class Item {

  constructor(name) {
    this.name = name
  }

}

//(/[.,\/#!$%\^&\*;:{}=\-_`~()]/)