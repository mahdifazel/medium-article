# Senior Product Designer Portfolio

A modern, minimal, and responsive portfolio website designed specifically for senior product designers. Built with clean HTML, CSS, and JavaScript, featuring smooth animations, professional aesthetics, and excellent user experience.

## 🎨 Features

### Design & UX
- **Modern Minimal Design**: Clean typography, ample white space, and professional color scheme
- **Responsive Layout**: Fully responsive design that works perfectly on all devices
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **Professional Typography**: Uses Inter font family for optimal readability
- **Accessibility**: Proper focus states, semantic HTML, and keyboard navigation

### Sections
- **Hero Section**: Eye-catching introduction with floating card animation
- **About Section**: Professional background with skills and statistics
- **Work Portfolio**: Showcase of design projects with hover effects
- **Contact Section**: Contact form with validation and contact information
- **Footer**: Social media links and copyright information

### Interactive Elements
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Form Validation**: Contact form with email validation and notifications
- **Active Navigation**: Highlights current section in navigation
- **Parallax Effects**: Subtle parallax scrolling on hero section
- **Hover Animations**: Interactive hover effects on cards and buttons

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website is ready to use!

### File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🎯 Customization Guide

### Personal Information
Update the following sections in `index.html`:

#### Hero Section
```html
<h1 class="hero-title">
    Senior Product Designer
    <span class="accent">Creating meaningful experiences</span>
</h1>
<p class="hero-subtitle">
    I design digital products that solve real problems and delight users. 
    With 8+ years of experience, I've helped companies build products that matter.
</p>
```

#### About Section
- Update the description paragraphs
- Modify the statistics (years experience, projects, clients)
- Add or remove skill tags

#### Work Portfolio
Replace the placeholder projects with your actual work:
```html
<article class="work-item">
    <div class="work-image">
        <!-- Add your project image here -->
        <img src="path/to/your/image.jpg" alt="Project Name">
    </div>
    <div class="work-content">
        <h3>Your Project Name</h3>
        <p>Project description and results...</p>
        <div class="work-tags">
            <span>UX Design</span>
            <span>Prototyping</span>
        </div>
    </div>
</article>
```

#### Contact Information
Update the contact details:
```html
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-envelope"></i>
    </div>
    <div>
        <h3>Email</h3>
        <p>your.email@example.com</p>
    </div>
</div>
```

### Styling Customization

#### Colors
The main color scheme is defined in `styles.css`. Key color variables:
- Primary Blue: `#007AFF`
- Text Color: `#333`
- Secondary Text: `#666`
- Background: `#f8fafc`

#### Typography
The website uses Inter font family. To change fonts:
1. Update the Google Fonts link in `index.html`
2. Modify the `font-family` property in `styles.css`

#### Layout
- Container max-width: `1200px`
- Section padding: `6rem 0`
- Responsive breakpoints: `768px` and `480px`

### Adding Real Images
1. Replace the placeholder icons with actual project images
2. Update the `work-image` divs:
```html
<div class="work-image">
    <img src="path/to/your/project-image.jpg" alt="Project Name">
</div>
```

### Social Media Links
Update the footer social links with your actual profiles:
```html
<div class="footer-right">
    <a href="https://linkedin.com/in/yourprofile" class="social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://dribbble.com/yourprofile" class="social-link">
        <i class="fab fa-dribbble"></i>
    </a>
    <!-- Add more social links as needed -->
</div>
```

## 📱 Responsive Design

The website is fully responsive with three main breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

### Mobile Features
- Hamburger navigation menu
- Stacked layouts for better mobile experience
- Touch-friendly buttons and interactions
- Optimized typography scaling

## 🔧 Technical Features

### Performance
- Optimized CSS with efficient selectors
- Minimal JavaScript for fast loading
- Lazy loading support for images
- Smooth animations using CSS transforms

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

### SEO Ready
- Semantic HTML structure
- Proper heading hierarchy
- Meta tags for social sharing
- Clean URL structure

## 🎨 Design Principles

### Minimalism
- Clean, uncluttered design
- Focus on content and typography
- Generous white space
- Subtle visual hierarchy

### Professionalism
- Consistent color scheme
- High-quality typography
- Smooth interactions
- Professional imagery

### User Experience
- Intuitive navigation
- Clear call-to-actions
- Fast loading times
- Accessible design

## 📝 License

This portfolio template is free to use and modify for personal and commercial projects.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this portfolio template.

## 📞 Support

If you need help customizing this portfolio or have questions, please open an issue in the repository.

---

**Built with ❤️ for designers who create amazing digital experiences**