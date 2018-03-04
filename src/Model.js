export type Session = {
  intensity: number,
  duration: ?number
}

export type Week = {
  sessions: Array<Session>
}