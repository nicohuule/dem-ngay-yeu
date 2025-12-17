const targetDate = new Date(2025, 10, 20, 0, 0, 0).getTime();

function updateTimer() {
    const now = new Date().getTime();
    // Tính khoảng cách thời gian
    const distance = targetDate - now;

    // Tính toán ngày, giờ, phút, giây
    const days = Math.floor(Math.abs(distance) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((Math.abs(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((Math.abs(distance) % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Nếu đã qua ngày đó rồi thì đổi tiêu đề (tùy chọn)
    if (distance < 0) {
        document.querySelector("h2").innerText = "Chúng mình đã yêu nhau được:";
    } else {
        document.querySelector("h2").innerText = "Sắp đến ngày 20/11/2025:";
    }
}

setInterval(updateTimer, 1000);

// --- 2. HIỆU ỨNG HOA LƯU LY (XANH TÍM) ---
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 8 + 5; // Kích thước nhỏ xinh
    const duration = Math.random() * 3 + 3; // Rơi chậm rãi

    petal.style.left = startLeft + 'px';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';

    // Bảng màu Hoa Lưu Ly (Xanh nhạt, Xanh tím, Tím nhạt, Trắng)
    const forgetMeNotColors = ['#aec6cf', '#b39eb5', '#779ecb', '#e0c3fc', '#ffffff'];

    petal.style.background = forgetMeNotColors[Math.floor(Math.random() * forgetMeNotColors.length)];
    petal.style.boxShadow = "0 0 5px " + petal.style.background; // Thêm chút phát sáng

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

setInterval(createPetal, 400); // 400ms tạo 1 bông

// --- 3. BÌNH LUẬN (TÊN + TIN NHẮN) ---
function addComment() {
    const nameIn = document.getElementById("nameInput");
    const msgIn = document.getElementById("commentInput");
    const list = document.getElementById("commentList");

    const nameTxt = nameIn.value.trim();
    const msgTxt = msgIn.value.trim();

    if (msgTxt !== "") {
        const newCmt = document.createElement("div");
        newCmt.classList.add("comment-item");

        const now = new Date();
        const time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

        // Nếu không điền tên thì để là "Người giấu mặt"
        const displayName = nameTxt !== "" ? nameTxt : "Người giấu mặt";

        newCmt.innerHTML = `<strong>${displayName}:</strong> ${msgTxt} 
                            <span style="font-size:10px; float:right; opacity:0.6; margin-top:2px">${time}</span>`;

        list.insertBefore(newCmt, list.firstChild);

        msgIn.value = ""; // Chỉ xóa nội dung tin nhắn
        msgIn.focus(); // Để con trỏ vào ô tin nhắn nhập tiếp cho nhanh
    } else {
        alert("Bạn chưa nhập lời chúc kìa!");
    }
}

// Bắt sự kiện phím Enter
document.getElementById("commentInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addComment();
});
document.getElementById("nameInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("commentInput").focus();
});