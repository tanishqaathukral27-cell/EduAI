import { useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import {
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react'

const subjects = [
  { name: 'Mathematics', percent: 76, color: 'bg-violet-500', lessons: '12 of 16 lessons' },
  { name: 'Physics', percent: 62, color: 'bg-sky-500', lessons: '8 of 13 lessons' },
  { name: 'Chemistry', percent: 48, color: 'bg-amber-500', lessons: '6 of 12 lessons' },
]

const initialTasks = [
  { id: 1, time: '4:00 PM', title: 'Revise quadratic equations', subject: 'Mathematics', duration: '35 min', done: false },
  { id: 2, time: '5:00 PM', title: 'Practice motion numericals', subject: 'Physics', duration: '25 min', done: false },
  { id: 3, time: '7:30 PM', title: 'Take chemistry mini quiz', subject: 'Chemistry', duration: '15 min', done: false },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Learning', icon: BookOpen },
  { label: 'Study Planner', icon: CalendarDays },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'AI Mentor', icon: BrainCircuit },
]

function App() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [tasks, setTasks] = useState(initialTasks)
  const [toast, setToast] = useState('')
  const completedTasks = tasks.filter((task) => task.done).length

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? { ...task, done: !task.done } : task))
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1540px]">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-indigo-100 bg-white px-5 py-7 lg:flex">
          <button className="mb-12 flex items-center gap-3 px-3 text-left" onClick={() => setActiveNav('Dashboard')}>
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-indigo-200">E</span>
            <span><strong className="block text-xl tracking-tight text-slate-900">EDUAI</strong><small className="text-xs font-medium text-slate-400">Learn your way</small></span>
          </button>

          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setActiveNav(label)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${activeNav === label ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                <Icon size={19} /> {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-indigo-200">
            <Sparkles size={22} className="mb-4" />
            <p className="font-bold">Need a quick boost?</p>
            <p className="mt-1 text-xs leading-5 text-indigo-100">Ask your AI mentor anything, anytime.</p>
            <button onClick={() => showToast('Your AI Mentor is ready for your question!')} className="mt-4 rounded-lg bg-white px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50">Ask EDUAI</button>
          </div>
          <button className="mt-6 flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-400 hover:text-rose-500"><LogOut size={18} /> Sign out</button>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
          <header className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden"><span className="grid size-10 place-items-center rounded-xl bg-indigo-600 font-black text-white">E</span><strong className="text-lg">EDUAI</strong></div>
            <div className="hidden lg:block"><p className="text-sm font-medium text-slate-400">Friday, August 1</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Good afternoon, Tanishqa! <span aria-label="wave" role="img">👋</span></h1></div>
            <div className="flex items-center gap-3"><button onClick={() => showToast('No new notifications — you are all caught up!')} className="relative grid size-10 place-items-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm"><Bell size={19} /><span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" /></button><button className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-sm font-black text-white shadow-sm">T</button></div>
          </header>

          <div className="mb-7 lg:hidden"><p className="text-sm font-medium text-slate-400">Friday, August 1</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Good afternoon, Tanishqa! 👋</h1></div>

          {activeNav === 'Study Planner' ? <StudyPlanner tasks={tasks} completedTasks={completedTasks} onToggle={toggleTask} onBack={() => setActiveNav('Dashboard')} onAdd={() => showToast('A new focus session was added to your plan.')} /> : activeNav === 'AI Mentor' ? <AiMentor /> : activeNav === 'My Learning' ? <AdaptiveQuiz /> : activeNav === 'Analytics' ? <Analytics /> : <>
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-200 sm:p-8">
            <div className="relative z-10 max-w-xl"><div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-white/15"><Sparkles size={23} /></div><p className="text-sm font-semibold text-indigo-100">Your daily learning companion</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">You’re making great progress!</h2><p className="mt-3 max-w-md text-sm leading-6 text-indigo-100">Complete one focused session today and you’ll be ahead of your weekly learning goal.</p><button onClick={() => showToast('Opening your next focused study session…')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"><Play size={16} fill="currentColor" /> Continue learning</button></div>
            <div className="absolute -right-10 -top-12 size-64 rounded-full border-[28px] border-white/10" /><div className="absolute bottom-[-55px] right-28 size-40 rounded-full border-[18px] border-violet-400/35" />
          </motion.section>

          <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Flame} iconClass="bg-orange-100 text-orange-500" value="12 days" label="Current streak" detail="Best: 18 days" />
            <StatCard icon={Clock3} iconClass="bg-sky-100 text-sky-500" value="8.5 hrs" label="Study time this week" detail="+1.2 hrs from last week" />
            <StatCard icon={Target} iconClass="bg-violet-100 text-violet-500" value={`${completedTasks}/3`} label="Today’s goals" detail="Keep moving forward" />
            <StatCard icon={Trophy} iconClass="bg-amber-100 text-amber-500" value="1,240" label="Learning points" detail="Top 15% of learners" />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.3fr_.85fr]">
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Today’s study plan</h2><p className="mt-1 text-sm text-slate-400">Small steps. Big results.</p></div><button onClick={() => setActiveNav('Study Planner')} className="text-sm font-bold text-indigo-600">View all</button></div><div className="space-y-3">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={toggleTask} />)}</div><button onClick={() => showToast('A new focus session was added to your plan.')} className="mt-5 w-full rounded-xl border border-dashed border-indigo-200 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50">+ Add a study session</button></div>

            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Subject progress</h2><p className="mt-1 text-sm text-slate-400">This month</p></div><button className="rounded-lg bg-slate-50 p-2 text-slate-400"><MoreHorizontal size={18} /></button></div><div className="space-y-5">{subjects.map((subject) => <div key={subject.name}><div className="mb-2 flex items-center justify-between text-sm"><span className="font-semibold text-slate-700">{subject.name}</span><span className="font-bold text-slate-900">{subject.percent}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${subject.percent}%` }} transition={{ duration: .8 }} className={`h-full rounded-full ${subject.color}`} /></div><p className="mt-2 text-xs text-slate-400">{subject.lessons}</p></div>)}</div><button onClick={() => showToast('Your detailed analytics are coming next!')} className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">View analytics <ChevronRight size={16} /></button></div>
          </section></>}
        </section>
      </div>
      <button onClick={() => setActiveNav('AI Mentor')} className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-indigo-600"><MessageCircle size={18} /> Ask AI Mentor</button>
      {toast && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-24 right-6 z-20 max-w-xs rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">{toast}</motion.div>}
    </main>
  )
}

function StatCard({ icon: Icon, iconClass, value, label, detail }) {
  return <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className={`mb-4 grid size-10 place-items-center rounded-xl ${iconClass}`}><Icon size={20} /></div><p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-sm font-medium text-slate-600">{label}</p><p className="mt-2 text-xs text-slate-400">{detail}</p></motion.div>
}

function TaskItem({ task, onToggle }) {
  return <div className={`flex items-center gap-3 rounded-2xl border p-3 transition ${task.done ? 'border-emerald-100 bg-emerald-50/60' : 'border-slate-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30'}`}><button aria-label={`Mark ${task.title} as complete`} onClick={() => onToggle(task.id)} className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${task.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>{task.done && '✓'}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p><p className="mt-1 text-xs text-slate-400">{task.subject} · {task.duration}</p></div><span className="hidden text-xs font-semibold text-slate-400 sm:block">{task.time}</span><button onClick={() => onToggle(task.id)} className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"><Play size={15} fill="currentColor" /></button></div>
}

function StudyPlanner({ tasks, completedTasks, onToggle, onBack, onAdd }) {
  const [day, setDay] = useState(4)
  const days = [{ name: 'Mon', date: '28' }, { name: 'Tue', date: '29' }, { name: 'Wed', date: '30' }, { name: 'Thu', date: '31' }, { name: 'Fri', date: '1' }, { name: 'Sat', date: '2' }, { name: 'Sun', date: '3' }]
  const completion = Math.round((completedTasks / tasks.length) * 100)

  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><button onClick={onBack} className="mb-3 text-sm font-bold text-indigo-600">← Back to dashboard</button><h2 className="text-3xl font-bold tracking-tight text-slate-900">Study planner</h2><p className="mt-2 text-sm text-slate-500">A calm plan built around your learning goals.</p></div><button onClick={onAdd} className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">+ Add study session</button></div>
    <div className="mb-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white sm:p-7"><div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-sm font-medium text-indigo-200">Friday’s focus</p><h3 className="mt-1 text-2xl font-bold">{completedTasks === tasks.length ? 'Amazing — all tasks complete!' : 'One focused step at a time.'}</h3><p className="mt-2 text-sm text-indigo-200">{completedTasks} of {tasks.length} planned sessions completed</p></div><div className="relative grid size-24 place-items-center rounded-full" style={{ background: `conic-gradient(#a5b4fc ${completion * 3.6}deg, rgba(255,255,255,.15) 0deg)` }}><div className="grid size-19 place-items-center rounded-full bg-slate-900 text-lg font-bold">{completion}%</div></div></div></div>
    <div className="mb-6 grid grid-cols-7 gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">{days.map((item, index) => <button key={item.name} onClick={() => setDay(index)} className={`rounded-xl py-3 text-center transition ${day === index ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-indigo-50'}`}><span className="block text-[11px] font-bold uppercase tracking-wide">{item.name}</span><span className="mt-1 block text-lg font-bold">{item.date}</span></button>)}</div>
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-lg font-bold text-slate-900">Friday, August 1</h3><p className="mt-1 text-sm text-slate-400">{tasks.length} sessions · 1 hr 15 min planned</p></div><CalendarDays className="text-indigo-500" /></div><div className="space-y-4">{tasks.map((task) => <div key={task.id} className="flex gap-4"><div className="w-14 pt-4 text-right text-xs font-semibold text-slate-400">{task.time}</div><div className={`min-w-0 flex-1 rounded-2xl border p-4 ${task.done ? 'border-emerald-100 bg-emerald-50/60' : 'border-slate-100 bg-white'}`}><div className="flex items-center gap-3"><button onClick={() => onToggle(task.id)} className={`grid size-6 shrink-0 place-items-center rounded-full border-2 text-xs ${task.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>{task.done && '✓'}</button><div className="min-w-0 flex-1"><p className={`font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p><p className="mt-1 text-xs text-slate-400">{task.subject} · {task.duration}</p></div><button onClick={() => onToggle(task.id)} className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white">{task.done ? 'Done' : 'Start'}</button></div></div></div>)}</div></div>
  </motion.section>
}

function AiMentor() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([{ role: 'ai', text: "Hi Tanishqa! I’m your EDUAI Mentor. What are you learning today? I can explain a concept, make a revision plan, or quiz you." }])
  const [isThinking, setIsThinking] = useState(false)

  const askMentor = (suggestion = question) => {
    const trimmedQuestion = suggestion.trim()
    if (!trimmedQuestion || isThinking) return
    setMessages((current) => [...current, { role: 'user', text: trimmedQuestion }])
    setQuestion('')
    setIsThinking(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'ai', text: mentorReply(trimmedQuestion) }])
      setIsThinking(false)
    }, 700)
  }

  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[.72fr_1.28fr]">
    <aside className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-200"><div className="grid size-12 place-items-center rounded-2xl bg-white/15"><BrainCircuit size={26} /></div><p className="mt-6 text-sm font-semibold text-indigo-100">Your personal learning companion</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Learn without getting stuck.</h2><p className="mt-4 text-sm leading-6 text-indigo-100">EDUAI remembers what you’re practicing and explains topics in the way that helps you most.</p><div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4"><p className="text-xs font-bold uppercase tracking-wider text-indigo-200">Today’s focus</p><p className="mt-2 font-bold">Quadratic equations</p><p className="mt-1 text-xs leading-5 text-indigo-100">You learn best with short examples, then practice questions.</p></div></aside>
    <div className="flex min-h-[570px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white"><Sparkles size={19} /></span><div><h2 className="font-bold text-slate-900">EDUAI Mentor</h2><p className="text-xs text-emerald-500">● Online and ready to help</p></div></div><button className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">Clear chat</button></div><div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/70 p-5">{messages.map((message, index) => <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full ${message.role === 'ai' ? 'bg-indigo-600 text-white' : 'order-2 bg-amber-300 font-bold text-amber-900'}`}>{message.role === 'ai' ? <Sparkles size={15} /> : 'T'}</span><p className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'ai' ? 'rounded-tl-sm bg-white text-slate-700 shadow-sm' : 'rounded-tr-sm bg-indigo-600 text-white'}`}>{message.text}</p></motion.div>)}{isThinking && <div className="flex gap-3"><span className="grid size-8 place-items-center rounded-full bg-indigo-600 text-white"><Sparkles size={15} /></span><div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm"><span className="inline-flex gap-1"><i className="size-1.5 animate-bounce rounded-full bg-indigo-400" /><i className="size-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:150ms]" /><i className="size-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:300ms]" /></span></div></div>}</div><div className="border-t border-slate-100 bg-white p-4"><div className="mb-3 flex flex-wrap gap-2"><Suggestion onClick={() => askMentor('Explain quadratic equations simply')}>Explain quadratic equations</Suggestion><Suggestion onClick={() => askMentor('Give me a practice question')}>Give me a practice question</Suggestion><Suggestion onClick={() => askMentor('Make a 30-minute revision plan')}>Make a revision plan</Suggestion></div><form onSubmit={(event) => { event.preventDefault(); askMentor() }} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-300"><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask anything about your studies…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400" /><button aria-label="Send message" className="grid size-9 place-items-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700"><Send size={16} /></button></form></div></div>
  </motion.section>
}

function Suggestion({ children, onClick }) {
  return <button onClick={onClick} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100">{children}</button>
}

function mentorReply(question) {
  const lower = question.toLowerCase()
  if (lower.includes('quadratic')) return "Think of a quadratic equation as a curved path. It usually looks like ax² + bx + c = 0.\n\nTo solve one, first try factoring. For x² + 5x + 6 = 0, find two numbers that multiply to 6 and add to 5: 2 and 3. So (x + 2)(x + 3) = 0, which means x = −2 or x = −3.\n\nWant to try one yourself?"
  if (lower.includes('practice') || lower.includes('question')) return "Try this: x² − 7x + 12 = 0.\n\nHint: Find two numbers that multiply to 12 and add to −7. Send me your answer when you’re ready, and I’ll check it with you!"
  if (lower.includes('plan') || lower.includes('revision')) return "Here is a gentle 30-minute revision plan:\n\n• 5 min — Review the quadratic-equation formula\n• 15 min — Solve 3 factoring questions\n• 7 min — Check mistakes and note one takeaway\n• 3 min — Quick self-quiz\n\nWould you like me to add this to your study planner?"
  return "Great question! Let’s break it into small, easy steps. Start by telling me the subject or sharing the exact part that feels confusing, and I’ll guide you with an example."
}

function AdaptiveQuiz() {
  const quiz = [
    { question: 'What are the roots of x² − 5x + 6 = 0?', answers: ['x = 2 and x = 3', 'x = −2 and x = −3', 'x = 1 and x = 6', 'x = 0 and x = 6'], correct: 0, note: 'Correct! (x − 2)(x − 3) = 0, so the roots are 2 and 3.' },
    { question: 'Which formula finds the roots of ax² + bx + c = 0?', answers: ['x = −b ± √(b² − 4ac) / 2a', 'x = a + b + c', 'x = b² − 4ac', 'x = −c / b'], correct: 0, note: 'Exactly. The quadratic formula works even when factoring is difficult.' },
    { question: 'For x² + 9x + 20 = 0, which pair factors the middle term?', answers: ['2 and 10', '4 and 5', '1 and 20', '−4 and −5'], correct: 1, note: 'Nice! 4 × 5 = 20 and 4 + 5 = 9, so (x + 4)(x + 5) = 0.' },
  ]
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [answers, setAnswers] = useState([])
  const [started, setStarted] = useState(false)
  const current = quiz[index]
  const isCorrect = choice === current?.correct

  const pick = (answerIndex) => { if (choice === null) setChoice(answerIndex) }
  const next = () => {
    setAnswers((currentAnswers) => [...currentAnswers, isCorrect])
    setChoice(null)
    setIndex((currentIndex) => currentIndex + 1)
  }
  const restart = () => { setIndex(0); setChoice(null); setAnswers([]); setStarted(false) }
  const score = answers.filter(Boolean).length

  if (!started) return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl"><div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"><div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white sm:p-12"><div className="grid size-14 place-items-center rounded-2xl bg-white/15"><BrainCircuit size={30} /></div><p className="mt-8 text-sm font-semibold text-violet-100">Adaptive practice</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Quadratic equations challenge</h2><p className="mt-4 max-w-xl leading-7 text-indigo-100">A quick diagnostic quiz designed around your current Mathematics learning path.</p></div><div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8"><QuizInfo value="3" label="Smart questions" /><QuizInfo value="5 min" label="Estimated time" /><QuizInfo value="+60" label="Points to earn" /></div><div className="border-t border-slate-100 px-6 py-5 sm:px-8"><button onClick={() => setStarted(true)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"><Play size={16} fill="currentColor" /> Start quiz</button></div></div></motion.section>

  if (index === quiz.length) return <motion.section initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-12"><span className="mx-auto grid size-16 place-items-center rounded-full bg-amber-100 text-amber-500"><Trophy size={32} /></span><p className="mt-6 text-sm font-bold uppercase tracking-wider text-indigo-500">Quiz complete</p><h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{score} / {quiz.length}</h2><p className="mt-3 text-slate-500">{score === quiz.length ? 'Brilliant work — you have a strong grasp of this topic.' : 'Good effort. Your answers help EDUAI personalize what comes next.'}</p><div className="mt-8 rounded-2xl bg-indigo-50 p-5 text-left"><p className="flex items-center gap-2 text-sm font-bold text-indigo-900"><Sparkles size={17} /> EDUAI recommendation</p><p className="mt-2 text-sm leading-6 text-indigo-700">{score === quiz.length ? 'Move on to completing-the-square questions to stretch your skills.' : 'Spend 10 minutes revising factoring, then retry this quiz for a confidence boost.'}</p></div><button onClick={restart} className="mt-7 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Try again</button></motion.section>

  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-indigo-600">Mathematics · Adaptive quiz</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Question {index + 1} of {quiz.length}</h2></div><span className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-700">+20 pts</span></div><div className="h-2 overflow-hidden rounded-full bg-indigo-100"><motion.div animate={{ width: `${((index + 1) / quiz.length) * 100}%` }} className="h-full bg-indigo-600" /></div><div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-9"><p className="text-xl font-bold leading-8 text-slate-800">{current.question}</p><div className="mt-7 grid gap-3">{current.answers.map((answer, answerIndex) => { const revealed = choice !== null; const right = answerIndex === current.correct; const selected = answerIndex === choice; let style = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'; if (revealed && right) style = 'border-emerald-400 bg-emerald-50 text-emerald-800'; if (revealed && selected && !right) style = 'border-rose-400 bg-rose-50 text-rose-800'; return <button key={answer} onClick={() => pick(answerIndex)} className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition ${style}`}><span className="grid size-7 shrink-0 place-items-center rounded-full border border-current text-xs">{String.fromCharCode(65 + answerIndex)}</span>{answer}{revealed && right && <CheckCircle2 className="ml-auto text-emerald-500" size={20} />}{revealed && selected && !right && <XCircle className="ml-auto text-rose-500" size={20} />}</button> })}</div>{choice !== null && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 rounded-2xl p-4 text-sm leading-6 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}><strong>{isCorrect ? 'That’s right! ' : 'Almost! '}</strong>{current.note}</motion.div>}<div className="mt-7 flex justify-end">{choice !== null && <button onClick={next} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">{index === quiz.length - 1 ? 'See results' : 'Next question'} <ChevronRight className="ml-1 inline" size={16} /></button>}</div></div></motion.section>
}

function QuizInfo({ value, label }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs font-medium text-slate-500">{label}</p></div>
}

function Analytics() {
  const progress = [{ day: 'Mon', score: 48 }, { day: 'Tue', score: 56 }, { day: 'Wed', score: 54 }, { day: 'Thu', score: 67 }, { day: 'Fri', score: 76 }, { day: 'Sat', score: 71 }, { day: 'Sun', score: 82 }]
  const subjects = [{ name: 'Mathematics', score: 76 }, { name: 'Physics', score: 62 }, { name: 'Chemistry', score: 48 }, { name: 'English', score: 88 }]
  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-indigo-600">Your learning intelligence</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Performance analytics</h2><p className="mt-2 text-sm text-slate-500">Clear insights, so you always know what to do next.</p></div><button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">This week ▾</button></div><div className="mb-6 grid gap-4 sm:grid-cols-3"><Insight value="76%" label="Average mastery" detail="↑ 12% from last week" tone="text-emerald-600" /><Insight value="8.5 hrs" label="Focused study time" detail="Goal: 10 hours" tone="text-indigo-600" /><Insight value="3" label="Topics needing review" detail="Chemistry is the priority" tone="text-amber-600" /></div><div className="grid gap-6 xl:grid-cols-[1.4fr_.9fr]"><div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7"><div className="mb-6"><h3 className="font-bold text-slate-900">Mastery trend</h3><p className="mt-1 text-sm text-slate-400">Your quiz performance is moving in the right direction.</p></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={progress} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}><defs><linearGradient id="mastery" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef2ff" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} /><Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#mastery)" /></AreaChart></ResponsiveContainer></div></div><div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7"><h3 className="font-bold text-slate-900">Subject mastery</h3><p className="mt-1 text-sm text-slate-400">Quiz accuracy by subject</p><div className="mt-5 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={subjects} layout="vertical" margin={{ left: 15, right: 10 }}><XAxis type="number" hide domain={[0, 100]} /><Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} /><Bar dataKey="score" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={15} /></BarChart></ResponsiveContainer></div></div></div><div className="mt-6 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white"><Sparkles size={22} /></span><div className="flex-1"><p className="font-bold text-indigo-950">Your personalized next step</p><p className="mt-1 text-sm leading-6 text-indigo-700">You’re strongest in English and Mathematics. Spend your next 25-minute session on Chemistry: balancing chemical equations.</p></div><button className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">Add to plan</button></div></div></motion.section>
}

function Insight({ value, label, detail, tone }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><p className="text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-sm font-medium text-slate-600">{label}</p><p className={`mt-3 text-xs font-semibold ${tone}`}>{detail}</p></div>
}

export default App
