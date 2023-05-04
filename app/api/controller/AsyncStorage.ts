import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncStorageItem = async(key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`Failed to save ${key} in AsyncStorage`, e);
        return e;
    }
}

export const getAsyncStorageItem = async(key: string)=> {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.warn(`Error getting key ${key} from AsyncStorage`);
        return e;
    }
}

export const removeAsyncStorageItem = async(key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Successfully remove: ', key);
    } catch (e) {
        console.warn('Error remove: ', e);
        return e;
    }
}