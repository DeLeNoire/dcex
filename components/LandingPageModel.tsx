"use client"
import React, { useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useGLTF, OrbitControls, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Extend PlaneGeometry for use in JSX
extend({ PlaneGeometry: THREE.PlaneGeometry })

const LandingPageModel = () => {
  const { scene } = useGLTF("/bag.glb")
  const modelRef = useRef()
  const clock = useRef(new THREE.Clock())

  // Animation: Rotate the model and zoom in
  

  return (
    <Canvas
      camera={{ position: [2, 1.5, 5], fov: 42 }}
      shadows="basic"
    >
        
      {/* Preload the model */}
      <Preload all />
      <ambientLight intensity={1} 
      />

      <directionalLight
        position={[3, 10, 0]}
        intensity={1.5}
        castShadow
      />

        <spotLight
        position={[1, 5, 0]}
        intensity={1}
        castShadow
        />

        <pointLight
        position={[0, 2.5, 2]}
        intensity={15}
        castShadow
        />

      <primitive
        ref={modelRef}
        object={scene}
        scale={[1.5, 1.5, 1.5]}
        position={[0, -0.1, 0]}
        castShadow
      />


      <mesh receiveShadow position={[0, 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" args={[5, 5]} />
        <shadowMaterial attach="material" opacity={0.2} />
      </mesh>

      {/* <color attach="background" args={['#f5d18c']} /> */}

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

export default LandingPageModel
