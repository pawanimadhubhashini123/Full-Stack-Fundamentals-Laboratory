const currentTime = new Date();
const hour =currentTime.getHours();

let greeting;

if(hour <12){
    greeting ="Good Morning"
} else if( hour < 17){
    greeting ="Good Afternoon"
}else{
    greeting ="Good Evening"
}

document.getElementById("greeting").textContent = greeting;

const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", function() {
    const currentTheme = document.body.getAttribute("data-theme");
    
    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "light");
        themeToggleBtn.textContent = "Dark Mode";
    } else {
        document.body.setAttribute("data-theme", "dark");
        themeToggleBtn.textContent = "Light Mode";
    }
});