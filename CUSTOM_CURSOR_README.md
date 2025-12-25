# Custom Cursor Documentation 🎯

A smooth, interactive custom cursor implementation for modern web applications built with React and TypeScript.

## Overview

This custom cursor replaces the default browser cursor with a sophisticated, animated cursor that responds to different interactive elements. It features multiple modes, smooth animations, and visual feedback for enhanced user experience.

## Features

- ✨ **Smooth Animation**: Uses `requestAnimationFrame` for 60fps performance
- 🎨 **Multiple Cursor Modes**: Default, CTA, Project, and Hidden states
- 🖱️ **Smart Detection**: Automatically detects interactive elements
- 📱 **Responsive**: Only activates on devices with fine pointer (desktop/laptop)
- ♿ **Accessible**: Preserves native cursor functionality
- 🔄 **Dynamic Updates**: Observes DOM changes to attach listeners to new elements

## Cursor Modes

### 1. **Default Mode** (Small Ring)
- **Appearance**: Small white dot + thin ring with 40% opacity border
- **When**: Moving over empty space or non-interactive content
- **Size**: Normal (scale-100)

### 2. **CTA Mode** (Medium Filled Circle)
- **Appearance**: Medium filled white circle (1.8x larger)
- **When**: Hovering over:
  - `<a>` tags (links)
  - `<button>` elements
  - Elements with `.group` class
  - Elements with `data-cursor="cta"`
- **Visual**: Dot disappears, ring fills with white

### 3. **Project Mode** (Large Circle with "VIEW" Text)
- **Appearance**: Large filled white circle (2.8x larger) with "VIEW" text
- **When**: Hovering over elements with `data-cursor="project"`
- **Visual**: Dot disappears, ring fills with white, displays black "VIEW" text
- **Use Case**: Project cards, portfolio items, featured images

### 4. **Hidden Mode**
- **Appearance**: Completely invisible
- **When**: Mouse leaves the browser window

## Usage

### Basic Implementation

The cursor is already integrated into your application via `layout.tsx`:

```tsx
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
```

### Adding Custom Cursor Modes

Use the `data-cursor` attribute to specify cursor behavior:

#### Project Mode (Large "VIEW" Cursor)
```tsx
<div data-cursor="project">
  <img src="project-image.jpg" alt="Project" />
</div>
```

#### CTA Mode (Medium Filled Circle)
```tsx
<div data-cursor="cta">
  <p>Click to learn more</p>
</div>
```

#### Default Mode (Explicit)
```tsx
<div data-cursor="default">
  <p>Normal cursor</p>
</div>
```

### Automatic Detection

The following elements automatically trigger CTA mode **without** needing `data-cursor`:
- All `<a>` tags
- All `<button>` elements
- All `<img>` elements
- Elements with class `.group`

## Technical Implementation

### Architecture

```
CustomCursor Component
├── State Management
│   ├── mode: Current cursor mode
│   ├── isClicking: Click state for scale effect
│   └── isVisible: Visibility state
├── Refs
│   ├── dotRef: Precision dot element
│   ├── ringRef: Interactive ring element
│   ├── mousePos: Current mouse position
│   ├── ringPos: Smoothed ring position
│   └── rafId: Animation frame ID
└── Effects
    ├── Mouse tracking
    ├── Element detection
    ├── Animation loop
    └── Cleanup
```

### Animation System

**Dot Movement**: Instant tracking
```tsx
dotRef.current.style.left = `${mousePos.current.x}px`;
dotRef.current.style.top = `${mousePos.current.y}px`;
```

**Ring Movement**: Smooth interpolation (lerp)
```tsx
const lerp = 0.15; // Smoothness factor
ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;
```

### Positioning

Both cursor elements use `transform: translate(-50%, -50%)` to ensure perfect centering regardless of size or scale transformations:

```tsx
style={{ 
  transform: "translate(-50%, -50%)",
  willChange: "left, top"
}}
```

## Customization

### Adjusting Smoothness

Modify the `lerp` value in `CustomCursor.tsx` (line 36):

```tsx
const lerp = 0.15; // Range: 0.1 (smoother) to 0.3 (faster)
```

### Changing Cursor Sizes

Update the `getRingStyles()` function:

```tsx
const getRingStyles = () => {
  switch (mode) {
    case "project":
      return "scale-[2.8] bg-white border-none"; // Adjust 2.8
    case "cta":
      return "scale-[1.8] bg-white border-none"; // Adjust 1.8
    default:
      return "scale-100 border-white/40";
  }
};
```

### Adding New Cursor Modes

1. **Add to type definition**:
```tsx
type CursorMode = "default" | "project" | "cta" | "hidden" | "custom";
```

2. **Add style case**:
```tsx
case "custom":
  return "scale-[3] bg-blue-500 border-none";
```

3. **Use in HTML**:
```tsx
<div data-cursor="custom">Custom cursor area</div>
```

### Changing Colors

Modify the Tailwind classes:

```tsx
// Dot color
className="... bg-white ..." // Change to bg-blue-500, etc.

// Ring border
className="... border-white/40 ..." // Change opacity or color

// Fill color
return "... bg-white ..."; // Change to any color
```

## Performance Optimization

### Current Optimizations

1. **RequestAnimationFrame**: Syncs with browser refresh rate
2. **Will-change**: GPU acceleration for smooth transforms
3. **Event Delegation**: Efficient listener management
4. **Mutation Observer**: Automatic detection of new elements
5. **Proper Cleanup**: Prevents memory leaks

### Best Practices

- Avoid adding `data-cursor` to too many elements
- Use CSS transitions for scale/opacity changes
- Keep cursor elements simple (avoid complex children)

## Browser Compatibility

The cursor only activates on devices with fine pointer control:

```css
@media (pointer: fine) {
  body, a, button, [role="button"], .group, img {
    cursor: none !important;
  }
}
```

**Supported**: Desktop browsers, laptops with trackpad  
**Fallback**: Mobile/touch devices use native cursor

## Troubleshooting

### Cursor moves too fast/jerky
- Decrease the `lerp` value (e.g., from 0.15 to 0.1)
- Check for conflicting CSS transitions

### Cursor not appearing
- Verify `pointer: fine` media query support
- Check z-index conflicts (cursor uses z-[9999])
- Ensure CustomCursor is rendered in layout

### Cursor not changing modes
- Verify `data-cursor` attribute spelling
- Check element is in the selector list
- Inspect with DevTools to confirm attribute exists

### Performance issues
- Reduce number of elements with `data-cursor`
- Check for excessive DOM mutations
- Profile with Chrome DevTools Performance tab

## Examples in Portfolio

### About Section Image
```tsx
<div data-cursor="project" className="relative group...">
  <img src="..." alt="Sachin's Coding Environment" />
</div>
```

### Project Cards
```tsx
<img
  data-cursor="project"
  src={project.imageUrl}
  alt={project.title}
  className="..."
/>
```

### CTA Buttons
```tsx
<a
  href="#work"
  data-cursor="cta"
  className="..."
>
  View Projects
</a>
```

## Credits

Built with:
- React 18+
- TypeScript
- Tailwind CSS
- RequestAnimationFrame API
- Intersection Observer API

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Author**: Sachin Thakur
