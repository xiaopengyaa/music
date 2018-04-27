import storage from 'good-storage'

const SEARCH_HISTORY = '__search__'
const HISTORY_MAX_LENGTH = 15
const PLAY_HISTORY = '__play__'
const PLAY_MAX_LENGTH = 100
const FAVORITE_LIST = '__favorite__'
const FAVORITE_MAX_LENGTH = 100

function insertArray(arr, val, compare, maxLength) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLength && arr.length > maxLength) {
    arr.pop()
  }
}

function deleteArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_HISTORY, [])

  insertArray(searches, query, (item) => {
    return item === query
  }, HISTORY_MAX_LENGTH)

  storage.set(SEARCH_HISTORY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_HISTORY, [])

  deleteArray(searches, (item) => {
    return item === query
  })

  storage.set(SEARCH_HISTORY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_HISTORY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_HISTORY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_HISTORY, [])

  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)

  storage.set(PLAY_HISTORY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_HISTORY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_LIST, [])

  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)

  storage.set(FAVORITE_LIST, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_LIST, [])

  deleteArray(songs, (item) => {
    return item.id === song.id
  })

  storage.set(FAVORITE_LIST, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_LIST, [])
}
