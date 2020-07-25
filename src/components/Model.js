import { scene, render, camera, controls } from "./setup.js";
import { putBox, putLine } from "./SceneObjects";

import {
  extractBones,
  loadModel,
  getAbsolutePosition,
  getExactPosition,
  updatePlanes,
} from "./ModelLoader";

function createModel() {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    const { root } = extractBones(gltf);
    const rootRangePosition = getAbsolutePosition(root);

    const headPos = getExactPosition(
      rootRangePosition,
      { x: 0, y: 2.8, z: 0.5 },
      { x: 0, y: 0, z: 1 }
    );

    // const chestpos = getExactPosition(
    //   rootRangePosition,
    //   { x: 0, y: 1.4, z: 0.4 },
    //   { x: 0, y: 0, z: 1 }
    // );
    // const BackPos = getExactPosition(
    //   rootRangePosition,
    //   { x: 0, y: 1, z: -0.45 },
    //   { x: 0, y: 0, z: -1 }
    // );
    // const leftArm = getExactPosition(
    //   rootRangePosition,
    //   { x: 1, y: 0.5, z: -0.12 },
    //   { x: 1, y: 0, z: 0 }
    // );
    // const rightArm = getExactPosition(
    //   rootRangePosition,
    //   { x: -1, y: 0.5, z: -0.12 },
    //   { x: -1, y: 0, z: 0 }
    // );
    
    putBox(headPos.exactPosition);
    putLine(headPos.exactPosition, headPos.helperPosition);

    controls.addEventListener("change", (e) => {
      const cameraPosition = e.target.object.position;
      updatePlanes(cameraPosition);
    });
    render();
  });
}

export { createModel };
