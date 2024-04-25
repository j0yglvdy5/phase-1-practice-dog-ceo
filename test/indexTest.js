// The code below ensures that students who are using CodeGrade will get credit
// for the code-along in Canvas; you can disregard it.

// require("./helpers.js");

// describe("", () => {
//   describe("", () => {
//     it("Test passing", () => {
//       return true;
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", function() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  let breedsData = {}; // Store all breeds data

  // Fetch and display dog images
  fetch(imgUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          const images = data.message; // assuming the images are in the 'message' property

          const container = document.getElementById("imageContainer");

          images.forEach(imageUrl => {
              const img = document.createElement("img");
              img.src = imageUrl;
              img.alt = "Random dog image";
              container.appendChild(img);
          });
      })
      .catch(error => {
          console.log("There was a problem fetching images:", error.message);
      });

  // Fetch and display dog breeds
  fetch(breedUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          breedsData = data.message; // Store all breeds data

          const breedsList = document.getElementById("breedList");

          for (const breed in breedsData) {
              const listItem = document.createElement("li");
              listItem.innerText = breed;

              breedsList.appendChild(listItem);
          }
      })
      .catch(error => {
          console.log("There was a problem fetching breeds:", error.message);
      });

  // Add event listener to the dropdown menu
  document.getElementById("breedFilter").addEventListener("change", function() {
      const selectedLetter = this.value;
      const breedsList = document.getElementById("breedList");

      // Clear current list
      breedsList.innerHTML = "";

      // Filter and display breeds based on the selected letter
      for (const breed in breedsData) {
          if (selectedLetter === "all" || breed.startsWith(selectedLetter)) {
              const listItem = document.createElement("li");
              listItem.innerText = breed;

              breedsList.appendChild(listItem);
          }
      }
  });
});
