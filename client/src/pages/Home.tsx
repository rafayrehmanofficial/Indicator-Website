/*
 * Style reminder — Terminal Monolith: asymmetric command-console layout,
 * IBM Plex Sans for readable copy, Space Mono for telemetry, graphite surfaces,
 * acid green status, and Terminal Amber reserved for the dollar sign and priority CTAs.
 */
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, CircleDot, Mail, MessageCircle, ShieldCheck, Terminal, Zap } from "lucide-react";
import TerminalChart from "@/components/TerminalChart";

const WHATSAPP_URL = "https://wa.me/923144481259?text=Hi%2C%20I%E2%80%99m%20interested%20in%20Billion%20%24%20Code%20and%20the%20%2435%2Fmonth%20membership.";

const screenshots = [
  { src: "/manus-storage/session-wide-read_cf82e91d.png", label: "SESSION / WIDE READ", note: "multi-swing view", tone: "amber" },
  { src: "/manus-storage/session-clean-read_f0f78c8a.png", label: "SESSION / CLEAN READ", note: "replay state", tone: "cyan" },
  { src: "/manus-storage/session-risk-map_00c2e868.png", label: "SESSION / RISK MAP", note: "measured field", tone: "magenta" },
  { src: "/manus-storage/session-replay_1237aaf7.png", label: "SESSION / REPLAY", note: "structured move", tone: "acid" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-lockup ${compact ? "brand-lockup-compact" : ""}`} href="#top" aria-label="Billion $ Code home">
      <img src="/manus-storage/billion-dollar-code-mark_8161dccb.png" alt="" className="brand-mark" />
      <span className="brand-type"><span>Billion</span> <b>$</b> <span>Code</span></span><span className="brand-cursor" aria-hidden="true" />
    </a>
  );
}

function WhatsAppButton({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <a className={`cta-button ${secondary ? "cta-button-secondary" : ""}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
      <MessageCircle size={16} strokeWidth={1.8} />
      <span>{children}</span>
      <ArrowUpRight size={15} strokeWidth={1.8} />
    </a>
  );
}

function TerminalLine({ prompt, children, accent = false }: { prompt: string; children: React.ReactNode; accent?: boolean }) {
  return <div className={`terminal-line ${accent ? "terminal-line-accent" : ""}`}><span className="terminal-prompt">{prompt}</span><span>{children}</span></div>;
}

export default function Home() {
  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <BrandMark />
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#instrument">Instrument</a>
          <a href="#protocol">Protocol</a>
          <a href="#access">Access</a>
        </nav>
        <a className="header-status" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span className="live-dot" /> <span className="header-status-full">ONLINE // </span>WHATSAPP</a>
      </header>

      <main>
        <section className="hero-section page-pad">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-layout content-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-mark">B$C://</span> PRIVATE MARKET INSTRUMENT <span className="eyebrow-line" /></div>
              <h1>Read the market.<br /><span>Cut the noise.</span></h1>
              <p className="hero-intro">Billion <strong>$</strong> Code is a focused market-reading instrument for traders who want a clearer operating rhythm, direct support, and mentorship behind every decision.</p>
              <div className="hero-actions"><WhatsAppButton>Request access // $35 monthly</WhatsAppButton><a className="text-link" href="#instrument">View the instrument <ArrowDownRight size={15} /></a></div>
              <div className="hero-proof"><span className="proof-icon"><ShieldCheck size={15} /></span><span>Built by <b>13 experienced traders</b> for operators who prefer process over noise.</span></div>
            </div>
            <div className="hero-instrument-wrap">
              <div className="instrument-label instrument-label-top"><span>SYS.01</span><span>LIVE TELEMETRY</span></div>
              <div className="hero-instrument">
                <div className="terminal-window-bar"><div className="window-dots"><i /><i /><i /></div><span>B$C / terminal_read</span><span className="window-time">13:37:08</span></div>
                <div className="terminal-window-content"><div className="terminal-lines"><TerminalLine prompt="01">booting focus_protocol...</TerminalLine><TerminalLine prompt="02">calibrating market_context <span className="terminal-ok">[OK]</span></TerminalLine><TerminalLine prompt="03">reading momentum <span className="terminal-arrow">→</span> <span className="terminal-amber">clean</span></TerminalLine></div><TerminalChart /></div>
                <div className="terminal-window-bottom"><span><CircleDot size={11} /> EXECUTION MODE</span><span>NOISE FILTER // ON</span></div>
              </div>
              <div className="instrument-label instrument-label-bottom"><span>DRAWN FROM LIVE SESSIONS</span><span>v2.4.1</span></div>
            </div>
          </div>
          <div className="scroll-cue"><span className="scroll-cue-line" /> SCROLL TO READ THE SIGNAL</div>
        </section>

        <section className="metrics-band" aria-label="Billion $ Code overview metrics">
          <div className="content-width metrics-grid">
            <div className="metric-block"><span className="metric-value">13</span><span className="metric-label">EXPERIENCED<br />TRADERS</span></div>
            <div className="metric-block"><span className="metric-value metric-value-amber">$35</span><span className="metric-label">MONTHLY<br />ACCESS</span></div>
            <div className="metric-block"><span className="metric-value">500<span className="metric-plus">+</span></span><span className="metric-label">PIPS IN<br />SELECTED EXAMPLES*</span></div>
            <div className="metric-block metric-note"><span className="metric-label">ONE PACKAGE.<br />DIRECT SUPPORT.<br />MENTORSHIP INCLUDED.</span><ArrowUpRight size={20} /></div>
          </div>
        </section>

        <section className="manifesto-section page-pad" id="instrument">
          <div className="content-width manifesto-layout">
            <div className="section-index">[01] / THE INSTRUMENT</div>
            <div className="manifesto-content"><div className="command-row"><span className="terminal-prompt">B$C://</span><span>process_protocol</span><span className="command-row-state">RUNNING</span></div><p className="display-statement">When the market speeds up, your process should get <em>clearer</em> — not louder.</p><p className="body-copy">Billion $ Code turns complex market movement into a visual operating rhythm. No dashboards to babysit. No endless indicators to translate. One focused view, backed by a team that has spent years learning how markets behave under pressure.</p><div className="inline-signal"><span className="inline-signal-dot" /><span>THE CODE IS NOT THE EDGE. THE PROCESS IS.</span></div></div>
          </div>
        </section>

        <section className="protocol-section page-pad" id="protocol">
          <div className="content-width">
            <div className="section-heading-row"><div><div className="section-index">[02] / THE PROTOCOL</div><h2>Three moves.<br /><span>One calmer read.</span></h2></div><p className="section-aside">A practical sequence for traders who want to see the moment, frame the move, and execute with intention.</p></div>
            <div className="protocol-grid">
              <article className="protocol-card"><div className="protocol-card-top"><span>01</span><ArrowUpRight size={18} /></div><div className="protocol-icon"><Terminal size={24} /></div><h3>Detect</h3><p>See the market’s shift before the noise around it becomes the decision.</p><div className="protocol-command">$ detect --signal <b>ready</b></div></article>
              <article className="protocol-card protocol-card-focus"><div className="protocol-card-top"><span>02</span><ArrowUpRight size={18} /></div><div className="protocol-icon"><Zap size={24} /></div><h3>Frame</h3><p>Turn a fast-moving chart into a measured scenario with a defined point of view.</p><div className="protocol-command">$ frame --context <b>clear</b></div></article>
              <article className="protocol-card"><div className="protocol-card-top"><span>03</span><ArrowUpRight size={18} /></div><div className="protocol-icon"><ArrowUpRight size={24} /></div><h3>Execute</h3><p>Move with the discipline to follow your plan — and the support to refine it.</p><div className="protocol-command">$ execute --focus <b>on</b></div></article>
            </div>
          </div>
        </section>

        <section className="proof-section page-pad">
          <div className="content-width proof-layout"><div className="proof-heading"><div className="section-index">[03] / WORKING SESSIONS</div><div className="evidence-rail"><span className="terminal-prompt">EVIDENCE://</span><span>4 CAPTURES / LIVE READ</span></div><h2>See the code<br /><span>in motion.</span></h2><p>These are real working-session captures from the instrument. The interface is designed to make the read visible before the action becomes obvious.</p><a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Ask for the walkthrough <ArrowUpRight size={15} /></a></div><div className="screenshot-grid">{screenshots.map((shot, index) => <figure className={`screenshot-card screenshot-card-${index + 1} screenshot-tone-${shot.tone}`} key={shot.src}><div className="screenshot-meta"><span>{shot.label}</span><span>{shot.note}</span></div><div className="screenshot-frame"><div className="scanline" /><img src={shot.src} alt={`Billion $ Code working session showing a TradingView chart, ${shot.note}`} loading={index > 1 ? "lazy" : "eager"} /></div></figure>)}</div></div>
        </section>

        <section className="access-section page-pad" id="access">
          <div className="content-width access-layout"><div className="access-copy"><div className="section-index">[04] / ACCESS PROTOCOL</div><h2>One package.<br /><span>Full signal.</span></h2><p>Get the indicator, direct support, and mentorship in one focused monthly membership. No stacked tiers. No confusing add-ons.</p><div className="access-terms"><div><Check size={16} /><span>Indicator access and updates</span></div><div><Check size={16} /><span>Direct support at support@billiondollarcode.com</span></div><div><Check size={16} /><span>Mentorship on reading and using the instrument</span></div><div><Check size={16} /><span>Practical onboarding through WhatsApp</span></div></div></div><div className="price-console"><div className="price-console-bar"><span>MEMBERSHIP / SINGLE_PLAN</span><span className="terminal-ok">ACTIVE</span></div><div className="price-main"><span className="price-currency">$</span><span className="price-number">35</span><div className="price-period">USD<br /><span>PER MONTH</span></div></div><div className="price-rule" /><p>Access is recurring monthly. Cancel before your next renewal. Educational support only; trading carries risk and outcomes vary.</p><WhatsAppButton>Open WhatsApp // request access</WhatsAppButton><div className="price-foot"><span><ShieldCheck size={13} /> NO GUARANTEED RETURNS</span><span>ONE PLAN // CLEAR TERMS</span></div></div></div>
        </section>

        <section className="requirements-section page-pad"><div className="content-width requirements-layout"><div className="requirements-title"><div className="section-index">[05] / ENTRY CHECK</div><h2>Built for traders<br /><span>ready to focus.</span></h2></div><div className="requirements-list"><div className="requirement-item"><span className="requirement-number">01</span><div><h3>Exness or XM user</h3><p>Your trading account must be with Exness or XM.</p></div><Check size={19} /></div><div className="requirement-item"><span className="requirement-number">02</span><div><h3>Team referral required</h3><p>Join through our team referral before access is activated.</p></div><Check size={19} /></div><div className="requirement-item"><span className="requirement-number">03</span><div><h3>Willing to learn the process</h3><p>Bring a chart, a question, and the discipline to practice.</p></div><Check size={19} /></div></div></div></section>

        <section className="faq-section page-pad"><div className="content-width faq-layout"><div><div className="section-index">[06] / READ BEFORE ENTRY</div><h2>Clear terms.<br /><span>No theatre.</span></h2></div><div className="faq-list"><details open><summary>What is included in the $35/month membership?<ChevronDown size={18} /><span>+</span></summary><p>The single plan includes access to the Billion $ Code indicator, product updates, direct support through the listed channels, and mentorship on how to use the instrument as part of your own trading process.</p></details><details><summary>Why do I need to use Exness or XM? <ChevronDown size={18} /><span>+</span></summary><p>Membership onboarding is currently built for traders using Exness or XM. You must join through the team referral before access can be activated.</p></details><details><summary>Is this a guarantee of profit? <ChevronDown size={18} /><span>+</span></summary><p>No. Billion $ Code is an educational tool and support membership. Trading involves risk, past or selected examples do not predict future results, and no outcome or return is guaranteed.</p></details><details><summary>How do I request access? <ChevronDown size={18} /><span>+</span></summary><p>Open WhatsApp using any request-access button, tell the team you want Billion $ Code, and we’ll guide you through the referral and onboarding steps.</p></details></div></div></section>

        <section className="final-cta page-pad"><div className="content-width final-cta-inner"><div className="final-cta-prompt"><span className="terminal-prompt">B$C://</span><span>signal_request</span><span className="cursor-block" /></div><h2>Make your next read<br /><span>more intentional.</span></h2><p>Request access to Billion $ Code and speak with the team directly.</p><WhatsAppButton>Message the team on WhatsApp</WhatsAppButton></div></section>
      </main>

      <footer className="site-footer"><div className="content-width footer-inner"><BrandMark compact /><div className="footer-middle"><span>© 2026 BILLION $ CODE</span><span>EDUCATIONAL TOOL // RESULTS VARY</span></div><a href="mailto:support@billiondollarcode.com"><Mail size={14} /> support@billiondollarcode.com</a></div></footer>
      <div className="risk-strip">* SELECTED EXAMPLES ARE ILLUSTRATIVE, NOT A PROMISE OF TYPICAL RESULTS. TRADING INVOLVES SUBSTANTIAL RISK. <ArrowUpRight size={12} /></div>
    </div>
  );
}
