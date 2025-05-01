# Changelog

## [0.2.0] - 2025-05-01

### Added
- Added proper resource loading with /spriteFrame suffix
- Migrated from code-based scene building to editor-based scene creation
- Added nested container structure for choice buttons
- Removed SceneBuilder class as it's no longer needed
- Fixed image loading in GameController for both backgrounds and characters

## [0.1.0] - 2025-04-30

### Added
- Initial project setup
- Basic visual novel functionality
- Story loading from JSON file
- Dialogue and choice system
- Character and background display

### Technical Features
- Dynamic resource loading (images) during gameplay
- Type system for strict typing of story nodes
- Automatic creation of choice buttons for nodes with choices
- Loading images as textures with subsequent conversion to SpriteFrame
