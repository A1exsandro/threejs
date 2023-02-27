import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

// SET CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// ORBITCONTROLS
const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.set(-10, 30, 30)
orbit.update()

// SET BOX
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

// SET PLANE
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

// SET SPHERE
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  wireframe: false
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)

const gui = new dat.GUI()

const options = {
  sphereColor: '#ffea00',
  wireframe: false
}

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function(e){
  sphere.material.wireframe = e
})

////////////////////////////// LOOP////////////////////////////////////
function createPlane() {
  var planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -0.5 * Math.PI
  scene.add(planeMesh);
  return planeMesh;
}
const currentPlane = createPlane()

function movePlane() {
  currentPlane.translateY(-0.1); // move o plano para trás
  if (currentPlane.position.z < -100) { // verifica se o plano saiu da visão
    scene.remove(currentPlane); // remove o plano da cena
    currentPlane = createPlane(); // cria um novo plano
  }
}
//////////////////////////END//////////////////////////////////////////

function animate(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000
  
  // movePlane()
 
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
