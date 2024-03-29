angular-file-upload
===================


**Here is the <a href="http://angular-file-upload.appspot.com/" target="_blank">DEMO</a>**

Lightweight Angular JS directive to upload files. Features:
* File upload for `HTML5` and `non-HTML5` browsers with Flash polyfill [FileAPI](https://github.com/mailru/FileAPI). Allows client side validation before uploading the file
* Uses regular `$http` to upload (with shim for non-HTML5 browsers) so all angular `$http` features are available
* Supports upload progress
* Supports cancel/abort upload while in progress
* Supports File drag and drop (HTML5 only)
* Supports Directory drag and drop (webkit only)
* Supports CORS
* All `non-HTML5` code is in a separate shim file and could be easily removed if you only supports `HTML5`. (It is needed for `progress` event though)
* Flash `FileAPI` will be loaded on demand for `non-HTML5` FormData browsers so no extra load for `HTML5` browsers.
* `$upload` method can be configured to be either `POST` or `PUT` for HTML5 browsers.
* `$upload.http()` enables progress event for angular http `POST`/`PUT` requests. You can upload file content with the `Content-Type` of the file to CouchDB, imgur, etc... for `HTML5` `FileReader` browsers. See [#88(comment)](https://github.com/danialfarid/angular-file-upload/issues/88#issuecomment-31366487) for discussion and usage.

## Usage

HTML:
```html
<!-- shim is needed to support upload progress/abort for HTML5 and non-HTML5 FormData browsers.-->
<!-- use html5-shim.js instead if you just support HTML5 browsers and you need progress event-->
<!-- Note: shim.js MUST BE PLACED BEFORE angular.js and angular-file-upload.js AFTER angular.js-->
<script src="angular-file-upload-shim.min.js"></script> 
<script src="angular.min.js"></script>
<script src="angular-file-upload.min.js"></script> 

<div ng-controller="MyCtrl">
  <input type="text" ng-model="myModelObj">
  <input type="file" ng-file-select="onFileSelect($files)">
  <input type="file" ng-file-select="onFileSelect($files)" multiple accept="image/*">
  <div class="button" ng-file-select="onFileSelect($files)" data-multiple="true"></div>
  <div ng-file-drop="onFileSelect($files)" ng-file-drag-over-class="optional-css-class-name-or-function"
        ng-show="dropSupported">drop files here</div>
  <div ng-file-drop-available="dropSupported=true" 
        ng-show="!dropSupported">HTML5 Drop File is not supported!</div>
  <button ng-click="upload.abort()">Cancel Upload</button>
</div>
```

JS:
```js
//inject angular file upload directives and service.
angular.module('myApp', ['angularFileUpload']);

var MyCtrl = [ '$scope', '$upload', function($scope, $upload) {
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Desposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
}];
```

**Order of scripts**: `angular-file-upload-shim.js` must be loaded before `angular.js` and is only needed if you are supporting non-HTML5 FormData browsers or you need to support upload progress or cancel.

**Upload multiple files**: Only for HTML5 FormData browsers (not IE8-9) if you pass an array of files to `file` option it will upload all of them together in one request. In this case the `fileFormDataName` could be an array of names or a single string. For Rails or depending on your server append square brackets to the end (i.e. `file[]`).
If you want a cross browser approach you need to iterate through files and upload them one by one like the code above. This is due to the limitation of Flash file upload.

**$upload.http()**: You can also use `$upload.http()` to send the file binary or any data to the server while being able to listen to progress event. See [#88](https://github.com/danialfarid/angular-file-upload/issues/88) for more details.
This equivalent to angular $http() but allow you to listen to progress event for HTML5 browsers.

**Rails progress event**: If your server is Rails and Apache you may need to modify server configurations for the server to support upload progress. See [#207](https://github.com/danialfarid/angular-file-upload/issues/207)

**drag and drop styling**: For file drag and drop, ng-file-drag-over-class can be a function that returns a class name based on the $event. See the demo for a sample. If the attribute is not specified by default the element will have "dragover" class on drag over which could be used to style the drop zone. 

## Old browsers

For browsers not supporting HTML5 FormData (IE8, IE9, ...) [FileAPI](https://github.com/mailru/FileAPI) module is used. 
For these browsers these two files are needed:  **`FileAPI.min.js`, `FileAPI.flash.swf`** which will be loaded if the browser does not supports HTML5 FormData (no extra load for HTML5 browsers).

**Note**: Flash needs to be installed on the client browser since `FileAPI` uses Flash to upload files.

You can put these two files beside `angular-file-upload-shim(.min).js` on your server to be loaded automatically on demand or use the following script to set the FileAPI load path for example if you are using CDN (optional):
```html
<script>
    //optional need to be loaded before angular-file-upload-shim(.min).js
    FileAPI = {
        //only one of jsPath or jsUrl.
        jsPath: '/js/FileAPI.min.js/folder/', 
        jsUrl: 'yourcdn.com/js/FileAPI.min.js',
        
        //only one of staticPath or flashUrl.
        staticPath: '/flash/FileAPI.flash.swf/folder/',
        flashUrl: 'yourcdn.com/js/FileAPI.flash.swf',

        //forceLoad: true, html5: false //to debug flash in HTML5 browsers
    }
</script>
<script src="angular-file-upload-shim.min.js"></script>...
```
**Old browsers known issues**: 
* Because of a Flash limitation/bug the server needs to send a response body in order for the success and error callbacks to work properly. See [163#issuecomment](https://github.com/danialfarid/angular-file-upload/issues/163#issuecomment-39839508)
* Custom headers will not work due to a Flash limitation [#111](https://github.com/danialfarid/angular-file-upload/issues/111) [#224](https://github.com/danialfarid/angular-file-upload/issues/224) [#129](https://github.com/danialfarid/angular-file-upload/issues/129)
* Due to Flash bug [#92](https://github.com/danialfarid/angular-file-upload/issues/92) Server HTTP error code 400 will be returned as 200 to the client. So avoid returning 400 on your server side for upload response otherwise it will be treated as a success response on the client side.

##Server side samples
* **Amazon S3 Upload**: [nukulb](https://github.com/nukulb) has provided an example here https://github.com/hubba/s3-angular-file-upload
* **Node.js**: Sample wiki page provided by [chovy](https://github.com/chovy)

## Install

Download latest release from [here](https://github.com/danialfarid/angular-file-upload-bower/releases) or 
```sh
#notice 'ng' at the beginning of the module name not 'angular'
bower install ng-file-upload 
```
Make sure to load the scripts in your html file exactly in this order as described in the Usage: 
```html
<script src="angular-file-upload-shim(.min).js"></script> 
<script src="angular(.min).js"></script>
<script src="angular-file-upload(.min).js"></script> 
```

Or for yeoman with bower automatic include:
```
bower install ng-file-upload -save
bower install ng-file-upload-shim -save
```
bower.json
```
{
  "dependencies": [..., "ng-file-upload-shim", "angularjs", "ng-file-upload", ...],
}
```


You can find the sample server code in Java/GAE [here](https://github.com/danialfarid/angular-file-upload/blob/master/demo/src/com/df/angularfileupload/FileUpload.java).

If you use this module you can give it a thumbs up at [http://ngmodules.org/modules/angular-file-upload](http://ngmodules.org/modules/angular-file-upload).

Let [me](https://github.com/danialfarid) know if you have any questions. Bug report, feature request: [issue](https://github.com/danialfarid/angular-file-upload/issues).  
  If you like the plugin get me a <a target="_blank" href="http://angular-file-upload.appspot.com/donate.html">cup of tea <img src="http://angular-file-upload.appspot.com/img/tea.png" width="40" height="24" title="Icon made by Freepik.com"></a> so I add features and fixes faster.




