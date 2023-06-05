//select element from html file
const fruitForm = document.querySelector("#inputSection form")
console.log(fruitForm)

const fruitNutrition = document.querySelector("#nutritionSection p")
let cal = 0

const fruitList = document.querySelector("#fruitSection ul")

const addFruit = fruit => {
    //add fruit submitted to list
    const li = document.createElement('li')
    //.name to keep fruit as text not obj
    li.textContent = `${fruit.name} of Genus ${fruit.genus}`
    fruitList.appendChild(li)
    cal+=fruit.nutritions.calories
    //remove fruit when clicked
    li.addEventListener("click", () => {
        li.remove()
        cal-=fruit.nutritions.calories
        //update cal after fruit removed
        fruitNutrition.textContent = (cal===0 ? "" :`Total calories: ${cal}`)
    }, {once:true})

    //running total of salad cal
    fruitNutrition.textContent = `Total calories: ${cal}`
}

// const fetchFruitData = (fruit) => {
//     //access api
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//         .then(res => res.json())
//         .then(data => addFruit(data))
//         .catch(e => console.log(e))
//     }

const fetchFruitData = async (fruit) => {
    try {
        //await to fetch data before anything else
        const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
        if (resp.ok){
            const data = await resp.json()
            addFruit(data)
        } else {
            throw "Error: http status code = " + resp.status
        }
    //error handling
    } catch (err) {
        console.log(err)
        alert("Fruit not found.")
    }
}

const extractFruit = e => {
    e.preventDefault() //action does not clear
    // console.log(`You typed ${e.target.fruitInput.value}`)
    //addFruit(e.target.fruitInput.value)
    fetchFruitData(e.target.fruitInput.value)
    // clear text box
    e.target.fruitInput.value = ""
}

fruitForm.addEventListener("submit", extractFruit)


