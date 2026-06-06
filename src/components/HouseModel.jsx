import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')

  const { clone, scale, position } = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        if (obj.material) obj.material = obj.material.clone()
      }
    })

    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    console.log('[HouseModel] raw size:', size.toArray().map(v => v.toFixed(3)))

    const s = maxDim > 0 ? 4 / maxDim : 1
    return {
      clone,
      scale: s,
      position: [-center.x * s, -box.min.y * s - 1, -center.z * s],
    }
  }, [scene])

  return <primitive object={clone} scale={scale} position={position} />
}

useGLTF.preload('/house.glb')

useGLTF.preload('/house.glb')
