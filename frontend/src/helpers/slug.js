export function slugify(str) {
  let regex = /[,-]/g;
  return str.split(regex)[0].trim().toLowerCase().replace(/\s+/g, "-");
}
