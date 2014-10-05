ArcPrefab = function(param) {
  param = param || {};


  var obj = new Vizi.Object;

  var arcScript = new ArcScript();
  obj.addComponent(arcScript);

  return obj
}

ArcScript = function(param) {
  PrimitiveScript.call(this, param);
}

goog.inherits(ArcScript, PrimitiveScript);

ArcScript.prototype.realize = function() {
  this.$menuItem =  $('<div>').addClass('item').text("1 : ArcCloner").appendTo($('#menu'));

}

ArcScript.prototype.spawn = function() {
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

  var SUBDIVISIONS = 100;

  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(0.1, 1), G.rf(1, 2), 0);
  curve.v2 = new THREE.Vector3(G.rf(1, 3), 0, 0);

  var opacity = strandMat.attributes.opacity.value
  for (var j = 0; j < SUBDIVISIONS; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / SUBDIVISIONS))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, strandMat)
  strand.scale.set(G.rf(1, 10), G.rf(1, 10), 1)
  strand.rotation.set(0, G.rf(0, Math.PI * 2), 0)
  
  var strandObject = new Vizi.Object;
  var visual = new Vizi.Visual({object: strand});
  strandObject.addComponent(visual);
  this._object.addChild(strandObject);

  strand.material.attributes.opacity.needsUpdate = true

  //To keep things simple, lets grow the strand immediately upon creation. 
  growStrand(strand, 0)

  function growStrand(strand, vertexIndex) {
    var opacity = strand.material.attributes.opacity;
    opacity.value[vertexIndex++] = 1;
    opacity.needsUpdate = true
    if (vertexIndex === opacity.value.length) return

    setTimeout(function() {
      growStrand(strand, vertexIndex);
    }, 100)

  }
}