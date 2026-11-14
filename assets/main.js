(() => {
  const p = window.PROFILE;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safeUrl = value => /^https?:\/\//i.test(value || "") ? esc(value) : "";
  const external = (url, text, cls = "") => safeUrl(url) ? `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer" class="${cls}">${esc(text)}</a>` : esc(text);
  const richText = value => Array.isArray(value) ? value.map(part => {
    if (typeof part === "string") return esc(part);
    if (/^#[a-zA-Z0-9_-]+$/.test(part.url || "")) return `<a href="${esc(part.url)}">${esc(part.text)}</a>`;
    return part.url ? external(part.url,part.text) : esc(part.text);
  }).join("") : esc(value);
  const paths = {
    pin: '<path d="M12 22s7-7.2 7-13a7 7 0 1 0-14 0c0 5.8 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
    github: '<path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.3c0-1 .1-1.6-.5-2.2 3.3-.4 6.8-1.6 6.8-7.4 0-1.7-.6-3-1.6-4.1.2-.4.7-1.9-.2-4.1 0 0-1.3-.4-4.3 1.6a15 15 0 0 0-7.8 0C4.4-.2 3.1.2 3.1.2c-.9 2.2-.4 3.7-.2 4.1-1 1.1-1.6 2.4-1.6 4.1 0 5.8 3.5 7 6.8 7.4-.4.4-.6 1-.6 2.2v3.3" transform="translate(1 1) scale(.9)"/>'
  };
  const icon = key => `<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg></span>`;
  document.title = `${p.name} - Homepage`;
  const contact = (key, name, url) => safeUrl(url) ? `<li>${icon(key)}${external(url,name)}</li>` : "";
  document.getElementById("profile").innerHTML = `
    <img class="avatar" src="${esc(p.avatar)}" alt="${esc(p.name)} initials avatar" width="174" height="174">
    <h1>${esc(p.name)}</h1><p class="affiliation">${esc(p.affiliation)}</p><p class="role">${esc(p.role)}</p>
    <details class="mobile-links" open><summary>Contact & Links</summary><ul class="profile-links">
      <li>${icon("pin")}<span>${esc(p.location)}</span></li>
      ${p.email ? `<li>${icon("mail")}<a href="mailto:${esc(p.email)}" title="${esc(p.email)}" aria-label="Email: ${esc(p.email)}">Email</a></li>` : ""}
      ${contact("github","GitHub",p.github)}
    </ul></details>`;
  document.getElementById("about-me").innerHTML = p.about.map(t => `<p>${richText(t)}</p>`).join("") + (p.researchInterests?.length ? `<p class="research-interests"><strong>Research interests:</strong> ${p.researchInterests.map(esc).join("; ")}.</p>` : "") + (p.announcement ? `<p class="announcement">${esc(p.announcement)}</p>` : "");
  const timeline = items => items.map(i => `<li><span class="date">${esc(i.date)}</span>${richText(i.text)}</li>`).join("");
  document.getElementById("news-list").innerHTML = timeline(p.news);
  const authors = (names, corresponding = []) => names.map(name => {
    const label = name === p.name ? `<strong>${esc(name)}</strong>` : esc(name);
    return label + (corresponding.includes(name) ? '<sup class="corresponding-mark" title="Corresponding author">†</sup>' : "");
  }).join(", ");
  const groups = [...new Set(p.publications.map(item => item.group))];
  document.getElementById("publication-list").innerHTML = groups.map(group => `
    <div class="publication-group"><h3 class="publication-group-title">${esc(group)}</h3>
    ${p.publications.filter(item => item.group === group).map(item => {
      const figure = `<img class="pub-image${item.imagePending ? " pending-figure" : ""}" src="${esc(item.image)}" alt="${esc(item.imageAlt)}" width="${item.imageWidth}" height="${item.imageHeight}" loading="lazy" decoding="async">`;
      const links = [["Paper",item.paper],["Code",item.code],["Project",item.project]].filter(([,url]) => safeUrl(url));
      const venueBadge = item.status === "Under Review" ? "Under Review" : item.venue.startsWith("Pattern Recognition Letters") ? "PRL 2026" : item.venue.replace(" (Main Conference)", "");
      return `<article class="publication" id="${esc(item.slug)}">
        <div class="publication-visual"><div class="figure-frame"><span class="venue-badge">${esc(venueBadge)}</span>${figure}</div></div>
        <div class="publication-content"><h4 class="pub-title">${external(item.paper || item.project,item.title)}</h4><p class="authors">${authors(item.authors,item.correspondingAuthors)}</p>
        ${item.correspondingAuthors?.length ? '<p class="author-note">† Corresponding author</p>' : ""}
        <p class="venue">${esc(item.venue)}${item.status === "Under Review" ? "" : ` · ${esc(item.status)}`}</p>
        ${links.length ? `<div class="pub-links">${links.map(([label,url]) => external(url,label)).join("")}</div>` : ""}
        </div></article>`;
    }).join("")}</div>`).join("");
  document.getElementById("service-list").innerHTML = p.service.map(item => `<li><strong>${esc(item.category)}:</strong> ${esc(item.text)}</li>`).join("");
  document.getElementById("experience-list").innerHTML = timeline(p.experience);
  document.getElementById("footer-name").textContent = p.name;
  const mobile = matchMedia("(max-width:760px)");
  const details = document.querySelector(".mobile-links");
  function syncDetails() { details.open = !mobile.matches; }
  syncDetails(); mobile.addEventListener("change", syncDetails);
  const topLink = document.querySelector(".back-top");
  window.addEventListener("scroll", () => topLink.classList.toggle("visible",scrollY > 400), {passive:true});
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      navLinks.forEach(a => a.hash === `#${entry.target.id}` ? a.setAttribute("aria-current","location") : a.removeAttribute("aria-current"));
    }
  }, {rootMargin:"-100px 0px -60% 0px",threshold:0});
  document.querySelectorAll("main section").forEach(s => observer.observe(s));
})();
