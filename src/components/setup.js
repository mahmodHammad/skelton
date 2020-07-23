import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats-js";
const stats = new Stats();

let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // fov = field of view
  width / height, // aspect ratio
  0.1, // near plane
  1000 // far plane
);

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const sceneSetup = () => {
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);
  // setup stats
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
};

function render() {
  renderer.render(scene, camera);
}

export { sceneSetup, scene, controls, render, camera ,stats};
