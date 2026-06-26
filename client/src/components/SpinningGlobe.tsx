import { useEffect, useRef } from "react";

export default function SpinningGlobe({ size = 420 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.42;

    // Generate dot positions on sphere surface
    const dots: { lat: number; lng: number }[] = [];
    const numDots = 320;
    for (let i = 0; i < numDots; i++) {
      const lat = Math.acos(1 - (2 * (i + 0.5)) / numDots) - Math.PI / 2;
      const lng = Math.PI * (1 + Math.sqrt(5)) * i;
      dots.push({ lat, lng });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // Outer glow ring
      const grad = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.1);
      grad.addColorStop(0, "oklch(0.78 0.15 175 / 0)");
      grad.addColorStop(0.7, "oklch(0.78 0.15 175 / 0.04)");
      grad.addColorStop(1, "oklch(0.78 0.15 175 / 0.12)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
      ctx.fill();

      // Equator ring lines (faint)
      for (let ring = 0; ring < 6; ring++) {
        const lat = (ring / 5) * Math.PI - Math.PI / 2;
        const ringR = R * Math.cos(lat);
        const ringY = cy + R * Math.sin(lat);
        ctx.beginPath();
        ctx.ellipse(cx, ringY, ringR, ringR * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,210,180,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Meridian lines (faint)
      for (let m = 0; m < 8; m++) {
        const lng = angleRef.current + (m / 8) * Math.PI * 2;
        ctx.beginPath();
        for (let step = 0; step <= 60; step++) {
          const lat = (step / 60) * Math.PI - Math.PI / 2;
          const x3d = R * Math.cos(lat) * Math.cos(lng);
          const y3d = R * Math.sin(lat);
          const z3d = R * Math.cos(lat) * Math.sin(lng);
          if (z3d < 0) continue; // only front hemisphere
          const px = cx + x3d;
          const py = cy - y3d;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(0,210,180,0.05)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Dots
      const sorted = dots
        .map((d) => {
          const lng = d.lng + angleRef.current;
          const x3d = R * Math.cos(d.lat) * Math.cos(lng);
          const y3d = R * Math.sin(d.lat);
          const z3d = R * Math.cos(d.lat) * Math.sin(lng);
          return { x: cx + x3d, y: cy - y3d, z: z3d };
        })
        .sort((a, b) => a.z - b.z);

      for (const dot of sorted) {
        const isFront = dot.z >= 0;
        const depthFactor = (dot.z + R) / (2 * R); // 0 (back) to 1 (front)
        const radius = isFront ? 1.4 + depthFactor * 1.2 : 0.6;
        const alpha = isFront ? 0.3 + depthFactor * 0.7 : 0.08 + depthFactor * 0.12;

        // Color: teal for front, blue-teal for back
        const hue = isFront ? 175 : 200;
        const chroma = isFront ? 0.15 : 0.08;
        const lightness = isFront ? 0.5 + depthFactor * 0.3 : 0.3;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${lightness} ${chroma} ${hue} / ${alpha})`;
        ctx.fill();

        // Glow on front dots
        if (isFront && depthFactor > 0.7) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius * 2.5, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, radius * 2.5);
          glow.addColorStop(0, `oklch(0.78 0.15 175 / ${alpha * 0.4})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      // Center glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      centerGlow.addColorStop(0, "oklch(0.78 0.15 175 / 0.03)");
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2);
      ctx.fill();

      angleRef.current += 0.004;
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0 0 40px oklch(0.78 0.15 175 / 0.3))",
        opacity: 0.92,
      }}
    />
  );
}
