const SITE_COLORS = ["#08AA6E", "#57F7BC", "#ffa500"];
const GRASS_COLORS = ["#3a7d2c", "#6abf4b", "#a8e063", "#d4f5a3"];

function burstConfetti(el, colors) {
  if (typeof confetti !== "function") return;
  const rect = el.getBoundingClientRect();
  confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 30,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    colors,
    disableForReducedMotion: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("hello there");

  const thinFeetToggle = document.getElementById("thin-feet-toggle");

  const setThinFeet = (on) => {
    document.body.classList.toggle("thin-feet-mode", on);
    thinFeetToggle.textContent = on ? "Grass Toucher" : "Terminal Nerd";
  };

  let thinFeet = false;
  try {
    thinFeet = localStorage.getItem("thinFeet") === "true";
  } catch { }
  setThinFeet(thinFeet);
  thinFeetToggle.hidden = false;

  thinFeetToggle.addEventListener("click", () => {
    thinFeet = !thinFeet;
    setThinFeet(thinFeet);

    burstConfetti(thinFeetToggle, thinFeet ? GRASS_COLORS : SITE_COLORS);
    try {
      localStorage.setItem("thinFeet", String(thinFeet));
    } catch { }
  });

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

  loadLatestVideos();

  const wbwSvgObject = document.getElementById('wbw-svg');
  if (wbwSvgObject) {
    const legendSpans = document.querySelectorAll('.wbw-legend');

    const setLegendHover = (color) => {
      const svgRoot = wbwSvgObject.contentDocument?.documentElement;
      if (!svgRoot) return;
      if (color) {
        svgRoot.setAttribute('data-legend-hover', color);
      } else {
        svgRoot.removeAttribute('data-legend-hover');
      }
    };

    legendSpans.forEach((span) => {
      const color = span.dataset.nodeColor;
      span.addEventListener('mouseenter', () => setLegendHover(color));
      span.addEventListener('mouseleave', () => setLegendHover(null));
    });
  }

  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 1725);
  });

  backToTopBtn.addEventListener('click', () => {
    burstConfetti(backToTopBtn, SITE_COLORS);
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

function showDialog(text) {
  const dialog = document.querySelector("dialog");
  dialog.textContent = text;
  dialog.showModal();
}
