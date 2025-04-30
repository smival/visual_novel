import { _decorator, Component, resources, JsonAsset, error } from 'cc';
import { Story, DialogueNode, ChoiceNode } from './types';

const { ccclass, property } = _decorator;

@ccclass('StoryLoader')
export class StoryLoader extends Component {
    private static _instance: StoryLoader = null;
    private _story: Story = null;
    
    public static get instance(): StoryLoader {
        return StoryLoader._instance;
    }
    
    onLoad() {
        if (StoryLoader._instance === null) {
            StoryLoader._instance = this;
        } else {
            this.node.destroy();
        }
    }
    
    /**
     * Загружает сюжет из JSON файла
     * @param storyPath Путь к файлу сюжета
     * @param callback Функция обратного вызова, вызывается после загрузки сюжета
     */
    public loadStory(storyPath: string = 'data/story', callback?: (story: Story) => void): void {
        resources.load(storyPath, JsonAsset, (err, jsonAsset) => {
            if (err) {
                error(`Ошибка загрузки сюжета: ${err}`);
                return;
            }
            
            this._story = jsonAsset.json as Story;
            
            if (callback) {
                callback(this._story);
            }
        });
    }
    
    /**
     * Возвращает текущий загруженный сюжет
     */
    public getStory(): Story {
        return this._story;
    }
    
    /**
     * Возвращает узел сюжета по его ID
     * @param nodeId ID узла сюжета
     */
    public getStoryNode(nodeId: string): DialogueNode | ChoiceNode | null {
        if (!this._story || !this._story.nodes[nodeId]) {
            return null;
        }
        
        return this._story.nodes[nodeId];
    }
}
