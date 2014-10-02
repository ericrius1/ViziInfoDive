goog.provide('PrimitiveScript');
goog.require('Vizi.Script');

PrimitiveScript = function(param) {
  Vizi.Script.call(this, param);
}

goog.inherits(PrimitiveScript, Vizi.Script);

PrimitiveScript.prototype.realize = function(){
  this.primitives = [];
  this.activePrimitiveIndex = 0;
  this._object.addChild(ArcPrefab());
}


PrimitiveScript.prototype.update = function(){

}

