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

renderer.render(scene,camera)