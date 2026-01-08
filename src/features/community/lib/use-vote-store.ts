/**
 * 투표 시스템 (localStorage 기반)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

type VoteType = "up" | "down" | null;

interface VoteState {
  // 사용자 투표 기록
  votes: Record<string, VoteType>;
  // 각 챌린지의 투표 수
  voteCounts: Record<string, { up: number; down: number }>;
}

interface VoteActions {
  // 투표하기
  vote: (challengeId: string, type: "up" | "down") => void;
  // 투표 취소
  clearVote: (challengeId: string) => void;
  // 내 투표 확인
  getMyVote: (challengeId: string) => VoteType;
  // 투표 수 가져오기
  getVoteCounts: (challengeId: string) => { up: number; down: number };
  // 초기 투표 수 설정 (샘플 데이터용)
  initVoteCounts: (challengeId: string, up: number, down: number) => void;
}

export const useVoteStore = create<VoteState & VoteActions>()(
  persist(
    (set, get) => ({
      votes: {},
      voteCounts: {},

      vote: (challengeId, type) => {
        const currentVote = get().votes[challengeId];
        const counts = get().voteCounts[challengeId] || { up: 0, down: 0 };

        let newCounts = { ...counts };

        // 같은 투표면 취소
        if (currentVote === type) {
          newCounts[type]--;
          set((state) => ({
            votes: { ...state.votes, [challengeId]: null },
            voteCounts: { ...state.voteCounts, [challengeId]: newCounts },
          }));
          return;
        }

        // 이전 투표 취소
        if (currentVote) {
          newCounts[currentVote]--;
        }

        // 새 투표 적용
        newCounts[type]++;

        set((state) => ({
          votes: { ...state.votes, [challengeId]: type },
          voteCounts: { ...state.voteCounts, [challengeId]: newCounts },
        }));
      },

      clearVote: (challengeId) => {
        const currentVote = get().votes[challengeId];
        if (!currentVote) return;

        const counts = get().voteCounts[challengeId] || { up: 0, down: 0 };
        counts[currentVote]--;

        set((state) => ({
          votes: { ...state.votes, [challengeId]: null },
          voteCounts: { ...state.voteCounts, [challengeId]: counts },
        }));
      },

      getMyVote: (challengeId) => get().votes[challengeId] ?? null,

      getVoteCounts: (challengeId) => get().voteCounts[challengeId] || { up: 0, down: 0 },

      initVoteCounts: (challengeId, up, down) => {
        const current = get().voteCounts[challengeId];
        if (!current) {
          set((state) => ({
            voteCounts: { ...state.voteCounts, [challengeId]: { up, down } },
          }));
        }
      },
    }),
    {
      name: "beatonword-votes",
    }
  )
);

// 투표 버튼 컴포넌트용 훅
export function useVote(challengeId: string) {
  const { vote, getMyVote, getVoteCounts, initVoteCounts } = useVoteStore();

  const myVote = getMyVote(challengeId);
  const counts = getVoteCounts(challengeId);

  const handleUpvote = () => vote(challengeId, "up");
  const handleDownvote = () => vote(challengeId, "down");

  return {
    myVote,
    upvotes: counts.up,
    downvotes: counts.down,
    handleUpvote,
    handleDownvote,
    initVoteCounts: (up: number, down: number) => initVoteCounts(challengeId, up, down),
  };
}
