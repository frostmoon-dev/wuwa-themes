const fs = require('fs');
const path = require('path');

const characters = [
    "Camellya",
    "Carlotta",
    "Cartethyia",
    "Changli",
    "Iuno",
    "Jinhsi",
    "Phoebe",
    "Brant",
    "The Shorekeeper",
    "Rover"
];

const themesDir = path.join(__dirname, 'themes');
const templatePath = path.join(themesDir, 'camellya-color-theme.json');
const packageJsonPath = path.join(__dirname, 'package.json');

const templateContent = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Initialize themes array in package.json if strictly relying on this script, 
// but we want to append or overwrite. Let's restart the list to be clean + original if needed.
// User asked to create files. We should also register them.
// We keep the original 'wuwa-themes' entry if desired, or replace it? 
// The user request implies adding new characters. I will keep the existing one to be safe, or just add these.
// Actually, usually you want individual entries.

const newThemes = [];

characters.forEach(charName => {
    // Create filename: lowercase, replace spaces with dashes, remove parentheses
    let safeName = charName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')
        .replace(/^-+|-+$/g, ''); // trim dashes

    const fileName = `${safeName}-color-theme.json`;
    const filePath = path.join(themesDir, fileName);

    // Only create if file doesn't exist (don't overwrite customized themes!)
    if (!fs.existsSync(filePath)) {
        // Clone template
        const themeContent = JSON.parse(JSON.stringify(templateContent));
        themeContent.name = charName;
        fs.writeFileSync(filePath, JSON.stringify(themeContent, null, '\t'));
        console.log(`Created ${fileName}`);
    } else {
        console.log(`Skipped ${fileName} (already exists)`);
    }

    newThemes.push({
        label: charName,
        uiTheme: "vs", // Based on #f5f5f5 background in template
        path: `./themes/${fileName}`
    });
});

// Update package.json
// Replace themes array with only the characters that have files
packageJson.contributes.themes = newThemes;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Updated package.json');
