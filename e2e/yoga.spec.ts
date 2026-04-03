import { test, expect } from '@playwright/test'

test.describe('Yoga Studio - Non-demo mode', () => {
  test('homepage loads with Drupal content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Serenity Yoga Studio/)
    // Hero section renders CMS content
    await expect(page.getByRole('heading', { name: 'Find Your Flow' })).toBeVisible()
  })

  test('classes listing page shows all classes', async ({ page }) => {
    await page.goto('/classes')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Classes')
    await expect(page.getByText('Vinyasa Flow')).toBeVisible()
    await expect(page.getByText('Yin Yoga')).toBeVisible()
    await expect(page.getByText('Power Yoga')).toBeVisible()
    await expect(page.getByText('Restorative Yoga')).toBeVisible()
  })

  test('class detail page renders content', async ({ page }) => {
    await page.goto('/classes/vinyasa-flow')
    await expect(page.getByRole('heading', { name: 'Vinyasa Flow' })).toBeVisible()
    await expect(page.getByText('breath-synchronized')).toBeVisible()
  })

  test('instructors listing page shows all instructors', async ({ page }) => {
    await page.goto('/instructors')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Instructors')
    await expect(page.getByText('Maya Patel')).toBeVisible()
    await expect(page.getByText('James Wu')).toBeVisible()
    await expect(page.getByText('Elena Rossi')).toBeVisible()
  })

  test('instructor detail page renders content', async ({ page }) => {
    await page.goto('/instructors/maya-patel')
    await expect(page.getByRole('heading', { name: 'Maya Patel' })).toBeVisible()
    await expect(page.getByText('Rishikesh')).toBeVisible()
  })

  test('retreats listing page shows all retreats', async ({ page }) => {
    await page.goto('/retreats')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Retreats')
    await expect(page.getByText('Bali Bliss Retreat')).toBeVisible()
    await expect(page.getByText('Sedona Soul Retreat')).toBeVisible()
    await expect(page.getByText('Costa Rica Renewal')).toBeVisible()
  })

  test('retreat detail page renders content', async ({ page }) => {
    await page.goto('/retreats/bali-bliss')
    await expect(page.getByRole('heading', { name: 'Bali Bliss Retreat' })).toBeVisible()
    await expect(page.getByText('Ubud, Bali')).toBeVisible()
  })

  test('about page renders content', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { name: 'About Serene Flow Yoga' })).toBeVisible()
    await expect(page.getByText('welcoming')).toBeVisible()
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')
    // Click Classes nav link
    await page.click('a[href="/classes"]')
    await expect(page).toHaveURL('/classes')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Classes')
  })
})
