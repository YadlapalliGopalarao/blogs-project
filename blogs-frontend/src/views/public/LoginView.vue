
<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../../modules/auth/stores/authStore'
import { useApiError } from '../../composables/useApiError'
import { useNotification } from '../../composables/useNotification'

import BaseInput from '../../components/ui/BaseInput.vue'
import BaseButton from '../../components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const { errorMessage, handleError, clearErrors } = useApiError()
const notification = useNotification()

const form = reactive({
  name: '',
  password: '',
})

async function handleLogin() {
  clearErrors()

  if (!form.name || !form.password) {
    notification.warning('Please enter your username and password.')
    return
  }

  try {
    await authStore.login({
      name: form.name.trim(),
      password: form.password,
    })

    notification.success('Login successful! Welcome back.')

    const redirect = route.query.redirect

    if (typeof redirect === 'string' && redirect.startsWith('/')) {
      await router.push(redirect)
    } else {
      await router.push({ name: 'dashboard' })
    }
  } catch (error) {
    handleError(error)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">

      <div class="login-heading">
        <div class="login-icon">B</div>

        <h1>Welcome Back</h1>

        <p>Sign in to continue to your BlogSpace account.</p>
      </div>

      <form @submit.prevent="handleLogin">

        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <BaseInput
          v-model="form.name"
          label="Username"
          type="text"
          placeholder="Enter your username"
          required
        />

        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <BaseButton
          type="submit"
          full-width
          :loading="authStore.loading"
        >
          Sign In
        </BaseButton>

      </form>

      <div class="login-footer">
        <p>
          Don't have an account?
          <RouterLink to="/register">Create Account</RouterLink>
        </p>

        <RouterLink to="/" class="home-link">
          ← Back to Home
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px 20px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
}

.login-card {
  width: 100%;
  max-width: 440px;
  padding: 38px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 45px rgba(31, 41, 55, 0.08);
}

.login-heading {
  margin-bottom: 30px;
  text-align: center;
}

.login-icon {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border-radius: 15px;
  background: #4f46e5;
  color: white;
  font-size: 28px;
  font-weight: 800;
}

.login-heading h1 {
  color: #111827;
  font-size: 28px;
  font-weight: 800;
}

.login-heading p {
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.login-card form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.error-alert {
  padding: 12px 15px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
  line-height: 1.5;
}

.login-footer {
  margin-top: 25px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

.login-footer a {
  color: #4f46e5;
  font-weight: 700;
  text-decoration: none;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
}

@media (max-width: 480px) {
  .login-card {
    padding: 28px 22px;
  }
}
</style>
