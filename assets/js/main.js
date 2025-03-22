/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
    // Smooth scroll to the section
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
     reset: true,
});

var typingEffect = new Typed(".typedText",{
      strings : ["La Xuan Canh","a Designer","a Developer"],
      loop : true,
      typeSpeed : 100, 
      backSpeed : 80,
      backDelay : 2000
   })
  
  function showPopup() {
    const popupContainer = document.getElementById("message-popup");
    popupContainer.classList.add("active");
    const popupContent = popupContainer.querySelector(".popup-content");
    setTimeout(() => popupContent.classList.add("animate-popup"), 50); // Thêm hoạt ảnh trơn tru
}

function closePopup() {
    const popupContainer = document.getElementById("message-popup");
    const popupContent = popupContainer.querySelector(".popup-content");
    popupContent.classList.remove("animate-popup");
    setTimeout(() => popupContainer.classList.remove("active"), 300); // Chờ hoạt ảnh đóng trước khi ẩn popup
}


sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .projects__img, .contact__input',{interval: 200}); 

// ScrollReveal Animation cho chữ
const srText = ScrollReveal({
    origin: 'top', // Xuất hiện từ bên trái
    distance: '30px', // Khoảng cách di chuyển
    duration: 2000, // Thời gian chạy animation
    delay: 200, // Độ trễ xuất hiện
    reset: true // Animation chỉ chạy một lần
});

// Áp dụng cho phần chữ
srText.reveal('.section-title', { delay: 300 });
srText.reveal('.about__subtitle', { delay: 400 });
srText.reveal('.about__text', { delay: 500 });
srText.reveal('.skills__subtitle', { delay: 400 });
srText.reveal('.skills__text', { delay: 500 });
srText.reveal('.contact__form input, .contact__form textarea, .contact__button', { delay: 300, interval: 200 });

// Áp dụng cho các phần tử Projects
srText.reveal('.section-title', { delay: 300 });
srText.reveal('.projects__container', { delay: 400 });
srText.reveal('.project-box', { 
    delay: 500, 
    interval: 200, // Hiệu ứng cách đều giữa các box
    origin: 'bottom' // Xuất hiện từ phía dưới
});

document.addEventListener("DOMContentLoaded", function () {
    // Hàm xử lý animation cho thanh kỹ năng
    function animateSkills(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = document.querySelectorAll('.skills__bar');
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = percentage + '%'; // Set độ rộng theo % được chỉ định
                    bar.style.transition = 'width 1.5s ease-in-out'; // Animation khi thanh tiến độ chạy
                });

                // Ngắt quan sát sau khi animation hoàn thành
                observer.unobserve(entry.target);
            }
        });
    }

    // Tạo observer để quan sát phần kỹ năng
    const observer = new IntersectionObserver(animateSkills, {
        root: null, // Quan sát viewport
        threshold: 0.2 // Kích hoạt khi 20% của phần kỹ năng xuất hiện trên màn hình
    });

    // Gắn observer vào phần kỹ năng
    const skillsSection = document.querySelector('#skills');
    observer.observe(skillsSection);
});
