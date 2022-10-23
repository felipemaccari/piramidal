import create from 'zustand'

interface TournamentState {
  id: string
  description: string
  initialDate: string
  finalDate: string
  active: boolean
  setTournament: (
    id: string,
    description: string,
    initialDate: string,
    finalDate: string,
    active: boolean
  ) => void
}

export const useTournamentState = create<TournamentState>()(set => ({
  id: '',
  description: '',
  initialDate: '',
  finalDate: '',
  active: false,
  setTournament: (
    id: string,
    description: string,
    initialDate: string,
    finalDate: string,
    active: boolean
  ) =>
    set(() => ({
      id,
      description,
      initialDate,
      finalDate,
      active
    }))
}))
