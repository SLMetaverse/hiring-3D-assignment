import "../css/main.css";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, gui, scene, renderer, canvas;

let cameraControls, stats, rooms;

init();
animate();

/**
 * Main Initialization Method
 */
function init() {
  renderInit();
  sceneInit();
  cameraInit();
  statsInit();
  roomInit();
}

/**
 * Initialize the render of the main content or canvas to display the room objects
 */
function renderInit() {
  // main container
  const container = document.getElementById("container");

  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvas = renderer.domElement;
  container.appendChild(canvas);
}

/**
 * Initialize scene for the environment namely color, background, add grid helper for the coordinates etc.
 */
function sceneInit() {
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(223, 227, 229)");
  scene.add(new THREE.AmbientLight("rgb(233, 233, 233)", 1)); //bottom light
  // scene.add(new THREE.GridHelper(50, 50));
}

/**
 * Initialize camera for the environment
 */
function cameraInit() {
  // camera
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(4.5, 28, 2);
  camera.lookAt(scene.position);

  // gui object
  gui = new GUI();

  // camera controls
  cameraControls = new OrbitControls(camera, canvas);
  cameraControls.lookSpeed = 0.05;
  cameraControls.movementSpeed = 1000;

  //camera folder
  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(camera.position, "z", 0, 50);
  cameraFolder.add(camera.position, "x", -1, 50);
  cameraFolder.add(camera.position, "y", 0, 50);
  cameraFolder.open();
}

/**
 * Initialize Panel stats for the environment i.e, frames per second
 */
function statsInit() {
  stats = new Stats();
  container.appendChild(stats.dom);
}

/**
 * Initialize room objects
 */
function roomInit() {
  //size of the 3D Room
  const boxWidth = 4;
  const boxHeight = 3;
  const boxDepth = 5;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const floorTextureMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(223, 227, 229)",
    side: THREE.DoubleSide,
    shininess: 100,
  });

  const wallTextureMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(140, 160, 179)",
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true,
  });

  const wallOpaqueMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  const wallSemiTransparentMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(103, 117, 147)",
    opacity: 0.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  rooms = [
    //1
    createRooms(geometry, 0, 0, 0, [
      wallTextureMaterial,
      wallTextureMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallOpaqueMaterial,
      wallSemiTransparentMaterial,
    ]),
    //2
    createRooms(geometry, 0, 0, -5, [
      wallSemiTransparentMaterial, //top right transparent
      wallSemiTransparentMaterial, //top left transparent
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallSemiTransparentMaterial, //bottom left
      wallTextureMaterial, //top right
    ]),
    //3
    createRooms(geometry, 4, 0, -5, [
      wallTextureMaterial,
      wallSemiTransparentMaterial, //top left transparent
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallTextureMaterial, //bottom left
      wallSemiTransparentMaterial, //top right
    ]),
    //4
    createRooms(geometry, 4, 0, -10, [
      wallTextureMaterial,
      wallTextureMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallSemiTransparentMaterial,
      wallOpaqueMaterial,
    ]),

    //5
    createRooms(geometry, -4, 0, -5, [
      wallSemiTransparentMaterial,
      wallSemiTransparentMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallTextureMaterial,
      wallTextureMaterial,
    ]),

    //6
    createRooms(geometry, -8, 0, -5, [
      wallSemiTransparentMaterial,
      wallSemiTransparentMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallTextureMaterial,
      wallTextureMaterial,
    ]),

    //7
    createRooms(geometry, -12, 0, -5, [
      wallSemiTransparentMaterial,
      wallSemiTransparentMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallTextureMaterial,
      wallTextureMaterial,
    ]),

    //8
    createRooms(geometry, -16, 0, -5, [
      wallSemiTransparentMaterial,
      wallTextureMaterial, //top left
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallTextureMaterial, //bottom left
      wallSemiTransparentMaterial,
    ]),

    //9
    createRooms(geometry, -16, 0, -10, [
      wallTextureMaterial,
      wallTextureMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallSemiTransparentMaterial,
      wallSemiTransparentMaterial,
    ]),
    //10
    createRooms(geometry, -16, 0, -15, [
      wallTextureMaterial,
      wallTextureMaterial,
      wallOpaqueMaterial, //top roof transparent
      floorTextureMaterial,
      wallSemiTransparentMaterial,
      wallOpaqueMaterial,
    ]),
  ];
}

/**
 * On resize update the camera position and set the size of the resized window
 */
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * Animate frames and render the object again on the scene
 */
function animate() {
  requestAnimationFrame(animate);
  cameraControls.update();
  stats.update();
  renderer.render(scene, camera);
}

/**
 * Main function to create the 3D room for the environment or world scene
 * @param {Geometry} geometry
 * @param {X-Axis} x
 * @param {Y-Axis} y
 * @param {Z-Axis} z
 * @param {Stylize the 3D Rooms with material type namely phong, basic etc.} materials
 */
function createRooms(geometry, x, y, z, materials) {
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  cube.position.set(x, y, z);
}
