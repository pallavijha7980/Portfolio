let loader = document.getElementById("preloader")
let mainHeader = document.getElementById("main-header");
if (mainHeader) mainHeader.classList.add("hide-navbar");

let load = window.addEventListener("load",()=>{
  setTimeout(() => {
    loader.style.display = "none";
    if (mainHeader) mainHeader.classList.remove("hide-navbar");
 }, 2000);
})


let words = document.querySelectorAll(".word");

words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letters)=>{
        let span = document.createElement("span");
        span.textContent = letters;
        span.className ="letters";
        word.append(span);
    });
});

let currentWordIndex =0;
let maxWordIndex =words.length -1;
words[currentWordIndex].style.opacity="1";

let changetext =()=>{
    let currentword = words[currentWordIndex];
    let nextword = currentWordIndex ===maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentword.children).forEach((letters,i)=>{
        setTimeout(()=>{
            letters.className = "letter out";
        },i*80);
    });
     
    nextword.style.opacity ="1";
    Array.from(nextword.children).forEach((letters,i)=>{

        letters.className = "letter behind";
        setTimeout(() => {
            letters.className ="letter in"
        },340+i *80 );
    });

    currentWordIndex = currentWordIndex ===maxWordIndex ? 0: currentWordIndex + 1;
};

changetext();
setInterval(changetext,3000)


let circles = document.querySelectorAll('.circle');

circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");  // Number of dots
    var marked = elem.getAttribute("data-percent");  // Percentage to mark
    var percent = Math.floor(dots * marked / 100);  // Number of dots to be marked
    var points = "";
    var rotate = 360 / dots;  // Rotation angle for each dot

    for (let i = 0; i < percent; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML = points;  // Corrected to `innerHTML` instead of `innerHTMLb`

    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
});

var mixer = mixitup('.portfolio-gallery');

// active menu..................................




let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY +97 <section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);



// nav......................

let header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})






let menuicon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuicon.onclick=()=>{
    menuicon.classList.toggle("bx-x")
    navlist.classList.toggle("open");
}

window.onscroll=()=>{
    menuicon.classList.remove("bx-x")
    navlist.classList.remove("open");
}






const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }
        else{
            entry.target.classList.remove("show-items");
        }
    });
});


const scrollScale =document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom =document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop =document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));



  

function addLine(event) {
    event.preventDefault();
    
    const serviceBox = event.target.closest('.service-box');
    const extraText = serviceBox.querySelector('.extra-text');
    if (extraText) {
      extraText.style.display = 'block';
    }
    event.target.textContent = 'Back <-';
  
  
    event.target.onclick = goBack;
  }
  
  function goBack(event) {
    event.preventDefault();
  
    
    const serviceBox = event.target.closest('.service-box');
    const extraText = serviceBox.querySelector('.extra-text');
    if (extraText) {
      extraText.style.display = 'none';
    }
    event.target.textContent = 'Read More ->';
    event.target.onclick = addLine;
  }

  document.getElementById('colorPicker').addEventListener('input', function (event) {
    const selectedColor = event.target.value;
    document.documentElement.style.setProperty('--hover-color', selectedColor);
  });

//gsap animation....................................

function updatePathLength() {
    let screenWidth = window.innerWidth;
    let startX = 10;
    let endX = screenWidth - 10; 
    let midX = screenWidth / 2;
    
    // Set default paths
    finalPath = `M ${startX} 100 Q ${midX} 100 ${endX} 100`;
    Path = finalPath;

    // Apply to path initially
    document.querySelector("#path").setAttribute("d", finalPath);
}

updatePathLength(); // Run on load
window.addEventListener("resize", updatePathLength); // Update on resize

var string = document.querySelector("#string");

string.addEventListener("mousemove", function(dets) {
    let screenWidth = window.innerWidth;
    let startX = 10;
    let endX = screenWidth - 10;
    
    Path = `M ${startX} 100 Q ${dets.x} ${dets.y} ${endX} 100`;

    gsap.to("svg path", {
        attr: { d: Path },
        duration: 0.15,  
        ease: "power3.out"
    });
});

string.addEventListener("mouseleave", function() {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 0.7, 
        ease: "elastic.out(1, 0.2)"
    });
});

gsap.to("svg path", {
    attr: { d: updatedPath },
    duration: window.innerWidth < 600 ? 0.1 : 0.15, // Faster animation on small screens
    ease: "power3.out"
  });
  

