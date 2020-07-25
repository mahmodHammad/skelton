import * as THREE from "three";
import { scene, render } from "./setup";
import fonter from "three/examples/fonts/gentilis_regular.typeface.json";
console.log(fonter, "XXXXX");
const fontLoader = new THREE.FontLoader();

var textMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xd4af37,
});

const loadedfont = fontLoader.parse(fonter);

function createPoles(name, x, y, z) {
  const fontAttributes = {
    font: loadedfont,
    size: 1,
    height: 0,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  const geometry = new THREE.TextGeometry("Chest", fontAttributes);
  const pole = new THREE.Mesh(geometry, textMaterial);
  pole.translateX(0 );
  pole.translateY( 0);
  pole.translateZ( 0 );
  // pole.rotateX(1.5 * Math.PI);
  // pole.rotateZ(Math.PI);
  scene.add(pole);
  render();
  return pole;
}

export { createPoles };
