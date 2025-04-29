document.addEventListener('DOMContentLoaded', function() {
    // Check if CSS loaded correctly
    const styles = document.styleSheets;
    let cssLoaded = false;
    
    for (let i = 0; i < styles.length; i++) {
        try {
            // Check if any stylesheet has our URL pattern
            if (styles[i].href && styles[i].href.includes('/css/styles.css')) {
                cssLoaded = true;
                console.log('Main CSS file loaded successfully');
                break;
            }
        } catch (e) {
            // CORS error for external stylesheets
            console.log('Could not access stylesheet:', e);
        }
    }
    
    if (!cssLoaded) {
        console.error('Main CSS file not loaded. Using fallback styles.');
        document.body.classList.add('css-failed');
    } else {
        document.body.classList.add('css-loaded');
    }
}); 