// 1. HIỆU ỨNG HOA LƯU LY RƠI / SAO RƠI
function createPetal() {
    const container = document.getElementById('petals-container');
    if(!container) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Tạo vị trí và kích thước ngẫu nhiên
    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 6 + 4; // Kích thước hạt/hoa
    const duration = Math.random() * 4 + 4; // Tốc độ rơi
    
    petal.style.left = startLeft + 'px';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    
    // Màu sắc hạt rơi (xanh nhạt, trắng, tím nhạt)
    const colors = ['#aec6cf', '#b39eb5', '#ffffff', '#e0c3fc']; 
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.borderRadius = "50%";
    petal.style.boxShadow = "0 0 8px " + petal.style.background;

    container.appendChild(petal);

    // Xóa cánh hoa sau khi rơi xong để không làm nặng máy
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

// Cứ mỗi 0.3 giây sẽ tạo ra 1 cánh hoa
setInterval(createPetal, 300);

// 2. XỬ LÝ BÌNH LUẬN ẢO
function addComment() {
    const nameIn = document.getElementById("nameInput");
    const msgIn = document.getElementById("commentInput");
    const nameTxt = nameIn.value.trim();
    const msgTxt = msgIn.value.trim();

    if (msgTxt !== "") {
        const now = new Date();
        const time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        const displayName = nameTxt !== "" ? nameTxt : "Người bí ẩn";

        const list = document.getElementById("commentList");
        const newCmt = document.createElement("div");
        newCmt.classList.add("comment-item");
        
        // Chống lỗi hiển thị ký tự đặc biệt
        const safeName = displayName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeMsg = msgTxt.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        newCmt.innerHTML = `<strong>${safeName}:</strong> ${safeMsg} <span style="float:right; font-size:10px; opacity:0.6; margin-top:2px">${time}</span>`;
        list.insertBefore(newCmt, list.firstChild);

        msgIn.value = "";
        msgIn.focus();
    } else {
        alert("Bạn chưa nhập lời nhắn kìa!");
    }
}

// Cho phép nhấn Enter để gửi bình luận
document.getElementById("commentInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addComment();
});
document.getElementById("nameInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("commentInput").focus();
});
