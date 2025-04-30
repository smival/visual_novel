import { _decorator, Component, Node, Label, Color, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChoiceButton')
export class ChoiceButton extends Component {
    @property(Label)
    buttonText: Label = null;
    
    @property(Button)
    button: Button = null;
    
    private callback: Function = null;
    
    /**
     * Устанавливает текст кнопки
     * @param text Текст кнопки
     */
    public setText(text: string): void {
        if (this.buttonText) {
            this.buttonText.string = text;
        }
    }
    
    /**
     * Устанавливает функцию обратного вызова при нажатии на кнопку
     * @param callback Функция обратного вызова
     */
    public setCallback(callback: Function): void {
        this.callback = callback;
    }
    
    /**
     * Обработчик нажатия на кнопку
     */
    public onButtonClick(): void {
        if (this.callback) {
            this.callback();
        }
    }
}
