import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  FileText,
  Factory,
  Globe2,
  GraduationCap,
  HeartPulse,
  Layers3,
  Mail,
  Menu,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'

type Web3FormsResponse = { success?: boolean; message?: string }

const web3FormsAccessKey = '43a84f67-a527-41ee-b15d-744d5294aed0'

const serviceOptions = [
  'Website Development',
  'Web Application Development',
  'Custom Software Development',
  'AI / Machine Learning',
  'Business Process Automation',
  'UI/UX Design',
  'MVP Development',
  'Digital Transformation',
  'Other',
]

const serviceCards: { title: string; description: string; tags: string[]; icon: LucideIcon; solves: string; deliverables: string }[] = [
  { title: 'Custom software development', description: 'Purpose-built software for the way your business actually works—from internal tools to connected business systems.', tags: ['Management systems', 'Workflow tools', 'Integrations'], icon: Code2, solves: 'Replace disconnected tools, repetitive work, and processes that no longer fit your team.', deliverables: 'A scoped application, documented requirements, tested features, and a clear handover.' },
  { title: 'Web development', description: 'Responsive websites, web applications and commerce experiences designed around your audience and business goals.', tags: ['Business websites', 'Web apps', 'E-commerce'], icon: Globe2, solves: 'Improve an outdated web presence or make an online service easier to find and use.', deliverables: 'A responsive website or web application, agreed page flows, and deployment guidance.' },
  { title: 'AI & machine learning', description: 'Explore AI assistants, machine-learning workflows and predictive tools where they address a specific need.', tags: ['AI applications', 'ML workflows', 'Evaluation'], icon: Bot, solves: 'Find practical ways to work with information, automate a task, or support a human decision.', deliverables: 'A use-case assessment, prototype or scoped feature, and an evaluation plan.' },
  { title: 'Business process automation', description: 'Connect repetitive tasks, data handling and reporting so teams can focus on work that needs human attention.', tags: ['Workflow automation', 'Data processing', 'Reporting'], icon: Workflow, solves: 'Reduce manual handoffs and repeated data entry across the processes you already use.', deliverables: 'A mapped workflow, configured automation, validation steps, and operating notes.' },
  { title: 'UI/UX design', description: 'Turn user needs into clear journeys, wireframes and interface designs that are ready to build and test.', tags: ['User research', 'Prototypes', 'Interface design'], icon: Palette, solves: 'Clarify a confusing product journey or test an idea before committing to a full build.', deliverables: 'Research findings, user flows, wireframes, interactive prototypes, and interface assets.' },
  { title: 'MVP & digital product development', description: 'Move from an early idea toward a focused, testable product with a considered plan for what comes next.', tags: ['Product planning', 'MVP engineering', 'Launch'], icon: Rocket, solves: 'Validate the core value of an idea without building every possible feature up front.', deliverables: 'A prioritised product scope, prototype or MVP, testing notes, and next-step recommendations.' },
]

const projectExamples = [
  { title: 'GreenLink', category: 'Agriculture technology', description: 'An agriculture technology and direct-to-consumer platform project example.', visual: 'farm' },
  { title: 'Forgery Signature Verification System', category: 'AI & machine learning', description: 'A digital signature verification system in the AI and machine-learning domain.', visual: 'signature' },
  { title: 'Face Attendance System', category: 'Computer vision & automation', description: 'A face-based attendance system in the computer vision and automation domain.', visual: 'attendance' },
  { title: 'Muti-Agent AI For Team Collabration', category: 'Multi-agent AI', description: 'A multi-agent AI collaboration platform project example.', visual: 'yogastra' },
]

const faqs = [
  { question: 'What services does VINTEQ offer?', answer: 'VINTEQ works on custom software, websites and web applications, AI and machine learning, workflow automation, and UI/UX design. We can also help shape an early product into a prototype or MVP. The right service depends on your users, goals, and constraints.' },
  { question: 'How much does a project cost?', answer: 'Cost depends on the features, integrations, design, and complexity involved. We first clarify what you need and what can be delivered in stages. Once the scope is understood, we can discuss a suitable estimate before work begins.' },
  { question: 'How long does a project take?', answer: 'Timing depends on the scope, feedback, and any external integrations. After discussing your requirements, we can outline practical milestones and an expected schedule. If priorities change, we’ll discuss how that affects the plan.' },
  { question: 'Can you build software for my business?', answer: 'Yes. We can explore a custom application or workflow tool around how your team works. We’ll first understand the users, current process, and desired outcome, then recommend a focused scope that can grow with your needs.' },
  { question: 'Can VINTEQ help with an AI idea?', answer: 'Yes. We can review the use case, available data, expected value, and risks before recommending an approach. If AI is a good fit, we can explore a small prototype and keep people involved where review or decisions matter.' },
  { question: 'Do you build websites and e-commerce platforms?', answer: 'Yes. VINTEQ works on responsive websites, web applications, and e-commerce experiences. We can discuss your audience, content, essential features, and integrations, then shape a clear design and build scope for your requirements.' },
  { question: 'Do you work with startups and early-stage ideas?', answer: 'Yes. We can help turn an early idea into a clearer problem, audience, and first set of features. Together we can identify what to validate in a prototype or MVP before investing in a larger product.' },
  { question: 'What happens during requirement analysis?', answer: 'We discuss who will use the solution, what they need to do, and how the work happens today. We also identify constraints, integrations, and priorities. The result is a shared view of the scope and next steps.' },
  { question: 'How can I start a project?', answer: 'Use the enquiry form to describe the challenge, your desired outcome, and any useful timing or budget context. You don’t need a complete specification. VINTEQ will review your message and reply by email to discuss next steps.' },
]

const insights = [
  { title: 'A practical first step for business digital transformation', summary: 'Map the work people do today before choosing what to digitise.', keywords: 'business digital transformation, process mapping' },
  { title: 'When does a business need custom software?', summary: 'Recognise when existing tools and workarounds are no longer serving a process.', keywords: 'custom software development, business applications' },
  { title: 'Planning an MVP around what you need to learn', summary: 'Focus an early product on a clear question, audience and testable workflow.', keywords: 'MVP development, startup product planning' },
  { title: 'A grounded way to evaluate an AI use case', summary: 'Consider data quality, human review and failure modes alongside potential value.', keywords: 'AI development, machine learning use cases' },
  { title: 'What makes a business website easier to use?', summary: 'Clear structure, useful content and accessible interactions are a strong foundation.', keywords: 'website development, web design usability' },
  { title: 'Reducing repetitive work with workflow automation', summary: 'Start with handoffs and repeated tasks that can be described and measured.', keywords: 'business process automation, workflow automation' },
  { title: 'From requirements to a useful software scope', summary: 'Turn goals, constraints and user needs into a shared project baseline.', keywords: 'software requirements, project discovery' },
  { title: 'Why prototypes help teams make product decisions', summary: 'Use a prototype to explore a journey before investing in a complete implementation.', keywords: 'UI UX prototyping, product design' },
  { title: 'Choosing the right first features for a web application', summary: 'Prioritise the core user task and the supporting flows it truly depends on.', keywords: 'web application development, product scope' },
  { title: 'Connecting business systems without losing sight of the process', summary: 'Plan integrations around data ownership, errors and operational responsibilities.', keywords: 'system integration, business software' },
  { title: 'How user research informs interface design', summary: 'Learn how observation and feedback can shape clearer product interactions.', keywords: 'user research, UI UX design' },
  { title: 'What to clarify before an e-commerce build', summary: 'Review catalogue, payment, fulfilment and support needs before estimating work.', keywords: 'e-commerce development, online store planning' },
  { title: 'Testing an AI feature before making it part of a workflow', summary: 'Define acceptable outcomes and human fallback paths before wider use.', keywords: 'AI testing, responsible AI product' },
  { title: 'Technology planning for growing small businesses', summary: 'Make choices that match current needs while leaving room for change.', keywords: 'SME technology, software planning India' },
  { title: 'A better handover for long-term software ownership', summary: 'Documentation, access and operational knowledge are part of delivery.', keywords: 'software project handover, application maintenance' },
]

const industries: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Healthcare', description: 'Explore digital workflows and tools for care teams.', icon: HeartPulse },
  { title: 'Education', description: 'Support learning, administration and communication.', icon: GraduationCap },
  { title: 'Retail & commerce', description: 'Improve digital storefronts and commerce operations.', icon: ShoppingBag },
  { title: 'Agriculture', description: 'Connect agricultural workflows with digital platforms.', icon: Sprout },
  { title: 'Manufacturing', description: 'Make operational information easier to manage.', icon: Factory },
  { title: 'Startups & SMEs', description: 'Shape practical products around real business needs.', icon: BriefcaseBusiness },
]

const processSteps = [
  { title: 'Discovery', description: 'Understand the business challenge, users and desired outcome.' },
  { title: 'Requirement analysis', description: 'Clarify workflows, scope, constraints and dependencies.' },
  { title: 'Strategy & planning', description: 'Agree priorities, milestones, risks and an achievable plan.' },
  { title: 'UI/UX design', description: 'Shape user journeys and test the interface before build.' },
  { title: 'Development', description: 'Build in reviewable increments against agreed requirements.' },
  { title: 'Testing & QA', description: 'Check the experience, functionality and agreed acceptance criteria.' },
  { title: 'Deployment', description: 'Prepare a documented release and handover for the target environment.' },
  { title: 'Support', description: 'Discuss maintenance and next steps based on the project needs.' },
]

function App() {
  return <PublicSite />
}

function BrandLogo({ className = '' }: { className?: string }) {
  return <img className={`brand-image ${className}`} src={className.includes('on-dark') ? '/vinteq-logo-light.png' : '/vinteq-logo.png'} alt="VINTEQ" />
}

function PublicSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageEntered, setPageEntered] = useState(false)
  const [introActive, setIntroActive] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [introRevealing, setIntroRevealing] = useState(false)
  const [enquiryReference, setEnquiryReference] = useState('')
  const [enquiryEmail, setEnquiryEmail] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const laptopRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const projectCarouselRef = useRef<HTMLDivElement>(null)
  const [projectCursor, setProjectCursor] = useState(projectExamples.length)
  const [projectTurn, setProjectTurn] = useState<'next' | 'previous' | null>(null)
  const [carouselInstant, setCarouselInstant] = useState(false)
  const [projectsInView, setProjectsInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const formStartedAt = useRef(Date.now())
  const lastSubmissionAt = useRef(0)
  useEffect(() => {
    const intro = introRef.current
    const headerLogo = document.querySelector<HTMLElement>('.site-logo .site-brand-image')
    const introLogo = intro?.querySelector<HTMLImageElement>('.brand-intro-logo')
    if (intro && headerLogo && introLogo) {
      const splash = intro.getBoundingClientRect()
      const target = headerLogo.getBoundingClientRect()
      const source = introLogo.getBoundingClientRect()
      const targetX = target.left + target.width / 2 - (splash.left + splash.width / 2)
      const targetY = target.top + target.height / 2 - (splash.top + splash.height / 2)
      intro.style.setProperty('--intro-logo-x', `${targetX}px`)
      intro.style.setProperty('--intro-logo-y', `${targetY}px`)
      const targetScale = target.width / (introLogo.offsetWidth || source.width)
      intro.style.setProperty('--intro-logo-scale', String(targetScale))
    }

    const revealAndMoveTimer = window.setTimeout(() => {
      setIntroExiting(true)
      setPageEntered(true)
      setIntroRevealing(true)
    }, 2300)
    const removeTimer = window.setTimeout(() => setIntroActive(false), 3550)
    return () => {
      window.clearTimeout(revealAndMoveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }
    const shell = document.querySelector('.site-shell')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px' })
    const revealItems = document.querySelectorAll<HTMLElement>('.capability-strip > *, .intro-copy, .intro-stamp, .section-header, .why-heading, .service-card, .why-card, .industry-card, .industry-disclaimer, .approach-visual, .approach-copy, .process-step, .process-details article, .technology-copy, .technology-orbit, .project-disclaimer, .project-card, .insight-card, .faq-intro, .faq-item, .contact-left, .enquiry-panel, .closing-band > *, .site-footer > *')
    const revealGroups = new Map<Element, number>()
    revealItems.forEach((element) => {
      element.classList.add('scroll-reveal')
      const group = element.closest('section') ?? element.parentElement
      if (group) {
        const index = revealGroups.get(group) ?? 0
        revealGroups.set(group, index + 1)
        element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 35}ms`)
        if (element.matches('.service-card, .why-card, .industry-card, .process-details article, .project-card, .insight-card, .faq-item')) {
          element.classList.add('scroll-reveal-card')
          element.style.setProperty('--reveal-tilt', index % 2 === 0 ? '0.8deg' : '-0.8deg')
        }
      }
      observer.observe(element)
    })
    shell?.classList.add('scroll-reveals-ready')
    return () => {
      observer.disconnect()
      shell?.classList.remove('scroll-reveals-ready')
    }
  }, [])
  useEffect(() => {
    const laptop = laptopRef.current
    const about = document.getElementById('about')
    if (!laptop || !about) return

    let ticking = false
    let disposed = false
    let frameId = 0
    let transitionStart = 0
    let transitionEnd = 1
    let laptopWidth = 0
    let laptopHeight = 0
    let aboutHeight = 0
    let viewportWidth = 0
    let viewportHeight = 0
    let baseX = 0
    let baseY = 0
    let aboutTop = 0
    let homeTextRight = 0
    let copyLeft = 0
    const measureLaptopScene = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      laptopWidth = laptop.offsetWidth
      laptopHeight = laptop.offsetHeight
      aboutHeight = about.offsetHeight
      baseX = viewportWidth * 0.56
      baseY = viewportHeight * 0.2
      aboutTop = about.getBoundingClientRect().top + window.scrollY
      transitionStart = Math.max(0, aboutTop - viewportHeight)
      transitionEnd = Math.max(transitionStart + 1, aboutTop)
      homeTextRight = document.querySelector('.hero-content')?.getBoundingClientRect().right ?? viewportWidth * 0.44
      copyLeft = about.querySelector('.intro-copy')?.getBoundingClientRect().left ?? about.getBoundingClientRect().left
    }
    const updateLaptopPosition = () => {
      if (ticking) return
      ticking = true
      frameId = window.requestAnimationFrame(() => {
        if (disposed) {
          ticking = false
          return
        }
        const scrollY = window.scrollY
        const progress = Math.min(1, Math.max(0, (scrollY - transitionStart) / (transitionEnd - transitionStart)))
        const desiredStartX = viewportWidth <= 620
          ? viewportWidth - laptopWidth - 12
          : homeTextRight + 24
        const startX = Math.max(12, Math.min(viewportWidth - laptopWidth - 12, desiredStartX))
        const endX = viewportWidth <= 620
          ? (viewportWidth - laptopWidth) / 2
          : Math.max(12, copyLeft - laptopWidth - 60)
        const startY = viewportWidth <= 620
          ? Math.max(460, Math.min(viewportHeight * 0.74, viewportHeight - laptop.offsetHeight - 8))
          : Math.max(110, Math.min(viewportHeight * 0.23, 205))
        const endY = viewportWidth <= 620
          ? Math.max(48, Math.min(viewportHeight * 0.1, 84))
          : Math.max(84, Math.min(viewportHeight * 0.16, aboutHeight - laptopHeight - 24))
        const isLanded = progress >= 1
        const isParked = isLanded
        const x = isParked ? endX + window.scrollX : startX + (endX - startX) * progress
        const y = isParked ? aboutTop + endY : startY + (endY - startY) * progress
        laptop.style.setProperty('--laptop-x', `${x - baseX}px`)
        laptop.style.setProperty('--laptop-y', `${y - baseY}px`)
        laptop.style.opacity = '1'
        laptop.classList.toggle('is-landed', isLanded)
        laptop.classList.toggle('is-parked', isParked)
        laptop.style.setProperty('--laptop-spin', `${-12 + progress * 360}deg`)
        laptop.style.setProperty('--laptop-tilt', `${10 - progress * 6}deg`)
        laptop.style.setProperty('--laptop-scale', '1')
        laptop.style.setProperty('--laptop-scroll-progress', String(progress))
        ticking = false
      })
    }
    const measureAndUpdate = () => {
      measureLaptopScene()
      updateLaptopPosition()
    }
    measureLaptopScene()
    updateLaptopPosition()
    void document.fonts.ready.then(() => {
      if (!disposed) measureAndUpdate()
    })
    window.addEventListener('scroll', updateLaptopPosition, { passive: true })
    window.addEventListener('resize', measureAndUpdate)
    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateLaptopPosition)
      window.removeEventListener('resize', measureAndUpdate)
    }
  }, [])
  useEffect(() => {
    let ticking = false
    const updateScrollProgress = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0
        document.documentElement.style.setProperty('--page-scroll-progress', String(Math.min(1, Math.max(0, progress))))
        ticking = false
      })
    }
    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])
  useEffect(() => {
    const carousel = projectCarouselRef.current
    if (!carousel) return
    const observer = new IntersectionObserver(([entry]) => setProjectsInView(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(carousel)
    return () => {
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    if (!projectsInView || projectTurn || !pageVisible || carouselInstant) return
    const timer = window.setTimeout(() => {
      setProjectTurn('next')
      setProjectCursor((cursor) => cursor + 1)
    }, 6000)
    return () => window.clearTimeout(timer)
  }, [carouselInstant, pageVisible, projectCursor, projectTurn, projectsInView])
  useEffect(() => {
    if (!projectTurn) return
    const timer = window.setTimeout(() => {
      setProjectTurn(null)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 260 : 920)
    return () => window.clearTimeout(timer)
  }, [projectTurn, projectCursor])
  useEffect(() => {
    const count = projectExamples.length
    if (projectCursor >= count * 2 || projectCursor < count) {
      const timer = window.setTimeout(() => {
        setCarouselInstant(true)
        setProjectCursor((cursor) => {
          let next = cursor
          while (next >= count * 2) next -= count
          while (next < count) next += count
          return next
        })
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 240 : 900)
      return () => window.clearTimeout(timer)
    }
  }, [projectCursor])
  useEffect(() => {
    if (!carouselInstant) return
    const frame = window.requestAnimationFrame(() => setCarouselInstant(false))
    return () => window.cancelAnimationFrame(frame)
  }, [carouselInstant])
  useEffect(() => {
    const handleVisibilityChange = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])
  const turnProject = (direction: 'next' | 'previous') => {
    if (carouselInstant) return
    setProjectTurn(direction)
    setProjectCursor((cursor) => cursor + (direction === 'next' ? 1 : -1))
  }
  const activeProjectIndex = ((projectCursor % projectExamples.length) + projectExamples.length) % projectExamples.length
  const projectSlides = [0, 1, 2].flatMap((copy) => projectExamples.map((project, index) => ({
    ...project,
    slideKey: `${copy}-${project.title}`,
    slideIndex: copy * projectExamples.length + index,
  })))
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmissionError('')
    const form = event.currentTarget
    const formData = new FormData(form)
    if (String(formData.get('website') ?? '').trim()) {
      setSubmissionError('We could not verify this enquiry. Please review the form and try again.')
      return
    }
    if (Date.now() - formStartedAt.current < 1200) {
      setSubmissionError('Please take a moment to complete the enquiry before sending it.')
      return
    }
    if (Date.now() - lastSubmissionAt.current < 30000) {
      setSubmissionError('Please wait a moment before submitting another enquiry.')
      return
    }
    setIsSubmitting(true)
    try {
      const email = String(formData.get('email') ?? '')
      const name = String(formData.get('name') ?? '')
      const reference = `VQ-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      formData.set('access_key', web3FormsAccessKey)
      formData.set('from_name', 'VINTEQ Website')
      formData.set('subject', `New VINTEQ enquiry: ${name.replace(/[\r\n]+/g, ' ').slice(0, 100)}`)
      formData.set('replyto', email)
      formData.set('message', `${String(formData.get('description') ?? '')}\n\nReference: ${reference}`)
      formData.delete('description')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      let result: Web3FormsResponse
      try {
        result = await response.json() as Web3FormsResponse
      } catch {
        setSubmissionError('The enquiry service returned an unexpected response. Please try again or email us directly.')
        return
      }
      if (!response.ok || result.success !== true) {
        setSubmissionError(result.message ?? 'We could not send your enquiry. Please try again or email us directly.')
        return
      }
      setEnquiryReference(reference)
      setEnquiryEmail(email)
      lastSubmissionAt.current = Date.now()
      formStartedAt.current = Date.now()
      form.reset()
    } catch {
      setSubmissionError('We could not reach Web3Forms. Check your internet connection and try again, or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleScenePointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--pointer-x', `${((x + 0.5) * 100).toFixed(2)}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${((y + 0.5) * 100).toFixed(2)}%`)
  }
  const resetScenePointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--pointer-x', '72%')
    event.currentTarget.style.setProperty('--pointer-y', '44%')
  }
  const nav = ['About', 'Services', 'Portfolio', 'Industries', 'Insights', 'Contact']
  return <>
    <div className="laptop-scene" ref={laptopRef} role="img" aria-label="Animated 3D laptop showing code in a VS Code-style editor, with the VINTEQ logo on its lid">
      <div className="laptop-model">
        <div className="laptop-lid">
          <div className="laptop-screen">
            <div className="vscode-window">
              <div className="vscode-titlebar"><span className="vscode-app-icon">◇</span><span>VINTEQ — studio.tsx</span><i>—　□　×</i></div>
              <div className="vscode-toolbar"><span>File　 Edit　 Selection　 View　 Go　 Run</span><b>● ● ●</b></div>
              <div className="vscode-workspace">
                <aside className="vscode-activity"><span>◫</span><span>⌕</span><span>⑂</span><span>▤</span><i>⚙</i></aside>
                <aside className="vscode-explorer"><b>EXPLORER</b><span>⌄　VINTEQ</span><small>⌄　src</small><small className="vscode-file-active">▣　studio.tsx</small><small>◇　index.css</small><small>◇　App.tsx</small><small>⌄　public</small><small>　vite.config.ts</small></aside>
                <div className="vscode-editor">
                  <div className="vscode-tab"><span>◉　studio.tsx</span><i>×</i></div>
                  <div className="vscode-code" aria-hidden="true">
                    <span><i>1</i><b>const</b> <strong>studio</strong> = {'{'}</span>
                    <span><i>2</i>　name: <em>'VINTEQ'</em>,</span>
                    <span><i>3</i>　focus: [<em>'software'</em>,</span>
                    <span><i>4</i>　　　　 <em>'AI'</em>, <em>'ideas'</em>],</span>
                    <span><i>5</i>　build: <b>async</b> () =&gt; {'{'}</span>
                    <span><i>6</i>　　<span className="vscode-cursor">create</span>(<em>'what matters'</em>)</span>
                    <span><i>7</i>　{'}'},</span>
                    <span><i>8</i>{'}'};</span>
                  </div>
                  <div className="vscode-terminal">
                    <div><b>TERMINAL</b><span>OUTPUT　DEBUG CONSOLE</span></div>
                    <p><i>PS C:\VINTEQ&gt;</i><span>npm run dev</span><em>_</em></p>
                    <small>VITE ready　Local: localhost:5173</small>
                  </div>
                  <div className="vscode-status"><span>⎇ main　✓ Ready</span><span>TypeScript　UTF-8</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-lid-back"><img src="/vinteq-mark-light.png" alt="" /><span>VINTEQ</span></div>
        </div>
        <div className="laptop-base">
          <span className="laptop-speaker laptop-speaker-left" />
          <span className="laptop-keyboard" aria-hidden="true">{Array.from({ length: 52 }, (_, index) => <i key={index} />)}</span>
          <span className="laptop-speaker laptop-speaker-right" />
          <span className="laptop-trackpad" />
          <span className="laptop-front-edge" />
          <span className="laptop-hinge" />
        </div>
      </div>
      <div className="laptop-brand-badge"><img src="/vinteq-mark-light.png" alt="" /><span><b>VINTEQ</b><small>ENGINEERING INTELLIGENCE</small></span></div>
      <div className="laptop-shadow" />
    </div>
    {introActive && <div ref={introRef} className={`brand-intro ${introExiting ? 'is-exiting' : ''} ${introRevealing ? 'is-revealing' : ''}`} aria-hidden="true"><span className="brand-intro-mark-wrap"><img className="brand-intro-mark" src="/vinteq-mark-light.png" alt="" /></span><img className="brand-intro-logo" src="/vinteq-logo-light.png" alt="" /></div>}
    <div className={`site-shell ${pageEntered ? 'is-loaded' : ''} ${introActive ? 'is-intro-active' : ''} ${introRevealing ? 'is-intro-revealing' : ''}`}>
    <div className="site-scroll-progress" aria-hidden="true"><span /></div>
    <header className="site-nav"><a className="site-logo" href="#home" aria-label="VINTEQ home" onClick={() => setMenuOpen(false)}><BrandLogo className="site-brand-image on-dark" /></a><nav id="site-navigation" aria-label="Primary navigation" className={menuOpen ? 'site-links site-links-open' : 'site-links'}>{nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav><div className="site-nav-actions"><a className="site-cta" href="#contact">Let’s talk <ArrowRight size={14} /></a></div><button className="site-mobile-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></header>
    <main>
      <section className="hero-section" id="home" onPointerMove={handleScenePointer} onPointerLeave={resetScenePointer}><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-code-field" aria-hidden="true">
          <span className="code-float code-float-binary">01 <i>10</i> 01</span>
          <span className="code-float code-float-braces">{'{ }'}</span>
          <span className="code-float code-float-tag">&lt;/&gt;</span>
          <span className="code-float code-float-bits">0 <b>1</b> 0 1</span>
          <span className="code-float code-float-terminal"><i>›</i> npm run build <b>✓</b></span>
          <span className="code-float code-float-function">λ()</span>
        </div>
        <div className="hero-content"><div className="hero-eyebrow"><span className="hero-dot" /> VINTEQ · BENGALURU, INDIA</div><h1>Turning  ideas<br /><span>into  intelligent</span><br />digital  solutions<span className="hero-period">.</span></h1><p>From business applications to AI-powered innovation, VINTEQ engineers digital solutions that help businesses move forward.</p><div className="hero-actions"><a className="site-cta hero-cta" href="#contact">Start a project <ArrowRight size={15} /></a><a className="hero-work-link" href="#portfolio">Explore our work <ArrowDownRight size={15} /></a></div><div className="hero-trust"><span className="hero-proof-icon"><ShieldCheck size={16} /></span><span>Founder-led technology practice.<br /><strong>Practical, business-focused engineering.</strong></span></div></div>
        <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div><div className="hero-index">01 <span>/</span> 04</div>
      </section>
      <div className="capability-strip"><span>AREAS OF FOCUS</span><b>Software</b><i /><b>Web</b><i /><b>AI & ML</b><i /><b>Automation</b><i /><b>Product design</b><i /><b>Digital products</b></div>
      <section className="intro-section" id="about"><div className="intro-copy"><div className="section-kicker"><span className="section-spark">✳</span> ABOUT VINTEQ</div><h2>Technology that moves<br />businesses <em>forward.</em></h2><p>VINTEQ is an emerging, founder-led technology services. We help startups, SMEs and organisations turn business challenges into practical digital solutions through software engineering, modern web technologies and AI. Our mission is to make thoughtful engineering useful in the work businesses do; our vision is technology that creates room for people and organisations to grow.</p><a className="dark-text-link" href="#our-approach">How we approach the work <ArrowRight size={15} /></a></div><div className="intro-stamp"><span>IDEAS<br />INTO IMPACT</span><i>✳</i><small>ENGINEERING · DESIGN</small></div></section>
      <section className="services-section" id="services"><div className="section-header"><div><div className="section-kicker"><span className="section-spark">✳</span> HOW VINTEQ CAN HELP</div><h2>Made for the work<br /><em>you need to do.</em></h2></div><p>Start with a clear business need.<br />Choose the right solution together.</p></div><div className="services-grid">
        {serviceCards.map((service, index) => <ServiceCard key={service.title} number={`0${index + 1}`} title={service.title} description={service.description} tags={service.tags} icon={service.icon} solves={service.solves} deliverables={service.deliverables} />)}
      </div></section>
      <section className="why-section"><div className="why-heading"><div className="section-kicker"><span className="section-spark">✳</span> WHY VINTEQ</div><h2>Good engineering starts<br />with <em>understanding.</em></h2><p>Technology is most useful when it serves the people and business behind it.</p></div><div className="why-grid">
        <WhyCard icon={<BriefcaseBusiness size={17} />} title="Business-first thinking" text="Start with the problem, your users and the outcome you need." />
        <WhyCard icon={<Layers3 size={17} />} title="Built for your context" text="Shape the solution around your workflows, constraints and goals." />
        <WhyCard icon={<Database size={17} />} title="Room to grow" text="Make considered architecture choices that support the next stage." />
        <WhyCard icon={<Users size={17} />} title="Clear collaboration" text="Keep decisions, milestones and next steps visible throughout the work." />
        <WhyCard icon={<Cpu size={17} />} title="Modern, practical tools" text="Use emerging technology when it solves a real need—not for novelty." />
        <WhyCard icon={<CheckCircle2 size={17} />} title="End-to-end delivery" text="Move from discovery and design through build, testing and handover." />
      </div></section>
      <section className="industries-section" id="industries"><div className="section-header"><div><div className="section-kicker"><span className="section-spark">✳</span> PROBLEMS ACROSS MANY FIELDS</div><h2>Industry context.<br /><em>Engineering craft.</em></h2></div><p>Explore a conversation around your sector.<br />Every solution starts with your needs.</p></div><div className="industry-grid">{industries.map(({ title, description, icon: Icon }) => <a key={title} className="industry-card" href="#contact"><Icon size={20} /><span><b>{title}</b><small>{description}</small></span><ArrowUpRight size={15} /></a>)}</div><p className="industry-disclaimer">These are areas VINTEQ can explore with you—not a list of claimed clients or deployments.</p></section>
      <section className="approach-section" id="our-approach"><div className="approach-visual"><div className="approach-circle approach-circle-outer" /><div className="approach-circle approach-circle-mid" /><div className="approach-circle approach-circle-inner"><span>IDEA</span><i>✳</i><span>IMPACT</span></div><span className="approach-side-label">A CLEAR PATH, BUILT TOGETHER</span><div className="approach-tag approach-tag-a">listen closely</div><div className="approach-tag approach-tag-b">make it real</div></div><div className="approach-copy"><div className="section-kicker"><span className="section-spark">✳</span> A THOUGHTFUL PROCESS</div><h2>Understand first.<br /><em>Build with purpose.</em></h2><p>Progress is easier to trust when the next step is clear. Work together through discovery, planning, design, development, testing and handover.</p><a className="dark-text-link" href="#contact">Talk through your project <ArrowRight size={15} /></a></div></section>
      <section className="process-section"><div className="section-header"><div><div className="section-kicker"><span className="section-spark">✳</span> FROM FIRST CONVERSATION TO LAUNCH</div><h2>A process with<br /><em>room to think.</em></h2></div><p>Each step keeps the work grounded,<br />understood and moving forward.</p></div><div className="process-track">{processSteps.map(({ title }, index) => <a key={title} href="#contact" className="process-step"><span>{String(index + 1).padStart(2, '0')}</span><i /><strong>{title}</strong></a>)}</div><div className="process-details">{processSteps.map(({ title, description }, index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="technology-section"><div className="technology-copy"><div className="section-kicker"><span className="section-spark">✳</span> TECHNOLOGY, WITH INTENTION</div><h2>Choose the tool<br />for the <em>job.</em></h2><p>VINTEQ explores technologies to match the problem, users, security needs and long-term ownership. The right stack is a project decision—not a promise made by a logo wall.</p><a className="dark-text-link" href="#contact">Discuss your requirements <ArrowRight size={15} /></a></div><div className="technology-orbit" aria-label="Technology capabilities"><div className="technology-core"><BrandLogo className="portfolio-mark on-dark" /></div><span className="tech-chip tech-chip-one">Web platforms</span><span className="tech-chip tech-chip-two">AI & ML</span><span className="tech-chip tech-chip-three">APIs & integrations</span><span className="tech-chip tech-chip-four">Data workflows</span><i /><i /><i /><i /></div></section>
      <section className="work-section" id="portfolio">
        <div className="section-header work-heading">
          <div><div className="section-kicker"><span className="section-spark">✳</span> PROJECT EXAMPLES</div><h2>Ideas in<br /><em>digital form.</em></h2></div>
          <a className="dark-text-link" href="#contact">Discuss a project <ArrowRight size={15} /></a>
        </div>
        <p className="project-disclaimer">Examples supplied for this portfolio. Delivery status, technologies, client relationships and outcomes have not been independently specified; no commercial deployment or result is implied.</p>
        <div
          className={`project-carousel${carouselInstant ? ' is-instant' : ''}${projectTurn ? ` is-turning-${projectTurn}` : ''}`}
          ref={projectCarouselRef}
          aria-label="Portfolio projects"
        >
          <button className="project-carousel-arrow project-carousel-arrow-left" type="button" aria-label="Previous project" onClick={() => turnProject('previous')}><ArrowLeft size={20} /></button>
          <div className="project-carousel-stage" role="group" aria-roledescription="slide" aria-label={`Project ${activeProjectIndex + 1} of ${projectExamples.length}`}>
            {projectSlides.map((project) => {
              const offset = project.slideIndex - projectCursor
              return <ProjectCard
                key={project.slideKey}
                {...project}
                number={project.slideIndex % projectExamples.length + 1}
                offset={offset}
                ariaHidden={offset !== 0}
              />
            })}
          </div>
          <button className="project-carousel-arrow project-carousel-arrow-right" type="button" aria-label="Next project" onClick={() => turnProject('next')}><ArrowRight size={20} /></button>
          <div className="project-carousel-count" aria-live="polite" aria-label={`Project ${activeProjectIndex + 1} of ${projectExamples.length}`}>
            <span className="sr-only">Project {activeProjectIndex + 1} of {projectExamples.length}</span>
            {projectExamples.map((project, index) => <i key={project.title} className={index === activeProjectIndex ? 'is-active' : ''} aria-hidden="true" />)}
          </div>
        </div>
      </section>
      <section className="insights-section" id="insights"><div className="section-header"><div><div className="section-kicker"><span className="section-spark">✳</span> INSIGHTS & IDEAS</div><h2>Better questions.<br /><em>Better technology.</em></h2></div><p>A few practical notes for teams exploring<br />software, AI and digital products.</p></div><div className="insights-grid">{insights.slice(0, 3).map((article, index) => <article className="insight-card" key={article.title}><div className="insight-card-top"><span>FIELD NOTES · {String(index + 1).padStart(2, '0')}</span></div><h3>{article.title}</h3><p>{article.summary}</p><small>Explore: {article.keywords}</small></article>)}</div></section>
      <section className="faq-section" id="faq"><div className="faq-intro"><div className="section-kicker"><span className="section-spark">✳</span> FREQUENTLY ASKED</div><h2>Clear answers<br /><em>to start with.</em></h2><p>Have a question that isn’t covered? Share your project context and we can explore it together.</p><a className="dark-text-link" href="#contact">Ask about your project <ArrowRight size={15} /></a></div><div className="faq-list">{faqs.map(({ question, answer }, index) => <details className="faq-item" key={question}><summary><span><i>{String(index + 1).padStart(2, '0')}</i>{question}</span><ChevronDown size={16} /></summary><p>{answer}</p></details>)}</div></section>
      <section className="contact-section" id="contact"><div className="contact-left"><div className="section-kicker"><span className="section-spark">✳</span> YOUR IDEA, YOUR NEXT STEP</div><h2>Have an idea?<br /><em>Let’s build it.</em></h2><p>Tell us what you want to improve or create. VINTEQ is based in Bengaluru and works with startups, SMEs and organisations looking for practical digital solutions.</p><div className="contact-details"><span><Globe2 size={14} /> Bengaluru, Karnataka, India</span><a href="tel:+917892199817"><Phone size={14} /> +91 78921 99817</a><a href="mailto:vinithdidgi65@gmail.com"><Mail size={14} /> vinithdidgi65@gmail.com</a><span><i>✳</i> Founder-led technology practice</span></div></div><div className="enquiry-panel">{enquiryReference ? <div className="enquiry-success" role="status"><span className="success-icon"><CheckCircle2 size={25} /></span><div className="section-kicker">ENQUIRY SENT</div><h3>Thanks for reaching out.</h3><p>Your request was sent to VINTEQ. We’ll reply to <strong>{enquiryEmail}</strong>. Reference <strong>{enquiryReference}</strong>.</p><button className="site-cta" type="button" onClick={() => { setEnquiryReference(''); setEnquiryEmail(''); setSubmissionError(''); formStartedAt.current = Date.now() }}>Send another enquiry <ArrowRight size={15} /></button></div> : <form className="contact-form" onSubmit={handleSubmit}>
        <div className="enquiry-form-heading"><span>START A PROJECT</span><small><i /> Sent to VINTEQ’s inbox</small></div>
        <div className="form-row"><label className="form-field"><span>Your name <i>*</i></span><input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label><label className="form-field"><span>Email address <i>*</i></span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label></div>
        <div className="form-row"><label className="form-field"><span>Company or organisation</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Optional" /></label><label className="form-field"><span>Area of focus <i>*</i></span><select name="service" required defaultValue=""><option value="" disabled>Choose a service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div>
        <label className="form-field"><span>What are you looking to solve? <i>*</i></span><textarea name="description" rows={4} minLength={20} maxLength={3000} required placeholder="Share a little about the challenge and what a good outcome looks like." /></label>
        <details className="optional-project-details"><summary>Planning details <span>(optional)</span><ChevronDown size={16} /></summary><div className="form-row"><label className="form-field"><span>Estimated budget</span><select name="budget" defaultValue="Not decided"><option>Below ₹10,000</option><option>₹10,000–₹25,000</option><option>₹25,000–₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000+</option><option>Not decided</option></select></label><label className="form-field"><span>Expected timeline</span><select name="timeline" defaultValue="Not decided"><option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>More than 6 months</option><option>Not decided</option></select></label></div></details>
        <label className="honeypot-field" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        {submissionError && <p className="form-error" role="alert">{submissionError}</p>}
        <div className="contact-submit-row"><span><ShieldCheck size={14} /> Your details are sent to VINTEQ by email.</span><button className="site-cta" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowRight size={15} /></button></div>
        <p className="form-privacy">Your details will be used to respond to your enquiry. Please don’t include passwords or sensitive personal information.</p>
      </form>}</div></section>
      <section className="closing-band"><div className="closing-star">✳</div><p>Engineering intelligence.<br /><em>Enabling growth.</em></p></section>
    </main>
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="site-logo" href="#home" aria-label="VINTEQ home"><BrandLogo className="footer-brand-image on-dark" /></a>
          <p>Founder-led technology practice in Bengaluru, building practical digital solutions around real business needs.</p>
          <a className="footer-start-link" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
        </div>
        <div className="footer-link-column">
          <h2>Explore</h2>
          <a href="#about">About VINTEQ</a>
          <a href="#our-approach">Our approach</a>
          <a href="#portfolio">Project examples</a>
          <a href="#insights">Insights</a>
        </div>
        <div className="footer-link-column">
          <h2>What we do</h2>
          <a href="#services">Custom software</a>
          <a href="#services">Web development</a>
          <a href="#services">AI & machine learning</a>
          <a href="#services">Workflow automation</a>
          <a href="#services">UI/UX and MVPs</a>
        </div>
        <div className="footer-link-column footer-contact-column">
          <h2>Get in touch</h2>
          <a href="mailto:vinithdidgi65@gmail.com"><Mail size={15} /> vinteq.dev@gmail.com</a>
          <a href="tel:+917892199817"><Phone size={15} /> +91 78921 99817</a>
          <span><Globe2 size={15} /> Bengaluru, Karnataka, India</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VINTEQ. All rights reserved.</span>
      </div>
    </footer>
    </div>
  </>
}

function ServiceCard({ number, title, description, tags, icon: Icon, solves, deliverables }: { number: string; title: string; description: string; tags: string[]; icon: LucideIcon; solves: string; deliverables: string }) {
  const [expanded, setExpanded] = useState(false)
  return <article className={`service-card ${expanded ? 'service-card-expanded' : ''}`}>
    <div className="service-card-top">
      <span>{number} / 06</span>
      <span className="service-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    <button className="service-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
      {expanded ? 'Less detail' : 'Explore service'} <ChevronDown size={13} />
    </button>
    <a href="#contact" aria-label={`Ask us about ${title}`}><ArrowUpRight size={17} /></a>
    {expanded && <div className="service-detail">
      <strong>Business need</strong><p>{solves}</p>
      <strong>Possible deliverables</strong><p>{deliverables}</p>
      <a href="#contact">Discuss this service <ArrowRight size={13} /></a>
    </div>}
  </article>
}

function ProjectCard({ title, category, description, visual, number, offset = 0, ariaHidden = false }: { title: string; category: string; description: string; visual: string; number: number; offset?: number; ariaHidden?: boolean }) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (offset !== 0 || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--card-tilt-x', `${(y * -4).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--card-tilt-y', `${(x * 6).toFixed(2)}deg`)
  }
  const resetPointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--card-tilt-x', '0deg')
    event.currentTarget.style.setProperty('--card-tilt-y', '0deg')
  }
  return <article className="project-card" data-offset={offset} aria-hidden={ariaHidden || undefined} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
    <div className={`project-visual project-visual-${visual}`} aria-label={`${title} visual direction, not a product screenshot`}>
      <span className="project-visual-index">0{number} / 4</span>
      <div className="project-visual-art"><i /><i /><i /><b>{visual === 'farm' ? <Sprout size={24} /> : visual === 'signature' ? <FileText size={24} /> : visual === 'attendance' ? <Users size={24} /> : <Workflow size={24} />}</b></div>
      <span className="project-visual-caption">VISUAL DIRECTION · NOT A PROJECT SCREENSHOT</span>
    </div>
    <div className="project-card-copy"><span>{category}</span><h3>{title}</h3><p>{description}</p><small>Project example · commercial status and outcomes not specified</small></div>
  </article>
}

function WhyCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="why-card"><span className="why-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>
}

export default App
