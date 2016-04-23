/**
 * Created by admin on 4/23/2016.
 */
checkIfObjectIsVisible = function(camera, object){
    //trzeba to umiescic w metodzie animate() w indeksie - wtedy bd sprawdzac co klatke ((chyba xD))
    var frustum = new THREE.Frustum();
    var cameraViewProjectionMatrix = new THREE.Matrix4();

    // every time the camera or objects change position (or every frame)

    camera.updateMatrixWorld(); // make sure the camera matrix is updated
    camera.matrixWorldInverse.getInverse( camera.matrixWorld );
    cameraViewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    frustum.setFromMatrix( cameraViewProjectionMatrix );

    // frustum is now ready to check all the objects you need

    return  frustum.intersectsObject(object);
}
