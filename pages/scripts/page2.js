$(function(){
   if (document.getElementById('WebGL-output-2')) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

     var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);

    plane.rotation.x = -0.5*Math.PI;
    plane.position.x = 10;
    plane.position.y = 0;
    plane.position.z = 0;

    plane.receiveShadow = true;

    scene.add(plane);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);


    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var controls = new function () {
        this.numberOfObjects = scene.children.length;

        this.addCube = function () {
            var cubeSize = Math.ceil((Math.random() * 3));
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-" + scene.children.length;

            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        this.addSphere = function () {
          var sphereSize = 2;
          var sphereGeometry = new THREE.SphereGeometry(sphereSize,20,20);
          var sphereMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0x7777ff});
          var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.name = "sphere-" + scene.children.length;

          sphere.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
          sphere.position.y = Math.round((Math.random() * 5));
          sphere.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
          this.numberOfObjects = scene.children.length;
          scene.add(sphere);
        }
        this.outputObjects = function () {
            console.log(scene.children);
        }
    };
    var gui = new dat.GUI();
    gui.add(controls, 'addCube');
    gui.add(controls, 'addSphere');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();


    function render(){
      requestAnimationFrame(render);
      renderer.render(scene,camera);
    }


    $('#WebGL-output-2').append(renderer.domElement);
    render();

   }
});