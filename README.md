# Visual Novel

A visual novel prototype created using Cocos Creator 3.8.5 and TypeScript.
This project demonstrates the basic mechanics of a visual novel with support for dialogues, choices, and scene changes.

## Project Structure
- `assets/` - game resources
  - `scripts/` - TypeScript scripts
    - `GameController.ts` - main game controller
    - `StoryLoader.ts` - story loader
    - `SceneBuilder.ts` - scene builder
    - `types.ts` - types and interfaces
  - `resources/` - resources for dynamic loading
    - `images/` - images
      - `backgrounds/` - backgrounds
      - `characters/` - characters
    - `data/` - JSON data files
    - `prefabs/` - component prefabs

## Main Components
- **StoryLoader** - loads and manages the story from a JSON file
- **GameController** - controls the gameplay, manages scene, character, and dialogue display
- **SceneBuilder** - automatically builds the main scene with all necessary elements

## Setup and Launch
1. Install Cocos Creator 3.8.5
2. Open the project from the `/Users/smival/visual_novel/` folder
3. Create a new scene "MainScene"
4. Add the `SceneBuilder` component to Canvas
5. Create a choice button prefab and specify it in the `choiceButtonPrefab` field of the `SceneBuilder` component
6. Launch the scene using the Play button in Cocos Creator

## Story File Format (story.json)
The story is described in a JSON file that contains two types of nodes:
- **Dialogue Node** - a dialog node with text and the ability to transition to the next node
- **Choice Node** - a choice node with multiple options, each leading to its own node

Example structure:
```json
{
  "title": "Title",
  "author": "Author",
  "firstNodeId": "start",
  "nodes": {
    "start": {
      "type": "dialogue",
      "background": "classroom",
      "character": {
        "left": {
          "name": "Character",
          "image": "student_neutral"
        },
        "right": null
      },
      "text": "Dialogue text",
      "nextNodeId": "next_node"
    }
  }
}
```

## Debugging
Detailed information about resource loading and errors is displayed in the Cocos Creator console.
If you have problems loading images, check:
1. The correctness of paths in story.json
2. That the imported images type is set as SpriteFrame or Texture
3. Update resources in Cocos Creator (Refresh/Reimport Assets)
