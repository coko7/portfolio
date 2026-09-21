let counterDisplayed = false;
let clickedMeCounter = 0;

let overCraftSpan;
let profileImg;
let introArticle;

document.addEventListener("DOMContentLoaded", function () {
  console.log("hello there");

  const writtenYear = document.getElementById("the-year-written").textContent;
  const actualYear = new Date().getFullYear();

  if (writtenYear != actualYear) {
    const iForgorDialog = document.querySelector("dialog#i-forgor");
    const dialogYearSpan = iForgorDialog.querySelector("span");
    const closeBtn = iForgorDialog.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => iForgorDialog.close());

    dialogYearSpan.textContent = actualYear;
    iForgorDialog.showModal();
  }

  overCraftSpan = document.querySelector(".hovercraft>span");
  profileImg = document.getElementById("profile-img");
  introArticle = document.querySelector("article.intro");

  const articlesH3 = document.querySelectorAll(".title");
  const copyrightSpan = document.getElementById("copyright-span");

  profileImg.addEventListener("click", () => {
    if (!counterDisplayed) {
      counterDisplayed = true;
      overCraftSpan.classList.toggle("hidden");
      setInterval(() => {
        incrementClicks(1);
      }, 1000);
    }
    incrementClicks(1);
  });

  articlesH3.forEach((h3) => {
    h3.addEventListener("click", () => {
      incrementClicks(5);
    });
  });

  copyrightSpan.addEventListener("click", () => {
    incrementClicks(15);
  });

  loadLatestVideos();

  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 1725);
  });

  backToTopBtn.addEventListener('click', () => {
    history.pushState(null, '', window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('article[id] h3.title').forEach(h3 => {
    h3.addEventListener('click', () => {
      const article = h3.closest('article[id]');
      history.pushState(null, '', `#${article.id}`);
      h3.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

async function loadLatestVideos() {
  try {
    const response = await fetch('data/last-3-tt-videos.json');
    if (!response.ok) {
      renderTTLoadErrorMessage('... Video file is somehow not fetchable ୧((#Φ益Φ#))୨ !!!!')
      throw new Error(`HTTP error: ${response.status}`);
    }

    const videos = await response.json();
    if (!videos || videos.length !== 3) {
      renderTTLoadErrorMessage('... Could not load latest YouTube videos (╯`Д´)╯︵ ┻━┻')
      return;
    }

    renderVideos(videos);
  } catch (error) {
    console.error('Failed to load videos:', error);
  }
}

function renderTTLoadErrorMessage(message) {
  const p = document.getElementById('load-tt-videos-error');
  p.innerHTML = message;
}

function renderVideos(videos) {
  const container = document.getElementById('latest-videos');
  container.innerHTML = videos.map(video => `
    <a class="video-card" href="${video.link}" target="_blank" rel="noopener" >
      <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
      <p>${video.title}</p>
    </a>
  `).join('');
}

function incrementClicks(amount) {
  if (!counterDisplayed) return;

  clickedMeCounter += amount;

  if (clickedMeCounter > 9000) {
    overCraftSpan.textContent = `> It's Over 9000! <`;
  } else {
    overCraftSpan.textContent = `> ${clickedMeCounter} <`;
  }

  // let marginTop = parseInt(window.getComputedStyle(introArticle).marginTop, 10);
  // marginTop += amount;
  // introArticle.style.marginTop = marginTop + 'px';
}

function showDialog(text) {
  const dialog = document.querySelector("dialog");
  dialog.textContent = text;
  dialog.showModal();
}
