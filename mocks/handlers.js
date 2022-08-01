import { db } from '../tests/utils/test-factories'

export const USE_MSW_HANDLERS = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'

export const handlers = USE_MSW_HANDLERS ? [...db.submission.toHandlers('rest')] : []
