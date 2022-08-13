// Create a namespace //
import * as THREE from 'three';
//import { Plane } from 'three';
import * as dat from 'dat.gui';

import nebula from '../img/nebula.jpg';
import star from '../img/star.jpg';

import nasa1 from '../img/nasa1.jpg';
import nasa2 from '../img/nasa2.jpg';


//import orbitcontrol for mouse click work //
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { Plane } from 'three';

// create a renderer for webGLRender//
const rendererer = new THREE.WebGLRenderer();

rendererer.shadowMap.enabled = true;

rendererer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(rendererer.domElement);

//create a scene//
const scene = new THREE.Scene();
//create a camera//
const camera = new THREE.PerspectiveCamera(
    75, //perspactive of work scene//
    window.innerWidth/window.innerHeight, //ratio the canvas width & height//
    0.1, //nearclip value//
    1000 //farclip value//

);
// create orbit for mouse click //
const orbit= new OrbitControls(camera,rendererer.domElement)
orbit.update();

// Using AxesHelper for fixed the camera position & maintain the axes//
const axesHelper= new THREE.AxesHelper(5);
scene.add(axesHelper);

// Using GridHelper it create a grid//
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

/*camera.position.z=5;
camera.position.y=2;*/
camera.position.set(10,0,30);

// create a box geometry //
const boxGeometry =new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
const box= new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box); // those box add the screen//

// create a box2 geometry //


// create a plane geometry //
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    side: THREE.DoubleSide

});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x= -0.5 * Math.PI;

//The plane receive the shadow //
plane.receiveShadow = true;

// create a plane2 geometry //
const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

// change the plane2 vertex & custom it // 
plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

// create a sphere geometry //
const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color : 0x0000FF,
    //wireframe : true
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,10,0);
sphere.castShadow =  true;

// create a sphere2 geometry //

const sphere2Geometry = new THREE.SphereGeometry(4);

 /*const vShader = `
     void main() {
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
 `;

 const fShader = `
     void main() {
        gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
     }
`;*/

const sphere2Material = new THREE.ShaderMaterial({
    color : 0x0FF,
    wireframe : true
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

// Classification of light & it will apply the code //
// Total 3 types of light such as: ambientLight,directionLight,spotLight//

//For ambientLight//
const ambientLight= new THREE.AmbientLight(0x3333333);
scene.add(ambientLight);

//For directionLight//

/*const directionLight = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionLight);
directionLight.position.set(-30,50,0);
directionLight.castShadow = true;

const dLightHelper = new THREE.DirectionalLightHelper(directionLight);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionLight.shadow.camera);
scene.add(dLightShadowHelper);*/

//for spotLight//
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100,100,0);
spotLight.castShadow = true;
spotLight.angle=0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// Using fog//
scene.fog = new THREE.Fog(0xFFFF,0,200); 

//rendererer.setClearColor(0x021E1B);

//Create a textureLoader //

const textureLoader = new THREE.TextureLoader();
//scene.background=textureLoader.load(nebula);
//const cubetextureLoader = new THREE.CubeTextureLoader();

//Create a cubetextureLoader //

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nasa1,
    nasa1,
    nasa2,
    nasa2,
    nasa2,
    nasa1
    
]);

//Create box2Geometry//

const box2Geometry =new THREE.BoxGeometry(3,3,3);
const box2Material = new THREE.MeshBasicMaterial({
    //color:0x00FF00,
   // map:textureLoader.load(star)
});

// Create a 3d box2Geometry//
const box2MultiMaterial =[
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(star)
    }),
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(star)
    }),
   
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(nebula)
    }),
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(star)
    }),
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(nebula)
    }),
    new THREE.MeshBasicMaterial({
        //color:0x00FF00,
        map:textureLoader.load(nebula)
    })
]

const box2= new THREE.Mesh(box2Geometry,box2MultiMaterial);
scene.add(box2); 
box2.position.set(0,5,10);

// Create a GUI//

const gui= new dat.GUI();
// create a object//
const options={
   sphereColor: '#ffea00',
   wireframe : false,
   speed:0.01
};

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options,'wireframe').onChange(function(f){
    sphere.material.wireframe = f;
});
gui.add(options,'speed',0,0.1);

// create a counter variable for animation step count//
let step=0;

// Create a mouse click in the screen //

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

//3js provide random id in every element//

const sphereId = sphere.id;

//provide a name of box2//

box2.name = 'theBox';


/*box.rotation.x=5;
box.rotation.y=5;*/ 
//Create a function For animation// 
function animate(){
    //Box1 rotation//
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    rayCaster.setFromCamera(mousePosition,camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    //console.log(intersects);
    
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.id === sphereId){
            intersects[i].object.material.color.set(0xFF0000);
        }
         
        if(intersects[i].object.name === 'theBox'){
            intersects[i].object.rotation.x+=0.01;
            intersects[i].object.rotation.y+=0.01;
        }

       
    }

    plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true;

    //Create a connection with scene & camera using rebder method//
    rendererer.render(scene,camera);
}
rendererer.setAnimationLoop(animate);

//Responsible canvas//

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererer.setSize(window.innerWidth, window.innerHeight);
});


