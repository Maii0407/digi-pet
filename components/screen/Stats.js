import React from 'react';
import { DateTime } from 'luxon';

import { Walking } from '../movingSprites/Walking';

import {
  Flex,
  Grid,
  Text
} from '@chakra-ui/react';

export const StatScreen = ({ digimon }) => {
  const returnAge = () => {
    const birthday = DateTime.fromISO( digimon.birthday );
    const today = DateTime.fromJSDate( new Date() );

    const age = today.diff( birthday, 'hours');
    return Math.trunc( age.toObject().hours );
  };

  if( digimon ) {
    return(
      <Flex
        direction='column'
      >
        <Walking petData={ digimon } />
        <Flex
          padding='10px'
          direction='column'
          backgroundColor={ digimon.digimonData.bgTheme }
          border='5px double'
          borderRadius='5px'
          borderColor={ digimon.digimonData.borderTheme }
          marginTop='10px'
        >
          <Grid
            templateColumns='repeat(2, 1fr)'
            gap='5px'
          >
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Power: ${ digimon.digimonData.power }` }
            </Text>
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Effort: ${ digimon.effort }` }
            </Text>
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Battles: ${ digimon.battles }` }
            </Text>
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Win %: ${ ( digimon.battles/100 ) * digimon.battlesWon } %` }
            </Text>
          </Grid>
          <Grid
            gap='5px'
            marginTop='5px'
          >
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Age: ${ returnAge() } HOURS` }
            </Text>
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Weight: ${ digimon.digimonData.weight } G` }
            </Text>
            <Text
              textStyle='digital'
              fontSize='10px'
              color={ digimon.digimonData.borderTheme }
            >
              { `Stage: ${digimon.digimonData.stage}` }
            </Text>
          </Grid>
        </Flex>
      </Flex>
    );
  }
  
};