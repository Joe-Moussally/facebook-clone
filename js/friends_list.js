let profile_id_list = localStorage.getItem('profile_id');
let friends_ul = document.getElementById('friends-list-ul');

console.log(friends_ul)

let data = new FormData()
data.append('profile_id',profile_id_list)

axios({
    method: 'POST',
    url: 'http://facebook/get_friends.php',
    data: data
}).then((Response) => {
    Response.data.forEach((user) => {
        friends_ul.innerHTML += '<li id="'+user.id+'" class="friend-li">'+
        '<img src="'+user.pic+'">'+
        '<span>'+user.username+'</span></li>'
    });
})

