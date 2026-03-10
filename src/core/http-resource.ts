import { getSessionToken } from "@core/session-store";
import { API_BASE } from "@core/constants";

export type FriendlyError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

export type ProblemJson = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: unknown;
};

function isProblemJson(body: unknown): body is ProblemJson {
  return typeof body === "object" && body !== null && "detail" in body;
}

function getAuthHeader(): Record<string, string> {
  const token = getSessionToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function getDefaultHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...getAuthHeader(),
  };
}

async function parseResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/problem+json")) {
    const body = (await res.json()) as unknown;
    if (isProblemJson(body)) {
      const err: FriendlyError = {
        code: String(body.status ?? "ERROR"),
        message: body.detail ?? body.title ?? "Request failed",
        details: body,
      };
      throw err;
    }
  }
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = (await res.json()) as unknown;
      if (typeof body === "object" && body !== null && "message" in body) {
        message = String((body as { message: string }).message);
      }
    } catch {
      // ignore
    }
    const err: FriendlyError = {
      code: String(res.status),
      message,
    };
    throw err;
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function defineApiRoute(method: string, path: string): string {
  const base = API_BASE.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${method}:${base}${p}`;
}

export function defineApiRouteFn<TReq, TRes>(
  method: string,
  path: string,
  opts?: { base?: string }
): (body?: TReq) => Promise<TRes> {
  const base = opts?.base ?? API_BASE;
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  return async (body?: TReq) => {
    const headers = getDefaultHeaders();
    const init: RequestInit = { method, headers };
    if (body !== undefined && method !== "GET") {
      init.body = JSON.stringify(body);
    }
    const res = await fetch(url, init);
    return parseResponse<TRes>(res);
  };
}

export function httpResource<T>(method: string, path: string): (body?: unknown) => Promise<T> {
  const base = API_BASE.replace(/\/$/, "");
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  return async (body?: unknown) => {
    const headers = getDefaultHeaders();
    const init: RequestInit = { method, headers };
    if (body !== undefined && method !== "GET") {
      init.body = JSON.stringify(body);
    }
    const res = await fetch(url, init);
    return parseResponse<T>(res);
  };
}

export function httpUpload<T>(path: string): (formData: FormData) => Promise<T> {
  const base = API_BASE.replace(/\/$/, "");
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  return async (formData: FormData) => {
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...getAuthHeader(),
    };
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });
    return parseResponse<T>(res);
  };
}
