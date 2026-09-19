// ==========================================================================
// Do You Bachegi? — app.js
// Supabase config, movie database, auth, and rendering logic
// ==========================================================================

const APP_VERSION = "1.2.0"; // keep in sync with CHANGELOG.md — bump on every change

const SUPABASE_URL = "https://jyeeywmatohrnepfcbpp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_401LpdfOzhXJUBvQFORGmA_FP3P8ImD";
const EMAIL_DOMAIN = "doyoubachegi.local"; // fake domain used to turn usernames into emails Supabase Auth accepts

const OMDB_KEY = "8ab568f1"; // same OMDb key used in Orach — fetches posters automatically, no manual upload needed

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const AVATAR_COUNT = 35; // 7 columns x 5 rows — avatar1.png ... avatar35.png in /avatars

// --------------------------------------------------------------------------
// Movie database
// Each franchise is a group of installments; single-installment movies live
// in each studio's own "others" list. Posters are fetched live from OMDb
// by title — no poster files need to be uploaded.
// --------------------------------------------------------------------------

const STUDIOS = [
  {
    name: "Walt Disney Animation Studios",
    franchises: [
      {
        name: "The Lion King",
        movies: [
          { id: "lionking1", title: "The Lion King", year: 1994, poster: "lionking1" },
          { id: "lionking2", title: "The Lion King II: Simba's Pride", year: 1998, poster: "lionking2" },
          { id: "lionking3", title: "The Lion King 1½", year: 2004, poster: "lionking3" },
          { id: "lionking4", title: "The Lion King (2019)", year: 2019, poster: "lionking4" },
        ],
      },
      {
        name: "Aladdin",
        movies: [
          { id: "aladdin1", title: "Aladdin", year: 1992, poster: "aladdin1" },
          { id: "aladdin2", title: "The Return of Jafar", year: 1994, poster: "aladdin2" },
          { id: "aladdin3", title: "Aladdin and the King of Thieves", year: 1996, poster: "aladdin3" },
        ],
      },
      {
        name: "Zootopia",
        movies: [
          { id: "zootopia1", title: "Zootopia", year: 2016, poster: "zootopia1" },
          { id: "zootopia2", title: "Zootopia 2", year: 2025, poster: "zootopia2" },
        ],
      },
      {
        name: "Moana",
        movies: [
          { id: "moana1", title: "Moana", year: 2016, poster: "moana1" },
          { id: "moana2", title: "Moana 2", year: 2024, poster: "moana2" },
        ],
      },
    ],
  },
  {
    name: "Pixar",
    franchises: [
      {
        name: "Monsters, Inc.",
        movies: [
          { id: "monstersinc1", title: "Monsters, Inc.", year: 2001, poster: "monstersinc1" },
          { id: "monstersinc2", title: "Monsters University", year: 2013, poster: "monstersinc2" },
        ],
      },
      {
        name: "The Incredibles",
        movies: [
          { id: "incredibles1", title: "The Incredibles", year: 2004, poster: "incredibles1" },
          { id: "incredibles2", title: "Incredibles 2", year: 2018, poster: "incredibles2" },
        ],
      },
      {
        name: "Toy Story",
        movies: [
          { id: "toystory1", title: "Toy Story", year: 1995, poster: "toystory1" },
          { id: "toystory2", title: "Toy Story 2", year: 1999, poster: "toystory2" },
          { id: "toystory3", title: "Toy Story 3", year: 2010, poster: "toystory3" },
          { id: "toystory4", title: "Toy Story 4", year: 2019, poster: "toystory4" },
          { id: "toystory5", title: "Toy Story 5", year: 2026, poster: "toystory5" },
        ],
      },
      {
        name: "Finding Nemo",
        movies: [
          { id: "findingnemo1", title: "Finding Nemo", year: 2003, poster: "findingnemo1" },
          { id: "findingnemo2", title: "Finding Dory", year: 2016, poster: "findingnemo2" },
        ],
      },
      {
        name: "Cars",
        movies: [
          { id: "cars1", title: "Cars", year: 2006, poster: "cars1" },
          { id: "cars2", title: "Cars 2", year: 2011, poster: "cars2" },
          { id: "cars3", title: "Cars 3", year: 2017, poster: "cars3" },
        ],
      },
      {
        name: "Inside Out",
        movies: [
          { id: "insideout1", title: "Inside Out", year: 2015, poster: "insideout1" },
          { id: "insideout2", title: "Inside Out 2", year: 2024, poster: "insideout2" },
        ],
      },
    ],
    others: [
      { id: "up", title: "Up", year: 2009, poster: "up" },
      { id: "walle", title: "WALL-E", year: 2008, poster: "walle" },
      { id: "ratatouille", title: "Ratatouille", year: 2007, poster: "ratatouille" },
      { id: "coco", title: "Coco", year: 2017, poster: "coco" },
    ],
  },
  {
    name: "DreamWorks Animation",
    franchises: [
      {
        name: "Shrek",
        movies: [
          { id: "shrek1", title: "Shrek", year: 2001, poster: "shrek1" },
          { id: "shrek2", title: "Shrek 2", year: 2004, poster: "shrek2" },
          { id: "shrek3", title: "Shrek the Third", year: 2007, poster: "shrek3" },
          { id: "shrek4", title: "Shrek Forever After", year: 2010, poster: "shrek4" },
        ],
      },
      {
        name: "Puss in Boots",
        movies: [
          { id: "pussinboots1", title: "Puss in Boots", year: 2011, poster: "pussinboots1" },
          { id: "pussinboots2", title: "Puss in Boots: The Last Wish", year: 2022, poster: "pussinboots2" },
        ],
      },
      {
        name: "Madagascar",
        movies: [
          { id: "madagascar1", title: "Madagascar", year: 2005, poster: "madagascar1" },
          { id: "madagascar2", title: "Madagascar: Escape 2 Africa", year: 2008, poster: "madagascar2" },
          { id: "madagascar3", title: "Madagascar 3: Europe's Most Wanted", year: 2012, poster: "madagascar3" },
          { id: "madagascar4", title: "Penguins of Madagascar", year: 2014, poster: "madagascar4" },
        ],
      },
      {
        name: "How to Train Your Dragon",
        movies: [
          { id: "httyd1", title: "How to Train Your Dragon", year: 2010, poster: "httyd1" },
          { id: "httyd2", title: "How to Train Your Dragon 2", year: 2014, poster: "httyd2" },
          { id: "httyd3", title: "How to Train Your Dragon: The Hidden World", year: 2019, poster: "httyd3" },
        ],
      },
      {
        name: "Kung Fu Panda",
        movies: [
          { id: "kungfupanda1", title: "Kung Fu Panda", year: 2008, poster: "kungfupanda1" },
          { id: "kungfupanda2", title: "Kung Fu Panda 2", year: 2011, poster: "kungfupanda2" },
          { id: "kungfupanda3", title: "Kung Fu Panda 3", year: 2016, poster: "kungfupanda3" },
          { id: "kungfupanda4", title: "Kung Fu Panda 4", year: 2024, poster: "kungfupanda4" },
        ],
      },
      {
        name: "The Croods",
        movies: [
          { id: "croods1", title: "The Croods", year: 2013, poster: "croods1" },
          { id: "croods2", title: "The Croods: A New Age", year: 2020, poster: "croods2" },
        ],
      },
    ],
    others: [
      { id: "beemovie", title: "Bee Movie", year: 2007, poster: "beemovie" },
      { id: "megamind", title: "Megamind", year: 2010, poster: "megamind" },
    ],
  },
  {
    name: "Illumination",
    franchises: [
      {
        name: "Despicable Me",
        movies: [
          { id: "despicableme1", title: "Despicable Me", year: 2010, poster: "despicableme1" },
          { id: "despicableme2", title: "Despicable Me 2", year: 2013, poster: "despicableme2" },
          { id: "despicableme3", title: "Despicable Me 3", year: 2017, poster: "despicableme3" },
          { id: "despicableme4", title: "Despicable Me 4", year: 2024, poster: "despicableme4" },
        ],
      },
      {
        name: "Minions",
        movies: [
          { id: "minions1", title: "Minions", year: 2015, poster: "minions1" },
          { id: "minions2", title: "Minions: The Rise of Gru", year: 2022, poster: "minions2" },
          { id: "minions3", title: "Minions 3", year: 2026, poster: "minions3" },
        ],
      },
      {
        name: "The Secret Life of Pets",
        movies: [
          { id: "secretlifeofpets1", title: "The Secret Life of Pets", year: 2016, poster: "secretlifeofpets1" },
          { id: "secretlifeofpets2", title: "The Secret Life of Pets 2", year: 2019, poster: "secretlifeofpets2" },
        ],
      },
      {
        name: "Sing",
        movies: [
          { id: "sing1", title: "Sing", year: 2016, poster: "sing1" },
          { id: "sing2", title: "Sing 2", year: 2021, poster: "sing2" },
        ],
      },
    ],
  },
  {
    name: "Blue Sky Studios",
    franchises: [
      {
        name: "Ice Age",
        movies: [
          { id: "iceage1", title: "Ice Age", year: 2002, poster: "iceage1" },
          { id: "iceage2", title: "Ice Age: The Meltdown", year: 2006, poster: "iceage2" },
          { id: "iceage3", title: "Ice Age: Dawn of the Dinosaurs", year: 2009, poster: "iceage3" },
          { id: "iceage4", title: "Ice Age: Continental Drift", year: 2012, poster: "iceage4" },
          { id: "iceage5", title: "Ice Age: Collision Course", year: 2016, poster: "iceage5" },
        ],
      },
      {
        name: "Rio",
        movies: [
          { id: "rio1", title: "Rio", year: 2011, poster: "rio1" },
          { id: "rio2", title: "Rio 2", year: 2014, poster: "rio2" },
        ],
      },
    ],
  },
  {
    name: "Sony Pictures Animation",
    franchises: [
      {
        name: "Hotel Transylvania",
        movies: [
          { id: "hoteltransylvania1", title: "Hotel Transylvania", year: 2012, poster: "hoteltransylvania1" },
          { id: "hoteltransylvania2", title: "Hotel Transylvania 2", year: 2015, poster: "hoteltransylvania2" },
          { id: "hoteltransylvania3", title: "Hotel Transylvania 3: Summer Vacation", year: 2018, poster: "hoteltransylvania3" },
          { id: "hoteltransylvania4", title: "Hotel Transylvania: Transformania", year: 2022, poster: "hoteltransylvania4" },
        ],
      },
      {
        name: "The Angry Birds Movie",
        movies: [
          { id: "angrybirds1", title: "The Angry Birds Movie", year: 2016, poster: "angrybirds1" },
          { id: "angrybirds2", title: "The Angry Birds Movie 2", year: 2019, poster: "angrybirds2" },
        ],
      },
      {
        name: "Cloudy with a Chance of Meatballs",
        movies: [
          { id: "cloudy1", title: "Cloudy with a Chance of Meatballs", year: 2009, poster: "cloudy1" },
          { id: "cloudy2", title: "Cloudy with a Chance of Meatballs 2", year: 2013, poster: "cloudy2" },
        ],
      },
    ],
  },
  {
    name: "Other Studios",
    franchises: [
      {
        name: "The Addams Family",
        movies: [
          { id: "addamsfamily1", title: "The Addams Family", year: 2019, poster: "addamsfamily1" },
          { id: "addamsfamily2", title: "The Addams Family 2", year: 2021, poster: "addamsfamily2" },
        ],
      },
    ],
  },
];

// --------------------------------------------------------------------------
// State
// --------------------------------------------------------------------------

let currentUser = null; // { id, username, avatar }
let watchedByMovie = {}; // movie_id -> [{ id, username, avatar }]

// --------------------------------------------------------------------------
// Auth helpers
// --------------------------------------------------------------------------

function usernameToEmail(username) {
  return `${username.trim().toLowerCase()}@${EMAIL_DOMAIN}`;
}

function setError(el, message) {
  el.textContent = message || "";
}

async function signUp(username, password, avatar) {
  const email = usernameToEmail(username);
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;

  // If email confirmation is somehow still on, data.session may be null.
  const userId = data.user?.id;
  if (!userId) throw new Error("Could not create account. Check your Supabase Auth settings.");

  const { error: profileError } = await sb.from("profiles").insert({
    id: userId,
    username: username.trim(),
    avatar: avatar,
  });
  if (profileError) throw profileError;

  return { id: userId, username: username.trim(), avatar };
}

async function signIn(username, password) {
  const email = usernameToEmail(username);
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return await loadProfile(data.user.id);
}

async function loadProfile(userId) {
  const { data, error } = await sb.from("profiles").select("id, username, avatar").eq("id", userId).single();
  if (error) throw error;
  return data;
}

async function signOut() {
  await sb.auth.signOut();
  currentUser = null;
  showAuthScreen();
}

// --------------------------------------------------------------------------
// Watched data
// --------------------------------------------------------------------------

async function loadAllWatched() {
  const { data, error } = await sb.from("watched").select("movie_id, user_id, profiles(username, avatar)");
  if (error) {
    console.error(error);
    return;
  }
  watchedByMovie = {};
  for (const row of data) {
    if (!watchedByMovie[row.movie_id]) watchedByMovie[row.movie_id] = [];
    watchedByMovie[row.movie_id].push({
      id: row.user_id,
      username: row.profiles?.username ?? "?",
      avatar: row.profiles?.avatar ?? "avatar1",
    });
  }
}

function hasWatched(movieId, userId) {
  return (watchedByMovie[movieId] || []).some((w) => w.id === userId);
}

async function toggleWatched(movieId) {
  const already = hasWatched(movieId, currentUser.id);
  if (already) {
    const { error } = await sb.from("watched").delete().eq("movie_id", movieId).eq("user_id", currentUser.id);
    if (error) return console.error(error);
    watchedByMovie[movieId] = (watchedByMovie[movieId] || []).filter((w) => w.id !== currentUser.id);
  } else {
    const { error } = await sb.from("watched").insert({ movie_id: movieId, user_id: currentUser.id });
    if (error) return console.error(error);
    if (!watchedByMovie[movieId]) watchedByMovie[movieId] = [];
    watchedByMovie[movieId].push({ id: currentUser.id, username: currentUser.username, avatar: currentUser.avatar });
  }
  renderPosterState(movieId);
}

// --------------------------------------------------------------------------
// Posters (fetched live from OMDb by title — no manual upload needed)
// --------------------------------------------------------------------------

const posterCache = {};

function getCachedPoster(id) {
  try {
    const v = localStorage.getItem("posterUrl_" + id);
    return v === null ? undefined : v;
  } catch {
    return undefined;
  }
}
function setCachedPoster(id, url) {
  try {
    localStorage.setItem("posterUrl_" + id, url);
  } catch {
    /* ignore */
  }
}

function cleanTitleForSearch(title) {
  return title.replace(/\s*\(\d{4}\)\s*$/, "").trim(); // strip a trailing "(2019)" style year
}

async function fetchPoster(movie) {
  if (posterCache[movie.id] !== undefined) return posterCache[movie.id];
  const stored = getCachedPoster(movie.id);
  if (stored !== undefined) {
    posterCache[movie.id] = stored;
    return stored;
  }
  const title = cleanTitleForSearch(movie.title);
  try {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${movie.year}&type=movie&apikey=${OMDB_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    if (d.Poster && d.Poster !== "N/A") {
      posterCache[movie.id] = d.Poster;
      setCachedPoster(movie.id, d.Poster);
      return d.Poster;
    }
    posterCache[movie.id] = "N/A";
    // only cache long-term on a genuine "not found" — retry later if it was just rate-limited
    if (d.Error && !/limit/i.test(d.Error)) setCachedPoster(movie.id, "N/A");
    return "N/A";
  } catch {
    posterCache[movie.id] = "N/A";
    return "N/A";
  }
}

function injectPoster(frameEl, url) {
  if (!frameEl || !url || url === "N/A") return;
  if (frameEl.querySelector("img")) return;
  const img = document.createElement("img");
  img.className = "poster-img";
  img.src = url;
  img.alt = "";
  img.loading = "lazy";
  img.onload = () => frameEl.querySelector(".poster-fallback")?.style.setProperty("display", "none");
  img.onerror = () => img.remove();
  frameEl.insertBefore(img, frameEl.firstChild);
}

async function preloadPosters(movies) {
  for (let i = 0; i < movies.length; i += 4) {
    const batch = movies.slice(i, i + 4);
    const urls = await Promise.all(batch.map((m) => fetchPoster(m)));
    batch.forEach((m, idx) => {
      const frame = document.querySelector(`.poster-frame[data-poster="${m.id}"]`);
      injectPoster(frame, urls[idx]);
    });
    if (i + 4 < movies.length) await new Promise((r) => setTimeout(r, 300)); // be kind to OMDb's rate limit
  }
}

// --------------------------------------------------------------------------
// Rendering
// --------------------------------------------------------------------------

function posterCard(movie) {
  const card = document.createElement("div");
  card.className = "poster-card";
  card.dataset.movieId = movie.id;
  card.innerHTML = `
    <div class="poster-frame" data-poster="${movie.id}">
      <div class="poster-fallback">
        <span class="poster-fallback-icon">&#127916;</span>
      </div>
      <div class="poster-check" aria-hidden="true">&#10003;</div>
    </div>
    <div class="poster-title">${movie.title}</div>
    <div class="poster-year">${movie.year}</div>
    <div class="watchers"></div>
  `;
  card.addEventListener("click", () => toggleWatched(movie.id));
  return card;
}

function renderPosterState(movieId) {
  const card = document.querySelector(`.poster-card[data-movie-id="${movieId}"]`);
  if (!card) return;
  const watchers = watchedByMovie[movieId] || [];
  const iWatched = watchers.some((w) => w.id === currentUser.id);
  card.classList.toggle("watched", iWatched);
  const watchersEl = card.querySelector(".watchers");
  if (watchers.length === 0) {
    watchersEl.textContent = "";
  } else {
    watchersEl.textContent = watchers.map((w) => w.username).join(", ") + (watchers.length === 1 ? " watched this" : " watched this");
  }
}

function franchiseBlock(franchise) {
  const wrap = document.createElement("section");
  wrap.className = "franchise-block";
  const heading = document.createElement("h3");
  heading.className = "franchise-title";
  heading.textContent = franchise.name;
  wrap.appendChild(heading);
  const grid = document.createElement("div");
  grid.className = "poster-grid";
  franchise.movies.forEach((m) => grid.appendChild(posterCard(m)));
  wrap.appendChild(grid);
  return wrap;
}

function renderMovies() {
  const container = document.getElementById("movie-sections");
  container.innerHTML = "";

  STUDIOS.forEach((studio) => {
    const studioSection = document.createElement("section");
    studioSection.className = "studio-section";
    const h2 = document.createElement("h2");
    h2.className = "studio-title";
    h2.textContent = studio.name;
    studioSection.appendChild(h2);
    studio.franchises.forEach((f) => studioSection.appendChild(franchiseBlock(f)));
    if (studio.others && studio.others.length) {
      studioSection.appendChild(franchiseBlock({ name: "Others", movies: studio.others }));
    }
    container.appendChild(studioSection);
  });

  // paint watched state on everything
  const allMovies = STUDIOS.flatMap((s) => [...s.franchises.flatMap((f) => f.movies), ...(s.others || [])]);
  allMovies.forEach((m) => renderPosterState(m.id));

  preloadPosters(allMovies); // fire and forget — fills in posters as they arrive
}

function renderAvatarGrid(container, selectable, onSelect, initialSelected) {
  container.innerHTML = "";
  container.classList.add("avatar-grid");
  let selected = initialSelected || null;
  for (let i = 1; i <= AVATAR_COUNT; i++) {
    const id = `avatar${i}`;
    const img = document.createElement("img");
    img.src = `avatars/${id}.png`;
    img.alt = id;
    img.className = "avatar-option";
    img.dataset.avatar = id;
    if (id === selected) img.classList.add("selected");
    if (selectable) {
      img.addEventListener("click", () => {
        container.querySelectorAll(".avatar-option").forEach((el) => el.classList.remove("selected"));
        img.classList.add("selected");
        selected = id;
        onSelect(id);
      });
    }
    container.appendChild(img);
  }
}

// --------------------------------------------------------------------------
// Screens
// --------------------------------------------------------------------------

function showAuthScreen() {
  document.getElementById("auth-screen").hidden = false;
  document.getElementById("app-screen").hidden = true;
}

async function showAppScreen() {
  document.getElementById("auth-screen").hidden = true;
  document.getElementById("app-screen").hidden = false;
  document.getElementById("current-username").textContent = currentUser.username;
  document.getElementById("current-avatar").src = `avatars/${currentUser.avatar}.png`;
  await loadAllWatched();
  renderMovies();
}

// --------------------------------------------------------------------------
// Wire up UI
// --------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("version-badge").textContent = `v${APP_VERSION}`;

  let signupAvatar = "avatar1";
  const avatarPreview = document.getElementById("avatar-picker-preview");
  const avatarPanel = document.getElementById("avatar-picker-panel");

  renderAvatarGrid(document.getElementById("signup-avatar-grid"), true, (id) => {
    signupAvatar = id;
    avatarPreview.src = `avatars/${id}.png`;
    avatarPanel.hidden = true;
  }, signupAvatar);

  document.getElementById("avatar-picker-btn").addEventListener("click", () => {
    avatarPanel.hidden = !avatarPanel.hidden;
  });

  document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").hidden = true;
    document.getElementById("signup-form").hidden = false;
  });
  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signup-form").hidden = true;
    document.getElementById("login-form").hidden = false;
  });

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById("login-error");
    setError(errorEl, "");
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    try {
      currentUser = await signIn(username, password);
      await showAppScreen();
    } catch (err) {
      setError(errorEl, err.message || "Could not sign in.");
    }
  });

  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById("signup-error");
    setError(errorEl, "");
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    if (!username.trim() || !password) {
      setError(errorEl, "Enter a username and password.");
      return;
    }
    try {
      currentUser = await signUp(username, password, signupAvatar);
      await showAppScreen();
    } catch (err) {
      setError(errorEl, err.message || "Could not create account.");
    }
  });

  document.getElementById("logout-btn").addEventListener("click", signOut);

  // resume session if already logged in
  const { data } = await sb.auth.getSession();
  if (data.session) {
    try {
      currentUser = await loadProfile(data.session.user.id);
      await showAppScreen();
    } catch {
      showAuthScreen();
    }
  } else {
    showAuthScreen();
  }
});
