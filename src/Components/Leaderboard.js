import { useEffect, useState } from "react";
import Badge from "./Badge";
import axios from "axios"

export default function LeaderBoard() {

  const [LeaderBoard, UpdateLeaderBoard] = useState(null)

  useEffect(()=>{
    let teamData = null
    const rankTeams = () =>{
        if(teamData){
            teamData = teamData.map((team)=>({
                ...team,
                performance : team.score / team.total_games_played
            }))
            teamData = teamData.slice().sort((a, b) => b.performance - a.performance);
            UpdateLeaderBoard(teamData)
        }
    }

    const fetchTeamStats = async()=>{
      axios.get('http://localhost:4000/api/teamStats')
        .then(response => {
            teamData = response.data.teamStats
            rankTeams()

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    fetchTeamStats()
    const interval = setInterval(fetchTeamStats, 5000);
    return () => clearInterval(interval);
  },[])


    return(

        <div className="shadow-lg mb-5 bg-body rounded">
            {LeaderBoard && <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Rank</th>
                        <th>Team Name</th>
                        <th className="text-center">Total Games Played</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {LeaderBoard.map((team, index) => (
                    <tr key={index}>
                        <td className="text-center">
                            {index === 0 ? <Badge path="/rank1.png" alt={team.team_name}/> : 
                             index === 1 ? <Badge path="/rank2.png" alt={team.team_name}/>: 
                             index === 2 ? <Badge path="/rank3.png" alt={team.team_name}/> : index+1}
                        </td>
                        <td> 
                            <Badge path={team.profile} alt={team.team_name} class="rounded-circle me-3"/> 
                            {team.team_name}
                        </td>
                        <td className="text-center">{team.total_games_played}</td>
                        <td>+{team.score.toLocaleString()}</td>
                    </tr>
                    ))}       
                </tbody>
            </table>}
        </div>
    )

}