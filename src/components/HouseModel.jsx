import { useGLTF } from '@react-three/drei'
import { useMemo, useEffect } from 'react'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')

  useEffect(() => {
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  const [normScale, normPos] = useMemo(() => {
    // updateMatrixWorld ensures all child transforms are applied before bounds calc
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)

    if (box.isEmpty()) {
      console.warn('[HouseModel] empty bounding box')
      return [1, [0, -1, 0]]
    }

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    console.log('[HouseModel] size:', size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2), '→ scale:', (3 / maxDim).toFixed(4))

    const s = 3 / maxDim
    return [s, [-center.x * s, -box.min.y * s - 1, -center.z * s]]
  }, [scene])

  return <primitive object={scene} scale={normScale} position={normPos} />
}

useGLTF.preload('/house.glb')

useGLTF.preload('/house.glb')
