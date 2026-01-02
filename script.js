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

  const overCraftSpan = document.querySelector(".hovercraft>span");
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
});

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
