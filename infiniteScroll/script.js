const imgContainer = document.getElementById("image-container");
const count = 10;
const apiKey = "H65eqk1iKfd3NZLV5t-ThJgnTXRa-6qSpeG3K3SE3DA";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
function helper(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    helper(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const image = document.createElement("img");
    helper(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    image.addEventListener("load", function () {
      imagesLoaded++;
      totalImages = photosArray.length;
      if (imagesLoaded === totalImages) {
        ready = true;
      }
    });
    //put elements in img container
    item.appendChild(image);
    imgContainer.appendChild(item);
  });
}

async function fetchPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //error
  }
}

window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    fetchPhotos();
    ready = false;
  }
});
//load photos
fetchPhotos();
