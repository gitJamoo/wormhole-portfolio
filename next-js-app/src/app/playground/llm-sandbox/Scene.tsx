"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Billboard, Grid } from "@react-three/drei";
import { useMemo } from "react";
import type { WordVector } from "./types";

const SCALE = 5;

export function toScene(v: { x: number; y: number; z: number }): [number, number, number] {
  return [v.x * SCALE, v.y * SCALE, v.z * SCALE];
}

interface SceneProps {
  points: WordVector[];
  axes: { x: string; y: string; z: string };
  highlighted: Set<number>; // indices to emphasize; empty = all normal
  similarityPair: [number, number] | null;
  analogy: {
    a: number;
    b: number;
    c: number;
    result: { x: number; y: number; z: number };
    nearest: number;
  } | null;
}

function AxisLabels({ axes }: { axes: { x: string; y: string; z: string } }) {
  const end = SCALE + 1.2;
  return (
    <>
      {/* Axis lines */}
      <Line points={[[-end, 0, 0], [end, 0, 0]]} color="#ef4444" lineWidth={1} />
      <Line points={[[0, -end, 0], [0, end, 0]]} color="#22c55e" lineWidth={1} />
      <Line points={[[0, 0, -end], [0, 0, end]]} color="#3b82f6" lineWidth={1} />
      <Billboard position={[end + 0.3, 0, 0]}>
        <Text fontSize={0.5} color="#ef4444" anchorX="left">
          {axes.x || "axis X"}
        </Text>
      </Billboard>
      <Billboard position={[0, end + 0.3, 0]}>
        <Text fontSize={0.5} color="#22c55e" anchorX="center">
          {axes.y || "axis Y"}
        </Text>
      </Billboard>
      <Billboard position={[0, 0, end + 0.3]}>
        <Text fontSize={0.5} color="#3b82f6" anchorX="center">
          {axes.z || "axis Z"}
        </Text>
      </Billboard>
    </>
  );
}

function WordPoint({
  point,
  emphasized,
  dimmed,
}: {
  point: WordVector;
  emphasized: boolean;
  dimmed: boolean;
}) {
  const pos = toScene(point);
  const size = emphasized ? 0.28 : 0.2;
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={point.color}
          emissive={point.color}
          emissiveIntensity={emphasized ? 0.9 : 0.35}
          transparent
          opacity={dimmed ? 0.2 : 1}
        />
      </mesh>
      <Billboard position={[0, size + 0.25, 0]}>
        <Text
          fontSize={emphasized ? 0.42 : 0.34}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.02}
          outlineColor="#000000"
          fillOpacity={dimmed ? 0.25 : 1}
        >
          {point.word}
        </Text>
      </Billboard>
    </group>
  );
}

export default function Scene({
  points,
  axes,
  highlighted,
  similarityPair,
  analogy,
}: SceneProps) {
  const hasFocus = highlighted.size > 0;

  const lines = useMemo(() => {
    const out: { key: string; pts: [number, number, number][]; color: string; dashed?: boolean }[] = [];
    if (similarityPair) {
      const [a, b] = similarityPair;
      if (points[a] && points[b]) {
        out.push({
          key: "sim",
          pts: [toScene(points[a]), toScene(points[b])],
          color: "#fbbf24",
        });
      }
    }
    if (analogy) {
      const { a, b, c, result } = analogy;
      if (points[a] && points[b]) {
        out.push({
          key: "ab",
          pts: [toScene(points[a]), toScene(points[b])],
          color: "#a855f7",
        });
      }
      if (points[c]) {
        out.push({
          key: "cr",
          pts: [toScene(points[c]), toScene(result)],
          color: "#f472b6",
          dashed: true,
        });
      }
    }
    return out;
  }, [points, similarityPair, analogy]);

  return (
    <Canvas camera={{ position: [9, 7, 12], fov: 50 }} dpr={[1, 2]}>
      <color attach="background" args={["#05070d"]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={80} />
      <pointLight position={[-10, -5, -10]} intensity={40} color="#3b82f6" />

      <Grid
        args={[SCALE * 2.5, SCALE * 2.5]}
        position={[0, -SCALE - 1.2, 0]}
        cellColor="#1e293b"
        sectionColor="#334155"
        fadeDistance={40}
        infiniteGrid
      />

      <AxisLabels axes={axes} />

      {points.map((p, i) => (
        <WordPoint
          key={`${p.word}-${i}`}
          point={p}
          emphasized={highlighted.has(i)}
          dimmed={hasFocus && !highlighted.has(i)}
        />
      ))}

      {lines.map((l) => (
        <Line
          key={l.key}
          points={l.pts}
          color={l.color}
          lineWidth={2.5}
          dashed={l.dashed}
          dashSize={0.3}
          gapSize={0.2}
        />
      ))}

      {analogy && (
        <mesh position={toScene(analogy.result)}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#f472b6"
            emissiveIntensity={1}
            wireframe
          />
        </mesh>
      )}

      <OrbitControls enableDamping makeDefault />
    </Canvas>
  );
}
