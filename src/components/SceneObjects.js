import * as THREE from "three";
import { scene } from "./setup";
import { createModel } from "./Model";

let cube;
function addLights(){
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
  addLights()
  createModel();
};

function putSphere(position) {
  const geometry = new THREE.SphereGeometry(
    3.3,
    32,
    1,
    undefined,
    undefined,
    undefined,
    Math.PI / 2
  );
  const material = new THREE.MeshBasicMaterial({ color: 0x551111 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}

function putLine(start, end, color) {
  const points = [start, end];

  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

function putBox(position) {
  var geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const { x, y, z } = position;
  geometry.translate(x, y, z);
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

export { addCustomSceneObjects, cube, putLine, putBox, putSphere };
