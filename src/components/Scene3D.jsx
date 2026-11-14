import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { useIsCoarsePointer, useIsSmallScreen, usePrefersReducedMotion } from '../hooks.js'

/**
 * Which hero layout the screen needs (keep in sync with the CSS media queries):
 *  - 'side'    : desktop / large tablet landscape - core sits beside the headline
 *  - 'stacked' : phones & portrait tablets - core floats above the headline
 *  - 'compact' : short landscape phones - small, dimmed core parked on the right
 */
function getLayout(width, height) {
  const aspect = width / height
  if (height < 560 && aspect > 1.3) return 'compact'
  if (width < 900 || aspect < 1.1) return 'stacked'
  return 'side'
}

/* ---------- Star field --------------------------------------------------- */
function Stars({ count }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 26
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.012
    ref.current.rotation.x += dt * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#9fb4ff" sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}

/* ---------- Hero core ---------------------------------------------------- */
const SATELLITES = [
  { r: 2.6, speed: 0.55, tilt: [0.5, 0, 0.2], size: 0.13, hue: 0.52 },
  { r: 3.1, speed: -0.4, tilt: [-0.9, 0.4, 0], size: 0.1, hue: 0.78 },
  { r: 3.6, speed: 0.3, tilt: [1.2, 0, -0.5], size: 0.16, hue: 0.9 },
  { r: 2.2, speed: -0.7, tilt: [0.1, 0.9, 0.9], size: 0.09, hue: 0.45 },
  { r: 4.1, speed: 0.22, tilt: [-0.3, -0.6, 0.3], size: 0.12, hue: 0.62 },
]

function Satellite({ r, speed, tilt, size, hue }) {
  const pivot = useRef()
  const color = useMemo(() => new THREE.Color().setHSL(hue, 0.9, 0.6), [hue])
  useFrame((state) => {
    pivot.current.rotation.y = state.clock.elapsedTime * speed
  })
  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, 0.004, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      <group ref={pivot}>
        <mesh position={[r, 0, 0]}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
        </mesh>
      </group>
    </group>
  )
}

function Core({ scroll, reduced }) {
  const group = useRef()
  const knot = useRef()
  const wire = useRef()
  const mat = useRef()
  const tmp = useMemo(() => new THREE.Color(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = scroll.current
    const layout = getLayout(state.size.width, state.size.height)
    const vw = state.viewport.width // world units visible horizontally at the core's depth
    const vh = state.viewport.height
    const speed = reduced ? 0.15 : 1

    // h = 1 in the hero, falls to 0 once the user scrolls into the content sections.
    const h = 1 - THREE.MathUtils.smoothstep(p, 0.02, 0.17)
    // Hero: big and beside the headline. Content: small, translucent, parked at the page edges.
    // Everything is expressed relative to the visible viewport, so it adapts to any aspect ratio.
    const stacked = layout === 'stacked'
    const heroX = stacked ? 0 : vw * (layout === 'compact' ? 0.3 : 0.2)
    const heroY = stacked ? vh * 0.3 : 0
    const parkX = stacked ? vw * 0.3 * Math.cos(p * Math.PI * 5) : vw * 0.42 * Math.cos(p * Math.PI * 5)
    const parkY = stacked ? vh * 0.34 : Math.sin(p * Math.PI * 6) * vh * 0.28
    const heroScale = stacked
      ? THREE.MathUtils.clamp(vw * 0.17, 0.42, 0.85) * (state.size.height < 650 ? 0.7 : 1)
      : layout === 'compact'
        ? 0.5
        : THREE.MathUtils.clamp(vw / 13, 0.75, 1.25)
    const targetX = THREE.MathUtils.lerp(parkX, heroX, h)
    const targetY = THREE.MathUtils.lerp(parkY, heroY, h)
    const targetZ = THREE.MathUtils.lerp(-5, 0, h)
    const targetS = heroScale * THREE.MathUtils.lerp(0.5, 1, h)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, dt)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, dt)
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 3, dt)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetS, 3, dt))
    mat.current.opacity = THREE.MathUtils.lerp(0.42, layout === 'compact' ? 0.65 : 1, h)
    wire.current.material.opacity = THREE.MathUtils.lerp(0.1, 0.22, h)

    knot.current.rotation.x = t * 0.18 * speed + p * 4
    knot.current.rotation.y = t * 0.25 * speed + p * 6
    wire.current.rotation.x = -t * 0.12 * speed
    wire.current.rotation.z = t * 0.1 * speed + p * 3

    // Hue travels cyan -> violet -> pink with scroll.
    tmp.setHSL(0.52 + p * 0.4, 0.85, 0.58)
    mat.current.color.copy(tmp)
    mat.current.emissive.copy(tmp).multiplyScalar(0.25)
  })

  return (
    <group ref={group}>
      <Float speed={reduced ? 0.4 : 1.6} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1, 0.34, 220, 36, 2, 3]} />
          <MeshDistortMaterial
            ref={mat}
            color="#22d3ee"
            transparent
            roughness={0.15}
            metalness={0.8}
            distort={0.28}
            speed={reduced ? 0.3 : 1.6}
          />
        </mesh>
        <mesh ref={wire} scale={1.95}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#7c8cff" wireframe transparent opacity={0.22} />
        </mesh>
        {SATELLITES.map((s, i) => (
          <Satellite key={i} {...s} />
        ))}
      </Float>
    </group>
  )
}

/* ---------- Floating geometric debris ------------------------------------ */
// Each shape shrinks to nothing as it approaches the camera, so as the scene rotates with
// scroll no shape can ever swing past the lens and cover the screen.
function DebrisItem({ it, wire }) {
  const mesh = useRef()
  const world = useMemo(() => new THREE.Vector3(), [])
  const color = useMemo(() => new THREE.Color().setHSL(it.hue, 0.8, 0.55), [it.hue])
  const emissive = useMemo(() => new THREE.Color().setHSL(it.hue, 0.8, 0.35), [it.hue])
  useFrame((state) => {
    mesh.current.getWorldPosition(world)
    const d = world.distanceTo(state.camera.position)
    mesh.current.scale.setScalar(it.scale * THREE.MathUtils.smoothstep(d, 4, 8))
  })
  return (
    <Float speed={it.speed} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh ref={mesh} position={it.position} scale={it.scale}>
        {it.kind === 0 && <octahedronGeometry args={[1, 0]} />}
        {it.kind === 1 && <tetrahedronGeometry args={[1, 0]} />}
        {it.kind === 2 && <icosahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          wireframe={wire}
          roughness={0.3}
          metalness={0.6}
          emissive={emissive}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function Debris({ count }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const radius = 6 + Math.random() * 6
        return {
          position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 11, Math.sin(angle) * radius - 7],
          scale: 0.2 + Math.random() * 0.4,
          kind: i % 3,
          hue: 0.5 + Math.random() * 0.4,
          speed: 0.3 + Math.random() * 0.8,
        }
      }),
    [count],
  )
  return items.map((it, i) => <DebrisItem key={i} it={it} wire={i % 2 === 0} />)
}

/* ---------- Camera rig: mouse parallax + scroll depth ---------------------- */
function Rig({ scroll, reduced, coarse }) {
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, dt) => {
    const p = scroll.current
    const t = state.clock.elapsedTime
    // Touch screens have no hover pointer, so use a gentle idle sway instead of mouse parallax.
    const px = reduced ? 0 : coarse ? Math.sin(t * 0.25) * 0.5 : state.pointer.x
    const py = reduced ? 0 : coarse ? Math.cos(t * 0.2) * 0.3 : state.pointer.y
    const targetZ = 9 - Math.sin(p * Math.PI) * 2.2
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px * 0.9, 2.5, dt)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, py * 0.6, 2.5, dt)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2.5, dt)
    look.set(0, 0, 0)
    state.camera.lookAt(look)
    // Whole world slowly turns as you scroll.
    state.scene.rotation.y = THREE.MathUtils.damp(state.scene.rotation.y, p * Math.PI * 0.9, 2, dt)
  })
  return null
}

export default function Scene3D({ scroll }) {
  const reduced = usePrefersReducedMotion()
  const small = useIsSmallScreen()
  const coarse = useIsCoarsePointer()
  const maxDpr = small ? 1.5 : 1.75
  const [dpr, setDpr] = useState(Math.min(maxDpr, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1))
  return (
    <div className="scene-bg" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: !small, alpha: true, powerPreference: 'high-performance' }}
        // The canvas itself ignores the pointer, so listen on the page for parallax.
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        {/* Lowers resolution automatically on slow GPUs and restores it when they keep up. */}
        <PerformanceMonitor
          onChange={({ factor }) => setDpr(Math.max(1, Math.round((0.6 + 0.4 * factor) * maxDpr * 100) / 100))}
        />
        <fog attach="fog" args={['#05060f', 12, 34]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 5, 6]} intensity={90} color="#22d3ee" />
        <pointLight position={[-7, -4, 3]} intensity={70} color="#a855f7" />
        <pointLight position={[0, 6, -6]} intensity={40} color="#f472b6" />
        <Stars count={small ? 900 : 2200} />
        <Core scroll={scroll} reduced={reduced} />
        <Debris count={small ? 8 : 16} />
        <Rig scroll={scroll} reduced={reduced} coarse={coarse} />
      </Canvas>
    </div>
  )
}
