goog.provide('PrimitiveScript');
goog.require('Vizi.Script');

PrimitiveScript = function(param) {
  Vizi.Script.call(this, param);

}

goog.inherits(PrimitiveScript, Vizi.Script);

PrimitiveScript.prototype.update = function() {
}
