import { Mutations, MutationsInterface } from "~/store/Challenges/types";

export default {
  [Mutations.SET_CURRENT_CHALLENGE_INDEX] (state, index) {
    state.currentChallengeIndex = index
  },
  [Mutations.SET_IS_LEVEL_UP_MODAL_OPEN] (state, flag) {
    state.isLevelUpModalOpen = flag
  },
  [Mutations.COMPLETE_CHALLENGE] (state, xpAmount) {
    const { current, end } = state.xp
    const totalXp = current + xpAmount
    const shouldLevelUp = totalXp >= end

    state.completedChallenges++

    if(shouldLevelUp) {
      state.level++
      const remainingXp = totalXp - end
      const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2)

      state.xp = {
        current: remainingXp,
        start: 0,
        end: experienceToNextLevel
      }

      state.isLevelUpModalOpen = true
      return
    }

    state.xp = {
      ...state.xp,
      current: totalXp
    }
  },
  [Mutations.SAVE_COOKIE_DATA] (state, cookie) {
    state.level = cookie.level
    state.xp = cookie.xp
    state.completedChallenges = cookie.completedChallenges
  }
}as MutationsInterface
