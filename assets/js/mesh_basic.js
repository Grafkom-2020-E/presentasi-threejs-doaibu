let renderer, camera;

const extraControls = {
    texture: 0,
    background: 0
}

const addGuiMeshBasic = (gui, controls) => {
    gui.addColor(controls, 'color').listen();
    gui.add(extraControls, 'texture', {
        None: 0,
        Dissolve: 1,
        Wood: 2
    });
}

const main = () => {

    let material = new THREE.MeshBasicMaterial();
    let dissolve_texture = new THREE.TextureLoader().load('assets/textures/dissolve.png');
    let wood_texture = new THREE.TextureLoader().load('assets/textures/wood.png');

    let controls = new Control(material);

    let gui = controls.newGui();

    controls.color = material.color.getHex();
    addGuiMeshBasic(gui, controls);

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
        
        const time = Date.now() * 0.00025;
        const ox = ( time * - 0.01 * mapBg.repeat.x ) % 1;
        const oy = ( time * - 0.01 * mapBg.repeat.y ) % 1;

        mapBg.offset.set( ox, oy );

        camera.position.x = controls.cameraX;
        camera.position.y = controls.cameraY;
        camera.position.z = controls.cameraZ;
        controls.setMaterialToThis(sphere.material);
        controls.setMaterialToThis(box.material);
        controls.setMaterialToThis(plane.material);

        if (extraControls.texture == 0) {
            sphere.material.map = null;
            box.material.map = null;
            plane.material.map = null;
        } else if (extraControls.texture == 1) {
            sphere.material.map = dissolve_texture;
            box.material.map = dissolve_texture;
            plane.material.map = dissolve_texture;
        } else if (extraControls.texture == 2) {
            sphere.material.map = wood_texture;
            box.material.map = wood_texture;
            plane.material.map = wood_texture;
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