import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Type, Image as ImageIcon, Square, Download, ChevronLeft, Trash2, Bold, Italic, AlignLeft } from 'lucide-react';
import './Editor.css';
import AdSlot from './AdSlot';

const CANVAS_W = 960;
const CANVAS_H = 540;

let idCounter = 1;

const createEl = (type) => {
  const base = { id: idCounter++, type, x: 80 + Math.random() * 300, y: 80 + Math.random() * 200, animation: 'none', animationDuration: 0.8 };
  if (type === 'text') return { ...base, text: 'Click to edit text', fontSize: 24, bold: false, italic: false, align: 'left', color: '#1e293b', w: 300, h: 60 };
  if (type === 'shape') return { ...base, w: 200, h: 120, fill: '#6366f1', radius: 8, text: '', fontSize: 18, color: '#ffffff', align: 'center' };
  if (type === 'image') return { ...base, w: 240, h: 160, src: null };
  return base;
};

// Resize handle component
const Handle = ({ position, onMouseDown }) => {
  const styles = {
    'nw': { top: -5, left: -5 }, 'ne': { top: -5, right: -5 },
    'sw': { bottom: -5, left: -5 }, 'se': { bottom: -5, right: -5 },
  };
  return (
    <div
      className={`resize-handle resize-${position}`}
      style={styles[position]}
      onMouseDown={e => { e.stopPropagation(); onMouseDown(e, position); }}
    />
  );
};

const Editor = ({ onBack, template }) => {
  const initBg = template?.bg || '#ffffff';
  const initAccent = template?.accent || '#6366f1';

  const createInitialElements = useCallback((isFirst = false) => {
    const els = [];
    const textColor = template ? (template.bg.startsWith('#f') || template.bg === '#ffffff' ? '#1e293b' : '#ffffff') : '#1e293b';
    const subColor = template ? (template.bg.startsWith('#f') || template.bg === '#ffffff' ? '#64748b' : 'rgba(255,255,255,0.7)') : '#64748b';

    // 1. Add Decorative Template Elements (only on first slide for some, all for others)
    if (template) {
      if (template.preview === 'corporate') {
        els.push({ id: idCounter++, type: 'shape', x: 0, y: 0, w: 180, h: CANVAS_H, fill: initAccent, radius: 0 });
        els.push({ id: idCounter++, type: 'text', x: 220, y: 40, w: 150, h: 30, text: 'PRESENTATION', fontSize: 14, bold: true, color: initAccent, align: 'left' });
        // Decorative grid
        [1, 2, 3].map(i => els.push({ id: idCounter++, type: 'shape', x: 220 + (i-1)*230, y: 380, w: 220, h: 120, fill: i === 1 ? initAccent : initAccent + '22', radius: 4 }));
      } else if (template.preview === 'cyberpunk') {
        els.push({ id: idCounter++, type: 'shape', x: 20, y: 20, w: CANVAS_W - 40, h: CANVAS_H - 40, fill: 'transparent', radius: 4, border: `2px solid ${initAccent}44` });
        els.push({ id: idCounter++, type: 'shape', x: 0, y: 0, w: CANVAS_W, h: 4, fill: initAccent, radius: 0 });
        els.push({ id: idCounter++, type: 'text', x: 40, y: 40, w: 150, h: 20, text: '// SYSTEM_LOADED', fontSize: 12, bold: false, color: initAccent, align: 'left' });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 380, w: 500, h: 100, fill: initAccent + '11', radius: 4, border: `1px solid ${initAccent}44` });
        els.push({ id: idCounter++, type: 'shape', x: 580, y: 380, w: 320, h: 100, fill: initAccent + '33', radius: 4 });
      } else if (template.preview === 'nature') {
        els.push({ id: idCounter++, type: 'shape', x: 0, y: 0, w: CANVAS_W, h: CANVAS_H, fill: initAccent + '08', radius: 0 });
        els.push({ id: idCounter++, type: 'text', x: 60, y: 40, w: 60, h: 60, text: '🌿', fontSize: 48, bold: false, align: 'left', color: initAccent });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 380, w: 300, h: 120, fill: initAccent + '22', radius: 12 });
        [1, 2, 3].map(i => els.push({ id: idCounter++, type: 'shape', x: 400, y: 380 + (i-1)*40, w: 500 - (i*40), h: 10, fill: initAccent + (i===1?'':'66'), radius: 5 }));
      } else if (template.preview === 'dark') {
        // dots
        [1, 2, 3].map(i => els.push({ id: idCounter++, type: 'shape', x: CANVAS_W - 80 + (i*12), y: 40, w: 8, h: 8, fill: initAccent + '88', radius: 4 }));
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 40, w: 80, h: 10, fill: initAccent, radius: 4 });
        // bar chart at bottom
        [180, 240, 200, 280, 220].map((h, i) => els.push({ id: idCounter++, type: 'shape', x: 120 + i*150, y: CANVAS_H - (h*0.8) - 40, w: 100, h: h*0.8, fill: i % 2 === 0 ? initAccent : initAccent + '55', radius: '8px 8px 0 0' }));
      } else if (template.preview === 'retro') {
        els.push({ id: idCounter++, type: 'shape', x: 20, y: 20, w: CANVAS_W-40, h: CANVAS_H-40, fill: 'transparent', radius: 0, border: `4px solid ${initAccent}` });
        // Header bar
        els.push({ id: idCounter++, type: 'shape', x: CANVAS_W/2 - 150, y: 40, w: 300, h: 2, fill: initAccent, radius: 0 });
        els.push({ id: idCounter++, type: 'shape', x: CANVAS_W/2 - 80, y: 35, w: 160, h: 12, fill: initAccent, radius: 6 });
        // Star on the right
        els.push({ id: idCounter++, type: 'shape', x: CANVAS_W - 160, y: CANVAS_H - 160, w: 100, h: 100, fill: 'transparent', radius: 50, border: `3px solid ${initAccent}` });
        els.push({ id: idCounter++, type: 'text', x: CANVAS_W - 145, y: CANVAS_H - 135, w: 70, h: 70, text: '★', fontSize: 48, bold: false, color: initAccent, align: 'center' });
        // Lines on the left
        [1, 2, 3].map(i => els.push({ id: idCounter++, type: 'shape', x: 60, y: 380 + (i-1)*35, w: 200, h: 8, fill: initAccent + '66', radius: 4 }));
      } else if (template.preview === 'medical') {
        els.push({ id: idCounter++, type: 'shape', x: 0, y: 0, w: CANVAS_W, h: 15, fill: initAccent, radius: 0 });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 40, w: 20, h: 20, fill: initAccent, radius: 10 });
        els.push({ id: idCounter++, type: 'shape', x: 90, y: 48, w: 150, h: 6, fill: initAccent + '44', radius: 3 });
        // Grid cards
        [1,2,3,4].map(i => els.push({ id: idCounter++, type: 'shape', x: 60 + ((i-1)%2)*430, y: 350 + (Math.floor((i-1)/2)*80), w: 410, h: 60, fill: i%2===0?initAccent+'08':initAccent+'15', radius: 4, border: `1px solid ${initAccent}22` }));
      } else if (template.preview === 'bold') {
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 60, w: CANVAS_W - 120, h: 12, fill: initAccent, radius: 2 });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 85, w: 400, h: 12, fill: initAccent + '88', radius: 2 });
        els.push({ id: idCounter++, type: 'shape', x: 0, y: CANVAS_H - 100, w: CANVAS_W, h: 1, fill: initAccent + '44', radius: 0 });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 420, w: 400, h: 60, fill: initAccent, radius: 6 });
        els.push({ id: idCounter++, type: 'shape', x: 500, y: 420, w: 400, h: 60, fill: 'transparent', radius: 6, border: `2px solid ${initAccent}` });
      } else if (template.preview === 'pastel') {
        els.push({ id: idCounter++, type: 'text', x: 60, y: 40, w: 200, h: 40, text: '🌸 ✨ 💜', fontSize: 28, bold: false, align: 'left', color: initAccent });
        [0.3, 0.5, 0.2].map((op, i) => els.push({ id: idCounter++, type: 'shape', x: 60 + i*280, y: 400, w: 260, h: 80, fill: initAccent, radius: 40, opacity: op }));
      } else if (template.preview === 'ocean') {
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 40, w: 40, h: 40, fill: initAccent + '22', radius: 20, border: `2px solid ${initAccent}` });
        els.push({ id: idCounter++, type: 'text', x: 63, y: 42, w: 34, h: 34, text: '🌊', fontSize: 20, bold: false, align: 'center', color: initAccent });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 380, w: 580, h: 100, fill: initAccent + '22', radius: 8, border: `1px solid ${initAccent}44` });
        els.push({ id: idCounter++, type: 'shape', x: 660, y: 380, w: 240, h: 100, fill: initAccent + '44', radius: 8 });
      } else if (template.preview === 'finance') {
        els.push({ id: idCounter++, type: 'shape', x: 0, y: 0, w: CANVAS_W, h: 60, fill: initAccent, radius: 0 });
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 20, w: 100, h: 15, fill: '#ffffff', radius: 2, opacity: 0.8 });
        // Trend indicators
        [1, 2, 3].map(i => {
          els.push({ id: idCounter++, type: 'shape', x: 60 + (i-1)*300, y: 100, w: 80, h: 10, fill: initAccent + '66', radius: 2 });
          els.push({ id: idCounter++, type: 'shape', x: 60 + (i-1)*300, y: 115, w: 80, h: 15, fill: initAccent, radius: 2 });
        });
        // Big chart
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 320, w: 840, h: 180, fill: initAccent + '08', radius: 4, border: `1px solid ${initAccent}22` });
        [60, 85, 55, 95, 75, 80, 65, 90].map((h, i) => els.push({ id: idCounter++, type: 'shape', x: 100 + i*100, y: 500 - (h*1.4), w: 60, h: h*1.4, fill: initAccent, radius: '2px 2px 0 0' }));
      } else if (template.preview === 'startup') {
        els.push({ id: idCounter++, type: 'shape', x: 60, y: 40, w: 100, h: 35, fill: initAccent + '22', radius: 20, border: `1.5px solid ${initAccent}44` });
        els.push({ id: idCounter++, type: 'shape', x: 80, y: 53, w: 60, h: 8, fill: initAccent, radius: 4 });
        // Icon cards
        [1, 2, 3].map(i => {
           els.push({ id: idCounter++, type: 'shape', x: 60 + (i-1)*300, y: 380, w: 60, h: 60, fill: i === 1 ? initAccent : initAccent + '33', radius: 10 });
           els.push({ id: idCounter++, type: 'shape', x: 60 + (i-1)*300, y: 455, w: 80, h: 10, fill: 'white', opacity: 0.2, radius: 5 });
        });
      } else if (template.preview === 'academic') {
        els.push({ id: idCounter++, type: 'shape', x: CANVAS_W - 200, y: 40, w: 140, h: 140, fill: initAccent + '11', radius: 10, border: `1px solid ${initAccent}44` });
        els.push({ id: idCounter++, type: 'text', x: CANVAS_W - 190, y: 70, w: 120, h: 80, text: '📊', fontSize: 60, bold: false, align: 'center', color: initAccent });
        // list
        [1, 2, 3].map(i => {
          els.push({ id: idCounter++, type: 'shape', x: 60, y: 380 + (i-1)*45, w: 10, h: 10, fill: '#94a3b8', radius: 5 });
          els.push({ id: idCounter++, type: 'shape', x: 85, y: 383 + (i-1)*45, w: 400 - (i*30), h: 6, fill: '#cbd5e1', radius: 3 });
        });
      }
    }

    if (isFirst) {
      // Title Slide Layout
      els.push({
        id: idCounter++, type: 'text',
        x: template?.preview === 'corporate' ? 220 : 60, 
        y: template?.preview === 'finance' ? 120 : 160, 
        w: template?.preview === 'corporate' ? 680 : 840, 
        h: 100,
        text: template ? template.name : 'Presentation Title',
        fontSize: 54, bold: true, italic: false,
        align: template?.preview === 'corporate' ? 'left' : 'center', 
        color: textColor,
      });

      els.push({
        id: idCounter++, type: 'text',
        x: template?.preview === 'corporate' ? 220 : 120, 
        y: template?.preview === 'finance' ? 240 : 280, 
        w: template?.preview === 'corporate' ? 600 : 720, 
        h: 60,
        text: 'Subtitle goes here',
        fontSize: 24, bold: false, italic: false,
        align: template?.preview === 'corporate' ? 'left' : 'center', 
        color: template ? initAccent : subColor,
      });
    } else {
      // Regular Slide Layout
      els.push({
        id: idCounter++, type: 'text',
        x: template?.preview === 'corporate' ? 220 : 60, 
        y: template?.preview === 'finance' ? 60 : 40, 
        w: template?.preview === 'corporate' ? 680 : 840, 
        h: 60,
        text: 'Slide Title',
        fontSize: 32, bold: true, italic: false,
        align: 'left', 
        color: textColor,
      });

      els.push({
        id: idCounter++, type: 'text',
        x: template?.preview === 'corporate' ? 220 : 60, 
        y: template?.preview === 'finance' ? 140 : 120, 
        w: template?.preview === 'corporate' ? 680 : 840, 
        h: 200,
        text: '• Add your points here\n• Multi-line text support\n• Easy to edit',
        fontSize: 20, bold: false, italic: false,
        align: 'left', 
        color: subColor,
      });
    }

    return els;
  }, [template, initAccent]);

  const [slideData, setSlideData] = useState(() => ({
    1: {
      elements: createInitialElements(true),
      bg: initBg
    }
  }));
  const [slides, setSlides] = useState([{ id: 1 }]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [presentMode, setPresentMode] = useState(false);
  
  const currentSlideObj = slideData[currentSlide] || { elements: [], bg: initBg };
  const elements = currentSlideObj.elements;
  const bgColor = currentSlideObj.bg;

  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  const fileInputRef = useRef(null);

  const selectedEl = elements.find(e => e.id === selected);

  // Drag to move
  const startDrag = useCallback((e, el) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = rect.width / CANVAS_W;
    
    const startX = e.clientX / scale - el.x;
    const startY = e.clientY / scale - el.y;
    dragRef.current = { type: 'move', elId: el.id, startX, startY, scale };

    const onMove = (ev) => {
      if (!dragRef.current || dragRef.current.type !== 'move') return;
      const { scale, startX, startY } = dragRef.current;
      
      setSlideData(prev => ({
        ...prev,
        [currentSlide]: {
          ...prev[currentSlide],
          elements: prev[currentSlide].elements.map(item =>
            item.id === dragRef.current.elId
              ? { 
                  ...item, 
                  x: Math.max(0, Math.min(CANVAS_W - item.w, ev.clientX / scale - startX)), 
                  y: Math.max(0, Math.min(CANVAS_H - item.h, ev.clientY / scale - startY)) 
                }
              : item
          )
        }
      }));
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [currentSlide]);

  // Drag to resize
  const startResize = useCallback((e, el, handle) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = rect.width / CANVAS_W;
    
    const startX = e.clientX / scale;
    const startY = e.clientY / scale;
    const origX = el.x, origY = el.y, origW = el.w, origH = el.h;

    const onMove = (ev) => {
      const dx = ev.clientX / scale - startX;
      const dy = ev.clientY / scale - startY;
      setSlideData(prev => ({
        ...prev,
        [currentSlide]: {
          ...prev[currentSlide],
          elements: prev[currentSlide].elements.map(item => {
            if (item.id !== el.id) return item;
            let { x, y, w, h } = { x: origX, y: origY, w: origW, h: origH };
            if (handle.includes('e')) w = Math.max(30, origW + dx);
            if (handle.includes('s')) h = Math.max(20, origH + dy);
            if (handle.includes('w')) { w = Math.max(30, origW - dx); x = origX + origW - w; }
            if (handle.includes('n')) { h = Math.max(20, origH - dy); y = origY + origH - h; }
            return { ...item, x, y, w, h };
          })
        }
      }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [currentSlide]);

  const addElement = (type) => {
    const el = createEl(type);
    setSlideData(prev => ({
      ...prev,
      [currentSlide]: {
        ...prev[currentSlide],
        elements: [...(prev[currentSlide]?.elements || []), el]
      }
    }));
    setSelected(el.id);
  };

  const deleteSelected = () => {
    if (!selected) return;
    setSlideData(prev => ({
      ...prev,
      [currentSlide]: {
        ...prev[currentSlide],
        elements: prev[currentSlide].elements.filter(e => e.id !== selected)
      }
    }));
    setSelected(null);
    setEditingId(null);
  };

  const updateProp = (key, value) => {
    setSlideData(prev => ({
      ...prev,
      [currentSlide]: {
        ...prev[currentSlide],
        elements: prev[currentSlide].elements.map(e => e.id === selected ? { ...e, [key]: value } : e)
      }
    }));
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Delete' && selected && editingId !== selected) deleteSelected();
    if (e.key === 'Escape') { setSelected(null); setEditingId(null); }
  }, [selected, editingId]);

  const updateBg = (newBg) => {
    setSlideData(prev => ({
      ...prev,
      [currentSlide]: { ...prev[currentSlide], bg: newBg }
    }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const el = createEl('image');
      el.src = event.target.result;
      setSlideData(prev => ({
        ...prev,
        [currentSlide]: {
          ...prev[currentSlide],
          elements: [...(prev[currentSlide]?.elements || []), el]
        }
      }));
      setSelected(el.id);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleExportPPTX = () => {
    if (!window.PptxGenJS) {
      alert('Presentation library not loaded yet. Please try again in a moment.');
      return;
    }

    const pptx = new window.PptxGenJS();
    
    slides.forEach((s) => {
      const slideInfo = slideData[s.id] || { elements: [], bg: initBg };
      const slide = pptx.addSlide();
      
      // Set background color
      slide.background = { fill: slideInfo.bg.replace('#', '') };

      slideInfo.elements.forEach(el => {
        const x = (el.x / CANVAS_W) * 10;
        const y = (el.y / CANVAS_H) * 5.625;
        const w = (el.w / CANVAS_W) * 10;
        const h = (el.h / CANVAS_H) * 5.625;

        if (el.type === 'text') {
          slide.addText(el.text, {
            x, y, w, h,
            fontSize: el.fontSize,
            color: el.color.replace('#', ''),
            bold: el.bold,
            italic: el.italic,
            align: el.align,
            valign: 'middle'
          });
        } else if (el.type === 'shape') {
          slide.addShape(pptx.ShapeType.rect, {
            x, y, w, h,
            fill: { color: el.fill.replace('#', '') },
            rectRadius: el.radius / 300 // PptxGenJS radius is fractional
          });
        } else if (el.type === 'image' && el.src) {
          slide.addImage({
            data: el.src,
            x, y, w, h
          });
        }
      });
    });

    pptx.writeFile({ fileName: "Presentation.pptx" });
  };

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export your presentation.');
      return;
    }

    const canvasHtml = canvasRef.current.outerHTML;
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          return '';
        }
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Export Presentation</title>
          <style>
            ${styles}
            body { margin: 0; padding: 0; background: #000; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            .slide-canvas { 
              box-shadow: none !important; 
              transform: none !important; 
              position: relative !important;
              left: 0 !important;
              top: 0 !important;
            }
            @page { size: landscape; margin: 0; }
            @media print {
              body { background: none; }
              .slide-canvas { width: 100vw !important; height: 100vh !important; }
            }
          </style>
        </head>
        <body>
          ${canvasHtml}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="editor-container">
      {/* Header */}
      <header className="editor-header">
        <div className="editor-header-left">
          <button className="btn-icon" onClick={onBack}><ChevronLeft size={18} /><span>Back</span></button>
          <input 
            type="text" 
            className="presentation-title" 
            defaultValue="Untitled Presentation" 
            spellCheck={false}
          />
        </div>

        <div className="editor-tools">
          <button className="tool-btn" onClick={() => addElement('text')} title="Add Text"><Type size={18} /></button>
          <button className="tool-btn" onClick={() => addElement('shape')} title="Add Shape"><Square size={18} /></button>
          <button className="tool-btn" onClick={() => fileInputRef.current?.click()} title="Add Image"><ImageIcon size={18} /></button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <div className="tool-divider" />
          {selected && (
            <button className="tool-btn tool-btn-danger" onClick={deleteSelected} title="Delete"><Trash2 size={18} /></button>
          )}
        </div>

        <div className="editor-header-right">
          <button className="btn-export-outline" style={{ border: 'none', background: 'rgba(99,102,241,0.1)' }} onClick={() => setPresentMode(true)}>
            Play
          </button>
          <button className="btn-export-outline" onClick={handleExportPPTX} title="Download PowerPoint">
             <span>PPTX</span>
          </button>
          <button className="btn-export" onClick={() => window.print()} title="Download PDF">
            <Download size={16} />
            <span>PDF</span>
          </button>
        </div>
      </header>

      <div className="editor-main">
        {/* Left: Slides panel */}
        <aside className="editor-sidebar-left">
          <div className="slides-list">
            {slides.map((s, i) => {
              const sBg = slideData[s.id]?.bg || '#ffffff';
              return (
                <div
                  key={s.id}
                  className={`slide-thumbnail ${s.id === currentSlide ? 'active' : ''}`}
                  style={{ background: sBg }}
                  onClick={() => {
                    setCurrentSlide(s.id);
                    setSelected(null);
                    setEditingId(null);
                  }}
                >
                  <span className="slide-number">{i + 1}</span>
                </div>
              );
            })}
            <button className="btn-add-slide" onClick={() => {
              const newId = Date.now();
              setSlides(prev => [...prev, { id: newId }]);
              setSlideData(prev => ({
                ...prev,
                [newId]: {
                  elements: createInitialElements(),
                  bg: initBg
                }
              }));
              setCurrentSlide(newId);
              setSelected(null);
            }}>&#43; New Slide</button>
          </div>
          <div className="sidebar-ad">
            <AdSlot width="100%" height="200px" slotId="editor-sidebar" />
          </div>
        </aside>

        {/* Canvas */}
        <main className="editor-canvas-container" onClick={() => { setSelected(null); setEditingId(null); }}>
          <div className="canvas-scale-wrapper">
            <div
              ref={canvasRef}
              className="slide-canvas"
              style={{ width: CANVAS_W, height: CANVAS_H, background: bgColor, position: 'relative' }}
              onClick={() => { setSelected(null); setEditingId(null); }}
            >
              {elements.map(el => (
                <div
                  key={el.id}
                  className={`canvas-element ${selected === el.id ? 'selected' : ''} ${presentMode ? `anim-${el.animation}` : ''}`}
                  style={{ 
                    left: el.x, top: el.y, width: el.w, height: el.h, zIndex: el.id,
                    animationDuration: presentMode ? `${el.animationDuration || 0.8}s` : '0s'
                  }}
                  onMouseDown={(e) => { setSelected(el.id); startDrag(e, el); }}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => { e.stopPropagation(); el.type === 'text' && setEditingId(el.id); }}
                >
                  {el.type === 'text' && (
                    editingId === el.id ? (
                      <textarea
                        autoFocus
                        className="text-editor-input"
                        value={el.text}
                        onChange={e2 => updateProp('text', e2.target.value)}
                        onMouseDown={e2 => e2.stopPropagation()}
                        onBlur={() => setEditingId(null)}
                        style={{ fontSize: el.fontSize, fontWeight: el.bold ? 'bold' : 'normal', fontStyle: el.italic ? 'italic' : 'normal', textAlign: el.align, color: el.color }}
                      />
                    ) : (
                      <div
                        className="text-display"
                        style={{ fontSize: el.fontSize, fontWeight: el.bold ? 'bold' : 'normal', fontStyle: el.italic ? 'italic' : 'normal', textAlign: el.align, color: el.color }}
                      >{el.text}</div>
                    )
                  )}
                  {el.type === 'shape' && (
                    <div 
                      onDoubleClick={e => { e.stopPropagation(); setEditingId(el.id); }}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: el.fill, 
                        borderRadius: el.radius,
                        border: el.border || 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        boxSizing: 'border-box',
                        color: el.color || '#ffffff',
                        fontSize: el.fontSize || 18,
                        textAlign: el.align || 'center'
                      }}
                    >
                      {editingId === el.id ? (
                        <textarea
                          autoFocus
                          className="text-editor-input"
                          value={el.text || ''}
                          onChange={e2 => updateProp('text', e2.target.value)}
                          onMouseDown={e2 => e2.stopPropagation()}
                          onBlur={() => setEditingId(null)}
                          style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: 'inherit', 
                            fontSize: 'inherit', 
                            textAlign: 'inherit',
                            padding: 0
                          }}
                        />
                      ) : (
                        <div style={{ pointerEvents: 'none' }}>{el.text}</div>
                      )}
                    </div>
                  )}
                  {el.type === 'image' && (
                    el.src ? (
                      <img src={el.src} style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
                    ) : (
                      <div className="image-placeholder-el"><ImageIcon size={28} color="#94a3b8" /><span>Image</span></div>
                    )
                  )}
                  {selected === el.id && ['nw','ne','sw','se'].map(h => (
                    <Handle key={h} position={h} onMouseDown={(e, pos) => startResize(e, el, pos)} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right: Properties */}
        <aside className="editor-sidebar-right">
          <div className="properties-panel">
            <div className="prop-section-title">Canvas</div>
            <div className="prop-row">
              <label>Background</label>
              <input type="color" value={bgColor} onChange={e => updateBg(e.target.value)} className="prop-color" />
            </div>

            {selectedEl && (
              <>
                <div className="prop-divider" />
                <div className="prop-section-title">Element</div>

                {selectedEl.type === 'text' && (
                  <>
                    <div className="prop-row">
                      <label>Size</label>
                      <input type="number" className="prop-input" min={8} max={120} value={selectedEl.fontSize} onChange={e => updateProp('fontSize', parseInt(e.target.value) || 16)} />
                    </div>
                    <div className="prop-row">
                      <label>Color</label>
                      <input type="color" value={selectedEl.color} onChange={e => updateProp('color', e.target.value)} className="prop-color" />
                    </div>
                    <div className="prop-row">
                      <label>Style</label>
                      <div className="prop-btn-group">
                        <button className={`prop-btn ${selectedEl.bold ? 'active' : ''}`} onClick={() => updateProp('bold', !selectedEl.bold)}><Bold size={14} /></button>
                        <button className={`prop-btn ${selectedEl.italic ? 'active' : ''}`} onClick={() => updateProp('italic', !selectedEl.italic)}><Italic size={14} /></button>
                      </div>
                    </div>
                    <div className="prop-row">
                      <label>Align</label>
                      <select className="prop-select" value={selectedEl.align} onChange={e => updateProp('align', e.target.value)}>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedEl.type === 'shape' && (
                  <>
                    <div className="prop-row">
                      <label>Text</label>
                      <input type="text" className="prop-input" value={selectedEl.text || ''} onChange={e => updateProp('text', e.target.value)} placeholder="Box text..." />
                    </div>
                    <div className="prop-row">
                      <label>Fill</label>
                      <input type="color" value={selectedEl.fill} onChange={e => updateProp('fill', e.target.value)} className="prop-color" />
                    </div>
                    <div className="prop-row">
                      <label>Radius</label>
                      <input type="range" min={0} max={80} value={selectedEl.radius} onChange={e => updateProp('radius', parseInt(e.target.value))} className="prop-range" />
                    </div>
                    <div className="prop-row">
                      <label>Color</label>
                      <input type="color" value={selectedEl.color || '#ffffff'} onChange={e => updateProp('color', e.target.value)} className="prop-color" />
                    </div>
                    <div className="prop-row">
                      <label>Size</label>
                      <input type="number" className="prop-input" value={selectedEl.fontSize || 18} onChange={e => updateProp('fontSize', parseInt(e.target.value) || 12)} />
                    </div>
                    <div className="prop-row">
                      <label>Border</label>
                      <input 
                        type="text" 
                        className="prop-input" 
                        style={{ width: '100px' }}
                        value={selectedEl.border || ''} 
                        placeholder="e.g. 2px solid white"
                        onChange={e => updateProp('border', e.target.value)} 
                      />
                    </div>
                  </>
                )}

                <div className="prop-row">
                  <label>X</label>
                  <input type="number" className="prop-input" value={Math.round(selectedEl.x)} onChange={e => updateProp('x', parseInt(e.target.value) || 0)} />
                </div>
                <div className="prop-row">
                  <label>Y</label>
                  <input type="number" className="prop-input" value={Math.round(selectedEl.y)} onChange={e => updateProp('y', parseInt(e.target.value) || 0)} />
                </div>
                <div className="prop-row">
                  <label>W</label>
                  <input type="number" className="prop-input" value={Math.round(selectedEl.w)} onChange={e => updateProp('w', Math.max(30, parseInt(e.target.value) || 60))} />
                </div>
                <div className="prop-row">
                  <label>H</label>
                  <input type="number" className="prop-input" value={Math.round(selectedEl.h)} onChange={e => updateProp('h', Math.max(20, parseInt(e.target.value) || 30))} />
                </div>

                <div className="prop-divider" />
                <div className="prop-section-title">Animation</div>
                <div className="prop-row">
                  <label>Type</label>
                  <select className="prop-select" value={selectedEl.animation || 'none'} onChange={e => updateProp('animation', e.target.value)}>
                    <option value="none">None</option>
                    <option value="fade">Fade In</option>
                    <option value="slide">Slide Up</option>
                    <option value="zoom">Zoom In</option>
                    <option value="spin">Spin</option>
                  </select>
                </div>
                <div className="prop-row">
                  <label>Duration</label>
                  <input type="range" min={0.1} max={3} step={0.1} value={selectedEl.animationDuration || 0.8} onChange={e => updateProp('animationDuration', parseFloat(e.target.value))} className="prop-range" />
                </div>

                <div className="prop-divider" />
                <button className="prop-delete-btn" onClick={deleteSelected}><Trash2 size={14} /> Delete Element</button>
              </>
            )}

            {!selectedEl && (
              <p className="prop-hint">Click an element on the canvas to edit its properties, or add a new one from the toolbar.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Editor;
