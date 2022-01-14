const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'X9IFF_h5KQgwn6eFAlijLKRFammYhjzFe-YGTPmNLBU';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;

    }
}
// Helper function to set attributes on html elements
function setAttributes(element, attributes) {
    const attributeObjectKeys = Object.keys(attributes);
    const attributeObjectValues = Object.values(attributes);

    for(let [index, key] of attributeObjectKeys.entries()) {
        element.setAttribute(key, attributeObjectValues[index])
    };
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        // Create <a> tag to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Check when each image is finished loading
        img.addEventListener('load', imageLoaded);
        // Put image inside a, then put them inside the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from API
async function getPhotos() {
    try {
        const response = await axios.get(apiUrl);
        photosArray = response.data;
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Check to see if scrolling near the bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();