import { _decorator, Component, Node, Prefab, instantiate, UITransform, Vec3, Sprite, Label, Button, resources, SpriteFrame } from 'cc';
import { GameController } from './GameController';
import { StoryLoader } from './StoryLoader';
import { ResourceTester } from './ResourceTester';

const { ccclass, property } = _decorator;

@ccclass('SceneBuilder')
export class SceneBuilder extends Component {
    @property(Prefab)
    choiceButtonPrefab: Prefab = null;
    
    start() {
        // Создаем сцену
        this.buildMainScene();
    }
    
    /**
     * Создает основную структуру сцены
     */
    buildMainScene() {
        // Создаем узел для фона
        const backgroundNode = new Node('Background');
        backgroundNode.addComponent(UITransform).setContentSize(1280, 720);
        backgroundNode.addComponent(Sprite);
        backgroundNode.layer = this.node.layer;
        this.node.addChild(backgroundNode);
        
        // Тестовые ноды для ResourceTester
        const testBackgroundNode = new Node('TestBackground');
        testBackgroundNode.addComponent(UITransform).setContentSize(400, 300);
        testBackgroundNode.addComponent(Sprite);
        testBackgroundNode.position = new Vec3(400, 300, 0);
        testBackgroundNode.layer = this.node.layer;
        this.node.addChild(testBackgroundNode);
        
        const testCharacterNode = new Node('TestCharacter');
        testCharacterNode.addComponent(UITransform).setContentSize(200, 400);
        testCharacterNode.addComponent(Sprite);
        testCharacterNode.position = new Vec3(-400, 300, 0);
        testCharacterNode.layer = this.node.layer;
        this.node.addChild(testCharacterNode);
        
        // Слой персонажей
        const charactersLayer = new Node('Characters');
        charactersLayer.addComponent(UITransform).setContentSize(1280, 720);
        charactersLayer.layer = this.node.layer;
        this.node.addChild(charactersLayer);
        
        // Левый персонаж
        const leftCharNode = new Node('LeftCharacter');
        leftCharNode.addComponent(UITransform).setContentSize(400, 800);
        leftCharNode.addComponent(Sprite);
        leftCharNode.position = new Vec3(-350, -50, 0);
        leftCharNode.layer = charactersLayer.layer;
        charactersLayer.addChild(leftCharNode);
        
        // Правый персонаж
        const rightCharNode = new Node('RightCharacter');
        rightCharNode.addComponent(UITransform).setContentSize(400, 800);
        rightCharNode.addComponent(Sprite);
        rightCharNode.position = new Vec3(350, -50, 0);
        rightCharNode.layer = charactersLayer.layer;
        charactersLayer.addChild(rightCharNode);
        
        // Создаем диалоговое окно
        const dialogueNode = new Node('DialogueBox');
        dialogueNode.addComponent(UITransform).setContentSize(1000, 200);
        const dialogueBg = dialogueNode.addComponent(Sprite);
        // Задаем полупрозрачный черный фон для диалога
        dialogueBg.color.set(0, 0, 0, 180);
        dialogueNode.position = new Vec3(0, -220, 0);
        dialogueNode.layer = this.node.layer;
        this.node.addChild(dialogueNode);
        
        // Текст диалога
        const textNode = new Node('DialogueText');
        textNode.addComponent(UITransform).setContentSize(900, 150);
        const textLabel = textNode.addComponent(Label);
        textLabel.color.set(255, 255, 255, 255);
        textLabel.fontSize = 24;
        textLabel.lineHeight = 32;
        textLabel.string = "Текст диалога будет отображаться здесь...";
        textNode.position = new Vec3(0, -10, 0);
        textNode.layer = dialogueNode.layer;
        dialogueNode.addChild(textNode);
        
        // Имя говорящего
        const speakerNode = new Node('SpeakerName');
        speakerNode.addComponent(UITransform).setContentSize(200, 40);
        const speakerBg = speakerNode.addComponent(Sprite);
        speakerBg.color.set(50, 50, 100, 200);
        speakerNode.position = new Vec3(-400, 100, 0);
        speakerNode.layer = dialogueNode.layer;
        dialogueNode.addChild(speakerNode);
        
        const speakerTextNode = new Node('SpeakerText');
        speakerTextNode.addComponent(UITransform).setContentSize(180, 30);
        const speakerLabel = speakerTextNode.addComponent(Label);
        speakerLabel.color.set(255, 255, 255, 255);
        speakerLabel.fontSize = 22;
        speakerLabel.string = "Имя";
        speakerTextNode.layer = speakerNode.layer;
        speakerNode.addChild(speakerTextNode);
        
        // Контейнер для вариантов выбора
        const choicesNode = new Node('ChoicesContainer');
        choicesNode.addComponent(UITransform).setContentSize(800, 300);
        choicesNode.position = new Vec3(0, 0, 0);
        choicesNode.layer = this.node.layer;
        choicesNode.active = false;  // Изначально скрываем контейнер выбора
        this.node.addChild(choicesNode);
        
        // Добавляем GameController
        const gameController = this.node.addComponent(GameController);
        gameController.backgroundNode = backgroundNode;
        gameController.leftCharacterNode = leftCharNode;
        gameController.rightCharacterNode = rightCharNode;
        gameController.dialogueBox = dialogueNode;
        gameController.dialogueText = textLabel;
        gameController.speakerNameText = speakerLabel;
        gameController.choiceContainer = choicesNode;
        gameController.choiceButtonPrefab = this.choiceButtonPrefab;
        
        // Добавляем StoryLoader
        this.node.addComponent(StoryLoader);
        
        // Добавляем ResourceTester
        const resourceTester = this.node.addComponent(ResourceTester);
        resourceTester.testBackgroundNode = testBackgroundNode;
        resourceTester.testCharacterNode = testCharacterNode;
        
        console.log("Scene successfully created");
    }
}
