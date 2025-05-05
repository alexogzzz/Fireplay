const sharp = require('sharp');
const fs = require('fs');

// Asegúrate de que el directorio existe
if (!fs.existsSync('./public/icons')) {
  fs.mkdirSync('./public/icons', { recursive: true });
}

// Crea un icono naranja simple con el texto "FP"
const width = 512;
const height = 512;
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f97316"/>
  <text x="50%" y="50%" font-family="Arial" font-size="200" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">FP</text>
</svg>
`;

// Genera los iconos en diferentes tamaños
Promise.all([
  sharp(Buffer.from(svg))
    .resize(192, 192)
    .png()
    .toFile('./public/icons/icon-192x192.png'),
  sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toFile('./public/icons/icon-512x512.png')
]).then(() => {
  console.log('Iconos generados correctamente');
}).catch(err => {
  console.error('Error generando iconos:', err);
});