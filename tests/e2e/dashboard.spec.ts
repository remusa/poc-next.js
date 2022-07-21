import { expect, test } from '@playwright/test'

test.describe('dashboard', () => {
  test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveURL('http://localhost:3000/')
    await page.locator('text=Go to the dashboard page').click()
    await expect(page).toHaveURL('http://localhost:3000/dashboard')
    await expect(page.locator('text=Dashboard4 >> h1')).toBeVisible()
    await expect(page.locator('button:has-text("4")')).toBeVisible()
    await expect(page.locator('text=Recent Deposits')).toBeVisible()
    await expect(page.locator('text=Recent Orders')).toBeVisible()
    await expect(page.locator('text=See more orders')).toBeVisible()
    await expect(page.locator('div[role="button"]:has-text("Dashboard")')).toBeVisible()
  })
})
