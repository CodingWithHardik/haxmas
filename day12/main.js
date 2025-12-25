import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const texture = new THREE.TextureLoader().load('/red.png')
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const donut_geo = new THREE.TorusGeometry(10, 2, 16, 100);
const texture1 = new THREE.TextureLoader().load('/leaves.png')
const donut_tex = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture1 });
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);

function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

camera.position.setZ(75);

Array(200).fill().forEach(add_star);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  renderer.render(scene, camera);
}