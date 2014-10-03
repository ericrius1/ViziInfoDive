PrimitivesPrefab = function(param) {
  param = param || {};

  var obj = new Vizi.Object;

  var primitivesScript = new PrimitivesScript(param);
  obj.addComponent(primitivesScript);

  return obj;
}

goog.provide('PrimitivesScript');
goog.require('Vizi.Script');

PrimitivesScript = function(param) {
  Vizi.Script.call(this, param);
}

goog.inherits(PrimitivesScript, Vizi.Script);

PrimitivesScript.prototype.realize = function(){
  this.primitives = [];
  this.activePrimitiveIndex = 1;
  this._object.addChild(ArcPrefab());
  this._object.addChild(CurveDotPrefab());

  var len = this._object._children.length;
  for(var i = 0; i < len; i++){
    var obj = this._object._children[i];
    var primitive = obj.getComponent(PrimitiveScript);
    this.primitives.push(primitive);
  }
}

PrimitivesScript.prototype.spawn = function(){
  console.log('spawn');
  this.primitives[this.activePrimitiveIndex].spawn();
}

PrimitivesScript.prototype.update = function(){

}

