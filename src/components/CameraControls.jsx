import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const VIEWS = {
  front: { position: new THREE.Vector3(0, 2, 8),   target: new THREE.Vector3(0, 0, 0) },
  side:  { position: new THREE.Vector3(8, 2, 0),   target: new THREE.Vector3(0, 0, 0) },
  top:   { position: new THREE.Vector3(0.01, 12, 0), target: new THREE.Vector3(0, 0, 0) },
  close: { position: new THREE.Vector3(3, 1.5, 4), target: new THREE.Vector3(0, 1, 0) },
}

const CameraControls = forwardRef(function CameraControls(_, ref) {
  const controlsRef = useRef()
  const { camera } = useThree()
  const lerpTarget = useRef(null)

  useImperativeHandle(ref, () => ({
    goToView(name) {
      lerpTarget.current = VIEWS[name]
      if (controlsRef.current) controlsRef.current.autoRotate = false
    },
  }))

  useFrame(() => {
    if (!lerpTarget.current || !controlsRef.current) return
    camera.position.lerp(lerpTarget.current.position, 0.06)
    controlsRef.current.target.lerp(lerpTarget.current.target, 0.06)
    controlsRef.current.update()
    const posClose = camera.position.distanceTo(lerpTarget.current.position) < 0.05
    const tgtClose = controlsRef.current.target.distanceTo(lerpTarget.current.target) < 0.05
    if (posClose && tgtClose) lerpTarget.current = null
  })

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate
      autoRotateSpeed={0.6}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
      onStart={() => {
        if (controlsRef.current) controlsRef.current.autoRotate = false
      }}
    />
  )
})

export { VIEWS }
export default CameraControls
