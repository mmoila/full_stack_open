export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    console.log(allBooks)
    console.log(allBooks.concat(addedBook))
    console.log(uniqByName(allBooks.concat(addedBook)))
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

