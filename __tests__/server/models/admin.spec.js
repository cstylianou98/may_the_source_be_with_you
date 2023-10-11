const Admin = require('../../../server/models/admin')
const db = require('../../../server/database/connect')

describe('Admin', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Admin).toBeDefined()
    })
})