/**
 * Created by admin on 4/23/2016.
 */
function getMarsBase(scene) {
    var loader = new THREE.JSONLoader();

    var loadBases = function () {
        var mesh = null;
        loader.load('./models/station_concept_sizex15.json', function (geometry) {
            mesh = new THREE.Mesh(geometry);
            mesh.rotateX(Math.PI / 2);
            var colorMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
            mesh.material = colorMaterial;
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

    var loadObject = function(src,material,x,y, z, scaleX,scaleY,scaleZ,rotateX,rotateY,rotateZ){
        var mesh = null;
        loader.load(src, function (geometry) {
            mesh = new THREE.Mesh(geometry);
            mesh.rotateX(rotateX);
            mesh.rotateY(rotateY);
            mesh.rotateZ(rotateZ);
            var colorMaterial = material
            mesh.material = colorMaterial;
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            mesh.scale.x = scaleX;
            mesh.scale.y = scaleY;
            mesh.scale.z = scaleZ;
            scene.add(mesh);
        });
    }

    loadBases();
    loadObject('./models/gwiazdozbiory_x15.json',
                new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.DoubleSide}),
                0,0,0,3,3,3,Math.PI / 2,0,0)
}
