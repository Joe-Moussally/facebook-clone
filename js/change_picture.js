let photo = document.getElementById('photo');
let url2 = 'http://facebook/change_picture.php'
let user_id_picture = localStorage.getItem('user_id');
let base64;


//adding event listener to uplaod button

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.getElementById('upload-post-button').addEventListener('click',function(e) {

    e.preventDefault();

    const uploadedFile = document.querySelector('#photo').files[0];
    toBase64(uploadedFile)
    .then(res => {
        console.log(res)

        let data2 = new FormData();
        data2.append('user_id',user_id_picture)
        data2.append('base64',res)
    
        axios({
            method: 'POST',
            url: url2,
            data:data2,
        }).then((Response) => {
            window.location.replace('http://facebook/html/home.html')
        })

    })
    .catch(err => {
        console.log(err);
    })
});