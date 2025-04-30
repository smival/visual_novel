import { _decorator, Component, Node, director } from 'cc';
import { GameController } from './GameController';
import { StoryLoader } from './StoryLoader';

const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    @property(Node)
    gameControllerNode: Node = null;
    
    @property(Node)
    loadingScreen: Node = null;
    
    start() {
        // Показываем экран загрузки
        if (this.loadingScreen) {
            this.loadingScreen.active = true;
        }
        
        // Инициализируем загрузчик сюжета
        const storyLoader = this.node.getComponentInChildren(StoryLoader);
        if (!storyLoader) {
            console.error('StoryLoader не найден!');
            return;
        }
        
        // Инициализируем контроллер игры
        const gameController = this.gameControllerNode?.getComponent(GameController);
        if (!gameController) {
            console.error('GameController не найден!');
            return;
        }
        
        // Скрываем экран загрузки и запускаем игру
        if (this.loadingScreen) {
            this.loadingScreen.active = false;
        }
    }
    
    /**
     * Открывает меню игры
     */
    openMenu() {
        // Тут можно реализовать переход в меню
        console.log('Открытие меню');
    }
    
    /**
     * Перезапускает игру
     */
    restartGame() {
        director.loadScene('MainScene');
    }
}
