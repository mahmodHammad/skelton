import { scene, render, camera, controls } from "./setup.js";
import { putBox, putLine } from "./SceneObjects";
import skelton from "../variables/skelton.js";
import { createPoles } from "./TextDisplayer";

import {
  loadModel,
  getAbsolutePosition,
  getExactPosition,
  updatePlanes,
} from "./ModelLoader";

let loadedModel = undefined;

function getItemPosition(item) {
  const rootRangePosition = getAbsolutePosition(loadedModel);

  const itemPosition = getExactPosition(
    rootRangePosition,
    item.shift,
    item.direction
  );
  return itemPosition;
}

function renderItem(item) {
  if (loadedModel !== undefined) {
    const itemPosition = getItemPosition(item);
    const helperPosition = itemPosition.helperPosition;
    putBox(itemPosition.exactPosition);
    putLine(itemPosition.exactPosition, helperPosition);
    createPoles(
      item.label,
      helperPosition.x,
      helperPosition.y,
      helperPosition.z
    );
  } else {
    console.log("ERRRRRRRROR, MODEL NOT LOADED YET");
  }
}

function createModel() {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    loadedModel = gltf;

    controls.addEventListener("change", (e) => {
      const cameraPosition = e.target.object.position;
      updatePlanes(cameraPosition);
    });
    render();
  });
}
function handleItemClick(item) {
  const targetID = item.target.id;
  const target = skelton.filter((s) => s.id === targetID)[0]
  renderItem(target);
  console.log("item", item.target.id);
}

export { createModel, handleItemClick };
