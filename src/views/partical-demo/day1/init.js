function createIconLink () {
  const iconHref = 'xxx.icon'
  const iconLink = document.querySelector('link[rel="icon"]')
  if (iconLink) {
    iconLink.href = iconHref
    return
  }
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/x-icon'
  link.href = iconHref
  document.head.appendChild(link)
}