

// ============================================================
// BỘ ĐẾM THỜI GIAN (DÙNG ĐỂ ĐẾM NGÀY XA NHAU HOẶC KỶ NIỆM)
// ============================================================

// Ngày kỷ niệm cũ (hoặc ngày chia tay)
const targetDate = new Date(2025, 10, 20, 0, 0, 0).getTime(); 

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(Math.abs(distance) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((Math.abs(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((Math.abs(distance) % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}
setInterval(updateTimer, 1000);

// ============================================================
// HIỆU ỨNG TRO TÀN / TUYẾT RƠI (BUỒN)
// ============================================================
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Vị trí ngẫu nhiên
    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 1; // Hạt nhỏ li ti
    const duration = Math.random() * 5 + 5; // Rơi rất chậm
    
    particle.style.left = startLeft + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    
    // Màu trắng đục / xám
    particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5})`;

    document.getElementById('particles-container').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}
setInterval(createParticle, 200);

// ============================================================
// XỬ LÝ BÌNH LUẬN
// ============================================================
function addComment() {
    const nameIn = document.getElementById("nameInput");
    const msgIn = document.getElementById("commentInput");
    const nameTxt = nameIn.value.trim();
    const msgTxt = msgIn.value.trim();

    if (msgTxt !== "") {
        const now = new Date();
        const time = now.getHours() + ":" + (now.getMinutes()<10?'0':'') + now.getMinutes();
        const displayName = nameTxt !== "" ? nameTxt : "Người lạ";

        database.ref('comments').push().set({
            name: displayName,
            message: msgTxt,
            time: time,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        msgIn.value = "";
    }
}

// Lắng nghe comment mới
database.ref('comments').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const list = document.getElementById("commentList");
    const newCmt = document.createElement("div");
    newCmt.classList.add("comment-item");
    
    // Tránh lỗi XSS đơn giản
    const safeName = data.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeMsg = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    newCmt.innerHTML = `<strong>${safeName}:</strong> ${safeMsg} <span style="float:right; font-size:10px; opacity:0.5">${data.time}</span>`;
    list.insertBefore(newCmt, list.firstChild);
});

// Sự kiện Enter
document.getElementById("commentInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addComment();
});
