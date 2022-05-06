
const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let readyToLoad = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//* Unsplash API

let initialPhotoLoad = 5;
const apiKey = 'FFOljqBhA-oMlk7-f4Wlrwvklk4XF7YX9loGY8Pt_nc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialPhotoLoad}`;

//* check if all images were loaded
function loadNewImage() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        readyToLoad = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
}

function updateApiPhotoLoader() {
    if (initialPhotoLoad === 5) {
        const subsequentPhotoLoad = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${subsequentPhotoLoad}`;
    } else return
}

async function getPhotosFromApi() {
    try {

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        updateApiPhotoLoader();

    } catch (error) {
        console.log(error)
    }
};

function setAttributesOnImg(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    try {
        totalImages = photosArray.length;
        photosArray.forEach((photo) => {

            //* Create <a> to link to Unsplash

            const item = document.createElement('a');
            // item.setAttribute('href', photo.links.html);
            // item.setAttribute('target', '_blank');
            setAttributesOnImg(item, {
                href: photo.links.html,
                target: '_blank',
            });

            // * Create image for photo
            const img = document.createElement('img');
            img.setAttribute('src', photo.urls.regular);
            // img.setAttribute('alt', photo.alt_description)
            // img.setAttribute('title', photo.description);
            setAttributesOnImg(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description
            });

            // * Put <img> inside <a>, then put both inside img-container element.
            item.appendChild(img);
            imageContainer.appendChild(item);
            // * Event listener, check to see if images have loaded
            img.addEventListener('load', loadNewImage);

        });
    } catch (error) {
        console.log(error)
    }
}




//* Check to see if scrolling near bottom of page
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        readyToLoad = false;
        getPhotosFromApi();
    }
});

// * On load
getPhotosFromApi();