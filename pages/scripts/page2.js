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

    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);

    plane.rotation.x = -0.5*Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    plane.receiveShadow = true;

    scene.add(plane);


    var cubeGeometry = new THREE.CubeGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;

    cube.castShadow = true;
    scene.add(cube)



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


    function addCube(){

      var cubeSize = Math.ceil((Math.random() * 3));
      var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
      cube.castShadow=true;
      cube.name = "cube-" + scene.children.length;
      cube.position.x = -30 + Math.round(Math.random()*planeGeometry.width));
      cube.position.y = Math.round(Math.random()*5));
      cube.position.z = -20 + Math.round(Math.random()*planeGeometry.height));

      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    }


    function render(){
      requestAnimationFrame(render);
      renderer.render(scene,camera);
    }


    $('#WebGL-output-2').append(renderer.domElement);
    render();

   }
});