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
});

// Feel free to steal and re-use the key *if you can* ( ͡° ͜ʖ ͡°)
const API_KEY = 'AIzaSyBYxaee673AnhG4FdKAspVKh5TVPUs7gpc';
// https://www.youtube.com/@TerminalCollectiveOrg
const CHANNEL_ID = 'UCuxDrxscs0N-EmpXspDdhRg';

async function loadLatestVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3&type=video`;

  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById('latest-videos');
  if (!data.items) {
    console.error("failed to load latest videos from Terminal Collective");
    container.innerHTML = "<b style=\"color: #F44336\">... Could not load latest YouTube videos (╯`Д´)╯︵ ┻━┻</b>"
    return;
  }

  container.innerHTML = data.items.map(item => {
    const videoId = item.id.videoId;
    const thumb = item.snippet.thumbnails.medium.url;
    const title = item.snippet.title;

    return `
      <a class="video-card" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
        <img src="${thumb}" alt="${title}" loading="lazy">
        <p>${title}</p>
      </a>
    `;
  }).join('');
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
