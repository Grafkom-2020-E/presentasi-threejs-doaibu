let renderer, camera;

const controls = {
    cameraX: 0,
    cameraY: 0,
    color: 0xffffff,
    cameraZ: 5,
    map: 0,
    gradientMap: 0,
}

const addGuiMeshBasic = (controls) => {
    let gui = new dat.GUI();
    let camera = gui.addFolder('camera');
    camera.add(controls, 'cameraX', -5.0, 5.0);
    camera.add(controls, 'cameraY', -5.0, 5.0);
    camera.add(controls, 'cameraZ', 0, 10.0);

    gui.addColor(controls, 'color').listen();
    gui.add(controls, 'map', {
        None: 0,
        Dissolve: 1,
        Wood: 2
    });

    gui.add(controls, 'gradientMap', {
        None: 0,
        threeTone: 1,
        fiveTone: 2
    });
}
const main = () => {

    let material = new THREE.MeshToonMaterial();
    const dissolve_texture = new THREE.TextureLoader().load('assets/textures/dissolve.png');
    const wood_texture = new THREE.TextureLoader().load('assets/textures/wood.png');

    const threeTone = new THREE.TextureLoader().load( 'assets/textures/threeTone.jpg' );
    threeTone.minFilter = THREE.NearestFilter;
    threeTone.magFilter = THREE.NearestFilter;

    const fiveTone = new THREE.TextureLoader().load( 'assets/textures/fiveTone.jpg' );
    fiveTone.minFilter = THREE.NearestFilter;
    fiveTone.magFilter = THREE.NearestFilter;

    addGuiMeshBasic(controls);

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.SphereGeometry(1, 32, 32);
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = -2.5;
    scene.add( sphere );

    let geometry1 = new THREE.BoxGeometry(1, 1, 1);
    let box = new THREE.Mesh(geometry1, material);
    box.position.x = 2.5;
    scene.add(box);

    let geometry2 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
    let plane = new THREE.Mesh(geometry2, material);
    plane.rotation.x = -90 * Math.PI / 180;
    plane.position.y = -100;
    scene.add(plane);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2.6);
    scene.add( directionalLight );
    
    const animate = () => {
        requestAnimationFrame(animate);

        if (controls.map == 0) {
            material.map = null;
        } else if (controls.map == 1) {
            material.map = dissolve_texture;
        } else if (controls.map == 2) {
            material.map = wood_texture;
        }

        if (controls.gradientMap == 0) {
            material.gradientMap = null;
        } else if (controls.gradientMap == 1) {
            material.gradientMap = threeTone;
        } else if (controls.gradientMap == 2) {
            material.gradientMap = fiveTone;
        }

        material.color.setHex(controls.color);

        material.needsUpdate = true;
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

const setBasicMaterialOnControl = (material, controls) => {
    material.color.setHex(controls.color);
}

const resize = () => {
    if (!camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}