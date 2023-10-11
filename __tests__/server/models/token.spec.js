const Token = require('../../../server/models/token')
const db = require('../../../server/database/connect')

describe('Token', () => {

    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Token).toBeDefined()
    })
})