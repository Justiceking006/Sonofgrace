// connection to supabase.

const SUPABASE_URL = 'https://nrgjlpnxqjqxhbdbfuzl.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ2pscG54cWpxeGhiZGJmdXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDQyMzQsImV4cCI6MjA2NzQ4MDIzNH0.EWA5a3dzSeSW2n6SBZ9THOHuYG6DRJDt_Os4KA1r2Gc';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ✅ Login Handler


const loginForm = document.getElementById("auth-form");
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("auth-msg");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    msg.textContent = error.message;
    msg.classList.remove("hidden");
  } else {
    window.location.href = "dashboard.html";
  }
});


// ✅ Register Handler


const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const firstName = document.getElementById("firstName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const msg = document.getElementById("auth-msg");

  if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match";
    msg.classList.remove("hidden");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        mobile: mobile,
      }
    }
  });

  if (error) {
    msg.textContent = error.message;
    msg.classList.remove("hidden");
  } else {
    window.location.href = "dashboard.html";
  }
});

// ✅ Logout Handler

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await supabase.auth.signOut();
  window.location.href = "login.html";
});




const toggleIcons = document.querySelectorAll(".toggle-password");
toggleIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.setAttribute("data-feather", isPassword ? "eye" : "eye-off");
    feather.replace();
  });
});