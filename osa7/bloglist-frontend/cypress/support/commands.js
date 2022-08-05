Cypress.Commands.add("createUser", ({ username, password, name }) => {
  cy.request("POST", "http://localhost:3003/api/users", {
    username,
    password,
    name,
  })
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body))
    cy.visit("http://localhost:3000")
  })
})

Cypress.Commands.add("addBlog", ({ title, author, url, likes = 0 }) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  }

  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: token,
    },
  })

  cy.visit("http://localhost:3000")
})
