'use client'

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

type Props = ThreeElements['mesh'] & {
  volume?: number
}

export default function Box(props: Props) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  
  const _scale = props.volume ? props.volume / 64 : 0
  // const _rotationX = _scale * 0.03
  // const _rotationY = _scale * 0.01
  const _rotationZ = _scale * 0.03

  useFrame((state, delta) => {
    // ref.current.rotation.x += _rotationX
    // ref.current.rotation.y += _rotationY
    ref.current.rotation.z -= _rotationZ
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={_scale}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#11A101' : '#1AE803'} wireframe />
    </mesh>
  )
}