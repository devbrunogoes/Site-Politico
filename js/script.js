// Conteúdo simulado. Em produção, substitua estes arrays por dados de API/CMS.
const projects = [
  { category: "Saúde", title: "Saúde Perto de Casa", description: "Fortalecimento das unidades básicas, mutirões preventivos e atendimento nos bairros mais afastados de Santa Aurora.", date: "12 abr 2026" },
  { category: "Educação", title: "Escola Aberta no Contraturno", description: "Oficinas, reforço escolar, esporte e cultura para ampliar oportunidades aos estudantes da rede municipal.", date: "28 mar 2026" },
  { category: "Infraestrutura", title: "Cidade Iluminada", description: "Modernização da iluminação pública em ruas, praças, pontos de ônibus e áreas de grande circulação.", date: "14 mar 2026" },
  { category: "Educação", title: "Tecnologia nas Escolas", description: "Laboratórios, conectividade e formação digital para estudantes, professores e equipes pedagógicas.", date: "22 fev 2026" },
  { category: "Infraestrutura", title: "Mobilidade Segura", description: "Sinalização, acessibilidade, travessias escolares e rotas mais seguras para pedestres e motoristas.", date: "06 fev 2026" },
  { category: "Saúde", title: "Cuidado com a Mulher", description: "Campanhas de prevenção, acolhimento humanizado e ampliação de exames essenciais na rede pública.", date: "18 jan 2026" }
];

const news = [
  { image: "./images/noticia-01.svg", title: "Rafael Monteiro reúne lideranças comunitárias", summary: "Encontro discutiu demandas dos bairros e próximos encaminhamentos do mandato.", date: "18 abr 2026" },
  { image: "./images/noticia-02.svg", title: "Projeto de transparência é protocolado na Câmara", summary: "Proposta busca ampliar participação popular e facilitar o acompanhamento das ações públicas.", date: "09 abr 2026" },
  { image: "./images/noticia-03.svg", title: "Visitas técnicas acompanham equipamentos públicos", summary: "Equipe avaliou escolas, unidades de saúde e pontos indicados pela população.", date: "27 mar 2026" },
  { image: "./images/noticia-04.svg", title: "Audiência pública debate mobilidade urbana", summary: "Moradores apresentaram sugestões para melhorar trânsito, calçadas e transporte local.", date: "12 mar 2026" },
  { image: "./images/noticia-05.svg", title: "Comissão acompanha ações de educação", summary: "Agenda avaliou estrutura escolar, alimentação, tecnologia e projetos pedagógicos.", date: "25 fev 2026" },
  { image: "./images/noticia-06.svg", title: "Gabinete itinerante chega a novos bairros", summary: "Atendimento aproximou o mandato das demandas locais e registrou novas solicitações.", date: "08 fev 2026" }
];

const galleryImages = Array.from({ length: 12 }, (_, index) => `./images/evento-${String(index + 1).padStart(2, "0")}.svg`);

async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");
  await Promise.all(Array.from(slots).map(async (slot) => {
    const name = slot.dataset.component;
    const response = await fetch(`./components/${name}.html`);
    slot.innerHTML = await response.text();
  }));
}

function getCurrentPage() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

function setupHeader() {
  const header = document.querySelector("#site-header");
  const menuToggle = document.querySelector("#menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  if (!header || !menuToggle || !mobileMenu) return;

  document.querySelectorAll(`[data-page="${getCurrentPage()}"]`).forEach((link) => link.classList.add("is-active"));

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    menuToggle.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-is-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuToggle.classList.toggle("menu-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    document.body.classList.toggle("menu-is-open", !isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("header-scrolled", window.scrollY > 8);
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function createProjectCard(project) {
  return `
    <article class="project-card reveal p-6">
      <span class="badge">${project.category}</span>
      <time class="mt-4 block text-sm font-bold text-brand-600">${project.date}</time>
      <h3 class="mt-3 text-xl font-extrabold text-slate-950">${project.title}</h3>
      <p class="mt-3 leading-7 text-slate-600">${project.description}</p>
      <a href="./projetos.html" class="card-button mt-5 inline-flex">Ver mais</a>
    </article>
  `;
}

function createNewsCard(item) {
  return `
    <article class="news-card reveal bg-white">
      <img src="${item.image}" alt="Imagem da notícia ${item.title}" class="aspect-video w-full object-cover" />
      <div class="flex flex-1 flex-col p-6">
        <time class="text-sm font-bold text-brand-600">${item.date}</time>
        <h3 class="mt-3 text-xl font-extrabold text-slate-950">${item.title}</h3>
        <p class="mt-3 leading-7 text-slate-600">${item.summary}</p>
        <a href="./noticia-detalhe.html" class="card-button mt-5 inline-flex">Ler mais</a>
      </div>
    </article>
  `;
}

function renderDynamicContent() {
  const homeProjects = document.querySelector("#home-projects");
  const projectsGrid = document.querySelector("#projects-grid");
  const homeNews = document.querySelector("#home-news");
  const newsGrid = document.querySelector("#news-grid");
  const relatedNews = document.querySelector("#related-news");

  if (homeProjects) homeProjects.innerHTML = projects.slice(0, 3).map(createProjectCard).join("");
  if (projectsGrid) projectsGrid.innerHTML = projects.map(createProjectCard).join("");
  if (homeNews) homeNews.innerHTML = news.slice(0, 3).map(createNewsCard).join("");
  if (newsGrid) newsGrid.innerHTML = news.map(createNewsCard).join("");
  if (relatedNews) relatedNews.innerHTML = news.slice(1, 4).map(createNewsCard).join("");
}

function renderGallery() {
  const galleryGrid = document.querySelector("#gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryImages.map((src, index) => `
    <button class="gallery-item reveal" type="button" data-gallery-src="${src}">
      <img src="${src}" alt="Evento público ${index + 1} de Rafael Monteiro" />
    </button>
  `).join("");
}

function setupGalleryModal() {
  const galleryGrid = document.querySelector("#gallery-grid");
  const modal = document.querySelector("#gallery-modal");
  const modalImage = document.querySelector("#modal-image");
  const modalClose = document.querySelector("#modal-close");
  if (!galleryGrid || !modal || !modalImage || !modalClose) return;

  galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-src]");
    if (!button) return;
    modalImage.src = button.dataset.gallerySrc;
    modalImage.alt = button.querySelector("img").alt;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  function closeModal() {
    modal.classList.add("hidden");
    modalImage.src = "";
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const feedback = document.querySelector("#form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.classList.remove("hidden");
    form.reset();
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

async function init() {
  await loadComponents();
  setupHeader();
  renderDynamicContent();
  renderGallery();
  setupGalleryModal();
  setupContactForm();
  setupRevealAnimations();
  document.querySelectorAll("#current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

init();
