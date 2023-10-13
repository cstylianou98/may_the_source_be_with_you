const Token = require('../../../server/models/token')
const db = require('../../../server/database/connect')

describe('Token', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Token).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Tokens on successful', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: 'g1', age: 1 }, { name: 'g2', age: 2 }, { name: 'g3', age: 3 }]
            })
    
          const Tokens = await Token.getAll()
          expect(Tokens).toHaveLength(3)
          expect(Tokens[0]).toHaveProperty('id')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await Token.getAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("No Tokens available.")
          }
        })
      })
    
      describe('findById', () => {
        it('resolves with Token on successful db query', async () => {
          let testToken = { id: 1, name: 'Token', age: 22 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testToken] })
    
          const result = await Token.findById(1)
          expect(result).toBeInstanceOf(Token)
          expect(result.name).toBe('Token')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await Token.findById('red')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This Token does not exist!')
          }
        })
      })
    
      describe('create', () => {
        it('resolves with Token on successful db query', async () => {
          let TokenData = { name: 'plum', age: 99 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...TokenData, id: 1 }] })
    
          const result = await Token.create(TokenData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Token.create({ name: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age is missing')
          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if age is missing', async () => {
          try {
            const Token = new Token({ name: 'plum', age: 99 })
            await Token.update({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age or name missing')
          }
        })
      })
    
      describe('destroy', () => {
        it('should return the deleted Token', async () => {
          const Token = new Token({})
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ id: 72, name: 'plum', age: 72 }] })
    
          const result = await Token.destroy()
    
          expect(result).toBeInstanceOf(Token)
          expect(result.id).toBe(72)
          expect(result).not.toEqual(Token)
        })
    
        it('should throw an error if we cannot locate the Token', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const Token = new Token({ name: 'plum', age: 99 })
            await Token.destroy({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})