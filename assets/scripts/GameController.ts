import { _decorator, Component, Node, Sprite, SpriteFrame, Label, Prefab, resources, UITransform, Color, instantiate, Texture2D } from 'cc';
import { StoryLoader } from './StoryLoader';
import { NodeType, DialogueNode, ChoiceNode, Choice } from './types';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    backgroundNode: Node = null;
    
    @property(Node)
    leftCharacterNode: Node = null;
    
    @property(Node)
    rightCharacterNode: Node = null;
    
    @property(Node)
    dialogueBox: Node = null;
    
    @property(Label)
    dialogueText: Label = null;
    
    @property(Label)
    speakerNameText: Label = null;
    
    @property(Node)
    choiceContainer: Node = null;
    
    @property(Node)
    choiceButtonPrefab: Node = null;
    
    private currentNodeId: string | null = null;
    
    start() {
        // Temporarily disabled story loading for testing ResourceTester
        //console.log("GameController: Story loading disabled for testing");
        
        
        // Загружаем сюжет и начинаем игру
        StoryLoader.instance.loadStory('data/story', (story) => {
            this.currentNodeId = story.firstNodeId;
            this.displayNode(this.currentNodeId);
        });
    }
    
    /**
     * Отображает узел сюжета
     * @param nodeId ID узла сюжета
     */
    displayNode(nodeId: string) {
        const node = StoryLoader.instance.getStoryNode(nodeId);
        if (!node) return;

        // Устанавливаем фон
        this.setBackground(node.background);
        
        // Устанавливаем персонажей
        this.setCharacter('left', node.character.left);
        this.setCharacter('right', node.character.right);
        
        // Устанавливаем текст диалога
        this.dialogueText.string = node.text;
        
        // Устанавливаем имя говорящего (берем имя персонажа слева или справа)
        const speaker = node.character.left ? node.character.left.name : 
                        (node.character.right ? node.character.right.name : "");
        this.speakerNameText.string = speaker;
        
        // Обрабатываем узел в зависимости от его типа
        switch(node.type) {
            case NodeType.DIALOGUE:
                this.handleDialogueNode(node as DialogueNode);
                break;
            case NodeType.CHOICE:
                this.handleChoiceNode(node as ChoiceNode);
                break;
        }
    }
    
    /**
     * Устанавливает фоновое изображение
     * @param backgroundImage Имя файла фонового изображения
     */
    setBackground(backgroundImage: string) {
        // Fix the path to include the /spriteFrame suffix
        resources.load(`backgrounds/${backgroundImage}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error(`Error loading background: ${err}, path: backgrounds/${backgroundImage}/spriteFrame`);
                return;
            }
            
            if (this.backgroundNode) {
                const sprite = this.backgroundNode.getComponent(Sprite);
                if (sprite) {
                    sprite.spriteFrame = spriteFrame;
                    console.log(`Background loaded successfully: ${backgroundImage}`);
                }
            }
        });
    }
    
    /**
     * Sets character sprite based on character image name
     * @param position Position of the character (left or right)
     * @param character Character data
     */
    setCharacter(position: 'left' | 'right', character: { name: string, image: string, emotion: string } | null) {
        const characterNode = position === 'left' ? this.leftCharacterNode : this.rightCharacterNode;
        
        if (!characterNode) return;
        
        // If character is null, hide the node
        if (!character) {
            characterNode.active = false;
            return;
        }
        
        // Show the node and set character image
        characterNode.active = true;
        
        // Fix the path to include the /spriteFrame suffix
        const imagePath = `characters/${character.image}/spriteFrame`;
        
        console.log(`Loading character image: ${imagePath}`);
        
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error(`Error loading character: ${err}, path: ${imagePath}`);
                return;
            }
            
            const sprite = characterNode.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
                console.log(`Character successfully set: ${character.image} at ${position}`);
            }
        });
    }
    
    /**
     * Обрабатывает узел диалога
     * @param node Узел диалога
     */
    handleDialogueNode(node: DialogueNode) {
        // Скрываем контейнер выбора
        this.choiceContainer.active = false;
        
        // Включаем обработку касаний для перехода к следующему узлу
        this.dialogueBox.once(Node.EventType.TOUCH_END, () => {
            if (node.nextNodeId) {
                this.displayNode(node.nextNodeId);
            }
        });
    }
    
    /**
     * Обрабатывает узел выбора
     * @param node Узел выбора
     */
    handleChoiceNode(node: ChoiceNode) {
        // Показываем контейнер выбора
        this.choiceContainer.active = true;
        
        // Очищаем существующие кнопки выбора
        this.choiceContainer.removeAllChildren();
        
        // Создаем кнопки для каждого варианта выбора
        node.choices.forEach((choice, index) => {
            this.createChoiceButton(choice, index);
        });
    }
    
    /**
     * Создает кнопку выбора
     * @param choice Данные о выборе
     * @param index Индекс кнопки
     */
    createChoiceButton(choice: Choice, index: number) {
        if (!this.choiceButtonPrefab) return;
        
        // Клонируем префаб кнопки
        const button = instantiate(this.choiceButtonPrefab);
        this.choiceContainer.addChild(button);
        
        // Устанавливаем текст кнопки
        const buttonLabel = button.getComponent(Label);
        if (buttonLabel) {
            buttonLabel.string = choice.text;
        }
        
        // Устанавливаем позицию кнопки
        const uiTransform = button.getComponent(UITransform);
        if (uiTransform) {
            button.position.set(0, -index * (uiTransform.height + 10), 0);
        }
        
        // Добавляем обработчик нажатия
        button.once(Node.EventType.TOUCH_END, () => {
            this.displayNode(choice.nextNodeId);
        });
    }
}
