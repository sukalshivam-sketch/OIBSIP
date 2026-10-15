# TASK 2 · Personal Portfolio Website

A personal portfolio and digital résumé built with modern semantic **HTML5**, **CSS3**, and enhanced with lightweight vanilla **JavaScript**.

---

## 🌟 Features Overview

- **Profile / Hero Section**:
  - Name, role title (`Full-Stack Developer & Software Engineer`), and tagline.
  - Live availability indicator badge with glowing pulse animation.
  - Professional vector avatar placeholder with `<SS/>` monogram and floating feature chips.
  - Call-to-action buttons (*Explore Projects*, *Get In Touch*, *Digital Résumé*) and quick social links.

- **About Me Section**:
  - Background narrative describing engineering principles and interests.
  - Key focus areas grid: Frontend UX, Clean Code Mindset, Computer Science background, Git workflows.
  - Metric highlights: 100% Responsive, 15+ Tools & Technologies, High Accessibility standards.

- **Skills & Technical Stack**:
  - Visual 2x2 categorized grid:
    1. **Frontend Engineering**: HTML5, CSS3/Flexbox/Grid, JavaScript ES6+, React, Responsive Design, Tailwind CSS.
    2. **Backend & APIs**: Node.js, Express, RESTful APIs, Python, JWT Authentication.
    3. **Databases & Cloud**: PostgreSQL, MongoDB, Firebase/Supabase, Schema Design.
    4. **Tools & Workflow**: Git/GitHub, VS Code, Postman, DevTools, Figma-to-Code, CLI.
  - Individual skill progress bars with gradient fills and percentage indicators.
  - Tech badge pill cloud for rapid scanning.

- **Featured Projects**:
  - 4 project cards with custom browser mockup headers and visuals:
    1. **OSIS** · Campus & Student Intelligence Suite (*Linked to Level-1 Task-1*)
    2. **DevPulse** · Developer Engineering Metrics & Analytics
    3. **NexusPay** · Minimalist Payment Gateway & Wallet
    4. **EchoSynth** · Ambient Spatial Audio Generator (Web Audio API)
  - Interactive project filtering by category (*All*, *Full-Stack*, *Frontend*, *Developer Tools*).
  - GitHub repository links and Live Preview links on every card.

- **Milestone Journey / Experience**:
  - Visual vertical timeline displaying projects, education, and continuous training.

- **Contact Section & Channels**:
  - Direct communication cards with one-click **"Copy Email to Clipboard"** button with tooltip.
  - Verified profiles: GitHub, LinkedIn, direct email.
  - Fully functional client-side validated contact form (Name, Email, Subject, Message) with real-time feedback and submit status.

- **Smooth Navigation & Branding**:
  - Sticky navigation header with frosted glass backdrop blur (`backdrop-filter`).
  - Active ScrollSpy indicator dynamically highlighting the current section during scroll.
  - Dark / Light mode toggle switch with `localStorage` memory and system theme detection.
  - Mobile slide-down navigation drawer with animated hamburger morph.
  - Floating **Back to Top** button.

---

## 📁 File Structure

```
TASK-2/
├── index.html       # Complete semantic HTML5 structure
├── style.css        # CSS3 custom properties, layout grids, animations, dark/light themes
├── script.js        # Vanilla JS for theme toggle, mobile nav, form validation & ScrollSpy
└── README.md        # Documentation and customization guide
```

---

## 🚀 How to Preview / Run

1. Open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
2. Alternatively, serve with any local HTTP server:
   ```bash
   # Using Python 3:
   python -m http.server 3000

   # Or using Node npx:
   npx serve .
   ```
3. Navigate to `http://localhost:3000/TASK-2/` in your browser.

---

## 🎨 Customizing Your Portfolio

- **Name & Roles**: Edit lines 63–76 in `index.html` to update your preferred display name and roles.
- **Photo**: Replace the `<svg class="avatar-svg">` element inside `.avatar-frame` with an `<img>` tag pointing to your photo (e.g., `<img src="assets/my-photo.jpg" alt="Your Name" class="avatar-svg">`).
- **Projects**: Update GitHub URLs and descriptions in the `.project-card` elements to showcase your repositories.
- **Social Links**: Replace the placeholder `href` values on social buttons with your LinkedIn and GitHub usernames.
