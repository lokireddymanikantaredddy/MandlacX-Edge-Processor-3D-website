'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// 3D Model (visually dominant, much bigger)
function DeviceModel({ scrolled }: { scrolled: boolean }) {
  const group = useRef<any>(null);
  const targetY = scrolled ? Math.PI / 10 : 0;
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.01;
    }
  });
  const { scene } = useGLTF('/models/model.glb');
  return (
    <group ref={group}>
      <primitive object={scene} scale={13} position={[0.4, 0.8, 0]} />
    </group>
  );
}

export default function Hero3D() {
  const callouts = [
    {
      title: 'MandlacX Edge Processor',
      desc: 'A multi-domain, first-generation AI-powered device designed for real-time threat detection.',
      style: 'top-[80px] left-0 w-[395px] h-[189px] rounded-tl-2xl rounded-bl-2xl',
      line: { x1: 395, y1: 140, x2: 586-120, y2: 260 },
    },
    {
      title: 'Key Specifications',
      desc: '• USB 3.0 Support\n• 16 GB RAM\n• A7 Cortex Processor\n• Three multi-axis surveillance lenses',
      style: 'top-[80px] right-0 w-[395px] h-[222px] rounded-tr-2xl rounded-br-2xl',
      line: { x1: 800, y1: 160, x2: 586+120, y2: 260 },
    },
    {
      title: 'Real-Time Threat Detection',
      desc: 'Detects\n• Intrusions\n• Firearms & Sharp Objects\n• Human Falls\n• Unusual or Aggressive Motion',
      style: 'top-[300px] left-0 w-[395px] h-[189px] rounded-bl-2xl',
      line: { x1: 395, y1: 370, x2: 586-120, y2: 340 },
    },
    {
      title: 'On-Device Intelligence',
      desc: '• Engineered to deliver intelligent surveillance without relying on the cloud, it gives you control, speed, and reliability right where you need it.',
      style: 'top-[340px] right-0 w-[395px] h-[255px] rounded-br-2xl',
      line: { x1: 800, y1: 440, x2: 586+120, y2: 380 },
    },
  ];

  // Helper for yellow bullet points
  function renderDesc(desc: string) {
    return desc.split('\n').map((line, i) =>
      line.trim().startsWith('•') ? (
        <div key={i} className="flex items-start text-[17px]">
          <span className="inline-block w-3 h-3 mt-1 mr-2 rounded-full bg-yellow-400" />
          <span className="text-white">{line.replace(/^•\s*/, '')}</span>
        </div>
      ) : (
        <div key={i} className="text-white text-[17px]">{line}</div>
      )
    );
  }

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full  min-h-screen bg-[#101014] flex flex-col items-center overflow-x-hidden">
      {/* Subheading and Heading */}
      <div className="w-full max-w-[1172px] mx-auto pt-10 pb-2 text-center z-20">
        <div className="text-[16px] text-yellow-400 tracking-widest mb-2 uppercase font-semibold">THE FUTURE OF ON-SITE AI SURVEILLANCE</div>
        <h1 className="text-[50px] leading-[1.1] font-extrabold text-white mb-2">
          MandlacX Edge <span className="italic font-light">Processor</span>
        </h1>
      </div>
      {/* Hero Content */}
      <div className="relative w-full max-w-[1172px] mx-auto h-[700px] mt-2 flex items-center justify-center  z-10">
        
        {/* 3D Model */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[800px] h-[500px] flex items-center justify-center">
  <Canvas camera={{ position: [2.5, 2.2, 3.5], fov: 35 }} style={{ background: 'transparent' }}>
    {/* Soft ambient light */}
    <ambientLight intensity={0.7} />
    {/* Main directional light for strong highlight */}
    <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    {/* Fill light for softer shadows */}
    <directionalLight position={[-5, 2, -5]} intensity={0.5} />
    {/* Optional: subtle environment for reflections */}
    <Environment preset="city" />
    {/* 3D Model */}
    <DeviceModel scrolled={scrolled} />
    {/* Soft contact shadow under the model */}
    <ContactShadows
      position={[0, -0.7, 0]}
      opacity={0.35}
      width={8}
      height={8}
      blur={2.5}
      far={1.5}
    />
    <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
  </Canvas>
</div>
        {/* Callout Boxes */}
        {callouts.map((c, idx) => (
          <div
            key={idx}
            className={`absolute ${c.style} bg-[#181A20] shadow-lg border-l-4 border-yellow-400 p-7 flex flex-col justify-center z-20`}
            style={{
              fontFamily: 'inherit',
              borderRadius: '18px',
            }}
          >
            <div className="font-extrabold text-[22px] mb-2 text-white">{c.title}</div>
            <div className="text-[17px] whitespace-pre-line text-white">
              {renderDesc(c.desc)}
            </div>
          </div>
        ))}
        {/* SVG Connector Lines */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-30" width="1172" height="700">
          {callouts.map((c, idx) => (
            <g key={idx}>
              <line
                x1={c.line.x1}
                y1={c.line.y1}
                x2={c.line.x2}
                y2={c.line.y2}
                stroke="#fff"
                strokeWidth="2"
              />
              <circle cx={c.line.x1} cy={c.line.y1} r="6" fill="#fff" />
              <circle cx={c.line.x2} cy={c.line.y2} r="6" fill="#fff" />
            </g>
          ))}
        </svg>
      </div>
      {/* Features grid below (reuse your previous section here) */}
      <section className="w-full flex flex-col items-center bg-[#101014] pt-20 pb-12">
    

  <div className="w-full max-w-[1172px] mx-auto grid grid-cols-3 grid-rows-3 gap-8 items-center">
    {/* Row 1 */}
    {/* Heading */}
    <div className="flex flex-col justify-center items-start w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <div className="text-[22px] italic text-white mb-2 leading-tight">MandlacX Over</div>
      <div className="text-[44px] font-extrabold text-white leading-tight">Cloud-Only<br/>Video Analytics</div>
    </div>
    {/* Bullet-Proof Weapon Detection */}
    <div className="border border-[#23262F] shadow bg-transparent p-6 flex flex-col justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/bullet.png" alt="Bullet-Proof Weapon Detection Icon" className="w-6 h-6 mb-2" />
      <div className="font-bold text-[18px] text-white mb-1">Bullet-Proof Weapon Detection</div>
      <div className="text-[15px] text-gray-300">MandlacX is trained to detect firearms, knives, and other sharp threats with precision—no internet required.</div>
    </div>
    {/* Bandwidth Card */}
    <div className="border border-[#23262F] shadow bg-transparent p-6 flex flex-col justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/bandwidth.png" alt="Bandwidth Icon" className="w-6 h-6 mb-2" />
      <div className="font-bold text-[18px] text-white mb-1">Bandwidth You Can Actually Afford</div>
      <div className="text-[15px] text-gray-300">No continuous streaming. No heavy uploads. Just efficient edge computing that saves your network and your budget.</div>
    </div>
    {/* Row 2 */}
    {/* Privacy Card */}
    <div className="border border-[#23262F] shadow bg-transparent p-6 flex flex-col justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/privacy.png" alt="Privacy Icon" className="w-6 h-6 mb-2" />
      <div className="font-bold text-[18px] text-white mb-1">Privacy by Design</div>
      <div className="text-[15px] text-gray-300">Your footage stays on-site. No cloud syncs, no external servers—just full control over your data.</div>
    </div>
    {/* Center Image */}
    <div className="flex items-center justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/model2.png" alt="MandlacX Device" className="w-[220px] h-[140px] object-contain" />
    </div>
    {/* Latency Card */}
    <div className="border border-[#23262F] shadow bg-transparent p-6 flex flex-col justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/latency.png" alt="Latency Icon" className="w-6 h-6 mb-2" />
      <div className="font-bold text-[18px] text-white mb-1">Latency That Saves Seconds—and Lives</div>
      <div className="text-[15px] text-gray-300">Instant on-device processing means faster alerts and quicker interventions during critical moments.</div>
    </div>
    {/* Row 3 */}
    {/* Empty Cell */}
    <div></div>
    {/* Future-Proof AI Stack */}
    <div className="border border-[#23262F] shadow bg-transparent p-6 flex flex-col justify-center w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <img src="/future.png" alt="Future-Proof Icon" className="w-6 h-6 mb-2" />
      <div className="font-bold text-[18px] text-white mb-1">Future-Proof AI Stack</div>
      <div className="text-[15px] text-gray-300">With modular AI models and local firmware updates, MandlacX is built to evolve with your needs—no dependency on cloud upgrades.</div>
    </div>
    {/* Slogan */}
    <div className="flex flex-col justify-center items-end w-[260px] h-[260px]" style={{ borderRadius: '18px' }}>
      <div className="text-right text-gray-300 italic text-[28px] leading-tight">
        Built for Speed. <span className="font-bold text-white not-italic">Designed for Action.</span>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}

// Required for GLTF loading
// @ts-ignore
import { useGLTF as _useGLTF } from '@react-three/drei';
_useGLTF.preload('/models/model.glb');