import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import TeamSection from "../components/TeamSection";
import ButtonComponent from "../components/ButtonComponent";

export default function Index() {

  // Restart game after a win
  const restartGame = () => {
    // Points Reinitialization
    setTeamA((prevTeamA) => (
      {
        ...prevTeamA,
        points: 0
      }))

    setTeamB((prevTeamB) => (
      {
        ...prevTeamB,
        points: 0
      }))

  }

  // Swap the teams position
  const invertGame = () => {
    const tempTeamA = { ...teamA };
    const tempTeamB = { ...teamB };
    setTeamA(tempTeamB);
    setTeamB(tempTeamA);
  }


  // Pointes needed to win (25 or 15 in tie break). 25 is the default 
  const [pointsNeeded, setPointsNeeded] = useState(5)

  // Team A Object
  const [teamA, setTeamA] = useState({
    'name': 'Bananinhas',
    'points': 0,
    'victories': 0,
  })

  // Team B Object
  const [teamB, setTeamB] = useState({
    'name': 'Batatinhas',
    'points': 0,
    'victories': 0,
  })

  // Increase Button
  const handleIncreaseBtn = (team: string) => {
    if (team === teamA.name) {
      setTeamA((prevTeamA) => (
        {
          ...prevTeamA,
          points: teamA.points + 1
        }))
    } else if(team === teamB.name) {
      setTeamB((prevTeamB) => (
        {
          ...prevTeamB,
          points: teamB.points + 1
        }))
    }


  }

  // Decrease Button 
  const handleDecreaseBtn = (team: string) => {
    if (team === teamA.name) {
      if (teamA.points > 0) {
        setTeamA((prevTeamA) => (
          {
            ...prevTeamA,
            points: teamA.points - 1
          }))
      }
    } else if(team === teamB.name) {
      if (teamB.points > 0) {
        setTeamB((prevTeamB) => (
          {
            ...prevTeamB,
            points: teamB.points - 1
          }))
      }
    }
  }


  // Check Win
  useEffect(() => {

    // Check if the winning team has at least 2 points of difference to the other
    const checkWin = () => {
      if (teamA.points - teamB.points >= 2) {
        // Add one more victory to the team A
        setTeamA((prevTeamA) => (
          {
            ...prevTeamA,
            victories: teamA.victories + 1
          }))
          restartGame()

      } else if (teamB.points - teamA.points >= 2) {
        // Add one more victory to the team B
        setTeamB((prevTeamB) => (
          {
            ...prevTeamB,
            victories: teamB.victories + 1
          }))
          
      }
      
    }

    // Check if some team has the points needed to win (25 or 15 in tie break)
    if (teamA.points >= pointsNeeded || teamB.points >= pointsNeeded) {
      checkWin()
    }


  }, [teamA.points, teamB.points])

  // Force win (Win button)
  const forceWin = (team:string) => {
    if (team === teamA.name) {
        // Add one more victory to the team A
        setTeamA((prevTeamA) => (
          {
            ...prevTeamA,
            victories: teamA.victories + 1
          }))
  
      } else if (team === teamB.name) {
        // Add one more victory to the team B
        setTeamB((prevTeamB) => (
          {
            ...prevTeamB,
            victories: teamB.victories + 1
          }))
      }
    restartGame()
  } 

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#AAAAAA",
      }}
    >

      {/* White background */}
      <View
        style={{
          display: 'flex',
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#EEEEEE',
        }}
      >

        <TeamSection team={teamA.name} setsWon={teamA.victories} points={teamA.points} handleIncreaseBtn={handleIncreaseBtn} handleDecreaseBtn={handleDecreaseBtn} forceWin={forceWin}/>

        {/* CENTER VIEW (RESTART BUTTON & INVERT BUTTON) */}
        <View
        style={{
          width:'10%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#C5C5C5',
          gap: 15,
        }}
        >
          <Button title="Reset" onPress={() => restartGame()} />
          <Button title="Invert" onPress={() => invertGame()} />
        </View>

        <TeamSection team={teamB.name} setsWon={teamB.victories} points={teamB.points} handleIncreaseBtn={handleIncreaseBtn} handleDecreaseBtn={handleDecreaseBtn} forceWin={forceWin}/>

      </View>

    </View>
  );
}