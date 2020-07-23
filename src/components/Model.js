import { scene, render } from "./setup.js";
import { extractBones, loadModel, castShadow } from "./ModelLoader";


function createModel(shift = 0) {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    console.log(gltf)
      
    render();

  });
  // castShadow(gltf);
}

export { createModel };
