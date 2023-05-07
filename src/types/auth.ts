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

export type errorResponse = {
    status: number
    data: { message: string }
}

export type registerResponseProps = {
    data?: {
        email: string
        pasword: string
        _id: string
    }
    error?: errorResponse

}
