import React, { useState } from "react";
import axios from "axios";

interface WeatherData {
    current_condition: Array<{
        temp_C: string;
        lang_vi: Array<{ value: string }>;
    }>;
}

const WeatherApp: React.FC = () => {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchWeather = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.get<WeatherData>(
                `https://wttr.in/${city}?format=j1`,
            );
            setLoading(false);
            setWeather(response.data);
        } catch (err) {
            setError(
                "Could not fetch weather data. Please check the city name.",
            );
            setWeather(null);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "1rem" }}>Thời tiết</h2>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Nhập tên thành phố"
            />
            <button onClick={fetchWeather}>Xem</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading &&
            weather &&
            weather.current_condition &&
            weather.current_condition.length > 0 ? (
                <div>
                    <h3>Thời tiết tại {city}</h3>
                    <p>Nhiệt độ: {weather.current_condition[0].temp_C}°C</p>
                    <p>
                        Điều kiện:{" "}
                        {weather.current_condition[0].lang_vi[0].value}
                    </p>
                </div>
            ) : (
                !loading &&
                weather &&
                !error && <p>No weather data available for {city}.</p>
            )}
        </div>
    );
};

export default WeatherApp;
