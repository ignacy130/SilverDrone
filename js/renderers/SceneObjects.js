/**
 * Created by admin on 4/23/2016.
 */
var mesh = null;
function initMesh(scene) {
    var loader = new THREE.JSONLoader();
    loader.load('./models/station_concept_sizex15.json', function(geometry) {
        mesh = new THREE.Mesh(geometry);
        mesh.rotateX( Math.PI / 2);
        mesh.material.color.setHex( 0xffffff );
        mesh.position.x = 350;
        mesh.position.y = -35;
        mesh.scale.x = 4;
        mesh.scale.y = 4;
        mesh.scale.z = 4;
        scene.add(mesh);

        var m2 = mesh.clone();
        m2.position.z = 150;
        scene.add(m2);
    });
}