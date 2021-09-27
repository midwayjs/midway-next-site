
module.exports = () => {
  return {
    name: 'midway-plugin',
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
