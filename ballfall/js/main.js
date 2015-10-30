function addSphere(scene, x, y, z){
    var sphere = new Physijs.SphereMesh(
                new THREE.SphereGeometry(5, 50, 50), 
                Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xCC0000}), 0.2, 0.8),
                2
            );
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    scene.add(sphere);
    sphere.castShadow = true;
    return sphere
}


function addWall(scene, x, y, z, deg, trans){
    var plane = new Physijs.BoxMesh(
        new THREE.CubeGeometry(200,200, 10), 
        Physijs.createMaterial (
            new THREE.MeshLambertMaterial({color: 0xffffff, transparent: trans, opacity: 0}), 0.2, 0.7
        ),
        0
    );
    
    plane.receiveShadow = true;
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    plane.rotation.y = deg;
    scene.add(plane);
    return plane;
}


function addGround(scene, x, y, z){
    var plane = new Physijs.BoxMesh(
        new THREE.CubeGeometry(200,10, 200), 
        Physijs.createMaterial (
            new THREE.MeshLambertMaterial({color: 0xffffff}), 0.2, 0.7
        ),
        0
    );
    plane.receiveShadow = true;

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    scene.add(plane);
    return plane;
}

var renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';
var scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
scene.addEventListener( 'update', function() {
    scene.simulate( undefined, 2 );
});

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.z = 300;
camera.position.y = 200;
camera.lookAt({x:0,y:100,z:0});
scene.add(camera);

for (var i=0; i<20; i++){
    addSphere(scene, Math.random()*i, 100*i+20, Math.random()*i);
}

var ground = addGround(scene, 0, 0,0);
addWall(scene, 0, 100, -100, 0, false);

addWall(scene, 100, 100, 0, 1.54, false);
addWall(scene, -100, 100, 0, 1.54, false);
addWall(scene, 0, 100, 100, 0, true);
scene.add( new THREE.AmbientLight( 0x111111) );

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 100;
light.position.y = 100;
light.position.z = 30;
scene.add(light);

renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;

renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

light.castShadow = true;

light.lookAt(ground.position);

scene.simulate()
var angle = 0;
var speed = 2;
function render(){
    requestAnimationFrame(render);
    angle = angle == 360? 0: angle+speed;
    renderer.render(scene, camera);
}

render();
