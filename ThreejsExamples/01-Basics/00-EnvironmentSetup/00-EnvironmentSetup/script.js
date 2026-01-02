import * as THREE from "three"

/**
 * Browser-> HTML-> canvas
 * Renderer-> canvas , scene, camera, width and height
 * Scene -> Objects
 * Camera -> position
 * 
 */

const sizes = {
    width:window.innerWidth,
    height: window.innerHeight, 
    aspectRatio:window.innerWidth/window.innerHeight
}

const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)


const scene = new THREE.Scene()
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0xff0000}))
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75,sizes.aspectRatio )
camera.position.z = 3


renderer.render(scene,camera)