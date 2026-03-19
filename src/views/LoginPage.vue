<template>
  <div class="login-page">
    <!-- Left Panel: Hero Image -->
    <div class="hero-panel">
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop"
        alt="Golden wheat field at sunset"
        class="hero-image"
      />
    </div>

    <!-- Right Panel: Login Form -->
    <div class="form-panel">
      <!-- Logo -->
      <div class="logo">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">DIMITRA</span>
      </div>

      <div class="form-container">
        <h1 class="form-title">Welcome! Log In</h1>
        <p class="form-subtitle">Enter your credentials.</p>

        <form @submit.prevent="handleLogin" class="form">
          <!-- Email / Username -->
          <div class="input-group">
            <span class="input-icon">✉️</span>
            <input
              v-model="form.username"
              type="text"
              placeholder="john l"
              class="input"
              autocomplete="username"
            />
          </div>

          <!-- Password -->
          <div class="input-group">
            <span class="input-icon">🔒</span>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="input"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>

          <!-- Forgot Password -->
          <div class="forgot-row">
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>

          <!-- reCAPTCHA (mock) -->
          <div class="recaptcha-box">
            <input type="checkbox" v-model="captchaChecked" id="captcha" class="captcha-checkbox" />
            <label for="captcha" class="captcha-label">I'm not a robot</label>
            <div class="recaptcha-badge">
              <div class="recaptcha-logo">reCAPTCHA</div>
              <div class="recaptcha-sub">Privacy - Terms</div>
            </div>
          </div>

          <!-- Error message -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <!-- Submit Button -->
          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="loading">LOGGING IN...</span>
            <span v-else>LOGIN</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      showPassword: false,
      captchaChecked: false,
      loading: false,
      errorMessage: '',
    }
  },

  methods: {
    async handleLogin() {
      this.errorMessage = ''

      if (!this.form.username || !this.form.password) {
        this.errorMessage = 'Please enter your username and password.'
        return
      }

      if (!this.captchaChecked) {
        this.errorMessage = 'Please confirm you are not a robot.'
        return
      }

      this.loading = true

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.$router.push('/cooperatives')
      } catch (err) {
        this.errorMessage = 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.hero-panel {
  flex: 1;
  overflow: hidden;
  max-width: 55%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  background-color: #ffffff;
  min-width: 420px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 48px;
}

.logo-icon { font-size: 20px; }

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #2e7d32;
}

.form-container {
  max-width: 380px;
  width: 100%;
}

.form-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
}

.form-subtitle {
  font-size: 13px;
  color: #757575;
  margin: 0 0 28px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1.5px solid #c8e6c9;
  border-radius: 6px;
  background-color: #f1f8f1;
  padding: 0 12px;
  height: 46px;
  transition: border-color 0.2s;
}

.input-group:focus-within {
  border-color: #43a047;
  background-color: #ffffff;
}

.input-icon {
  font-size: 14px;
  margin-right: 10px;
  opacity: 0.6;
}

.input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #1a1a1a;
}

.input::placeholder { color: #9e9e9e; }

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-password:hover { opacity: 1; }

.forgot-row {
  text-align: left;
  margin-top: -4px;
}

.forgot-link {
  font-size: 13px;
  color: #43a047;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover { text-decoration: underline; }

.recaptcha-box {
  display: flex;
  align-items: center;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  background-color: #f9f9f9;
  padding: 12px 14px;
  gap: 10px;
}

.captcha-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #43a047;
}

.captcha-label {
  flex: 1;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.recaptcha-badge { text-align: center; line-height: 1.3; }

.recaptcha-logo {
  font-size: 10px;
  font-weight: 700;
  color: #4285f4;
  letter-spacing: 0.5px;
}

.recaptcha-sub { font-size: 8px; color: #9e9e9e; }

.error-message {
  font-size: 13px;
  color: #e53935;
  margin: 0;
}

.login-btn {
  height: 46px;
  background-color: #43a047;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.login-btn:hover:not(:disabled) { background-color: #388e3c; }
.login-btn:active:not(:disabled) { transform: scale(0.98); }
.login-btn:disabled { background-color: #a5d6a7; cursor: not-allowed; }

@media (max-width: 768px) {
  .hero-panel { display: none; }
  .form-panel { padding: 40px 28px; min-width: unset; }
}
</style>
