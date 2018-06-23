var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2.2, -1), scene);

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 0, 1000));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

	// var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// light.diffuse = new BABYLON.Color3(1, 0, 0);


    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 7, -5), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;

    var light2 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -8, -5), scene);



	// ======= START Skybox for 360 videos ======
	// var skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", {size:500.0}, scene);
	// var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	// skyboxMaterial.backFaceCulling = false;
    //
	// var videoTexture = new BABYLON.VideoTexture("video", ["assets/videos/video_360.mp4"], scene, false, false);
    // videoTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    // videoTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
    // videoTexture.video.crossOrigin = "anonymous";
    //
	// skyboxMaterial.reflectionTexture = videoTexture;
	// skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
	// skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	// skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	// skybox.material = skyboxMaterial;

    //======= END Skybox for 360 videos ======


    // ======= START 2d video ======
    var plane = BABYLON.MeshBuilder.CreatePlane("plane1", {size: 15, sideOrientation: 2}, scene);

    plane.rotation.z = -Math.PI;
    plane.rotation.y = -Math.PI;

    // Y-axis to move the screen up or down
    plane.position.y = 3.5;

    // Z-axis to move the screen left or right
    plane.position.z = 10;


    var mat = new BABYLON.StandardMaterial("mat", scene);
    var videoTexture = new BABYLON.VideoTexture("video", ["assets/videos/Austria.webm"], scene, true, true);

    mat.diffuseTexture = videoTexture;
    plane.material = mat;
    // ======= END 2d video ======


    scene.onPointerUp = function () {
		videoTexture.video.play();
	};

    // For 360 videos
    // scene.createDefaultVRExperience();

    return scene;

};



var createFirstPersonScene = function () {

    var firstPersonScene = new BABYLON.Scene(engine);
    firstPersonScene.autoClear = false;

    // Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 7 * Math.PI / 16, 10, BABYLON.Vector3.Zero(), firstPersonScene);


    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), firstPersonScene);

    var assetsManager = new BABYLON.AssetsManager(scene);

    var meshTask = assetsManager.addMeshTask("main-car-task", "",
        "assets/cars/1967-shelby-ford-mustang/",
        "mustang.babylon");

    var steering_wheel;
    meshTask.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            if (task.loadedMeshes[i].id === "3DSMesh_24_6") {
                steering_wheel = task.loadedMeshes[i];

            }
            if (task.loadedMeshes[i].id === "3DSMesh_10_0") {
                task.loadedMeshes[i].isVisible = false;
            }
            task.loadedMeshes[i].scaling = new BABYLON.Vector3(1.7, 1.7, 1.7);
            task.loadedMeshes[i].parent = carBody;
            task.loadedMeshes[i].position = new BABYLON.Vector3(0, 0, 0);
            task.loadedMeshes[i].rotation.y = -Math.PI / 2;
            task.loadedMeshes[i].parent = carBody;
            if (steering_wheel) {
                steering_wheel.position.x = -0.9;
                steering_wheel.position.y = 2.8;
                steering_wheel.position.z = -1.5;
            }
        }


    };


    assetsManager.load();

    return firstPersonScene;
}