import { scene, render, camera, controls } from "./setup.js";
import { putBox, putLine, putSphere } from "./SceneObjects";
import skelton from "../variables/skelton.js";
import { createPoles } from "./TextDisplayer";
import TWEEN from "@tweenjs/tween.js";

import {
  loadModel,
  getAbsolutePosition,
  getExactPosition,
  updatePlanes,
} from "./ModelLoader";

function animateCamera(target) {
  let initPosition = camera.position;
  // let ttarget = {x:0 , y:6, z:13}
  const tween = new TWEEN.Tween(camera.position).to(target, 1500);
  tween.onUpdate(() => {
    camera.position.set(initPosition.x, initPosition.y, initPosition.z);
  });
  // tween.delay(500)
  tween.easing(TWEEN.Easing.Quartic.InOut);
  tween.start();
}

let loadedModel = undefined;
let renderedItems = {};

function createModel() {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    loadedModel = gltf;
    animateCamera({ x: 0, y: 5, z: 15 });
    putBox({ x: 0, y: 3, z: 0.2 });
    controls.addEventListener("change", (e) => {
      if (renderedItems.text !== undefined) {
        const cameraPosition = e.target.object.position;
        updatePlanes(cameraPosition, renderedItems.text);
      }
    });
    render();
  });
}

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
    renderedItems.box = putSphere(itemPosition.exactPosition);
    renderedItems.line = putLine(itemPosition.exactPosition, helperPosition);
    renderedItems.text = createPoles(
      item.label,
      helperPosition.x,
      helperPosition.y,
      helperPosition.z
    );
    renderedItems.text.lookAt(camera.position);
  } else {
    console.log("ERRRRRRRROR, MODEL NOT LOADED YET");
  }
}

function handleItemClick(target) {
  if (!target.active) {
    renderItem(target);
    target.active = true;
    animateCamera(target.camera);
  }
}

export { createModel, handleItemClick };
