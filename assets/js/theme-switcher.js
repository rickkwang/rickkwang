// Theme Switcher
// Based on the preferred theme and saved preference, set the appropriate theme

(function() {
  // Detect if user has set a preference in the browser
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme in localStorage, otherwise use system preference or default to light
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = prefersDarkScheme.matches;
  const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Set initial theme
  setTheme(defaultTheme);
  
  // Add event listener for theme toggle button
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
      });
    }
  });
  
  // Listen for changes in system preference
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only update theme automatically if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  function setTheme(theme) {
    // Apply the theme to the root element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save the preference in localStorage
    localStorage.setItem('theme', theme);
    
    // Update the toggle button icon
    updateToggleButton(theme);
  }
  
  function updateToggleButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        // Change the icon based on the current theme
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }
})();