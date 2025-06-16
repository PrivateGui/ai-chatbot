function auth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("لطفاً اطلاعات را وارد کنید.");
    localStorage.setItem("user", user);
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    newChat();
}

function toggleAuth() {
    const title = document.getElementById("auth-title");
    title.textContent = title.textContent === "ورود" ? "ثبت‌نام" : "ورود";
}