
export function formatDate(date?: string): string {
  if (!date) return 'Date unavailable'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date unavailable'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

export function formatRelativeDate(date?: string): string {
  if (!date) return 'Date unavailable'

  const inputDate = new Date(date)

  if (Number.isNaN(inputDate.getTime())) {
    return 'Date unavailable'
  }

  const today = new Date()

  const diff = Math.floor(
    (today.getTime() - inputDate.getTime()) / 86400000,
  )

  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7 && diff > 1) return `${diff} days ago`

  return formatDate(date)
}
