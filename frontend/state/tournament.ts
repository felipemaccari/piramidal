import create from 'zustand'

interface TournamentState {
  tournamentID: string
  description: string
  initialDate: any
  finalDate: any
  active: boolean
  setTournament: (
    id: string,
    description: string,
    initialDate: any,
    finalDate: any,
    active: boolean
  ) => void
}

export const useTournamentState = create<TournamentState>()(set => ({
  tournamentID: '',
  description: '',
  initialDate: '',
  finalDate: '',
  active: false,
  setTournament: (
    tournamentID: string,
    description: string,
    initialDate: string,
    finalDate: string,
    active: boolean
  ) =>
    set(() => ({
      tournamentID,
      description,
      initialDate,
      finalDate,
      active
    }))
}))
