import * as THREE from "three";
import { scene } from "./setup";
import { createModel } from "./Model";

let cube;
function addLights() {
  const lights = [];
  lights[0] = new THREE.PointLight(0x88ffff, 1, 0);
  lights[1] = new THREE.PointLight(0x88ffff, 2, 0);
  lights[2] = new THREE.PointLight(0x88ffff, 2, 0);
  lights[3] = new THREE.PointLight(0x88ffff, 1, 0);

  lights[0].position.set(0, 100, 0);
  lights[1].position.set(0, 0, -160);
  lights[2].position.set(0, 0, 160);
  lights[3].position.set(10, -100, 10);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  scene.add(lights[3]);

  const light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);
}

const addCustomSceneObjects = () => {
  addLights();
  createModel();
};

function putSphere(position) {
  const geometry = new THREE.SphereGeometry(0.07, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const { x, y, z } = position;
  geometry.translate(x, y, z);
  const shpere = new THREE.Mesh(geometry, material);
  scene.add(shpere);
  return shpere;
}

function putLine(start, end, color) {
  const points = [start, end];

  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  return line;
}

function putBox(position) {
  const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x400d0d });
  const { x, y, z } = position;
  geometry.translate(x, y, z);
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube;
}

export { addCustomSceneObjects, cube, putLine, putBox, putSphere };
