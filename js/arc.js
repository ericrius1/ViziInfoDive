ArcPrefab = function(param) {
  param = param || {};

  var obj = new Vizi.Object;

  var arcScript = new ArcScript();
  obj.addComponent(arcScript);
}

ArcScript = function(){
  PrimitiveScript.call(this, param);
}

goog.inherits(ArcScript, PrimitiveScript);

ArcScript.prototype.realize = function(){

}

ArcScript.prototype.spawn = function(){
  var cube = Vizi.object;

  var visual = new Vizi.Visual({
    geometry: new THREE.CubeGeometry(10, 10, 10),
    material: new THREE.MeshBasicMaterial()
  });
  cube.addComponent(visual);
  this._object.addChild(cube);


}