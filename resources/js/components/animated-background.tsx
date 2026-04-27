import React, { useEffect, useState } from 'react';

const AnimatedBackground: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#020617]">
            {/* Subtle Grain Texture Overlay - Static, no performance hit */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Enhanced Fluid Blobs - Faster & More Dynamic Motion */}
            <div
                className="animate-fluid-blob absolute top-[-10%] left-[-10%] h-[70vw] w-[70vw] rounded-full bg-[#3b82f6]/25 blur-[80px]"
                style={{ willChange: 'transform' }}
            />

            <div
                className="animate-fluid-blob-delayed absolute right-[-5%] bottom-[-20%] h-[60vw] w-[60vw] rounded-full bg-[#f8fafc]/10 blur-[70px]"
                style={{ willChange: 'transform' }}
            />

            <div
                className="animate-fluid-blob-slow absolute top-[20%] right-[10%] h-[40vw] w-[40vw] rounded-full bg-[#60a5fa]/15 blur-[90px]"
                style={{ willChange: 'transform' }}
            />

            {/* NEW: Additional accent blob with different movement pattern */}
            <div
                className="animate-fluid-blob-diagonal absolute top-[50%] left-[30%] h-[50vw] w-[50vw] rounded-full bg-[#3b82f6]/10 blur-[100px]"
                style={{ willChange: 'transform' }}
            />

            {/* Enhanced Floating Geometric Elements - More Variety & Motion */}
            {mounted && (
                <>
                    <div className="absolute inset-0">
                        {/* Organic Blob Shapes */}
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={`blob-${i}`}
                                className="absolute backdrop-blur-md"
                                style={{
                                    width: `${Math.random() * 250 + 150}px`,
                                    height: `${Math.random() * 250 + 150}px`,
                                    left: `${Math.random() * 80}%`,
                                    top: `${Math.random() * 80}%`,
                                    opacity: 0.15,
                                    background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(248, 250, 252, 0.05))`,
                                    border: '1px solid rgba(248, 250, 252, 0.1)',
                                    borderRadius: `${30 + Math.random() * 40}% ${70 - Math.random() * 20}% ${70 - Math.random() * 20}% ${30 + Math.random() * 40}% / ${30 + Math.random() * 20}% ${30 + Math.random() * 20}% ${70 - Math.random() * 20}% ${70 - Math.random() * 20}%`,
                                    animation: `float-morph ${15 + Math.random() * 10}s ease-in-out infinite alternate`,
                                    animationDelay: `-${Math.random() * 10}s`,
                                    willChange: 'transform',
                                }}
                            />
                        ))}

                        {/* Hexagonal Shapes */}
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={`hex-${i}`}
                                className="absolute backdrop-blur-sm"
                                style={{
                                    width: `${Math.random() * 150 + 100}px`,
                                    height: `${Math.random() * 150 + 100}px`,
                                    left: `${Math.random() * 80}%`,
                                    top: `${Math.random() * 80}%`,
                                    opacity: 0.12,
                                    background: 'rgba(96, 165, 250, 0.05)',
                                    border: '1px solid rgba(248, 250, 252, 0.08)',
                                    clipPath:
                                        'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    animation: `rotate-float ${20 + Math.random() * 15}s linear infinite`,
                                    animationDelay: `-${Math.random() * 10}s`,
                                    willChange: 'transform',
                                }}
                            />
                        ))}

                        {/* Diamond/Square Shapes with Rotation */}
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={`diamond-${i}`}
                                className="absolute backdrop-blur-sm"
                                style={{
                                    width: `${Math.random() * 120 + 80}px`,
                                    height: `${Math.random() * 120 + 80}px`,
                                    left: `${Math.random() * 85}%`,
                                    top: `${Math.random() * 85}%`,
                                    opacity: 0.1,
                                    background:
                                        'linear-gradient(45deg, rgba(59, 130, 246, 0.08), transparent)',
                                    border: '1px solid rgba(248, 250, 252, 0.06)',
                                    transform: 'rotate(45deg)',
                                    animation: `spin-slow ${30 + Math.random() * 20}s linear infinite`,
                                    animationDelay: `-${Math.random() * 15}s`,
                                    willChange: 'transform',
                                }}
                            />
                        ))}

                        {/* Triangular Accents */}
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={`triangle-${i}`}
                                className="absolute backdrop-blur-sm"
                                style={{
                                    width: 0,
                                    height: 0,
                                    left: `${Math.random() * 80}%`,
                                    top: `${Math.random() * 80}%`,
                                    opacity: 0.08,
                                    borderLeft: `${Math.random() * 100 + 80}px solid transparent`,
                                    borderRight: `${Math.random() * 100 + 80}px solid transparent`,
                                    borderBottom: `${Math.random() * 150 + 120}px solid rgba(59, 130, 246, 0.06)`,
                                    animation: `float-tilt ${18 + Math.random() * 12}s ease-in-out infinite alternate`,
                                    animationDelay: `-${Math.random() * 8}s`,
                                    willChange: 'transform',
                                }}
                            />
                        ))}
                    </div>

                    {/* Enhanced Light Particles - More Dynamic */}
                    <div className="absolute inset-0">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-[#f8fafc] shadow-[0_0_15px_rgba(248,250,252,0.4)]"
                                style={{
                                    width: `${Math.random() * 3 + 1}px`,
                                    height: `${Math.random() * 3 + 1}px`,
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    opacity: Math.random() * 0.6 + 0.1,
                                    animation: `pulse-drift ${4 + Math.random() * 4}s ease-in-out infinite alternate`,
                                    animationDelay: `-${Math.random() * 4}s`,
                                    willChange: 'transform, opacity',
                                }}
                            />
                        ))}
                    </div>

                    {/* NEW: Accent Rings - Subtle circular elements */}
                    <div className="absolute inset-0">
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={`ring-${i}`}
                                className="absolute rounded-full border-2 border-[#3b82f6]/10"
                                style={{
                                    width: `${Math.random() * 300 + 200}px`,
                                    height: `${Math.random() * 300 + 200}px`,
                                    left: `${Math.random() * 70}%`,
                                    top: `${Math.random() * 70}%`,
                                    animation: `expand-pulse ${25 + Math.random() * 15}s ease-in-out infinite`,
                                    animationDelay: `-${Math.random() * 10}s`,
                                    willChange: 'transform, opacity',
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            <style>{`
        /* Enhanced Fluid Blob Animations - Faster & More Dynamic */
        @keyframes fluid-blob {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(8vw, -6vh, 0) scale(1.1); }
          50% { transform: translate3d(-4vw, 10vh, 0) scale(0.9); }
          75% { transform: translate3d(6vw, -3vh, 0) scale(1.05); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        /* Diagonal Movement Pattern */
        @keyframes fluid-blob-diagonal {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-10vw, -8vh, 0) scale(1.08); }
          66% { transform: translate3d(8vw, 12vh, 0) scale(0.92); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        /* Enhanced Float with Morphing */
        @keyframes float-morph {
          0% { 
            transform: translate3d(0, 0, 0) rotate(0deg); 
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          33% { 
            transform: translate3d(20px, -40px, 0) rotate(5deg); 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          66% { 
            transform: translate3d(-15px, -25px, 0) rotate(-3deg); 
            border-radius: 40% 60% 60% 40% / 40% 60% 40% 60%;
          }
          100% { 
            transform: translate3d(0, 0, 0) rotate(0deg); 
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
        }

        /* Rotation with Float */
        @keyframes rotate-float {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -35px, 0) rotate(180deg); }
          100% { transform: translate3d(0, 0, 0) rotate(360deg); }
        }

        /* Slow Spin */
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }

        /* Float with Tilt */
        @keyframes float-tilt {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.08; }
          50% { transform: translate3d(15px, -45px, 0) rotate(10deg); opacity: 0.12; }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.08; }
        }

        /* Enhanced Pulse with Drift */
        @keyframes pulse-drift {
          0% { 
            opacity: 0.2; 
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
          }
          50% { 
            opacity: 0.7; 
            transform: translate3d(10px, -20px, 0) scale3d(1.8, 1.8, 1); 
          }
          100% { 
            opacity: 0.2; 
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
          }
        }

        /* Expand Pulse for Rings */
        @keyframes expand-pulse {
          0% { 
            transform: scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: scale(1.15); 
            opacity: 0.05; 
          }
          100% { 
            transform: scale(1); 
            opacity: 0.1; 
          }
        }

        /* Apply Animations to Classes */
        .animate-fluid-blob {
          animation: fluid-blob 18s ease-in-out infinite;
          transform: translate3d(0, 0, 0);
        }
        
        .animate-fluid-blob-delayed {
          animation: fluid-blob 22s ease-in-out infinite reverse;
          animation-delay: -4s;
          transform: translate3d(0, 0, 0);
        }

        .animate-fluid-blob-slow {
          animation: fluid-blob 28s ease-in-out infinite;
          animation-delay: -10s;
          transform: translate3d(0, 0, 0);
        }

        .animate-fluid-blob-diagonal {
          animation: fluid-blob-diagonal 24s ease-in-out infinite;
          animation-delay: -6s;
          transform: translate3d(0, 0, 0);
        }
      `}</style>
        </div>
    );
};

export default AnimatedBackground;
