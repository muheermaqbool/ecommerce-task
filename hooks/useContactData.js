"use client";
import { useMutation } from "@tanstack/react-query";

async function sendContact(formData) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export function useSendContactData() {
  return useMutation({
    mutationFn: sendContact,
  });
}
