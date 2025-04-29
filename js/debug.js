document.addEventListener('DOMContentLoaded', function() {
    // Check if CSS loaded correctly
    const styles = document.styleSheets;
    let cssLoaded = false;
    
    for (let i = 0; i < styles.length; i++) {
        try {
            // Check if any stylesheet has our URL pattern (looking for both styles.css and main.css)
            if (styles[i].href && 
                (styles[i].href.includes('/css/styles.css') || 
                 styles[i].href.includes('/css/main.css') ||
                 styles[i].href.includes('css/styles.css') || 
                 styles[i].href.includes('css/main.css'))) {
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
        
        // Additional debugging help
        console.log('Available stylesheets:');
        for (let i = 0; i < styles.length; i++) {
            try {
                console.log(i, styles[i].href || 'Inline stylesheet');
            } catch (e) {
                console.log(i, 'Inaccessible due to CORS');
            }
        }
    } else {
        document.body.classList.add('css-loaded');
    }
}); 