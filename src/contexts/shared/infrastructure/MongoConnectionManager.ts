import mongoose, {Mongoose} from "mongoose";

import DbConnectionManager from "./DbConnectionManager";

export default class MongoConnectionManager implements DbConnectionManager {

    private conn: Mongoose;

    // TODO: add proper logging, since we don't have a logger yet, just use console for now
    constructor(private config: any) {}

    async connect(): Promise<void> {
        const db = mongoose.connection;
        const tags = { tags: 'init,mongodb' };
        db.on('connecting', () => {
            console.log(
                `connecting to mongodb://${this.config.host}:${this.config.port}/${this.config.database}`,
                tags,
            );
        });
        db.on('error', error => {
            console.error('Error in MongoDb connection: ' + error.toString(), { ...tags, error });
        });
        db.on('connected', () => {
            console.log('MongoDB connected!', tags);
        });
        db.once('open', () => {
            console.log('MongoDB connection opened!', tags);
        });
        db.on('reconnected', () => {
            console.log('MongoDB reconnected!', tags);
        });
        db.on('disconnected', () => {
            console.log('MongoDB disconnected!', tags);
        });

        console.log(JSON.stringify(this.config))
        this.conn = await mongoose.connect(
            `mongodb://${this.config.host}:${this.config.port}/${this.config.database}`,
            {
                user: this.config.username,
                pass: this.config.password,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
        );
    }

    async disconnect(): Promise<void> {
        if(this.conn) {
            await this.conn.disconnect()
        }
    }
}