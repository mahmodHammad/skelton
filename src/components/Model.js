import { scene, render } from "./setup.js";
import { extractBones, loadModel, castShadow } from "./ModelLoader";


function createModel(shift = 0) {
  loadModel().then((gltf) => {
    // gltf.scene.scale.set(0.03,0.03,0.03)
    scene.add(gltf.scene);
    console.log(gltf)
    extractBones(gltf)
    render();

  });
  // castShadow(gltf);
}

export { createModel };
