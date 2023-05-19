document.addEventListener("DOMContentLoaded", function () {
    // Get the bookmark folders and populate the dropdown
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      var bookmarkFolders = getBookmarkFolders(bookmarkTreeNodes[0].children[1].children);
      var bookmarkFolderSelect = document.getElementById("bookmarkFolders");
  
      bookmarkFolders.forEach(function (folder) {
        var option = document.createElement("option");
        option.value = folder.id;
        option.text = folder.title;
        bookmarkFolderSelect.add(option);
      });
    });
  
    // Open the selected bookmark folder
    var openButton = document.getElementById("openButton");
    openButton.addEventListener("click", function () {
      var bookmarkFolderId = document.getElementById("bookmarkFolders").value;
      chrome.bookmarks.getChildren(bookmarkFolderId, function (bookmarkNodes) {
        bookmarkNodes.forEach(function (bookmarkNode) {
          if (bookmarkNode.url) {
            chrome.tabs.create({ url: bookmarkNode.url });
          }
        });
      });
    });
  });
  
  function getBookmarkFolders(bookmarkNodes) {
    var folders = [];
    bookmarkNodes.forEach(function (bookmarkNode) {
      if (bookmarkNode.children) {
        folders.push(bookmarkNode);
      }
    });
    return folders;
  }
  