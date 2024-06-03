export function calculateDueDate(date: Date, days: number): Date {
  const newDate = new Date(date.getTime())

  newDate.setDate(newDate.getDate() + days)

  return newDate
}
