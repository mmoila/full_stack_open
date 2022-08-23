export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

export const asyncLocalStorage = {
  setItem: async (key, value) => {
      await null;
      return localStorage.setItem(key, value);
  },
  getItem: async (key) => {
      await null;
      return localStorage.getItem(key);
  }
};