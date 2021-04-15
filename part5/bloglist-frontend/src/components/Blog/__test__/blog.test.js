import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../'

describe('renders blog', () => {
  let component
  let updateBlog

  beforeEach(() => {
    const blog = {
      id: '123456789',
      title: 'test blog',
      author: 'test author',
      url: 'http://testblog.com',
      likes: 8,
      user: '123456789'
    }

    updateBlog = jest.fn()

    component = render(
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
    )
  })

  test('renders blog default content', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('test blog - test author')
    expect(div).not.toHaveTextContent('http://testblog.com')
    expect(div).not.toHaveTextContent('likes 8')
  })

  test('renders blog with details', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('test blog - test author')
    expect(div).toHaveTextContent('http://testblog.com')
    expect(div).toHaveTextContent('likes 8')
  })

  test('click like two times', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    // expect(updateBlog.mock.calls).toHaveLength(2)
    expect(updateBlog).toHaveBeenCalledTimes(2)
  })

  test('full component test', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('test blog - test author')

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(div).toHaveTextContent('http://testblog.com')
    expect(div).toHaveTextContent('likes 8')

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})