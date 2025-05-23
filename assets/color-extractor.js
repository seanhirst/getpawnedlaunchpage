// This script extracts dominant colors from the logo and applies them to the CSS variables

function extractColors(imageElement) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    
    // Draw the image onto the canvas
    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    
    // Process the image data to find dominant colors
    const colorCounts = {};
    const colorSamples = 10000; // Number of pixels to sample
    const pixelStep = Math.max(1, Math.floor((imageData.length / 4) / colorSamples));
    
    for (let i = 0; i < imageData.length; i += 4 * pixelStep) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        // Skip transparent pixels
        if (a < 128) continue;
        
        const colorKey = `${r},${g},${b}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }
    
    // Convert to array and sort by frequency
    const sortedColors = Object.entries(colorCounts)
        .map(([color, count]) => ({ color, count }))
        .sort((a, b) => b.count - a.count);
    
    // Get the top colors
    const topColors = sortedColors.slice(0, 5).map(item => {
        const [r, g, b] = item.color.split(',').map(Number);
        return { r, g, b, hex: rgbToHex(r, g, b) };
    });
    
    return topColors;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function calculateContrastColor(r, g, b) {
    // Calculate relative luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Return black for light colors, white for dark colors
    return luminance > 128 ? '#000000' : '#ffffff';
}

function applyColorsToTheme(colors) {
    // Get the root element to set CSS variables
    const root = document.documentElement;
    
    // Set primary color (most dominant)
    root.style.setProperty('--primary-color', colors[0].hex);
    
    // Set secondary color (second most dominant)
    root.style.setProperty('--secondary-color', colors[1]?.hex || colors[0].hex);
    
    // Set accent color (third most dominant or a contrasting color)
    root.style.setProperty('--accent-color', colors[2]?.hex || calculateContrastColor(colors[0].r, colors[0].g, colors[0].b));
    
    // Set text color based on background
    const bgColor = colors[0];
    root.style.setProperty('--text-color', calculateContrastColor(bgColor.r, bgColor.g, bgColor.b));
    
    // Set a light version of the primary color for background
    const lightPrimary = `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.1)`;
    root.style.setProperty('--background-color', lightPrimary);
}

// Initialize when the logo is loaded
document.addEventListener('DOMContentLoaded', function() {
    const logoElement = document.getElementById('logo');
    
    if (logoElement) {
        logoElement.onload = function() {
            const colors = extractColors(logoElement);
            applyColorsToTheme(colors);
            console.log('Colors extracted and applied:', colors);
        };
    }
});