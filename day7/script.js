const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const date = new Date();
const days = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const ornamentImg = [
    "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png"
];
const stars = ["⭐", "💫", "💖", "🎄", "🏴‍☠️", "👾"];

function changeStar(){
    const randomIndex = Math.floor(Math.random() * stars.length);
    document.getElementById("star").innerText = stars[randomIndex];
}

const placedOrnaments = [];

function placeOrnament(el){
    const pickPosition = () => {
        const verticalBias = Math.sqrt(Math.random()); 
        const top = clamp(5 + verticalBias * 83, 8, 88); 

        const maxWidth = 50; 
        const minWidth = 14; 
        const width = clamp(minWidth + (top / 100) * (maxWidth - minWidth), minWidth, maxWidth);
        const left = clamp(50 + (Math.random() - 0.5) * width, 18, 82);
        return { top, left };
    };

    let position = pickPosition();
    for (let attempt = 0; attempt < 20; attempt++) {
        const tooClose = placedOrnaments.some(p => Math.hypot(p.top - position.top, p.left - position.left) < 8);
        if (!tooClose) break;
        position = pickPosition();
    }

    placedOrnaments.push(position);
    el.style.top = `${position.top}%`;
    el.style.left = `${position.left}%`;
}

document.addEventListener('DOMContentLoaded', () => {
    const decorations = document.getElementById("decorations");
    const dateText = document.getElementById("date");
    const star = document.getElementById("star");

    dateText.innerText = `${days}/${month}/${year}`;

    if(month === 12){
        const daysTilChristmas = Math.max(25 - days, 0);
        const ornamentCount = Math.max(daysTilChristmas, 7); 

        placedOrnaments.length = 0;

        for(let i = 0; i < ornamentCount; i++){
            const randomImg = ornamentImg[Math.floor(Math.random() * ornamentImg.length)];
            const ornament = document.createElement('img');
            ornament.src = `img/ornaments/${randomImg}`;
            ornament.className = 'ornament';
            ornament.id = `ornament${i}`;
            placeOrnament(ornament);
            decorations.appendChild(ornament);
        }
    }

    star.addEventListener('click', changeStar);
});