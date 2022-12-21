import dbConnect from '../../../lib/mongooseConnect';
import DigiPet from '../../../model/digipet';

export default async function handler( req, res ) {
  try {
    if( req.method === 'POST' ) {
      await dbConnect();

      const newPet = new DigiPet({
        name: 'someString',
        user: req.body.user,
        digimonData: 'someObject',
        careMistake: 0,
        overFeed: 0,
        winPercentage: 0,
        effort: 0,
        battles: 0,
        evoLine: [], //someArray
        birthday: new Date()
        // content: req.body.content,
        // image: req.body.image,
        // date: new Date(),
        // user: req.body.user
      });

      newPost.save();

      return res.status( 200 ).json({
        message: 'digi pet created',
        newPost
      });
    }
    else {
      return res.status( 500 ).json({
        message: '/api/post/create only handles POST requests',
      });
    }
  }
  catch( error ) {
    console.log( error );
    res.status( 500 ).json({
      message: 'error in /api/digipet/create',
      error
    });
  }
};