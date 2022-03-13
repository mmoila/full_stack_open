const listHelper = require("../utils/list_helper")


test("dummy returns one", () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe("total likes", () => {

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([listHelper.blogs[0]])
    expect(result).toBe(5)
  })

  test("of a list with multiple blogs", () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    expect(result).toBe(29)
  })

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

})

describe("most likes", () => { 
  test("of all blogs", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs)
    expect(result).toEqual(listHelper.blogs[1])
  })
})