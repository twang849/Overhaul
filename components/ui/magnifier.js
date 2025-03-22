// magnifier.js

const SCALE = 1.3; // magnification
const SIZE = 150; // diameter
const LENSE_OFFSET_X = SIZE / 10.2;
const LENSE_OFFSET_Y = SIZE / 10.2;

export let handle;
export let magnifyingGlass;

export function enableMagnifier() {
  // Set the default scale and size on document root
  document.documentElement.style.setProperty("--scale", SCALE);
  document.documentElement.style.setProperty("--size", SIZE + "px");

  // Create magnifying glass (lense)
  handle = document.createElement("div");
  handle.classList.add("handle");

  magnifyingGlass = document.createElement("div");
  magnifyingGlass.classList.add("magnifying-glass");
  magnifyingGlass.style.top = LENSE_OFFSET_Y + "px";
  magnifyingGlass.style.left = LENSE_OFFSET_X + "px";

  handle.append(magnifyingGlass);
  
  const bodyClone = document.body.cloneNode(true);
  bodyClone.classList.add("body-clone");
  bodyClone.style.top = "0px";
  bodyClone.style.left = "0px";
  magnifyingGlass.append(bodyClone);
  document.body.append(handle);

  document.addEventListener("pointermove", moveMagnifyingGlass);
  magnifyingGlass.addEventListener("dblclick", removeMagnifyingGlass);
}

export function disableMagnifier() {
  if (magnifyingGlass) {
    magnifyingGlass.children[0]?.remove();
    handle?.remove();
    document.removeEventListener("pointermove", moveMagnifyingGlass);
  }
}

const moveMagnifyingGlass = (event) => {
  let pointerX = event.pageX;
  let pointerY = event.pageY;
  
  // Move magnifying glass with cursor
  handle.style.left = pointerX - SIZE / 1.7 + "px";
  handle.style.top = pointerY - SIZE / 1.7 + "px";
  
  if (magnifyingGlass.children[0]) {
    // Align magnified document
    let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
    let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
    magnifyingGlass.children[0].style.left = offsetX + "px";
    magnifyingGlass.children[0].style.top = offsetY + "px";
  }
};

const removeMagnifyingGlass = () => {
  if (magnifyingGlass) {
    magnifyingGlass.children[0]?.remove();
    handle?.remove();
  }
};
