// Типы узлов сюжета
export enum NodeType {
    DIALOGUE = 'dialogue',
    CHOICE = 'choice',
}

// Интерфейс персонажа
export interface Character {
    name: string;
    image: string;
    emotion: string;
}

// Интерфейс размещения персонажей на экране
export interface CharacterPlacement {
    left: Character | null;
    right: Character | null;
}

// Интерфейс выбора в диалоге
export interface Choice {
    text: string;
    nextNodeId: string;
}

// Базовый интерфейс для узла сюжета
export interface StoryNode {
    type: NodeType;
    background: string;
    character: CharacterPlacement;
    text: string;
    nextNodeId: string | null;
}

// Узел диалога
export interface DialogueNode extends StoryNode {
    type: NodeType.DIALOGUE;
}

// Узел выбора
export interface ChoiceNode extends StoryNode {
    type: NodeType.CHOICE;
    choices: Choice[];
    nextNodeId: null; // Для узла выбора nextNodeId всегда null, так как переход определяется выбором
}

// Полная структура сюжета
export interface Story {
    title: string;
    author: string;
    firstNodeId: string;
    nodes: { [key: string]: DialogueNode | ChoiceNode };
}
