import { api } from "$lib/services/api";
export interface UserData {
    "id": number,
    "username": string,
    "has_password": boolean,
    "role": string,
}

export interface PermissionData {
    "username": string,
    "vhost": string,
}

export interface UserCreateRequest {
    "username": string,
    "password": string,
    "confirm_password": string,
    "role": number,
}

// fetch users
export async function getUsers(): Promise<UserData[] | null> {
    try {
        const response = await api.get('/api/admin/users')
        const data = await response.json();
        return Array.isArray(data?.users) ? data.users : null;
    } catch (err) {
        console.error('Failed to fetch', err)
    }
    return null;
}

// add user
export async function addUser(req: UserCreateRequest): Promise<void> {
    await api.post('/api/admin/users', req)
}


// delete user


// change password


// fetch permissions
export async function getPermission(): Promise<PermissionData[] | null> {
    try {
        const response = await api.get('/api/admin/permissions')
        const data = await response.json();
        return Array.isArray(data?.users) ? data.users : null;
    } catch (err) {
        console.error('Failed to fetch', err)
    }
    return null;
}

// grant permission


// revoke permission