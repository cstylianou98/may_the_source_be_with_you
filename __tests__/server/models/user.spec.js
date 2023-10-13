const User = require('../../../server/models/user')
const db = require('../../../server/database/connect')

describe('User', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(User).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Users on successful', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: 'g1', age: 1 }, { name: 'g2', age: 2 }, { name: 'g3', age: 3 }]
            })
    
          const Users = await User.getAll()
          expect(Users).toHaveLength(3)
          expect(Users[0]).toHaveProperty('id')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await User.getAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("No Users available.")
          }
        })
      })
    
      describe('findById', () => {
        it('resolves with User on successful db query', async () => {
          let testUser = { id: 1, name: 'User', age: 22 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testUser] })
    
          const result = await User.findById(1)
          expect(result).toBeInstanceOf(User)
          expect(result.name).toBe('User')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await User.findById('red')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This User does not exist!')
          }
        })
      })
    
      describe('create', () => {
        it('resolves with User on successful db query', async () => {
          let UserData = { name: 'plum', age: 99 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...UserData, id: 1 }] })
    
          const result = await User.create(UserData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await User.create({ name: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age is missing')
          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if age is missing', async () => {
          try {
            const User = new User({ name: 'plum', age: 99 })
            await User.update({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age or name missing')
          }
        })
      })
    
      describe('destroy', () => {
        it('should return the deleted User', async () => {
          const User = new User({})
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ id: 72, name: 'plum', age: 72 }] })
    
          const result = await User.destroy()
    
          expect(result).toBeInstanceOf(User)
          expect(result.id).toBe(72)
          expect(result).not.toEqual(User)
        })
    
        it('should throw an error if we cannot locate the User', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const User = new User({ name: 'plum', age: 99 })
            await User.destroy({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})