import { expect, test } from '@playwright/test'
import axe from 'axe-core'

test('mobile menu and project carousel are operable by keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Open navigation' }).focus()
  await page.keyboard.press('Enter')

  const menuToggle = page.getByRole('button', { name: 'Close navigation' })
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('link', { name: 'About', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#about$/)
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )

  const nextProject = page.getByRole('button', { name: 'Next project' })
  await nextProject.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('group', { name: 'Project 2 of 4' })).toBeVisible()
  await expect(page.locator('.project-carousel .project-card')).toHaveCount(4)
  await expect(
    page.locator('.project-carousel .project-card[data-offset="0"] .project-visual-index'),
  ).toHaveText('02 / 4')
  await expect(page.locator('.project-carousel .project-card[data-offset="0"]')).toContainText(
    'Forgery Signature Verification System',
  )
})

test('floating WhatsApp shortcut opens a prefilled chat with VINTEQ', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const shortcut = page.getByRole('link', { name: 'Chat with VINTEQ on WhatsApp' })
  await expect(shortcut).toHaveAttribute(
    'href',
    'https://wa.me/917892199817?text=Hi%20VINTEQ%2C%20I%20have%20a%20project%20enquiry.',
  )
  expect(await shortcut.evaluate((link) => getComputedStyle(link).position)).toBe('fixed')
})

test('target viewport sizes have no horizontal overflow or clipped main heading', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport)
    const layout = await page.evaluate(() => {
      const heading = document.querySelector('main h1')
      const bounds = heading?.getBoundingClientRect()
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        headingLeft: bounds?.left ?? -1,
        headingRight: bounds?.right ?? Number.POSITIVE_INFINITY,
      }
    })

    expect(layout.scrollWidth, `${viewport.width}px horizontal overflow`).toBeLessThanOrEqual(
      layout.viewportWidth,
    )
    expect(layout.headingLeft, `${viewport.width}px heading left edge`).toBeGreaterThanOrEqual(0)
    expect(layout.headingRight, `${viewport.width}px heading right edge`).toBeLessThanOrEqual(
      viewport.width,
    )
  }
})

test('VINTEQ mark stays visible on the back of the laptop lid', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const mark = page.locator('.laptop-lid-back img')
  await expect(mark).toHaveJSProperty('complete', true)
  await expect
    .poll(() => mark.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0)

  const bounds = await mark.boundingBox()
  expect(bounds?.width).toBeGreaterThan(20)
  expect(bounds?.height).toBeGreaterThan(20)
})

test('contact form fields and email validation work at a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const form = page.locator('.contact-form')
  const email = form.getByLabel('Email address *')
  await form.getByLabel('Your name *').fill('Test Visitor')
  await email.fill('not-an-email')

  const layout = await form.evaluate((element) => {
    const bounds = element.getBoundingClientRect()
    return { left: bounds.left, right: bounds.right, width: window.innerWidth }
  })
  const hasInvalidEmail = await email.evaluate(
    (element: HTMLInputElement) => element.validity.typeMismatch,
  )

  expect(layout.left).toBeGreaterThanOrEqual(0)
  expect(layout.right).toBeLessThanOrEqual(layout.width)
  expect(hasInvalidEmail).toBe(true)
})

test('page meets the selected WCAG 2.1 A/AA automated checks', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(4100)
  await page.addScriptTag({ content: axe.source })

  const results = await page.evaluate(async () => {
    const axeRuntime = (window as Window & { axe: typeof axe }).axe
    return axeRuntime.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    })
  })
  expect(results.violations).toEqual([])
})
