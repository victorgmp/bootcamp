import deepFreeze from 'deep-freeze'
import blogReducer from '../blogReducer'

describe('blog reducer test', () => {
  // {
  //   author: 'Martin Fowler',
  //   title: 'Continuous Integration',
  //   url: 'https://martinfowler.com/articles/continuousIntegration.html'
  // },
  // {
  //   author: 'Jose Fowler',
  //   title: 'Testing',
  //   url: 'https://martinfowler.com/testing.html'
  // },
  // {
  //   author: 'Martin Martin',
  //   title: 'Agile',
  //   url: 'https://martinfowler.com/agile.html'
  // }

  const initialState = []

  test('should return a proper initial state when called with undefined state', () => {
    // const action = {
    //   type: 'DO_NOTHING'
    // }

    // const newState = blogReducer()
    // expect(newState).toEqual(initialState)
  })

  // test('set initial state', () => {
  //   const action = { type: 'GET_BLOGS' }
  //   const state = {}

  //   deepFreeze(state)
  //   const newState = blogReducer(state, action)
  //   console.log(newState)
  // })

})