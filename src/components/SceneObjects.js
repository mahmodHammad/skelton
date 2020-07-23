import * as THREE from "three";
import { scene } from "./setup";
import {createModel}from "./Model"

let cube;
const addCustomSceneObjects = () => {
  const lights = [];
  lights[0] = new THREE.PointLight(0xffaa00, 1, 0);
  lights[1] = new THREE.PointLight(0xff0000, 2, 0);
  lights[2] = new THREE.PointLight(0x00ff00, 2, 0);
  lights[3] = new THREE.PointLight(0xffffcc, 1, 0);

  lights[0].position.set(0, 100, 0);
  lights[1].position.set(0, 0, -160);
  lights[2].position.set(0, 0, 160);
  lights[3].position.set(10, -100, 10);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  scene.add(lights[3]);

  var light = new THREE.AmbientLight(0x333333); // soft white light
  scene.add(light);
  createModel()
};

export { addCustomSceneObjects, cube };
