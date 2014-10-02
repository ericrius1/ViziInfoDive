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
  this.activePrimitiveIndex = 0;
  this._object.addChild(ArcPrefab());
}

PrimitivesScript.prototype.spawn = function(){
  console.log('spawn');
}

PrimitivesScript.prototype.update = function(){

}

