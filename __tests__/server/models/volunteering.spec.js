const Volunteer = require('../../../server/models/volunteering')
const db = require('../../../server/database/connect')

describe('Volunteer', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Volunteer).toBeDefined()
    })
})