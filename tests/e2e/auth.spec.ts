import { expect, test } from '@playwright/test'

test.describe('auth', () => {
  test('sign up', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.locator('text=Sign Up').click()
    await expect(page).toHaveURL('http://localhost:3000/sign-up')
    await page.locator('input[name="firstName"]').fill('Test')
    await page.locator('input[name="lastName"]').fill('User')
    await page.locator('input[name="email"]').fill('test@zubale.com')
    await page.locator('input[name="password"]').fill('password123')
    await page.locator('input[type="checkbox"]').check()
    await page.locator('button:has-text("Sign Up")').click()
    await expect(page.locator('div[role="alert"]:has-text("Success")')).toBeVisible()
  })

  test('sign in', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.locator('text=Sign In').click()
    await expect(page).toHaveURL('http://localhost:3000/sign-in')
    await page.locator('input[name="email"]').fill('test@zubale.com')
    await page.locator('input[name="password"]').fill('password123')
    await page.locator('button:has-text("Sign In")').click()
    await expect(page.locator('div[role="alert"]:has-text("Success")')).toBeVisible()
  })
})
