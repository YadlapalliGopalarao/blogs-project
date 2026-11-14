
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '../../modules/auth/stores/authStore'
import { updateProfile } from '../../modules/profile/services/profileService'

import { useApiError } from '../../composables/useApiError'
import { useNotification } from '../../composables/useNotification'

import BaseInput from '../../components/ui/BaseInput.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const notification = useNotification()
const { errorMessage, handleError, clearErrors } = useApiError()

const loading = ref(false)
const saving = ref(false)

const form = reactive({
  name: '',
  email: '',
})

async function loadProfile() {
  loading.value = true

  try {
    const profile = await authStore.fetchProfile()

    form.name = profile.name
    form.email = profile.email
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateProfile() {
  clearErrors()

  if (!form.name.trim() || !form.email.trim()) {
    notification.warning('Please complete all required fields.')
    return
  }

  saving.value = true

  try {
    const updatedUser = await updateProfile({
      name: form.name.trim(),
      email: form.email.trim(),
    })

    authStore.user = updatedUser

    localStorage.setItem('user', JSON.stringify(updatedUser))

    notification.success('Profile updated successfully.')
  } catch (error) {
    handleError(error)
  } finally {
    saving.value = false
  }
}

onMounted(loadProfile)
</script>

<template>
  <div class="profile-page">

    <div class="page-header">
      <span class="page-label">ACCOUNT SETTINGS</span>
      <h1>My Profile</h1>
      <p>Manage your personal information and account details.</p>
    </div>

    <LoadingSpinner
      v-if="loading"
      size="large"
      label="Loading profile..."
    />

    <div v-else class="profile-container">

      <section class="profile-overview">
        <div class="profile-avatar">
          {{ (user?.name || 'U').charAt(0).toUpperCase() }}
        </div>

        <div>
          <h2>{{ user?.name || 'User' }}</h2>
          <p>{{ user?.email }}</p>
          <span class="account-badge">Active Account</span>
        </div>
      </section>

      <section class="profile-form-section">
        <div class="section-heading">
          <h2>Personal Information</h2>
          <p>Update your account information below.</p>
        </div>

        <form @submit.prevent="handleUpdateProfile">

          <div v-if="errorMessage" class="error-alert">
            {{ errorMessage }}
          </div>

          <BaseInput
            v-model="form.name"
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <BaseInput
            v-model="form.email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            required
          />

          <div class="form-actions">
            <BaseButton
              type="submit"
              :loading="saving"
            >
              Save Changes
            </BaseButton>
          </div>

        </form>
      </section>

      <section class="account-information">
        <h2>Account Information</h2>

        <div class="information-row">
          <span>Account ID</span>
          <strong>{{ user?.id ?? 'Unavailable' }}</strong>
        </div>

        <div class="information-row">
          <span>Nickname</span>
          <strong>{{ user?.nickname || 'Not provided' }}</strong>
        </div>

        <div class="information-row">
          <span>Address</span>
          <strong>{{ user?.address || 'Not provided' }}</strong>
        </div>

        <div class="information-row">
          <span>Phone Number</span>
          <strong>{{ user?.phone_no || 'Not provided' }}</strong>
        </div>

        <div class="information-row">
          <span>Account Status</span>
          <strong class="status-active">Active</strong>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 850px;
  margin: auto;
}

.page-header {
  margin-bottom: 28px;
}

.page-label {
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.page-header h1 {
  margin-top: 9px;
  color: #111827;
  font-size: 30px;
  font-weight: 800;
}

.page-header > p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.profile-overview,
.profile-form-section,
.account-information {
  padding: 25px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
}

.profile-overview {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar {
  width: 75px;
  height: 75px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4338ca;
  font-size: 30px;
  font-weight: 800;
}

.profile-overview h2 {
  color: #111827;
  font-size: 20px;
}

.profile-overview p {
  margin-top: 5px;
  color: #6b7280;
  font-size: 14px;
}

.account-badge {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  background: #dcfce7;
  color: #15803d;
  font-size: 11px;
  font-weight: 700;
}

.section-heading {
  margin-bottom: 25px;
}

.section-heading h2,
.account-information h2 {
  color: #111827;
  font-size: 18px;
  font-weight: 800;
}

.section-heading p {
  margin-top: 7px;
  color: #6b7280;
  font-size: 13px;
}

.profile-form-section form {
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
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.account-information h2 {
  margin-bottom: 18px;
}

.information-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 14px 0;
  border-bottom: 1px solid #f3f4f6;
  color: #6b7280;
  font-size: 14px;
}

.information-row:last-child {
  border-bottom: none;
}

.information-row strong {
  color: #111827;
  text-align: right;
  overflow-wrap: anywhere;
}

.information-row .status-active {
  color: #059669;
}

@media (max-width: 550px) {
  .profile-overview,
  .profile-form-section,
  .account-information {
    padding: 18px;
  }

  .profile-overview {
    align-items: flex-start;
  }
}
</style>
