import React from 'react'
import { Button, Text, View } from "react-native";
import ButtonComponent from './ButtonComponent';

const TeamSection = ({team, setsWon, points, handleIncreaseBtn, handleDecreaseBtn, forceWin}: {team:string; setsWon: number; points: number; handleIncreaseBtn: any; handleDecreaseBtn:any; forceWin:any}) => {

  return (
    <View
        style={{
            display: 'flex',
            width: '45%',
            height: 200,
        }}
    >
        <View
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#F4F4F4',
                paddingHorizontal: 15,
            }}
        >
            <Text>Team: {team} | {setsWon} sets</Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                }}
            >
                <ButtonComponent title={'Win'} btnFunction={forceWin} team={team} />
                <ButtonComponent title={'-'} btnFunction={handleDecreaseBtn} team={team} />
                <ButtonComponent title={'+'} btnFunction={handleIncreaseBtn} team={team} />
            </View>
        </View>

        <View
            style={{
                backgroundColor: '#D9D9D9',
                height: '50%',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{
                fontSize: 50,
            }}>{points}</Text>
        </View>

    </View>
  )
}

export default TeamSection