import fetch, { RequestInit } from "node-fetch";
import { join } from "node:path";

const BASE_URL = process.env.PINGCODE_OPEN_API_ENDPOINT || "";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestInfo {

    method: RequestMethod;

    path: string;

    params?: Record<string, string>;

    body?: any

}

// async function requestRaw(info: RequestInfo): Promise<any> {
//     const url = new URL(join(BASE_URL, info.path));
//     for (const name in info.params) {
//         url.searchParams.append(name, info.params[name]);
//     }
//     const init: RequestInit = {
//         method: info.method,
//         body: info.body,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.PINGCODE_OPEN_API_ACCESS_TOKEN}`
//         }
//     };
//     console.error("fetch", { url: url.href, ...init });
//     const response = await fetch(url.href, init);
//     return response.json();
// }

export interface RequestResultContent {

    [x: string]: unknown;

    type: "text",

    text: string;

}

export interface RequestResult {

    [x: string]: unknown;

    content: [RequestResultContent];

}

export async function request(info: RequestInfo): Promise<RequestResult> {
    const url = new URL(join(BASE_URL, info.path));
    for (const name in info.params) {
        url.searchParams.append(name, info.params[name]);
    }
    const init: RequestInit = {
        method: info.method,
        body: info.body,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PINGCODE_OPEN_API_ACCESS_TOKEN}`
        }
    };
    console.error("fetch", { url: url.href, ...init });
    const response = await fetch(url.href, init);
    console.error("respone", response);
    const json = await response.json();
    return {
        content: [{
            type: "text",
            text: JSON.stringify(json)
        }]
    }

    // if (!access_token) {
    //     await auth();
    // }

    // let response = await requestRaw(info);
    // if (response.code === "100028") {
    //     await auth();
    //     response = requestRaw(info);
    // }
    // return {
    //     content: [{
    //         type: "text",
    //         text: JSON.stringify(response)
    //     }]
    // };
}