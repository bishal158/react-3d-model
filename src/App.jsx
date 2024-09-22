import { Canvas } from '@react-three/fiber';
import './App.css';
import {
    ContactShadows,
    Environment,
    PresentationControls,
    Stage,
    useGLTF,
    useTexture
} from "@react-three/drei";
import { useState } from 'react';

function Model(props) {
    const { scene } = useGLTF('/aventador/scene.gltf'); // Correct path for public folder

    // Load the texture
    const texture = useTexture('/aventador/textures/Material_001_baseColor.png'); // Correct path

    // Traverse the scene and apply the texture and color
    scene.traverse((object) => {
        if (object.isMesh) {

            object.material.color.set(props.color); // Set color from props
            object.material.needsUpdate = true; // Update the material
        }
    });

    return <primitive object={scene} {...props} />;
}
function App() {
    const [color, setColor] = useState('#ffffff'); // Default color white

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div className="App">
            <div className="layout">
                {/* Left Side: 3D Model */}
                <div className="model-container">
                    <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}
                            camera={{ position: [0, 0, 15], fov: 25 }} className="canvas">
                        <color attach="background" args={['#15151a']} />

                        {/* Adding Lights */}
                        <hemisphereLight intensity={0.5} />
                        <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={15} blur={0.5} opacity={1} far={20} />
                        <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
                            <ringGeometry args={[0.9, 1, 4, 1]} />
                            <meshStandardMaterial color="white" roughness={0.75} />
                        </mesh>

                        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                            <Stage environment={null}>
                                <Model scale={0.01} color={color} />
                            </Stage>
                        </PresentationControls>

                    </Canvas>
                </div>

                {/* Right Side: Color Configurator */}
                <div className="configurator">
                    <h2>Color Configurator</h2>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                        style={{ width: '100px', height: '50px', cursor: 'pointer' }}
                    />
                    <p>Selected Color: {color}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
