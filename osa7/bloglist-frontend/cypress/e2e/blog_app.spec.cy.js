describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.createUser({
      username: "test_user",
      password: "sekret",
      name: "Mikael",
    })
    cy.createUser({ username: "other_user", password: "other", name: "Other" })
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("login to application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test_user")
      cy.get("#password").type("sekret")
      cy.get("#loginButton").click()

      cy.contains("user Mikael logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test_user")
      cy.get("#password").type("wrong_password")
      cy.get("#loginButton").click()

      cy.get(".notification")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "other_user", password: "other" })
      cy.addBlog({
        title: "other users blog",
        author: "Mr other",
        url: "www.other.fi",
        likes: 10,
      })
      cy.addBlog({
        title: "other users blog2",
        author: "Mr other",
        url: "www.other2.fi",
        likes: 5,
      })
      cy.login({ username: "test_user", password: "sekret" })
      cy.addBlog({
        title: "default blog",
        author: "Mr default",
        url: "www.test.fi",
      })
    })

    it("blogs are ordered by number of likes", function () {
      cy.get(".blog")
        .eq(0)
        .find("button")
        .click()
        .parents("#blog")
        .should("contain", "likes 10")
      cy.get(".blog")
        .eq(1)
        .find("button")
        .click()
        .parents("#blog")
        .should("contain", "likes 5")
      cy.get(".blog")
        .eq(2)
        .find("button")
        .click()
        .parents("#blog")
        .should("contain", "likes 0")
    })

    it("a blog can be created", function () {
      cy.contains("new blog").click()
      cy.get("#title").type("New test blog title")
      cy.get("#author").type("Mikael")
      cy.get("#url").type("http://www.testblog.net")
      cy.get("#newBlogButton").click()

      cy.get(".notification")
        .should("contain", "blog New test blog title by Mikael added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid")

      cy.get("#blogList").should("contain", "New test blog title Mikael")
    })

    it("a blog can be liked", function () {
      cy.get(".blog").eq(0).as("firstBlog").find("button").click()
      cy.get("@firstBlog").should("contain", "likes 10")
      cy.get("#likeButton").click()
      cy.get("@firstBlog").should("contain", "likes 11")
    })

    it("own blog can be deleted", function () {
      cy.contains("other users").parent().as("otherBlog").find("button").click()
      cy.get("@otherBlog").should("not.contain", "delete")

      cy.get("#blogList")
        .contains("default blog")
        .parent()
        .as("theBlog")
        .find("button")
        .click()
      cy.get("@theBlog").contains("delete").click()

      cy.get("html").should("not.contain", "default blog")
    })
  })
})
