const urlInput = document.getElementById("gitURL"); // Username intered in the input box
const baseApi = "https://api.github.com/users/"

function submitURL(event){ // This function is the main function which is called and consists of several parts
    console.log(urlInput.value);
    
    // Here we get elements of HTML file to modify them
    const avatar = document.getElementsByClassName("photo")[0];
    const fullName = document.getElementById("full-name");
    const blog = document.getElementById("blog");
    const location = document.getElementById("location");
    const bio = document.getElementById("bio");

    function setElements(item){ // This function changes elements of HTML file
      avatar.src = "./assets/avatar.png";
      avatar.src = item.avatar_url;
      fullName.innerHTML = item.name;
      blog.href = item.blog;
      blog.innerHTML = "Link to Blog";
      location.innerHTML = item.location;
      bio.innerHTML = item.bio;
    }

    function resetPage(){ // This function resets the page as the input is invalid
      avatar.src = "./assets/avatar.png";
      fullName.innerHTML = "No User Found!";
      blog.href = "";
      blog.innerHTML = "";
      location.innerHTML = "Enter Valid GitHub UserName →";
      bio.innerHTML = "";
    }

    function saveElement(item, username){ // This function saves the data to local storage to use it later
      localStorage.setItem(username, JSON.stringify(item));
    }

    function fetchData(){ // If the data doesn't exist in local storage, this function is called to fetch data from API
      const username = urlInput.value; 
      fetch(baseApi + username)
      .then((response) => response.json())
      .then((data) => {
  
        if(data.name){
          const item = { // Saving the elements we need from data in an object to save it later
            avatar_url : data.avatar_url,
            name : data.name,
            blog : data.blog,
            location : data.location,
            bio : data.bio,
          }
          setElements(item); // Modify the page with new data
          saveElement(item, username); // Save the fetched data
        } else{
          console.log("ERROR!");
          resetPage(); // Show error message if the input is invalid
        }
      });
    }

    const savedItem = localStorage.getItem(urlInput.value); // Getting data from local stroage
    if (savedItem){
      setElements(JSON.parse(savedItem)); // If data exists in local storage, use it
    } else{
      fetchData(); // Fetch data when it is not available in local storage
    }

    urlInput.value = ""; // Clear the input field

}