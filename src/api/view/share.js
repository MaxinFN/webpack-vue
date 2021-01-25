function fetch (a, b, c) {
  console.log(a, b, c)
}

export default {
  html: (params) => fetch('POST', '/file/share/html', params)
}
