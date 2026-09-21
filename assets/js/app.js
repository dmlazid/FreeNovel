// Side Menu
function openMenu() {
  document.getElementById("sideMenu").style.width = "260px";
}
function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
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

// Search
function searchNovel() {
  const text = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(text)
      ? "block"
      : "none";
  });
}

// Load Novels
fetch("data/novels.json")
  .then(r => r.json())
  .then(showNovels);

function showNovels(novels) {
  const latest = document.getElementById("latest");
  const popular = document.getElementById("popular");
  const completed = document.getElementById("completed");

  latest.innerHTML = "";
  popular.innerHTML = "";
  completed.innerHTML = "";

  novels.forEach(n => {

    const card = `
      <div class="card">
        <img class="cover" src="${n.cover}" alt="${n.title}">
        <div class="info">
          <h3>${n.title}</h3>
          <p>${n.author}</p>
          <p>${n.genre}</p>
          <p>${n.chapters} Volumes · ${n.status}</p>
          <a class="read" href="novel.html?id=${n.id}">Read Now</a>
        </div>
      </div>
    `;

    latest.innerHTML += card;
    popular.innerHTML += card;

    if (n.status === "Completed") {
      completed.innerHTML += card;
    }

  });
}

// Genre Filter
function filterGenre(genre) {

  fetch("data/novels.json")
    .then(r => r.json())
    .then(novels => {

      const latest = document.getElementById("latest");
      const popular = document.getElementById("popular");
      const completed = document.getElementById("completed");

      latest.innerHTML = "";
      popular.innerHTML = "";
      completed.innerHTML = "";

      novels
        .filter(n => n.genre.includes(genre))
        .forEach(n => {

          const card = `
            <div class="card">
              <img class="cover" src="${n.cover}">
              <div class="info">
                <h3>${n.title}</h3>
                <p>${n.author}</p>
                <p>${n.genre}</p>
                <p>${n.chapters} Volumes · ${n.status}</p>
                <a class="read" href="novel.html?id=${n.id}">Read Now</a>
              </div>
            </div>
          `;

          latest.innerHTML += card;
          popular.innerHTML += card;

          if (n.status === "Completed") {
            completed.innerHTML += card;
          }

        });

    });

}
