document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.half.left, .half.right').forEach(half => {
    const images = half.querySelectorAll('.background-images__wrapper img');
    let currentIndex = 0;

    images.forEach((img, i) => {
      img.style.display = i === 0 ? 'block' : 'none';
    });

    half.addEventListener('mouseenter', () => {
      images[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.display = 'block';
    });
  });
});