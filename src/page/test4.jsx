import React, { Component } from "react";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库

export class Test4 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;
    console.log(innerHeight);
    console.log(innerWidth);

    // 目标：掌握轻量级图形界面

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

    const geometry = new THREE.BufferGeometry();
    // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    // 因为在两个三角面片里，这两个顶点都需要被用到。
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0,

      1.0, -1.0, 1.0,

      1.0, 1.0, 1.0,

      1.0, 1.0, 1.0,

      -1.0, 1.0, 1.0,

      -1.0, -1.0, 1.0,
    ]);

    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // vertices[0] = -1;
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(innerWidth, innerHeight);
    // console.log(renderer);
    // 将webgl渲染的canvas内容添加到body
    container.appendChild(renderer.domElement);

    // // 使用渲染器，通过相机将场景渲染进来
    // renderer.render(scene, camera);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // 设置时钟
    // const clock = new THREE.Clock();

    window.addEventListener("dblclick", () => {
      const fullScreenElement = document.fullscreenElement;
      if (!fullScreenElement) {
        //   双击控制屏幕进入全屏，退出全屏
        // 让画布对象全屏
        renderer.domElement.requestFullscreen();
      } else {
        //   退出全屏，使用document对象
        document.exitFullscreen();
      }
      //   console.log(fullScreenElement);
    });

    function render() {
      controls.update();
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    }

    render();

    // 监听画面变化，更新渲染画面
    window.addEventListener("resize", () => {
      //   console.log("画面变化了");
      // 更新摄像头
      camera.aspect = innerWidth / innerHeight;
      //   更新摄像机的投影矩阵
      camera.updateProjectionMatrix();

      //   更新渲染器
      renderer.setSize(innerWidth, innerHeight);
      //   设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test4;
