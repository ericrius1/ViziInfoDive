ArcPrefab = function(param) {
  param = param || {};

  var obj = new Vizi.Object;

  var arcScript = new ArcScript();
  obj.addComponent(arcScript);

  return obj
}

ArcScript = function(param){
  PrimitiveScript.call(this, param);
}

goog.inherits(ArcScript, PrimitiveScript);

ArcScript.prototype.realize = function(){

}

ArcScript.prototype.spawn = function(){
  console.log('arc spawn');
  var cube = new Vizi.Object();

  var visual = new Vizi.Visual({
    geometry: new THREE.CubeGeometry(10, 10, 10),
    material: new THREE.MeshBasicMaterial()
  });
  cube.addComponent(visual);
  cube.transform.position.z = -50
  this._object.addChild(cube);
}