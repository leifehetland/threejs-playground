import './style.css';

import * as THREE from 'three';

// import OrbitControls Class
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1. Scene - like a container
const scene = new THREE.Scene();

// 2. Camera - camera similar to what the human eyeballs would see
	// camera takes in 3 args: Field of view (out of 360deg), aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1);

// 3. Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

// adding Geometry
const ring = new THREE.RingGeometry( 1, 5, 32 );

// adding a material- like wrapping paper for our objs
// custom shaders can be written in WebGL
const material = new THREE.MeshStandardMaterial( { color: 'hotpink', side: THREE.DoubleSide } );

// Creating a mesh to combine the geometry and the material
const mesh = new THREE.Mesh( ring, material );
scene.add( mesh );

// Point light with position
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

// Ambient/ flood light
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Light Helper
const lightHelper = new THREE.PointLightHelper(pointLight);

// Grid Helper
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

// Added orbit controls to allow click and drag movement of camera and zoom
const controls = new OrbitControls(camera, renderer.domElement)

// Recursive function that gives us an infinite loop- similar to a game loop
function animate() {
	requestAnimationFrame( animate );

	// rotate methods available on a RingGeometry
	ring.rotateX(0.007)
	ring.rotateY(0.01);
	ring.rotateZ(0.003);

	controls.update();

	renderer.render( scene, camera );	
}

animate();

