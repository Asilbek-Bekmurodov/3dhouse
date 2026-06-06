import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const _box = new THREE.Box3()
const _size = new THREE.Vector3()
const _center = new THREE.Vector3()

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')
  const groupRef = useRef()
  const scaled = useRef(false)

  useEffect(() => {
    scaled.current = false
  }, [scene])

  useFrame(() => {
    if (scaled.current || !groupRef.current) return
    _box.setFromObject(groupRef.current)
    if (_box.isEmpty()) return

    _box.getSize(_size)
    _box.getCenter(_center)
    const maxDim = Math.max(_size.x, _size.y, _size.z)
    if (maxDim === 0) return

    const s = 4 / maxDim
    groupRef.current.scale.setScalar(s)
    groupRef.current.position.set(
      -_center.x * s,
      -_box.min.y * s - 1,
      -_center.z * s
    )
    scaled.current = true
    console.log('[HouseModel] size:', _size, '→ scale:', s.toFixed(4))

    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/house.glb')
