export type RegisterProps = {
    email: string;
    password: string;
};

export type LoginProps = {
    email: string;
    password: string;
};

export type loginResponseProps = {
    error: {
        status: number | string
        originalStatus: number
        data: { message: string } | string
        error: string
    }
}
