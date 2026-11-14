
<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '../../modules/auth/stores/authStore'
import { useApiError } from '../../composables/useApiError'
import { useNotification } from '../../composables/useNotification'

import BaseInput from '../../components/ui/BaseInput.vue'
import BaseButton from '../../components/ui/BaseButton.vue'

import {
  isRequired,
  isValidEmail,
  isValidPassword,
  passwordsMatch,
} from '../../utils/validators'

const authStore = useAuthStore()
const router = useRouter()

const { errorMessage, handleError, clearErrors } = useApiError()
const notification = useNotification()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  nickname: '',
  address: '',
  phone_no: '',
})

async function handleRegister() {
  clearErrors()

  // Check required fields
  if (
    !isRequired(form.name) ||
    !isRequired(form.email) ||
    !isRequired(form.password) ||
    !isRequired(form.password_confirmation) ||
    !isRequired(form.nickname) ||
    !isRequired(form.address) ||
    !isRequired(form.phone_no)
  ) {
    notification.warning('Please fill in all fields.')
    return
  }

  // Validate email
  if (!isValidEmail(form.email.trim())) {
    notification.warning('Please enter a valid email address.')
    return
  }

  // Validate password
  if (!isValidPassword(form.password)) {
    notification.warning('Password must contain at least 8 characters.')
    return
  }

  // Confirm password
  if (!passwordsMatch(form.password, form.password_confirmation)) {
    notification.warning('Passwords do not match.')
    return
  }

  try {
    await authStore.register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
      nickname: form.nickname.trim(),
      address: form.address.trim(),
      phone_no: form.phone_no.trim(),
    })

    notification.success('Account created successfully. Please log in.')

    await router.push({ name: 'login' })

  } catch (error) {
    handleError(error)
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">

      <div class="register-heading">
        <div class="register-icon">B</div>

        <h1>Create Account</h1>

        <p>Join BlogSpace and start sharing your stories.</p>
      </div>

      <form @submit.prevent="handleRegister">

        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <BaseInput
          v-model="form.name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
        />

        <BaseInput
          v-model="form.nickname"
          label="Nickname"
          type="text"
          placeholder="Enter your nickname"
          required
        />

        <BaseInput
          v-model="form.email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <BaseInput
          v-model="form.phone_no"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          required
        />

        <BaseInput
          v-model="form.address"
          label="Address"
          type="text"
          placeholder="Enter your address"
          required
        />

        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Create a password"
          required
        />

        <BaseInput
          v-model="form.password_confirmation"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          required
        />

        <BaseButton
          type="submit"
          full-width
          :loading="authStore.loading"
        >
          Create Account
        </BaseButton>

      </form>

      <div class="register-footer">
        <p>
          Already have an account?
          <RouterLink to="/login">Sign In</RouterLink>
        </p>

        <RouterLink to="/" class="home-link">
          ← Back to Home
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.register-page {
  width: 100%;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px 20px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
}

.register-card {
  width: 100%;
  max-width: 460px;
  padding: 38px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 45px rgba(31, 41, 55, 0.08);
}

.register-heading {
  margin-bottom: 28px;
  text-align: center;
}

.register-icon {
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

.register-heading h1 {
  color: #111827;
  font-size: 28px;
  font-weight: 800;
}

.register-heading p {
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.register-card form {
  display: flex;
  flex-direction: column;
  gap: 18px;
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

.register-footer {
  margin-top: 25px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

.register-footer a {
  color: #4f46e5;
  font-weight: 700;
  text-decoration: none;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
}

@media (max-width: 480px) {
  .register-card {
    padding: 28px 22px;
  }
}
</style>
