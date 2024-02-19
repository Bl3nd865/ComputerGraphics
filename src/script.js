import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import aurora from '/src/img/aurora.avif';
import snowFloor from '/src/img/snow.jpg';
import sandFloor from '/src/img/sand.jpg';
import grassFloor from '/src/img/grass.jpg';
import dirtFloor from '/src/img/dirt3.avif';
import dryGrassFloor from '/src/img/dryGrass.webp';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

camera.position.set(20,15,100);

const pyramidColor = textureLoader.load('src/img/pyramidColor.jpg');
const pyramidGeometry = new THREE.ConeGeometry(5, 6, 4);
const pyramidMaterial = new THREE.MeshBasicMaterial({ map: pyramidColor});
const pyramid = new THREE.Mesh(pyramidGeometry,pyramidMaterial);
pyramid.position.set(34,3,8);
scene.add(pyramid);






// snow island 
textureLoader.load(snowFloor, function(texture) {
  var radius = 15;
  var height = 1;
  var segments = 32;
  var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);
  cylinderGeometry.translate(0, -height / 2, 0);
  var snowIslandMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  var snowIsland = new THREE.Mesh(cylinderGeometry, snowIslandMaterial);
  snowIsland.position.set(0,-1,40);
  snowIsland.rotation.x =  Math.PI;
  scene.add(snowIsland);
});

// sand island
textureLoader.load(sandFloor, function(texture) {
  var radius = 15;
  var height = 1;
  var segments = 32;
  var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);
  cylinderGeometry.translate(0, -height / 2, 0);
  var sandIslandMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  var sandIsland = new THREE.Mesh(cylinderGeometry, sandIslandMaterial);
  sandIsland.position.set(40,-1,0);
  sandIsland.rotation.x =  Math.PI;
  scene.add(sandIsland);
});

// grass island  
textureLoader.load(grassFloor, function(texture) {
  var radius = 15;
  var height = 1;
  var segments = 32;
  var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);
  cylinderGeometry.translate(0, -height / 2, 0);
  var grassIslandMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  var grassIsland = new THREE.Mesh(cylinderGeometry, grassIslandMaterial);
  grassIsland.position.set(40, -1, 40);
  grassIsland.rotation.x =  Math.PI;
  scene.add(grassIsland);
});

// dry Grass island  
textureLoader.load(dryGrassFloor, function(texture) {
  var radius = 15;
  var height = 1;
  var segments = 32;
  var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);
  cylinderGeometry.translate(0, -height / 2, 0);
  var dryGrassIslandMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  var dryGrassIsland = new THREE.Mesh(cylinderGeometry, dryGrassIslandMaterial);
  dryGrassIsland.position.set(0,-1,0);
  dryGrassIsland.rotation.x =  Math.PI;
  scene.add(dryGrassIsland);
});



//dirt island
const dirtIslandGeometry = new THREE.ConeGeometry(15, 8, 20);
textureLoader.load(dirtFloor, function(texture2) {
  const dirtIslandMaterial = new THREE.MeshBasicMaterial({ map: texture2, side: THREE.DoubleSide });
  const dirtIsland = new THREE.Mesh(dirtIslandGeometry, dirtIslandMaterial);
  dirtIsland.rotation.x =  Math.PI;
  
  //  dirt Snow Island
  const dirtSnowIsland = dirtIsland.clone();
  dirtSnowIsland.position.set(0, -5, 0);
  scene.add(dirtSnowIsland);

  //  dirt Grass Island
  const dirtGrassIsland = dirtIsland.clone();
  dirtGrassIsland.position.set(0,-5,40);
  scene.add(dirtGrassIsland);

  // dirt Sand Island
  const dirtSandIsland = dirtIsland.clone();
  dirtSandIsland.position.set(40, -5, 0);
  scene.add(dirtSandIsland);
  
  // dirt Dry-Grass Island
  const dirtDryGrassIsland = dirtIsland.clone();
  dirtDryGrassIsland.position.set(40, -5, 40);
  scene.add(dirtDryGrassIsland);

});



// lights
const ambientLight1 = new THREE.AmbientLight(0x333333);
scene.add(ambientLight1);
ambientLight1.position.set(5,5,5);


const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight1);
directionalLight1.position.set(-30,50,0);

const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight2);
directionalLight2.position.set(5,5,0);

const directionalLight3 = new THREE.DirectionalLight(0xFFFFFF,1);
scene.add(directionalLight3);
directionalLight3.position.set(0,10,50);



// texture loaders 
scene.background = textureLoader.load(aurora);

// object loaders 
const loader = new GLTFLoader();

//winter 0,0,40 
loader.load('/src/winter/mainBearFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(0,0,40 );
  gltf.scene.scale.set(0.015,0.015,0.015);
  scene.add(gltf.scene);
});

loader.load('/src/winter/mainBearFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(3,0,35 );
  gltf.scene.scale.set(0.009,0.009,0.009);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});


loader.load('/src/winter/polarBearFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(9,0,47);
  gltf.scene.scale.set(3,3,3);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});


loader.load('/src/winter/iglooFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(6,-0,32 );
  gltf.scene.scale.set(0.8,0.8,0.8);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});

loader.load('/src/winter/iglooFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(-7,0,42 );
  gltf.scene.scale.set(0.8,0.8,0.8);
  gltf.scene.rotation.y = Math.PI / 4;
  scene.add(gltf.scene);
});

loader.load('/src/winter/snowTreeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(-5,0,32);
  gltf.scene.scale.set(2,2,2);
  scene.add(gltf.scene);
});

loader.load('/src/winter/penguinFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(3,0,46);
  gltf.scene.scale.set(3,3,3);
  scene.add(gltf.scene);
});

loader.load('/src/winter/iceThroneFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(5,0,48);
  gltf.scene.scale.set(0.5,0.5,0.5);
  gltf.scene.rotation.y = Math.PI * 2;
  scene.add(gltf.scene);
});

loader.load('/src/winter/northPoleFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(16,0,38);
  gltf.scene.scale.set(3,3,3);
  scene.add(gltf.scene);
});




// summer  40,-1,0
loader.load('/src/summer/palmTreeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(34,0,0);
  gltf.scene.scale.set(2,2,2);
  scene.add(gltf.scene);
});

loader.load('/src/summer/palmTreeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(45,0,5);
  gltf.scene.scale.set(2,2,2);
  scene.add(gltf.scene);
});

loader.load('/src/summer/camelFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(49,0,7);
  gltf.scene.scale.set(2,2,2);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});

loader.load('/src/summer/camelFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(35,0,-5);
  gltf.scene.scale.set(2,2,2);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});

loader.load('/src/summer/smallSandIslandFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(40,0.5,0);
  gltf.scene.scale.set(3,3,3);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});



// spring 40,0,40
loader.load('/src/spring/woodenCabinFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(47, 2, 35);
  gltf.scene.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);
});

loader.load('/src/spring/millFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(35, 2, 35);
  gltf.scene.scale.set(2,2,2);
  scene.add(gltf.scene);
});

loader.load('/src/spring/pondFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(40, 0, 45);
  gltf.scene.scale.set(0.3,0.3,0.3);
  scene.add(gltf.scene);
});

loader.load('/src/spring/dogFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(46, 0, 43);
  gltf.scene.scale.set(2,2,2);
  gltf.scene.rotation.y = Math.PI / -4;
  scene.add(gltf.scene);
});

loader.load('/src/spring/campfireFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(47, 0, 47);
  gltf.scene.scale.set(0.02,0.02,0.02);
  scene.add(gltf.scene);
});

loader.load('/src/spring/pileOfWoodFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(33, 0, 45);
  gltf.scene.scale.set(2,2,2);
  scene.add(gltf.scene);
});


// autumn 0,0,0
loader.load('/src/autumn/fourTreesFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(5,0,0);
  gltf.scene.scale.set(1.5,1.5,1.5);
  scene.add(gltf.scene);
});

loader.load('/src/autumn/foxFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(0,0,0);
  gltf.scene.scale.set(0.025,0.025,0.025);
  scene.add(gltf.scene);
});

loader.load('/src/autumn/fishPondFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(-6,1.5,7);
  gltf.scene.scale.set(0.02,0.02,0.02);
  scene.add(gltf.scene);
});


// bridges
loader.load('/src/bridgeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(0,-0.5,20);
  gltf.scene.scale.set(2,1.3,0.8);
  scene.add(gltf.scene);
});

loader.load('/src/bridgeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(40,-0.5,20);
  gltf.scene.scale.set(2,1.3,0.8);
  scene.add(gltf.scene);
});

loader.load('/src/bridgeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(20,-0.5,40);
  gltf.scene.scale.set(2,1.3,0.8);
  gltf.scene.rotation.y = Math.PI / 2;
  scene.add(gltf.scene);
});

loader.load('/src/bridgeFolder/scene.gltf', function (gltf) {
  gltf.scene.position.set(20,-0.5,0);
  gltf.scene.scale.set(2,1.3,0.8);
  gltf.scene.rotation.y = Math.PI / 2;
  scene.add(gltf.scene);
});





// flying bird

let phoenix;
let mixer;

loader.load('/src/phoenixFolder/scene.gltf', function (gltf) {
  phoenix = gltf.scene;
  phoenix.position.set(0, 40, 0);
  phoenix.scale.set(0.01, 0.01, 0.01);
  scene.add(phoenix);

  if (gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(phoenix);
    const action = mixer.clipAction(gltf.animations[0]);
    action.setDuration(1.2); // Set the duration of the animation
    action.play();
    mixer.timeScale = 0.5; // Adjust the time scale to slow down the animation
  }

  // Define the positions for the bird to move between
  const positions = [
    new THREE.Vector3(0, 15, 0),
    new THREE.Vector3(40, 15, 0),
    new THREE.Vector3(40, 15, 40),
    new THREE.Vector3(0, 15, 40)
  ];
  let currentPositionIndex = 0;

  function animate() {
    if (mixer) {
      mixer.update(0.01); // Update the animation mixer
    }

    // Move the bird towards the next position
    const targetPosition = positions[currentPositionIndex];
    const distance = phoenix.position.distanceTo(targetPosition);
    const speed = 0.1; // Adjust the speed of movement
    if (distance > speed) {
      const direction = targetPosition.clone().sub(phoenix.position).normalize().multiplyScalar(speed);
      phoenix.position.add(direction);
    } else {
      // Move to the next position in the loop
      currentPositionIndex = (currentPositionIndex + 1) % positions.length;
      // Rotate the bird by 90 degrees around the y-axis
      phoenix.rotateY(Math.PI / -4);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate(); // Start the animation loop after the model is loaded
});


function changeCameraPosition1() {
  camera.position.set(60, 20, 60);
  camera.lookAt(40, 0, 40);
}
function changeCameraPosition2() {
  camera.position.set(10, 20, 30);
  camera.lookAt(40, 0, 0);
}
function changeCameraPosition3() {
  camera.position.set(30, 20, 30);
  camera.lookAt(0, 0, 0);
}
function changeCameraPosition4() {
  camera.position.set(10, 20, 70);
  camera.lookAt(0, 0, 40);
}

// Event listener for the button linked to HTML file 
document.getElementById('changePositionButton1').addEventListener('click', changeCameraPosition1);
document.getElementById('changePositionButton2').addEventListener('click', changeCameraPosition2);
document.getElementById('changePositionButton3').addEventListener('click', changeCameraPosition3);
document.getElementById('changePositionButton4').addEventListener('click', changeCameraPosition4);


// console closing bug thing
window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});