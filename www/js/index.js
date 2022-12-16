document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  $(document).ready(function () {
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
    $("#camera").click(openCamera);
    const rootUrl = "https://tolulopebamisile.000webhostapp.com/";

    const url = `${rootUrl}/wp-json/wp/v2/posts`;
    const mediaUrl = `${rootUrl}wp-json/wp/v2/media`;
    const tokenUrl = `${rootUrl}/wp-json/jwt-auth/v1/token`;

    let token;

    $(".data").hide();
    $(".view").hide();
    $(".app-page").hide();

    $("form").submit(async function (event) {
      event.preventDefault();

      const userDet = {
        name: $("input[name=username]").val(),
        password: $("input[name=password]").val(),
        email: $("input[name=email]").val(),
      };
      const adminDet = { username: "admin", password: "Webhost1234##" };
      console.log(adminDet);

      $.post(tokenUrl, adminDet, function (data, status) {
        console.log("token: " + data.token);
        console.log(data);
        console.log("status : " + status);
        token = data.token;
      });

      if (token !== null || token !== undefined) {
        $(".login").hide();
        $(".view").show();
        $(".app-title").append(`  Welcome ${userDet.name}`);
        $(".app-page").show();
      }
    });

    $("#validated").click(function () {
      console.log("NEW : " + token);
      console.log("i am sending a data");
      let data = $(".data").text();
      console.log(data);
      let location = $(".location").text();
      let contents = $("input[name=report-content]").val();
      const formData = {
        title: $("input[name=report-title").val(),
        content: `<img src=${data} alt=an-img />\n<p>Description: ${contents}</p>\n<p>Location: ${location}</p>`,
        status: "publish",
      };

      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(formData),
        crossDomain: true,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          console.log(data);
          loadData();
        },
        error: function (error) {
          console.log(error);
        },
      });
    });

    function loadData() {
      $.getJSON(url, function (data) {
        console.log(data);
        $(".main").empty();

        for (let i = 0; i < data.length; i++) {
          const div = document.createElement("div");
          div.innerHTML = `
 <div class="card-p1">
 <div class="card-body">
 <h4 class="card-title">${data[i].title.rendered}</h4>
 <p class="card-text textwrap">${data[i].content.rendered}</p>
 </div>
 </div>
 `;
          $(".main").append(div);
        }
      });
    }

    function setOptions(srcType) {
      const options = {
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
      const srcType = Camera.PictureSourceType.CAMERA;
      const options = setOptions(srcType);

      navigator.camera.getPicture(cameraSuccess, cameraError, options);

      function cameraSuccess(imageUri) {
        displayImage(imageUri);
      }
      function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
      }
    }

    function displayImage(imgUri) {
      $(".data").text("data:image/jpeg;base64," + imgUri);
      $("#img-data").attr("src", "data:image/jpeg;base64," + imgUri);
      $(".data").hide();
    }
  });
  return false;
}
