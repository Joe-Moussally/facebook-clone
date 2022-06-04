let profileId = localStorage.getItem('profile_id') //getting id of profile clicked on
let url1 = 'http://facebook/profile.php';
let url2 = 'http://facebook/get_profile_posts.php'
let url3 = 'http://facebook/get_post_comments.php'
var postsArray;

//HTML Elements
let username = document.getElementById('profile-username')
let profilePicture = document.getElementById('profile-picture-header')
let friendsCount = document.getElementById('friends-count')

let data1 = new FormData();
data1.append('id',profileId)

//profile body HTML Elements
let postsUl = document.getElementById('posts-container-ul')



console.log(profileId)

document.onload = (
    axios({
        method: 'POST',
        url: url1,
        data: data1
    }).then((Response) => {
        //populate HTML here
        //------------------
        username.innerHTML = Response.data[0].username;
        profilePicture.src = Response.data[0].profile_picture;
        friendsCount.innerHTML = Response.data[0].friends + ' friends';
        }

))

axios({
    method: 'POST',
    url: url2,
    data: data1
}).then((Response) => {
    console.log(Response.data)

    //populating ul
    Response.data.forEach((post) => {

        let postId = post.post_id;

        let data = new FormData()
        data.append('post_id',postId)

        

        postsUl.innerHTML += '<li id="'+post.post_id+'">'+
        '<div class="post-header">'+
        '<img src="'+post.profile_picture+'" class="post-header-img">'+
        '<h2>'+post.username+'</h2><button class="delete-post-button">Delete post</button></div>'+
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

    //adding delete button functionality
    let deleteButton = $('.delete-post-button');
    $(deleteButton).on('click', (e) => {
        console.log($(e.currentTarget).parent().parent()[0].id)
        let li = $(e.currentTarget).parent().parent()[0]
        let post_id = $(e.currentTarget).parent().parent()[0].id
        $(li).fadeOut(200);

        let data = new FormData()
        data.append('post_id',post_id);

        axios({
            method: 'POST',
            url: 'http://facebook/delete_post.php',
            data: data

        }).then((Response) => {
            console.log("DELETED")
            
            
        })

    })
    
})




//upload post-----------------------
document.getElementById('add-post').addEventListener('click',()=>{
    window.location.replace('http://facebook/html/add_post.html')
})

//Adding event listener to friends list
let friends = document.getElementById('friends-count')

console.log(friends)

friends.addEventListener('click', () => {
    window.location.replace('http://facebook/html/friends_list.html')
})