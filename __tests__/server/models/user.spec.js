const User = require('../../../server/models/user')
const db = require('../../../server/database/connect')

describe('User', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(User).toBeDefined()
    })
})