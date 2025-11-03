document.addEventListener("DOMContentLoaded", async () => {
  // Insert header and footer everywhere
  async function include(id, file) {
    const container = document.getElementById(id);
    if (container) {
      try {
        const res = await fetch('assets/' + file);
        const html = await res.text();
        container.innerHTML = html;
      } catch (e) {
        console.error("Could not load", file, e);
      }
    }
  }

  await include("header", "header.html");
  await include("footer", "footer.html");

  // Highlight active page (after header loads)
  const path = location.pathname.split("/").pop();
  const activeLink = document.querySelectorAll("nav a");
  activeLink.forEach(link => {
    if (link.getAttribute("href") === path) link.classList.add("active");
  });

  // Scroll-to-top button
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTop";
  scrollBtn.textContent = "↑";
  document.body.appendChild(scrollBtn);
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Light/Dark toggle
  const toggle = document.createElement("button");
  toggle.textContent = "🌓";
  toggle.id = "modeToggle";
  document.body.appendChild(toggle);

  const mode = localStorage.getItem("mode") || "light";
  setMode(mode);
  toggle.addEventListener("click", () => {
    const newMode = document.body.classList.contains("dark-mode") ? "light" : "dark";
    setMode(newMode);
  });

  function setMode(mode) {
    document.body.classList.toggle("dark-mode", mode === "dark");
    localStorage.setItem("mode", mode);
  }
});
