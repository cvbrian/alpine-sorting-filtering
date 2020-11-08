import processClasses from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'
// Get all elements that have a class attribute.
for (const element of document.querySelectorAll('*[class]')) {
    processClasses(element.className)
}
// Display elements
document.body.style.display = "block"