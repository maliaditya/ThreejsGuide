# Web Runtime Environment 
---
![[Pasted image 20260101233752.png]]
## **Project Initialization (npm + Vite)**

### Create a new folder

```bash
mkdir setup
cd setup
```

---

### Initialize npm

```bash
npm init -y
```

What this does:

* Creates `package.json`
* Enables dependency management
* Marks this folder as a JS project

---

### Install Vite

```bash
npm install vite --save-dev
```

What this does:

* Adds Vite as a **development tool**
* No global install needed
* Keeps setup portable

---

### Add dev script

Edit **`package.json`**:

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

Now you can start the server with:

```bash
npm run dev
```

---




## 1. **Vite Runtime Setup**

**`vite.config.js`**

```js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true
  }
})
```

* Starts a dev server
* Handles ES module loading
* Opens the browser automatically

---

## 2. **HTML Structure**

**`index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Runtime</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <!-- Canvas surface -->
    <canvas id="app"></canvas>

    <!-- JavaScript entry -->
    <script type="module" src="/script.js"></script>
  </body>
</html>
```

What this does:

* Creates a full-screen page
* Provides a `<canvas>` as a rendering surface
* Loads JavaScript as an ES module

---

## 3. **JavaScript Runtime State & Resize Handling**


### Viewport state (single source of truth)
**`script.js`**

```js
const viewport = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}
```

* Mirrors the current browser window
* Stores pixel ratio explicitly
* Prevents querying `window` everywhere

---

### Canvas reference
**`script.js`**
```js
const canvas = document.getElementById('app')
```

* Direct reference to the DOM canvas
* Used as the drawing surface

---

### Apply viewport values to canvas
**`script.js`**
```js
function applyViewportState() {
  canvas.width  = viewport.width  * viewport.pixelRatio
  canvas.height = viewport.height * viewport.pixelRatio

  canvas.style.width  = `${viewport.width}px`
  canvas.style.height = `${viewport.height}px`
}
```

What this does:

* Sets **internal resolution** (sharpness)
* Sets **CSS size** (layout)
* Keeps canvas crisp on high-DPI screens

---

### Window resize handling
**`script.js`**
```js
window.addEventListener('resize', () => {
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
  viewport.pixelRatio = Math.min(window.devicePixelRatio, 2)

  applyViewportState()
})
```

* Updates stored window values
* Reapplies canvas sizing whenever the window changes

---

### Initial setup call

```js
applyViewportState()
```

* Ensures canvas matches the window on first load
* Prevents mismatched size on startup

---

### Project structure

Your final folder layout:

```
web-runtime/
├─ index.html
├─ script.js
├─ vite.config.js
├─ package.json
└─ node_modules/
```

---

## Summary (Plain Language)

* **Vite** loads and serves the app
* **HTML** defines a full-screen canvas
* **JavaScript**:

  * Tracks window size
  * Handles high-DPI displays
  * Keeps the canvas in sync with the browser











