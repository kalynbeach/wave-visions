'use client'

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

type Props = ThreeElements['mesh'] & {
  volume?: number
}

export default function Sphere(props: Props) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  
  const _scale = props.volume ? Math.max(props.volume / 70, 1) : 1
  const _rotation = props.volume ? props.volume / 90 : 0.03
  const _rotationX = _rotation * 0.001
  const _rotationY = _rotation * 0.03
  const _rotationZ = _rotation * 0.0

  useFrame((state, delta) => {
    ref.current.rotation.y += _rotationY
    if (props.volume && props.volume > 60) {
      ref.current.rotation.z += _rotationZ
    }
    if (props.volume && props.volume > 90) {
      ref.current.rotation.x += _rotationX
    }

  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={_scale}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={'#1AE803'} wireframe />
    </mesh>
  )
}