import * as THREE from "three";
import { scene, render } from "./setup";
import fonter from "three/examples/fonts/gentilis_regular.typeface.json";

const fontLoader = new THREE.FontLoader();

var textMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xd4af37,
});

const loadedfont = fontLoader.parse(fonter);

function createPoles(name, x, y, z) {
  const fontAttributes = {
    font: loadedfont,
    size: 0.7,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  const geometry = new THREE.TextGeometry(name, fontAttributes);
  const pole = new THREE.Mesh(geometry, textMaterial);
  pole.translateX(x);
  pole.translateY(y);
  pole.translateZ(z);
  scene.add(pole);
  render();
  return pole;
}

export { createPoles };
