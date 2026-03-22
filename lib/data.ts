// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface Slide {
  img: string;
  h: string;
  s: string;
  tag: string;
}

export interface Service {
  img: string;
  icon: string;
  title: string;
  slug: string;
  badge: string;
  color: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  spec: string;
  initials: string;
  palette: number;
  icon: string;
  bio?: string;
}

export interface Testimonial {
  img: string;
  name: string;
  co: string;
  q: string;
}

export interface Project {
  img: string;
  title: string;
  cat: string;
  desc: string;
}

export interface BlogPost {
  img: string;
  date: string;
  cat: string;
  title: string;
  read: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface Stat {
  v: string;
  l: string;
}

// ─── IMAGES ───────────────────────────────────────────────────────────────────
export const IMG: Record<string, string> = {
  hero1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  hero2: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80",
  hero3: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  about: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80",
  about2: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=900&q=80",
  s1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  s2: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  s3: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  s4: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  s5: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  s6: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  s7: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  s8: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
  t1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  t2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  t3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  t4: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  p1: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
  p2: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
  p3: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
  p4: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80",
  blog1: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  blog2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  blog3: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
export const SLIDES: Slide[] = [
  { img: IMG.hero1, h: "When Failure Is Not An Option", s: "Fiasco Consultancy steps in. We specialize in rapid intervention, project recovery, and strategic defense to navigate your most challenging business crises.", tag: "Crisis Specialists · East Africa" },
  { img: IMG.hero2, h: "Turning Crises Into Triumphs", s: "We transform uncertainty into clarity. From operational collapse to reputation repair — our decisive action restores confidence and drives lasting recovery.", tag: "Strategy · Recovery · Growth" },
  { img: IMG.hero3, h: "Strategy & Growth for East Africa", s: "Simplify your strategy. Accelerate your growth. Achieve operational excellence in Nairobi and beyond with East Africa's most trusted consultancy.", tag: "Nairobi, Kenya · 15+ Years" },
];

export const STATS: Stat[] = [
  { v: "15+", l: "Years" },
  { v: "300+", l: "Crises Resolved" },
  { v: "98%", l: "Recovery Rate" },
  { v: "50+", l: "Clients" },
];

export const SERVICES: Service[] = [
  { img: IMG.s1, icon: "◈", title: "Design Strategy & Innovation", slug: "strategy-innovation", badge: "Core", color: "#6C63FF", desc: "Thorough analysis and redesign of your business model to identify new revenue streams and market opportunities across East Africa." },
  { img: IMG.s2, icon: "⬡", title: "Digital Transformation", slug: "digital-transformation", badge: "Popular", color: "#00D2FF", desc: "Cutting-edge digital solutions and cloud technologies to streamline operations, enhance collaboration, and boost efficiency at scale." },
  { img: IMG.s3, icon: "◉", title: "Advanced Data Analytics", slug: "data-analytics", badge: "Specialist", color: "#FF6B6B", desc: "Algorithms and data science to extract deep business insights, predict market trends, and optimize your decision-making processes." },
  { img: IMG.s4, icon: "◎", title: "Market Performance Audit", slug: "performance-marketing", badge: "High Impact", color: "#FFA500", desc: "Customer journey mapping and detailed marketing audit to optimize channels, improve ROI, and maximize customer acquisition." },
  { img: IMG.s5, icon: "⬢", title: "Operational Excellence", slug: "operational-excellence", badge: "In Demand", color: "#00C896", desc: "Close collaboration with your team to enhance business processes, eliminate inefficiencies and ensure peak organizational agility." },
  { img: IMG.s6, icon: "◆", title: "Talent & HR Strategy", slug: "talent-development", badge: "Strategic", color: "#FF61D2", desc: "Focus on human capital — leadership development, new hire orientation, and strategic workforce planning for East African markets." },
  { img: IMG.s7, icon: "◇", title: "Project Management", slug: "project-management", badge: "Core", color: "#6C63FF", desc: "Tools and techniques capturing key indicators for effective project evaluation, turnaround, and on-time, on-budget delivery." },
  { img: IMG.s8, icon: "⬟", title: "Strategic Planning", slug: "strategic-planning", badge: "Foundation", color: "#00D2FF", desc: "Integrated strategy from creation of well-balanced plans maximizing corporate values to full realization across East African markets." },
];

export const TEAM: TeamMember[] = [
  { name: "Amelia Wangui", role: "Head of Crisis Response", spec: "Rapid Intervention & Stabilization", initials: "AW", palette: 0, icon: "crisis", bio: "15+ years in crisis management. Leads all emergency deployments across Kenya, Uganda and Tanzania. Certified in organizational resilience and risk management." },
  { name: "Steve Nyagah", role: "Senior Turnaround Strategist", spec: "Project Recovery & Execution", initials: "SN", palette: 1, icon: "strategy", bio: "Rescued 80+ failing projects across East Africa. Former PMP-certified project director with deep experience in infrastructure, tech, and FMCG sectors." },
  { name: "Grace Elizabeth", role: "Forensic Audit Specialist", spec: "Investigation & Compliance", initials: "GE", palette: 2, icon: "forensic", bio: "Court-qualified expert witness and certified fraud examiner. Has led forensic investigations totaling over KES 2B in recovered or secured assets." },
  { name: "Michael Wainaina", role: "Reputation & Comms Lead", spec: "Media Defense & PR Strategy", initials: "MW", palette: 3, icon: "comms", bio: "Former journalist turned crisis communications expert. Has managed media fallout for 30+ organizations including listed companies and NGOs." },
];

export const TESTIMONIALS: Testimonial[] = [
  { img: IMG.t1, name: "Richard William", co: "CEO, Tech Startup", q: "Fiasco intervened on our stalled 9-figure project. They didn't just fix the errors — they salvaged the entire timeline and restored investor confidence. True experts in crisis." },
  { img: IMG.t2, name: "Sara Albert", co: "VP of Operations", q: "When the operational failure hit, Fiasco provided instant stabilization and a clear recovery path. Their decisive action minimized our financial losses significantly." },
  { img: IMG.t3, name: "James Millard", co: "Corporate Counsel", q: "Their strategic communications team managed an aggressive media fallout brilliantly. We defended our position and successfully repaired our reputation." },
  { img: IMG.t4, name: "Mariah Carey", co: "CFO, Global Retailer", q: "The forensic audit uncovered systemic issues that saved us from future massive liabilities. Transparent, intelligent, and decisive when it mattered most." },
];

export const PROJECTS: Project[] = [
  { img: IMG.p1, title: "Failing Project Turnaround", cat: "Project Rescue", desc: "Rescued a Sh. 2.4B infrastructure project from collapse — delivered on revised timeline with all stakeholders fully realigned." },
  { img: IMG.p2, title: "Reputation Crisis Mitigation", cat: "Media Defense", desc: "Managed aggressive media fallout for a regional bank, restoring full public trust within 60 days of engagement." },
  { img: IMG.p3, title: "Internal Fraud Investigation", cat: "Forensic Audit", desc: "Uncovered a KES 180M internal fraud scheme across 3 subsidiaries, leading to successful prosecution and system reform." },
  { img: IMG.p4, title: "Operational Collapse Stabilization", cat: "Intervention", desc: "Deployed rapid-response team to stabilize a manufacturing firm facing full operational shutdown and supply chain failure." },
];

export const BLOGS: BlogPost[] = [
  { img: IMG.blog1, date: "Mar 10, 2026", cat: "Prevention", title: "Lessons from the Near-Misses: Failure Prevention Tactics", read: "5 min" },
  { img: IMG.blog2, date: "Mar 12, 2026", cat: "Recovery", title: "The Art of the Project Turnaround: Rescuing Failing Initiatives", read: "7 min" },
  { img: IMG.blog3, date: "Mar 13, 2026", cat: "Crisis Comms", title: "Crisis Communications: Fixing Reputation Damage Post-Fiasco", read: "6 min" },
];

export const PROCESS: ProcessStep[] = [
  { n: "01", t: "Rapid Crisis Intervention", d: "Immediate deployment to halt damage, stabilize the situation, and secure critical assets — within hours, not weeks." },
  { n: "02", t: "Root Cause Fiasco Diagnosis", d: "Deep forensic investigation to uncover the precise origin of the problem and map its full organizational impact." },
  { n: "03", t: "Strategic Resolution & Action", d: "Development and aggressive execution of a tailored recovery plan — clear milestones, accountable owners, measurable outcomes." },
  { n: "04", t: "Future Stabilization & Resilience", d: "Long-term controls, systems, and team training to ensure stability and prevent the crisis from ever recurring." },
];

export const QUICK_PROMPTS: string[] = [
  "What services do you offer?",
  "I have a crisis — help!",
  "Book a consultation",
  "Tell me about your team",
  "How does your process work?",
  "What does it cost?",
];

// ─── CHATBOT BRAIN ────────────────────────────────────────────────────────────
interface Intent {
  keys: string[];
  ans: () => string;
}

export const BRAIN = {
  intents: [
    { keys: ["hello","hi","hey","good morning","good afternoon","howdy","greetings","hujambo","habari","sasa"], ans: (): string => `Hello and welcome to Fiasco Consultancy! 👋\n\nI'm your dedicated AI assistant — fully trained on everything about Fiasco with no internet connection needed.\n\nI can help you with:\n• Our services and specializations\n• Booking a consultation\n• Our crisis methodology\n• Team and contact details\n\nHow can I help you today?` },
    { keys: ["service","services","offer","what do you do","capabilities","what can you","help with","provide"], ans: (): string => `Fiasco Consultancy offers two pillars of services:\n\n🔴 CRISIS & RECOVERY\n• Rapid Crisis Intervention\n• Forensic Audit & Diagnosis\n• Project Turnaround Strategy\n• Reputation Crisis Mitigation\n\n📊 STRATEGIC CONSULTING\n• Design Strategy & Innovation\n• Digital Transformation\n• Advanced Data Analytics\n• Market Performance Audit\n• Operational Excellence\n• Talent & HR Strategy\n• Project Management\n• Strategic Planning\n\nWould you like details on any specific service?` },
    { keys: ["crisis","emergency","urgent","help now","immediate","failing","collapsed","disaster","damage","trouble","sinking"], ans: (): string => `We understand — time is critical right now. 🚨\n\nHere's what happens when you contact us:\n\n1️⃣ We respond within the hour\n2️⃣ A crisis specialist is assigned immediately\n3️⃣ On-site stabilization team is deployed\n4️⃣ Damage is halted, assets secured\n5️⃣ Recovery plan activated within 24 hours\n\n📞 Call RIGHT NOW: +254 712 770 999` },
    { keys: ["strategy","strategic planning","planning","roadmap","vision","goals","long term"], ans: (): string => `Our Strategic Planning service is foundational to everything we do.\n\n📋 What we deliver:\n• 3-year and 5-year strategic road maps\n• Competitive landscape analysis\n• Market entry & expansion strategies\n• OKR and KPI frameworks\n• Board-level strategy presentations\n\nWould you like to book a free strategy consultation?` },
    { keys: ["digital","transformation","technology","cloud","software","erp","automation","digitize"], ans: (): string => `Our Digital Transformation service modernizes businesses from the ground up.\n\n💻 What we cover:\n• Cloud migration and infrastructure\n• ERP system implementation\n• Business process automation\n• Digital workflow design\n• Cybersecurity foundations\n\nCall us: +254 712 770 999` },
    { keys: ["data","analytics","insights","business intelligence","dashboard","reporting","predictive"], ans: (): string => `Our Advanced Data Analytics practice turns raw data into strategic decisions.\n\n📊 What we deliver:\n• Executive dashboards and KPI reporting\n• Predictive market trend modelling\n• Customer behaviour analytics\n• Financial performance analysis\n• Data governance frameworks` },
    { keys: ["marketing","market","audit","performance","roi","customer","acquisition","brand","seo","funnel"], ans: (): string => `Our Market Performance Audit is a full deep-dive into how your business acquires and retains customers.\n\n🎯 The audit covers:\n• Customer journey mapping\n• Digital channel performance\n• CRM and lead nurturing review\n• Brand positioning analysis\n• Conversion rate optimization` },
    { keys: ["operational","operations","excellence","efficiency","process","lean","workflow","productivity"], ans: (): string => `Our Operational Excellence service transforms how your organization runs day-to-day.\n\n⚙️ We focus on:\n• Business process mapping and redesign\n• Lean and Six Sigma methodology\n• Standard Operating Procedures\n• Performance management systems\n\nWe've helped clients reduce operational costs by up to 35% within 6 months.` },
    { keys: ["hr","human resource","talent","staff","employee","workforce","leadership","hiring","training"], ans: (): string => `Our Talent & HR Strategy service builds the human foundation your business needs.\n\n👥 Services include:\n• HR policy design and compliance\n• Leadership development programs\n• Strategic workforce planning\n• Performance management cycles\n• Succession planning` },
    { keys: ["project","project management","pm","delivery","timeline","budget","turnaround","rescue","stalled"], ans: (): string => `Our Project Management and Turnaround services cover the full project lifecycle.\n\n📁 For new projects:\n• Project charter and scope definition\n• Risk registers and mitigation\n• Agile and waterfall delivery\n\n🚑 For failing projects:\n• Rapid health assessment\n• Timeline and budget re-baselining\n• Accelerated re-execution\n\nWe rescued a Sh. 2.4B infrastructure project from collapse.` },
    { keys: ["forensic","fraud","investigation","corruption","compliance","irregularity","embezzlement"], ans: (): string => `Our Forensic Audit & Diagnosis service is one of the most specialized in East Africa.\n\n🔍 What we investigate:\n• Internal fraud and embezzlement\n• Financial statement irregularities\n• Procurement and tender fraud\n• Asset misappropriation\n\nAll reports are court-admissible. For a confidential discussion: +254 712 770 999` },
    { keys: ["reputation","pr","media","press","communications","public relations","scandal","narrative"], ans: (): string => `Our Reputation Crisis Mitigation service protects what you've spent years building.\n\n📢 We provide:\n• Immediate media monitoring and response\n• Crisis communications strategy\n• Narrative control and messaging\n• Social media crisis management\n• Post-crisis brand rehabilitation\n\nLive situation? Call immediately: +254 712 770 999` },
    { keys: ["team","staff","who","people","experts","amelia","steve","grace","michael","wangui","nyagah","elizabeth","wainaina"], ans: (): string => `Meet the Fiasco Crisis Team:\n\n👩‍💼 Amelia Wangui — Head of Crisis Response\nLeads all emergency deployments.\n\n👨‍💼 Steve Nyagah — Senior Turnaround Strategist\nHas rescued 80+ failing projects across East Africa.\n\n👩‍🔬 Grace Elizabeth — Forensic Audit Specialist\nCourt-qualified expert witness.\n\n👨‍💻 Michael Wainaina — Reputation & Communications Lead\nFormer journalist turned crisis communications expert.\n\nTo speak with a team member: +254 712 770 999` },
    { keys: ["contact","reach","call","phone","email","address","location","office","where","nairobi"], ans: (): string => `Here's how to reach Fiasco Consultancy:\n\n📞 Phone: +254 712 770 999\n✉️ Email: info@fiascoconsultancy.co.ke\n🕐 Hours: Mon–Sat, 8:00 AM – 5:00 PM\n\n📍 Head Office: Standard Street, Standard Building, Nairobi\n🏢 Branch: Likoni Road, Joakim Estate, Nairobi` },
    { keys: ["price","cost","fee","pricing","how much","quote","affordable"], ans: (): string => `Our fees are tailored to the scope and urgency of each engagement.\n\n💡 How pricing works:\n• Initial consultation is FREE\n• Crisis interventions scoped within 24 hours\n• Strategic engagements priced per milestone\n• Retainer options available\n\n📞 Call +254 712 770 999 for a free Fiasco Audit.` },
    { keys: ["book","appointment","schedule","consult","consultation","meeting","discuss","free","engage"], ans: (): string => `Booking a Fiasco consultation is simple:\n\n✅ Option 1 — Contact Form (this page)\nWe respond within 2 hours on business days.\n\n✅ Option 2 — Call Direct\n📞 +254 712 770 999 · Mon–Sat, 8:00 AM – 5:00 PM\n\n✅ Option 3 — Email\n✉️ info@fiascoconsultancy.co.ke\n\nAll initial consultations are 100% confidential and free.` },
    { keys: ["process","methodology","approach","how do you work","steps","method","framework","stages"], ans: (): string => `The Fiasco 4-Stage Methodology:\n\n🔴 Stage 1 — Rapid Crisis Intervention\nDeploy immediately to halt damage.\n\n🔍 Stage 2 — Root Cause Fiasco Diagnosis\nForensic investigation to find the origin.\n\n⚡ Stage 3 — Strategic Resolution & Action\nAggressively execute a tailored recovery plan.\n\n🛡️ Stage 4 — Future Stabilization & Resilience\nLong-term controls and training.\n\n98% recovery rate across 300+ engagements.` },
    { keys: ["about","company","fiasco","who are you","background","history","mission","vision"], ans: (): string => `About Fiasco Consultancy Limited:\n\nEast Africa's leading crisis management and strategic consulting firm, headquartered in Nairobi, Kenya.\n\n📊 Track Record:\n• 15+ years of experience\n• 300+ crises resolved\n• 98% recovery rate\n• 50+ corporate clients\n\n"When failure is not an option, Fiasco steps in."` },
    { keys: ["thank","thanks","thank you","asante","appreciate","helpful","great","good","excellent","awesome"], ans: (): string => `You're most welcome! 😊\n\nFiasco Consultancy is always here:\n📞 +254 712 770 999\n\nIs there anything else I can help you with?` },
    { keys: ["bye","goodbye","see you","later","done","exit","nothing else","farewell"], ans: (): string => `Thank you for chatting with Fiasco Consultancy! 👋\n\n"When failure is not an option, Fiasco steps in."\n\n📞 +254 712 770 999 · Mon–Sat, 8:00 AM – 5:00 PM` },
  ] as Intent[],

  respond(input: string): string {
    const low = input.toLowerCase().trim();
    let best: { score: number; fn: (() => string) | null } = { score: 0, fn: null };
    for (const intent of this.intents) {
      let score = 0;
      for (const k of intent.keys) {
        if (low.includes(k)) score += k.split(" ").length * 3;
        else for (const w of low.split(/\s+/)) { if (w.length > 3 && k.includes(w)) score += 1; }
      }
      if (score > best.score) best = { score, fn: intent.ans };
    }
    if (best.score > 0 && best.fn) return best.fn();
    return `I'm not quite sure about that, but I'm here to help! 🤔\n\nTry asking about:\n• Our services · Team · Methodology\n• Pricing · Booking · Contact\n\nOr call us directly: 📞 +254 712 770 999`;
  },

  async reply(input: string): Promise<string> {
    await new Promise<void>((r) => setTimeout(r, 500 + Math.random() * 900));
    return this.respond(input);
  },
};
