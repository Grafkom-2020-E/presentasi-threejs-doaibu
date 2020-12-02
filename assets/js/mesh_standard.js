let renderer, camera;

const controls = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 5,
    color: 0x2194ce,
    emissive: 0x0,
    roughness: 1,
    metalness: 0,
    envMap: 0,
    map: 0,
    roughnessMap: 0,
    wireframe: false,
    flatShading: false,
    combine: THREE.MultiplyOperation,
}

const addGuiMeshBasic = (controls) => {
    let gui = new dat.GUI();
    let camera = gui.addFolder('camera');
    camera.add(controls, 'cameraX', -5.0, 5.0);
    camera.add(controls, 'cameraY', -5.0, 5.0);
    camera.add(controls, 'cameraZ', 0, 10.0);

    gui.addColor(controls, 'color').listen();
    gui.addColor(controls, 'emissive').listen();
    gui.add(controls, 'roughness', 0, 1);
    gui.add(controls, 'metalness', 0, 1);

    gui.add(controls, 'envMap', {
        None: 0,
        Refraction: 1,
    });

    gui.add(controls, 'map', {
        None: 0,
        Dissolve: 1,
    });
    
    gui.add(controls, 'roughnessMap', {
        None: 0,
        Dissolve: 1,
    });

    gui.add(controls, 'wireframe');
}

const main = () => {
    let material = new THREE.MeshStandardMaterial();
    let brick_diffuse = new THREE.TextureLoader().load('assets/textures/brick_diffuse.jpg');
    let brick_roughness = new THREE.TextureLoader().load('assets/textures/brick_roughness.jpg');

    addGuiMeshBasic(controls);

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const canvas = document.createElement( 'canvas' );
    const ctx = canvas.getContext( '2d' );
    canvas.width = canvas.height = 128;
    ctx.fillStyle = '#ddd';
    ctx.fillRect( 0, 0, 128, 128 );
    ctx.fillStyle = '#555';
    ctx.fillRect( 0, 0, 64, 64 );
    ctx.fillStyle = '#999';
    ctx.fillRect( 32, 32, 32, 32 );
    ctx.fillStyle = '#555';
    ctx.fillRect( 64, 64, 64, 64 );
    ctx.fillStyle = '#777';
    ctx.fillRect( 96, 96, 32, 32 );

    mapBg = new THREE.CanvasTexture( canvas );
    mapBg.wrapS = mapBg.wrapT = THREE.RepeatWrapping;
    mapBg.repeat.set( 128, 64 );

    const materialBg = new THREE.MeshBasicMaterial( { map: mapBg } );

    const meshBg = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4000, 2000 ), materialBg );
    meshBg.position.set( 0, 0, - 500 );
    scene.add(meshBg);
    
    const reflectionCube = new THREE.CubeTextureLoader()
    .setPath( 'assets/textures/SwedishRoyalCastle/' )
    .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    reflectionCube.encoding = THREE.sRGBEncoding;
    reflectionCube.mapping = THREE.CubeRefractionMapping;

    let geometry = new THREE.SphereGeometry(1, 32, 32);
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = -2.5;
    scene.add( sphere );

    let geometry1 = new THREE.BoxGeometry(1, 1, 1);
    let box = new THREE.Mesh(geometry1, material);
    box.position.x = 2.5;
    scene.add(box);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2.6);
    scene.add( directionalLight );
    
    const animate = () => {
        requestAnimationFrame(animate);

        material.color.setHex(controls.color);
        material.emissive.setHex(controls.emissive);
        material.roughness = controls.roughness; 
        material.metalness = controls.metalness; 

        if (controls.envMap == 0) {
            material.envMap = null;
        } else if (controls.envMap == 1) {
            material.envMap = reflectionCube;
        }

        if (controls.map == 0) {
            material.map = null;
        } else if (controls.map == 1) {
            material.map = brick_diffuse;
        }

        if (controls.roughnessMap == 0) {
            material.roughnessMap = null;
        } else if (controls.roughnessMap == 1) {
            material.roughnessMap = brick_roughness;
        }
        material.needsUpdate = true;
        
        material.flatShading = controls.flatShading;
        material.wireframe = controls.wireframe;
        material.combine = controls.combine;
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