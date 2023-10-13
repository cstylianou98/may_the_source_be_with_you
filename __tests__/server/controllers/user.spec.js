const userController = require('../../../server/controllers/user')
const User = require('../../../server/models/user')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('userController', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(userController).toBeDefined()
    })

    describe('index', () => {
        it('should return Users with a status code 200', async () => {
          const testUsers = ['g1', 'g2']
          jest.spyOn(User, 'getAll')
            .mockResolvedValue(testUsers)
    
          await UsersController.index(null, mockRes)
          expect(User.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: testUsers })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(User, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await UsersController.index(null, mockRes)
          expect(User.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
      })
    
      describe('show', () => {
        let testUser, mockReq
        beforeEach(() => {
          testUser = { id: 1, name: 'Test User', age: 22 }
          mockReq = { params: { id: 1 } }
        })
    
        it('return a dog with a 200 status code', async () => {
          jest.spyOn(User, 'findById')
            .mockResolvedValue(new User(testUser))
    
          await UsersController.show(mockReq, mockRes)
          expect(User.findById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: new User(testUser) })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(User, 'findById')
            .mockRejectedValue(new Error('oh no'))
    
          await UsersController.show(mockReq, mockRes)
          expect(User.findById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
      })
    
      describe('create', () => {
        test('it returns a new dog with a 201 status code', async () => {
          let testUser = { name: 'Test Dog', age: 2 }
          const mockReq = { body: testUser }
    
          jest.spyOn(User, 'create')
            .mockResolvedValue(new User(testUser))
    
          await UsersController.create(mockReq, mockRes)
          expect(User.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(201)
          expect(mockSend).toHaveBeenCalledWith({ data: new User({ ...testUser }) })
        })
    
    
        test('it returns an error', async () => {
          let testUser = { name: 'Test Dog' }
          const mockReq = { body: testUser }
    
          jest.spyOn(User, 'create')
            .mockRejectedValue(new Error('oh no'))
    
          await UsersController.create(mockReq, mockRes)
          expect(User.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(400)
          expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
      })
    
      describe('update', () => {
        it('modifies a row in the database', async () => {
          const testUser = { id: 22, name: 'Test User', age: 22 }
          jest.spyOn(User, 'findById')
            .mockResolvedValue(new User(testUser))
    
          const mockReq = { params: { id: 22 }, body: { name: 'plum' } }
    
          jest.spyOn(User.prototype, 'update')
            .mockResolvedValue({ ...new User(testUser), name: 'plum' })
    
          await UsersController.update(mockReq, mockRes)
    
    
          expect(User.findById).toHaveBeenCalledTimes(1)
          expect(User.prototype.update).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: new User({ id: 22, name: 'plum', age: 22 }) })
        })
      })
    
      describe('destroy', () => {
        it('returns a 204 status code on successful deletion', async () => {
          const testUser = { id: 1, name: 'Test User', age: 22 }
          jest.spyOn(User, 'findById')
            .mockResolvedValue(new User(testUser))
    
          jest.spyOn(User.prototype, 'destroy')
            .mockResolvedValue(new User(testUser))
    
          const mockReq = { params: { id: 1 } }
          await UsersController.destroy(mockReq, mockRes)
    
          expect(User.findById).toHaveBeenCalledTimes(1)
          expect(User.prototype.destroy).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(204)
          expect(mockEnd).toHaveBeenCalledWith()
        })
    
        it('calls User.destroy()', async () => {
          const mockReq = { params: { id: 49 } }
    
          jest.spyOn(User, 'findById')
            .mockRejectedValue(new Error('User not found'))
    
          await UsersController.destroy(mockReq, mockRes)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' })
        })
      })
})