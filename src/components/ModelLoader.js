import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, render } from "./setup.js";
import filepath from "../model/dog.glb";
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
  const root =
    gltf.scene.children[0].children[0]
    const foot1 = root.children[0]
    const body = root.children[1]
    const foot2 = root.children[2]
    const foot3 = root.children[3]
    const foot4 = root.children[4]
    console.log(root)
    console.log(foot1)
    console.log(foot2)
    console.log(foot3)
    console.log(foot4)
    console.log(body)

    scene.add( new THREE.BoxHelper( foot1, 0x00ffff ) );
    scene.add( new THREE.BoxHelper( foot2, 0x00ff00 ) );
    scene.add( new THREE.BoxHelper( foot3, 0x0000ff ) );
    scene.add( new THREE.BoxHelper( foot4, 0xff00ff ) );
    scene.add( new THREE.BoxHelper( body, 0xffff00 ) );
    const box = new THREE.Box3;
    box.setFromObject(body);
    console.log("BBOOXX",box)

  ///////////////////////////////////////////////////////////////// Upper body


  return {
    body,
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
