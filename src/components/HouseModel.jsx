import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')
  const [transform, setTransform] = useState(null)

  useEffect(() => {
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    if (box.isEmpty()) return

    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const s = 3 / maxDim

    setTransform({
      scale: s,
      position: [-center.x * s, -box.min.y * s, -center.z * s],
    })

    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  if (!transform) return null

  return (
    <group scale={transform.scale} position={transform.position}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/house.glb')
