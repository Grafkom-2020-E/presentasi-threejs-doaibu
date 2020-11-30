let renderer, camera;

const extraControls = {
    texture: 0
}

const addGuiMeshBasic = (gui, controls) => {
    gui.addColor(controls, 'color').listen();
    gui.add(extraControls, 'texture', {
        None: 0,
        Dissolve: 1
    });
}

const main = () => {

    let material = new THREE.MeshBasicMaterial();
    let texture = new THREE.TextureLoader().load('textures/dissolve.png');

    let controls = new Control(material);

    let gui = controls.newGui();

    controls.color = material.color.getHex();
    addGuiMeshBasic(gui, controls);

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
        camera.position.z = controls.cameraZ;
        controls.setMaterialToThis(sphere.material);
        controls.setMaterialToThis(box.material);
        controls.setMaterialToThis(plane.material);

        if (extraControls.texture == 0) {
            sphere.material.map = null;
            box.material.map = null;
            plane.material.map = null;
        } else if (extraControls.texture == 1) {
            sphere.material.map = texture;
            box.material.map = texture;
            plane.material.map = texture;
        }

        sphere.material.needsUpdate = true;
        box.material.needsUpdate = true;
        plane.material.needsUpdate = true;
        setBasicMaterialOnControl(sphere.material, controls);
        setBasicMaterialOnControl(box.material, controls);
        setBasicMaterialOnControl(plane.material, controls);
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