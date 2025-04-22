import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const getTemporaryUserId = (request: NextRequest): string | null => {
  const tempUserId = request.cookies.get("tempUserId")?.value;
  if (tempUserId) {
    return tempUserId;
  }
  return null;
};

export const setTemporaryUserIdCookie = (response: NextResponse): string => {
  const newTempUserId = uuidv4();
  response.cookies.set("tempUserId", newTempUserId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
  return newTempUserId;
};
