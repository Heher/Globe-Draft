export function spacesToDashes(name) {
  return name.replace(/\s+/g, '-')
}

export function dashesToSpaces(name) {
  return name.replace(/-+/g, ' ')
}