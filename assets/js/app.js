// ===== FreeNovel app.js (Fixed) =====

// Side Menu
function openMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu) menu.style.width = "260px";
}

function closeMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu) menu.style.width = "0";
}

// Dark Mode
function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Make header/logo go Home
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      location.href = "index.html";
    });
  }
});

// Search
function searchNovel() {
  const text = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(text)
      ? "block"
      : "none";
  });
}

// Load novels
fetch("data/novels.json")
  .then(r => r.json())
  .then(showNovels)
  .catch(console.error);

// Build card
function createCard(n) {
  const count = n.chapters || n.volumes || 0;

  return `
  <div class="card">
    <img src="${n.cover}"
         alt="${n.title}"
         onerror="this.src='https://placehold.co/300x420?text=No+Cover'">

    <div class="info">
      <h3>${n.title}</h3>
      <p>${n.author}</p>
      <p>${n.genre}</p>
      <p>${count} Volumes · ${n.status}</p>
      <a class="read" href="novel.html?id=${n.id}">Read Now</a>
    </div>
  </div>`;
}

// Show novels
function showNovels(novels) {
  const latest = document.getElementById("latest");
  const popular = document.getElementById("popular");
  const completed = document.getElementById("completed");

  if (latest) latest.innerHTML = "";
  if (popular) popular.innerHTML = "";
  if (completed) completed.innerHTML = "";

  novels.forEach(n => {
    const card = createCard(n);

    if (latest) latest.innerHTML += card;
    if (popular) popular.innerHTML += card;

    if (n.status === "Completed" && completed) {
      completed.innerHTML += card;
    }
  });
}

// Genre filter
function filterGenre(genre) {
  fetch("data/novels.json")
    .then(r => r.json())
    .then(novels => {
      const latest = document.getElementById("latest");
      const popular = document.getElementById("popular");
      const completed = document.getElementById("completed");

      if (latest) latest.innerHTML = "";
      if (popular) popular.innerHTML = "";
      if (completed) completed.innerHTML = "";

      novels
        .filter(n => n.genre.toLowerCase().includes(genre.toLowerCase()))
        .forEach(n => {
          const card = createCard(n);

          if (latest) latest.innerHTML += card;
          if (popular) popular.innerHTML += card;

          if (n.status === "Completed" && completed) {
            completed.innerHTML += card;
          }
        });
    });
}
