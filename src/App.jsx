import { useEffect, useRef, useState } from 'react'
import BorderGlow from './components/BorderGlow.jsx'
import TiltedCard from './components/TiltedCard.jsx'

const metrics = [
  { value: '7年', label: 'AI / B端产品经验', width: 'short' },
  { value: '31省', label: '系统覆盖范围', width: 'medium' },
  { value: '2100万', label: 'AI客服项目年创收', width: 'long' },
  { value: '1000万+', label: '大型系统用户数据', width: 'xlong' },
]

const introFacts = [
  ['方向', 'AI 客服、智能体平台、态势感知、RAG / LLM 应用'],
  ['方法', '从业务痛点、指标体系到平台化产品闭环'],
  ['工具', 'Claude Code / Codex / Hermes / Dify / Coze'],
  ['设计', 'Axure、Figma、复杂 B 端流程与后台信息架构'],
]

const experiences = [
  {
    company: '小青菜（福州）科技有限公司',
    role: '总经理',
    date: '2026.03 - 2026.06',
    text: '主导跨境电商项目，构建覆盖产品全生命周期的软件管理平台，打通需求设计、上线管理、后端支撑与业务增长。'
  },
  {
    company: '中电福富有限公司',
    role: 'AI 产品经理',
    date: '2023.08 - 2026.03',
    text: '主导电信集团 AI 客服、态势感知与智能体开发平台建设，推动 13 个客服场景完成 AI 赋能。'
  },
  {
    company: '福建新意科技有限公司',
    role: '产品经理',
    date: '2021.11 - 2023.07',
    text: '负责证券账户业务线 B 端系统，建设柜面业务数字化运营、账户管理、质检风控等核心能力。'
  },
  {
    company: '网宿科技股份有限公司',
    role: '产品经理',
    date: '2019.07 - 2021.10',
    text: '负责数字化流量运营系统，建立流量分析、分层体系与运营策略，为企业降低带宽成本并创造营收。'
  },
]

const projects = [
  {
    title: '客服智能解决方案平台',
    label: 'AI Customer OS',
    date: '2024.03 - 2026.03',
    image: '/assets/project-customer.svg',
    points: ['覆盖全国 31 省，服务 10+ 万业务人员', '语音导航识别准确率 70.34% 提升至 91.23%', '报告生成从半天压缩至 5 分钟内'],
  },
  {
    title: 'AI 态势感知平台',
    label: 'Situation Intelligence',
    date: '2025.07 - 2026.03',
    image: '/assets/project-situation.svg',
    points: ['日均处理 3 万条语音通话数据', '每日输出 840 份多维分析报告', '问题处理时效从 2-3 天缩短至 0.5-2 小时'],
  },
  {
    title: '智能体开发平台',
    label: 'Agent Builder',
    date: '2025.02 - 2026.03',
    image: '/assets/project-agent.svg',
    points: ['低代码智能体开发、工作流编排、提示词优化', '支持工具调用、知识库、分享广场', '完成国企单位业务拓展与市场验证'],
  },
  {
    title: '柜面业务数字化运营平台',
    label: 'Securities Operation',
    date: '2021.11 - 2023.08',
    image: '/assets/project-security.svg',
    points: ['承载 1000 万用户数据，日均处理上万条请求', '审批效率提升 100%，合规通报率下降 95%', '为证券公司节省 40%+ 运营成本'],
  },
]

const advantages = [
  {
    kicker: '01 / AI 产品落地',
    title: '懂模型，也懂业务现场',
    text: '能把 LLM、RAG、Prompt、MCP、Skills 等能力翻译为客服、分析、办公、运营场景里的可上线产品。'
  },
  {
    kicker: '02 / 复杂系统建设',
    title: '能处理千万级系统的结构复杂度',
    text: '长期负责大型 B 端 IT 系统，熟悉账号、风控、审批、数据、运营策略等高约束业务。'
  },
  {
    kicker: '03 / 指标驱动',
    title: '把体验、效率和收入放在同一张图上',
    text: '项目不止交付功能，也追踪识别率、处理时效、人效、成本、满意度和营业收入。'
  },
  {
    kicker: '04 / AI 编程协作',
    title: '用 AI 加速产品验证与交付',
    text: '熟练使用 Claude Code、Codex、Hermes 与 Shell 命令，能快速构建原型、拆解需求并验证方案。'
  },
]

const navItems = [
  { id: 'intro', label: '简介' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
  { id: 'advantages', label: '优势' },
]

function App() {
  const rootRef = useRef(null)
  const [activeSection, setActiveSection] = useState('intro')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]

        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: 0.01,
      }
    )

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx
    let cancelled = false
    let pointerFrame = 0
    let removePointerMove = () => {}

    async function runAnimations() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
      gsap.set(['.nav', '.hero-role', '.hero-title-line', '.hero-subtitle', '.hero-copy', '.hero-metrics'], {
        yPercent: 120,
        opacity: 0,
      })
      gsap.set('.opening-slab', { scaleX: 1 })
      gsap.set('.hero-visual', { clipPath: 'inset(100% 0 0 0)', y: 80, scale: 1.08 })
      gsap.set('.orbit-card', { y: 180, rotateX: 18, opacity: 0 })

      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
      opening
        .to('.opening-word span', { yPercent: -100, duration: 1.05, stagger: 0.08, delay: 0.25 })
        .to('.opening-slab', { scaleX: 0, transformOrigin: '100% 50%', duration: 1.15 }, 0.88)
        .to('.nav', { yPercent: 0, opacity: 1, duration: 0.9 }, 0.95)
        .to('.hero-role', { yPercent: 0, opacity: 1, duration: 0.9 }, 1.05)
        .to('.hero-title-line', { yPercent: 0, opacity: 1, scaleX: 1, duration: 1.18, stagger: 0.1 }, 1.12)
        .to('.hero-subtitle', { yPercent: 0, opacity: 1, duration: 0.95 }, 1.35)
        .to('.hero-copy', { yPercent: 0, opacity: 1, duration: 0.95 }, 1.48)
        .to('.hero-metrics', { yPercent: 0, opacity: 1, duration: 0.9 }, 1.58)
        .to('.hero-visual', { clipPath: 'inset(0% 0 0 0)', y: 0, scale: 1, duration: 1.2 }, 1.25)
        .to('.orbit-card', { y: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 1.55)

      gsap.utils.toArray('.section').forEach((section) => {
        const title = section.querySelector('.section-title')
        const cards = section.querySelectorAll('[data-card]')

        gsap.fromTo(title,
          { y: 120, scaleY: 0.55, opacity: 0, filter: 'blur(16px)' },
          {
            y: 0,
            scaleY: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 72%' },
          }
        )

        gsap.fromTo(cards,
          { y: 96, opacity: 0, clipPath: 'inset(18% 0 0 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 62%' },
          }
        )
      })

      const onMove = (event) => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5

        if (pointerFrame) return

        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0
          gsap.to(document.documentElement, {
            '--mx': x.toFixed(3),
            '--my': y.toFixed(3),
            duration: 0.45,
            ease: 'power3.out',
          })
        })
      }

      window.addEventListener('pointermove', onMove)
      removePointerMove = () => window.removeEventListener('pointermove', onMove)
      }, rootRef)
    }

    runAnimations()

    return () => {
      cancelled = true
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      removePointerMove()
      ctx?.revert()
    }
  }, [])

  return (
    <main ref={rootRef}>
      <div className="opening-slab">
        <p className="opening-word" aria-hidden="true">
          <span>AI PRODUCT</span>
          <span>LIN JIA</span>
        </p>
      </div>

      <nav className="nav" aria-label="主导航">
        <a className="logo-pill" href="#top">林嘉</a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              className={activeSection === item.id ? 'active' : ''}
              href={`#${item.id}`}
              key={item.id}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="nav-download" href="/assets/lin-jia-ai-product-manager.pdf" download>下载简历</a>
          <a className="nav-cta" href="mailto:512253233@qq.com">联系我</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-content">
          <section className="hero-copyzone" aria-labelledby="hero-title">
            <p className="hero-role">AI 产品经理 / B端复杂系统 / 智能体平台</p>
            <h1 id="hero-title" className="hero-title">
              <span className="hero-title-line">AI PRODUCT</span>
              <span className="hero-title-line">MANAGER</span>
            </h1>
            <p className="hero-subtitle">把大模型能力放进真实业务流程里</p>
            <p className="hero-copy">
              我是林嘉，7 年产品经理经验，主导过 AI 客服系统、AI 态势感知、智能体开发平台与证券账户数字化运营系统。擅长把模糊业务问题转成可度量、可上线、可持续迭代的产品系统。
            </p>
            <div className="hero-metrics" aria-label="核心指标">
              {metrics.map((item) => (
                <span className={`metric-${item.width}`} key={item.label}>
                  <b>{item.value}</b>{item.label}
                </span>
              ))}
            </div>
          </section>

          <aside className="hero-visual" aria-label="AI 产品系统视觉图">
            <img src="/assets/hero-system.svg" alt="AI 产品系统与智能体编排界面" />
          </aside>
        </div>

        <div className="case-orbit" aria-label="代表项目">
          <p className="case-title">
            <span>SELECTED SYSTEMS</span>
            <small>AI客服 / 态势感知 / Agent Builder / 证券运营</small>
          </p>
          <div className="case-row">
            {projects.map((project) => (
              <article className="orbit-card" key={project.title}>
                <span>{project.label}</span>
                <img src={project.image} alt={project.title} />
              </article>
            ))}
          </div>
        </div>
      </header>

      <section className="section intro-section" id="intro">
        <div className="section-head">
          <p className="eyebrow">Profile</p>
          <h2 className="section-title">INTRO</h2>
        </div>
        <div className="intro-grid">
          <div className="intro-copy" data-card>
            <p className="eyebrow">Lin Jia / AI Product Manager</p>
            <h3>让 AI 产品进入真实生产</h3>
            <p>
              从客服原声、业务流程到智能体平台，我负责把大模型能力落到可上线、可度量、可持续迭代的业务系统里。过往项目覆盖电信、证券、跨境电商与网络流量运营。
            </p>
            <div className="intro-facts">
              {introFacts.map(([label, value]) => (
                <span key={label}>
                  <b>{label}</b>
                  {value}
                </span>
              ))}
            </div>
          </div>
          <figure className="portrait-card" data-card>
            <img className="profile-avatar" src="/assets/profile-avatar-360.jpg" alt="林嘉个人头像" width="180" height="180" loading="lazy" decoding="async" />
            <figcaption>
              <b>LIN JIA</b>
              <span>AI Product Manager / 7 years</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-head">
          <p className="eyebrow">Career Path</p>
          <h2 className="section-title">EXPERIENCE</h2>
        </div>
        <div className="career-line">
          <div className="career-timeline" aria-hidden="true">
            {experiences.map((item) => (
              <span key={item.date}>{item.date.split(' - ')[0]}</span>
            ))}
          </div>
          {experiences.map((item) => (
            <TiltedCard
              className="career-tilt"
              captionText={item.role}
              key={item.company}
              data-card
              rotateAmplitude={9}
              scaleOnHover={1}
            >
              <article>
                <time>{item.date}</time>
                <h3>{item.company}</h3>
                <p className="role">{item.role}</p>
                <p>{item.text}</p>
              </article>
            </TiltedCard>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head">
          <p className="eyebrow">Selected Work</p>
          <h2 className="section-title">PROJECTS</h2>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <BorderGlow
              className="project-row"
              innerClassName="project-row-content"
              key={project.title}
              data-card
              animated={index === 0}
              edgeSensitivity={24}
              glowColor="78 100 55"
              backgroundColor="#101010"
              borderRadius={20}
              glowRadius={52}
              glowIntensity={0.92}
              coneSpread={26}
              fillOpacity={0.28}
            >
              <div className="project-index">
                <span>{project.label}</span>
                <time>{project.date}</time>
              </div>
              <div className="project-main">
                <h3>{project.title}</h3>
                <ul>
                  {project.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <figure>
                <img src={project.image} alt={`${project.title}视觉图`} />
              </figure>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="section" id="advantages">
        <div className="section-head">
          <p className="eyebrow">Product Strength</p>
          <h2 className="section-title">ADVANTAGES</h2>
        </div>
        <div className="strength-grid">
          {advantages.map((item) => (
            <BorderGlow
              className="strength-card"
              innerClassName="strength-card-content"
              key={item.title}
              data-card
              edgeSensitivity={28}
              glowColor="188 100 69"
              backgroundColor="#101010"
              borderRadius={20}
              glowRadius={40}
              glowIntensity={0.74}
              coneSpread={22}
              fillOpacity={0.2}
              colors={['#baff19', '#61d8ff', '#f7f7f1']}
            >
              <p>{item.kicker}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </BorderGlow>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>林嘉 / AI 产品经理</p>
        <a href="tel:18860118965">18860118965</a>
        <a href="mailto:512253233@qq.com">512253233@qq.com</a>
      </footer>
    </main>
  )
}

export default App
