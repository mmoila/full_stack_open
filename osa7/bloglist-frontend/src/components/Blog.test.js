import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe("when a blog is rendered", () => {
  const like = jest.fn()

  beforeEach(() => {
    const blog = {
      title: "test-blog",
      author: "test author",
      url: "www.test.org",
      likes: 0,
      user: { username: "user", name: "user name" },
    }

    const user = { token: "token", username: "user", name: "user name" }
    const mockHandler = jest.fn()

    render(
      <Blog deleteBlog={mockHandler} user={user} blog={blog} like={like} />
    )
  })

  test("only title and author name are rendered initially", () => {
    const preview = screen.getByText("test-blog test author")
    const likes = screen.queryByText("likes")
    const url = screen.queryByText("www.test.org")

    expect(preview).toBeDefined()
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test("clicking the view-button shows details", async () => {
    const user = userEvent.setup()
    const button = screen.getByRole("button", { name: "view" })
    await user.click(button)

    const likes = screen.getByText("likes 0")
    const url = screen.getByText("www.test.org")

    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })

  test("clicking like-button calls event handler function", async () => {
    const user = userEvent.setup()
    const button = screen.getByRole("button", { name: "view" })
    await user.click(button)

    const likeButton = screen.getByRole("button", { name: "like" })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})
