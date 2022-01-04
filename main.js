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
const ring = new THREE.RingGeometry( 7, 15, 1 );

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

// create and add a "star" function
function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 50, 50);
	const material = new THREE.MeshStandardMaterial({ color: 0xFF10F0 })

	const star = new THREE.Mesh( geometry, material );

	// Destructure an array of 3 random values for x, y, and z coordinates 
	// using Three js MathUtils and randFloatSpread helper method- returns a number between negative and positive the number passed in
	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

	star.position.set(x,y,z);

	scene.add(star);
}

// Creates 200 hundred randomly placed stars
Array(500).fill().forEach(addStar);

// adding a custom background texture
// can also pass a callback function in here while the image is loading
const bgTexture = new THREE.TextureLoader().load('wire-sky.jpg');
scene.background = bgTexture;

// Avatar
const glitchyTexture = new THREE.TextureLoader().load('glitched_bunisher.jpg');

const glitchy = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshBasicMaterial( { map: glitchyTexture } )
)


scene.add(glitchy);

// Moon
const moonTexture = new THREE.TextureLoader().load('pattern.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshBasicMaterial( { 
		map: moonTexture,
		normalMap: normalTexture
	 } )
)


scene.add(moon);


// Recursive function that gives us an infinite loop- similar to a game loop
function animate() {
	requestAnimationFrame( animate );

	// rotate methods available on a RingGeometry
	ring.rotateX(0.007)
	ring.rotateY(0.01);
	ring.rotateZ(0.01);

	moon.rotateX(-0.02)
	moon.rotateY( -0.01);
	moon.rotateZ( -0.01);

	controls.update();

	renderer.render( scene, camera );	
}

animate();

