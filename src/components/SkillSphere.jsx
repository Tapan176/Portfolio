import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { skills } from '../data/portfolio.js'
import { useInView, usePrefersReducedMotion } from '../hooks.js'

const RADIUS = 3.1
const CAM_Z = 8.5

function fibonacciSphere(n, r) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = golden * i
    pts.push(new THREE.Vector3(Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r))
  }
  return pts
}

function Tag({ label, position, hue }) {
  const anchor = useRef()
  const el = useRef()
  const world = useMemo(() => new THREE.Vector3(), [])

  // Fade labels on the back of the sphere so the front ones read clearly.
  useFrame((state) => {
    if (!anchor.current || !el.current) return
    anchor.current.getWorldPosition(world)
    const d = world.distanceTo(state.camera.position)
    const t = THREE.MathUtils.clamp((d - (CAM_Z - RADIUS)) / (2 * RADIUS), 0, 1) // 0 front -> 1 back
    el.current.style.opacity = String(1 - t * 0.8)
    el.current.style.transform = `scale(${1 - t * 0.3})`
  })

  return (
    <group position={position} ref={anchor}>
      <Html center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <span ref={el} className="skill-tag" style={{ '--h': Math.round(hue * 360) }}>
          {label}
        </span>
      </Html>
    </group>
  )
}

function Globe() {
  const points = useMemo(() => fibonacciSphere(skills.length, RADIUS), [])
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.98, 2]} />
        <meshBasicMaterial color="#6d7bff" wireframe transparent opacity={0.1} />
      </mesh>
      {points.map((p, i) => (
        <Tag key={skills[i]} label={skills[i]} position={p} hue={0.5 + (i / skills.length) * 0.45} />
      ))}
    </group>
  )
}

export default function SkillSphere() {
  const [ref, inView] = useInView()
  const reduced = usePrefersReducedMotion()
  return (
    <div className="skill-sphere" ref={ref}>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, CAM_Z], fov: 50 }}
        gl={{ alpha: true }}
      >
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.8} />
      </Canvas>
      <p className="hint">Drag to spin the sphere</p>
    </div>
  )
}
