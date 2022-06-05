let search_input = document.getElementById('nav-search');
let search_ul = document.getElementById('search-output');

const get_result = (value) => {

    search_ul.innerHTML = '';
    let data = new FormData();
    data.append('name',value);


    if (value != '') {
        axios({
            method:'POST',
            url:'http://facebook/search.php',
            data:data
        }).then((Response) => {
            console.log(Response.data)
            Response.data.forEach( (user) => {
                search_ul.innerHTML += '<li>'+
                '<img src="'+user.profile_picture+'" >'+
                '<span onclick = "visitProfile(event.currentTarget)" id="'+user.id+'">'+user.username+'</span></li>'
            });
        })
    }
}

{/* <li>
<img src="../db/assets/profile_picture.jpg" >
<span>Username</span>
</li> */}