import { _decorator, Component, AudioSource, resources, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    private static _instance: AudioManager = null;
    
    @property(AudioSource)
    bgmSource: AudioSource = null;
    
    @property(AudioSource)
    sfxSource: AudioSource = null;
    
    private _bgmVolume: number = 0.5;
    private _sfxVolume: number = 0.7;
    private _currentBgm: string = '';
    
    public static get instance(): AudioManager {
        return AudioManager._instance;
    }
    
    onLoad() {
        if (AudioManager._instance === null) {
            AudioManager._instance = this;
        } else {
            this.node.destroy();
        }
    }
    
    /**
     * Воспроизводит фоновую музыку
     * @param clipName Имя аудиофайла (без расширения)
     * @param loop Зацикливать ли воспроизведение
     */
    playBGM(clipName: string, loop: boolean = true) {
        // Если уже играет та же музыка, ничего не делаем
        if (this._currentBgm === clipName && this.bgmSource.playing) return;
        
        // Путь к аудиофайлу
        const audioPath = `audio/bgm/${clipName}`;
        
        resources.load(audioPath, AudioClip, (err, clip) => {
            if (clip) {
                this._currentBgm = clipName;
                this.bgmSource.clip = clip;
                this.bgmSource.loop = loop;
                this.bgmSource.volume = this._bgmVolume;
                this.bgmSource.play();
            }
        });
    }
    
    /**
     * Останавливает фоновую музыку
     */
    stopBGM() {
        this.bgmSource.stop();
        this._currentBgm = '';
    }
    
    /**
     * Воспроизводит звуковой эффект
     * @param clipName Имя аудиофайла (без расширения)
     */
    playSFX(clipName: string) {
        // Путь к аудиофайлу
        const audioPath = `audio/sfx/${clipName}`;
        
        resources.load(audioPath, AudioClip, (err, clip) => {
            if (clip) {
                this.sfxSource.clip = clip;
                this.sfxSource.loop = false;
                this.sfxSource.volume = this._sfxVolume;
                this.sfxSource.play();
            }
        });
    }
    
    /**
     * Устанавливает громкость фоновой музыки
     * @param volume Значение громкости (0-1)
     */
    setBGMVolume(volume: number) {
        this._bgmVolume = Math.max(0, Math.min(1, volume));
        this.bgmSource.volume = this._bgmVolume;
    }
    
    /**
     * Устанавливает громкость звуковых эффектов
     * @param volume Значение громкости (0-1)
     */
    setSFXVolume(volume: number) {
        this._sfxVolume = Math.max(0, Math.min(1, volume));
        this.sfxSource.volume = this._sfxVolume;
    }
}
