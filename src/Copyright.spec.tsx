import { expect, test } from '@playwright/experimental-ct-react'

import Copyright from './Copyright'

test.use({ viewport: { width: 500, height: 500 } })

test('should work', async ({ mount }) => {
  const component = await mount(<Copyright></Copyright>)
  await expect(component).toContainText('Your Website')
})
