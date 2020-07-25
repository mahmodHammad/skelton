import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, render, camera, controls } from "./setup.js";
import filepath from "../model/boy.glb";
import * as THREE from "three";
import { createPoles } from "./TextDisplayer";

let allPlanes = [];
let text = createPoles("chest");
text.translateX(2);
text.translateY(7);
text.translateZ(4);

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
  const hips = root.children[2];
  console.log("hips", hips);
  const spine = hips.children[0].children[0];
  const neck = spine.children[0];
  const head = neck.children[0];

  const shoulderL = spine.children[1];
  const armL = shoulderL.children[0];
  const sarmL = armL.children[0];
  const hand = sarmL.children[0];
  const middleFinger = hand.children[1];

  const shoulderR = spine.children[2];

  const legL = hips.children[1];
  const shinL = legL.children[0];
  const feetL = shinL.children[0];
  const legR = hips.children[2];
  console.log(feetL, "FFFFFFFFf");

  //   const body = root.children[1];

  // scene.add(new THREE.BoxHelper(root, 0xffffff));
  // scene.add(new THREE.BoxHelper(body, 0x00ff00));
  // scene.add(new THREE.BoxHelper(shoulderL, 0x00ffff));
  // scene.add(new THREE.BoxHelper(shoulderR, 0xff00ff));
  //   scene.add(new THREE.BoxHelper(hips, 0xaa5ff));
  //   scene.add(new THREE.BoxHelper(feetL, 0xffff00));
  //   scene.add(new THREE.BoxHelper(spine, 0xffff00));
  //   scene.add(new THREE.BoxHelper(neck, 0xff0000));
  // scene.add(new THREE.BoxHelper(head, 0xff0000));
  // scene.add(new THREE.BoxHelper(middleFinger, 0xffffff));
  // scene.add(new THREE.BoxHelper(hand, 0xffff00));
  ///////////////////////////////////////////////////////////////// Upper body

  return {
    root,
    head,
  };
}

function getAbsolutePosition(obj) {
  const box = new THREE.Box3();
  return box.setFromObject(obj);
}
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

  const points = [start, text.position];

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

// function smoothControl (){

//   var qa = camera.quaternion; // src quaternion
//   var qb = new THREE.Quaternion().setFromEuler(dstrot); // dst quaternion
//   var qm = new THREE.Quaternion();
//   camera.quaternion = qm;

//   var o = {t: 0.5};
//   THREE.Quaternion.slerp(qa, qb, qm, o.t);
//     camera.quaternion.set(qm.x, qm.y, qm.z, qm.w);
// }

function updatePlanes(direction) {
  text.lookAt(direction);
  // allPlanes.forEach((p)=>{
  //   p.lookAt(direction)
  //   // p.position(p.oldposition.x, p.oldposition.y, p.oldposition.z);

  // })
  render();
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

// function castShadow(gltf) {
//   gltf.scene.traverse(function (node) {
//     if (node.isMesh) {
//       node.castShadow = true;
//     }
//     scene.add(gltf.scene);
//     render();
//   });
// }

export {
  extractBones,
  loadModel,
  getAbsolutePosition,
  putSphere,
  putBox,
  putLine,
  getMidPosition,
  getExactPosition,
  updatePlanes,
};
