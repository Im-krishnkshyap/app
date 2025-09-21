// Naya dropdown selector select karein
const templateSelector = document.getElementById('templateSelector');
// Baki elements jaise pehle the
const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');
const photoInput = document.getElementById('photoInput');
const textInput = document.getElementById('textInput');
const updateBtn = document.getElementById('updateBtn');
const downloadBtn = document.getElementById('downloadBtn');

const backgroundImage = new Image();
let userImage = null;

// Ek function jo template ko load karega aur poster banayega
function loadTemplate(templateUrl) {
    backgroundImage.src = templateUrl;
    backgroundImage.onload = () => {
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
        drawPoster();
    };
}

// Dropdown change hone par naya template load karein
templateSelector.addEventListener('change', (e) => {
    loadTemplate(e.target.value);
});

// User photo load karne aur poster banane ka code jaisa pehle tha
photoInput.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        userImage = new Image();
        userImage.onload = () => {
            drawPoster();
        };
        userImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Canvas par sab kuch draw karne ka function
function drawPoster() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    if (userImage) {
        // Yahan aapko har template ke hisab se user ki photo ki position badalni padegi
        ctx.drawImage(userImage, 50, 50, 200, 200); 
    }

    const text = textInput.value || 'Apna Naam Likhein';
    ctx.fillStyle = '#000';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
}

// Buttons ke event listeners jaise pehle the
updateBtn.addEventListener('click', drawPoster);
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'mera-poster.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Page load hote hi pehla template load karein
loadTemplate(templateSelector.value);
