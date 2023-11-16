document.addEventListener("DOMContentLoaded", function () {
   var defaultFolder = "Images";
   var instanceRoot = document.getElementById("instance-root");
   var username = document.getElementById("username");
   var password = document.getElementById("password");
   var folder = document.getElementById("folder");
   chrome.storage.sync.get(["instance-root", "username", "password", "folder"], function (data) {
      instanceRoot.value = data.instanceRoot || "";
      username.value = data.username || "";
      password.value = data.password || "";
      folder.value = data.folder || defaultFolder;
   });
});

document.addEventListener("DOMContentLoaded", function () { 
   var instanceRoot = document.getElementById("instance-root");
   var username = document.getElementById("username");
   var password = document.getElementById("password");
   var folder = document.getElementById("folder");
   document.getElementById("submit").addEventListener("click", function (event) {
      event.preventDefault();
      chrome.storage.sync.set({
         instanceRoot: instanceRoot.value,
         username: username.value,
         password: password.value,
         folder: folder.value
      }, function () {
      alert("Options saved.");
      });
   });
});