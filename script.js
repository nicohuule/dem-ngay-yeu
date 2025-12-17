const firebaseConfig = {
    apiKey: "AIzaSyDwpVjZ4a5yLqLKJyCgT5ACxujkzg8a3j0",
    authDomain: "countdaycomment.firebaseapp.com",
    databaseURL: "https://countdaycomment-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "countdaycomment",
    storageBucket: "countdaycomment.firebasestorage.app",
    messagingSenderId: "835943916686",
    appId: "1:835943916686:web:a82411aa3261f6698d15df",
    measurementId: "G-7VX4FR8M5Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
    
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

    if (distance < 0) {
        document.querySelector("h2").innerText = "Chúng mình đã yêu nhau được:";
    } else {
        document.querySelector("h2").innerText = "Sắp đến ngày 20/11/2025:";
    }
}
setInterval(updateTimer, 1000);

// Hiệu ứng hoa rơi
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 8 + 5;
    const duration = Math.random() * 3 + 3;
    petal.style.left = startLeft + 'px';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    const forgetMeNotColors = ['#aec6cf', '#b39eb5', '#779ecb', '#e0c3fc', '#ffffff']; 
    petal.style.background = forgetMeNotColors[Math.floor(Math.random() * forgetMeNotColors.length)];
    petal.style.boxShadow = "0 0 5px " + petal.style.background;
    document.body.appendChild(petal);
    setTimeout(() => { petal.remove(); }, duration * 1000);
}
setInterval(createPetal, 400);


// ============================================================
// PHẦN 3: XỬ LÝ BÌNH LUẬN (LƯU LÊN FIREBASE)
// ============================================================

// 1. Hàm gửi bình luận lên Server
function addComment() {
    const nameIn = document.getElementById("nameInput");
    const msgIn = document.getElementById("commentInput");
    const nameTxt = nameIn.value.trim();
    const msgTxt = msgIn.value.trim();

    if (msgTxt !== "") {
        const now = new Date();
        const time = now.getHours() + ":" + (now.getMinutes()<10?'0':'') + now.getMinutes();
        const displayName = nameTxt !== "" ? nameTxt : "Người giấu mặt";

        // Đẩy dữ liệu lên Firebase
        const newPostRef = database.ref('comments').push();
        newPostRef.set({
            name: displayName,
            message: msgTxt,
            time: time,
            timestamp: firebase.database.ServerValue.TIMESTAMP // Để sắp xếp
        });

        // Xóa ô nhập
        msgIn.value = "";
        msgIn.focus();
    } else {
        alert("Bạn chưa nhập lời chúc kìa!");
    }
}

// 2. Hàm lắng nghe dữ liệu từ Server đổ về (Realtime)
// Mỗi khi có ai đó bình luận, hàm này sẽ tự chạy và hiện tin nhắn lên
const commentsRef = database.ref('comments');
commentsRef.on('child_added', (snapshot) => {
    const data = snapshot.val();
    displayComment(data.name, data.message, data.time);
});

// 3. Hàm hiển thị tin nhắn ra màn hình
function displayComment(name, message, time) {
    const list = document.getElementById("commentList");
    const newCmt = document.createElement("div");
    newCmt.classList.add("comment-item");
    
    // An toàn: Chống lỗi XSS (nếu ai đó nhập code bậy bạ)
    newCmt.innerHTML = `<strong>${escapeHtml(name)}:</strong> ${escapeHtml(message)} 
                        <span style="font-size:10px; float:right; opacity:0.6; margin-top:2px">${time}</span>`;
    
    // Thêm vào đầu danh sách
    list.insertBefore(newCmt, list.firstChild);
}

// Hàm phụ trợ để xử lý ký tự đặc biệt
function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Sự kiện phím Enter
document.getElementById("commentInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addComment();
});
document.getElementById("nameInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("commentInput").focus();
});
