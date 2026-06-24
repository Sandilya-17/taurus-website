# Taurus Trade & Logistics — 3D Marketing Website

A fully animated, 3D marketing website for Taurus Trade & Logistics built with React.

## Features
- 🌐 Interactive 3D globe showing logistics network (West Africa + global)
- 🚛 Animated 3D isometric truck with route animation
- ✨ Particle network background with connection graph
- 📊 Animated counters for key stats
- 📱 Fully responsive (mobile-first)
- 🎨 Smooth fade-up scroll animations
- 💬 Contact form with loading state
- 🔗 Links through to ERP login

## Tech Stack
- **Frontend**: React 18
- **Animations**: Pure Canvas API (no library overhead), CSS animations
- **Design**: Custom CSS design system (no UI framework)
- **Fonts**: Space Grotesk + Inter

## Getting Started

```bash
cd taurus-website
npm install
npm start
```

Opens at http://localhost:3001 (ERP runs on :3000)

## Build & Deploy

```bash
npm run build
```

Produces `build/` folder. Deploy to:
- **Netlify**: drag-and-drop `build/` folder
- **Vercel**: `vercel --prod`
- **Railway**: add `nixpacks.toml` with `startCommand = "npx serve -s build"`

## Project Structure

```
src/
  App.jsx              # Main page with all sections
  components/
    ParticleBackground.jsx   # Canvas particle network
    Globe3D.jsx              # Rotating 3D globe with routes
    Truck3D.jsx              # Animated isometric truck
    AnimatedCounter.jsx      # Scroll-triggered counter
    FadeUp.jsx               # Intersection observer fade-in
  styles/
    global.css               # Full design system
public/
  index.html
```

## Sections
1. **Hero** — Particle BG + headline + stats + truck animation
2. **Services** — 6 service cards with hover effects
3. **Stats Band** — Animated counters
4. **Network** — 3D rotating globe with city routes
5. **Technology** — ERP dashboard preview + feature list
6. **Fleet** — Animated 3D truck canvas
7. **Testimonials** — Client quote cards
8. **Contact** — Form + office info
9. **Footer** — Links and social
