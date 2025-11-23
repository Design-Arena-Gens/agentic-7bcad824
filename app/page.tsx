'use client';

import { useMemo, useState } from 'react';

type FormState = {
  businessName: string;
  niche: string;
  ownerName: string;
  city: string;
  observations: string;
  yourName: string;
};

const initialState: FormState = {
  businessName: '',
  niche: '',
  ownerName: '',
  city: '',
  observations: '',
  yourName: '',
};

function titleCase(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');
}

function sanitize(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function buildSubject({ ownerName, businessName }: Pick<FormState, 'ownerName' | 'businessName'>): string {
  const name = sanitize(ownerName || '');
  const biz = sanitize(businessName || 'your business');
  if (name) return `Hi ${titleCase(name)}, quick question about ${biz}`;
  return `Quick question about ${biz}`;
}

function buildMessage(data: FormState): string {
  const owner = sanitize(data.ownerName || '');
  const business = sanitize(data.businessName || 'your business');
  const niche = sanitize(data.niche || '');
  const city = sanitize(data.city || '');
  const obs = sanitize(data.observations || '');
  const myName = sanitize(data.yourName || '?');

  const line1Parts: string[] = [];
  if (owner) {
    line1Parts.push(`Hi ${titleCase(owner)},`);
  } else {
    line1Parts.push('Hi there,');
  }
  const place = city ? ` in ${titleCase(city)}` : '';
  const nichePart = niche ? ` in the ${niche.toLowerCase()} space` : '';
  line1Parts.push(`I've been following the work you're doing at ${business}${place}${nichePart}?impressive.`);
  const line1 = line1Parts.join(' ');

  const observation = obs
    ? `I noticed ${obs}.`
    : `I took a look at a few public touchpoints (site, social, and booking).`;

  const value = [
    `I'm helping local operators focus on reactivation and client retention by re-engaging past inquiries who never purchased.`,
    `It's a low-lift optimization using the list you already have?no ad spend.`,
    `We're seeing strong reply rates and quick wins within days.`,
  ].join(' ');

  const close = `Open to a brief overview of how the reactivation flow works for ${business}? Best, ${myName}`;

  return [line1, '', observation, '', value, '', close].join('\n');
}

export default function Page() {
  const [form, setForm] = useState<FormState>(initialState);
  const [copied, setCopied] = useState(false);

  const subject = useMemo(() => buildSubject(form), [form]);
  const message = useMemo(() => buildMessage(form), [form]);

  function update<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setCopied(false);
    };
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${message}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleFillExample() {
    setForm({
      businessName: 'Reform Fitness',
      niche: 'Gym / Fitness',
      ownerName: 'Mike',
      city: 'Rancho Santa Margarita',
      observations: "things have been quiet on social lately?which often means you're busy with clients",
      yourName: 'Alex',
    });
  }

  function handleReset() {
    setForm(initialState);
  }

  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="panel">
        <div className="grid cols-2">
          <div className="stack">
            <div className="row">
              <label>Business Name</label>
              <input type="text" placeholder="e.g., Reform Fitness" value={form.businessName} onChange={update('businessName')} />
            </div>
            <div className="row">
              <label>Niche</label>
              <input type="text" placeholder="e.g., Spa, Gym, Dental, Home Services" value={form.niche} onChange={update('niche')} />
            </div>
            <div className="row">
              <label>City (optional)</label>
              <input type="text" placeholder="e.g., Austin" value={form.city} onChange={update('city')} />
            </div>
          </div>
          <div className="stack">
            <div className="row">
              <label>Owner's Name (optional)</label>
              <input type="text" placeholder="e.g., Mike" value={form.ownerName} onChange={update('ownerName')} />
            </div>
            <div className="row">
              <label>Your Name</label>
              <input type="text" placeholder="e.g., Alex" value={form.yourName} onChange={update('yourName')} />
            </div>
            <div className="row">
              <label>Key Observations</label>
              <textarea
                placeholder='e.g., your booking page asks for phone but there is no follow-up; last IG post 6 weeks ago; strong reviews on Google'
                value={form.observations}
                onChange={update('observations')}
              />
              <div className="hint">
                Keep it gentle and specific. One clear observation is enough.
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Subject + Message'}</button>
          <button className="btn secondary" onClick={handleFillExample}>Fill Example</button>
          <button className="btn secondary" onClick={handleReset}>Reset</button>
          <span className="badge">Professional ? Concise ? Empathetic</span>
        </div>
      </section>

      <section className="panel">
        <div className="stack">
          <div className="row">
            <label>Subject / Opening</label>
            <div className="output">{subject}</div>
          </div>
          <div className="row">
            <label>Message Preview</label>
            <div className="output">{message}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

