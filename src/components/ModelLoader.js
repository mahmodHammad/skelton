import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, render } from "./setup.js";
import filepath from "../model/turtle.glb";
import * as THREE from "three";

console.log(filepath);
var modelLoader = new GLTFLoader();
function loadModel() {
  return new Promise((resolve, reject) => {
    modelLoader.load(
      filepath,
      function (gltf) {
        console.log("LOAAADED");
        resolve(gltf);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}

function extractBones(gltf) {
  const root = gltf.scene.children[2];
  const shell = root.children[0];
  console.log(gltf.scene.children[2])

  const armL = shell.children[0];
  const thighL = shell.children[1];
  const neck1 = shell.children[2];
  const neck2 = neck1.children[0];
  const neck3 = neck2.children[0];
  const head = neck3.children[0];
  const armR = shell.children[3];
  const thighR = shell.children[0];


  const body = root.children[1];

  scene.add(new THREE.BoxHelper(head, 0x00ffff));
  scene.add(new THREE.BoxHelper(neck1, 0x00ff00));
  scene.add(new THREE.BoxHelper(shell, 0x00ffff));
  scene.add(new THREE.BoxHelper(armR, 0xff00ff));
  scene.add(new THREE.BoxHelper(shell, 0xaa5ff));
  scene.add(new THREE.BoxHelper(body, 0xffff00));
  const box = new THREE.Box3();
  box.setFromObject(body);
  console.log("BBOOXX", box);

  const headPos = new THREE.Box3();
  box.setFromObject(head);
  console.log("BBO", headPos);




  ///////////////////////////////////////////////////////////////// Upper body

  return {
    
  };
}

function castShadow(gltf) {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
    scene.add(gltf.scene);
    render();
  });
}

export { extractBones, loadModel, castShadow };
