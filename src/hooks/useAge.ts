export function useAge(birthday: string) {
  const bd = new Date(birthday)
  const now = new Date()
  let age = now.getFullYear() - bd.getFullYear()
  const monthDiff = now.getMonth() - bd.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < bd.getDate())) age--
  return age
}
