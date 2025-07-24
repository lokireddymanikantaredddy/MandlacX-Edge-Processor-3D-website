# MandlacX 3D Landing Page

A pixel-perfect, interactive 3D landing page for the MandlacX Edge Processor, built as part of a technical assessment for SecureSight.

## ✨ Features
- **Figma-accurate UI:** Layout and styling match the provided Figma design exactly.
- **3D Model Viewer:** GLB model loaded with React Three Fiber and Drei, with drag-to-rotate interaction.
- **Scroll Animation:** Model animates on first scroll and returns to original position when scrolled to top.
- **Callout Boxes:** Key features and specs highlighted with connector lines and styled callouts.
- **Responsive Features Grid:** Below-the-fold grid section with product features, icons, and slogan.

## 🛠️ Tech Stack
- [Next.js 15](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [@react-three/drei](https://docs.pmnd.rs/drei/introduction)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd 3D-design/3d-design
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your 3D model
- Place your `model.glb` file in the `public/models/` directory.
- (Optional) Update feature icons in `public/` as needed.

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the site.

## 🖱️ Usage
- **Rotate the model:** Click and drag to view the device from any angle.
- **Scroll animation:** The model animates on first scroll and resets when you scroll back to the top.
- **Explore features:** Review the callout boxes and features grid for product highlights.

## 🌐 Deployment
This project is ready for deployment on [Vercel](https://vercel.com/) or any Node.js-compatible host.
- Build: `npm run build`
- Start: `npm start`

## 📁 Project Structure
- `src/app/page.tsx` — Main landing page (hero, 3D model, features grid)
- `public/models/model.glb` — 3D model file
- `public/` — Feature icons and images

## 📝 Credits
- **Design:** Based on Figma file provided by SecureSight.
- **3D Model:** Provided as `model.glb` (replace with your own if needed).
- **Development:** Built by [Your Name] for the SecureSight Fullstack Developer Technical Assessment.

---

For any questions or feedback, please contact [your-email@example.com].
