var starsGenerator = {

    generateStars: function (scene) {
        var spheres = [];
        var textureCube = new THREE.CubeTextureLoader().load( urls );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
        for ( var i = 0; i < 500; i ++ ) {
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = Math.random() * 10 - 5;
            mesh.position.y = Math.random() * 10 - 5;
            mesh.position.z = Math.random() * 10 - 5;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
            scene.add( mesh );
            spheres.push( mesh );
        }
        // Skybox
        var shader = THREE.ShaderLib[ "cube" ];
        shader.uniforms[ "tCube" ].value = textureCube;
        var material = new THREE.ShaderMaterial( {
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                side: THREE.BackSide
            } ),
            mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
        scene.add( mesh );
    }



	
};