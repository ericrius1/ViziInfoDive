InfoWorld = function(param) {
  param.tabstop = true;
  Vizi.Application.call(this, param);

  this.init(param);
}

goog.inherits(InfoWorld, Vizi.Application);

InfoWorld.prototype.init = function(param) {

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
  var controllerScript = controller.getComponent(Vizi.PointerLockControllerScript);
  controllerScript.camera = cam;
  camera.transform.position.set(0,2,4);
  this.addObject(controller);
  // Create light to show shading
  var light = new Vizi.Object;
  light.addComponent(new Vizi.DirectionalLight);

  this.addObject(ground)
  this.addObject(light);
}

InfoWorld.prototype.onKeyDown = function(event){
  switch( event.keyCode ) {
    case 49:
      console.log('arc')
      break;
    case 50:
      console.log('curve dots')
      break;
  }
}