/**
 * 비트 사운드 효과 (Web Audio API)
 * 외부 오디오 파일 없이 비트 소리 생성
 */

export class BeatSoundPlayer {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  async init(): Promise<void> {
    if (this.audioContext) return;

    this.audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * 비트 사운드 재생 (드럼 킥 스타일)
   */
  playBeat(isAccent: boolean = false): void {
    if (!this.audioContext || !this.isEnabled) return;

    const now = this.audioContext.currentTime;

    // 오실레이터 (베이스 톤)
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // 킥 드럼 스타일 사운드
    osc.type = "sine";
    osc.frequency.setValueAtTime(isAccent ? 150 : 100, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

    // 볼륨 엔벨로프
    gainNode.gain.setValueAtTime(isAccent ? 0.5 : 0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * 클릭 사운드 (하이햇 스타일)
   */
  playClick(): void {
    if (!this.audioContext || !this.isEnabled) return;

    const now = this.audioContext.currentTime;

    // 노이즈 생성
    const bufferSize = this.audioContext.sampleRate * 0.05;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    // 하이패스 필터
    const filter = this.audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 5000;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    noise.start(now);
    noise.stop(now + 0.05);
  }

  /**
   * 성공 사운드
   */
  playSuccess(): void {
    if (!this.audioContext || !this.isEnabled) return;

    const now = this.audioContext.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (메이저 코드)

    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      osc.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = now + i * 0.05;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  /**
   * 스테이지 전환 사운드
   */
  playStageUp(): void {
    if (!this.audioContext || !this.isEnabled) return;

    const now = this.audioContext.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      osc.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      osc.type = "triangle";
      osc.frequency.value = freq;

      const startTime = now + i * 0.1;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  /**
   * 카운트다운 사운드
   */
  playCountdown(number: number): void {
    if (!this.audioContext || !this.isEnabled) return;

    const now = this.audioContext.currentTime;

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    osc.type = "sine";
    // 숫자가 작을수록 높은 음
    osc.frequency.value = number === 0 ? 880 : 440 + (3 - number) * 100;

    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// 싱글톤 인스턴스
let soundPlayerInstance: BeatSoundPlayer | null = null;

export function getBeatSoundPlayer(): BeatSoundPlayer {
  if (!soundPlayerInstance) {
    soundPlayerInstance = new BeatSoundPlayer();
  }
  return soundPlayerInstance;
}

export function disposeBeatSoundPlayer(): void {
  if (soundPlayerInstance) {
    soundPlayerInstance.dispose();
    soundPlayerInstance = null;
  }
}
