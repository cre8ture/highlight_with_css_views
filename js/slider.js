document.addEventListener("DOMContentLoaded", function() {

const slider = document.querySelector('.slider-container');

console.log("slider", slider);

const thumb = slider.querySelector('#slider-thumb');
const track = slider.querySelector('.slider-track"');

let currentPosition = 0;

thumb.addEventListener('mousedown', (event) => {
  const initialX = event.clientX;
  const trackWidth = track.offsetWidth;

  const onMouseMove = (moveEvent) => {
    const deltaX = moveEvent.clientX - initialX;
    currentPosition = Math.min(Math.max(0, deltaX / trackWidth * 100), 100); // Clamp between 0-100
    updateSliderPosition(currentPosition);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function updateSliderPosition(position) {
  thumb.style.transform = `translateX(${position}%)`;
  track.querySelector('.bg-primary').style.width = `${position}%`;
  thumb.setAttribute('aria-valuenow', position);
}

})