// Listen for form submit

document.querySelector('#myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.querySelector('#siteName').value;
    var siteUrl = document.querySelector('#siteUrl').value;

    // Form Validation... function at the bottom
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    // Local Storage (object)
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /* Local Storage Example 
        localStorage.setItem('test', 'Hello World');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks are null
    if(localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Turn our array into a string
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // Turns a JSON back into a string
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form when submit
    document.querySelector('#myForm').reset();

    // Re-fetch bookmarks, calling when new bookmark is added.
    fetchBookmarks();

    // Prevent form submission
    e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        // Re-fetch bookmarks, if this is not here it will only disappear after reload
        fetchBookmarks();
}

// Fetch bookmarks

function fetchBookmarks() {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.querySelector('#bookmarksResults');

    // Print output on HTML
    bookmarksResults.innerHTML = '';
    // Loop through all bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name // Get name of current iteration [i]
        var url = bookmarks[i].url // Get url of current iteration [i]
// Append
        bookmarksResults.innerHTML += '<div class="card bg-light p-3 mb-2">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-outline-secondary" target="_blank" href="'+url+'">Visit</a>' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                        '</h3>'+
                                        '</div>'; 
    }
}

// Validate form
function validateForm(siteName, siteUrl) {
    // Validation if empty
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    // regex url validation
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}