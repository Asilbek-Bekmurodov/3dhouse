import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')

  useEffect(() => {
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

  return <primitive object={scene} scale={0.008} position={[0, -1, 0]} />
}

useGLTF.preload('/house.glb')
