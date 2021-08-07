export interface UserInterface {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
}