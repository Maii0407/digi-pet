import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  Flex,
  Box,
  Button,
  keyframes
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

//TODO complete this styling
export const HatchingEgg = ({ petData }) => {
  const router = useRouter();

  const [ showButton, setShowButton ] = useState( false );

  const hatchingKeyframe = keyframes`
    0%, 20% {
      background: url( ${ petData.digimonData.sprite }001.png ) no-repeat center/60%;
    }
    10%, 30% {
      background: url( ${ petData.digimonData.sprite }002.png ) no-repeat center/60%;
    }
    40%, 60% {
      background: url( ${ petData.digimonData.sprite }003.png ) no-repeat center/60%;

    }
    50% {
      background: url( ${ petData.digimonData.sprite }004.png ) no-repeat center/60%;

    }
    70% {
      background: url( ${ petData.digimonData.sprite }005.png ) no-repeat center/60%;

    }
    80% {
      background: url( ${ petData.digimonData.sprite }006.png ) no-repeat center/60%;

    }
    90% {
      background: url( ${ petData.digimonData.sprite }007.png ) no-repeat center/60%;

    }
    100% {
      background: url( ${ petData.digimonData.sprite }008.png ) no-repeat center/60%;
    }
  `;

  const animation = `${ hatchingKeyframe } 20s steps(1, start) 1 forwards`;

  const babyEvo = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/digipet/babyEvo',
        withCredentials: true,
        data: {
          digimonId: petData._id,
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      // setOpenOptions( false );
      router.replace( router.asPath );
    }
  };

  useEffect(() => {
    const timer = setTimeout( () => {
      setShowButton( true );
    }, 20000 );

    return () => clearTimeout( timer );
  }, [])

  return (
    <Flex
      direction='column'
    >
      <Flex
        width='100%'
        border='5px double'
        borderColor='gray.400'
        borderRadius='10px'
        backgroundColor='transparent'
        justifyContent='center'
      >
        <Box
          as={ motion.div }
          width='33vw'
          height='33vw'
          animation={ animation }
        />
      </Flex>
      
      {
        showButton ? 
        <Button
          onClick={ () => babyEvo() }
          variant='outline'
          colorScheme='red.500'
        >
          COMPLETE
        </Button> : null
      }
    </Flex>
  );
};