import React, { useState } from 'react';
import './TemplateGallery.css';

const templates = [
  {
    id: 1,
    name: 'Corporate Minimal',
    category: 'Business',
    preview: 'corporate',
    bg: '#ffffff',
    accent: '#6366f1',
  },
  {
    id: 2,
    name: 'Neon Cyberpunk',
    category: 'Creative',
    preview: 'cyberpunk',
    bg: '#0f0f1a',
    accent: '#ec4899',
  },
  {
    id: 3,
    name: 'Eco Nature',
    category: 'Education',
    preview: 'nature',
    bg: '#f0fdf4',
    accent: '#16a34a',
  },
  {
    id: 4,
    name: 'Sleek Dark Pro',
    category: 'Technology',
    preview: 'dark',
    bg: '#0f172a',
    accent: '#38bdf8',
  },
  {
    id: 5,
    name: 'Vintage Retro',
    category: 'Creative',
    preview: 'retro',
    bg: '#fef3c7',
    accent: '#b45309',
  },
  {
    id: 6,
    name: 'Medical Clean',
    category: 'Healthcare',
    preview: 'medical',
    bg: '#f0f9ff',
    accent: '#0284c7',
  },
  {
    id: 7,
    name: 'Bold Impact',
    category: 'Business',
    preview: 'bold',
    bg: '#1e1e2e',
    accent: '#f59e0b',
  },
  {
    id: 8,
    name: 'Pastel Soft',
    category: 'Education',
    preview: 'pastel',
    bg: '#fdf4ff',
    accent: '#a855f7',
  },
  {
    id: 9,
    name: 'Ocean Gradient',
    category: 'Creative',
    preview: 'ocean',
    bg: '#0c4a6e',
    accent: '#67e8f9',
  },
  {
    id: 10,
    name: 'Finance Report',
    category: 'Business',
    preview: 'finance',
    bg: '#f8fafc',
    accent: '#1e40af',
  },
  {
    id: 11,
    name: 'Startup Pitch',
    category: 'Technology',
    preview: 'startup',
    bg: '#18181b',
    accent: '#22d3ee',
  },
  {
    id: 12,
    name: 'Academic Research',
    category: 'Education',
    preview: 'academic',
    bg: '#fffbeb',
    accent: '#7c3aed',
  },
  {
    id: 13,
    name: 'Future Tech',
    category: 'Technology',
    preview: 'cyberpunk',
    bg: '#050510',
    accent: '#00ffcc',
  },
];

const FILTERS = ['All', 'Business', 'Creative', 'Education', 'Healthcare', 'Technology'];

const TemplatePreview = ({ type, bg, accent }) => {
  const textColor = bg === '#ffffff' || bg.startsWith('#f') ? '#1e293b' : '#f8fafc';
  const subTextColor = bg === '#ffffff' || bg.startsWith('#f') ? '#64748b' : 'rgba(255,255,255,0.5)';

  const previews = {
    corporate: (
      <div className="tp tp-corporate" style={{ background: bg }}>
        <div className="tp-sidebar" style={{ background: accent }} />
        <div className="tp-body">
          <div className="tp-tag" style={{ background: accent + '22', color: accent }}>PRESENTATION</div>
          <div className="tp-title-bar" style={{ background: textColor, width: '70%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: textColor, width: '50%', marginTop: 4 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="tp-box" style={{ background: i === 1 ? accent : accent + '33', flex: 1 }} />
            ))}
          </div>
        </div>
      </div>
    ),
    cyberpunk: (
      <div className="tp" style={{ background: bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
        <div style={{ position: 'absolute', inset: 10, border: `1px solid ${accent}44`, borderRadius: 2 }} />
        <div style={{ position: 'relative', padding: '14px 12px' }}>
          <div style={{ color: accent, fontSize: 7, letterSpacing: 2, marginBottom: 8 }}>// SYSTEM</div>
          <div className="tp-title-bar" style={{ background: accent, width: '80%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: accent + '88', width: '55%', marginTop: 4 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            <div style={{ flex: 2, background: accent + '22', borderRadius: 2, border: `1px solid ${accent}55`, height: 30 }} />
            <div style={{ flex: 1, background: accent + '44', borderRadius: 2, height: 30 }} />
          </div>
        </div>
      </div>
    ),
    nature: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ background: `linear-gradient(135deg, ${accent}33, transparent)`, position: 'absolute', inset: 0, borderRadius: 6 }} />
        <div style={{ position: 'relative', padding: '12px 10px' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: accent + '33', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🌿</div>
          <div className="tp-title-bar" style={{ background: accent, width: '75%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: accent + '88', width: '50%', marginTop: 4 }} />
          <div style={{ display: 'flex', gap: 5, marginTop: 10, alignItems: 'center' }}>
            <div style={{ flex: 1, height: 40, borderRadius: 4, background: accent + '22' }} />
            <div style={{ flex: 2 }}>
              {[80, 60, 90].map((w, i) => (
                <div key={i} style={{ height: 4, width: `${w}%`, background: accent + (i === 0 ? '' : '66'), borderRadius: 2, marginBottom: 4 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    dark: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ padding: '12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 20, height: 4, background: accent, borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: accent + '88' }} />)}
            </div>
          </div>
          <div className="tp-title-bar" style={{ background: '#f8fafc', width: '75%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: accent, width: '45%', marginTop: 4 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {[40, 65, 80, 55, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h * 0.4, background: i % 2 === 0 ? accent : accent + '55', borderRadius: '2px 2px 0 0', alignSelf: 'flex-end' }} />
            ))}
          </div>
        </div>
      </div>
    ),
    retro: (
      <div className="tp" style={{ background: bg, border: `2px solid ${accent}` }}>
        <div style={{ padding: '10px', fontFamily: 'monospace' }}>
          <div style={{ textAlign: 'center', borderBottom: `1px solid ${accent}`, paddingBottom: 6, marginBottom: 6 }}>
            <div style={{ height: 6, width: '60%', margin: '0 auto', background: accent, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[1,2,3].map(i => <div key={i} style={{ height: 4, background: accent + '88', borderRadius: 2 }} />)}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>★</div>
          </div>
        </div>
      </div>
    ),
    medical: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ height: 6, background: accent }} />
        <div style={{ padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
            <div style={{ height: 5, width: 40, background: accent + '88', borderRadius: 2 }} />
          </div>
          <div className="tp-title-bar" style={{ background: '#1e293b', width: '80%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: '#94a3b8', width: '55%', marginTop: 4 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 8 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 14, background: i % 2 === 0 ? accent + '22' : accent + '11', borderRadius: 2, border: `1px solid ${accent}44` }} />
            ))}
          </div>
        </div>
      </div>
    ),
    bold: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ padding: '12px 10px' }}>
          <div style={{ height: 8, width: '90%', background: accent, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ height: 8, width: '65%', background: accent + '88', borderRadius: 2, marginBottom: 12 }} />
          <div style={{ height: 1, background: accent + '44', marginBottom: 10 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2].map(i => (
              <div key={i} style={{ flex: 1, height: 28, borderRadius: 4, background: i === 1 ? accent : 'transparent', border: `1px solid ${accent}` }} />
            ))}
          </div>
        </div>
      </div>
    ),
    pastel: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ padding: '12px 10px' }}>
          <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
            {['🌸','💜','✨'].map((e, i) => <span key={i} style={{ fontSize: 10 }}>{e}</span>)}
          </div>
          <div className="tp-title-bar" style={{ background: accent, width: '70%', height: 6 }} />
          <div className="tp-title-bar tp-sm" style={{ background: accent + '66', width: '45%', marginTop: 5 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {[accent + '33', accent + '55', accent + '22'].map((c, i) => (
              <div key={i} style={{ flex: 1, height: 20, borderRadius: 8, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    ocean: (
      <div className="tp" style={{ background: `linear-gradient(135deg, ${bg}, #164e63)` }}>
        <div style={{ padding: '12px 10px' }}>
          <div style={{ width: 15, height: 15, borderRadius: '50%', background: accent + '33', border: `1px solid ${accent}`, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8 }}>🌊</div>
          <div className="tp-title-bar" style={{ background: accent, width: '75%' }} />
          <div className="tp-title-bar tp-sm" style={{ background: 'rgba(255,255,255,0.4)', width: '50%', marginTop: 4 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            <div style={{ flex: 2, height: 30, borderRadius: 4, background: accent + '22', border: `1px solid ${accent}44` }} />
            <div style={{ flex: 1, height: 30, borderRadius: 4, background: accent + '44' }} />
          </div>
        </div>
      </div>
    ),
    finance: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ background: accent, height: 20, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ height: 4, width: 30, background: 'white', borderRadius: 2 }} />
        </div>
        <div style={{ padding: '6px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ height: 4, width: 20, background: accent + '88', borderRadius: 2, marginBottom: 2 }} />
                <div style={{ height: 6, width: 20, background: accent, borderRadius: 2 }} />
              </div>
            ))}
          </div>
          <div style={{ height: 24, background: accent + '11', border: `1px solid ${accent}44`, borderRadius: 2, display: 'flex', gap: 4, padding: 4, alignItems: 'flex-end' }}>
            {[60,80,50,90,70,75].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: accent, borderRadius: '1px 1px 0 0' }} />
            ))}
          </div>
        </div>
      </div>
    ),
    startup: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ padding: '12px 10px' }}>
          <div style={{ display: 'inline-block', padding: '2px 6px', background: accent + '22', border: `1px solid ${accent}44`, borderRadius: 10, marginBottom: 8 }}>
            <div style={{ height: 4, width: 24, background: accent, borderRadius: 2 }} />
          </div>
          <div className="tp-title-bar" style={{ background: '#f8fafc', width: '85%', height: 7 }} />
          <div className="tp-title-bar tp-sm" style={{ background: accent, width: '40%', marginTop: 5, height: 4 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: accent + (i === 1 ? '' : '44'), margin: '0 auto 3px' }} />
                <div style={{ height: 3, width: 18, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    academic: (
      <div className="tp" style={{ background: bg }}>
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 2 }}>
              <div className="tp-title-bar" style={{ background: '#1e293b', width: '100%', height: 6 }} />
              <div className="tp-title-bar tp-sm" style={{ background: '#64748b', width: '80%', marginTop: 4 }} />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[90, 70, 80].map((w, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
                    <div style={{ height: 3, width: `${w}%`, background: '#cbd5e1', borderRadius: 2 }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, height: 60, borderRadius: 4, background: `linear-gradient(135deg, ${accent}33, ${accent}11)`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📊</div>
          </div>
        </div>
      </div>
    ),
  };

  return previews[type] || <div className="tp" style={{ background: bg }} />;
};

const TemplateGallery = ({ onSelectTemplate }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? templates
    : templates.filter(t => t.category === activeFilter);

  return (
    <div className="template-gallery">
      <div className="gallery-header">
        <h2>Start with a Premium Design</h2>
        <div className="filter-pills">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`pill${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="templates-grid">
        {filtered.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-preview">
              <TemplatePreview type={template.preview} bg={template.bg} accent={template.accent} />
              <div className="hover-overlay">
                <button className="btn-use-template" onClick={() => onSelectTemplate(template)}>Use Template</button>
              </div>
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <span className="template-category">{template.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
