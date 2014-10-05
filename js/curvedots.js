CurveDotPrefab = function(param) {
  param = param || {};


  var obj = new Vizi.Object;

  var curveDotScript = new CurveDotScript();
  obj.addComponent(curveDotScript);

  return obj
}

CurveDotScript = function(param) {
  PrimitiveScript.call(this, param);
  this._subdivisions = 100;
  this._percentFullScale = .1 //dot will be full scale by 10% of curve

}

goog.inherits(CurveDotScript, PrimitiveScript);

CurveDotScript.prototype.realize = function() {
  this.$menuItem =  $('<div>').addClass('item').text("2 : Curve Dots").appendTo($('#menu'));

}

CurveDotScript.prototype.spawn = function() {
  var strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color(_.sample(this._colorPalette))
      }
    },
    attributes: {
      opacity: {
        type: 'f',
        value: []
      },
    },
    vertexShader: Vizi.Application.instance.shaders.vs.strand,
    fragmentShader: Vizi.Application.instance.shaders.fs.strand,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });


  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(1, 2, 0);
  curve.v2 = new THREE.Vector3(2, 0, 0);

  var opacity = strandMat.attributes.opacity.value
  for (var j = 0; j < this._subdivisions; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / this._subdivisions))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, strandMat)
  strand.scale.set(G.rf(1, 100), G.rf(1, 10), 1)
  var strandObject = new Vizi.Object;
  var visual = new Vizi.Visual({
    object: strand
  });
  strandObject.addComponent(visual);
  this._object.addChild(strandObject);


  //We need to encapsulate dot growing and shrinking
  var dotGeo = new THREE.SphereGeometry(.1, 12, 10)
  var dot = new THREE.Mesh(dotGeo);
  var dotObject = new Vizi.Object;
  var visual = new Vizi.Visual({
    object: dot
  });
  dotObject.addComponent(visual);
  strand.dot = dotObject;
  

  strand.material.attributes.opacity.needsUpdate = true

  //To keep things simple, lets grow the strand immediately upon creation.
  setTimeout(function(){
    growStrand(strand, 0)
  }.bind(this), 0); 
  
  var growStrand = function(strand, vertexIndex) {
    if(vertexIndex === 0){
      this._object.addChild(strand.dot);
    }
    var opacity = strand.material.attributes.opacity;
    var worldPos = strand.geometry.vertices[vertexIndex].clone();
    worldPos.applyMatrix4(strand.matrixWorld)
    strand.dot.transform.position.set(worldPos.x, worldPos.y, worldPos.z);
    if(vertexIndex <= this._subdivisions * this._percentFullScale){
      var scale = G.map(vertexIndex, 0, this._subdivisions * this._percentFullScale, 0.01, 1)
      strand.dot.transform.scale.set(scale, scale, scale);
    }
    opacity.value[vertexIndex++] = 1;
    opacity.needsUpdate = true
    if (vertexIndex === opacity.value.length) return

    setTimeout(function() {
      growStrand(strand, vertexIndex);
    }.bind(this), 30);
  }.bind(this)
};