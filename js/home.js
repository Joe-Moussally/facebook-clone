let user_id = localStorage.getItem('user_id');
let posts_ul = document.getElementById('feed-posts-ul');

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
        '<span class="like"><i class="fa-regular fa-heart"></i></span>'+
        '<span class="comment"><i class="fa-regular fa-comment"></i></span>'+
        '<span class="post-likes">'+post.likes+' likes</span></div>'+
        '<div class="post-description">'+
        '<span class="post-description-username">'+post.username+'</span>'+
        '<span class="post-description">'+post.description+'</span></div>'+
        '<div class="add-comment"></div>'+
        '<div class="post-comments">'+
        '<span class="comment-label">Comments</span>'+
        '<ul class="post-comments-ul" id="'+post.post_id+'-comments">'+
        '</ul></div><div class="post-footer">'+post.created_at+'</div>'+
        '</div><div class="hr"></div></li>';
    })
});

//----------Adding visit user profile on click-----------
const visitProfile = (h2) => {
    console.log(h2.id)
    localStorage.setItem('profile_id',h2.id)
    window.location.replace('http://facebook/html/profile.html')
}