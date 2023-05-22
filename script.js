"use strict"

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const originalImage = new Set(jsonData.originalImage)
    // const easy_images = jsonData.easy_images
    // const hard_images = jsonData.hard_images
    // const test_easy = jsonData.test_easy
    // const test_hard = jsonData.test_hard
    const d1_images_e1 = jsonData.d1_images_e1
    const d1_images_h1 = jsonData.d1_images_h1
    const d1_images_e2 = jsonData.d1_images_e2
    const d1_images_h2 = jsonData.d1_images_h2
    const d1_images_e3 = jsonData.d1_images_e3
    const d1_images_h3 = jsonData.d1_images_h3
    const d1_images_h4 = jsonData.d1_images_h4
    const d1_images_h5 = jsonData.d1_images_h5

    function renderHard(imageContainer, data, caption) {
      imageContainer.innerHTML = ""
      for (let i = 0; i < data.length; i++) {
        const picContainer = document.createElement("div")
        picContainer.classList.add("picContainer")

        const img = document.createElement("img")
        const imgText = document.createElement("div")
        imgText.textContent = caption[i]
        imgText.style.textAlign = "center"
        // add a slight margin below the image
        imgText.style.marginBottom = "10px"
        // make font size larger
        imgText.style.fontSize = "15px"

        img.src = data[i]
        img.style.width = "120px"
        picContainer.appendChild(img)
        picContainer.appendChild(imgText)
        img.classList.add("images")
        imageContainer.appendChild(picContainer)
      }
    }
    function renderEasy(imageContainer, data, caption) {
      imageContainer.innerHTML = ""
      for (let i = 0; i < data.length; i++) {
        const picContainer = document.createElement("div")
        picContainer.classList.add("picContainer")

        const img = document.createElement("img")
        const imgText = document.createElement("div")
        imgText.textContent = caption[i]
        imgText.style.textAlign = "center"
        // add a 10px margin below the image
        imgText.style.marginBottom = "10px"
        // make font size larger
        imgText.style.fontSize = "20px"

        img.src = data[i]
        img.style.width = "245px"
        // imageContainer.appendChild(img)
        picContainer.appendChild(img)
        picContainer.appendChild(imgText)

        img.classList.add("images")
        imageContainer.appendChild(picContainer)
      }
    }

    const imageContainer = document.querySelectorAll(".imageContainer")

    const hardButton = document.querySelector(".hardButton")

    const easyButton = document.querySelector(".easyButton")

    // Function to add the additional picture
    function addAdditionalPicture() {
      renderHard(imageContainer[0], d1_images_h1, jsonData.d1_captions_h1)
      renderHard(imageContainer[1], d1_images_h2, jsonData.d1_captions_h2)
      renderHard(imageContainer[2], d1_images_h3, jsonData.d1_captions_h3)
      renderHard(imageContainer[3], d1_images_h4, jsonData.d1_captions_h4)
      renderHard(imageContainer[4], d1_images_h5, jsonData.d1_captions_h5)

      // renderHard(imageContainer[0], hard_images, jsonData.hard_captions1)
      // renderHard(imageContainer[1], test_hard, jsonData.hard_captions2)

      flipImg()

      // Disable the button after adding the picture
      hardButton.disabled = true
      easyButton.disabled = false
    }
    function getInitialPicture() {
      renderEasy(imageContainer[0], d1_images_e1, jsonData.d1_captions_e1)
      renderEasy(imageContainer[1], d1_images_e2, jsonData.d1_captions_e2)
      renderEasy(imageContainer[2], d1_images_e3, jsonData.d1_captions_e3)
      // clear the last image
      imageContainer[3].innerHTML = ""
      imageContainer[4].innerHTML = ""
      // renderEasy(imageContainer[0], easy_images, jsonData.easy_captions1)
      // renderEasy(imageContainer[1], test_easy, jsonData.easy_captions2)

      flipImg()

      hardButton.disabled = false
      easyButton.disabled = true
    }

    // Add event listener to the button
    easyButton.addEventListener("click", getInitialPicture)
    hardButton.addEventListener("click", addAdditionalPicture)

    function flipImg() {
      const images = document.getElementsByClassName("images")

      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", flipImage)
        images[i].addEventListener("mouseleave", revertImage)
      }

      function flipImage() {
        if (this.classList.contains("flipped")) {
          // Flip back to the original image
          this.src = this.dataset.originalSrc
        } else {
          // Flip to a different image
          this.dataset.originalSrc = this.src // Store the original image source
          console.log(this.dataset.originalSrc)

          if (originalImage.has(this.dataset.originalSrc.split("/").pop())) {
            this.src = "./data/true_mark_reverse.png"
          } else {
            this.src = "./data/false-reverse.png"
          }
          // this.src = "./data/true_mark.jpeg"

          // Replace with the new image source
        }
        this.classList.toggle("flipped")
      }
      function revertImage() {
        if (this.classList.contains("flipped")) {
          this.src = this.dataset.originalSrc
          this.classList.remove("flipped")
        }
      }
    }

    flipImg()

    // for the first render
    getInitialPicture()
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error)
  })

// interp_images1 is a list of paths to 25 images
// the first path is data/images-in-paper/demo2/interp1.jpg
// the last path is data/images-in-paper/demo2/interp25.jpg
const interp_images1 = [
  "./data/images-in-paper/demo2/0-x0y0.jpg",
  "./data/images-in-paper/demo2/1-x0y25.jpg",
  "./data/images-in-paper/demo2/2-x0y50.jpg",
  "./data/images-in-paper/demo2/3-x0y75.jpg",
  "./data/images-in-paper/demo2/4-x0y100.jpg",
  "./data/images-in-paper/demo2/5-x25y100.jpg",
  "./data/images-in-paper/demo2/6-x50y100.jpg",
  "./data/images-in-paper/demo2/7-x75y100.jpg",
  "./data/images-in-paper/demo2/8-x100y100.jpg",
  "./data/images-in-paper/demo2/9-x100y75.jpg",
  "./data/images-in-paper/demo2/10-x100y50.jpg",
  "./data/images-in-paper/demo2/11-x100y25.jpg",
  "./data/images-in-paper/demo2/12-x100y0.jpg",
]
// add paths
// for (let i = 1; i < 26; i++) {
//   let path = `./data/images-in-paper/demo2/interp${i}.jpg`
//   interp_images1.push(path)
// }

// const interp_images1 = [
//   "./data/x0y0.jpg",
//   "./data/x0y25.jpg",
//   "./data/x0y50.jpg",
//   "./data/x0y75.jpg",
//   "./data/x0y100.jpg",
// Add the paths of the remaining 16 images here
// "./data/x0y20.jpg",
// "./data/x0y25.jpg",
// ...
// "./data/x0y95.jpg",
// "./data/x0y100.jpg"
// ]
// const interp_images2 = [
//   "./data/x0y100.jpg",
//   "./data/x0y75.jpg",
//   "./data/x0y0.jpg",
//   "./data/x0y25.jpg",
//   "./data/x0y50.jpg",
// ]
const image1 = document.getElementById("interp-img1")
const slider1 = document.getElementById("interp-range1")
// const image2 = document.getElementById("interp-img2")
// const slider2 = document.getElementById("interp-range2")

// Function to change the image source based on the slider value
function changeImage(slider, image, images) {
  let index = parseInt(slider.value)
  image.src = images[index]
}

// Event listener for the slider input
slider1.addEventListener("input", () =>
  changeImage(slider1, image1, interp_images1)
)
// slider2.addEventListener("input", () =>
//   changeImage(slider2, image2, interp_images2)
// )

// picture combination
