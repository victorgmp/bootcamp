import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../'

describe('renders blogForm', () => {
  let component
  let addBlog

  beforeEach(() => {
    addBlog = jest.fn()

    component = render(
      <Blog addBlog={addBlog}/>
    )
  })

  test('add new blog', () => {
    const form = component.container.querySelector('form')

    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput, {
      target: { value: 'test blog' }
    })

    const authorInput = component.container.querySelector('#author')
    fireEvent.change(authorInput, {
      target: { value: 'test author' }
    })

    const urlInput = component.container.querySelector('#url')
    fireEvent.change(urlInput, {
      target: { value: 'http://testblog.com' }
    })

    fireEvent.submit(form)

    expect(addBlog).toHaveBeenCalledTimes(1)
    expect(addBlog.mock.calls[0][0].title).toBe('test blog')
    expect(addBlog.mock.calls[0][0].author).toBe('test author')
    expect(addBlog.mock.calls[0][0].url).toBe('http://testblog.com')
  })
})