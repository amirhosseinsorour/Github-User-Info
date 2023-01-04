const urlInput = document.getElementById("gitURL");

// const submitButton = document.getElementsByClassName("submit-button")[0];
// submitButton.addEventListener("click", function (){console.log('hi');});

const baseApi = "https://api.github.com/users/"

function submitURL(event){
    console.log(urlInput.value);
    
    const avatar = document.getElementsByClassName("photo")[0];
    const fullName = document.getElementById("full-name");
    const blog = document.getElementById("blog");
    const location = document.getElementById("location");
    const bio = document.getElementById("bio");

fetch(baseApi + urlInput.value)
  .then((response) => response.json())
  .then((data) => {
    if(data.name){
        console.log(data);
        avatar.src = "./assets/avatar.png";
        avatar.src = data.avatar_url;
        fullName.innerHTML = data.name;
        blog.href = data.blog;
        blog.innerHTML = "Link to Blog";
        location.innerHTML = data.location;
        bio.innerHTML = data.bio;
    } else{
        console.log("ERROR");
        avatar.src = "./assets/avatar.png";
        fullName.innerHTML = "No User Found!";
        blog.href = "";
        blog.innerHTML = "";
        location.innerHTML = "";
        bio.innerHTML = "";
    }
  });

    urlInput.value = "";

}