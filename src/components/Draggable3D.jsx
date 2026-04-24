import { useRef, useState } from 'react';

export default function Draggable3D({ children, className = '', style }) {
  const [rot, setRot] = useState({ x: -8, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef(null);

  const onPointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    startRef.current = {
      px: e.clientX,
      py: e.clientY,
      rx: rot.x,
      ry: rot.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging || !startRef.current) return;
    const dx = e.clientX - startRef.current.px;
    const dy = e.clientY - startRef.current.py;
    setRot({
      y: startRef.current.ry + dx * 0.5,
      x: startRef.current.rx - dy * 0.5
    });
  };

  const onPointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    startRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg)`,
        transformStyle: 'preserve-3d',
        transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </div>
  );
}
