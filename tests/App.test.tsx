import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'

const getContactForm = () => {
  const form = document.querySelector<HTMLFormElement>('.contact-form')
  if (!form) throw new Error('Contact form was not rendered')
  return form
}

const fillContactForm = async (user: ReturnType<typeof userEvent.setup>) => {
  const form = within(getContactForm())
  await user.type(form.getByLabelText(/your name/i), 'Test Visitor')
  await user.type(form.getByLabelText(/email address/i), 'visitor@example.com')
  await user.selectOptions(form.getByLabelText(/area of focus/i), 'Website Development')
  await user.type(
    form.getByLabelText(/what are you looking to solve/i),
    'I need a responsive website for my small business.',
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('site navigation', () => {
  it('opens the mobile navigation with the keyboard and closes it after choosing a link', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Open navigation' })

    toggle.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toHaveClass(
      'site-links-open',
    )

    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

describe('project carousel', () => {
  it('moves to the next project with the keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    const carousel = document.querySelector('.project-carousel')
    if (!carousel) throw new Error('Project carousel was not rendered')
    const next = within(carousel).getByRole('button', { name: 'Next project' })

    next.focus()
    await user.keyboard('{Enter}')

    expect(document.querySelector('.project-carousel-stage')).toHaveAttribute(
      'aria-label',
      'Project 2 of 4',
    )
    expect(carousel.querySelector('.project-card[data-offset="0"]')).toHaveTextContent(
      'Forgery Signature Verification System',
    )
    expect(carousel.querySelectorAll('.project-card')).toHaveLength(4)
    expect(within(carousel).getByText('02 / 4')).toBeInTheDocument()
    expect(within(carousel).getByText('04 / 4').closest('.project-card')).toHaveAttribute(
      'data-offset',
      '2',
    )
  })

  it('wraps from the first project to the last when moving backwards', async () => {
    const user = userEvent.setup()
    render(<App />)
    const carousel = document.querySelector('.project-carousel')
    if (!carousel) throw new Error('Project carousel was not rendered')
    const previous = within(carousel).getByRole('button', { name: 'Previous project' })

    await user.click(previous)

    expect(document.querySelector('.project-carousel-stage')).toHaveAttribute(
      'aria-label',
      'Project 4 of 4',
    )
    expect(carousel.querySelectorAll('.project-card')).toHaveLength(4)
    expect(within(carousel).getByText('04 / 4')).toBeInTheDocument()
  })
})

describe('WhatsApp shortcut', () => {
  it('links to VINTEQ WhatsApp with a prefilled project enquiry', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'Chat with VINTEQ on WhatsApp' })

    expect(link).toHaveAttribute(
      'href',
      'https://wa.me/917892199817?text=Hi%20VINTEQ%2C%20I%20have%20a%20project%20enquiry.',
    )
    expect(link).toHaveAttribute('target', '_blank')
  })
})

describe('contact form', () => {
  it('sends a valid enquiry and shows a confirmation state', async () => {
    const user = userEvent.setup()
    const startedAt = Date.now()
    vi.spyOn(Date, 'now').mockReturnValue(startedAt)
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, reference: 'VQ-20261112-A1B2C3D4' }),
    })
    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    const form = within(getContactForm())
    await fillContactForm(user)
    await user.click(form.getByRole('checkbox'))
    vi.spyOn(Date, 'now').mockReturnValue(startedAt + 1300)
    await user.click(form.getByRole('button', { name: 'Send enquiry' }))

    expect(
      await screen.findByRole('heading', { name: 'Thanks for reaching out.' }),
    ).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.web3forms.com/submit')
    const options = fetchMock.mock.calls[0][1] as RequestInit
    const payload = JSON.parse(options.body as string) as Record<string, string | boolean>
    expect(payload.access_key).toBeTruthy()
    expect(payload.replyto).toBe('visitor@example.com')
    expect(payload.email).toBe('visitor@example.com')
    expect(payload.message).toContain('I need a responsive website for my small business.')
    expect(payload.message).toContain('Reference: VQ-')
    expect(payload).not.toHaveProperty('captcha_token')
    expect(screen.queryByText(/confirmation email has been sent/i)).not.toBeInTheDocument()
  })

  it('shows an error when Web3Forms rejects the enquiry', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Please try again later.' }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const startedAt = Date.now()
    vi.spyOn(Date, 'now').mockReturnValue(startedAt)
    render(<App />)
    const form = within(getContactForm())
    await fillContactForm(user)
    await user.click(form.getByRole('checkbox'))
    vi.spyOn(Date, 'now').mockReturnValue(startedAt + 1300)
    await user.click(form.getByRole('button', { name: 'Send enquiry' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Please try again later.')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('explains when it cannot connect to Web3Forms', async () => {
    const user = userEvent.setup()
    const startedAt = Date.now()
    vi.spyOn(Date, 'now').mockReturnValue(startedAt)
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    const form = within(getContactForm())
    await fillContactForm(user)
    await user.click(form.getByRole('checkbox'))
    vi.spyOn(Date, 'now').mockReturnValue(startedAt + 1300)
    await user.click(form.getByRole('button', { name: 'Send enquiry' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /could not reach the enquiry service/i,
    )
    expect(fetchMock).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.any(Object))
  })

  it('requires privacy consent before submission', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render(<App />)
    const form = within(getContactForm())
    await fillContactForm(user)

    const consent = getContactForm().querySelector<HTMLInputElement>('[name="privacyConsent"]')
    expect(consent?.required).toBe(true)
    expect(consent?.checkValidity()).toBe(false)
    await user.click(form.getByRole('button', { name: 'Send enquiry' }))
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
