let user_id = localStorage.getItem('user_id');
let posts_ul = document.getElementById('feed-posts-ul');

if (user_id == null) {
    window.location.replace('http://facebook/html/login.html')
}

let data = new FormData();
data.append('user_id',user_id);

axios({
    method: 'POST',
    url: 'http://facebook/get_feed_posts.php',
    data: data
}).then((Response) => {
    console.log(Response.data)

    //populating ul
    Response.data.forEach((post) => {

        let postId = post.post_id;

        let data = new FormData()
        data.append('post_id',postId)

        

        posts_ul.innerHTML += '<li id="'+post.post_id+'">'+
        '<div class="post-header">'+
        '<img src="'+post.profile_picture+'" class="post-header-img">'+
        '<h2 onclick = "visitProfile(event.currentTarget)" id="'+post.user_id+'">'+post.username+'</h2></div>'+
        '<img src="'+post.photo+'" class="post-photo">'+
        '<div class="post-body">'+
        '<div class="like-comment">'+
        '<span class="like" onclick = handleLike(event.currentTarget)><i class="fa-regular fa-heart"></i></span>'+
        '<span class="comment"><i class="fa-regular fa-comment"></i></span>'+
        '<span class="post-likes"><span>'+post.likes+'</span> likes</span></div>'+
        '<div class="post-description">'+
        '<span class="post-description-username">'+post.username+'</span>'+
        '<span class="post-description">'+post.description+'</span></div>'+
        '<div class="add-comment"><textarea id="comment-input" name="comment" placeholder="Enter you comment here"></textarea><button id="submit-comment" onclick="handle_comment(event.currentTarget)">Submit</button></div>'+
        '<div class="post-comments">'+
        '<span class="comment-label">Comments</span>'+
        '<ul class="post-comments-ul" id="'+post.post_id+'-comments">'+
        '</ul></div><div class="post-footer">'+post.created_at+'</div>'+
        '</div><div class="hr"></div></li>';
    })
    get_post_comments()
});

//----------Adding visit user profile on click-----------
const visitProfile = (h2) => {
    console.log(h2.id)
    localStorage.setItem('profile_id',h2.id)
    window.location.replace('http://facebook/html/profile.html')
}

//---------ADDING LIKE FUNCTIONALITY-----------
const handleLike = (button) => {
    //getting the post id and like count
    let post_liked = button.parentElement.parentElement.parentElement;
    let like_count = button.nextElementSibling.nextElementSibling.children[0];
    let post_liked_id = button.parentElement.parentElement.parentElement.id;

    let like_count_int = Number(like_count.innerHTML)

    console.log(like_count_int)
    let post_data = new FormData()
    post_data.append('post_id', post_liked_id)

    if(button.parentElement.parentElement.parentElement.classList.contains('liked')) {
        post_liked.classList.remove('liked');

        $(like_count).html(like_count_int - 1)

    } else {
        post_liked.classList.add('liked');
        $(like_count).html(like_count_int + 1)

        axios({
            method: 'POST',
            url: 'http://facebook/add_like.php',
            data: post_data
        })

    }
}


//------------HANDLING SUBMIT COMMENT------------------
const handle_comment = (button) => {
    let comment = button.previousSibling.value;
    let post_id = button.parentElement.parentElement.parentElement.id;
    let user_id = localStorage.getItem('user_id');

    console.log("COMMENT", comment)

    let comment_data = new FormData();
    comment_data.append('user_id',user_id);
    comment_data.append('post_id',post_id);
    comment_data.append('comment',comment);

    axios({
        method:'POST',
        url:'http://facebook/submit_comment.php',
        data:comment_data
    }).then((Response) => {
        button.previousSibling.value = '';
        // let comment_ul = document.getElementById(post_id+'-comments');

        // comment_ul.innerHTML += '<li>'+
        // '<span class="post-comment-username">'+Response.data+'</span>'
    })
}


//GET COMMENTS OF POSTS
const get_post_comments = () => {

    let li_posts = document.getElementsByTagName('li');

    for (let i=0; i<li_posts.length; i++) {
        let ul_comment = document.getElementById(li_posts[i].id+'-comments')
        let comment_data = new FormData();
        comment_data.append('id',li_posts[i].id);

        axios({
            method: 'POST',
            url: 'http://facebook/get_post_comments.php',
            data: comment_data
        }).then((Response) => {
            Response.data.forEach((comment) =>{
                ul_comment.innerHTML += '<li>'+
                '<span class="post-comment-username">'+comment.username+'</span>'+
                '<span class="post-comment">'+comment.text+'</span>'+
                '</li>'
            })
        })
    }
    
}