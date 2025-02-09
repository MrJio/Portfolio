document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".my-navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const track = document.querySelector(".slide-track");
  const items = Array.from(document.querySelectorAll(".project-item"));

  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".connect-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const openModalBtns = document.querySelectorAll(".connect-btn");

  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;
  let pageHeight = document.documentElement.scrollHeight;
  let threshold = pageHeight * 0.1;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      header.classList.add("hide");
    } else if (currentScrollY < threshold) {
      header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });

  openModalBtns.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  function openModal(event) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    event.preventDefault();
  }

  function closeModal() {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }

  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  const cloneItems = (items) => {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.style.cssText = window.getComputedStyle(item).cssText;
      track.appendChild(clone);
    });
  };

  cloneItems(items);

  const startAnimation = () => {
    track.style.animationPlayState = "running";
  };

  track.style.animationPlayState = "paused";

  setTimeout(startAnimation, 2000);

  track.addEventListener("mouseover", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseout", () => {
    track.style.animationPlayState = "running";
  });

  let startX = 0;
  let scrollLeft = 0;
  let isDown = false;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  let startTouchX = 0;
  let endTouchX = 0;

  track.addEventListener("touchstart", (e) => {
    startTouchX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const move = startTouchX - touchX;
    track.scrollLeft += move;
    startTouchX = touchX;
  });

  track.addEventListener("touchend", () => {
    endTouchX = startTouchX;
  });
});