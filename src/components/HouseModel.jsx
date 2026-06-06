import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')

  useEffect(() => {
    // Auto-scale: normalize longest dimension to 4 units
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = 4 / maxDim
    scene.scale.setScalar(s)
    // Center horizontally, floor at y = -1
    scene.position.set(-center.x * s, -box.min.y * s - 1, -center.z * s)

    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        if (obj.material) {
          obj.material = obj.material.clone()
          obj.material.envMapIntensity = 1.5
        }
      }
    })
  }, [scene])

  return <primitive object={scene} />
}

useGLTF.preload('/house.glb')
