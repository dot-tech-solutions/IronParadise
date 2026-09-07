'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Dumbbell, Camera, Mail, MapPin, Menu, Play, Star, X, Zap, Activity } from 'lucide-react'

import heroGym from '../public/hero-gym.png'
import logoImg from '../public/iron-paradise-logo.png'
import aboutGym from '../public/about-gym.png'
import programStrength from '../public/program-strength.png'
import programPersonal from '../public/program-personal.png'
import programCrossfit from '../public/program-crossfit.png'
import programWeightloss from '../public/program-weightloss.png'
import programMuscle from '../public/program-muscle.png'
import programCardio from '../public/program-cardio.png'
import trainer1 from '../public/trainer-1.png'
import trainer2 from '../public/trainer-2.png'
import trainer3 from '../public/trainer-3.png'
import trainer4 from '../public/trainer-4.png'
import gallery1 from '../public/gallery-1.png'
import gallery2 from '../public/gallery-2.png'
import transBefore from '../public/transformation-before.png'
import transAfter from '../public/transformation-after.png'
import ctaBg from '../public/cta-background.png'

const programs = [
  { title: 'Strength Training', desc: 'Build raw power with progressive programming.', image: programStrength, tag: 'FOUNDATION' },
  { title: 'Personal Training', desc: 'One-to-one coaching built around your goals.', image: programPersonal, tag: '1:1 COACHING' },
  { title: 'CrossFit', desc: 'High-intensity movement. Unmatched community.', image: programCrossfit, tag: 'GROUP TRAINING' },
  { title: 'Weight Loss', desc: 'Smart conditioning for a leaner, stronger you.', image: programWeightloss, tag: 'TRANSFORM' },
  { title: 'Muscle Building', desc: 'Train with intent. Grow with confidence.', image: programMuscle, tag: 'HYPERTROPHY' },
  { title: 'Cardio & Conditioning', desc: 'Own your engine and elevate your endurance.', image: programCardio, tag: 'PERFORMANCE' },
]

const trainers = [
  { name: 'Arjun Kumar', role: 'Strength & Conditioning', exp: '12 years', image: trainer1 },
  { name: 'Priya Sharma', role: 'Fitness & Yoga', exp: '9 years', image: trainer2 },
  { name: 'Rahul Raj', role: 'CrossFit Coach', exp: '8 years', image: trainer3 },
  { name: 'Ananya Menon', role: 'Nutrition & Weight Loss', exp: '7 years', image: trainer4 },
]

const testimonials = [
  { name: 'Rohan Mehta', quote: 'IRON PARADISE completely changed my approach to fitness. The trainers are amazing and the community keeps me motivated.', role: 'Member since 2021' },
  { name: 'Sarah Thomas', quote: 'I walked in wanting to lose weight and walked out with a whole new relationship with my body. This place is different.', role: 'Member since 2022' },
  { name: 'Vikram Nair', quote: 'The programming is intelligent, the equipment is elite, and every session feels like a win.', role: 'Member since 2020' },
]

const gallery = [gallery1, gallery2, programStrength, aboutGym, programCrossfit, programCardio]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
}
const stagger = (s = 0.1, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
})
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div className="section-heading" variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <motion.p className="eyebrow" variants={fadeUp}>{eyebrow}</motion.p>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
      {copy && <motion.p className="section-copy" variants={fadeUp}>{copy}</motion.p>}
    </motion.div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>
}

// Word-by-word text reveal
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <motion.span className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
      initial="hidden" animate="show">
      {words.map((word, i) => (
        <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.22em', overflow: 'hidden' }}
          variants={{ hidden: {}, show: {} }}>
          <motion.span style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%', opacity: 0, rotateX: 40 }, show: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.65, ease } } }}>
            {word}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<StaticImageData | null>(null)
  const [testimonial, setTestimonial] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  // Magnetic cursor effect for hero buttons
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springMx = useSpring(mx, { stiffness: 150, damping: 18 })
  const springMy = useSpring(my, { stiffness: 150, damping: 18 })
  const handleHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.018)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.018)
  }
  const resetHeroMouse = () => { mx.set(0); my.set(0) }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      document.documentElement.style.setProperty('--scroll-progress', `${(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100}%`)
    }
    const onPointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${e.clientY}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onPointerMove) }
  }, [])

  const nextTestimonial = () => setTestimonial((c) => (c + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonial((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-aura" aria-hidden="true" />

      {/* NAV */}
      <motion.nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }} aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Iron Paradise Home">
          <div className="brand-logo-wrap">
            <Image src={logoImg} alt="Iron Paradise Logo" width={44} height={44} className="brand-logo-img" priority />
          </div>
          <div className="brand-text">
            <span className="brand-title">IRON PARADISE</span>
            <small className="brand-tagline">DISCIPLINE BUILDS FREEDOM</small>
          </div>
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {['About', 'Programs', 'Trainers', 'Membership', 'Gallery', 'Contact'].map((item, i) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}>{item}</motion.a>
          ))}
          <motion.a className="nav-cta" href="#membership" onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}>
            Join Now <ArrowRight size={16} />
          </motion.a>
        </div>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="hero" ref={heroRef} onMouseMove={handleHeroMouse} onMouseLeave={resetHeroMouse}>
        {/* Parallax background */}
        <motion.div className="hero-bg-wrap" style={{ y: heroY, scale: heroScale }}>
          <Image src={heroGym} placeholder="blur" alt="Athlete training in a dark premium gym" fill priority className="hero-image" />
        </motion.div>
        <div className="hero-overlay" />

        {/* Orbit rings */}
        <div className="hero-rings" aria-hidden="true">
          {[420, 620, 820].map((size, i) => (
            <motion.div key={size} className="orbit-ring"
              style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
              animate={{ rotate: 360, scale: [1, 1.04, 1] }}
              transition={{ rotate: { duration: 18 + i * 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 4 + i * 1.5, repeat: Infinity, ease: 'easeInOut' } }} />
          ))}
        </div>

        {/* Light sweep */}
        <motion.div className="hero-sweep" aria-hidden="true"
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 4.5, delay: 1.2, repeat: Infinity, repeatDelay: 5, ease: [0.4, 0, 0.6, 1] }} />

        {/* Floating particles — varied sizes */}
        <div className="hero-particles" aria-hidden="true">
          {[...Array(24)].map((_, i) => (
            <motion.span key={i} className="particle"
              style={{
                left: `${4 + (i * 73 % 92)}%`,
                top: `${8 + (i * 47 % 82)}%`,
                width: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
                height: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
                opacity: 0,
              }}
              animate={{ y: [0, -(18 + (i % 3) * 12), 0], opacity: [0, i % 4 === 0 ? 0.7 : 0.4, 0] }}
              transition={{ duration: 3 + (i % 5), delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>


        {/* Hero content with mouse parallax */}
        <motion.div className="hero-content page-shell" style={{ opacity: heroOpacity, x: springMx, y: springMy }}>
          <motion.p className="eyebrow lime"
            initial={{ opacity: 0, letterSpacing: '0.6em', y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2em', y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.15, ease }}>
            DISCIPLINE BUILDS FREEDOM
          </motion.p>

          {/* Word-by-word headline */}
          <h1 className="hero-h1">
            <WordReveal text="BUILD YOUR" delay={0.35} />
            <br />
            <em><WordReveal text="STRONGEST SELF" delay={0.55} /></em>
          </h1>

          <motion.p className="hero-copy"
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.85, ease }}>
            Train harder. Move stronger.<br />Become unstoppable.
          </motion.p>

          <motion.div className="hero-actions"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.05, ease }}>
            <motion.a href="#membership" className="button button-lime"
              whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(53,185,255,.6)' }}
              whileTap={{ scale: 0.94 }}>
              Join Now <ArrowRight size={18} />
            </motion.a>
            <motion.a href="#programs" className="button button-ghost"
              whileHover={{ scale: 1.05, borderColor: 'var(--electric)', color: 'var(--electric)' }}
              whileTap={{ scale: 0.97 }}>
              <motion.span animate={{ rotate: [0, 0, 360] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Play size={15} fill="currentColor" />
              </motion.span>
              Explore Programs
            </motion.a>
          </motion.div>

          {/* Animated divider */}
          <motion.div className="hero-divider"
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.3, ease }} />

          <motion.div className="hero-stats" variants={stagger(0.13, 1.4)} initial="hidden" animate="show">
            {[['500+', 'Members'], ['15+', 'Expert trainers'], ['10+', 'Years experience']].map(([val, lbl]) => (
              <motion.div key={lbl}
                variants={{ hidden: { opacity: 0, y: 28, scale: 0.85 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
                whileHover={{ scale: 1.12, y: -4 }}>
                <Stat value={val} label={lbl} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a href="#about" className="scroll-cue"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}>
          <motion.span
            animate={{ scaleY: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }} />
          Scroll to explore
        </motion.a>
      </section>

      {/* TICKER */}
      <section className="ticker" aria-label="Gym values"><div><span>DISCIPLINE BUILDS FREEDOM</span><i>✦</i><span>IRON PARADISE</span><i>✦</i><span>CONSISTENCY</span><i>✦</i><span>STRENGTH</span><i>✦</i><span>COMMUNITY</span><i>✦</i><span>RESULTS</span><i>✦</i><span>DISCIPLINE BUILDS FREEDOM</span></div></section>

      {/* ABOUT */}
      <motion.section id="about" className="section about-section page-shell"
        variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
        <motion.div className="about-image-wrap" variants={fadeLeft}>
          <Image src={aboutGym} placeholder="blur" alt="IRON PARADISE modern gym interior" fill className="cover-image" />
          <motion.div className="image-badge"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.55, ease }}>
            <Dumbbell size={20} /><span>EST. 2014<br /><b>BUILT DIFFERENT</b></span>
          </motion.div>
        </motion.div>
        <div className="about-content">
          <SectionHeading eyebrow="ABOUT IRON PARADISE" title="MORE THAN A GYM. IT'S A LIFESTYLE." copy="We built IRON PARADISE for people who refuse to settle. A space where serious training meets a supportive community, and every session moves you closer to the person you want to become." />
          <motion.div className="about-list" variants={stagger(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {['Professional-grade equipment', 'Coaching that meets you where you are', 'A community that keeps you accountable'].map((item) => (
              <motion.div key={item} variants={fadeUp}>
                <Check size={18} /><span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.a href="#contact" className="text-link" variants={fadeUp} whileHover={{ x: 8 }}>
            Meet your new training ground <ArrowRight size={18} />
          </motion.a>
        </div>
      </motion.section>

      {/* STATS BAND */}
      <section className="stats-band">
        <motion.div className="page-shell stats-grid" variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {[['10+', 'Years experience'], ['5,000+', 'Members transformed'], ['20+', 'Certified trainers'], ['50+', 'Weekly classes']].map(([val, lbl]) => (
            <motion.div key={lbl} className="stat"
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } } }}
              whileHover={{ scale: 1.08 }}>
              <strong>{val}</strong><span>{lbl}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="section page-shell">
        <SectionHeading eyebrow="HOW WE TRAIN" title="FIND YOUR EDGE." copy="Whatever your goal, there is a program designed to make you stronger, faster, and more confident." />
        <motion.div className="program-grid" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {programs.map((p) => (
            <motion.article key={p.title} className="program-card" variants={scaleIn}
              whileHover={{ y: -10, boxShadow: '0 28px 60px rgba(0,0,0,.4),0 0 30px rgba(53,185,255,.15)' }}>
              <Image src={p.image} placeholder="blur" alt={p.title} fill className="cover-image" />
              <div className="program-overlay" />
              <div className="program-info">
                <span className="card-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <motion.a href="#contact" whileHover={{ x: 5 }}>Learn more <ArrowRight size={16} /></motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* WHY */}
      <section className="why-section section">
        <div className="page-shell">
          <SectionHeading eyebrow="THE IRON PARADISE DIFFERENCE" title="BUILT FOR THE LONG GAME." />
          <motion.div className="feature-grid" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[['01','Modern Equipment','Train on the best tools in the game.'],['02','Certified Trainers','Experience and empathy in every session.'],['03','Personalized Plans','A clear path built around your body.'],['04','Nutrition Guidance','Fuel your training. Transform your life.'],['05','Flexible Timings','Your schedule should not stop your progress.'],['06','Real Community','Better together. Stronger forever.']].map(([n, title, desc]) => (
              <motion.div className="feature" key={n}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                whileHover={{ y: -6 }}>
                <span className="feature-number">{n}</span>
                <motion.div whileHover={{ rotate: -12, scale: 1.25 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Dumbbell size={22} />
                </motion.div>
                <h3>{title}</h3><p>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="section page-shell">
        <SectionHeading eyebrow="MEET THE COACHES" title="PEOPLE WHO PUSH YOU FORWARD." />
        <motion.div className="trainer-grid" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {trainers.map((t) => (
            <motion.article className="trainer-card" key={t.name}
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.93 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
              whileHover={{ y: -12 }}>
              <div className="trainer-image">
                <Image src={t.image} placeholder="blur" alt={t.name} fill className="cover-image" />
                <div className="trainer-social"><Camera size={18} /><span>Follow</span></div>
              </div>
              <div className="trainer-info"><h3>{t.name}</h3><p>{t.role}</p><span>{t.exp} experience</span></div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="section pricing-section">
        <div className="page-shell">
          <SectionHeading eyebrow="MEMBERSHIP" title="COMMIT TO YOURSELF." copy="No lock-ins. No excuses. Just a better way to train." />
          <motion.div className="pricing-grid" variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[{name:'Basic',price:'999',features:['Gym access','Basic workout plan','Locker access']},{name:'Pro',price:'1,999',features:['Full gym access','Personal workout plan','Group classes','Nutrition guidance'],popular:true},{name:'Elite',price:'3,499',features:['Everything in Pro','Personal trainer','Customized nutrition plan','Priority support']}].map((plan) => (
              <motion.article className={`price-card ${plan.popular ? 'popular' : ''}`} key={plan.name}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }}
                whileHover={{ scale: 1.03, boxShadow: plan.popular ? '0 0 45px rgba(53,185,255,.3)' : '0 20px 50px rgba(0,0,0,.3)' }}>
                {plan.popular && <span className="popular-label">MOST POPULAR</span>}
                <p className="eyebrow">{plan.name}</p>
                <motion.div className="price" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  &#8377;{plan.price}<small>/ month</small>
                </motion.div>
                <div className="price-features">
                  {plan.features.map((f, fi) => (
                    <motion.div key={f} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + fi * 0.08 }}>
                      <Check size={16} />{f}
                    </motion.div>
                  ))}
                </div>
                <a href="#contact" className={`button ${plan.popular ? 'button-lime' : 'button-outline'}`}>Choose Plan <ArrowRight size={16} /></a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section page-shell">
        <SectionHeading eyebrow="INSIDE IRON PARADISE" title="THIS IS YOUR PLAYGROUND." />
        <motion.div className="gallery-grid" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {gallery.map((img, i) => (
            <motion.button className={`gallery-item gallery-${i + 1}`} key={i}
              onClick={() => setLightbox(img)} aria-label={`Open gallery image ${i + 1}`}
              variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } } }}
              whileHover={{ scale: 1.04, zIndex: 2 }}>
              <Image src={img} placeholder="blur" alt="IRON PARADISE training environment" fill className="cover-image" />
              <span className="gallery-view"><Play size={18} fill="currentColor" /></span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* TRANSFORMATION */}
      <section className="transformation-section section">
        <div className="page-shell transformation-inner">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionHeading eyebrow="THE PROOF IS IN THE WORK" title="REAL PEOPLE. REAL RESULTS." copy="Small decisions, repeated daily, create extraordinary change." />
            <motion.a href="#contact" className="button button-lime" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              Start your transformation <ArrowRight size={18} />
            </motion.a>
          </motion.div>
          <motion.div className="before-after" variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <Image src={transBefore} placeholder="blur" alt="Before transformation" fill className="cover-image" /><span>BEFORE</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <Image src={transAfter} placeholder="blur" alt="After transformation" fill className="cover-image" /><span>AFTER</span>
            </motion.div>
            <p>Aditya S. <small>Lost 18kg in 6 months</small></p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <motion.section className="section testimonial-section page-shell"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <SectionHeading eyebrow="WHAT THE COMMUNITY SAYS" title="THE WORK SPEAKS." />
        <div className="testimonial-wrap">
          <motion.div className="quote-mark" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>"</motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={testimonial} className="testimonial"
              initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
              transition={{ duration: 0.45 }}>
              <div className="stars">
                {[1,2,3,4,5].map((s, si) => (
                  <motion.span key={s} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.06 }}>
                    <Star size={16} fill="currentColor" />
                  </motion.span>
                ))}
              </div>
              <blockquote>{testimonials[testimonial].quote}</blockquote>
              <p><strong>{testimonials[testimonial].name}</strong><span>{testimonials[testimonial].role}</span></p>
            </motion.div>
          </AnimatePresence>
          <div className="slider-controls">
            <motion.button onClick={prevTestimonial} aria-label="Previous testimonial" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}><ChevronLeft /></motion.button>
            <span>0{testimonial + 1} / 0{testimonials.length}</span>
            <motion.button onClick={nextTestimonial} aria-label="Next testimonial" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}><ChevronRight /></motion.button>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="cta-section">
        <Image src={ctaBg} placeholder="blur" alt="Athlete performing pull ups" fill className="cover-image" />
        <div className="cta-overlay" />
        <motion.div className="cta-content" variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p className="eyebrow lime" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>THE TIME IS NOW</motion.p>
          <motion.h2 variants={{ hidden: { opacity: 0, scale: 0.85, y: 30 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.75, ease } } }}>
            YOUR EXCUSES<br /><em>END HERE.</em>
          </motion.h2>
          <motion.p variants={fadeUp}>Your stronger version is waiting.</motion.p>
          <motion.a href="#contact" className="button button-lime" variants={fadeUp}
            whileHover={{ scale: 1.07, boxShadow: '0 0 36px rgba(53,185,255,.55)' }} whileTap={{ scale: 0.96 }}>
            Start your journey <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </section>

      {/* CONTACT */}
      <motion.section id="contact" className="section contact-section page-shell"
        variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.div className="contact-info" variants={fadeLeft}>
          <SectionHeading eyebrow="LET'S GET STARTED" title="YOUR FIRST STEP STARTS HERE." copy="Questions, goals, or just curious? Drop us a line and we will help you find the right fit." />
          <div className="contact-details">
            {[{icon:<MapPin size={20}/>,text:<>72, Giri Rd, near Alugar ghee shop, Balaganapathy Nagar<br/>Thanjavur, Tamil Nadu 613009</>},{icon:<Mail size={20}/>,text:<>ironparadisethanjavur@gmail.com<br/>07010543438</>},{icon:<Clock3 size={20}/>,text:<>Mon&ndash;Sat: 5:00 AM&ndash;10:00 PM<br/>Sun: 6:00 AM&ndash;1:00 PM</>}].map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                {d.icon}<span>{d.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.form className="contact-form" variants={fadeRight} onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
          {submitted ? (
            <motion.div className="form-success" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 0.6 }}><Check size={32} /></motion.div>
              <h3>Message received.</h3>
              <p>We will be in touch within one business day.</p>
              <button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={18} /></button>
            </motion.div>
          ) : (
            <>
              <div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@email.com" /></label></div>
              <div className="form-row"><label>Phone<input placeholder="+91 00000 00000" /></label><label>Program<select defaultValue=""><option value="" disabled>Select a program</option>{programs.map((p) => <option key={p.title}>{p.title}</option>)}</select></label></div>
              <label>Message<textarea rows={4} placeholder="Tell us what you want to achieve..." /></label>
              <motion.button className="button button-lime" type="submit"
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(53,185,255,.35)' }} whileTap={{ scale: 0.97 }}>
                Send enquiry <ArrowRight size={18} />
              </motion.button>
            </>
          )}
        </motion.form>
      </motion.section>

      {/* FOOTER */}
      <motion.footer initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand" aria-label="Iron Paradise Home">
              <div className="brand-logo-wrap">
                <Image src={logoImg} alt="Iron Paradise Logo" width={54} height={54} className="brand-logo-img" />
              </div>
              <div className="brand-text">
                <span className="brand-title">IRON PARADISE</span>
                <small className="brand-tagline">DISCIPLINE BUILDS FREEDOM</small>
              </div>
            </a>
            <p>More than a gym. A lifestyle built for people who refuse to settle. Discipline builds freedom.</p>
            <div className="footer-social"><Camera /><span>in</span><span>f</span></div>
          </div>
          <div><h4>Explore</h4><a href="#about">About us</a><a href="#programs">Programs</a><a href="#trainers">Trainers</a><a href="#membership">Membership</a></div>
          <div><h4>Visit us</h4><p>72, Giri Rd, near Alugar ghee shop<br />Balaganapathy Nagar<br />Thanjavur, Tamil Nadu 613009</p><p>07010543438</p><a href="https://maps.app.goo.gl/QXenTa1F2deToFNL9" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)', marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 'bold' }}>View on Google Maps <ArrowRight size={12} /></a></div>
          <div className="newsletter"><h4>Stay in the loop</h4><p>Training tips. Member stories. No noise.</p><div><input placeholder="Your email address" aria-label="Your email address" /><motion.button aria-label="Subscribe" whileHover={{ scale: 1.15, rotate: -8 }} whileTap={{ scale: 0.9 }}><ArrowRight /></motion.button></div></div>
        </div>
        <div className="footer-bottom page-shell"><span>&#169; 2025 IRON PARADISE. ALL RIGHTS RESERVED.</span><span>DISCIPLINE BUILDS FREEDOM.</span></div>
      </motion.footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.button aria-label="Close gallery" onClick={() => setLightbox(null)} whileHover={{ scale: 1.15, rotate: 90 }} transition={{ duration: 0.25 }}><X /></motion.button>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.35, ease }} onClick={(e) => e.stopPropagation()}>
              <Image src={lightbox} placeholder="blur" alt="Expanded gym gallery image" width={1200} height={800} className="lightbox-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
