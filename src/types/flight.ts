export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7
export interface Flight {
  id: string
  aoc: string
  flightNumber: string
  origin: string
  destination: string
  std: string
  sta: string
  daysOfOperation: DayOfWeek[]
  bodyType: 'narrow_body' | 'wide_body'
  startDate: string
  endDate: string
  status: 'Active' | 'Inactive'
}