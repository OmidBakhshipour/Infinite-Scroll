// Unsplash API
const count = 10;
const apiKey = 'X9IFF_h5KQgwn6eFAlijLKRFammYhjzFe-YGTPmNLBU';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&ount=${count}`;

// Get photos from API
async function getPhotos() {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}

// On Load
getPhotos();