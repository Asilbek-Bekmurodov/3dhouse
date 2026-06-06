import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: 'rgba(0,212,255,0.05)',
  border: '1px solid rgba(0,212,255,0.2)',
  color: 'var(--text)',
  padding: '12px 16px',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: 10,
  letterSpacing: 2,
  color: 'var(--cyan)',
  textTransform: 'uppercase',
  marginBottom: 8,
}

export default function ContactSection() {
  const [form, setForm] = useState({ ism: '', telefon: '', xabar: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Form yuborildi:', form)
    setSent(true)
    setForm({ ism: '', telefon: '', xabar: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section
      id="aloqa"
      style={{
        padding: '80px 60px',
        background: 'rgba(0,212,255,0.015)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="section-tag">▶ Aloqa</div>
      <h2 className="section-heading">Biz bilan<br />bog'laning</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Ismingiz</label>
            <input
              name="ism" value={form.ism} onChange={handleChange}
              required placeholder="To'liq ismingiz"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Telefon</label>
            <input
              name="telefon" value={form.telefon} onChange={handleChange}
              required placeholder="+998 90 000 00 00"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Xabar</label>
            <textarea
              name="xabar" value={form.xabar} onChange={handleChange}
              required placeholder="Qiziqishingiz haqida yozing..."
              rows={5}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%', background: 'var(--cyan)', color: 'var(--bg)',
              border: 'none', padding: '14px 0',
              fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            }}
          >
            {sent ? '✓ Yuborildi' : 'Yuborish →'}
          </button>
        </form>

        <div>
          {[
            { label: 'Manzil',  value: "Toshkent, O'zbekiston" },
            { label: 'Telefon', value: '+998 90 000 00 00' },
            { label: 'Email',   value: 'info@nexushomes.uz' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 28 }}>
              <div style={labelStyle}>{item.label}</div>
              <div style={{ fontSize: 15 }}>{item.value}</div>
            </div>
          ))}

          <div style={{
            marginTop: 8, padding: 24,
            border: '1px solid var(--border)',
            background: 'rgba(0,212,255,0.03)',
          }}>
            <div style={labelStyle}>Ish vaqti</div>
            <div style={{ fontSize: 14 }}>Dush – Juma: 09:00 – 18:00</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Shanba: 10:00 – 15:00</div>
          </div>
        </div>
      </div>
    </section>
  )
}
