describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Víctor',
      username: 'victorusr',
      password: 'megapass'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'salainen'
    })
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('victorusr')
      cy.get('#password').type('megapass')
      cy.contains('login').click()

      cy.contains('victorusr logged in')
    })

    // it('succeeds with correct credentials', function () {
    //   cy.get("input[name='username']").type('jane')
    //   cy.get("input[name='password']").type('secret')
    //   cy.get('button[type="submit"]').click()
    //   cy.contains('Jane Doe succesfully logged in')
    //   cy.contains('jane logged in')
    // })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('victor')
      cy.get('#password').type('megapass')
      cy.contains('login').click()

      cy.get('.error').contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'victorusr', password: 'megapass' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('blog create by cypress test')
      cy.get('#author').type('cypress bot')
      cy.get('#url').type('http://cypress.com')
      cy.contains('save').click()

      cy.contains('blog create by cypress test by cypress bot')
    })
  })

  describe('When the blog is created', function () {
    beforeEach(function () {
      // log in
      cy.login({ username: 'victorusr', password: 'megapass' })
      // create a new blog
      cy.createBlog({
        title: 'blog create by cypress test',
        author: 'cypress bot',
        url: 'http://cypress.com',
      })
    })

    it('a user can like a blog', function () {
      cy.contains('view').click()
      cy.contains('likes 0')
      // cy.contains('like').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('the creator user can delete the blog', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('blog create by cypress test - cypress bot').should('not.exist')
    })


    it('another user cannot delete the blog', function () {
      // add another user
      const user = {
        name: 'Víctor clone',
        username: 'victorusr2',
        password: 'megapass'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
      // log out current user
      cy.contains('logout').click()
      // log in with another user
      cy.login({ username: 'victorusr2', password: 'megapass' })
      // trying to delete blog
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('with multiple blogs', function () {
    beforeEach(function () {
      // log in
      cy.login({ username: 'victorusr', password: 'megapass' })
      // create a new blogs
      cy.createBlog({
        title: 'blog create by cypress test',
        author: 'cypress bot',
        url: 'http://cypress.com',
        likes: 13,
      })
      cy.createBlog({
        title: 'Second blog created',
        author: 'cypress bot',
        url: 'http://cypress.com',
        likes: 0,
      })
      cy.createBlog({
        title: 'Third blog created',
        author: 'cypress bot',
        url: 'http://cypress.com',
        likes: 4,
      })
    })

    it('Blogs are ordered in descending order based on number of likes', function () {
      cy.get('[blog-test-id="blog"]').then(($blog) => {
        expect($blog).to.have.length(3)
      })
      cy.contains('blog create by cypress test')
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('likes 14')
    })
  })

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'salainen' })
      cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').parent().parent().as('blog1')
      cy.contains('test2').parent().parent().as('blog2')
      cy.contains('test3').parent().parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('likes 1')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like2').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      // cy.get('.blog').then(blogs => {
      cy.get('[blog-test-id="blog"]').then(blogs => {
        expect(blogs).to.have.length(3)
        console.log('blogs', blogs)
        // cy.wrap(blogs[0]).contains('likes 3')
        // cy.wrap(blogs[1]).contains('likes 2')
        // cy.wrap(blogs[2]).contains('likes 1')
        cy.get('@blog1').contains('likes 1')
        cy.get('@blog2').contains('likes 1')
        cy.get('@blog3').contains('likes 2')
      })
    })

    it('The creator can delete a blog', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('remove').click()
      // cy.get('home').should('not.contain', 'test3')
      cy.contains('test3 by John Doe').should('not.exist')

      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })
  })
})