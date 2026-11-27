document.addEventListener("DOMContentLoaded", () => {

  // Preloader
  function progressBar() {
    $(".progress").each(function () {
      var ctrl = new ScrollMagic.Controller();
      new ScrollMagic.Scene({ triggerElement: ".progress", triggerHook: "onEnter", duration: 300, })
      .addTo(ctrl)
      .on("enter", function () {
        var progressBar = $(".progress-bar");
        progressBar.each(function () {
          $(this).css({ width: $(this).attr("aria-valuenow") + "%", "z-index": "2", });
        });
      });
    });
  }

  // Preloader animation
  function preloader() {
    var tl = anime.timeline({});
    tl.add({ targets: ".loader", duration: 300, opacity: 1, easing: "easeInOutQuart", })
    .add({ targets: ".preloader__progress span", duration: 500, width: "100%", easing: "easeInOutQuart", }, "-=200")
    .add({ targets: ".preloader", duration: 500, opacity: 0, zIndex: -1, easing: "easeInOutQuart",
      complete: function () {
        document.getElementById("loader").classList.add("hide");
        document.getElementById("home").style.display = "block";
        if (typeof initAnimations === "function") {
          initAnimations();
        }
      },
    });
  }

  preloader();

  anime({ targets: "body", opacity: 1, delay: 400,
    complete: function () {
      progressBar();
    },
  });

  function initAnimations() {
    // 1. Counter animation (Count Up)
    function countUp(element, duration = 2000) {
      const target = parseInt(element.textContent);
      if (isNaN(target)) return;
      let start = 0;
      const increment = target / (duration / 16);
      element.textContent = "0";
      const updateCounter = () => {
        start += increment;
        if (start < target) {
          element.textContent = Math.ceil(start);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };
      updateCounter();
    }

    function initCountUp(containerSelector, numberSelector = ".counter") {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              document.querySelectorAll(numberSelector).forEach((el) => {
                countUp(el, 2500);
              });
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });

      const container = document.querySelector(containerSelector);
      if (container) observer.observe(container);
    }
    initCountUp(".profile__info");

    // 2. Skills animation
    const initSkills = () => {
      const skillsSection = document.getElementById("skills");
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const progressBars = entry.target.querySelectorAll(".progress-bar");
              progressBars.forEach((progressBar) => {
                progressBar.style.animation = "progressAnimation 3s ease-in-out forwards";
              });
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });
      skillsSection && observer.observe(skillsSection);
    };
    initSkills();

    // 3. ScrollReveal animations
    const isMobile = window.innerWidth <= 768;
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 200,
      opacity: 0,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: true,
    });
    sr.reveal(`.profile__border, .profile__name`);
    sr.reveal(`.profile__social, .profile_profession, .profile__info-group, .profile__buttons`, { origin: 'bottom' });
    sr.reveal(`.projects__card, .skills__area, .resume__area`, { origin: 'bottom', reset: !isMobile, interval: isMobile ? 0 : 100 });
    sr.reveal(`.note`, { origin: 'left' });
    sr.reveal(`.resume__step__time`, { origin: 'right', reset: !isMobile });
    sr.reveal(`.about__box .icon img`, { origin: 'bottom', scale: 0.9, rotate: { z: 45 }, reset: !isMobile });
  }

  // Bottom Navigation Menu
  const bottomMenu = document.querySelector(".nav__menu");
  const menuHideBtn = document.querySelector(".menu-hide-btn");
  const menuShowBtn = document.querySelector(".menu-show-btn");
  let menuTimeout;
  let isHoveringMenu = false;
  checkScrollPosition();
  window.addEventListener("scroll", handleScroll);
  menuHideBtn?.addEventListener("click", hideMenuManual);
  menuShowBtn?.addEventListener("click", showMenuManual);

  bottomMenu?.addEventListener("mouseenter", () => {
    isHoveringMenu = true;
    clearTimeout(menuTimeout);
    if (window.scrollY > 10) {
      menuHideBtn.classList.add("show");
    }
  });

  bottomMenu?.addEventListener("mouseleave", () => {
    isHoveringMenu = false;
    if (window.scrollY > 10 && !menuHideBtn.matches(":hover")) {
      menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
  });

  menuHideBtn?.addEventListener("mouseenter", () => {
    isHoveringMenu = true;
    clearTimeout(menuTimeout);
  });

  menuHideBtn?.addEventListener("mouseleave", () => {
    isHoveringMenu = false;
    if (window.scrollY > 10) {
      menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
  });

  function checkScrollPosition() {
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (window.scrollY < 10) {
      menuHideBtn.classList.remove("show");
    } else {
      menuHideBtn.classList.add("show");
    }
  }

  function handleScroll() {
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    showMenu();
    if (!isHoveringMenu) {
      clearTimeout(menuTimeout);
      menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
  }

  function showMenu() {
    bottomMenu.classList.remove("hide");
    if (window.scrollY > 10) {
      menuHideBtn.classList.add("show");
    }
    menuShowBtn.classList.remove("active");
    checkScrollPosition();
  }

  function hideMenuAuto() {
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (window.scrollY > 10 && !isHoveringMenu) {
      bottomMenu.classList.add("hide");
      menuHideBtn.classList.remove("show");
      menuShowBtn.classList.add("active");
    }
  }

  function hideMenuManual() {
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    bottomMenu.classList.add("hide");
    menuHideBtn.classList.remove("show");
    menuShowBtn.classList.add("active");
    isHoveringMenu = false;
  }

  function showMenuManual() {
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    if (!bottomMenu || !menuHideBtn || !menuShowBtn) return;
    bottomMenu.classList.remove("hide");
    menuShowBtn.classList.remove("active");
    if (window.scrollY > 10) {
      menuHideBtn.classList.add("show");
    }
    if (!isHoveringMenu) {
      clearTimeout(menuTimeout);
      menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
  }

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
      link?.classList.toggle( "active-link", scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
    });
  });

  // Toggle dark/light mode
  const body = document.querySelector("body");
  const modeToggle = document.querySelector(".dark-light");
  const themeToggle = document.getElementById("themeToggle");
  const savedMode = localStorage.getItem("mode");
  const switchOnSound = new Audio("./assets/sounds/switch-on.mp3");
  const switchOffSound = new Audio("./assets/sounds/switch-off.mp3");
  switchOnSound.volume = 1.0;
  switchOffSound.volume = 1.0;

  const toggleMode = (isDark, skipSound = false) => {
    const wasDark = body.classList.contains("dark");
    body.classList.toggle("dark", isDark);
    modeToggle.classList.toggle("active", isDark);
    themeToggle.checked = isDark;
    localStorage.setItem("mode", isDark ? "dark-mode" : "light-mode");
    if (!skipSound && wasDark !== isDark) {
      const sound = isDark ? switchOffSound : switchOnSound;
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  if (savedMode === "dark-mode") {
    toggleMode(true, true);
  } else {
    themeToggle.checked = false;
  }

  modeToggle.addEventListener("click", () => {
    toggleMode(!body.classList.contains("dark"));
  });

  themeToggle.addEventListener("change", function () {
    toggleMode(this.checked);
  });

  // Show header when scrolling up
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Year display
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Custom cursor
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    const style = window.getComputedStyle(element);
    if (style.cursor === "pointer") {
      element.style.cursor = 'url("./assets/img/mouse/mouse-f2.png"), auto';
    }
  });

  // Typed.js for typing animation in header
  new Typed(".typing-text", {
    strings: ['Developer', 'Designer', 'Coder', 'Creator'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
  });

  // Random Color for .projects__tag
  const colorClasses = [
    'projects__tag--blue', 'projects__tag--green', 'projects__tag--yellow',
    'projects__tag--purple', 'projects__tag--gray', 'projects__tag--red'
  ];
  document.querySelectorAll(".projects__tags").forEach((container) => {
    const tags = container.querySelectorAll(".projects__tag");
    let remainingColors = [...colorClasses];
    tags.forEach((tag) => {
      if (remainingColors.length === 0) remainingColors = [...colorClasses];
      const randomIndex = Math.floor(Math.random() * remainingColors.length);
      const selectedColor = remainingColors[randomIndex];
      tag.classList.add(selectedColor);
      remainingColors.splice(randomIndex, 1);
    });
  });

  // Language switching functionality
  const languageBtn = document.getElementById("languageBtn");
  const elementsToTranslate = document.querySelectorAll("[data-vi]");
  let currentLanguage = "vi";
  const languageSound = new Audio("./assets/sounds/language.mp3");
  languageSound.volume = 1.0;

  elementsToTranslate.forEach((element) => {
    if (!element.dataset.original) {
      if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.hasAttribute("placeholder")) {
        element.dataset.original = element.placeholder;
      } else {
        element.dataset.original = element.innerHTML;
      }
    }
  });

  function applyLanguage(lang, skipSound = false) {
    document.body.classList.remove("language-en", "language-vi");
    document.body.classList.add(`language-${lang}`);
    elementsToTranslate.forEach((element) => {
      if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.hasAttribute("placeholder")) {
        if (lang === "vi") {
          element.placeholder = element.getAttribute("data-vi");
        } else {
          element.placeholder = element.dataset.original;
        }
        return;
      }

      if (lang === "vi") {
        const viText = element.getAttribute("data-vi");
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = element.dataset.original;
        const icon = tempDiv.querySelector("i");
        const link = tempDiv.querySelector("a");
        let iconHTML = icon?.outerHTML || "";
        let finalHTML = viText.trim();
        if (link) {
          const linkText = link.textContent.trim();
          const newLink = link.cloneNode(true);
          newLink.innerHTML = linkText;
          finalHTML = viText.replace(linkText, newLink.outerHTML);
        }
        if (icon) {
          const textOnly = tempDiv.textContent.replace(icon.textContent, "").trim();
          const originalHTML = tempDiv.innerHTML.trim();
          const iconIndex = originalHTML.indexOf(icon.outerHTML);
          const textIndex = originalHTML.indexOf(textOnly);
          if (iconIndex < textIndex) {
            finalHTML = `${iconHTML} ${finalHTML}`;
          } else {
            finalHTML = `${finalHTML} ${iconHTML}`;
          }
        }
        element.innerHTML = finalHTML.trim();
      } else {
        element.innerHTML = element.dataset.original;
      }
    });

    if (languageBtn) languageBtn.classList.toggle("vi", lang === "vi");
    localStorage.setItem("language", lang);
    currentLanguage = lang;
    if (!skipSound) {
      languageSound.currentTime = 0;
      languageSound.play().catch(() => {});
    }
  }

  languageBtn?.addEventListener("click", () => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    applyLanguage(newLanguage);
  });

  applyLanguage(currentLanguage, true);

  // Functionality for shared popup (for both carousel and certificates)
  const popupOverlay = document.querySelector(".popup__overlay");
  const popupImage = document.querySelector(".popup__image");
  const popupTitle = document.querySelector(".popup__info .popup__title");
  const popupTime = document.querySelector(".popup__info .popup__time");
  const popupIssuer = document.querySelector(".popup__info .popup__issuer");
  const popupDate = document.querySelector(".popup__info .popup__date");
  const popupCaption = document.querySelector(".popup__info .popup__caption");
  const popupClose = document.querySelector(".popup__close");
  const popupPrev = document.querySelector(".popup__prev");
  const popupNext = document.querySelector(".popup__next");
  const popupNavigation = document.querySelector(".popup__navigation");

  // Variables to track current certificate
  let currentCertificateIndex = 0;
  let certificateItems = [];
  let isPhotoMode = false;

  // Handle carousel items (photos)
  const carouselItems = document.querySelectorAll(".carousel__item");
  carouselItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgElement = this.querySelector("img");
      const titleElement = this.querySelector(".popup__title");
      const timeElement = this.querySelector(".popup__time");
      const captionElement = this.querySelector(".popup__caption");

      // Setup popup for photos
      popupImage.src = imgElement.src;
      popupImage.alt = imgElement.alt;
      popupTitle.textContent = titleElement.textContent;

      // Show photo specific elements, hide certificate elements
      popupTime.textContent = timeElement.textContent;
      popupTime.style.display = "inline-block";
      popupCaption.textContent = captionElement.textContent;
      popupCaption.style.display = "block";
      popupIssuer.style.display = "none";
      popupDate.style.display = "none";

      // Hide navigation for photos
      popupNavigation.classList.add("photo-mode");
      isPhotoMode = true;

      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Handle certificate items
  certificateItems = document.querySelectorAll(".certificate__item");
  certificateItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const imgElement = this.querySelector("img");
      const titleElement = this.querySelector(".certificate__title");
      const issuerElement = this.querySelector(".certificate__issuer");
      const dateElement = this.querySelector(".certificate__date");

      // Save current certificate index
      currentCertificateIndex = index;

      // Setup popup for certificates
      updateCertificatePopup( imgElement, titleElement, issuerElement, dateElement );

      // Show navigation for certificates
      popupNavigation.classList.remove("photo-mode");
      isPhotoMode = false;

      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Function to update certificate popup content
  function updateCertificatePopup( imgElement, titleElement, issuerElement, dateElement ) {
    popupImage.src = imgElement.src;
    popupImage.alt = imgElement.alt;
    popupTitle.textContent = titleElement.textContent;

    // Show certificate specific elements, hide photo elements
    popupIssuer.textContent = issuerElement.textContent;
    popupDate.textContent = dateElement.textContent;
    popupIssuer.style.display = "inline-block";
    popupDate.style.display = "inline-block";
    popupTime.style.display = "none";
    popupCaption.style.display = "none";
  }

  // Navigate to previous certificate
  popupPrev.addEventListener("click", function () {
    if (isPhotoMode) return;

    currentCertificateIndex = (currentCertificateIndex - 1 + certificateItems.length) % certificateItems.length;
    const item = certificateItems[currentCertificateIndex];

    const imgElement = item.querySelector("img");
    const titleElement = item.querySelector(".certificate__title");
    const issuerElement = item.querySelector(".certificate__issuer");
    const dateElement = item.querySelector(".certificate__date");

    updateCertificatePopup( imgElement, titleElement, issuerElement, dateElement );
  });

  // Navigate to next certificate
  popupNext.addEventListener("click", function () {
    if (isPhotoMode) return;

    currentCertificateIndex = (currentCertificateIndex + 1) % certificateItems.length;
    const item = certificateItems[currentCertificateIndex];

    const imgElement = item.querySelector("img");
    const titleElement = item.querySelector(".certificate__title");
    const issuerElement = item.querySelector(".certificate__issuer");
    const dateElement = item.querySelector(".certificate__date");

    updateCertificatePopup( imgElement, titleElement, issuerElement, dateElement );
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (popupOverlay.classList.contains("active") && !isPhotoMode) {
      if (e.key === "ArrowLeft") {
        popupPrev.click();
      } else if (e.key === "ArrowRight") {
        popupNext.click();
      }
    }

    // Close popup with Escape key
    if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close popup
  popupClose.addEventListener("click", function () {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  popupOverlay.addEventListener("click", function (e) {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Initialize EmailJS with contact form
  document.getElementById("contact-form").addEventListener("submit", function (event) {
      event.preventDefault();

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        Swal.fire({
          icon: "warning",
          title: "Vui lòng xác minh!",
          text: "Bạn cần xác minh reCAPTCHA trước khi gửi.",
          confirmButtonText: "OK",
        });
        return;
      }

      const now = new Date();
      const timeString = now.toLocaleString("vi-VN").replace(",", "");
      document.getElementById("time").value = timeString;
      document.getElementById("page-url").value = window.location.hostname;

      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG GỬI...';

      emailjs.sendForm("service_swfnmkm", "template_n0r8ice", this).then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Tin nhắn đã được gửi thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById("contact-form").reset();
          grecaptcha.reset(); // reset reCAPTCHA sau khi gửi
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Không gửi được tin nhắn. Vui lòng thử lại.",
            confirmButtonText: "OK",
          });
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        });
    });

});
