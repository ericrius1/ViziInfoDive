  // Create Vizi application
 var container = document.getElementById("container");
 var app = new Vizi.Application({
   container: container
 });

 var cam = new Vizi.PerspectiveCamera;
 cam.far = 100000;
 cam.near = 1;
 cam.fov = 45;

 var camera = new Vizi.Object;
 camera.addComponent(cam);
 cam.active = true;
 this.addObject(camera);

 var ground = new Vizi.Object;
 var visual = new Vizi.Visual({
   geometry: new THREE.PlaneGeometry(2000, 2000, 100, 100),
   material: new THREE.MeshBasicMaterial({
     color: 0x0000ff,
     transparent: true,
     opacity: 1,
     wireframe: true
   })
 })
  ground.addComponent(visual);
 ground.transform.rotation.x = -Math.PI / 2

 var controller = Vizi.Prefabs.PointerLockController({
   active: true
 })


  // Create light to show shading
 var light = new Vizi.Object;
 light.addComponent(new Vizi.DirectionalLight);

 app.addObject(ground)
  app.addObject(light);

  // Run the app
 app.run();