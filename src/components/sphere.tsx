'use client'

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

type Props = ThreeElements['mesh'] & {
  volume?: number
}

export default function Sphere(props: Props) {
  const ref = useRef<THREE.Mesh>(null!)
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)
  
  // useFrame((state, delta) => {
  //   const _rotation = props.volume ? props.volume / 90 : 0.03
  //   const _rotationX = _rotation * 0.001
  //   const _rotationY = _rotation * 0.03
  //   const _rotationZ = _rotation * 0.0
  //   ref.current.rotation.y += _rotationY
  //   if (props.volume && props.volume > 60) {
  //     ref.current.rotation.z += _rotationZ
  //   }
  //   if (props.volume && props.volume > 90) {
  //     ref.current.rotation.x += _rotationX
  //   }
  // })
  
  useFrame((state, delta) => {
    ref.current.rotation.x = 1.57

    if (props.volume) {
      const _scale = Math.max(props.volume * 0.014, 1)
      ref.current.scale.x = _scale
      ref.current.scale.y = _scale
      ref.current.scale.z = _scale
      ref.current.rotation.y -= _scale * 0.003
      // if (props.volume > 90) {
      //   ref.current.rotation.z -= _scale * 0.0003
      // }
    } else {
      ref.current.scale.x = 1
      ref.current.scale.y = 1
      ref.current.scale.z = 1
      ref.current.rotation.y -= 0.003
      // ref.current.rotation.z += 0.003
    }
  })
  
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={3}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={'#1AE803'} wireframe />
    </mesh>
  )
}