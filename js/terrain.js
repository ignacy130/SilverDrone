var TerrainHelper = {
    generateHeight: function (width, height) {
        var data = new Uint8Array(width * height),
            perlin = new ImprovedNoise(),
            size = width * height,
            quality = 2,
            z = Math.random() * 100;
        for (var j = 0; j < 4; j++) {
            quality *= 4;
            for (var i = 0; i < size; i++) {
                var x = i % width,
                    y = ~~(i / width);
                data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * 0.5) * quality + 10;
            }
        }
        return data;
    },

    generateTexture: function (data, width, height) {
        var canvas, context, image, imageData,
            level, diff, vector3, sun, shade;
        vector3 = new THREE.Vector3(0, 0, 0);
        sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);
        image = context.getImageData(0, 0, width, height);
        imageData = image.data;
        for (var i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
            vector3.x = data[j - 1] - data[j + 1];
            vector3.y = 2;
            vector3.z = data[j - width] - data[j + width];
            vector3.normalize();
            shade = vector3.dot(sun);
            imageData[i] = (96 + shade * 128) * (data[j] * 0.007);
            imageData[i + 1] = (32 + shade * 96) * (data[j] * 0.007);
            imageData[i + 2] = (shade * 96) * (data[j] * 0.007);
        }
        context.putImageData(image, 0, 0);
        return canvas;
    },

    setUp: function (scene) {
        /* terrain */
        var sceneRef = scene;
        var data = this.generateHeight(1024, 1024);
        var texture = new THREE.CanvasTexture(this.generateTexture(data, 1024, 1024));
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.5
        });

        var quality = 16,
            step = 1024 / quality;
        var geometry = new THREE.PlaneGeometry(2000, 2000, quality - 1, quality - 1);
        geometry.rotateX(-Math.PI / 2);
        for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            var x = i % quality,
                y = Math.floor(i / quality);
            geometry.vertices[i].y = data[(x * step) + (y * step) * 1024] * 2 - 128;
        }
        mesh = new THREE.Mesh(geometry, material);
        sceneRef.add(mesh);
    },

    setUpRigidPlane: function () {
        world = new CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        var solver = new CANNON.GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;
        var split = true;
        if(split)
            world.solver = new CANNON.SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0,-20,0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.broadphase.useBoundingBoxes = true;

        physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3  // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        var nx = 50,
            ny = 8,
            nz = 50,
            sx = 0.5,
            sy = 0.5,
            sz = 0.5;

        // Create a sphere
        var mass = 5, radius = 1.3;
        sphereShape = new CANNON.Sphere(radius);
        sphereBody = new CANNON.Body({ mass: mass, material: physicsMaterial });
        sphereBody.addShape(sphereShape);
        sphereBody.position.set(nx*sx*0.5,ny*sy+radius*2,nz*sz*0.5);
        sphereBody.linearDamping = 0.9;
        world.addBody(sphereBody);

        // Create a plane
        var groundShape = new CANNON.Plane();
        groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        groundBody.position.set(0,0,0);
        world.addBody(groundBody);

        voxels = new VoxelLandscape(world,nx,ny,nz,sx,sy,sz);

        for(var i=0; i<nx; i++){
            for(var j=0; j<ny; j++){
                for(var k=0; k<nz; k++){
                    var filled = true;

                    // Insert map constructing logic here
                    if(Math.sin(i*0.1)*Math.sin(k*1) < j/ny*2-1)
                        filled = false;

                    voxels.setFilled(i,j,k,filled);

                }
            }
        }

        voxels.update();
    }
};