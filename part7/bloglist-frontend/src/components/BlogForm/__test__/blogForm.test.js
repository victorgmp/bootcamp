import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../'

describe('BlogForm', () => {

  test('When created, the callback will be called with data entered to form', () => {
    const addBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={addBlog} />
    )

    const blogData = {
      author: 'Martin Fowler',
      title: 'Continuous Integration',
      url: 'https://martinfowler.com/articles/continuousIntegration.html'
    }

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: blogData.author }
    })
    fireEvent.change(title, {
      target: { value: blogData.title }
    })
    fireEvent.change(url, {
      target: { value: blogData.url }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls.length).toBe(1)

    expect(addBlog.mock.calls[0][0]).toEqual(blogData)
  })
})