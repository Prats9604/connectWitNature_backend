//models/Destination.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IDestination extends Document {
  name: string;
  description: string;
  src: string[];
  contributor: string;
}

const DestinationSchema = new Schema<IDestination>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  src: { type: [String], required: true }, 
  contributor: { type: String, required: true },
}, { timestamps: true });

const Destination = mongoose.model<IDestination>('Destination', DestinationSchema);

export default Destination;





