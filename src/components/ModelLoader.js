import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, render } from "./setup.js";
import filepath from "../model/boy.glb";
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
    const root = gltf.scene.children[0];
    const body = root.children[0];
    const hips = root.children[2]
    console.log("hips",hips)
  const spine = hips.children[0].children[0]
  const neck = spine.children[0]
  const head = neck.children[0]

  const shoulderL = spine.children[1]
  const armL = shoulderL.children[0]
  const sarmL = armL.children[0]
  const hand = sarmL.children[0]
  const middleFinger = hand.children[1]

  const shoulderR= spine.children[2]

  const legL = hips.children[1]
  const shinL = legL.children[0]
  const feetL = shinL.children[0]
  const legR = hips.children[2]
  console.log(feetL,"FFFFFFFFf")



//   const body = root.children[1];

  scene.add(new THREE.BoxHelper(root, 0x00ffff));
  scene.add(new THREE.BoxHelper(body, 0x00ff00));
  scene.add(new THREE.BoxHelper(shoulderL, 0x00ffff));
  scene.add(new THREE.BoxHelper(shoulderR, 0xff00ff));
//   scene.add(new THREE.BoxHelper(hips, 0xaa5ff));
//   scene.add(new THREE.BoxHelper(feetL, 0xffff00));
//   scene.add(new THREE.BoxHelper(spine, 0xffff00));
//   scene.add(new THREE.BoxHelper(neck, 0xff0000));
  scene.add(new THREE.BoxHelper(head, 0xffff00));
  scene.add(new THREE.BoxHelper(middleFinger, 0xffffff));
  scene.add(new THREE.BoxHelper(hand, 0xffff00));
  

  const box = new THREE.Box3();
  box.setFromObject(root);
  console.log("BBOOXX", box);

  const headPos = new THREE.Box3();
  headPos.setFromObject(head);
  console.log("head", headPos);




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
