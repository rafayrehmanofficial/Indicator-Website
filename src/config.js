// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. This is the only file you need to touch
//  to put the site live.
// ─────────────────────────────────────────────────────────────

// WhatsApp number in full international format, digits only.
// Example: Pakistan +92 300 1234567  ->  "923001234567"
export const WHATSAPP_NUMBER = '923144481259'

// The message that gets pre-filled when someone taps a CTA.
export const WHATSAPP_MESSAGE =
  "I'd like to request access to Billion $ Code. I understand the broker requirement."

export const waLink = (msg = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

// Broker referral links. Paste your IB / partner links here.
export const BROKERS = [
  { name: 'Exness', href: 'https://exness.com/', tag: 'PARTNER-01' },
  { name: 'XM', href: 'https://xm.com/', tag: 'PARTNER-02' },
]

// Optional. Leave a value as an empty string and the link disappears.
export const SOCIALS = [
  { name: 'Telegram', href: '' },
  { name: 'Instagram', href: '' },
  { name: 'Email', href: '' },
]

export const PRICE = 35
export const CURRENCY = '$'

export const STATS = [
  { value: 500, suffix: '+', label: 'Avg daily pips', note: 'desk aggregate' },
  { value: 13, suffix: '', label: 'Traders behind it', note: 'signatures verified' },
  { value: 1, suffix: '', label: 'Line on your chart', note: 'nothing stacked' },
  { value: 0, suffix: '', label: 'Bars repainted', note: 'ever' },
]

export const VERSION = 'v4.2.1'
