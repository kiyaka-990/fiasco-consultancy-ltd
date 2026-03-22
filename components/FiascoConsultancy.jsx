"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const IMG = {
  hero1:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  hero2:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80",
  hero3:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  about:"https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80",
  about2:"https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=900&q=80",
  s1:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  s2:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  s3:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  s4:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  s5:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  s6:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  s7:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  s8:"https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
  t1:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  t2:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  t3:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  t4:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  p1:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
  p2:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
  p3:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
  p4:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80",
  blog1:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  blog2:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  blog3:"https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
};

// ════════════════════════════════════════════════════════════
//  IN-HOUSE AI CHATBOT ENGINE — zero API calls, zero keys
//  Fully trained on Fiasco Consultancy knowledge base
// ════════════════════════════════════════════════════════════
const BRAIN = {
  intents: [
    {
      keys:["hello","hi","hey","good morning","good afternoon","good evening","howdy","greetings","hujambo","habari","sasa","sup","hola"],
      ans:()=>`Hello and welcome to Fiasco Consultancy! 👋\n\nI'm your dedicated AI assistant — fully trained on everything about Fiasco with no internet connection needed.\n\nI can help you with:\n• Information about our services\n• Booking a consultation\n• Learning about our crisis methodology\n• Team and contact details\n\nHow can I help you today?`
    },
    {
      keys:["service","services","offer","what do you do","capabilities","specialise","specialize","what can you","help with","provide"],
      ans:()=>`Fiasco Consultancy offers two pillars of services:\n\n🔴 CRISIS & RECOVERY\n• Rapid Crisis Intervention\n• Forensic Audit & Diagnosis\n• Project Turnaround Strategy\n• Reputation Crisis Mitigation\n\n📊 STRATEGIC CONSULTING\n• Design Strategy & Innovation\n• Digital Transformation\n• Advanced Data Analytics\n• Market Performance Audit\n• Operational Excellence\n• Talent & HR Strategy\n• Project Management\n• Strategic Planning\n\nWould you like details on any specific service?`
    },
    {
      keys:["crisis","emergency","urgent","help now","immediate","problem","failing","collapsed","disaster","damage","fire","trouble","sinking","going under"],
      ans:()=>`We understand — time is critical right now. 🚨\n\nFiasco specializes in exactly this. Here's what happens when you contact us:\n\n1️⃣ We respond within the hour\n2️⃣ A crisis specialist is assigned immediately\n3️⃣ On-site stabilization team is deployed\n4️⃣ Damage is halted, assets secured\n5️⃣ Recovery plan activated within 24 hours\n\n📞 Call RIGHT NOW: +254 712 770 999\n\nFor non-urgent situations, fill the contact form on this page — we respond within 2 hours during business hours.`
    },
    {
      keys:["strategy","strategic planning","planning","roadmap","road map","vision","goals","long term","5 year","3 year"],
      ans:()=>`Our Strategic Planning service is foundational to everything we do.\n\n📋 What we deliver:\n• 3-year and 5-year strategic road maps\n• Competitive landscape analysis\n• Market entry & expansion strategies\n• Corporate values alignment\n• OKR and KPI frameworks\n• Board-level strategy presentations\n\nWe don't just write a document — we work alongside your leadership to create strategies that are practical, ambitious, and executable within the East African context.\n\nWould you like to book a free strategy consultation?`
    },
    {
      keys:["digital","transformation","technology","tech","cloud","software","erp","system","automation","digitize","modernize"],
      ans:()=>`Our Digital Transformation service modernizes businesses from the ground up.\n\n💻 What we cover:\n• Cloud migration and infrastructure setup\n• ERP system selection and implementation\n• Business process automation\n• Digital workflow design\n• Team digital readiness training\n• Cybersecurity foundations\n\nWe work with businesses of all sizes across East Africa — from SMEs digitizing for the first time to large corporates migrating legacy systems.\n\nCall us: +254 712 770 999`
    },
    {
      keys:["data","analytics","data analytics","insights","business intelligence","bi","dashboard","reporting","predictive","analysis","algorithm"],
      ans:()=>`Our Advanced Data Analytics practice turns raw data into strategic decisions.\n\n📊 What we deliver:\n• Executive dashboards and KPI reporting\n• Predictive market trend modelling\n• Customer behaviour analytics\n• Financial performance analysis\n• Supply chain optimization models\n• Data governance frameworks\n\nMany of our clients see measurable ROI within the first quarter after engagement.\n\nInterested? Fill the contact form or call +254 712 770 999.`
    },
    {
      keys:["marketing","market","audit","performance","roi","customer","acquisition","brand","campaign","seo","funnel","channel"],
      ans:()=>`Our Market Performance Audit is a full deep-dive into how your business acquires and retains customers.\n\n🎯 The audit covers:\n• Customer journey mapping\n• Digital channel performance (SEO, paid media, social)\n• CRM and lead nurturing review\n• Brand positioning analysis\n• Competitor benchmarking\n• Conversion rate optimization\n\nMost clients discover 3–5 critical gaps within the first two weeks. The result is a prioritized action plan with clear ROI projections.`
    },
    {
      keys:["operational","operations","excellence","efficiency","process","lean","six sigma","workflow","agility","productivity","bottleneck"],
      ans:()=>`Our Operational Excellence service transforms how your organization runs day-to-day.\n\n⚙️ We focus on:\n• Business process mapping and redesign\n• Bottleneck and waste identification\n• Lean and Six Sigma methodology\n• Standard Operating Procedures (SOPs)\n• Performance management systems\n• Cross-departmental coordination\n\nWe've helped clients reduce operational costs by up to 35% within 6 months while improving output quality and team morale.`
    },
    {
      keys:["hr","human resource","talent","staff","employee","workforce","leadership","hiring","recruitment","training","culture","people"],
      ans:()=>`Our Talent & HR Strategy service builds the human foundation your business needs.\n\n👥 Services include:\n• HR policy design and compliance\n• Leadership development programs\n• New hire orientation frameworks\n• Strategic workforce planning\n• Performance management cycles\n• Employee engagement strategies\n• Succession planning\n\nOur HR specialists have deep expertise in Kenyan labour law and East African talent markets.\n\nNeed help with a specific HR challenge?`
    },
    {
      keys:["project","project management","pm","delivery","timeline","budget","milestones","turnaround","rescue","stalled","failing project","recovery"],
      ans:()=>`Our Project Management and Turnaround services cover the full project lifecycle.\n\n📁 For new projects:\n• Project charter and scope definition\n• Stakeholder management plans\n• Risk registers and mitigation\n• Agile and waterfall delivery frameworks\n• Progress reporting and governance\n\n🚑 For failing projects:\n• Rapid project health assessment\n• Stakeholder confidence restoration\n• Timeline and budget re-baselining\n• Accelerated re-execution\n\nWe've rescued a Sh. 2.4B infrastructure project from collapse — delivered on revised timeline.\n\nIs your project in trouble? Call +254 712 770 999.`
    },
    {
      keys:["forensic","fraud","investigation","corruption","financial","accounting","compliance","irregularity","misconduct","embezzlement","theft"],
      ans:()=>`Our Forensic Audit & Diagnosis service is one of the most specialized in East Africa.\n\n🔍 What we investigate:\n• Internal fraud and embezzlement\n• Financial statement irregularities\n• Procurement and tender fraud\n• Asset misappropriation\n• Systemic operational weaknesses\n• Regulatory compliance breaches\n\nAll reports are thorough, evidence-based, and court-admissible. We maintain strict confidentiality throughout.\n\nThis is handled personally by our Forensic Audit Specialist, Grace Elizabeth.\n\nFor a confidential discussion: +254 712 770 999`
    },
    {
      keys:["reputation","pr","media","press","communications","public relations","damage","scandal","news","social media","narrative","brand damage"],
      ans:()=>`Our Reputation Crisis Mitigation service protects what you've spent years building.\n\n📢 We provide:\n• Immediate media monitoring and response\n• Crisis communications strategy\n• Spokesperson preparation and training\n• Narrative control and messaging\n• Social media crisis management\n• Stakeholder communication plans\n• Post-crisis brand rehabilitation\n\nMichael Wainaina, our Reputation & Communications Lead, has managed the most high-profile reputation crises in East Africa.\n\nLive situation? Call immediately: +254 712 770 999`
    },
    {
      keys:["team","staff","who","people","experts","specialists","consultant","amelia","steve","grace","michael","wangui","nyagah","elizabeth","wainaina"],
      ans:()=>`Meet the Fiasco Crisis Team:\n\n👩‍💼 Amelia Wangui — Head of Crisis Response\nLeads all emergency deployments. Expert in rapid organizational stabilization.\n\n👨‍💼 Steve Nyagah — Senior Turnaround Strategist\nHas rescued 80+ failing projects across East Africa. Expert in execution and stakeholder management.\n\n👩‍🔬 Grace Elizabeth — Forensic Audit Specialist\nCourt-qualified expert witness. Leads all fraud investigations and compliance audits.\n\n👨‍💻 Michael Wainaina — Reputation & Communications Lead\nFormer journalist turned crisis communications expert. Manages media defense and PR strategy.\n\nTo speak with a team member: +254 712 770 999`
    },
    {
      keys:["contact","reach","call","phone","email","address","location","office","where","find you","nairobi","directions"],
      ans:()=>`Here's how to reach Fiasco Consultancy:\n\n📞 Phone: +254 712 770 999\n✉️ Email: info@fiascoconsultancy.co.ke\n🕐 Hours: Mon–Sat, 8:00 AM – 5:00 PM\n\n📍 Head Office:\nStandard Street, Standard Building\nNairobi, Kenya\n\n🏢 Branch Office:\nLikoni Road, Joakim Estate\nNairobi, Kenya\n\nFor emergencies outside business hours, our on-call crisis team is reachable via the main line for existing clients.\n\nWould you like to book an appointment?`
    },
    {
      keys:["price","cost","fee","pricing","rates","charge","budget","how much","quote","quotation","affordable","expensive"],
      ans:()=>`Our fees are tailored to the scope and urgency of each engagement.\n\n💡 How pricing works:\n• Initial consultation is FREE — we assess your situation first\n• Crisis interventions are scoped within 24 hours of contact\n• Strategic engagements are priced per project milestone\n• Retainer options available for ongoing advisory support\n\nWe believe in transparent pricing — no hidden fees, no surprises. You only pay for agreed deliverables.\n\n📞 Call +254 712 770 999 or fill the contact form to get a free Fiasco Audit and scope.`
    },
    {
      keys:["book","appointment","schedule","consult","consultation","meeting","talk","speak","discuss","free","engage","hire"],
      ans:()=>`Booking a Fiasco consultation is simple:\n\n✅ Option 1 — Contact Form (this page)\nScroll to the Contact section and fill in your details. We respond within 2 hours on business days.\n\n✅ Option 2 — Call Direct\n📞 +254 712 770 999\nMon–Sat, 8:00 AM – 5:00 PM\n\n✅ Option 3 — Email\n✉️ info@fiascoconsultancy.co.ke\n\nFor your first consultation, be ready to share:\n• Your company name and sector\n• The challenge or crisis you're facing\n• Your preferred timeline\n\nAll initial consultations are 100% confidential and free.`
    },
    {
      keys:["process","methodology","approach","how do you work","steps","method","framework","how it works","4 stage","four stage","stages"],
      ans:()=>`The Fiasco 4-Stage Methodology:\n\n🔴 Stage 1 — Rapid Crisis Intervention\nWe deploy immediately to halt damage, stabilize the situation, and secure critical assets. Speed is everything.\n\n🔍 Stage 2 — Root Cause Fiasco Diagnosis\nForensic investigation to uncover the precise origin of the problem and map its full impact.\n\n⚡ Stage 3 — Strategic Resolution & Action\nWe develop and aggressively execute a tailored recovery plan. Clear milestones, accountable owners, measurable outcomes.\n\n🛡️ Stage 4 — Future Stabilization & Resilience\nLong-term controls, systems, and training to ensure it never happens again.\n\nThis methodology has delivered a 98% recovery rate across 300+ engagements.`
    },
    {
      keys:["about","company","fiasco","who are you","background","history","story","founded","mission","vision","what is fiasco"],
      ans:()=>`About Fiasco Consultancy Limited:\n\nWe are East Africa's leading crisis management and strategic consulting firm, headquartered in Nairobi, Kenya.\n\n🎯 Our Mission:\nTo transform crises into triumphs — providing immediate, decisive action that stabilizes emergencies and builds long-term organizational resilience.\n\n📊 Our Track Record:\n• 15+ years of experience\n• 300+ crises resolved\n• 98% recovery rate\n• 50+ corporate clients\n• Sectors: Tech, Finance, Infrastructure, NGO, Government, Retail\n\n💡 What makes us different:\nWhen things go wrong, Fiasco goes in. Our teams are deployable within hours, not weeks.\n\n"When failure is not an option, Fiasco steps in."`
    },
    {
      keys:["east africa","kenya","uganda","tanzania","africa","region","nairobi","regional","kigali","dar es salaam","kampala"],
      ans:()=>`Fiasco Consultancy is proudly headquartered in Nairobi and serves clients across East Africa.\n\n🌍 Our regional footprint:\n• Kenya (primary market)\n• Uganda\n• Tanzania\n• Rwanda\n• Ethiopia\n• South Sudan\n\nWe understand the East African regulatory landscape, cultural dynamics, and business environment — something that sets us apart from international firms without local context.\n\nNeed regional expertise? +254 712 770 999`
    },
    {
      keys:["sme","startup","small business","medium enterprise","entrepreneur","new business","growing","small company"],
      ans:()=>`Fiasco Consultancy actively supports SMEs and startups across East Africa.\n\n🚀 How we help smaller businesses:\n• Affordable strategic planning packages\n• Startup advisory and business model design\n• SME operational efficiency programs\n• HR setup and people strategy\n• Market entry strategy\n• Access to our East Africa business network\n\nOur initial consultation is always free — we assess whether and how we can add real value before any commitment.\n\nBuilding something? Let's talk: +254 712 770 999`
    },
    {
      keys:["testimonial","review","client","customer","success","results","case study","example","portfolio","track record","proof","reference"],
      ans:()=>`Our clients speak for themselves:\n\n⭐ Richard William, CEO Tech Startup:\n"Fiasco intervened on our stalled 9-figure project. They salvaged the entire timeline and restored investor confidence."\n\n⭐ Sara Albert, VP Operations:\n"When operational failure hit, Fiasco provided instant stabilization. Their decisive action minimized our financial losses significantly."\n\n⭐ James Millard, Corporate Counsel:\n"Their strategic communications team managed an aggressive media fallout brilliantly. We successfully repaired our reputation."\n\n⭐ Mariah Carey, CFO Global Retailer:\n"The forensic audit uncovered systemic issues that saved us from future massive liabilities."\n\n98% recovery rate. 300+ crises resolved.`
    },
    {
      keys:["thank","thanks","thank you","asante","appreciate","helpful","great","good","excellent","awesome","wonderful","perfect"],
      ans:()=>`You're most welcome! 😊\n\nFiasco Consultancy is always here when you need us:\n📞 +254 712 770 999\n✉️ info@fiascoconsultancy.co.ke\n\nRemember — whether it's a crisis today or strategic growth for tomorrow, we're ready to step in.\n\nIs there anything else I can help you with?`
    },
    {
      keys:["bye","goodbye","see you","later","done","exit","close","nothing else","that's all","farewell"],
      ans:()=>`Thank you for chatting with Fiasco Consultancy! 👋\n\n"When failure is not an option, Fiasco steps in."\n\n📞 +254 712 770 999\n🕐 Mon–Sat, 8:00 AM – 5:00 PM\n\nWe look forward to working with you. Take care!`
    },
  ],

  respond(input) {
    const low = input.toLowerCase().trim();
    let best = { score: 0, fn: null };
    for (const intent of this.intents) {
      let score = 0;
      for (const k of intent.keys) {
        if (low.includes(k)) score += k.split(" ").length * 3;
        else {
          for (const w of low.split(/\s+/)) {
            if (w.length > 3 && k.includes(w)) score += 1;
          }
        }
      }
      if (score > best.score) best = { score, fn: intent.ans };
    }
    if (best.score > 0) return best.fn();
    return `I'm not quite sure about that specific question, but I'm here to help! 🤔\n\nHere's what I can tell you about:\n• Our services (crisis, strategy, HR, data, digital)\n• The Fiasco 4-stage methodology\n• Our team specialists\n• Pricing and consultation booking\n• Contact and office locations\n\nTry asking something like "What services do you offer?" or "How do I book a consultation?"\n\nOr call us directly: 📞 +254 712 770 999`;
  },

  async reply(input) {
    await new Promise(r => setTimeout(r, 500 + Math.random() * 900));
    return this.respond(input);
  }
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {img:IMG.s1,icon:"◈",title:"Design Strategy & Innovation",badge:"Core",color:"#6C63FF",desc:"Thorough analysis and redesign of your business model to identify new revenue streams and market opportunities across East Africa."},
  {img:IMG.s2,icon:"⬡",title:"Digital Transformation",badge:"Popular",color:"#00D2FF",desc:"Cutting-edge digital solutions and cloud technologies to streamline operations, enhance collaboration, and boost efficiency at scale."},
  {img:IMG.s3,icon:"◉",title:"Advanced Data Analytics",badge:"Specialist",color:"#FF6B6B",desc:"Algorithms and data science to extract deep business insights, predict market trends, and optimize your decision-making processes."},
  {img:IMG.s4,icon:"◎",title:"Market Performance Audit",badge:"High Impact",color:"#FFA500",desc:"Customer journey mapping and detailed marketing audit to optimize channels, improve ROI, and maximize customer acquisition."},
  {img:IMG.s5,icon:"⬢",title:"Operational Excellence",badge:"In Demand",color:"#00C896",desc:"Close collaboration with your team to enhance business processes, eliminate inefficiencies and ensure peak organizational agility."},
  {img:IMG.s6,icon:"◆",title:"Talent & HR Strategy",badge:"Strategic",color:"#FF61D2",desc:"Focus on human capital — leadership development, new hire orientation, and strategic workforce planning for East African markets."},
  {img:IMG.s7,icon:"◇",title:"Project Management",badge:"Core",color:"#6C63FF",desc:"Tools and techniques capturing key indicators for effective project evaluation, turnaround, and on-time, on-budget delivery."},
  {img:IMG.s8,icon:"⬟",title:"Strategic Planning",badge:"Foundation",color:"#00D2FF",desc:"Integrated strategy from creation of well-balanced plans maximizing corporate values to full realization across East African markets."},
];

const SLIDES = [
  {img:IMG.hero1,h:"When Failure Is Not An Option",s:"Fiasco Consultancy steps in. We specialize in rapid intervention, project recovery, and strategic defense to navigate your most challenging business crises.",tag:"Crisis Specialists · East Africa"},
  {img:IMG.hero2,h:"Turning Crises Into Triumphs",s:"We transform uncertainty into clarity. From operational collapse to reputation repair — our decisive action restores confidence and drives lasting recovery.",tag:"Strategy · Recovery · Growth"},
  {img:IMG.hero3,h:"Strategy & Growth for East Africa",s:"Simplify your strategy. Accelerate your growth. Achieve operational excellence in Nairobi and beyond with East Africa's most trusted consultancy.",tag:"Nairobi, Kenya · 15+ Years"},
];

const TEAM = [
  {img:IMG.t1,name:"Amelia Wangui",role:"Head of Crisis Response",spec:"Rapid Intervention & Stabilization"},
  {img:IMG.t2,name:"Steve Nyagah",role:"Senior Turnaround Strategist",spec:"Project Recovery & Execution"},
  {img:IMG.t3,name:"Grace Elizabeth",role:"Forensic Audit Specialist",spec:"Investigation & Compliance"},
  {img:IMG.t4,name:"Michael Wainaina",role:"Reputation & Comms Lead",spec:"Media Defense & PR Strategy"},
];

const TESTI = [
  {img:IMG.t1,name:"Richard William",co:"CEO, Tech Startup",q:"Fiasco intervened on our stalled 9-figure project. They didn't just fix the errors — they salvaged the entire timeline and restored investor confidence. True experts in crisis."},
  {img:IMG.t2,name:"Sara Albert",co:"VP of Operations",q:"When the operational failure hit, Fiasco provided instant stabilization and a clear recovery path. Their calm, decisive action minimized our financial losses significantly."},
  {img:IMG.t3,name:"James Millard",co:"Corporate Counsel",q:"Their strategic communications team managed an aggressive media fallout brilliantly. We defended our position and successfully repaired our reputation."},
  {img:IMG.t4,name:"Mariah Carey",co:"CFO, Global Retailer",q:"The forensic audit uncovered systemic issues that saved us from future massive liabilities. Transparent, intelligent, and decisive when it mattered most."},
];

const PROJECTS = [
  {img:IMG.p1,title:"Failing Project Turnaround",cat:"Project Rescue",desc:"Rescued a Sh. 2.4B infrastructure project from collapse — delivered on revised timeline with all stakeholders fully realigned."},
  {img:IMG.p2,title:"Reputation Crisis Mitigation",cat:"Media Defense",desc:"Managed aggressive media fallout for a regional bank, restoring full public trust within 60 days of engagement."},
  {img:IMG.p3,title:"Internal Fraud Investigation",cat:"Forensic Audit",desc:"Uncovered a KES 180M internal fraud scheme across 3 subsidiaries, leading to successful prosecution and system reform."},
  {img:IMG.p4,title:"Operational Collapse Stabilization",cat:"Intervention",desc:"Deployed rapid-response team to stabilize a manufacturing firm facing full operational shutdown and supply chain failure."},
];

const BLOGS = [
  {img:IMG.blog1,date:"Mar 10, 2026",cat:"Prevention",title:"Lessons from the Near-Misses: Failure Prevention Tactics",read:"5 min"},
  {img:IMG.blog2,date:"Mar 12, 2026",cat:"Recovery",title:"The Art of the Project Turnaround: Rescuing Failing Initiatives",read:"7 min"},
  {img:IMG.blog3,date:"Mar 13, 2026",cat:"Crisis Comms",title:"Crisis Communications: Fixing Reputation Damage Post-Fiasco",read:"6 min"},
];

const PROCESS = [
  {n:"01",t:"Rapid Crisis Intervention",d:"Immediate deployment to halt damage, stabilize the situation, and secure critical assets — within hours, not weeks."},
  {n:"02",t:"Root Cause Fiasco Diagnosis",d:"Deep forensic investigation to uncover the precise origin of the problem and map its full organizational impact."},
  {n:"03",t:"Strategic Resolution & Action",d:"Development and aggressive execution of a tailored recovery plan — clear milestones, accountable owners, measurable outcomes."},
  {n:"04",t:"Future Stabilization & Resilience",d:"Long-term controls, systems, and team training to ensure stability and prevent the crisis from ever recurring."},
];

const STATS = [{v:"15+",l:"Years"},{v:"300+",l:"Crises Resolved"},{v:"98%",l:"Recovery Rate"},{v:"50+",l:"Clients"}];

const QUICK = ["What services do you offer?","I have a crisis — help!","Book a consultation","Tell me about your team","How does your process work?","What does it cost?"];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function FiascoApp() {
  const [dark,setDark]=useState(true);
  const [slide,setSlide]=useState(0);
  const [fading,setFading]=useState(false);
  const [nav,setNav]=useState("home");
  const [chatOpen,setChatOpen]=useState(false);
  const [msgs,setMsgs]=useState([{r:"ai",t:"Hello! I'm the Fiasco AI Assistant — trained entirely in-house on Fiasco Consultancy's knowledge base.\n\nNo API key, no internet connection needed. I live right here in your browser.\n\nHow can I help you today?"}]);
  const [inp,setInp]=useState("");
  const [thinking,setThinking]=useState(false);
  const [fs,setFs]=useState(16);
  const [rm,setRm]=useState(false);
  const [acc,setAcc]=useState(false);
  const [testi,setTesti]=useState(0);
  const [formData,setFormData]=useState({name:"",email:"",phone:"",service:"",message:""});
  const [sent,setSent]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const bottom=useRef(null);
  const A=!rm; const R="#E8303A";

  useEffect(()=>{const h=()=>setScrolled(window.scrollY>55);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{if(!A)return;const t=setInterval(()=>{setFading(true);setTimeout(()=>{setSlide(s=>(s+1)%SLIDES.length);setFading(false);},500);},6000);return()=>clearInterval(t);},[A]);
  useEffect(()=>{if(!A)return;const t=setInterval(()=>setTesti(s=>(s+1)%TESTI.length),5000);return()=>clearInterval(t);},[A]);
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const goSlide=i=>{setFading(true);setTimeout(()=>{setSlide(i);setFading(false);},300);};
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setNav(id);};

  const send=async(q=inp)=>{
    const text=(typeof q==="string"?q:inp).trim();
    if(!text||thinking)return;
    setInp("");
    setMsgs(m=>[...m,{r:"user",t:text}]);
    setThinking(true);
    const reply=await BRAIN.reply(text);
    setMsgs(m=>[...m,{r:"ai",t:reply}]);
    setThinking(false);
  };

  const bg=dark?"#050D1A":"#F0F4FF";
  const fg=dark?"#E8EDF8":"#0A1628";
  const fgM=dark?"rgba(232,237,248,0.52)":"rgba(10,22,40,0.52)";
  const bdr=dark?"rgba(255,255,255,0.08)":"rgba(10,22,40,0.09)";
  const T=A?"all 0.35s cubic-bezier(0.4,0,0.2,1)":"none";
  const G=(e={})=>({background:dark?"rgba(255,255,255,0.055)":"rgba(255,255,255,0.72)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",border:`1px solid ${bdr}`,borderRadius:20,...e});
  const NAV=["home","services","about","projects","team","blog","contact"];

  return (
    <div style={{fontFamily:"'Georgia','Times New Roman',serif",fontSize:fs,background:bg,color:fg,minHeight:"100vh",overflowX:"hidden"}}>

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,transition:T,background:scrolled?(dark?"rgba(5,13,26,0.96)":"rgba(240,244,255,0.96)"):"transparent",backdropFilter:scrolled?"blur(28px)":"none",WebkitBackdropFilter:scrolled?"blur(28px)":"none",borderBottom:scrolled?`1px solid ${bdr}`:"none"}}>
        <div style={{background:R,padding:"5px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:"#fff",fontFamily:"sans-serif"}}>Working Hours: Mon–Sat 8:00 AM – 5:00 PM</span>
          <span style={{fontSize:12,color:"#fff",fontFamily:"sans-serif",fontWeight:800}}>📞 +254 712 770 999</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",height:66}}>
          <div onClick={()=>scrollTo("home")} style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
            <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${R},#8B1520)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${R}55`}}>
              <span style={{color:"#fff",fontWeight:900,fontSize:19,fontFamily:"sans-serif",letterSpacing:-1}}>F!</span>
            </div>
            <div>
              <div style={{fontWeight:900,fontSize:17,letterSpacing:1,color:dark?"#fff":"#0A1628",fontFamily:"sans-serif"}}>FIASCO</div>
              <div style={{fontSize:9,color:fgM,letterSpacing:3,textTransform:"uppercase",fontFamily:"sans-serif"}}>Consultancy Limited</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:2}}>
            {NAV.map(n=>(
              <button key={n} onClick={()=>scrollTo(n)} style={{background:nav===n?`${R}18`:"transparent",color:nav===n?R:fg,border:"none",padding:"7px 13px",borderRadius:9,fontSize:12,cursor:"pointer",fontFamily:"sans-serif",textTransform:"capitalize",transition:T,fontWeight:nav===n?700:400}}>{n}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>setAcc(o=>!o)} style={{width:36,height:36,borderRadius:9,background:dark?"rgba(255,255,255,0.06)":"rgba(10,22,40,0.06)",border:`1px solid ${bdr}`,cursor:"pointer",fontSize:14,color:fg,display:"flex",alignItems:"center",justifyContent:"center"}}>⚙</button>
            <button onClick={()=>setDark(d=>!d)} style={{width:36,height:36,borderRadius:9,background:dark?"rgba(255,255,255,0.06)":"rgba(10,22,40,0.06)",border:`1px solid ${bdr}`,cursor:"pointer",fontSize:14,color:fg,display:"flex",alignItems:"center",justifyContent:"center"}}>{dark?"☀":"☾"}</button>
            <button onClick={()=>scrollTo("contact")} style={{background:`linear-gradient(135deg,${R},#8B1520)`,color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"sans-serif",fontWeight:800,boxShadow:`0 4px 20px ${R}44`}}>Get Help Now</button>
          </div>
        </div>
      </nav>

      {/* ── ACCESSIBILITY ── */}
      {acc&&(
        <div style={{position:"fixed",top:126,right:18,zIndex:2000,...G({padding:28,minWidth:280,boxShadow:"0 30px 80px rgba(0,0,0,0.45)"})}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15,fontFamily:"sans-serif",color:R}}>⚙ Accessibility</span>
            <button onClick={()=>setAcc(false)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:18,color:fgM}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:18,fontFamily:"sans-serif",fontSize:13}}>
            <div>
              <div style={{color:fgM,marginBottom:8}}>Font Size: <strong style={{color:fg}}>{fs}px</strong></div>
              <input type="range" min={13} max={22} step={1} value={fs} onChange={e=>setFs(+e.target.value)} style={{width:"100%"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:fgM}}>Theme</span>
              <div style={{display:"flex",gap:6}}>
                {[["Dark",true],["Light",false]].map(([l,v])=>(
                  <button key={l} onClick={()=>setDark(v)} style={{padding:"5px 13px",borderRadius:8,background:dark===v?R:"transparent",color:dark===v?"#fff":fg,border:`1px solid ${dark===v?R:bdr}`,cursor:"pointer",fontSize:12}}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:fgM}}>Reduce Motion</span>
              <div onClick={()=>setRm(r=>!r)} style={{width:44,height:24,borderRadius:12,background:rm?R:bdr,position:"relative",cursor:"pointer",transition:T}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:rm?23:3,transition:T}}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:fgM}}>High Contrast</span>
              <div style={{fontSize:12,color:R,fontFamily:"sans-serif"}}>Auto from theme</div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{height:"100vh",minHeight:700,position:"relative",overflow:"hidden"}}>
        {SLIDES.map((s,i)=>(
          <div key={i} style={{position:"absolute",inset:0,transition:A?"opacity 1.3s ease":"none",opacity:slide===i?1:0,zIndex:0}}>
            <Image src={s.img} alt="" fill sizes="100vw" style={{objectFit:"cover",filter:"brightness(0.3)"}} priority={i===0}/>
          </div>
        ))}
        <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(135deg,rgba(5,13,26,0.9) 0%,rgba(139,21,32,0.16) 100%)"}}/>
        <div style={{position:"absolute",inset:0,zIndex:1,backgroundImage:"radial-gradient(ellipse at 72% 28%,rgba(232,48,58,0.14) 0%,transparent 58%)"}}/>
        <div style={{position:"absolute",inset:0,zIndex:1,backgroundImage:`linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)`,backgroundSize:"80px 80px"}}/>
        <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",paddingTop:115}}>
          <div style={{maxWidth:860,textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(232,48,58,0.12)",border:"1px solid rgba(232,48,58,0.35)",borderRadius:100,padding:"7px 22px",marginBottom:34,backdropFilter:"blur(12px)"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:R,display:"inline-block",boxShadow:`0 0 12px ${R}`,animation:A?"pulsedot 2s infinite":"none"}}/>
              <span style={{color:"#FF8088",fontSize:11,fontFamily:"sans-serif",letterSpacing:2,textTransform:"uppercase"}}>{SLIDES[slide].tag}</span>
            </div>
            <div style={{minHeight:160,position:"relative"}}>
              {SLIDES.map((s,i)=>(
                <div key={i} style={{transition:A?"opacity 0.9s ease,transform 0.9s ease":"none",opacity:slide===i&&!fading?1:0,transform:slide===i&&!fading?"translateY(0)":"translateY(26px)",position:slide===i?"relative":"absolute",width:"100%",pointerEvents:slide===i?"auto":"none"}}>
                  <h1 style={{fontSize:"clamp(2.2rem,6vw,4.4rem)",fontWeight:900,color:"#fff",lineHeight:1.12,marginBottom:22,textShadow:"0 2px 40px rgba(0,0,0,0.5)",letterSpacing:-1}}>{s.h}</h1>
                  <p style={{fontSize:"clamp(1rem,2vw,1.22rem)",color:"rgba(232,237,248,0.76)",maxWidth:680,margin:"0 auto 44px",fontFamily:"sans-serif",lineHeight:1.75,fontWeight:300}}>{s.s}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginTop:34}}>
              <button onClick={()=>scrollTo("contact")} style={{background:`linear-gradient(135deg,${R},#8B1520)`,color:"#fff",border:"none",borderRadius:14,padding:"16px 36px",fontSize:15,cursor:"pointer",fontFamily:"sans-serif",fontWeight:800,boxShadow:`0 8px 40px ${R}55`,transition:T}}>Emergency Consultation →</button>
              <button onClick={()=>scrollTo("services")} style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"1px solid rgba(255,255,255,0.22)",borderRadius:14,padding:"16px 36px",fontSize:15,cursor:"pointer",fontFamily:"sans-serif",fontWeight:600,backdropFilter:"blur(12px)",transition:T}}>Explore Services</button>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:50}}>
              {SLIDES.map((_,i)=>(
                <button key={i} onClick={()=>goSlide(i)} style={{width:slide===i?34:9,height:9,borderRadius:100,background:slide===i?R:"rgba(255,255,255,0.28)",border:"none",cursor:"pointer",transition:T,padding:0}}/>
              ))}
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3,background:"rgba(5,13,26,0.8)",backdropFilter:"blur(24px)",borderTop:`1px solid rgba(232,48,58,0.16)`}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
            {STATS.map((s,i)=>(
              <div key={i} style={{padding:"20px 32px",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none"}}>
                <div style={{fontSize:30,fontWeight:900,color:R,fontFamily:"sans-serif",letterSpacing:-1}}>{s.v}</div>
                <div style={{fontSize:10,color:"rgba(232,237,248,0.42)",fontFamily:"sans-serif",letterSpacing:2,textTransform:"uppercase",marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{padding:"110px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SH tag="What We Offer" title="Our Consulting Services" sub="From crisis intervention to strategic transformation — comprehensive solutions for East Africa's most demanding business challenges." R={R} fgM={fgM}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:24}}>
            {SERVICES.map((s,i)=><SvcCard key={i} s={s} bdr={bdr} fgM={fgM} A={A} T={T} G={G}/>)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:"110px 24px",background:dark?"rgba(255,255,255,0.014)":"rgba(10,22,40,0.03)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div style={{position:"relative",height:520}}>
            <div style={{position:"absolute",top:0,left:0,width:"72%",height:"75%",borderRadius:20,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.38)"}}>
              <Image src={IMG.about} alt="Team" fill sizes="50vw" style={{objectFit:"cover"}}/>
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:"55%",height:"55%",borderRadius:20,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.38)",border:`3px solid ${bg}`}}>
              <Image src={IMG.about2} alt="Strategy" fill sizes="30vw" style={{objectFit:"cover"}}/>
            </div>
            <div style={{position:"absolute",top:"42%",right:"0%",...G({padding:"18px 22px",borderRadius:16,boxShadow:"0 20px 50px rgba(0,0,0,0.3)"})}}>
              <div style={{fontSize:30,fontWeight:900,color:R,fontFamily:"sans-serif",lineHeight:1}}>98%</div>
              <div style={{fontSize:10,color:fgM,fontFamily:"sans-serif",letterSpacing:1,textTransform:"uppercase",marginTop:4}}>Recovery Rate</div>
            </div>
          </div>
          <div>
            <div style={{color:R,fontSize:11,fontFamily:"sans-serif",letterSpacing:4,textTransform:"uppercase",marginBottom:14,fontWeight:700}}>The Fiasco Methodology</div>
            <h2 style={{fontSize:"clamp(1.9rem,3.5vw,2.8rem)",fontWeight:900,marginBottom:20,lineHeight:1.2,letterSpacing:-0.5}}>Restoring Order From Chaos</h2>
            <p style={{color:fgM,marginBottom:36,fontFamily:"sans-serif",lineHeight:1.85,fontSize:15}}>When failure is not an option, Fiasco Consultancy steps in. We specialize in rapid intervention, project recovery, and strategic defense — turning uncertainty into clarity and crises into opportunities for lasting transformation.</p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {PROCESS.map((p,i)=>(
                <div key={i} style={{...G({padding:"18px 22px",borderRadius:16}),display:"flex",gap:18,alignItems:"flex-start",transition:T}}>
                  <div style={{fontSize:26,fontWeight:900,color:`${R}28`,flexShrink:0,lineHeight:1,fontFamily:"sans-serif",minWidth:40}}>{p.n}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,marginBottom:4,color:R,fontFamily:"sans-serif"}}>{p.t}</div>
                    <div style={{fontSize:13,color:fgM,fontFamily:"sans-serif",lineHeight:1.7}}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{padding:"110px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SH tag="Case Studies" title="Crises We've Resolved" sub="Real results from real interventions across East Africa's most challenging business situations." R={R} fgM={fgM}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:28}}>
            {PROJECTS.map((p,i)=><ProjCard key={i} p={p} R={R} fgM={fgM} A={A} T={T} G={G}/>)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{padding:"110px 24px",background:dark?"rgba(255,255,255,0.014)":"rgba(10,22,40,0.03)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SH tag="Our Specialists" title="Meet the Crisis Team" sub="East Africa's most experienced crisis management and strategic consulting professionals." R={R} fgM={fgM}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
            {TEAM.map((m,i)=><TeamCard key={i} m={m} dark={dark} R={R} bdr={bdr} fgM={fgM} A={A} T={T} G={G}/>)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{padding:"110px 24px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <SH tag="Client Success" title="What Our Partners Say" R={R} fgM={fgM}/>
          <div style={{position:"relative",minHeight:265}}>
            {TESTI.map((t,i)=>(
              <div key={i} style={{transition:A?"opacity 0.7s ease,transform 0.7s ease":"none",opacity:testi===i?1:0,transform:testi===i?"translateY(0)":"translateY(14px)",position:testi===i?"relative":"absolute",top:0,left:0,right:0}}>
                <div style={{...G({padding:"44px 48px"})}}>
                  <div style={{fontSize:72,color:R,lineHeight:0.7,marginBottom:22,fontFamily:"sans-serif",opacity:0.4}}>&ldquo;</div>
                  <p style={{fontSize:17,lineHeight:1.8,fontStyle:"italic",marginBottom:32,color:dark?"rgba(232,237,248,0.9)":"rgba(10,22,40,0.85)"}}>{t.q}</p>
                  <div style={{display:"flex",alignItems:"center",gap:16}}>
                    <Image src={t.img} alt={t.name} width={52} height={52} style={{borderRadius:"50%",objectFit:"cover",border:`2px solid ${R}55`}}/>
                    <div>
                      <div style={{fontWeight:800,fontSize:15,fontFamily:"sans-serif"}}>{t.name}</div>
                      <div style={{fontSize:13,color:R,fontFamily:"sans-serif"}}>{t.co}</div>
                    </div>
                    <div style={{marginLeft:"auto"}}>{"★★★★★".split("").map((s,j)=><span key={j} style={{color:R,fontSize:16}}>{s}</span>)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:26}}>
            {TESTI.map((_,i)=><button key={i} onClick={()=>setTesti(i)} style={{width:testi===i?32:9,height:9,borderRadius:100,background:testi===i?R:`${R}40`,border:"none",cursor:"pointer",transition:T,padding:0}}/>)}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={{padding:"110px 24px",background:dark?"rgba(255,255,255,0.014)":"rgba(10,22,40,0.03)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SH tag="Insights" title="Blog & Articles" sub="Thought leadership on crisis management, turnaround strategy, and East African business resilience." R={R} fgM={fgM}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
            {BLOGS.map((b,i)=><BlogCard key={i} b={b} R={R} fgM={fgM} A={A} T={T} G={G}/>)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"110px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SH tag="Contact Us" title="Facing a Crisis? Let's Talk." sub="For urgent situations call us directly. For consultations and strategic engagements fill the form below." R={R} fgM={fgM}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
            <div style={{...G({padding:44})}}>
              {sent?(
                <div style={{textAlign:"center",padding:"60px 0"}}>
                  <div style={{fontSize:60,marginBottom:20}}>✅</div>
                  <div style={{fontWeight:900,fontSize:22,marginBottom:10}}>Message Received</div>
                  <div style={{color:fgM,fontFamily:"sans-serif",marginBottom:28}}>Our team will contact you within 2 hours for urgent matters.</div>
                  <button onClick={()=>setSent(false)} style={{background:"transparent",border:`1px solid ${R}`,color:R,borderRadius:10,padding:"10px 24px",cursor:"pointer",fontFamily:"sans-serif"}}>Send Another</button>
                </div>
              ):(
                <>
                  <h3 style={{fontSize:22,fontWeight:900,marginBottom:28,color:R}}>Schedule a Fiasco Audit</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:16}}>
                    {[{k:"name",l:"Full Name",p:"Your full name",t:"text"},{k:"email",l:"Email",p:"your@company.co.ke",t:"email"},{k:"phone",l:"Phone",p:"+254 7XX XXX XXX",t:"tel"}].map(f=>(
                      <div key={f.k}>
                        <label style={{fontSize:10,fontFamily:"sans-serif",color:fgM,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:7,fontWeight:700}}>{f.l}</label>
                        <input type={f.t} placeholder={f.p} value={formData[f.k]} onChange={e=>setFormData(d=>({...d,[f.k]:e.target.value}))} style={{width:"100%",padding:"13px 18px",background:dark?"rgba(255,255,255,0.05)":"rgba(10,22,40,0.04)",border:`1px solid ${bdr}`,borderRadius:12,color:fg,fontSize:14,fontFamily:"sans-serif",outline:"none",boxSizing:"border-box"}}/>
                      </div>
                    ))}
                    <div>
                      <label style={{fontSize:10,fontFamily:"sans-serif",color:fgM,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:7,fontWeight:700}}>Service</label>
                      <select value={formData.service} onChange={e=>setFormData(d=>({...d,service:e.target.value}))} style={{width:"100%",padding:"13px 18px",background:dark?"rgba(5,13,26,0.95)":"rgba(240,244,255,0.95)",border:`1px solid ${bdr}`,borderRadius:12,color:fg,fontSize:14,fontFamily:"sans-serif",outline:"none",boxSizing:"border-box"}}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize:10,fontFamily:"sans-serif",color:fgM,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:7,fontWeight:700}}>Describe Your Situation</label>
                      <textarea placeholder="Tell us about the challenge or crisis you're facing..." value={formData.message} onChange={e=>setFormData(d=>({...d,message:e.target.value}))} rows={5} style={{width:"100%",padding:"13px 18px",background:dark?"rgba(255,255,255,0.05)":"rgba(10,22,40,0.04)",border:`1px solid ${bdr}`,borderRadius:12,color:fg,fontSize:14,fontFamily:"sans-serif",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
                    </div>
                    <button onClick={()=>formData.name&&formData.email?setSent(true):null} style={{background:`linear-gradient(135deg,${R},#8B1520)`,color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:16,cursor:"pointer",fontFamily:"sans-serif",fontWeight:900,boxShadow:`0 8px 30px ${R}44`,transition:T}}>Request Fiasco Audit →</button>
                  </div>
                </>
              )}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:24}}>
              <div style={{borderRadius:20,overflow:"hidden",border:`1px solid ${bdr}`,flex:1,minHeight:300}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.977044879952!2d36.81193!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba7f3c3%3A0xf0d3e18af58c2e4!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" width="100%" height="100%" style={{border:0,display:"block",minHeight:300}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fiasco Location"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[{icon:"📍",l:"Head Office",v:"Standard Str, Standard Bld, Nairobi"},{icon:"🏢",l:"Branch Office",v:"Likoni Rd, Joakim Est, Nairobi"},{icon:"📞",l:"Emergency Line",v:"+254 712 770 999"},{icon:"🕐",l:"Hours",v:"Mon–Sat, 8:00 AM – 5:00 PM"}].map((c,i)=>(
                  <div key={i} style={{...G({padding:"18px 20px"})}}>
                    <div style={{fontSize:20,marginBottom:7}}>{c.icon}</div>
                    <div style={{fontSize:9,fontFamily:"sans-serif",color:R,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5,fontWeight:700}}>{c.l}</div>
                    <div style={{fontSize:12,fontFamily:"sans-serif",fontWeight:600,lineHeight:1.4}}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#030912",color:"rgba(232,237,248,0.52)",padding:"80px 24px 36px",borderTop:`1px solid rgba(232,48,58,0.12)`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1.5fr",gap:60,marginBottom:60}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
                <div style={{width:48,height:48,borderRadius:14,background:`linear-gradient(135deg,${R},#8B1520)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 24px ${R}55`}}>
                  <span style={{color:"#fff",fontWeight:900,fontSize:22,fontFamily:"sans-serif"}}>F!</span>
                </div>
                <div>
                  <div style={{fontWeight:900,fontSize:20,color:"#fff",fontFamily:"sans-serif",letterSpacing:1}}>FIASCO</div>
                  <div style={{fontSize:9,color:"rgba(232,237,248,0.28)",letterSpacing:3,fontFamily:"sans-serif",textTransform:"uppercase"}}>Consultancy Limited</div>
                </div>
              </div>
              <p style={{fontSize:13,lineHeight:1.85,maxWidth:320,fontFamily:"sans-serif"}}>Partnering with businesses to navigate complex market challenges. Delivering actionable crisis resolution and strategic insights that drive measurable recovery and long-term competitive advantage.</p>
              <div style={{display:"flex",gap:0,marginTop:24,maxWidth:300}}>
                <input placeholder="Your email for updates" style={{flex:1,padding:"11px 16px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRight:"none",borderRadius:"10px 0 0 10px",color:"#fff",fontSize:13,fontFamily:"sans-serif",outline:"none"}}/>
                <button style={{background:R,color:"#fff",border:"none",borderRadius:"0 10px 10px 0",padding:"0 18px",cursor:"pointer",fontSize:14,fontFamily:"sans-serif",fontWeight:800}}>→</button>
              </div>
            </div>
            <div>
              <div style={{color:R,fontSize:10,fontFamily:"sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontWeight:800}}>Services</div>
              {SERVICES.slice(0,6).map(s=><div key={s.title} onClick={()=>scrollTo("services")} style={{fontSize:13,fontFamily:"sans-serif",marginBottom:10,cursor:"pointer",lineHeight:1.4}}>{s.title}</div>)}
            </div>
            <div>
              <div style={{color:R,fontSize:10,fontFamily:"sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontWeight:800}}>Company</div>
              {["About Us","Our Team","Projects","Blog","Contact","Get a Quote"].map(s=><div key={s} style={{fontSize:13,fontFamily:"sans-serif",marginBottom:10,cursor:"pointer"}}>{s}</div>)}
            </div>
            <div>
              <div style={{color:R,fontSize:10,fontFamily:"sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontWeight:800}}>Recent Posts</div>
              {BLOGS.map(b=>(
                <div key={b.title} style={{display:"flex",gap:12,marginBottom:16,cursor:"pointer"}}>
                  <div style={{width:52,height:52,borderRadius:8,overflow:"hidden",flexShrink:0,position:"relative"}}>
                    <Image src={b.img} alt="" fill sizes="52px" style={{objectFit:"cover"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:R,fontFamily:"sans-serif",marginBottom:3}}>{b.date}</div>
                    <div style={{fontSize:12,fontFamily:"sans-serif",lineHeight:1.4,color:"rgba(232,237,248,0.62)"}}>{b.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
            <div style={{fontSize:12,fontFamily:"sans-serif"}}>© 2026 Fiasco Consultancy Ltd — All Rights Reserved</div>
            <div style={{fontSize:12,fontFamily:"sans-serif",color:R,fontWeight:700}}>+254 712 770 999</div>
          </div>
        </div>
      </footer>

      {/* ══ IN-HOUSE AI CHATBOT — NO API KEY, NO INTERNET ══ */}
      <div style={{position:"fixed",bottom:28,right:28,zIndex:9999}}>
        {chatOpen&&(
          <div style={{position:"absolute",bottom:80,right:0,width:390,height:560,display:"flex",flexDirection:"column",background:dark?"rgba(5,13,26,0.97)":"rgba(240,244,255,0.97)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",border:`1px solid ${bdr}`,borderRadius:24,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.6)"}}>

            {/* Header */}
            <div style={{padding:"16px 20px",background:`linear-gradient(135deg,rgba(232,48,58,0.18),rgba(139,21,32,0.06))`,borderBottom:`1px solid ${bdr}`,display:"flex",alignItems:"center",gap:14,flexShrink:0}}>
              <div style={{width:42,height:42,borderRadius:13,background:`linear-gradient(135deg,${R},#8B1520)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:17,fontFamily:"sans-serif",boxShadow:`0 4px 20px ${R}55`,flexShrink:0}}>F!</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:15,fontFamily:"sans-serif",color:fg}}>Fiasco AI Assistant</div>
                <div style={{fontSize:11,color:"#4CAF50",fontFamily:"sans-serif",display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:"#4CAF50",display:"inline-block",animation:A?"pulsedot 2s infinite":"none"}}/>
                  In-house AI · Zero API · Always online
                </div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:20,color:fgM,lineHeight:1}}>✕</button>
            </div>

            {/* Messages */}
            <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px",display:"flex",flexDirection:"column",gap:14}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.r==="user"?"flex-end":"flex-start",gap:10,alignItems:"flex-start"}}>
                  {m.r==="ai"&&(
                    <div style={{width:30,height:30,borderRadius:9,background:`linear-gradient(135deg,${R},#8B1520)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:900,fontFamily:"sans-serif",flexShrink:0,marginTop:2}}>F!</div>
                  )}
                  <div style={{maxWidth:"80%",padding:"11px 15px",borderRadius:m.r==="user"?"16px 16px 4px 16px":"4px 16px 16px 16px",background:m.r==="user"?`linear-gradient(135deg,${R},#8B1520)`:dark?"rgba(255,255,255,0.07)":"rgba(10,22,40,0.07)",color:m.r==="user"?"#fff":fg,fontSize:13,fontFamily:"sans-serif",lineHeight:1.65,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                    {m.t}
                  </div>
                </div>
              ))}
              {thinking&&(
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:9,background:`linear-gradient(135deg,${R},#8B1520)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:900,fontFamily:"sans-serif"}}>F!</div>
                  <div style={{padding:"13px 18px",borderRadius:"4px 16px 16px 16px",background:dark?"rgba(255,255,255,0.07)":"rgba(10,22,40,0.07)",display:"flex",gap:5,alignItems:"center"}}>
                    {[0,0.25,0.5].map((d,i)=><span key={i} style={{width:7,height:7,borderRadius:"50%",background:R,display:"inline-block",animation:A?`bounce 1.2s ${d}s infinite`:"none"}}/>)}
                  </div>
                </div>
              )}
              <div ref={bottom}/>
            </div>

            {/* Quick prompts — shown only at start */}
            {msgs.length<=1&&(
              <div style={{padding:"2px 12px 10px",display:"flex",gap:6,flexWrap:"wrap",flexShrink:0}}>
                {QUICK.map(q=>(
                  <button key={q} onClick={()=>send(q)} style={{fontSize:11,fontFamily:"sans-serif",padding:"5px 11px",borderRadius:100,background:`${R}12`,border:`1px solid ${R}35`,color:R,cursor:"pointer",transition:T,lineHeight:1.4}}>{q}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{padding:"12px 14px",borderTop:`1px solid ${bdr}`,display:"flex",gap:10,flexShrink:0}}>
              <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask anything about Fiasco..." style={{flex:1,padding:"11px 16px",background:dark?"rgba(255,255,255,0.05)":"rgba(10,22,40,0.04)",border:`1px solid ${bdr}`,borderRadius:100,color:fg,fontSize:13,fontFamily:"sans-serif",outline:"none"}}/>
              <button onClick={()=>send()} disabled={thinking} style={{width:44,height:44,borderRadius:"50%",background:thinking?`${R}55`:`linear-gradient(135deg,${R},#8B1520)`,border:"none",cursor:thinking?"default":"pointer",fontSize:18,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",transition:T,flexShrink:0}}>→</button>
            </div>
          </div>
        )}

        <button onClick={()=>setChatOpen(o=>!o)} style={{width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${R},#8B1520)`,border:"none",cursor:"pointer",fontSize:chatOpen?20:26,color:"#fff",boxShadow:`0 8px 40px ${R}66`,display:"flex",alignItems:"center",justifyContent:"center",transition:T,transform:chatOpen?"rotate(45deg)":"rotate(0deg)"}}>
          {chatOpen?"✕":"💬"}
        </button>

        {!chatOpen&&(
          <div style={{position:"absolute",bottom:72,right:0,background:dark?"rgba(5,13,26,0.96)":"#fff",color:fg,fontSize:12,fontFamily:"sans-serif",fontWeight:700,padding:"7px 14px",borderRadius:100,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.25)",border:`1px solid ${bdr}`,animation:A?"slideup 0.4s ease":"none"}}>
            💬 Fiasco AI — No API Key
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulsedot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.38;transform:scale(0.72)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-9px)}}
        @keyframes slideup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(232,48,58,0.4);border-radius:100px;}
      `}</style>
    </div>
  );
}

// ── SHARED COMPONENTS ──────────────────────────────────────────────────────────
function SH({tag,title,sub,R,fgM}){
  return(
    <div style={{textAlign:"center",marginBottom:66}}>
      {tag&&<div style={{color:R,fontSize:11,fontFamily:"sans-serif",letterSpacing:4,textTransform:"uppercase",marginBottom:14,fontWeight:700}}>{tag}</div>}
      <h2 style={{fontSize:"clamp(1.9rem,4vw,3.1rem)",fontWeight:900,letterSpacing:-0.5,marginBottom:sub?16:0}}>{title}</h2>
      {sub&&<p style={{color:fgM,maxWidth:620,margin:"0 auto",fontFamily:"sans-serif",lineHeight:1.8}}>{sub}</p>}
    </div>
  );
}
function SvcCard({s,bdr,fgM,A,T,G}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...G({overflow:"hidden"}),transition:T,transform:hov&&A?"translateY(-6px)":"translateY(0)",boxShadow:hov?`0 24px 60px rgba(0,0,0,0.3),0 0 0 1px ${s.color}30`:"none",border:`1px solid ${hov?s.color+"45":bdr}`}}>
      <div style={{height:180,overflow:"hidden",position:"relative"}}>
        <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 100vw,33vw" style={{objectFit:"cover",transition:A?"transform 0.65s ease":"none",transform:hov?"scale(1.09)":"scale(1)",filter:"brightness(0.7)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(5,13,26,0.85) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",top:14,right:14,background:`${s.color}20`,border:`1px solid ${s.color}55`,borderRadius:100,padding:"4px 12px"}}>
          <span style={{fontSize:9,fontFamily:"sans-serif",fontWeight:800,color:s.color,letterSpacing:0.5,textTransform:"uppercase"}}>{s.badge}</span>
        </div>
        <div style={{position:"absolute",bottom:14,left:18,fontSize:26,color:s.color}}>{s.icon}</div>
      </div>
      <div style={{padding:"22px 22px 26px"}}>
        <h3 style={{fontSize:17,fontWeight:800,marginBottom:10,letterSpacing:-0.3}}>{s.title}</h3>
        <p style={{fontSize:13,color:fgM,lineHeight:1.75,margin:0,fontFamily:"sans-serif"}}>{s.desc}</p>
        <div style={{marginTop:16,display:"flex",alignItems:"center",gap:5,color:s.color,fontSize:13,fontFamily:"sans-serif",fontWeight:700,cursor:"pointer"}}>
          Learn More <span style={{transition:T,transform:hov?"translateX(5px)":"translateX(0)"}}>→</span>
        </div>
      </div>
    </div>
  );
}
function ProjCard({p,R,fgM,A,T,G}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...G({overflow:"hidden"}),transition:T,transform:hov&&A?"translateY(-5px)":"translateY(0)",boxShadow:hov?"0 24px 60px rgba(0,0,0,0.3)":"none"}}>
      <div style={{height:220,overflow:"hidden",position:"relative"}}>
        <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw,50vw" style={{objectFit:"cover",transition:A?"transform 0.65s ease":"none",transform:hov?"scale(1.07)":"scale(1)",filter:"brightness(0.55)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(5,13,26,0.92) 0%,transparent 52%)"}}/>
        <div style={{position:"absolute",top:18,left:18,background:`${R}20`,border:`1px solid ${R}50`,borderRadius:100,padding:"5px 14px"}}>
          <span style={{fontSize:9,fontFamily:"sans-serif",color:R,fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>{p.cat}</span>
        </div>
      </div>
      <div style={{padding:"24px 28px"}}>
        <h3 style={{fontSize:19,fontWeight:900,marginBottom:10,letterSpacing:-0.3}}>{p.title}</h3>
        <p style={{fontSize:13,color:fgM,lineHeight:1.7,fontFamily:"sans-serif"}}>{p.desc}</p>
        <div style={{marginTop:16,color:R,fontSize:13,fontFamily:"sans-serif",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          View Case Study <span style={{transition:T,transform:hov?"translateX(5px)":"translateX(0)"}}>→</span>
        </div>
      </div>
    </div>
  );
}
function TeamCard({m,dark,R,bdr,fgM,A,T,G}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...G({textAlign:"center",overflow:"hidden"}),transition:T,transform:hov&&A?"translateY(-6px)":"translateY(0)",boxShadow:hov?`0 24px 60px rgba(0,0,0,0.25),0 0 0 1px ${R}28`:"none",border:`1px solid ${hov?R+"45":bdr}`}}>
      <div style={{height:200,overflow:"hidden",position:"relative"}}>
        <Image src={m.img} alt={m.name} fill sizes="(max-width:768px) 50vw,25vw" style={{objectFit:"cover",objectPosition:"top",transition:A?"transform 0.65s ease":"none",transform:hov?"scale(1.07)":"scale(1)",filter:"brightness(0.76)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(5,13,26,0.76) 0%,transparent 55%)"}}/>
      </div>
      <div style={{padding:"20px 18px 24px"}}>
        <div style={{fontWeight:900,fontSize:16,marginBottom:5,fontFamily:"sans-serif"}}>{m.name}</div>
        <div style={{color:R,fontSize:13,fontFamily:"sans-serif",fontWeight:700,marginBottom:8}}>{m.role}</div>
        <div style={{fontSize:12,color:fgM,fontFamily:"sans-serif"}}>{m.spec}</div>
        <div style={{marginTop:14,display:"flex",gap:8,justifyContent:"center"}}>
          {["in","tw","@"].map(s=><div key={s} style={{width:28,height:28,borderRadius:8,background:dark?"rgba(255,255,255,0.06)":"rgba(10,22,40,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:fgM,fontFamily:"sans-serif",fontWeight:700,cursor:"pointer"}}>{s}</div>)}
        </div>
      </div>
    </div>
  );
}
function BlogCard({b,R,fgM,A,T,G}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...G({overflow:"hidden"}),transition:T,transform:hov&&A?"translateY(-5px)":"translateY(0)",boxShadow:hov?"0 20px 50px rgba(0,0,0,0.25)":"none"}}>
      <div style={{height:200,overflow:"hidden",position:"relative"}}>
        <Image src={b.img} alt={b.title} fill sizes="(max-width:768px) 100vw,33vw" style={{objectFit:"cover",transition:A?"transform 0.65s ease":"none",transform:hov?"scale(1.07)":"scale(1)",filter:"brightness(0.62)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(5,13,26,0.82) 0%,transparent 56%)"}}/>
        <div style={{position:"absolute",top:14,left:14,background:`${R}20`,border:`1px solid ${R}50`,borderRadius:100,padding:"4px 12px"}}>
          <span style={{fontSize:9,fontFamily:"sans-serif",color:R,fontWeight:800,letterSpacing:0.5}}>{b.cat}</span>
        </div>
      </div>
      <div style={{padding:"22px 22px 26px"}}>
        <div style={{display:"flex",gap:12,marginBottom:12,fontFamily:"sans-serif",fontSize:11,color:fgM}}>
          <span>{b.date}</span><span>·</span><span>{b.read} read</span>
        </div>
        <h3 style={{fontSize:16,fontWeight:800,lineHeight:1.45,letterSpacing:-0.2}}>{b.title}</h3>
        <div style={{marginTop:14,color:R,fontSize:13,fontFamily:"sans-serif",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          Read Article <span style={{transition:T,transform:hov?"translateX(5px)":"translateX(0)"}}>→</span>
        </div>
      </div>
    </div>
  );
}
