import * as types from './mutation-types'
import { playMode} from "common/js/config";
import {shuffle} from "common/js/util";
import { saveSearch, deleteSearch, clearSearch } from "common/js/cache";

function findIndex (list, song){
  return list.findIndex( (item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if ( state.mode === playMode.radom ){
    let randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST, randomlist)
    index = findIndex(randomlist, list[index])
  }else{
    commit(types.SET_PLAY_LIST, list)
  }

  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.radom)
  commit(types.SET_SEQUENCE_LIST, list)

  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ( {commit, state}, song){
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let curentSong = playlist[currentIndex]
  // 查找当前列表时候有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 插入歌曲， 索引 +1
  currentIndex ++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含这首歌
  if ( fpIndex > -1){
    // 当前插入的序号大于列表中的序号
    if ( currentIndex > fpIndex ){
      playlist.splice(fpIndex, 1)
      currentIndex --
    } else{
      playlist.splice(fpIndex+1, 1)
    }
  }

  let currentSIndex = findIndex(sequencelist, curentSong) + 1

  let fsIndex = findIndex(sequencelist, song)
  sequencelist.splice(currentIndex,  0, song)

  if ( fsIndex > -1){
    if ( currentIndex > fsIndex){
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex+1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}


export const saveSearchHistory = function ({commit}, query){
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}){
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
