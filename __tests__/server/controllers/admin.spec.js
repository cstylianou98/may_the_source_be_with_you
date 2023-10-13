const adminController = require('../../../server/controllers/admin')
const Admin = require('../../../server/models/admin')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('adminController', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(adminController).toBeDefined()
    })

    describe('index', () => {
        it('should return Admins with a status code 200', async () => {
          const testAdmins = ['g1', 'g2']
          jest.spyOn(Admin, 'getAll')
            .mockResolvedValue(testAdmins)
    
          await AdminsController.index(null, mockRes)
          expect(Admin.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: testAdmins })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Admin, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await AdminsController.index(null, mockRes)
          expect(Admin.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
      })
    
      describe('show', () => {
        let testAdmin, mockReq
        beforeEach(() => {
          testAdmin = { id: 1, name: 'Test Admin', age: 22 }
          mockReq = { params: { id: 1 } }
        })
    
        it('return a dog with a 200 status code', async () => {
          jest.spyOn(Admin, 'findById')
            .mockResolvedValue(new Admin(testAdmin))
    
          await AdminsController.show(mockReq, mockRes)
          expect(Admin.findById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: new Admin(testAdmin) })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Admin, 'findById')
            .mockRejectedValue(new Error('oh no'))
    
          await AdminsController.show(mockReq, mockRes)
          expect(Admin.findById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
      })
    
      describe('create', () => {
        test('it returns a new dog with a 201 status code', async () => {
          let testAdmin = { name: 'Test Dog', age: 2 }
          const mockReq = { body: testAdmin }
    
          jest.spyOn(Admin, 'create')
            .mockResolvedValue(new Admin(testAdmin))
    
          await AdminsController.create(mockReq, mockRes)
          expect(Admin.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(201)
          expect(mockSend).toHaveBeenCalledWith({ data: new Admin({ ...testAdmin }) })
        })
    
    
        test('it returns an error', async () => {
          let testAdmin = { name: 'Test Dog' }
          const mockReq = { body: testAdmin }
    
          jest.spyOn(Admin, 'create')
            .mockRejectedValue(new Error('oh no'))
    
          await AdminsController.create(mockReq, mockRes)
          expect(Admin.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(400)
          expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
      })
    
      describe('update', () => {
        it('modifies a row in the database', async () => {
          const testAdmin = { id: 22, name: 'Test Admin', age: 22 }
          jest.spyOn(Admin, 'findById')
            .mockResolvedValue(new Admin(testAdmin))
    
          const mockReq = { params: { id: 22 }, body: { name: 'plum' } }
    
          jest.spyOn(Admin.prototype, 'update')
            .mockResolvedValue({ ...new Admin(testAdmin), name: 'plum' })
    
          await AdminsController.update(mockReq, mockRes)
    
    
          expect(Admin.findById).toHaveBeenCalledTimes(1)
          expect(Admin.prototype.update).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: new Admin({ id: 22, name: 'plum', age: 22 }) })
        })
      })
    
      describe('destroy', () => {
        it('returns a 204 status code on successful deletion', async () => {
          const testAdmin = { id: 1, name: 'Test Admin', age: 22 }
          jest.spyOn(Admin, 'findById')
            .mockResolvedValue(new Admin(testAdmin))
    
          jest.spyOn(Admin.prototype, 'destroy')
            .mockResolvedValue(new Admin(testAdmin))
    
          const mockReq = { params: { id: 1 } }
          await AdminsController.destroy(mockReq, mockRes)
    
          expect(Admin.findById).toHaveBeenCalledTimes(1)
          expect(Admin.prototype.destroy).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(204)
          expect(mockEnd).toHaveBeenCalledWith()
        })
    
        it('calls Admin.destroy()', async () => {
          const mockReq = { params: { id: 49 } }
    
          jest.spyOn(Admin, 'findById')
            .mockRejectedValue(new Error('Admin not found'))
    
          await AdminsController.destroy(mockReq, mockRes)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockSend).toHaveBeenCalledWith({ error: 'Admin not found' })
        })
      })
})