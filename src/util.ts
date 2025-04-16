import fetch from "node-fetch";
import { join } from "node:path";

const BASE_URL = process.env.PINGCODE_OPEN_API_ENDPOINT || "";
const CLIENT_ID = process.env.PINGCODE_OPEN_API_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PINGCODE_OPEN_API_CLIENT_SECRET || "";

let access_token: string | undefined;

async function auth(): Promise<void> {
    const url = new URL(join(BASE_URL, "auth/token"));
    url.searchParams.append("grant_type", "client_credentials");
    url.searchParams.append("client_id", CLIENT_ID);
    url.searchParams.append("client_secret", CLIENT_SECRET);
    const response = await fetch(url.href);
    const json: any = await response.json();
    access_token = json.access_token;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestInfo {

    method: RequestMethod;

    path: string;

    params?: Record<string, string>;

    body?: any

}

async function requestRaw(info: RequestInfo): Promise<any> {
    const url = new URL(join(BASE_URL, info.path));
    for (const name in info.params) {
        url.searchParams.append(name, info.params[name]);
    }
    const response = await fetch(url.href, {
        method: info.method,
        body: info.body,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    });
    return response.json();
}

export async function request(info: RequestInfo): Promise<any> {
    if (!access_token) {
        await auth();
    }

    const response = await requestRaw(info);
    if (response.code === "100028") {
        await auth();
        return requestRaw(info);
    }
    else {
        return response;
    }
}