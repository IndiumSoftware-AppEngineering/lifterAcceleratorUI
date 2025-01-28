export interface FormData {
    connectionType: "jdbc" | "advanced";
    database: string;
    host: string;
    dbName: string;
    port: string;
    username: string;
    password: string;
    url: string;
}

export interface FormErrors {
    [key: string]: string;
}