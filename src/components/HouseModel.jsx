import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')
  const ref = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!ref.current) return

    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)

    if (box.isEmpty()) return

    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const s = 3 / maxDim

    ref.current.scale.setScalar(s)
    ref.current.position.set(
      -center.x * s,
      -box.min.y * s - 1,
      -center.z * s
    )

    // Kamera model ga to'g'ri yo'naltirilgan
    const dist = maxDim * s * 2.2
    camera.position.set(dist * 0.6, dist * 0.4, dist)
    camera.lookAt(0, 0, 0)

    console.log('[HouseModel] maxDim:', maxDim.toFixed(1), '→ s:', s.toFixed(4), '→ camDist:', dist.toFixed(1))

    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene, camera])

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/house.glb')

useGLTF.preload('/house.glb')
