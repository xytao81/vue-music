import * as types from './mutationTypes'

export const selectPlay = ({commit, state}, {list, index}) => {
    commit(types.SET_SEQUENCELIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_CURRENTINDEX, index)
}