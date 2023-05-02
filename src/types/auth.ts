export type RegisterProps = {
    email: string;
    password: string;
};

export type LoginProps = {
    email: string;
    password: string;
};

export type tokenProps = {
    error: {
        data: string
        error: string
        originalStatus: number
    }
}
