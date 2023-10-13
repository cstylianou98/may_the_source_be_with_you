const volunteerController = require('../../../server/controllers/volunteering')
const Volunteer = require('../../../server/models/volunteering')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('volunteerController', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(volunteerController).toBeDefined()
    })

    describe('index', () => {
        it('should return Volunteers with a status code 200', async () => {
          const testVolunteers = ['g1', 'g2']
          jest.spyOn(Volunteer, 'getAll')
            .mockResolvedValue(testVolunteers)
    
          await VolunteersController.index(null, mockRes)
          expect(Volunteer.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockSend).toHaveBeenCalledWith({ data: testVolunteers })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Volunteer, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await VolunteersController.index(null, mockRes)
          expect(Volunteer.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
    })
    
    describe('show', () => {
    let testVolunteer, mockReq
    beforeEach(() => {
        testVolunteer = { id: 1, name: 'Test Volunteer', age: 22 }
        mockReq = { params: { id: 1 } }
    })

    it('return a dog with a 200 status code', async () => {
        jest.spyOn(Volunteer, 'findById')
        .mockResolvedValue(new Volunteer(testVolunteer))

        await VolunteersController.show(mockReq, mockRes)
        expect(Volunteer.findById).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
        expect(mockSend).toHaveBeenCalledWith({ data: new Volunteer(testVolunteer) })
    })

    it('sends an error upon fail', async () => {
        jest.spyOn(Volunteer, 'findById')
        .mockRejectedValue(new Error('oh no'))

        await VolunteersController.show(mockReq, mockRes)
        expect(Volunteer.findById).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(404)
        expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
    })
    })

    describe('create', () => {
    test('it returns a new dog with a 201 status code', async () => {
        let testVolunteer = { name: 'Test Dog', age: 2 }
        const mockReq = { body: testVolunteer }

        jest.spyOn(Volunteer, 'create')
        .mockResolvedValue(new Volunteer(testVolunteer))

        await VolunteersController.create(mockReq, mockRes)
        expect(Volunteer.create).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(201)
        expect(mockSend).toHaveBeenCalledWith({ data: new Volunteer({ ...testVolunteer }) })
    })


    test('it returns an error', async () => {
        let testVolunteer = { name: 'Test Dog' }
        const mockReq = { body: testVolunteer }

        jest.spyOn(Volunteer, 'create')
        .mockRejectedValue(new Error('oh no'))

        await VolunteersController.create(mockReq, mockRes)
        expect(Volunteer.create).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(400)
        expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
    })
    })

    describe('update', () => {
    it('modifies a row in the database', async () => {
        const testVolunteer = { id: 22, name: 'Test Volunteer', age: 22 }
        jest.spyOn(Volunteer, 'findById')
        .mockResolvedValue(new Volunteer(testVolunteer))

        const mockReq = { params: { id: 22 }, body: { name: 'plum' } }

        jest.spyOn(Volunteer.prototype, 'update')
        .mockResolvedValue({ ...new Volunteer(testVolunteer), name: 'plum' })

        await VolunteersController.update(mockReq, mockRes)


        expect(Volunteer.findById).toHaveBeenCalledTimes(1)
        expect(Volunteer.prototype.update).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
        expect(mockSend).toHaveBeenCalledWith({ data: new Volunteer({ id: 22, name: 'plum', age: 22 }) })
    })
    })

    describe('destroy', () => {
    it('returns a 204 status code on successful deletion', async () => {
        const testVolunteer = { id: 1, name: 'Test Volunteer', age: 22 }
        jest.spyOn(Volunteer, 'findById')
        .mockResolvedValue(new Volunteer(testVolunteer))

        jest.spyOn(Volunteer.prototype, 'destroy')
        .mockResolvedValue(new Volunteer(testVolunteer))

        const mockReq = { params: { id: 1 } }
        await VolunteersController.destroy(mockReq, mockRes)

        expect(Volunteer.findById).toHaveBeenCalledTimes(1)
        expect(Volunteer.prototype.destroy).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(204)
        expect(mockEnd).toHaveBeenCalledWith()
    })

    it('calls Volunteer.destroy()', async () => {
        const mockReq = { params: { id: 49 } }

        jest.spyOn(Volunteer, 'findById')
        .mockRejectedValue(new Error('Volunteer not found'))

        await VolunteersController.destroy(mockReq, mockRes)
        expect(mockStatus).toHaveBeenCalledWith(404)
        expect(mockSend).toHaveBeenCalledWith({ error: 'Volunteer not found' })
    })
    })
})