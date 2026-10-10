import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  RotateCcw, ShoppingBag, Type, Image as ImageIcon, Copy, Trash2, 
  RotateCw, ZoomIn, ZoomOut, Undo, Redo, Layers, Sparkles, ChevronDown, ChevronUp 
} from 'lucide-react';
import { products, formatCurrency } from '../data/products';
import { useCart } from '../context/CartContext';

const colorOptions = [
  { label: 'White', hex: '#FFFFFF', isLight: true },
  { label: 'Black', hex: '#121212', isLight: false },
  { label: 'Navy Blue', hex: '#0F2742', isLight: false },
  { label: 'Light Grey', hex: '#E1EAF2', isLight: true },
  { label: 'Light Blue', hex: '#DCEAF2', isLight: true },
  { label: 'Beige', hex: '#F5F2EB', isLight: true }
];

const fontOptions = [
  { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
  { label: 'Inter', value: "'Inter', sans-serif" },
  { label: 'Bodoni Moda', value: "'Bodoni Moda', serif" },
  { label: 'Impact', value: "Impact, sans-serif" },
  { label: 'Courier New', value: "'Courier New', monospace" }
];

const initialFrontElements = [
  {
    id: 'el-initial-1',
    type: 'text',
    text: 'CULTURE IS FLUID',
    fontSize: 22,
    fontFamily: "'Space Grotesk', sans-serif",
    fill: '#0F2742',
    x: 0,
    y: -30,
    rotation: 0,
    scale: 1
  }
];

const initialBackElements = [
  {
    id: 'el-initial-2',
    type: 'text',
    text: 'STYLE INK STUDIO',
    fontSize: 18,
    fontFamily: "'Space Grotesk', sans-serif",
    fill: '#0F2742',
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1
  }
];

export default function CustomizePage() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => String(item.id) === String(id)) || products[0], [id]);
  const { addToCart } = useCart();

  // State
  const [selectedColorObj, setSelectedColorObj] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [viewSide, setViewSide] = useState('front'); // 'front' | 'back'
  
  // Independent front/back design elements
  const [frontElements, setFrontElements] = useState(initialFrontElements);
  const [backElements, setBackElements] = useState(initialBackElements);
  
  // Selection
  const [selectedId, setSelectedId] = useState('el-initial-1');

  // History for Undo/Redo
  const [history, setHistory] = useState([
    { front: initialFrontElements, back: initialBackElements }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Dragging / Resizing / Rotating internal interaction refs
  const [isInteracting, setIsInteracting] = useState(false);
  const dragRef = useRef(null);

  // UI status message & advanced settings toggle
  const [savedMessage, setSavedMessage] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Print Boundary limits (in pixels relative to center)
  const PRINT_AREA = { width: 220, height: 320 };

  // Current side elements accessor
  const currentElements = viewSide === 'front' ? frontElements : backElements;
  const setCurrentElements = (updateFn) => {
    if (viewSide === 'front') {
      setFrontElements(updateFn);
    } else {
      setBackElements(updateFn);
    }
  };

  // Push state to history
  const pushState = (newFront, newBack) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push({ front: newFront, back: newBack });
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUpdateCurrentElements = (updater) => {
    setCurrentElements((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (viewSide === 'front') {
        pushState(next, backElements);
      } else {
        pushState(frontElements, next);
      }
      return next;
    });
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setFrontElements(history[prevIndex].front);
      setBackElements(history[prevIndex].back);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setFrontElements(history[nextIndex].front);
      setBackElements(history[nextIndex].back);
    }
  };

  // Currently selected element object
  const selectedElement = useMemo(
    () => currentElements.find((el) => el.id === selectedId) || null,
    [currentElements, selectedId]
  );

  // Add new Text
  const handleAddText = () => {
    const newEl = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'YOUR TEXT',
      fontSize: 20,
      fontFamily: "'Space Grotesk', sans-serif",
      fill: selectedColorObj.isLight ? '#0F2742' : '#FFFFFF',
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1
    };
    handleUpdateCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type & size (max 5MB)
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
      setSavedMessage('Invalid file type! Please upload PNG, JPG, WEBP, or SVG.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSavedMessage('File size exceeds 5MB limit.');
      return;
    }

    const src = URL.createObjectURL(file);
    const newEl = {
      id: `img-${Date.now()}`,
      type: 'image',
      src,
      width: 120,
      height: 120,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1
    };
    handleUpdateCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
    setSavedMessage('Graphic uploaded to printable canvas.');
  };

  // Delete selected element
  const handleDeleteSelected = () => {
    if (!selectedId) return;
    handleUpdateCurrentElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  // Duplicate selected element
  const handleDuplicateSelected = () => {
    if (!selectedElement) return;
    const duplicated = {
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: Math.min(selectedElement.x + 15, PRINT_AREA.width / 2 - 20),
      y: Math.min(selectedElement.y + 15, PRINT_AREA.height / 2 - 20)
    };
    handleUpdateCurrentElements((prev) => [...prev, duplicated]);
    setSelectedId(duplicated.id);
  };

  // Reset entire design
  const handleResetDesign = () => {
    setFrontElements([]);
    setBackElements([]);
    setSelectedId(null);
    pushState([], []);
    setSavedMessage('Canvas designs reset.');
  };

  // Direct Mouse / Touch Dragging & Resizing & Rotating Handlers
  const startDrag = (e, element, actionType) => {
    e.stopPropagation();
    setSelectedId(element.id);
    setIsInteracting(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragRef.current = {
      elementId: element.id,
      actionType, // 'move' | 'resize' | 'rotate'
      startX: clientX,
      startY: clientY,
      initialElX: element.x,
      initialElY: element.y,
      initialScale: element.scale || 1,
      initialRotation: element.rotation || 0
    };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragRef.current || !isInteracting) return;
      const { elementId, actionType, startX, startY, initialElX, initialElY, initialScale, initialRotation } = dragRef.current;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      setCurrentElements((prev) =>
        prev.map((el) => {
          if (el.id !== elementId) return el;

          if (actionType === 'move') {
            // Bound movement within printable area
            const maxBoundsX = PRINT_AREA.width / 2 - 20;
            const maxBoundsY = PRINT_AREA.height / 2 - 20;
            const newX = Math.max(-maxBoundsX, Math.min(maxBoundsX, initialElX + deltaX));
            const newY = Math.max(-maxBoundsY, Math.min(maxBoundsY, initialElY + deltaY));
            return { ...el, x: newX, y: newY };
          }

          if (actionType === 'resize') {
            const scaleFactor = 1 + (deltaX + deltaY) / 150;
            const newScale = Math.max(0.4, Math.min(2.5, initialScale * scaleFactor));
            return { ...el, scale: newScale };
          }

          if (actionType === 'rotate') {
            const angleDelta = Math.round((deltaX + deltaY) * 0.8);
            return { ...el, rotation: (initialRotation + angleDelta) % 360 };
          }

          return el;
        })
      );
    };

    const handleEnd = () => {
      if (isInteracting && dragRef.current) {
        setIsInteracting(false);
        dragRef.current = null;
        // Commit to history after drag completes
        if (viewSide === 'front') {
          pushState(frontElements, backElements);
        } else {
          pushState(frontElements, backElements);
        }
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isInteracting, viewSide, frontElements, backElements]);

  // Add to Cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} (Custom Studio Tee)`,
      price: product.price + 200, // Custom design surcharge in INR ₹
      image: product.image,
      size: selectedSize,
      color: selectedColorObj.label,
      quantity: 1,
      customization: {
        color: selectedColorObj.label,
        size: selectedSize,
        frontDesignCount: frontElements.length,
        backDesignCount: backElements.length,
        frontText: frontElements.find((e) => e.type === 'text')?.text || 'Custom Print'
      }
    });
    setSavedMessage('Custom T-Shirt saved and added to Shopping Bag!');
  };

  return (
    <section className="section" style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Header Bar */}
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span className="eyebrow">CUSTOM STUDIO EDITOR</span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontFamily: "'Bodoni Moda', serif" }}>Design Your Statement Tee</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={handleUndo} disabled={historyIndex <= 0} title="Undo">
              <Undo size={16} />
            </button>
            <button className="btn btn-outline" onClick={handleRedo} disabled={historyIndex >= history.length - 1} title="Redo">
              <Redo size={16} />
            </button>
            <button className="btn btn-outline" onClick={handleResetDesign} title="Reset All">
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="success" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{savedMessage}</span>
            <button onClick={() => setSavedMessage('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>✕</button>
          </div>
        )}

        {/* 2-Column Responsive Layout: Left 65% Interactive T-Shirt Preview | Right 35% Customization Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* LEFT SIDE: T-Shirt Mockup & Interactive Print Area */}
          <div className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#F8FAFC', position: 'relative', minHeight: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* View Switcher Overlay Tabs */}
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10, display: 'flex', gap: '0.5rem', background: '#FFFFFF', padding: '0.35rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <button
                className={`btn ${viewSide === 'front' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewSide('front')}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                Front View
              </button>
              <button
                className={`btn ${viewSide === 'back' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewSide('back')}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                Back View
              </button>
            </div>

            {/* Quick Garment Color Indicator Tag */}
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10, background: '#FFFFFF', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.8rem', fontWeight: 600 }}>
              Color: {selectedColorObj.label}
            </div>

            {/* REALISTIC T-SHIRT VECTOR MOCKUP CONTAINER */}
            <div 
              style={{ position: 'relative', width: '100%', maxWidth: '480px', aspectRatio: '1/1.15', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
              onClick={() => setSelectedId(null)}
            >
              {/* Garment SVG Body Mockup */}
              <svg viewBox="0 0 400 480" width="100%" height="100%" style={{ filter: 'drop-shadow(0 15px 35px rgba(15,39,66,0.12))', transition: 'all 0.3s ease' }}>
                <defs>
                  <linearGradient id="shirtShading" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                  </linearGradient>
                </defs>
                {/* T-Shirt Silhouette Path */}
                <path
                  d="M 120 40 C 145 65 255 65 280 40 L 375 90 L 335 180 L 295 160 L 295 440 L 105 440 L 105 160 L 65 180 L 25 90 Z"
                  fill={selectedColorObj.hex}
                  stroke={selectedColorObj.isLight ? '#CBD5E1' : '#1E293B'}
                  strokeWidth="2.5"
                />
                {/* Shading overlay */}
                <path
                  d="M 120 40 C 145 65 255 65 280 40 L 375 90 L 335 180 L 295 160 L 295 440 L 105 440 L 105 160 L 65 180 L 25 90 Z"
                  fill="url(#shirtShading)"
                />
                {/* Collar Neck Seam Line */}
                <path
                  d={viewSide === 'front' ? "M 120 40 C 160 85 240 85 280 40" : "M 120 40 C 160 55 240 55 280 40"}
                  fill="none"
                  stroke={selectedColorObj.isLight ? '#94A3B8' : '#334155'}
                  strokeWidth="3.5"
                />
                {/* Sleeve Seams */}
                <path d="M 105 160 L 65 90" fill="none" stroke={selectedColorObj.isLight ? '#CBD5E1' : '#334155'} strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 295 160 L 335 90" fill="none" stroke={selectedColorObj.isLight ? '#CBD5E1' : '#334155'} strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* PRINTABLE CANVAS BOUNDARY (Interactive Direct Manipulation Area) */}
              <div
                style={{
                  position: 'absolute',
                  top: '52%',
                  left: '50%',
                  width: `${PRINT_AREA.width}px`,
                  height: `${PRINT_AREA.height}px`,
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px dashed rgba(15, 39, 66, 0.35)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  overflow: 'visible'
                }}
              >
                {/* Printable Boundary Label */}
                <span style={{ position: 'absolute', top: '-18px', left: 0, fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em', fontWeight: 600 }}>
                  PRINT AREA ({viewSide.toUpperCase()})
                </span>

                {/* Render Current Side Elements */}
                {currentElements.map((el) => {
                  const isSelected = el.id === selectedId;

                  return (
                    <div
                      key={el.id}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${el.x}px, ${el.y}px) rotate(${el.rotation || 0}deg) scale(${el.scale || 1})`,
                        cursor: 'grab',
                        userSelect: 'none',
                        touchAction: 'none',
                        border: isSelected ? '2px solid #0F2742' : '1px dashed transparent',
                        padding: '4px',
                        borderRadius: '2px',
                        transition: isInteracting ? 'none' : 'border 0.2s ease'
                      }}
                      onMouseDown={(e) => startDrag(e, el, 'move')}
                      onTouchStart={(e) => startDrag(e, el, 'move')}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(el.id);
                      }}
                    >
                      {/* Text Element */}
                      {el.type === 'text' && (
                        <span
                          style={{
                            fontFamily: el.fontFamily,
                            fontSize: `${el.fontSize}px`,
                            color: el.fill,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            display: 'block',
                            lineHeight: 1.1
                          }}
                        >
                          {el.text}
                        </span>
                      )}

                      {/* Image Graphic Element */}
                      {el.type === 'image' && (
                        <img
                          src={el.src}
                          alt="Custom Graphic Artwork"
                          style={{
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                            objectFit: 'contain',
                            display: 'block',
                            pointerEvents: 'none'
                          }}
                        />
                      )}

                      {/* DIRECT MANIPULATION HANDLES (Visible on Selection) */}
                      {isSelected && (
                        <>
                          {/* Resize Handle (Bottom-Right) */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '-8px',
                              right: '-8px',
                              width: '16px',
                              height: '16px',
                              backgroundColor: '#0F2742',
                              border: '2px solid #FFFFFF',
                              borderRadius: '50%',
                              cursor: 'nwse-resize'
                            }}
                            onMouseDown={(e) => startDrag(e, el, 'resize')}
                            onTouchStart={(e) => startDrag(e, el, 'resize')}
                            title="Drag to resize"
                          />

                          {/* Rotate Handle (Top-Center) */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-24px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '16px',
                              height: '16px',
                              backgroundColor: '#DCEAF2',
                              border: '2px solid #0F2742',
                              borderRadius: '50%',
                              cursor: 'grab',
                              display: 'flex',
                              alignItems: 'center',
                              justify: 'center'
                            }}
                            onMouseDown={(e) => startDrag(e, el, 'rotate')}
                            onTouchStart={(e) => startDrag(e, el, 'rotate')}
                            title="Drag to rotate"
                          >
                            <RotateCw size={10} color="#0F2742" />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Interaction Instruction */}
            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              💡 <strong>Direct Manipulation:</strong> Click any element directly on the T-shirt to drag, scale (corner handle), or rotate (top handle).
            </p>
          </div>

          {/* RIGHT SIDE: CUSTOMIZATION TOOLBAR & OPTIONS PANEL */}
          <div className="card" style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* 1. PRIMARY TOOLBAR */}
            <div>
              <span className="eyebrow">DESIGN TOOLBAR</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-primary" onClick={handleAddText} style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  <Type size={16} /> Add Text
                </button>
                <label className="btn btn-outline" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>
                  <ImageIcon size={16} /> Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* 2. CONTEXTUAL ELEMENT EDITING TOOLBAR (Shown when an element is selected) */}
            {selectedElement && (
              <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="eyebrow" style={{ margin: 0, color: 'var(--navy)' }}>
                    EDIT SELECTED {selectedElement.type.toUpperCase()}
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button className="btn-icon" onClick={handleDuplicateSelected} title="Duplicate" style={{ width: 32, height: 32 }}>
                      <Copy size={14} />
                    </button>
                    <button className="btn-icon" onClick={handleDeleteSelected} title="Delete" style={{ width: 32, height: 32, color: '#DC2626' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Text Editing Controls */}
                {selectedElement.type === 'text' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.75rem' }}>Text Content</label>
                      <input
                        className="input"
                        value={selectedElement.text}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdateCurrentElements((prev) =>
                            prev.map((el) => (el.id === selectedId ? { ...el, text: val } : el))
                          );
                        }}
                      />
                    </div>

                    <div className="field-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}>Font Family</label>
                        <select
                          className="select"
                          value={selectedElement.fontFamily}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateCurrentElements((prev) =>
                              prev.map((el) => (el.id === selectedId ? { ...el, fontFamily: val } : el))
                            );
                          }}
                        >
                          {fontOptions.map((f) => (
                            <option key={f.label} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}>Text Color</label>
                        <input
                          type="color"
                          value={selectedElement.fill}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateCurrentElements((prev) =>
                              prev.map((el) => (el.id === selectedId ? { ...el, fill: val } : el))
                            );
                          }}
                          style={{ width: '100%', height: '42px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', padding: 0 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. GARMENT OPTIONS (COLOR & SIZE) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="eyebrow">SELECT GARMENT COLOR</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {colorOptions.map((col) => (
                    <button
                      key={col.label}
                      onClick={() => setSelectedColorObj(col)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: col.hex,
                        border: selectedColorObj.label === col.label ? '3px solid #0F2742' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                        boxShadow: selectedColorObj.label === col.label ? '0 0 0 2px #FFFFFF inset' : 'none'
                      }}
                      title={col.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="eyebrow">SELECT SIZE</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      className={`btn ${selectedSize === sz ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSelectedSize(sz)}
                      style={{ flex: 1, padding: '0.5rem 0', fontSize: '0.85rem' }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. ADVANCED SETTINGS COLLAPSIBLE */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}
              >
                <span>ADVANCED POSITIONING & NUMERIC FINE TUNING</span>
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showAdvanced && selectedElement && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
                  <div className="field-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.75rem' }}>Scale ({Math.round((selectedElement.scale || 1) * 100)}%)</label>
                      <input
                        type="range"
                        min="0.4"
                        max="2.5"
                        step="0.1"
                        value={selectedElement.scale || 1}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleUpdateCurrentElements((prev) =>
                            prev.map((el) => (el.id === selectedId ? { ...el, scale: val } : el))
                          );
                        }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.75rem' }}>Rotation ({selectedElement.rotation || 0}°)</label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={selectedElement.rotation || 0}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleUpdateCurrentElements((prev) =>
                            prev.map((el) => (el.id === selectedId ? { ...el, rotation: val } : el))
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. PRICING & ADD TO CART ACTION */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="eyebrow" style={{ margin: 0 }}>TOTAL ESTIMATE</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--navy)', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {formatCurrency(product.price + 200)}
                  </strong>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Includes Custom Studio Print</span>
              </div>

              <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '100%', padding: '1rem' }}>
                <ShoppingBag size={18} /> Add Custom Tee To Bag
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
