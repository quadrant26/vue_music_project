import { playMode } from "common/js/config";
import { loadSearch} from "common/js/cache";

const state = {
  singer: {},
  playing: false,   // 播放状态
  fullScreen: false, // 全屏设置
  playList: [],
  sequenceList: [],
  mode: playMode.sequence, // 设置播放模式
  currentIndex: -1, // 当前
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}

export default state
