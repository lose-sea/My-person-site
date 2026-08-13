// 动漫背景轮播
// 将喜欢的动漫壁纸放入 assets/backgrounds/ 并在此列出路径，或直接替换下方 URL
const ANIME_BACKGROUNDS = [
  'assets/backgrounds/demon_tanjiro.png',
  'assets/backgrounds/frieren.jpeg',
  'assets/backgrounds/gojo_satoru.jpg',
  'assets/backgrounds/gojo.jpg',
  'assets/backgrounds/jujutsu_megumi.png',
];

const SLIDE_INTERVAL = 6000;

function initBackgroundSlideshow() {
  const container = document.getElementById('bgSlideshow');
  if (!container || ANIME_BACKGROUNDS.length === 0) return;

  ANIME_BACKGROUNDS.forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  ANIME_BACKGROUNDS.forEach((url, index) => {
    const slide = document.createElement('div');
    slide.className = `bg-slide${index === 0 ? ' active' : ''}`;
    slide.style.backgroundImage = `url("${url}")`;
    container.appendChild(slide);
  });

  const slides = container.querySelectorAll('.bg-slide');
  if (slides.length <= 1) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, SLIDE_INTERVAL);
}

initBackgroundSlideshow();

// 移动端导航菜单
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// 滚动时导航栏样式
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// 滚动时高亮当前导航项
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
