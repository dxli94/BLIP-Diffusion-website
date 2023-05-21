"use strict"

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const originalImage = new Set(jsonData.originalImage)
    const easy_images = jsonData.easy_images
    const hard_images = jsonData.hard_images
    const test_easy = jsonData.test_easy
    const test_hard = jsonData.test_hard

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
        img.style.width = "320px"
        imageContainer.appendChild(img)
        img.classList.add("images")
      }
    }

    const imageContainer = document.querySelectorAll(".imageContainer")

    const hardButton = document.querySelector(".hardButton")

    const easyButton = document.querySelector(".easyButton")

    // Function to add the additional picture
    function addAdditionalPicture() {
      renderHard(imageContainer[0], hard_images)
      renderHard(imageContainer[1], test_hard)

      flipImg()

      // Disable the button after adding the picture
      hardButton.disabled = true
      easyButton.disabled = false
    }
    function getInitialPicture() {
      renderEasy(imageContainer[0], easy_images)
      renderEasy(imageContainer[1], test_easy)

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
            this.src = "./data/true.png"
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
