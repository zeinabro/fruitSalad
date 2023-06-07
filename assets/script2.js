//select element from html file
const fruitForm = document.querySelector("#inputSection form")

const fruitNutrition = document.querySelector("#nutritionSection p")
let cal = 0

const fruitList = document.querySelector("#fruitSection ul")
const fruitImageList = document.querySelector(".fruitImage ul")

const addFruit = async (fruitData) => {
    // fruitData passed in as object from fruity api
    // add fruit submitted to list
    const li = document.createElement('li')
    // .name to access obj property as string
    li.textContent = `${fruitData.name} of Genus ${fruitData.genus}`
    fruitList.appendChild(li)
    // update calories total
    cal+=fruitData.nutritions.calories
    
    //await for process to be completed before retrieving value
    let imageData = await fetchFruitImage(fruitData)
    //get img tag + display image
    let img=addImage(imageData,fruitData)

    // remove fruit when clicked
    li.addEventListener("click", () => {
        li.remove()
        // update cal after fruit removed
        cal-=fruitData.nutritions.calories
        fruitNutrition.textContent = (cal===0 ? "" :`Total calories: ${cal}`)
        //remove corresponding fruit image
        img.remove()
    // remove eventListener after first action
    }, {once:true})
    // running total of salad cal
    fruitNutrition.textContent = `Total calories: ${cal}`
}

// error handling for no image ?

// fruit image from pixabay api
const fetchFruitImage = async (fruitData) => {
    let imageData=null
    try{
        const resp = await fetch(`https://pixabay.com/api/?key=37050473-40f569f988404354c061a5e77&q=${fruitData.name}&image_type=photo`)
        if (resp.ok){
            imageData = await resp.json()
        } else {
            throw "Error: http status code = " + resp.status
        }
    } catch (err) {
        console.log(err)
        alert('Image not found.')
    }
    return imageData
}

// add image of fruit
const addImage = (imageData,fruitData) => {
    const img=document.createElement('img')
    // add link from api
    img.src=imageData.hits[0].previewURL
    img.alt=`Image of ${fruitData.name}`
    // add image
    fruitImageList.appendChild(img)
    return img
}

// fruit data from fruity api
const fetchFruitData = async (fruit) => {
    try {
        //await to fetch data before anything else
        //const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
        //linked my api
        const resp = await fetch(`https://myfruitapi-x0jh.onrender.com/fruits/${fruit}`)
        if (resp.ok){
            const fruitData = await resp.json()
            addFruit(fruitData)
        } else {
            throw "Error: http status code = " + resp.status
        }
    } catch (err) {
        console.log(err)
        alert("Fruit not found.")
    }
}

const extractFruit = e => {
    // action does not clear
    e.preventDefault() 
    // passes in input text
    fetchFruitData(e.target.fruitInput.value)
    // clear text box
    e.target.fruitInput.value = ""
}

// calls functions when input submitted 
fruitForm.addEventListener("submit", extractFruit)
