let profileId = localStorage.getItem('profile_id') //getting id of profile clicked on
let url1 = 'http://facebook/profile.php';
let data = new FormData();
data.append('id',profileId)

document.onload = (
    axios({
        method: 'POST',
        url: url1,
        data: data
    }).then((Response) => {
        //populate HTML here
        //------------------
        

        }
        //on succesful response get number of friends

    )
)