import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import axios from 'axios';

export default function FlightRouteScreen({ navigation }) {
    const [departureICAO, setDepartureICAO] = useState('');
    const [arrivalICAO, setArrivalICAO] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const aviationStackAPIKey = '2ca2cb07f9cbdec2d4a7fe0d9ba07e88'; // Replace with your actual AviationStack API key

    const searchFlightRoute = async () => {
        if (!departureICAO || !arrivalICAO) {
            Alert.alert('Error', 'Please enter both departure and arrival ICAO codes.');
            return;
        }
    
        setIsLoading(true);
        const url = `http://api.aviationstack.com/v1/flights?access_key=${aviationStackAPIKey}&dep_icao=${departureICAO}&arr_icao=${arrivalICAO}`;
    
        try {
            const response = await axios.get(url);
            const flightData = response.data;
    
            if (flightData && flightData.data && flightData.data.length > 0) {
                const firstFlight = flightData.data[0];
                Alert.alert('Flight Found',
                    `Airline: ${firstFlight.airline ? firstFlight.airline.name : 'N/A'}
                    Aircraft: ${firstFlight.aircraft && firstFlight.aircraft.iata ? firstFlight.aircraft.iata : 'N/A'}
                    Flight Number: ${firstFlight.flight ? firstFlight.flight.number : 'N/A'}
                    Departure Time: ${firstFlight.departure && firstFlight.departure.estimated ? firstFlight.departure.estimated : 'N/A'}
                    Arrival Time: ${firstFlight.arrival && firstFlight.arrival.estimated ? firstFlight.arrival.estimated : 'N/A'}
                    Flight Status: ${firstFlight.flight_status ? firstFlight.flight_status : 'N/A'}
                    `);
            } else {
                Alert.alert('No Flights Found', 'Could not find any flights matching the provided ICAO codes.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch flight route information.');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <View className='flex-1 bg-[#232323] items-center justify-center'>
            <Text className='text-3xl font-bold text-white'>Flight Route Information</Text>
            <Text className='text-lg text-gray-400 px-10 text-center'>In here, you can look at information about your flight. Please note that you will need to find the airport ICAO code.</Text>

            <Text className='text-white mt-10 text-xl'>Departure airport</Text>
            <TextInput
                className='bg-[#353535] w-3/4 p-3 rounded-lg mt-5 text-white font-bold text-center -inset-20 uppercase'
                placeholder='Enter airport ICAO code'
                value={departureICAO}
                onChangeText={setDepartureICAO}
            />
            <Text className='text-white mt-10 text-xl'>Arrival airport</Text>
            <TextInput
                className='bg-[#353535] w-3/4 p-3 rounded-lg mt-5 text-white font-bold text-center mb-10 uppercase'
                placeholder='Enter airport ICAO code'
                value={arrivalICAO}
                onChangeText={setArrivalICAO}
            />

            <Button
                title={isLoading ? 'Searching...' : 'Search for flight route'}
                onPress={searchFlightRoute}
                disabled={isLoading}
            />
        </View>
    );
}
