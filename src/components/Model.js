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
   const rootMidPos = getMidPosition(rootPosition);
   const headMidPos = getMidPosition(headPosition);
console.log(headMidPos,"headMidPos")
    putBox(rootMidPos.virtual);
    render();
  });
  // castShadow(gltf);
}

export { createModel };















