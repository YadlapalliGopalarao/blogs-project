
import { IMAGE_CONFIG } from './constants'

export function isRequired(value: string): boolean {
  return value.trim().length > 0
}

export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailPattern.test(email.trim())
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

export function passwordsMatch(
  password: string,
  confirmation: string,
): boolean {
  return password === confirmation
}

export function isValidImage(file: File): boolean {
  return IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type)
}

export function isValidImageSize(file: File): boolean {
  const maxSize = IMAGE_CONFIG.MAX_SIZE_MB * 1024 * 1024

  return file.size <= maxSize
}

export function validateImage(file: File): string | null {
  if (!isValidImage(file)) {
    return 'Only PNG, JPG and JPEG images are allowed.'
  }

  if (!isValidImageSize(file)) {
    return `Image size must not exceed ${IMAGE_CONFIG.MAX_SIZE_MB} MB.`
  }

  return null
}
