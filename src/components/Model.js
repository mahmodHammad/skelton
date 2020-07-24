import { scene, render } from "./setup.js";
import {
  extractBones,
  loadModel,
  getAbsolutePosition,
  putSphere,
  putBox,
  getExactPosition
} from "./ModelLoader";

function createModel(shift = 0) {
  loadModel().then((gltf) => {
    // gltf.scene.scale.set(0.5,0.5,0.5)
    scene.add(gltf.scene);
    console.log(gltf);
    const { root, head } = extractBones(gltf);
    const rootRangePosition = getAbsolutePosition(root);
    const headRangePosition = getAbsolutePosition(head);
    const chestpos = getExactPosition(rootRangePosition ,{x:0,y:1.4,z:0.4});
    const headPos = getExactPosition(headRangePosition,{x:0,y:0.3,z:0.1});
    const BackPos = getExactPosition(rootRangePosition,{x:0,y:1,z:-0.45});
    const leftArm = getExactPosition(rootRangePosition,{x:1,y:0.5,z:-0.12});
    const rightArm = getExactPosition(rootRangePosition,{x:-1,y:0.5,z:-0.12});
    
    console.log(headPos, "headPos");
    putBox(headPos);
    putBox(chestpos);
    putBox(BackPos);
    putBox(leftArm);
    putBox(rightArm);
    
    render();
  });
  // castShadow(gltf);
}

export { createModel };
