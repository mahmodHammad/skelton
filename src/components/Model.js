import { scene, render } from "./setup.js";
import {
  extractBones,
  loadModel,
  castShadow,
  getAbsolutePosition,
  putSphere,
  putBox,
  getMidPosition,
} from "./ModelLoader";

function createModel(shift = 0) {
  loadModel().then((gltf) => {
    // gltf.scene.scale.set(0.5,0.5,0.5)
    scene.add(gltf.scene);
    console.log(gltf);
    const { root, head } = extractBones(gltf);
    const rootPosition = getAbsolutePosition(root);
    const headPosition = getAbsolutePosition(head);
    console.log("headPosition", headPosition);
    console.log("rootPosition", rootPosition);
   const rootMidPos = getMidPosition(rootPosition.min, rootPosition.max);
    // putSphere(rootPosition)
    const testPos = { x: 1, y: 4, z: 0 };
    putBox(rootMidPos);
    render();
  });
  // castShadow(gltf);
}

export { createModel };
