export class RequestResetPasswordDto {
    email: string;
    username?: string
}

export class ResetPasswordDto {
    token: string;
    newPassword: string;
}
