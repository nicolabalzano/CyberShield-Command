import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const gameService = {
  // Missions
  getMissions: () => API.get('/missions'),
  getMissionById: (id) => API.get(`/missions/${id}`),
  
  // Challenges
  getChallenges: () => API.get('/challenges'),
  getChallengeById: (id) => API.get(`/challenges/${id}`),
  submitChallenge: (id, answer) => API.post(`/challenges/${id}/submit`, { answer }),
  
  // Player Progress
  getPlayerProgress: () => API.get('/player/progress'),
  updatePlayerProgress: (data) => API.post('/player/progress', data),
  
  // Leaderboard
  getLeaderboard: () => API.get('/leaderboard'),
}

export default API
