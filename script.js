const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// Unslash  API
let count = 5;
const apiKey= 'i4xIfO0irxSlNSQYPYtWBTPFCUdSra8_-l2n4EaQyVw';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check if all the image are loaded
function imageLoaded() {
    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count =30;
    }
}

// Helper Funnction to set Attributes
function setAttribute(element,attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements  For links

function displayPhotos(){
    imagesLoaded =0;
    totalImages = photoArray.length;
    photoArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank'
        })
        const img = document.createElement('img');
        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        // Event Listener when each loader is finished 
        img.addEventListener('load',imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);

    })
   
}

// Get Photos from unsplash 

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();

    }catch(err){
        console.log("opps something went wrong", err)
    }
}


// Load more  Photos

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false; 
       getPhotos() 
    }
})

//on load 
getPhotos() 
