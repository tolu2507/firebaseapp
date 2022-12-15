document.addEventListener("deviceready", onReady, false);
function onReady() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("btn").addEventListener("click", openCamera);

  document.getElementById("nav-btn").addEventListener("click", getMapLocation);
  loadFirebase();
  checkApp();
  function setOptions(srcType) {
    var options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      cameraDirection: Camera.Direction.BACK,
      correctOrientation: true,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
    };
    return options;
  }

  function openCamera(selection) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(cameraSuccess, cameraError, options);

    function cameraSuccess(imageUri) {
      displayImage(imageUri);
    }
    function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");
    }
  }

  function displayImage(imgUri) {
    var elem = document.getElementById("main-body-img");
    elem.src = "data:image/jpeg;base64," + imgUri;
  }

  function onSuccess(position) {
    const element = document.getElementById("map");
    element.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "\n" +
      "Longitude: " +
      position.coords.longitude;
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    const element = document.getElementById("map");
    element.innerHTML =
      "code: " + error.code + "\n" + "message: " + error.message + "\n";
  }

  function getMapLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  function loadFirebase() {
    FirebasePlugin.getToken(
      function (fcmToken) {
        console.log(`YOUR TOKEN IS: ${fcmToken}`);
      },
      function (error) {
        console.error(`YOUR ERROR IS: ${error}`);
      }
    );
    FirebasePlugin.getId(
      function (appInstanceId) {
        console.log(`YOUR ID IS: ${appInstanceId}`);
      },
      function (error) {
        console.error(`YOUR ERROR IS: ${error}`);
      }
    );
  }

  function checkApp() {
    FirebaseApp.initializeApp(/*context=*/ this);
    FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
      PlayIntegrityAppCheckProviderFactory.getInstance()
    );
  }
}
