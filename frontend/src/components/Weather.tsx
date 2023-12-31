import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BACKEND_URL from '../constants';

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  margin: 0;
  color: #606c38;
  margin-bottom: 8px;
  font-size: 19px;
  font-weight: bold;
`;
const ForecastBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 8px;
  color: #606c38;
  font-weight: bold;
  text-align: center;
`;

const ImageContainer = styled.img`
  width: 75px;
  height: 75px;
`;
const Temperature = styled.p`
  text-align: center;
  color: #606c38;
  margin-top: 8px;
  font-weight: bold;
`;

const Forecast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface WeatherData {
  location: {
    name: string;
    region: string;
  };
  forecast: {
    forecastday: {
      date_epoch: number;
      date: string;
      day: {
        condition: {
          icon: string;
        };
        avgtemp_c: number;
      };
    }[];
  };
}

interface WeatherState {
  location: {
    name: string;
    region: string;
  };
  forecast: {
    forecastday: {
      date_epoch: number;
      date: string;
      day: {
        condition: {
          icon: string;
        };
        avgtemp_c: number;
      };
    }[];
  };
}

// Component that fetches the weather and renders it. Used in the planner page.
const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/weather`);
        if (!res.ok) {
          throw new Error('Failed to fetch weather');
        }
        const { data }: { data: WeatherData } = await res.json();
        setWeather(data);
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchWeather();
  }, []);

  // Function to format the date, for example : 2023-08-10 would turn into August 10 2023
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    };
    const date: Date = new Date(`${dateString}T00:00:00Z`);
    return date.toLocaleDateString('en-US', options);
  };
  return !weather ? (
    <div>Loading</div>
  ) : (
    <WeatherWrapper>
      <TitleContainer>
        <Title>
          Weather in {weather.location.name},&nbsp;{weather.location.region}
        </Title>
      </TitleContainer>
      <div>
        <ForecastBox>
          {weather.forecast.forecastday.map((day, index: number) => {
            const { date_epoch: dateEpoch, date, day: actualDay } = day;
            return (
              <Forecast key={dateEpoch}>
                <DateContainer>{formatDate(date)}</DateContainer>
                <ImageContainer
                  src={actualDay.condition.icon}
                  alt={index.toString()}
                />
                <Temperature>{Math.round(actualDay.avgtemp_c)}ºC</Temperature>
              </Forecast>
            );
          })}
        </ForecastBox>
      </div>
    </WeatherWrapper>
  );
};

export default Weather;
