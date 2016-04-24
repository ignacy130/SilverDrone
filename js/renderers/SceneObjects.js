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
            mesh.material = material;
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

    var customMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {  },
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        }   );

    loadObject('./models/swiecacakulka.json',
                new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide}),
                150,3000,150,1,1,1,Math.PI / 2,0,0);

    loadObject('./models/terenjson.json',
        new THREE.MeshLambertMaterial({color: 0xD2691E, side: THREE.DoubleSide}),
        -2000,-200,-3000,5,5,5,Math.PI / 2,0,0);
    loadObject('./models/terenjson.json',
        new THREE.MeshLambertMaterial({color: 0xD2691E, side: THREE.DoubleSide}),
        2000,-200,-3000,5,5,5,Math.PI / 2,0,0);
    loadObject('./models/terenjson.json',
        new THREE.MeshLambertMaterial({color: 0xD2691E, side: THREE.DoubleSide}),
        -2000,-200,3000,5,5,5,Math.PI / 2,0,0);

    for(var i=0;i<25;i++){
        loadObject('./models/kamien.json',
            new THREE.MeshLambertMaterial({color: 0xD2691E, side: THREE.DoubleSide}),
            Math.random()*1000-500,-46,Math.random()*1000-500,Math.random()*5+1,Math.random()*5+1,Math.random()*5+1,2*Math.PI*Math.random(),2*Math.PI*Math.random(),2*Math.PI*Math.random());
    }

}
