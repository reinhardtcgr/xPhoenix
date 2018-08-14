(function () {
    // TODO: ajax call for GET /api/posts

    // TODO: create text toolbar to edit the text in the boxes
    // bold + italix + H1 H2 H3 H4 P + bullet point +
    // TODO: Create sidebar with diff headers

    var boardID = 'post-board';
    var theBoard = document.getElementById(boardID);

    function _createDeleteButton() {
        var deleteButton = document.createElement('a');
        var deleteClasses = [
            'delete',
            'is-pulled-right'
        ];
        deleteButton.setAttribute('class', deleteClasses.join(' '));

        return deleteButton;
    }

    function _createDefaultPostContent() {
        var postContent = document.createElement('p');
        var postText = document.createTextNode('Edit Me!');
        postContent.appendChild(postText);

        return postContent;
    }

    function _createBasicPost() {
        var newPost = document.createElement('div');
        newPost.appendChild(_createDeleteButton());
        newPost.appendChild(_createDefaultPostContent());

        var postClasses = ['a-post', 'box'];
        newPost.setAttribute('class', postClasses.join(' '));
        // newPost.setAttribute('contenteditable', true); //TODO: turn on later
        // TODO: unfocus to save Post text

        return newPost;
    }

    function _addPostEvents(newPost) {
        newPost.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('>>> post mousedown');

            newPost.onmousemove = function(e) {
                e.preventDefault();
                console.log('>>> post moving');
                newPost.style.left = e.pageX;
                newPost.style.top = e.pageY;
                //NOTE: this doesn't work unless you are above the post
            };

            newPost.onmouseup = function(e) {
                e.stopPropagation();
                newPost.onmousemove = null;
                console.log('>>> post mouse up');
                //NOTE: this doesn't work unless you are above the post
            };
        }, false);

        return newPost;
    }

    theBoard.addEventListener('mousedown', function (e) {
        e.preventDefault();
        console.log('>>> board mousedown');

        var newPost = _createBasicPost();

        // https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
        var postOriginX = e.pageX;
        var postOriginY = e.pageY;
        newPost.style.position = 'absolute';
        newPost.style.left = postOriginX + 'px';
        newPost.style.top = postOriginY + 'px';

        var height = 80;
        var width = 130;
        newPost.style.height = height + 'px';
        newPost.style.width = width + 'px';
        // TODO: click and drag to create text boxes of a specific size and location

        // Mouse down event for Post
        _addPostEvents(newPost)

        theBoard.appendChild(newPost);

        theBoard.onmousemove = function(e) {
            e.preventDefault();
            console.log('>>> board moving');

            // TODO: delete and create new post in order to get proper dimensions
            
            var postWidth = e.pageX - postOriginX;
            var postHeight = e.pageY - postOriginY;
            console.log('>>> board X = ' + e.pageX + ' >> width = ' + postWidth);
            console.log('>>> board Y = ' + e.pageY + ' >> height = ' + postHeight);
            newPost.style.width = postWidth;
            newPost.style.height = postHeight;
            theBoard.appendChild(newPost);
        };

        theBoard.onmouseup = function() {
            e.stopPropagation();
            theBoard.onmousemove = null;
            console.log('>>> board mouse up');
        };
    }, false);

})();
