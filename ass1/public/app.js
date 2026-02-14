const BASE = "";

const sessionInfo = document.getElementById("sessionInfo");
const logoutBtn = document.getElementById("logoutBtn");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const registerMsg = document.getElementById("registerMsg");
const loginMsg = document.getElementById("loginMsg");

const loadMoviesBtn = document.getElementById("loadMoviesBtn");
const moviesDiv = document.getElementById("movies");

const createReviewBtn = document.getElementById("createReviewBtn");
const createReviewMsg = document.getElementById("createReviewMsg");

const loadReviewsBtn = document.getElementById("loadReviewsBtn");
const reviewsDiv = document.getElementById("reviews");

// ---- token helpers ----
function getToken() {
  return localStorage.getItem("token");
}

function setSession(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role || "");
  renderSession();
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  renderSession();
}

function renderSession() {
  const token = getToken();
  const role = localStorage.getItem("role") || "";
  if (!token) {
    sessionInfo.textContent = "Not logged in";
    return;
  }
  sessionInfo.innerHTML = `Logged in <span class="pill">${role || "unknown role"}</span>`;
}

function authHeaders() {
  const token = getToken();
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

// ---- auth ----
registerBtn.addEventListener("click", async () => {
  registerMsg.textContent = "";
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const role = document.getElementById("regRole").value.trim();

  try {
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(role ? { email, password, role } : { email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      registerMsg.textContent = data.message || data.error || "Register failed";
      return;
    }
    registerMsg.textContent = "Registered successfully. Now login.";
  } catch (e) {
    registerMsg.textContent = e.message;
  }
});

loginBtn.addEventListener("click", async () => {
  loginMsg.textContent = "";
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      loginMsg.textContent = data.message || data.error || "Login failed";
      return;
    }

    setSession(data.token, data.role);
    loginMsg.textContent = "Logged in.";
  } catch (e) {
    loginMsg.textContent = e.message;
  }
});

logoutBtn.addEventListener("click", () => {
  clearSession();
});

// ---- movies ----
loadMoviesBtn.addEventListener("click", loadMovies);

async function loadMovies() {
  moviesDiv.textContent = "Loading...";
  try {
    const res = await fetch(`${BASE}/movies`);
    const movies = await res.json();

    if (!Array.isArray(movies) || movies.length === 0) {
      moviesDiv.innerHTML = "<div class='muted'>No movies found.</div>";
      return;
    }

    moviesDiv.innerHTML = movies.map(m => `
      <div class="card">
        <div><strong>${m.title}</strong></div>
        <div class="muted">Genre: ${m.genre} | Duration: ${m.duration} | Year: ${m.releaseYear}</div>
        <div class="muted">Movie ID: ${m._id}</div>
      </div>
    `).join("");
  } catch (e) {
    moviesDiv.textContent = e.message;
  }
}

// ---- reviews ----
createReviewBtn.addEventListener("click", createReview);
loadReviewsBtn.addEventListener("click", loadReviews);

async function createReview() {
  createReviewMsg.textContent = "";

  const token = getToken();
  if (!token) {
    createReviewMsg.textContent = "Login first. No token found.";
    return;
  }

  const movieId = document.getElementById("reviewMovieId").value.trim();
  const reviewerName = document.getElementById("reviewerName").value.trim();
  const comment = document.getElementById("reviewComment").value.trim();
  const rating = Number(document.getElementById("reviewRating").value);

  try {
    const res = await fetch(`${BASE}/reviews`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ movieId, reviewerName, comment, rating })
    });

    const data = await res.json();
    if (!res.ok) {
      createReviewMsg.textContent = data.message || data.error || "Create review failed";
      return;
    }
    createReviewMsg.textContent = "Review created.";
    await loadReviews();
  } catch (e) {
    createReviewMsg.textContent = e.message;
  }
}

async function loadReviews() {
  reviewsDiv.textContent = "Loading...";
  try {
    const res = await fetch(`${BASE}/reviews`);
    const reviews = await res.json();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsDiv.innerHTML = "<div class='muted'>No reviews found.</div>";
      return;
    }

    reviewsDiv.innerHTML = reviews.map(r => `
      <div class="card">
        <div><strong>${r.reviewerName}</strong> <span class="pill">rating ${r.rating}</span></div>
        <div>${r.comment || ""}</div>
        ${r.updatedComment ? `<div class="muted">Updated: ${r.updatedComment}</div>` : ""}
        <div class="muted">Review ID: ${r._id}</div>
        <div class="muted">Movie: ${r.movieId?.title ? r.movieId.title : (r.movieId || "")}</div>
        <button class="deleteBtn danger" data-id="${r._id}">Delete</button>
      </div>
    `).join("");

    // attach delete handlers
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        await deleteReview(id);
      });
    });

  } catch (e) {
    reviewsDiv.textContent = e.message;
  }
}

async function deleteReview(reviewId) {
  const token = getToken();
  if (!token) {
    alert("Login first. No token found.");
    return;
  }

  try {
    const res = await fetch(`${BASE}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: authHeaders()
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || data.error || "Delete failed (likely not owner)");
      return;
    }
    await loadReviews();
  } catch (e) {
    alert(e.message);
  }
}

// init
renderSession();
