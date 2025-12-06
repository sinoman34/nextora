// =======================
// Buy Page - Order Handler (WhatsApp + Google Sheet)
// =======================

// Read product data from query string
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Product";
const price = params.get("price") || "0.00";
const img = params.get("img") || "icon-img-logo/product1.png";
const meta = params.get("meta") || "Instant digital delivery";

// Set summary UI
document.getElementById("pName").textContent = name;
document.getElementById("pPrice").textContent = `$${price}`;
document.getElementById("pTotal").textContent = `$${price}`;
document.getElementById("pImg").src = img;

const pMetaEl = document.getElementById("pMeta");
if (pMetaEl) pMetaEl.textContent = meta;

// Helpers
function safeText(v) {
  return String(v ?? "").trim();
}

function buildWhatsAppText(order) {
  return (
    `🛒 *Nextora Shop Order*%0A` +
    `━━━━━━━━━━━━━━%0A` +
    `👤 Name: ${encodeURIComponent(order.fullName)}%0A` +
    `📧 Email: ${encodeURIComponent(order.email)}%0A` +
    `💳 Payment: ${encodeURIComponent(order.paymentMethod)}%0A` +
    `🧾 TrxID: ${encodeURIComponent(order.trxId || "N/A")}%0A` +
    `━━━━━━━━━━━━━━%0A` +
    `📦 Product: ${encodeURIComponent(order.productName)}%0A` +
    `📝 Meta: ${encodeURIComponent(order.productMeta)}%0A` +
    `💰 Price: ${encodeURIComponent(order.price)}%0A` +
    `🕒 Time: ${encodeURIComponent(order.timestamp)}%0A` +
    `━━━━━━━━━━━━━━%0A` +
    `✅ Please confirm this order.`
  );
}

function sendToGoogleSheet(order) {
  const url = window.NEXTORA_SHEET_WEBAPP_URL;
  if (!url) {
    console.warn("❗ NEXTORA_SHEET_WEBAPP_URL set kora nai.");
    return;
  }

  // Apps Script web app: best with form-url-encoded
  const body = new URLSearchParams(order).toString();

  // ✅ redirect হলেও request যায়
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/x-www-form-urlencoded;charset=UTF-8" });
    navigator.sendBeacon(url, blob);
    return;
  }

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
    keepalive: true,
  }).catch((err) => console.warn("Sheet fetch failed:", err));
}

// Submit -> Sheet + WhatsApp
document.getElementById("buyForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = safeText(document.getElementById("fullName").value);
  const email = safeText(document.getElementById("email").value);
  const paymentMethod = safeText(document.getElementById("paymentMethod").value);
  const trxId = safeText(document.getElementById("trxId").value);

  const order = {
    timestamp: new Date().toLocaleString(),
    fullName,
    email,
    paymentMethod,
    trxId,
    productName: name,
    productMeta: meta,
    price: `$${price}`,
    image: img,
    page: "buy.html",
  };

  // 1) Send Google Sheet (best effort)
  sendToGoogleSheet(order);

  // 2) WhatsApp redirect
  const waNumber = (window.NEXTORA_WA_NUMBER || "").replace(/\D/g, "");
  const text = buildWhatsAppText(order);

  if (!waNumber) {
    alert("WhatsApp number set kora nai. NEXTORA_WA_NUMBER check koro.");
    return;
  }

  // ✅ sheet request যেতে ছোট delay
  setTimeout(() => {
    window.location.href = `https://wa.me/${waNumber}?text=${text}`;
  }, 300);
});
