let clickedMeCounter = 0;

document.addEventListener('DOMContentLoaded', function() {
  console.log("hello there")

  const profileImg = document.getElementById('profile-picture');
  const overCraftSpan = document.querySelector('.hovercraft>span');

  profileImg.addEventListener('click', function() {
    clickedMeCounter++;
    if (clickedMeCounter === 1) {
      overCraftSpan.classList.toggle('hidden');
    }
    overCraftSpan.textContent = `> ${clickedMeCounter} <`;
  })
});
