import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xffffff );

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#3F7DF4',
    roughness: 0.5
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 2;
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
renderer.setClearColor( 0x000000, 1 );
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;

// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width, sizes.height)
});

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop();
