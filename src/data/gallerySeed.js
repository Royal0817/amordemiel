const importAll = (r) => r.keys().map((key) => ({
  src: r(key),
  filename: key.replace('./', ''),
}));

const imageModules = importAll(require.context('../images/gallery', false, /\.(png|jpe?g)$/));

const tags = ['Weddings', 'Quinceañera', 'Baby Shower', 'Birthday', 'Editorial'];
const variants = ['tall', 'wide', 'square'];

const formatAlt = (filename) =>
  filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const gallerySeed = imageModules.map((image, index) => ({
  id: `${image.filename}-${index}`,
  src: image.src,
  tag: tags[index % tags.length],
  variant: variants[index % variants.length],
  alt: `Custom cake design ${formatAlt(image.filename)}`,
}));

export default gallerySeed;
