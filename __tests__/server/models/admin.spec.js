const Admin = require('../../../server/models/admin')
const db = require('../../../server/database/connect')

describe('Admin', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Admin).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Admins on successful', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: 'g1', age: 1 }, { name: 'g2', age: 2 }, { name: 'g3', age: 3 }]
            })
    
          const Admins = await Admin.getAll()
          expect(Admins).toHaveLength(3)
          expect(Admins[0]).toHaveProperty('id')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await Admin.getAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("No Admins available.")
          }
        })
      })
    
      describe('findById', () => {
        it('resolves with Admin on successful db query', async () => {
          let testAdmin = { id: 1, name: 'Admin', age: 22 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testAdmin] })
    
          const result = await Admin.findById(1)
          expect(result).toBeInstanceOf(Admin)
          expect(result.name).toBe('Admin')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await Admin.findById('red')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This Admin does not exist!')
          }
        })
      })
    
      describe('create', () => {
        it('resolves with Admin on successful db query', async () => {
          let AdminData = { name: 'plum', age: 99 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...AdminData, id: 1 }] })
    
          const result = await Admin.create(AdminData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Admin.create({ name: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age is missing')
          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if age is missing', async () => {
          try {
            const Admin = new Admin({ name: 'plum', age: 99 })
            await Admin.update({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age or name missing')
          }
        })
      })
    
      describe('destroy', () => {
        it('should return the deleted Admin', async () => {
          const Admin = new Admin({})
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ id: 72, name: 'plum', age: 72 }] })
    
          const result = await Admin.destroy()
    
          expect(result).toBeInstanceOf(Admin)
          expect(result.id).toBe(72)
          expect(result).not.toEqual(Admin)
        })
    
        it('should throw an error if we cannot locate the Admin', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const Admin = new Admin({ name: 'plum', age: 99 })
            await Admin.destroy({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})