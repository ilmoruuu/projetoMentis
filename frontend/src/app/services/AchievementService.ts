import axios from "axios";

const BASE_URL = "http://localhost:8080";

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon?: string;
    days: number;
}


export async function getAchievements(): Promise<Achievement[]> {
    try {
        const response = await axios.get(
            `${BASE_URL}/achievements`
        );

        return response.data;

    } catch (error) {
        throw new Error(
            "Não foi possível buscar conquistas"
        );
    }
}