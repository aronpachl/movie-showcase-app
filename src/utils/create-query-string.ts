export function createQueryString(params: Object) {
  const queryParams = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      const strippedValue = value.toString().replace(/\\"/g, '')
      return `${key}=${strippedValue}`
    })
    .join('&')

  return `?${queryParams}`
}
