import { _decorator, Component, Node, Button, Label, Sprite } from 'cc';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';

const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(Node)
    menuPanel: Node = null;
    
    @property(Node)
    settingsPanel: Node = null;
    
    @property(Button)
    menuButton: Button = null;
    
    @property(Button)
    settingsButton: Button = null;
    
    @property(Button)
    saveButton: Button = null;
    
    @property(Button)
    loadButton: Button = null;
    
    @property(GameController)
    gameController: GameController = null;
    
    @property(Node)
    skipButton: Node = null;
    
    @property(Node)
    autoButton: Node = null;
    
    private _isAutoMode: boolean = false;
    private _isSkipMode: boolean = false;
    
    start() {
        // Инициализация UI
        this.initUI();
        
        // Скрываем панели при старте
        this.hideAllPanels();
    }
    
    /**
     * Инициализирует UI и добавляет обработчики кнопок
     */
    initUI() {
        // Меню
        this.menuButton.node.on(Button.EventType.CLICK, this.toggleMenuPanel, this);
        
        // Настройки
        this.settingsButton.node.on(Button.EventType.CLICK, this.toggleSettingsPanel, this);
        
        // Сохранение/загрузка
        if (this.saveButton) {
            this.saveButton.node.on(Button.EventType.CLICK, this.saveGame, this);
        }
        
        if (this.loadButton) {
            this.loadButton.node.on(Button.EventType.CLICK, this.loadGame, this);
        }
        
        // Кнопки режимов
        if (this.skipButton) {
            this.skipButton.on(Node.EventType.TOUCH_END, this.toggleSkipMode, this);
        }
        
        if (this.autoButton) {
            this.autoButton.on(Node.EventType.TOUCH_END, this.toggleAutoMode, this);
        }
    }
    
    /**
     * Скрывает все UI панели
     */
    hideAllPanels() {
        if (this.menuPanel) this.menuPanel.active = false;
        if (this.settingsPanel) this.settingsPanel.active = false;
    }
    
    /**
     * Переключает видимость панели меню
     */
    toggleMenuPanel() {
        if (this.menuPanel) {
            this.menuPanel.active = !this.menuPanel.active;
            
            // Скрываем другие панели
            if (this.menuPanel.active && this.settingsPanel) {
                this.settingsPanel.active = false;
            }
        }
    }
    
    /**
     * Переключает видимость панели настроек
     */
    toggleSettingsPanel() {
        if (this.settingsPanel) {
            this.settingsPanel.active = !this.settingsPanel.active;
            
            // Скрываем другие панели
            if (this.settingsPanel.active && this.menuPanel) {
                this.menuPanel.active = false;
            }
        }
    }
    
    /**
     * Сохраняет текущее состояние игры
     */
    saveGame() {
        console.log('Сохранение игры...');
        // TODO: Реализация сохранения
    }
    
    /**
     * Загружает сохраненное состояние игры
     */
    loadGame() {
        console.log('Загрузка игры...');
        // TODO: Реализация загрузки
    }
    
    /**
     * Переключает режим пропуска
     */
    toggleSkipMode() {
        this._isSkipMode = !this._isSkipMode;
        
        // Если включили режим пропуска, выключаем авторежим
        if (this._isSkipMode) {
            this._isAutoMode = false;
        }
        
        console.log('Режим пропуска: ' + (this._isSkipMode ? 'Включен' : 'Выключен'));
    }
    
    /**
     * Переключает авторежим
     */
    toggleAutoMode() {
        this._isAutoMode = !this._isAutoMode;
        
        // Если включили авторежим, выключаем режим пропуска
        if (this._isAutoMode) {
            this._isSkipMode = false;
        }
        
        console.log('Авторежим: ' + (this._isAutoMode ? 'Включен' : 'Выключен'));
    }
}
