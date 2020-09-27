var name = 'employee-data';
name = name.replace(/-/g, str => '')
    // Convert words to lower case and add hyphens around it (for stuff like "&")
    .replace(/^./g, a => a.toUpperCase()); // remove double hyphens

console.log(name);