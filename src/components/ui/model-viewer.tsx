"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, Bounds, Html, useProgress } from '@react-three/drei';
import { Button } from './button';
import { X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Camera } from 'three';
import Image from 'next/image';

interface ModelViewerProps {
  modelPath: string;
  imagePaths?: string[];
  onClose: () => void;
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  // Hide Unity cameras and lights
  useEffect(() => {
    scene.traverse((child) => {
      if (child.type === 'Camera' || child.type === 'Light') {
        child.visible = false;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// Loader component for model loading
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        width: 200,
        padding: 16,
        background: 'rgba(30,30,30,0.85)',
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <div style={{
          height: 8,
          width: '100%',
          background: '#222',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 8
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.3s'
          }} />
        </div>
        <span style={{ color: '#fff', fontSize: 14 }}>{Math.floor(progress)}% Loading...</span>
      </div>
    </Html>
  );
}

export function ModelViewer({ modelPath, imagePaths = [], onClose }: ModelViewerProps) {
  const startPosition = [-3.3519290770293177, 0.142208724997511, -4.691621188336605];
  const cameraRef = useRef<Camera | null>(null);
  const controlsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Create slides array: model first, then images
  const slides = [modelPath, ...imagePaths];

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(
        ...(startPosition as [number, number, number])
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (controlsRef.current as any).reset();
    }
  };

  const zoomIn = () => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      const currentPosition = camera.position;
      const distance = Math.sqrt(currentPosition.x ** 2 + currentPosition.y ** 2 + currentPosition.z ** 2);
      const zoomFactor = 0.8; // Zoom in by 20%
      const newDistance = Math.max(distance * zoomFactor, 1); // Minimum distance of 1
      
      // Scale the position vector
      camera.position.x = (currentPosition.x / distance) * newDistance;
      camera.position.y = (currentPosition.y / distance) * newDistance;
      camera.position.z = (currentPosition.z / distance) * newDistance;
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      const currentPosition = camera.position;
      const distance = Math.sqrt(currentPosition.x ** 2 + currentPosition.y ** 2 + currentPosition.z ** 2);
      const zoomFactor = 1.2; // Zoom out by 20%
      const newDistance = Math.min(distance * zoomFactor, 15); // Maximum distance of 15
      
      // Scale the position vector
      camera.position.x = (currentPosition.x / distance) * newDistance;
      camera.position.y = (currentPosition.y / distance) * newDistance;
      camera.position.z = (currentPosition.z / distance) * newDistance;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const isModelSlide = currentSlide === 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[80vh] bg-background rounded-lg border border-border overflow-hidden flex items-center justify-center">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
          <div className="flex gap-2">
            {slides.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  ← Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  Next →
                </Button>
              </>
            )}
            {isModelSlide && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCamera}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomIn}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <ZoomOut className="h-4 w-4 mr-2" />
                  Zoom Out
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {slides.length > 1 && (
              <span className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                {currentSlide + 1} / {slides.length}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 3D Canvas */}
        {isModelSlide ? (
          <Canvas
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              zIndex: 10,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
            camera={{ 
              position: startPosition as [number, number, number],
              fov: 50,
              near: 0.1,
              far: 1000
            }}
            onCreated={({ camera }) => {
              cameraRef.current = camera;
            }}
          >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {/* Environment */}
            <Environment preset="apartment" />
            
            {/* Model */}
            <Suspense fallback={<Loader />}>
              <Bounds observe clip margin={1.2}>
                <Center>
                  <Model modelPath={modelPath} />
                </Center>
              </Bounds>
            </Suspense>
            
            {/* Controls */}
            <OrbitControls 
              ref={controlsRef}
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
              autoRotate={false}
              autoRotateSpeed={0.5}
              makeDefault
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative">
            <Image
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg shadow-2xl"
            />
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 text-sm text-muted-foreground">
            <p className="text-center">
              Use mouse to rotate • Scroll to zoom • Right-click to pan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 