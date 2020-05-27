import { playMode } from '@/assets/js/config'
import { loadSearch, loadSong, loadFavourite } from '@/assets/js/cache'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    toplist: {},
    searchHistory: loadSearch(),
    playHistory: loadSong(),
    favouriteList: loadFavourite()
}

export default state