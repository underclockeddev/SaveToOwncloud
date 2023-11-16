chrome.contextMenus.create({
   title: "Save image to OwnCloud folder",
   contexts: ["image"],
   onclick: saveImage
});

function saveImage(info, tab) {
    var imageUrl = info.srcUrl;

   chrome.storage.sync.get(["instanceRoot", "username", "password", "folder"], function (data) { 
      if (data.username && data.password && data.folder) { 
         var credentials = btoa(data.username + ":" + data.password);
        var webdavUrl = data.instanceRoot + "/remote.php/webdav/" + data.folder + "/";
        
        fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            var fileName = Date.now() + "." + blob.type.split("/")[1];
            
            fetch(webdavUrl + fileName, {
                method: "PUT",
                headers: {
                    Authorization: "Basic " + credentials
                },
                     body: blob
                    })
                    .then((response) => {
                        if (response.ok) {
                            let alertMessage = "Image saved successfully to " + data.instanceRoot + "/remote.php/webdav/" + data.folder + "!";

                            chrome.tabs.query({active: true, currentWindow: true }, function(tabs) {
                                var tabId = tabs[0].id;
                                chrome.tabs.executeScript(tabId, { file: './alert.js' }, function() {
                                    chrome.tabs.executeScript(tabId, {
                                        code: 'showStatusAlert("' + alertMessage.replace(/"/g, '\\"') + '", 5000);'
                                    });
                                });
                            });
                        } else {
                            alert("Image saving failed: " + response.statusText);
                        }
                    })
                    .catch((error) => {
                        alert("Image saving failed: " + error.message);
                    });
                })
                .catch((error) => {
                    alert("Image fetching failed: " + error.message);
                });
            } else {
         alert(
            "Please set your OwnCloud username, password, and folder in the extension options."
         );
      }
   });
}