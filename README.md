# Senior Product Designer Portfolio

A modern, minimal, and responsive portfolio website designed specifically for senior product designers. Built with clean HTML, CSS, and JavaScript, this portfolio showcases design work beautifully while maintaining excellent performance and accessibility.

## ✨ Features

### Design & User Experience
- **Modern Minimal Design**: Clean, contemporary layout focusing on typography and whitespace
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Smooth Animations**: Subtle micro-interactions and scroll-triggered animations
- **Floating Cards**: Eye-catching animated visual elements in the hero section
- **Interactive Project Gallery**: Hover effects and modal case studies

### Technical Features
- **Mobile-First Responsive Design**: Progressively enhanced for larger screens
- **Accessibility Compliant**: WCAG guidelines followed, keyboard navigation support
- **Performance Optimized**: Fast loading, optimized animations, debounced scroll events
- **Cross-Browser Compatible**: Works on all modern browsers
- **SEO Friendly**: Semantic HTML structure and meta tags

### Interactive Elements
- **Dynamic Navigation**: Smooth scrolling with active section highlighting
- **Project Modals**: Detailed case study overlays with project information
- **Contact Form**: Validated form with real-time feedback and notifications
- **Scroll to Top**: Convenient navigation button for long pages
- **Mobile Menu**: Hamburger menu for mobile devices

## 🚀 Quick Start

1. **Clone or download the files**
   ```bash
   git clone [repository-url]
   cd portfolio
   ```

2. **Open in a web browser**
   - Simply open `index.html` in your preferred browser
   - Or use a local development server for better experience

3. **Customize the content** (see customization guide below)

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🎨 Customization Guide

### Personal Information

**Update the following in `index.html`:**

1. **Header & Title**: Change "Alex Chen" to your name
2. **Hero Section**: Update the title, description, and call-to-action text
3. **About Section**: Replace the biography, skills, and statistics
4. **Contact Information**: Update email, LinkedIn, and social media links

### Projects Portfolio

**To customize your project showcase:**

1. **In `index.html`**: Update the project cards in the work section
2. **In `script.js`**: Modify the `projectData` object with your project details

```javascript
const projectData = {
    yourproject: {
        title: 'Your Project Title',
        description: 'Brief project description',
        challenge: 'What problem did you solve?',
        solution: 'How did you solve it?',
        results: ['Result 1', 'Result 2', 'Result 3'],
        technologies: ['Tool 1', 'Tool 2', 'Tool 3']
    }
}
```

### Color Scheme

**Update CSS custom properties in `styles.css`:**

```css
:root {
    --primary-color: #1a1a1a;      /* Main dark color */
    --secondary-color: #6366f1;    /* Accent color (purple) */
    --accent-color: #f59e0b;       /* Secondary accent (amber) */
    /* ... other color variables */
}
```

### Typography

**Change fonts by updating the Google Fonts import in `index.html`:**

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Then update the CSS variable:**

```css
--font-family: 'YourFont', sans-serif;
```

## 🔧 Advanced Customization

### Adding New Sections

1. Add the HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links if needed
4. Add any interactive functionality in `script.js`

### Project Images

Replace the placeholder project backgrounds with actual images:

1. Add your project images to an `images/` folder
2. Update the CSS background properties:

```css
.your-project-bg {
    background: url('images/your-project.jpg') center/cover;
}
```

### Contact Form Integration

The contact form currently shows success/error messages without actually sending emails. To integrate with a backend service:

1. **Using Netlify Forms** (easiest):
   ```html
   <form class="contact-form" netlify>
   ```

2. **Using Formspree**:
   ```html
   <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
   ```

3. **Custom Backend**: Update the form submission handler in `script.js`

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minify Assets**: Minify CSS and JavaScript for production
3. **Enable Compression**: Use Gzip compression on your server
4. **CDN**: Consider using a CDN for static assets

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed automatically with a custom URL

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

## 🎯 SEO Optimization

1. **Update Meta Tags**:
   ```html
   <meta name="description" content="Your portfolio description">
   <meta property="og:title" content="Your Name - Senior Product Designer">
   <meta property="og:description" content="Your portfolio description">
   ```

2. **Add Schema Markup** for better search engine understanding
3. **Optimize Images** with alt text and proper file names
4. **Create a Sitemap** for better crawling

## 🔒 Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators
- ARIA labels for interactive elements
- Color contrast compliance
- Screen reader friendly

## 🐛 Troubleshooting

**Common Issues:**

1. **Animations not working**: Check if `prefers-reduced-motion` is enabled
2. **Mobile menu not working**: Ensure JavaScript is enabled
3. **Form not submitting**: Check console for errors and form action URL
4. **Fonts not loading**: Verify Google Fonts URL is correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you need help customizing this portfolio, feel free to:
- Open an issue in the repository
- Check the browser console for any errors
- Validate your HTML and CSS

---

**Built with ❤️ for product designers who want to showcase their work beautifully.**