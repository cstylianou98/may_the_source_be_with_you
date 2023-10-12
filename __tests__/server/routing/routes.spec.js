//I think I named this wrong
const request = require('supertest')
const app = require('../../../server/app')
const { resetTestDB } = require('./helpers')

describe('api server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => {
        console.log("listening on 5000")
    })
  })

  beforeEach(async () => {
    await resetTestDB()
  })

  afterAll((done) => {
    api.close(done)
  })
  
  test('responds to GET / with status 200', (done) => {
    const testData = {
        headers: {
            'Authorization': 'tock'
        }
    }

    request(api)
        .get('/')
        .send(testData)
        .expect(200)
    done()
  })

  test('responds to GET / with status 403', (done) => {
    request(api)
        .get('/')
        .expect(403)
    done()
  })

  test('responds to POST /admin with status 200', (done) => {
    const testData = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "admin1",
            password: "pass1"
        })
    }

    request(api)
        .post('/admin')
        .expect(200)
    done()
  })

  test('responds to POST /login with status 200', (done) => {
    const testData = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "b",
            password: "2"
        })
    }

    request(api)
        .post('/login')
        .send(testData)
        .expect(200)
    done()
  })

  test('responds to POST /login with status 401', (done) => {
    const testData = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "b",
            password: "3"
        })
    }

    request(api)
        .post('/login')
        .send(testData)
        .expect(401)
        .expect({error: 'Username and password does not match'})
    done()
  })

  test('responds to POST /register with status 201', (done) => {
    const testData = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "f",
            password: "6"
        })
    }

    request(api)
        .post('/register')
        .send(testData)
        .expect(201)
    done()
  })

  test('responds to POST /register with status 401', (done) => {
    const testData = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "b",
            password: "3"
        })
    }

    request(api)
        .post('/register')
        .send(testData)
        .expect(401)
        .expect({error: 'Username already exists'})
    done()
  })
  
  test('responds to DELETE /logout with status 204', (done) => {
    const testData = {
        body: JSON.stringify({
            token: "tick"
        })
    }

    request(api)
        .delete('/logout')
        .send(testData)
        .expect(204)
    done()
  })

  test('responds to DELETE /logout with status 404', (done) => {
    request(api)
        .delete('/logout')
        .expect(404)
    done()
  })

  test('responds to GET /volunteer/event/:event with status 200', (done) => {

  })

  test('responds to POST /volunteer/event/:event with status 200', (done) => {

  })

  test('responds to GET /volunteer/user/:user with status 200', (done) => {

  })

  test('responds to DELETE /volunteer/:id with status 204', (done) => {

  })

  test('responds to PATCH /volunteer/:id with status 200', (done) => {

  })
})