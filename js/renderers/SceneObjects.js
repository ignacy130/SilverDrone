/**
 * Created by admin on 4/23/2016.
 */
var mesh = null;
function initMesh(scene) {
    var loader = new THREE.JSONLoader();
    loader.load('./models/station_concept_plus90.json', function(geometry) {
        mesh = new THREE.Mesh(geometry);
        mesh.rotateZ( Math.PI / 2);
        mesh.material.color.setHex( 0xffffff );
        mesh.position.x = 150;
        scene.add(mesh);
    });
}