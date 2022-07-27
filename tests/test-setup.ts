import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../mocks/server'

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

// https://github.com/tannerlinsley/react-query/discussions/1441
afterEach(async () => {
  // queryCache.clear();
  await Promise.all([])
})

export { }
