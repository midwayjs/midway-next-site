
module.exports = () => {
  return {
    name: 'add-meta-tag',
    injectHtmlTags: () => {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              name: 'referrer',
              content: 'no-referrer'
            }
          }
        ]
      }
    }
  }
}
