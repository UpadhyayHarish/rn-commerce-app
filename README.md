# React Native E-Commerce App

A simple e-commerce mobile application built with React Native and Expo, featuring product listing, search, and product details navigation.

## Features

- Product listing with navigation to details
- Search bar for filtering products
- Stack navigation using React Navigation
- Modular folder structure for scalability

## Folder Structure

```
src/
 ├── components/         # Reusable UI components (SearchBar, ProductList)
 ├── screens/            # App screens (HomeScreen, ProductDetailsScreen)
 ├── navigation/         # Navigation setup (stack navigator)
 ├── redux/              # (Placeholder for Redux state management)
 ├── services/           # (Placeholder for API/services)
 ├── hooks/              # (Placeholder for custom hooks)
 ├── constants/          # (Placeholder for constants)
 ├── utils/              # (Placeholder for utility functions)
 └── assets/             # (Placeholder for images/fonts)
```

## Getting Started

### 1. Clone the repository

**HTTPS:**

```sh
git clone https://github.com/UpadhyayHarish/rn-commerce-app.git
cd rn-commerce-app
```

**SSH:**

```sh
git clone git@github.com:UpadhyayHarish/rn-commerce-app.git
cd rn-commerce-app
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the Expo development server

```sh
npm start
```

### 4. Run on your device or emulator

- Scan the QR code with Expo Go (iOS/Android)
- Or press `i` for iOS simulator, `a` for Android emulator

## Main Implementation Steps

1. **Project Initialization**: Created a new Expo React Native project.
2. **Folder Structure**: Added `src` folder with subfolders: components, screens, navigation, redux, services, hooks, constants, utils, assets.
3. **Screens**: Implemented `HomeScreen` (with search bar and product list) and `ProductDetailsScreen`.
4. **Components**: Created `SearchBar` and `ProductList` components.
5. **Navigation**: Set up stack navigation in `src/navigation/index.tsx` using React Navigation.
6. **App Integration**: Used `AppNavigator` in `App.tsx` as the main entry point.
7. **TypeScript**: Ensured type safety for navigation and props.
8. **Ready for Extension**: Placeholder folders for redux, services, hooks, constants, utils, and assets for future features.

## Dependencies

- react-native
- expo
- @react-navigation/native
- @react-navigation/native-stack

## License

This project is licensed under the MIT License.

# rn-commerce-app
