import * as THREE from "three";
import { scene } from "./setup";
import {createModel}from "./Model"

let cube;
const addCustomSceneObjects = () => {
  const lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  var light = new THREE.AmbientLight(0xaaaaaa); // soft white light
  scene.add(light);
  createModel()
};

export { addCustomSceneObjects, cube };
