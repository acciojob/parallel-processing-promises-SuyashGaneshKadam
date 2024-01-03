// Image array
const images = [
  {url: "https://picsum.photos/id/237/200/300"},
  {url: "https://picsum.photos/id/238/200/300"},
  {url: "https://picsum.photos/id/239/200/300"},
];

// Get elements
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Download images on button click
btn.addEventListener("click", () => {
  downloadImages(); 
});

function downloadImages() {

  // Map images to promises
  const imagePromises = images.map(image => {
    return new Promise((resolve, reject) => {
    
      const img = new Image();
      
      img.onload = () => {
        resolve(img);  
      };
      
      img.onerror = () => {
        reject(`Failed to load ${image.url}`);
      };
      
      img.src = image.url;
      
    });
  });

  // Download in parallel 
  Promise.all(imagePromises)
    .then(imgs => {
      imgs.forEach(img => output.appendChild(img));
    })
    .catch(err => console.error(err));

}