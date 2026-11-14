
import { ref } from 'vue'
import axios from 'axios'

interface LaravelErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export function useApiError() {
  const errorMessage = ref('')
  const validationErrors = ref<Record<string, string[]>>({})

  function handleError(error: unknown) {
    errorMessage.value = ''
    validationErrors.value = {}

    if (axios.isAxiosError<LaravelErrorResponse>(error)) {
      const response = error.response

      if (response) {
        errorMessage.value =
          response.data.message || 'Something went wrong.'

        validationErrors.value =
          response.data.errors || {}
      } else {
        errorMessage.value =
          'Unable to connect to the server. Please try again.'
      }
    } else {
      errorMessage.value = 'An unexpected error occurred.'
    }
  }

  function clearErrors() {
    errorMessage.value = ''
    validationErrors.value = {}
  }

  function getFieldError(field: string): string {
    return validationErrors.value[field]?.[0] || ''
  }

  return {
    errorMessage,
    validationErrors,
    handleError,
    clearErrors,
    getFieldError,
  }
}
