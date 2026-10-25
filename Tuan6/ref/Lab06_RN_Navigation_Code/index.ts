// Nạp gesture handler trước khi khởi tạo navigation/drawer.
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Đăng ký App làm component gốc cho Expo Go và bản build.
registerRootComponent(App);