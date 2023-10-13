const Volunteer = require('../../../server/models/volunteering')
const db = require('../../../server/database/connect')

describe('Volunteer', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Volunteer).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Volunteering on successful', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: 'g1', age: 1 }, { name: 'g2', age: 2 }, { name: 'g3', age: 3 }]
            })
    
          const volunteers = await Volunteer.getAll()
          expect(Volunteers).toHaveLength(3)
          expect(Volunteers[0]).toHaveProperty('id')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await Volunteer.getAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("No Volunteers available.")
          }
        })
      })
    
      describe('findById', () => {
        it('resolves with Volunteer on successful db query', async () => {
          let testVolunteer = { id: 1, name: 'Volunteer', age: 22 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testVolunteer] })
    
          const result = await Volunteer.findById(1)
          expect(result).toBeInstanceOf(Volunteer)
          expect(result.name).toBe('Volunteer')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await Volunteer.findById('red')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This Volunteer does not exist!')
          }
        })
      })
    
      describe('create', () => {
        it('resolves with Volunteer on successful db query', async () => {
          let VolunteerData = { name: 'plum', age: 99 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...VolunteerData, id: 1 }] })
    
          const result = await Volunteer.create(VolunteerData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Volunteer.create({ name: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age is missing')
          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if age is missing', async () => {
          try {
            const Volunteer = new Volunteer({ name: 'plum', age: 99 })
            await Volunteer.update({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('age or name missing')
          }
        })
      })
    
      describe('destroy', () => {
        it('should return the deleted Volunteer', async () => {
          const Volunteer = new Volunteer({})
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ id: 72, name: 'plum', age: 72 }] })
    
          const result = await Volunteer.destroy()
    
          expect(result).toBeInstanceOf(Volunteer)
          expect(result.id).toBe(72)
          expect(result).not.toEqual(Volunteer)
        })
    
        it('should throw an error if we cannot locate the Volunteer', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const Volunteer = new Volunteer({ name: 'plum', age: 99 })
            await Volunteer.destroy({ name: 'puppet' })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})