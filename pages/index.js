import { useSession, signOut } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import axios from 'axios';
import { useRouter } from 'next/router';

import dbConnect from '../lib/mongooseConnect';
import { authOptions } from './api/auth/[...nextauth]';
import DigiPet from '../model/digipet';

import { egg } from '../assets/egg';
import { baby } from "../assets/baby";
import { child } from '../assets/child';
import { adult } from "../assets/adult";
import { perfect } from "../assets/perfect";
import { ultimate } from "../assets/ultimate";

import { MainScreen } from '../components/MainScreen';
import { Train } from "../components/Train";
import { Fight } from "../components/Fight";
import { Sleep } from "../components/Sleep";

import {
  Flex,
  Button,
  Text
 } from "@chakra-ui/react"

export default function Home({ myPet }) {
  const { data: session } = useSession();
  const router = useRouter();

  const createDigimon = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/digipet/create',
        withCredentials: true,
        data: {
          name: 'dummy 001',
          user: session.user.id,
          digimonData: egg[0],
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      console.log( 'success' );
      // setOpenOptions( false );
      router.replace( router.asPath );
    }
  };

  if( session ) {
    // console.log(session.user.id );
    // console.log({ myPet });

    return (
      <Flex
        direction='column'
      >
        <Text>Pet</Text>
        {
          myPet ? <MainScreen pet={ myPet.digimonData } />
          : null
        }
        <Button
          onClick={ () => createDigimon() }
        >
          Create Egg
        </Button>
        <Text>
          Signed in as { session.user.email }
        </Text>
        <Button
          onClick={ () => signOut({ callbackUrl: '/login' }) }
        >
          Sign Out
        </Button>
      </Flex>
    )
  }
}

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      await dbConnect();

      const myPet = await DigiPet.findOne({ user: session.user.id });
  
      return {
        props: {
          myPet: JSON.parse( JSON.stringify( myPet )),
        },
      }
    }
    catch( error ) {
      console.log( error );
      return {
        notFound: true,
      }
    }
  }
  else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
};