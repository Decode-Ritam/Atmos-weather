const searchtoggle = document.querySelector('.search-icon-toggle');

const close = document.querySelector('.close');
const searchbarIcon = document.querySelector('.searchbar-icon');
const searchbar = document.querySelector('.searchbar');
const Navbar = document.querySelector('.navbar');
const NavbarLeft = document.querySelector('.nav-Left');
const NavbarMiddle = document.querySelector('.nav-Middle');
const NavbarRight = document.querySelector('.nav-Right');
const searchbtn = document.querySelector('.btn');
let searchcloseIcon = document.getElementById('closeButton');

const toggleSearchbar = () => {
    NavbarRight.style.display = "none";
    const isSearchbarOpen = searchtoggle.classList.toggle('open');

    // Toggle the background image source
    searchtoggle.src = isSearchbarOpen ? 'Img folder/Arrawleft.png' : 'Img folder/searchIcon.png';

    searchbarIcon.style.cssText = isSearchbarOpen ? "height: 40px;border-radius: 30px 0 0 30px; padding: 0 15px 0 25px;display:flex;" : "display:none;";
    // searchbtn.style.cssText = isSearchbarOpen ? "padding: 8px 12px; display: block; border: none;" : " display: none;";

    NavbarMiddle.style.cssText = isSearchbarOpen ? "width: 100%; transition: 0.3s ease-in-out;" : "width: 10%;";


 // Check if the input field has text content
 if (searchbar.value.trim() !== "") {
     close.style.cssText = isSearchbarOpen ? " " : "display:none;";
  }
    searchbar.style.cssText = isSearchbarOpen ? "display:block;width:100%;" : "display:none; ";
    Navbar.style.display = isSearchbarOpen ? "block" : "flex";
    NavbarLeft.style.cssText = isSearchbarOpen ? "display:none;" : "width: 90%;";
    NavbarRight.style.cssText = isSearchbarOpen ? "display:none;" : "display:none;";

    console.log("Searchbar Toggled");
};

searchtoggle.addEventListener("click", toggleSearchbar);



