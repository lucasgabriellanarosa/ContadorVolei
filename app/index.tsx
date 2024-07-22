import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {

  // If the is not a winner this game, the running will be set to true and the buttons will work.
  const [isGameRunning, setIsGameRunning] = useState(true)

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
    
    setIsGameRunning(true)
  }


  // Pointes needed to win (25 or 15 in tie break). 25 is the default 
  const [pointsNeeded, setPointsNeeded] = useState(5)

  // Team A Object
  const [teamA, setTeamA] = useState({
    'points': 0,
    'victories': 0,
  })

  // Team B Object
  const [teamB, setTeamB] = useState({
    'points': 0,
    'victories': 0,
  })

  // Increase Button
  const handleIncreaseBtn = (team: string) => {
    if (team === "teamA") {
      setTeamA((prevTeamA) => (
        {
          ...prevTeamA,
          points: teamA.points + 1
        }))
    } else (
      setTeamB((prevTeamB) => (
        {
          ...prevTeamB,
          points: teamB.points + 1
        }))
    )


  }

  // Decrease Button 
  const handleDecreaseBtn = (team: string) => {
    if (team === "teamA") {
      if (teamA.points > 0) {
        setTeamA((prevTeamA) => (
          {
            ...prevTeamA,
            points: teamA.points - 1
          }))
      }
    } else {
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

        setIsGameRunning(false)
      } else if (teamB.points - teamA.points >= 2) {
        // Add one more victory to the team B
        setTeamB((prevTeamB) => (
          {
            ...prevTeamB,
            victories: teamB.victories + 1
          }))
        setIsGameRunning(false)
      }
    }

    // Check if some team has the points needed to win (25 or 15 in tie break)
    if (teamA.points >= pointsNeeded || teamB.points >= pointsNeeded) {
      checkWin()
    }


  }, [teamA.points, teamB.points])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      {/* TEAM A */}
      <Text>Time A: {teamA.points}</Text>
      <Text>Vitórias: {teamA.victories}</Text>

      {
        isGameRunning ?
          <>
            <Button
              title="+"
              onPress={() => handleIncreaseBtn('teamA')}
            />
            <Button
              title="-"
              onPress={() => handleDecreaseBtn('teamA')}
            />
          </>
          :
          <></>
      }


      {/* RESTART BUTTON */}
      {
        isGameRunning ?
          <></>
          :
          <>
            <Text>Fim de jogo.</Text>
            <Button title="Reiniciar" onPress={() => restartGame()}/>
          </>
      }


      {/* TEAM B */}
      <Text>Time B: {teamB.points}</Text>
      <Text>Vitórias: {teamB.victories}</Text>
      {
        isGameRunning ?
          <>
            <Button
              title="+"
              onPress={() => handleIncreaseBtn('teamB')}
            />
            <Button
              title="-"
              onPress={() => handleDecreaseBtn('teamB')}
            />
          </>
          :
          <></>
      }


    </View>
  );
}
