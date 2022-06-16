import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from "./BlogForm"
import userEvent from '@testing-library/user-event'


describe("when a new blog is created", () => {

  test("title, url and author have correct values", async () => {
    const addNewBlog = jest.fn()
    const user = userEvent.setup()

    render (<BlogForm createNewBlog={addNewBlog} />)

    const titleInput = screen.getByPlaceholderText("write title here")
    const authorInput = screen.getByPlaceholderText("write author here")
    const urlInput = screen.getByPlaceholderText("write url here")
    const sendButton = screen.getByRole("button", {name: "create"})

    await userEvent.type(titleInput, "title input")
    await userEvent.type(authorInput, "author input")
    await userEvent.type(urlInput, "url input")
    await user.click(sendButton)

    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0]).toStrictEqual({
        title: 'title input', 
        url: 'url input', 
        author: 'author input'
        })

  })
})