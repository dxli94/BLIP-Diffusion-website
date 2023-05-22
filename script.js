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

    function renderHard(imageContainer, data) {
      imageContainer.innerHTML = ""
      for (let i = 0; i < data.length; i++) {
        const img = document.createElement("img")
        img.src = data[i]
        img.style.width = "120px"
        imageContainer.appendChild(img)
        img.classList.add("images")
      }
    }
    function renderEasy(imageContainer, data) {
      imageContainer.innerHTML = ""
      for (let i = 0; i < data.length; i++) {
        const img = document.createElement("img")
        img.src = data[i]
        img.style.width = "245px"
        imageContainer.appendChild(img)
        img.classList.add("images")
      }
    }

    const imageContainer = document.querySelectorAll(".imageContainer")

    const hardButton = document.querySelector(".hardButton")

    const easyButton = document.querySelector(".easyButton")

    // Function to add the additional picture
    function addAdditionalPicture() {
      renderHard(imageContainer[0], d1_images_h1)
      renderHard(imageContainer[1], d1_images_h2)
      renderHard(imageContainer[2], d1_images_h3)
      renderHard(imageContainer[3], d1_images_h4)
      renderHard(imageContainer[4], d1_images_h5)

      flipImg()

      // Disable the button after adding the picture
      hardButton.disabled = true
      easyButton.disabled = false
    }
    function getInitialPicture() {
      renderEasy(imageContainer[0], d1_images_e1)
      renderEasy(imageContainer[1], d1_images_e2)
      renderEasy(imageContainer[2], d1_images_e3)
      // clear the last image
      imageContainer[3].innerHTML = ""
      imageContainer[4].innerHTML = ""

      flipImg()

      hardButton.disabled = false
      easyButton.disabled = true
    }

    // Add event listener to the button
    hardButton.addEventListener("click", addAdditionalPicture)
    easyButton.addEventListener("click", getInitialPicture)

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
            this.src = "./data/true_mark.jpeg"
          } else {
            this.src = "./data/false.png"
          }

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
    addAdditionalPicture()
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error)
  })
