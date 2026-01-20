let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);
let user = JSON.parse(localStorage.getItem("user")) || null;

updateCart();
updateUserInfo();

function addToCart(product, price) {
  cart.push({product, price});
  total += price;
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - ${item.price} جنيه `;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => removeFromCart(index);
    li.appendChild(btn);
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = total;

  // لو المستخدم مسجل → نعبي بيانات الطلب
  if (user) {
    document.getElementById("username").value = user.name;
    document.getElementById("address").value = user.address;
    document.getElementById("phone").value = user.phone;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// تسجيل حساب
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  user = {
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    phone: document.getElementById("regPhone").value,
    address: document.getElementById("regAddress").value,
    password: document.getElementById("regPass").value
  };
  localStorage.setItem("user", JSON.stringify(user));
  alert("✅ تم إنشاء الحساب بنجاح!");
  hideLogin();
  updateUserInfo();
  updateCart();
});

// تحديث بيانات المستخدم في الهيدر
function updateUserInfo() {
  const userDiv = document.getElementById("user-info");
  if (user) {
    userDiv.innerHTML = `<span>👋 أهلاً ${user.name}</span> 
    <button onclick="logout()">تسجيل خروج</button>`;
  }
}

// تسجيل خروج
function logout() {
  localStorage.removeItem("user");
  user = null;
  updateUserInfo();
}

// إظهار/إخفاء نافذة تسجيل الدخول
function showLogin() {
  document.getElementById("login-modal").style.display = "block";
}
function hideLogin() {
  document.getElementById("login-modal").style.display = "none";
}

// معالجة الطلب
document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("⚠️ السلة فارغة!");
    return;
  }
  const name = document.getElementById("username").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  alert(`✅ تم تأكيد الطلب!\nالاسم: ${name}\nالعنوان: ${address}\nالموبايل: ${phone}\nالإجمالي: ${total} جنيه`);

  cart = [];
  total = 0;
  saveCart();
  updateCart();
});
