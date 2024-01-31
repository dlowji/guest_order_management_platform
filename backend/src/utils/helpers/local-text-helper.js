export function vietnameseToEnglish(text) {
  return text.replace(/Ă/gim, 'a')
    .replace(/Â/gim, 'a')
    .replace(/Ê/gim, 'e')
    .replace(/Ô/gim, 'o')
    .replace(/Ơ/gim, 'o')
    .replace(/Ư/gim, 'u')
    .replace(/ă/gim, 'a')
    .replace(/â/gim, 'a')
    .replace(/ê/gim, 'e')
    .replace(/ô/gim, 'o')
    .replace(/ơ/gim, 'o')
    .replace(/ư/gim, 'u');
}