import axios from "axios";

const PLAYERS_API_URL = "http://localhost:8080/api/players"

export default function getPlayers() {
    return axios.get(PLAYERS_API_URL);
}