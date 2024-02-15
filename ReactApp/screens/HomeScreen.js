import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View className='flex-1 bg-[#232323] items-center justify-center'>
            <Text className='text-3xl font-bold text-white'>Hey!</Text>
            <Text className='text-lg text-gray-400'>Welcome to React Native</Text>
            <Button
                title='Go to details' 
                onPress={() => navigation.navigate('Details')}     
            />
        </View>
    );
}
