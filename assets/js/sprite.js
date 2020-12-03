let renderer, camera;

const controls = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 5,
};

const addGuiSprite = (controls) => {
    let gui = new dat.GUI();
    let camera = gui.addFolder('camera');
    camera.add(controls, 'cameraX', -5.0, 5.0);
    camera.add(controls, 'cameraY', -5.0, 5.0);
    camera.add(controls, 'cameraZ', 0, 10.0);

    gui.addColor(controls,'color').listen();
}

const main = () => {
    let spriteMap = new THREE.TextureLoader().load('assets/textures/wood.png');
    let material = new THREE.SpriteMaterial( { map: spriteMap});

    controls.color = material.color.getHex();

    addGuiSprite(controls);

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let sprite = new THREE.Sprite(material);
    sprite.scale.set(1, 1, 1);
    scene.add(sprite);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2.6);
    scene.add( directionalLight );
    
    const animate = () => {
        requestAnimationFrame(animate);

        material.color.setHex(controls.color);
        camera.position.x = controls.cameraX;
        camera.position.y = controls.cameraY;
        camera.position.z = controls.cameraZ;

        // rotateMesh(sprite);
        renderer.render(scene, camera);
    }
    animate();
}

// const rotateMesh = (mesh) => {
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;
// }

const resize = () => {
    if (!camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}