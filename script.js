"use strict"

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const originalImage = new Set(jsonData.originalImage)

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
        imgText.style.fontStyle = "italic"
        imgText.style.textAlign = "center"
        // add a slight margin below the image
        imgText.style.marginBottom = "10px"
        // make font size larger
        imgText.style.fontSize = "15px"
        img.style.cursor = "pointer"

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
        imgText.style.fontStyle = "italic"
        imgText.textContent = caption[i]
        imgText.style.textAlign = "center"
        // add a 10px margin below the image
        imgText.style.marginBottom = "10px"
        // make font size larger
        imgText.style.fontSize = "20px"
        img.style.cursor = "pointer"

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
  "data/interpolation/0_x0y0.jpg",
  "data/interpolation/1_x4y0.jpg",
  "data/interpolation/2_x8y0.jpg",
  "data/interpolation/3_x12y0.jpg",
  "data/interpolation/4_x16y0.jpg",
  "data/interpolation/5_x20y0.jpg",
  "data/interpolation/6_x24y0.jpg",
  "data/interpolation/7_x28y0.jpg",
  "data/interpolation/8_x32y0.jpg",
  "data/interpolation/9_x36y0.jpg",
  "data/interpolation/10_x40y0.jpg",
  "data/interpolation/11_x44y0.jpg",
  "data/interpolation/12_x48y0.jpg",
  "data/interpolation/13_x52y0.jpg",
  "data/interpolation/14_x56y0.jpg",
  "data/interpolation/15_x60y0.jpg",
  "data/interpolation/16_x64y0.jpg",
  "data/interpolation/17_x68y0.jpg",
  "data/interpolation/18_x72y0.jpg",
  "data/interpolation/19_x76y0.jpg",
  "data/interpolation/20_x80y0.jpg",
  "data/interpolation/21_x84y0.jpg",
  "data/interpolation/22_x88y0.jpg",
  "data/interpolation/23_x92y0.jpg",
  "data/interpolation/24_x96y0.jpg",
  "data/interpolation/25_x100y0.jpg",
  "data/interpolation/26_x100y4.jpg",
  "data/interpolation/27_x100y8.jpg",
  "data/interpolation/28_x100y12.jpg",
  "data/interpolation/29_x100y16.jpg",
  "data/interpolation/30_x100y20.jpg",
  "data/interpolation/31_x100y24.jpg",
  "data/interpolation/32_x100y28.jpg",
  "data/interpolation/33_x100y32.jpg",
  "data/interpolation/34_x100y36.jpg",
  "data/interpolation/35_x100y40.jpg",
  "data/interpolation/36_x100y44.jpg",
  "data/interpolation/37_x100y48.jpg",
  "data/interpolation/38_x100y52.jpg",
  "data/interpolation/39_x100y56.jpg",
  "data/interpolation/40_x100y60.jpg",
  "data/interpolation/41_x100y64.jpg",
  "data/interpolation/42_x100y68.jpg",
  "data/interpolation/43_x100y72.jpg",
  "data/interpolation/44_x100y76.jpg",
  "data/interpolation/45_x100y80.jpg",
  "data/interpolation/46_x100y84.jpg",
  "data/interpolation/47_x100y88.jpg",
  "data/interpolation/48_x100y92.jpg",
  "data/interpolation/49_x100y96.jpg",
  "data/interpolation/50_x100y100.jpg",
  "data/interpolation/51_x96y100.jpg",
  "data/interpolation/52_x92y100.jpg",
  "data/interpolation/53_x88y100.jpg",
  "data/interpolation/54_x84y100.jpg",
  "data/interpolation/55_x80y100.jpg",
  "data/interpolation/56_x76y100.jpg",
  "data/interpolation/57_x72y100.jpg",
  "data/interpolation/58_x68y100.jpg",
  "data/interpolation/59_x64y100.jpg",
  "data/interpolation/60_x60y100.jpg",
  "data/interpolation/61_x56y100.jpg",
  "data/interpolation/62_x52y100.jpg",
  "data/interpolation/63_x48y100.jpg",
  "data/interpolation/64_x44y100.jpg",
  "data/interpolation/65_x40y100.jpg",
  "data/interpolation/66_x36y100.jpg",
  "data/interpolation/67_x32y100.jpg",
  "data/interpolation/68_x28y100.jpg",
  "data/interpolation/69_x24y100.jpg",
  "data/interpolation/70_x20y100.jpg",
  "data/interpolation/71_x16y100.jpg",
  "data/interpolation/72_x12y100.jpg",
  "data/interpolation/73_x8y100.jpg",
  "data/interpolation/74_x4y100.jpg",
  "data/interpolation/75_x0y100.jpg",
]

const image1 = document.getElementById("interp-img1")

const slider1 = document.getElementById("interp-range1")

// Function to change the image source based on the slider value
function changeImage(slider, image, images) {
  let index = parseInt(slider.value)
  image.src = images[index]
}

// Event listener for the slider input
// slider1.addEventListener("input", () =>
//   changeImage(slider1, image1, interp_images1)
// )

async function preloadImages(images) {
  let loadedImages = []
  let promises = []

  for (let i = 0; i < images.length; i++) {
    let img = new Image()
    loadedImages.push(img)

    let promise = new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    img.src = images[i]
    promises.push(promise)
  }

  await Promise.all(promises)
  return loadedImages
}

// Usage:
preloadImages(interp_images1)
  .then(() => {
    // All images are preloaded, you can now use the images.
    // Event listener for the slider input
    slider1.addEventListener("input", () =>
      changeImage(slider1, image1, interp_images1)
    )
  })
  .catch((error) => {
    // Handle errors if any image fails to load
    console.error("Image preloading failed:", error)
  })

//Subject-driven Image Editing
const orgImage = document.querySelector(".org-image img")
const editingImages = document.querySelectorAll(".edited-img img")
const reset = document.querySelector("#reset")
const updatedPaths = []
reset.addEventListener("click", () => {
  orgImage.src = "data/images-in-paper/demo-editing/original.png"
  editingImages.forEach((img) => {
    img.classList.remove("clicked-animal")
  })
})

editingImages.forEach((image) => {
  image.addEventListener("click", () => {
    const edImagePath = image.src
    const updatedPath = edImagePath.replace(".jpg", "-edited.png")
    orgImage.src = updatedPath

    // Remove "clicked-image" class from all images
    editingImages.forEach((img) => img.classList.remove("clicked-animal"))

    // Add "clicked-image" class to the clicked image
    image.classList.add("clicked-animal")
    updatedPaths.push(updatedPath) // Add updatedPath to the list
  })
})

preloadImages(updatedPaths)

// picture combination
// Get the images and the output image element
const fileDictionary = {
  "./data/images-in-paper/demo2/ref-subjects/sculpture.jpg,./data/images-in-paper/demo2/condition/fire.jpg":
    "data/images-in-paper/demo2/stylized-subjects/sculpture-fire.png",
  "./data/images-in-paper/demo2/ref-subjects/sculpture.jpg,./data/images-in-paper/demo2/condition/flower.jpg":
    "data/images-in-paper/demo2/stylized-subjects/scuplture-flower.png",
  "./data/images-in-paper/demo2/ref-subjects/sculpture.jpg,./data/images-in-paper/demo2/condition/vase.jpg":
    "data/images-in-paper/demo2/stylized-subjects/sculpture-glass.png",
  "./data/images-in-paper/demo2/ref-subjects/sculpture.jpg,./data/images-in-paper/demo2/condition/yarn.jpg":
    "data/images-in-paper/demo2/stylized-subjects/scuplture-yarn.png",
  "./data/images-in-paper/demo2/ref-subjects/pot.jpeg,./data/images-in-paper/demo2/condition/fire.jpg":
    "data/images-in-paper/demo2/stylized-subjects/pot-fire.png",
  "./data/images-in-paper/demo2/ref-subjects/pot.jpeg,./data/images-in-paper/demo2/condition/flower.jpg":
    "data/images-in-paper/demo2/stylized-subjects/pot-flower.png",
  "./data/images-in-paper/demo2/ref-subjects/pot.jpeg,./data/images-in-paper/demo2/condition/vase.jpg":
    "data/images-in-paper/demo2/stylized-subjects/pot-glass.png",
  "./data/images-in-paper/demo2/ref-subjects/pot.jpeg,./data/images-in-paper/demo2/condition/yarn.jpg":
    "data/images-in-paper/demo2/stylized-subjects/pot-yarn.png",
  "./data/images-in-paper/demo2/ref-subjects/blip-logo.jpg,./data/images-in-paper/demo2/condition/fire.jpg":
    "data/images-in-paper/demo2/stylized-subjects/blip-fire.png",
  "./data/images-in-paper/demo2/ref-subjects/blip-logo.jpg,./data/images-in-paper/demo2/condition/flower.jpg":
    "data/images-in-paper/demo2/stylized-subjects/blip-flower.png",
  "./data/images-in-paper/demo2/ref-subjects/blip-logo.jpg,./data/images-in-paper/demo2/condition/vase.jpg":
    "data/images-in-paper/demo2/stylized-subjects/blip-glass.png",
  "./data/images-in-paper/demo2/ref-subjects/blip-logo.jpg,./data/images-in-paper/demo2/condition/yarn.jpg":
    "data/images-in-paper/demo2/stylized-subjects/blip-yarn.png",
  "./data/images-in-paper/demo2/ref-subjects/hf-logo.jpg,./data/images-in-paper/demo2/condition/fire.jpg":
    "data/images-in-paper/demo2/stylized-subjects/hf-fire.png",
  "./data/images-in-paper/demo2/ref-subjects/hf-logo.jpg,./data/images-in-paper/demo2/condition/flower.jpg":
    "data/images-in-paper/demo2/stylized-subjects/hf-flower.png",
  "./data/images-in-paper/demo2/ref-subjects/hf-logo.jpg,./data/images-in-paper/demo2/condition/vase.jpg":
    "data/images-in-paper/demo2/stylized-subjects/hf-glass.png",
  "./data/images-in-paper/demo2/ref-subjects/hf-logo.jpg,./data/images-in-paper/demo2/condition/yarn.jpg":
    "data/images-in-paper/demo2/stylized-subjects/hf-yarn.png",
}

const stylizedFileList = Object.values(fileDictionary)
preloadImages(stylizedFileList)

const inputImages = document.querySelectorAll(".input-image img")

const imgContainerImages = document.querySelectorAll(".guiding-subjuects img")

const outputImage = document.getElementById("generate-img")

// add clicked class
inputImages.forEach((images) => {
  images.addEventListener("click", () => {
    // Remove "clicked-image" class from all images
    inputImages.forEach((img) => img.classList.remove("clicked-image"))

    // Add "clicked-image" class to the clicked image
    images.classList.add("clicked-image")
    generateNew()
  })
})
imgContainerImages.forEach((images) => {
  images.addEventListener("click", () => {
    // Remove "selected" class from all images
    imgContainerImages.forEach((img) => img.classList.remove("clicked-image"))

    // Add "selected" class to the clicked image
    images.classList.add("clicked-image")
    generateNew()
  })
})

function generateNew() {
  let clickedImage = document.querySelectorAll(".clicked-image")
  let imagePath = ""

  for (let i = 0; i < clickedImage.length; i++) {
    let src = clickedImage[i].getAttribute("src")
    if (i !== 0) {
      imagePath += ","
    }
    imagePath += src
  }
  outputImage.src = fileDictionary[imagePath]
}
