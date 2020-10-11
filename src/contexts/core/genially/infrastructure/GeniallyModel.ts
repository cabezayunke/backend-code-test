import mongoose, { Schema, Document } from 'mongoose';

export interface GeniallyDocument extends Document {
    uid: string;
    name: string;
    description?: string;
    createdAt: Date,
    updatedAt?: Date,
}

const GeniallySchema: Schema = new Schema({
    // FIXME:
    // without this, it will still create an ObjectId, but it is throwing an error
    // we don't have time to fix this right now
    // _id: false
    // NOTE:
    // we probably should create indeces and other stuff from a migration
    // but for this example we don't have migrations yet
    uid: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String },
    // NOTE:
    // we don't use mongoose timestamps or default values
    // because we will control it from our domain and avoid coupling
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date },
});

export default mongoose.model<GeniallyDocument>('GeniallyModel', GeniallySchema);