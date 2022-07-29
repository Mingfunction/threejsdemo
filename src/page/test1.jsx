import React, { Component } from "react";
import * as THREE from "three";

export class Test1 extends Component {
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;
    console.log(innerHeight);
    console.log(innerWidth);

    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );

    // 设置相机位置
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(innerWidth, innerHeight);
    // console.log(renderer);
    // 将webgl渲染的canvas内容添加到body
    container.appendChild(renderer.domElement);

    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
  }

  render() {
    return <div id="container"></div>;
  }
}

// let a = 0;
// let b = 0;
// let r = 5;

// for (var times = 0; times < 360; times++) {
//   var hudu = 1 * (Math.PI / 180) * times;

//   var X = a + Math.sin(hudu) * r;

//   var Y = b - Math.cos(hudu) * r; //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。

//   console.log(X, Y);
// }

export default Test1;
