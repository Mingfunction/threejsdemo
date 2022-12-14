import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test7 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    scene.add(camera);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    function renderer3D() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(renderer3D);
    }
    renderer3D();

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMapTexture = cubeTextureLoader.load([
      "./textures/environmentMaps/Park3Med/px.jpg",
      "./textures/environmentMaps/Park3Med/nx.jpg",
      "./textures/environmentMaps/Park3Med/py.jpg",
      "./textures/environmentMaps/Park3Med/ny.jpg",
      "./textures/environmentMaps/Park3Med/pz.jpg",
      "./textures/environmentMaps/Park3Med/nz.jpg",
    ]);
    // 给整个场景添加环境贴图
    scene.background = envMapTexture;
    // 给所有物体添加默认环境贴图
    scene.environment = envMapTexture;

    const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.1,
      envMap: envMapTexture,
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);

    scene.add(sphere);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test7;
