let renderer, camera;

const controls = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 3,
    wireframe: false,
}

const addGuiMeshBasic = (controls) => {
    let gui = new dat.GUI();
    let camera = gui.addFolder('camera');
    camera.add(controls, 'cameraX', -5.0, 5.0);
    camera.add(controls, 'cameraY', -5.0, 5.0);
    camera.add(controls, 'cameraZ', 0, 10.0);

    gui.add(controls, 'wireframe');
}
const main = () => {

    let material = new THREE.MeshDepthMaterial();

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

        const time = Date.now() * 0.00025;
        const ox = ( time * - 0.01 * mapBg.repeat.x ) % 1;
        const oy = ( time * - 0.01 * mapBg.repeat.y ) % 1;

        mapBg.offset.set( ox, oy );

        material.needsUpdate = true;
        material.wireframe = controls.wireframe;
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