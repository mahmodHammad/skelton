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
let renderedItems = {};

function getItemPosition(item) {
  const rootRangePosition = getAbsolutePosition(loadedModel);

  const itemPosition = getExactPosition(
    rootRangePosition,
    item.shift,
    item.direction
  );
  return itemPosition;
}

function clearItems() {
  if (renderedItems.box !== undefined) {
    const { box, line, text, item } = renderedItems;
    scene.remove(box);
    scene.remove(text);
    scene.remove(line);
    const index = skelton.findIndex((s) => s.id === item.id);
    skelton[index].active = false;
  }
}

function renderItem(item) {
  if (loadedModel !== undefined) {
    const itemPosition = getItemPosition(item);
    const helperPosition = itemPosition.helperPosition;

    clearItems();
    renderedItems.item = item;
    renderedItems.box = putBox(itemPosition.exactPosition);
    renderedItems.line = putLine(itemPosition.exactPosition, helperPosition);
    renderedItems.text = createPoles(
      item.label,
      helperPosition.x,
      helperPosition.y,
      helperPosition.z
    );
    renderedItems.text.lookAt(camera.position)
  } else {
    console.log("ERRRRRRRROR, MODEL NOT LOADED YET");
  }
}

function createModel() {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    loadedModel = gltf;

    controls.addEventListener("change", (e) => {
      if (renderedItems.text !== undefined) {
        const cameraPosition = e.target.object.position;
        updatePlanes(cameraPosition, renderedItems.text);
      }
    });
    render();
  });
}
function handleItemClick(item) {
  const targetID = item.target.id;
  const target = skelton.find((s) => s.id === targetID);
  if (!target.active) {
    renderItem(target);
    target.active = true;
    // console.log(target);
  }
}

export { createModel, handleItemClick };
