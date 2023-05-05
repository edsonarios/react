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

// {
//     data: {
//       email: 'edson2@mail',
//       password: '$argon2id$v=19$m=65536,t=3,p=4$dsauQTfUES3KGtwBpqhsUA$dCQZeI0vQOwHZNZEDUK3dPi2hV4a6lBfYHRE08HVl1c',
//       _id: '64556d8314174447105272cb',
//       updatedAt: '2023-05-05T20:56:35.209Z',
//       createdAt: '2023-05-05T20:56:35.209Z'
//     }


// { 
    // error: {
        // status: 400,
        // data: {
            // message: 'This email is already taken.' } } }