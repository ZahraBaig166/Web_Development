const images = document.querySelectorAll('img');

function attachEventListenersToImage(image) {
    image.addEventListener('mouseover', () => {
        imageSrcSpan.textContent = image.src;
    });

    image.addEventListener('mouseleave', () => {
        imageSrcSpan.textContent = '';
    });
}

images.forEach(image => {
    attachEventListenersToImage(image);
});

const newImage = document.getElementById('newImage');
attachEventListenersToImage(newImage);
