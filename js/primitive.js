goog.provide('PrimitiveScript');
goog.require('Vizi.Script');

PrimitiveScript = function(param) {
  Vizi.Script.call(this, param);
  this._colorPalette = [0xEF2D5E, 0xFCED49, 0x1BA0D1, 0xA00B5F, 0x93B75E];

}

goog.inherits(PrimitiveScript, Vizi.Script);

PrimitiveScript.prototype.update = function() {
}
