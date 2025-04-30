import { _decorator, Component, Node, EditBox, Button, JsonAsset, assetManager } from 'cc';
import { Story, NodeType, DialogueNode, ChoiceNode, Choice } from './types';

const { ccclass, property } = _decorator;

@ccclass('StoryEditor')
export class StoryEditor extends Component {
    @property(EditBox)
    storyJsonEditBox: EditBox = null;
    
    @property(Button)
    saveButton: Button = null;
    
    @property(Button)
    loadButton: Button = null;
    
    private currentStory: Story = null;
    
    start() {
        // Подключаем обработчики кнопок
        this.saveButton.node.on(Button.EventType.CLICK, this.saveStory, this);
        this.loadButton.node.on(Button.EventType.CLICK, this.loadStory, this);
        
        // Создаем базовый шаблон истории, если EditBox пуст
        if (this.storyJsonEditBox && !this.storyJsonEditBox.string) {
            this.createEmptyStory();
        }
    }
    
    /**
     * Создает пустой шаблон истории
     */
    createEmptyStory() {
        const emptyStory: Story = {
            title: "Новая история",
            author: "Автор",
            firstNodeId: "start",
            nodes: {
                "start": {
                    type: NodeType.DIALOGUE,
                    background: "default.jpg",
                    character: {
                        left: {
                            name: "Персонаж",
                            image: "character.png",
                            emotion: "neutral"
                        },
                        right: null
                    },
                    text: "Привет! Это начало новой истории.",
                    nextNodeId: null
                }
            }
        };
        
        this.currentStory = emptyStory;
        this.storyJsonEditBox.string = JSON.stringify(emptyStory, null, 2);
    }
    
    /**
     * Загружает историю из текстового поля
     */
    loadStory() {
        try {
            const storyJson = this.storyJsonEditBox.string;
            this.currentStory = JSON.parse(storyJson);
            console.log("История успешно загружена", this.currentStory);
        } catch (e) {
            console.error("Ошибка при разборе JSON истории:", e);
        }
    }
    
    /**
     * Сохраняет историю в файл
     */
    saveStory() {
        try {
            // Сначала загружаем из текстового поля
            this.loadStory();
            
            // Здесь должен быть код для сохранения в файл
            // В Cocos Creator это можно реализовать через native.fileUtils в натив-билдах
            // или через localStorage в веб-версии
            
            console.log("История готова к сохранению:", JSON.stringify(this.currentStory));
            
            // Пример сохранения в localStorage для веб-версии
            localStorage.setItem('visual_novel_story', JSON.stringify(this.currentStory));
            console.log("История сохранена в localStorage");
        } catch (e) {
            console.error("Ошибка при сохранении истории:", e);
        }
    }
    
    /**
     * Добавляет новый узел диалога
     */
    addDialogueNode(id: string, text: string, background: string, nextNodeId: string = null): string {
        if (!this.currentStory) this.loadStory();
        
        const nodeId = id || `dialogue_${Date.now()}`;
        
        this.currentStory.nodes[nodeId] = {
            type: NodeType.DIALOGUE,
            background: background || "default.jpg",
            character: {
                left: {
                    name: "Персонаж",
                    image: "character.png",
                    emotion: "neutral"
                },
                right: null
            },
            text: text || "Новый диалог",
            nextNodeId: nextNodeId
        };
        
        // Обновляем текст в редакторе
        this.storyJsonEditBox.string = JSON.stringify(this.currentStory, null, 2);
        
        return nodeId;
    }
    
    /**
     * Добавляет новый узел выбора
     */
    addChoiceNode(id: string, text: string, background: string, choices: Choice[] = []): string {
        if (!this.currentStory) this.loadStory();
        
        const nodeId = id || `choice_${Date.now()}`;
        
        this.currentStory.nodes[nodeId] = {
            type: NodeType.CHOICE,
            background: background || "default.jpg",
            character: {
                left: {
                    name: "Персонаж",
                    image: "character.png",
                    emotion: "question"
                },
                right: null
            },
            text: text || "Сделайте выбор",
            choices: choices.length > 0 ? choices : [
                {
                    text: "Вариант 1",
                    nextNodeId: null
                },
                {
                    text: "Вариант 2",
                    nextNodeId: null
                }
            ],
            nextNodeId: null
        };
        
        // Обновляем текст в редакторе
        this.storyJsonEditBox.string = JSON.stringify(this.currentStory, null, 2);
        
        return nodeId;
    }
}
