import { scene, render,camera,controls } from "./setup.js";
import * as THREE from "three";

import {
  extractBones,
  loadModel,
  getAbsolutePosition,
  putSphere,
  putBox,
  putLine,
  getExactPosition,
} from "./ModelLoader";

function createModel(shift = 0) {
  loadModel().then((gltf) => {
    // gltf.scene.scale.set(0.5,0.5,0.5)
    scene.add(gltf.scene);
    console.log(gltf);
    const { root, head } = extractBones(gltf);
    const rootRangePosition = getAbsolutePosition(root);
    const headRangePosition = getAbsolutePosition(head);
    const chestpos = getExactPosition(
      rootRangePosition,
      { x: 0, y: 1.4, z: 0.4 },
      { x: 0, y: 0, z: 1 }
    );
    const headPos = getExactPosition(
      headRangePosition,
      { x: 0, y: 0.3, z: 0.1 },
      { x: 0, y: 0, z: 1 }
    );
    const BackPos = getExactPosition(
      rootRangePosition,
      { x: 0, y: 1, z: -0.45 },
      { x: 0, y: 0, z: -1 }
    );
    const leftArm = getExactPosition(
      rootRangePosition,
      { x: 1, y: 0.5, z: -0.12 },
      { x: 1, y: 0, z: 0 }
    );
    const rightArm = getExactPosition(
      rootRangePosition,
      { x: -1, y: 0.5, z: -0.12 },
      { x: -1, y: 0, z: 0 }
    );

    console.log(headPos, "headPos");
    putBox(headPos.exactPosition);
    putBox(chestpos.exactPosition);
    putBox(BackPos.exactPosition);
    putBox(leftArm.exactPosition);
    putBox(rightArm.exactPosition);

    putBox(headPos.helperPosition);
    putBox(chestpos.helperPosition);
    putBox(BackPos.helperPosition);
    putBox(leftArm.helperPosition);
    putBox(rightArm.helperPosition);

    putLine(headPos.exactPosition , headPos.helperPosition)
    putLine(chestpos.exactPosition , chestpos.helperPosition)
    putLine(leftArm.exactPosition , leftArm.helperPosition)
    putLine(rightArm.exactPosition , rightArm.helperPosition)
    putLine(BackPos.exactPosition , BackPos.helperPosition)
    // camera.lookAt(rightArm.helperPosition)
    
    // camera.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI)

// controls.target(BackPos.helperPosition)

// camera.traverse(rightArm.helperPosition.x , rightArm.helperPosition.y,rightArm.helperPosition.z)
      // camera.translateOnAxis(chestpos.helperPosition)
      // camera.translateX(rightArm.helperPosition.x)
      // camera.translateY(rightArm.helperPosition.y)
      // camera.translateZ(rightArm.helperPosition.x)
      // controls.autoRotate=true
      // controls.dampingFactor=0.5
      // controls.enableDamping=true
      // controls.enableKeys=true
      // controls.target=rightArm.helperPosition

    render();
  });
  // castShadow(gltf);
}

export { createModel };
