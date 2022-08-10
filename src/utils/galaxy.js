import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export default class Galaxy {
  constructor(ele) {
    this.ele = ele;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.init();
  }
  init() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initHelper();
    this.initControls();
    this.camera.position.set(0, 20, 0);
    // 渲染器开启阴影
    this.renderer.shadowMap.enabled = true;
    console.log(this.controls);
    this.render();

    this.addPoint();
  }
  addPoint() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("./textures/particles/1.png");

    const params = {
      pointsCount: 10000, // 点的个数
      branch: 9, // 分支
      radius: 6, // 半径
      color: "#ff6030",
      endColor: "#1b3984",
    };
    const centerColor = new THREE.Color(params.color);
    const endColor = new THREE.Color(params.endColor);

    const pointsCount = params.pointsCount;
    const rotateScale = 0.3; // 星线弯曲的程度
    const positions = new Float32Array(pointsCount * 3);
    // 设置顶点颜色
    const colors = new Float32Array(pointsCount * 3);
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < pointsCount; i++) {
      // 当前的点应该在哪一条分支的角度上
      const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch);
      // 距离圆心的距离
      const distance = params.radius * Math.random();
      const randomX = Math.random();
      const randomY = Math.random();
      const randomZ = Math.random();

      const current = i * 3;

      positions[current] =
        Math.sin(branchAngel + distance * rotateScale) * distance + randomX;
      positions[current + 1] = 0 + randomY;
      positions[current + 2] =
        -Math.cos(branchAngel + distance * rotateScale) * distance + randomZ;

      // new THREE.Color(params.color); 的方法
      // .clone() 克隆 克隆是因为不在原颜色上改
      // .lerp 混合 向 这个颜色endColor混合 如果到 1 就是endColor 0.5就是混合50%
      // distance / params.radius 越远混合的越多
      const mixColor = centerColor.clone();
      mixColor.lerp(endColor, distance / params.radius);

      colors[current] = mixColor.r;
      colors[current + 1] = mixColor.g;
      colors[current + 2] = mixColor.b;
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      map: texture,
      transparent: true,
      alphaMap: texture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }
  initScene() {
    this.scene = new THREE.Scene();
  }
  initCamera() {
    let innerHeight = this.ele.clientHeight;
    let innerWidth = this.ele.clientWidth;
    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    this.scene.add(this.camera);
  }
  initRenderer() {
    let innerHeight = this.ele.clientHeight;
    let innerWidth = this.ele.clientWidth;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(innerWidth, innerHeight);
    this.ele.appendChild(this.renderer.domElement);
  }
  initHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    this.scene.add(axesHelper);
  }
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  render() {
    if (this.points) {
      this.points.rotation.y += 0.01;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
