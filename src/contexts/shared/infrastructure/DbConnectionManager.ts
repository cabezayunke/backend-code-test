export default interface DbConnectionManager {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}