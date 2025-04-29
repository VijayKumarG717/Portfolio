document.addEventListener('DOMContentLoaded', function() {
    // Check if CSS loaded correctly
    const styles = document.styleSheets;
    let cssLoaded = false;
    
    console.log('Total stylesheets: ' + styles.length);
    
    for (let i = 0; i < styles.length; i++) {
        try {
            // Check if any stylesheet has our URL pattern (looking for both styles.css and main.css)
            // Using more permissive pattern matching to account for different path formats
            if (styles[i].href && 
                (styles[i].href.includes('main.css') || 
                 styles[i].href.includes('styles.css'))) {
                cssLoaded = true;
                console.log('Main CSS file loaded successfully: ' + styles[i].href);
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
        
        // Apply fallback styles dynamically if CSS failed to load
        const fallbackStyles = document.createElement('style');
        fallbackStyles.textContent = `
            body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; }
            .container { width: 90%; max-width: 1200px; margin: 0 auto; padding: 0 15px; }
            section { padding: 4rem 0; }
            h1, h2, h3, h4 { color: #0f172a; margin-bottom: 1rem; }
            p { margin-bottom: 1rem; }
            .btn { display: inline-block; padding: 0.8rem 2rem; border-radius: 50px; margin: 1rem 0; }
            .primary-btn { background: #4f46e5; color: white; }
            .secondary-btn { border: 2px solid #06b6d4; color: #0f172a; }
            .hero { min-height: 100vh; padding-top: 80px; background: #1B2735; color: white; }
            #navbar { position: fixed; top: 0; left: 0; width: 100%; background-color: rgba(255, 255, 255, 0.95); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); z-index: 1000; padding: 1rem 0; }
            .nav-links { display: flex; list-style: none; }
            .nav-links li { margin-left: 2rem; }
            .skill-bar { background-color: #e2e8f0; height: 10px; border-radius: 5px; margin-bottom: 1.5rem; }
            .skill-progress { background-color: #4f46e5; height: 100%; border-radius: 5px; }
            .project-card { background-color: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem; margin-bottom: 2rem; }
            .contact-form input, .contact-form textarea { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; }
        `;
        document.head.appendChild(fallbackStyles);
    } else {
        document.body.classList.add('css-loaded');
    }
    
    // Check if main script loaded
    if (typeof AOS === 'undefined') {
        console.error('AOS library not loaded');
    } else {
        console.log('AOS library loaded successfully');
    }
    
    if (typeof Typed === 'undefined') {
        console.error('Typed.js library not loaded');
    } else {
        console.log('Typed.js library loaded successfully');
    }
}); 