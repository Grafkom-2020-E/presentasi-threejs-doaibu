let renderer, camera;

const controls = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 5,
    dashSize: 3,
    gapSize: 1,
    scale: 1
};

const addGuiLineDashed = (controls) => {
    let gui = new dat.GUI();
    let camera = gui.addFolder('camera');
    camera.add(controls, 'cameraX', -5.0, 5.0);
    camera.add(controls, 'cameraY', -5.0, 5.0);
    camera.add(controls, 'cameraZ', 0, 10.0);

    gui.addColor(controls,'color').listen();
    gui.add(controls, 'dashSize', 0.0, 10.0);
    gui.add(controls, 'gapSize', 0.0, 10.0);
    gui.add(controls, 'scale', 0.0, 10.0);
}

const main = () => {
    let material = new THREE.LineDashedMaterial();

    controls.color = material.color.getHex();
    controls.dashSize = material.dashSize;
    controls.gapSize = material.gapSize;
    controls.scale = material.scale;

    addGuiLineDashed(controls);

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.SphereGeometry(1,32,32);
    let sphere = new THREE.Line( geometry, material );
    sphere.computeLineDistances();
    sphere.position.x = -2.5;
    scene.add( sphere );

    let geometry1 = new THREE.BoxGeometry(1, 1, 1);
    let box = new THREE.Line(geometry1, material);
    box.computeLineDistances();
    box.position.x = 2.5;
    scene.add(box);

    let geometry2 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
    let plane = new THREE.Line(geometry2, material);
    plane.computeLineDistances();
    plane.rotation.x = -90 * Math.PI / 180;
    plane.position.y = -100;
    scene.add(plane);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2.6);
    scene.add( directionalLight );
    
    const animate = () => {
        requestAnimationFrame(animate);

        material.color.setHex(controls.color);
        material.dashSize = controls.dashSize;
        material.gapSize = controls.gapSize;
        material.scale = controls.scale;
        camera.position.x = controls.cameraX;
        camera.position.y = controls.cameraY;
        camera.position.z = controls.cameraZ;

        rotateMesh(sphere);
        rotateMesh(box);
        renderer.render(scene, camera);
    }
    animate();
}

const rotateMesh = (mesh) => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
}

const resize = () => {
    if (!camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}