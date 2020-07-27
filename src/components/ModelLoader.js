import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { render } from "./setup.js";
import filepath from "../model/boy.glb";
import * as THREE from "three";

var modelLoader = new GLTFLoader();
function loadModel() {
  return new Promise((resolve, reject) => {
    modelLoader.load(
      filepath,
      function (gltf) {
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
  // const body = root.children[0];
  // const hips = root.children[2];
  // const spine = hips.children[0].children[0];
  // const neck = spine.children[0];
  // const head = neck.children[0];

  // const shoulderL = spine.children[1];
  // const armL = shoulderL.children[0];
  // const sarmL = armL.children[0];
  // const hand = sarmL.children[0];
  // const middleFinger = hand.children[1];

  // const shoulderR = spine.children[2];

  // const legL = hips.children[1];
  // const shinL = legL.children[0];
  // const feetL = shinL.children[0];
  // const legR = hips.children[2];

  return {
    root,
  };
}

function getAbsolutePosition(gltf) {
  const { root } = extractBones(gltf);

  const box = new THREE.Box3();
  return box.setFromObject(root);
}

function midPoint(min, max) {
  return (max + min) / 2;
}

function getMidPosition(Position) {
  const { min, max } = Position;
  const x = midPoint(min.x, max.x);
  const y = midPoint(min.y, max.y);
  const z = midPoint(min.z, max.z);
  return new THREE.Vector3(x, y, z);
}

function getExactPosition(Position, shift, direction) {
  const point = getMidPosition(Position);
  let shiftVec = new THREE.Vector3(shift.x, shift.y, shift.z);
  let directionVec = new THREE.Vector3(direction.x, direction.y, direction.z);

  let exactPosition = new THREE.Vector3().addVectors(point, shiftVec);
  let helperPosition = new THREE.Vector3().addVectors(
    exactPosition,
    directionVec
  );
  return { exactPosition, helperPosition, direction };
}

function updatePlanes(target, item) {
  item.lookAt(target);
  render();
}

export {
  extractBones,
  loadModel,
  getAbsolutePosition,
  getMidPosition,
  getExactPosition,
  updatePlanes,
};
