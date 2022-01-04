import './style.css';

import * as THREE from 'three';

// 1. Scene - like a container
const scene = new THREE.Scene();

// 2. Camera - camera similar to what the human eyeballs would see
	// camera takes in 3 args: Field of view (out of 360deg), aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

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
const material = new THREE.MeshBasicMaterial( { color: 'hotpink', side: THREE.DoubleSide, wireframe: true } );

// Creating a mesh to combine the geometry and the material
const mesh = new THREE.Mesh( ring, material );
scene.add( mesh );

// Recursive function that gives us an infinite loop- similar to a game loop
function animate() {
	requestAnimationFrame( animate );

	// rotate methods available on a RingGeometry
	ring.rotateX(.007)
	ring.rotateY(.01);
	ring.rotateZ(.003);

	renderer.render( scene, camera );	
}

animate();

