"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { generateInviteCode, INVITE_CODE } from "@/lib/utils";
import uuid4 from "uuid4";

export default function Home() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState<string>();

  useEffect(() => {
    // Generate invite code if not exists
    const storedCode = sessionStorage.getItem(INVITE_CODE);
    if (!storedCode) {
      const newCode = generateInviteCode();
      sessionStorage.setItem(INVITE_CODE, newCode);
      setInviteCode(newCode);
    } else {
      setInviteCode(storedCode);
    }
  }, []);

  // Create a default note ID
  const noteId = uuid4();

  // Add button click handler to navigate to note
  const handleJoin = () => {
    router.push(`/${inviteCode}/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg">
        <div className="bg-muted p-4 rounded mb-4">
          <p className="text-sm mb-2">Your Invite Code:</p>
          <p className="font-mono text-xl">{inviteCode}</p>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Share this code with others to collaborate on notes!
        </p>
        <button
          onClick={handleJoin}
          className="w-full bg-primary text-primary-foreground p-2 rounded"
        >
          Create New Note
        </button>
      </div>
    </div>
  );
}
