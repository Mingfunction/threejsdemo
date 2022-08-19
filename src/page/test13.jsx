import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Test13 extends Component {
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
    camera.position.set(0, 5, 5);

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    // 渲染器开启阴影
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    function renderer3D() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(renderer3D);
    }
    renderer3D();

    // const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
    // 创建着色器材质
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        void main(){
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
        }
      `,
      fragmentShader: `
        void main(){
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `,
    });

    const floor = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1, 64, 64),
      shaderMaterial
    );
    scene.add(floor);
    // scene.add(points);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div id="container">
        {/* <canvas id="canvas" style={{ width: "100%", height: "100%" }}></canvas> */}
      </div>
    );
  }
}

export default Test13;
