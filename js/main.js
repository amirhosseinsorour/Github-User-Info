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

    function setElements(item){
      avatar.src = "./assets/avatar.png";
      avatar.src = item.avatar_url;
      fullName.innerHTML = item.name;
      blog.href = item.blog;
      blog.innerHTML = "Link to Blog";
      location.innerHTML = item.location;
      bio.innerHTML = item.bio;
    }

    function resetPage(){
      avatar.src = "./assets/avatar.png";
      fullName.innerHTML = "No User Found!";
      blog.href = "";
      blog.innerHTML = "";
      location.innerHTML = "Enter Valid GitHub UserName →";
      bio.innerHTML = "";
    }

    function saveElement(item, username){
      localStorage.setItem(username, JSON.stringify(item));
      console.log(username);
      console.log(item);
    }

    function fetchData(){
      const username = urlInput.value; 
      fetch(baseApi + username)
      .then((response) => response.json())
      .then((data) => {
  
        if(data.name){
          console.log(data);
          const item = {
            avatar_url : data.avatar_url,
            name : data.name,
            blog : data.blog,
            location : data.location,
            bio : data.bio,
          }
          setElements(item);
          saveElement(item, username);
        } else{
          console.log("ERROR!");
          resetPage();
        }
      });
    }

    const savedItem = localStorage.getItem(urlInput.value);
    console.log(savedItem);
    if (savedItem){
      setElements(JSON.parse(savedItem));
    } else{
      fetchData();
    }

    urlInput.value = "";

}