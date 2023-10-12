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

  test('responds to POST /login with status 200', async(done) => {
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

    await request(api)
        .post('/login')
        .send(testData)
        .expect(200,done)
  })
})