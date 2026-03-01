// ĐÓNG LÁ THƯ POPUP
function closeModal() {
    const modal = document.getElementById("letterModal");
    if(modal) {
        modal.style.display = "none";
    }
}

// HIỆU ỨNG HOA RƠI LÃNG MẠN
function createPetal() {
    const container = document.getElementById('petals-container');
    if(!container) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 8 + 5;
    const duration = Math.random() * 3 + 3;
    
    petal.style.left = startLeft + 'px';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    
    // Màu xanh dương nhạt / trắng
    const forgetMeNotColors = ['#aec6cf', '#b39eb5', '#779ecb', '#e0c3fc', '#ffffff']; 
    petal.style.background = forgetMeNotColors[Math.floor(Math.random() * forgetMeNotColors.length)];
    petal.style.boxShadow = "0 0 5px " + petal.style.background;

    // Thiết lập CSS trực tiếp cho cánh hoa rơi
    petal.style.position = 'absolute';
    petal.style.top = '-20px';
    petal.style.borderRadius = '100% 0 100% 0';
    petal.style.opacity = '0.8';
    petal.style.zIndex = '5';
    petal.style.animationName = 'fall';
    petal.style.animationTimingFunction = 'linear';

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}
setInterval(createPetal, 400);

// XỬ LÝ BÌNH LUẬN (CHỈ HIỂN THỊ TẠM THỜI TRÊN MÀN HÌNH)
function addComment() {
    const nameIn = document.getElementById("nameInput");
    const msgIn = document.getElementById("commentInput");
    const nameTxt = nameIn.value.trim();
    const msgTxt = msgIn.value.trim();

    if (msgTxt !== "") {
        const now = new Date();
        const time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        const displayName = nameTxt !== "" ? nameTxt : "Người lạ";

        const list = document.getElementById("commentList");
        const newCmt = document.createElement("div");
        newCmt.classList.add("comment-item");
        
        const safeName = displayName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeMsg = msgTxt.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        newCmt.innerHTML = `<strong>${safeName}:</strong> ${safeMsg} <span style="float:right; font-size:10px; opacity:0.6; margin-top:2px">${time}</span>`;
        list.insertBefore(newCmt, list.firstChild);

        msgIn.value = "";
        msgIn.focus();
    } else {
        alert("Nhập lời nhắn trước khi gửi nhé!");
    }
}

// Cho phép nhấn Enter để gửi
document.getElementById("commentInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addComment();
});
document.getElementById("nameInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("commentInput").focus();
});
