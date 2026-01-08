/**
 * BeatOnWord 비트 동기화 엔진
 * Web Audio API를 사용한 정밀한 비트 타이밍
 */

export type BeatCallback = (beatIndex: number, timestamp: number) => void;

export class BeatSyncEngine {
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;

  private bpm: number;
  private startOffset: number;
  private startTime: number = 0;
  private pausedAt: number = 0;
  private isPlaying: boolean = false;

  // 오디오 없이 타이머 기반으로 동작
  private audioLoaded: boolean = false;
  private timerStartTime: number = 0;

  private onBeatCallback: BeatCallback | null = null;
  private animationFrameId: number | null = null;
  private lastBeatIndex: number = -1;

  constructor(bpm: number = 120, startOffset: number = 0) {
    this.bpm = bpm;
    this.startOffset = startOffset;
  }

  /**
   * AudioContext 초기화 (사용자 인터랙션 후 호출 필요)
   */
  async init(): Promise<void> {
    if (this.audioContext) return;

    this.audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  /**
   * 오디오 파일 로드 (실패해도 게임은 계속 진행)
   */
  async loadAudio(url: string): Promise<void> {
    if (!this.audioContext) {
      await this.init();
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
      this.audioLoaded = true;
      console.log("Audio loaded successfully");
    } catch (error) {
      // 오디오 로드 실패 시 타이머 기반으로 동작
      console.warn("Audio load failed, using timer-based beats:", error);
      this.audioLoaded = false;
      // 에러를 throw하지 않음 - 게임은 계속 진행
    }
  }

  /**
   * BPM 설정 (실시간 변경 지원)
   */
  setBpm(bpm: number): void {
    // 현재 비트 인덱스 저장
    const currentBeat = this.getCurrentBeatIndex();
    const currentTime = this.getCurrentTime();

    this.bpm = bpm;

    // 타이머 모드일 때 시작 시간 재조정
    if (!this.audioLoaded && this.isPlaying) {
      // 새 BPM으로 현재 비트 위치 유지
      const beatInterval = 60000 / bpm;
      const expectedTime = currentBeat * beatInterval;
      this.timerStartTime = performance.now() - expectedTime;
    }
  }

  /**
   * 현재 BPM 가져오기
   */
  getBpm(): number {
    return this.bpm;
  }

  /**
   * 시작 오프셋 설정
   */
  setStartOffset(offset: number): void {
    this.startOffset = offset;
  }

  /**
   * 볼륨 설정 (0-1)
   */
  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  /**
   * 비트 콜백 등록
   */
  onBeat(callback: BeatCallback): void {
    this.onBeatCallback = callback;
  }

  /**
   * 재생 시작
   */
  start(): void {
    if (this.isPlaying) return;

    // 오디오가 로드된 경우 오디오 재생
    if (this.audioLoaded && this.audioContext && this.audioBuffer && this.gainNode) {
      // 이전 sourceNode 정리
      if (this.sourceNode) {
        this.sourceNode.disconnect();
      }

      // 새 sourceNode 생성
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      this.sourceNode.connect(this.gainNode);

      // 시작 시간 계산
      const offsetSeconds = (this.pausedAt || this.startOffset) / 1000;
      this.startTime = this.audioContext.currentTime - offsetSeconds;

      this.sourceNode.start(0, offsetSeconds);
    } else {
      // 타이머 기반 모드
      this.timerStartTime = performance.now() - (this.pausedAt || this.startOffset);
    }

    this.isPlaying = true;
    this.lastBeatIndex = -1;

    // 비트 트래킹 시작
    this.startBeatTracking();
  }

  /**
   * 일시 정지
   */
  pause(): void {
    if (!this.isPlaying) return;

    this.pausedAt = this.getCurrentTime();

    if (this.audioLoaded && this.sourceNode) {
      this.sourceNode.stop();
    }

    this.isPlaying = false;
    this.stopBeatTracking();
  }

  /**
   * 재개
   */
  resume(): void {
    if (this.isPlaying) return;
    this.start();
  }

  /**
   * 정지
   */
  stop(): void {
    if (this.sourceNode) {
      try {
        this.sourceNode.stop();
      } catch {
        // 이미 정지된 경우 무시
      }
      this.sourceNode.disconnect();
    }

    this.isPlaying = false;
    this.pausedAt = 0;
    this.lastBeatIndex = -1;
    this.stopBeatTracking();
  }

  /**
   * 현재 재생 시간 (ms)
   */
  getCurrentTime(): number {
    if (!this.isPlaying) {
      return this.pausedAt;
    }

    // 오디오 모드
    if (this.audioLoaded && this.audioContext) {
      return (this.audioContext.currentTime - this.startTime) * 1000;
    }

    // 타이머 모드
    return performance.now() - this.timerStartTime;
  }

  /**
   * 현재 비트 인덱스
   */
  getCurrentBeatIndex(): number {
    const beatInterval = 60000 / this.bpm;
    return Math.floor(this.getCurrentTime() / beatInterval);
  }

  /**
   * 다음 비트까지 남은 시간 (ms)
   */
  getTimeToNextBeat(): number {
    const beatInterval = 60000 / this.bpm;
    const currentTime = this.getCurrentTime();
    const nextBeatTime = (Math.floor(currentTime / beatInterval) + 1) * beatInterval;
    return nextBeatTime - currentTime;
  }

  /**
   * 재생 중 여부
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * 오디오 로드 여부
   */
  hasAudio(): boolean {
    return this.audioLoaded;
  }

  /**
   * 비트 간격 (ms)
   */
  getBeatInterval(): number {
    return 60000 / this.bpm;
  }

  /**
   * 비트 트래킹 시작
   */
  private startBeatTracking(): void {
    const track = () => {
      if (!this.isPlaying) return;

      const currentBeatIndex = this.getCurrentBeatIndex();

      if (currentBeatIndex > this.lastBeatIndex) {
        this.lastBeatIndex = currentBeatIndex;
        this.onBeatCallback?.(currentBeatIndex, this.getCurrentTime());
      }

      this.animationFrameId = requestAnimationFrame(track);
    };

    track();
  }

  /**
   * 비트 트래킹 정지
   */
  private stopBeatTracking(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * 리소스 정리
   */
  dispose(): void {
    this.stop();
    this.audioBuffer = null;

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

/**
 * 비트 동기화 엔진 싱글톤 인스턴스 (선택적)
 */
let engineInstance: BeatSyncEngine | null = null;

export function getBeatSyncEngine(): BeatSyncEngine {
  if (!engineInstance) {
    engineInstance = new BeatSyncEngine();
  }
  return engineInstance;
}

export function disposeBeatSyncEngine(): void {
  if (engineInstance) {
    engineInstance.dispose();
    engineInstance = null;
  }
}
