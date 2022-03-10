import { connection, connect } from 'mongoose';
import UserModel from '../models/users';

export type ObjectInteraction = {
  objectId: string,
  mapId: string,
  count: number
};

export type User = {
  gatherPlayerId: string
  gatherName: string
  steps?: number,
  interactions?: number,
  objectInteractions?: ObjectInteraction[],
  messages?: number,
  isOnline?: boolean,
  lastJoined?: number,
  lastExited?: number,
  timeOnlineInMinutes?: number
};

async function connectDatabase() {
  try {
    if (connection.readyState === 0) {
      connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/gather?retryWrites=true&w=majority`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    await connectDatabase();
    const allusers = await UserModel.find({}).lean() as User[]
    return allusers;
  } catch (error) {
    console.log(error);
    return [];
  }
}
