"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SocketClient, SocketEvents } from "@/lib/socket-io";
import { SOCKET_URL } from "@/lib/env";

export default function NotePage() {
  const { invite_id, note_id } = useParams();
  const [content, setContent] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const ws = React.useMemo(() => {
    const socketClient = new SocketClient();
    socketClient.connect(SOCKET_URL);
    return socketClient;
  }, []);

  // TODO: Implement form state
  // const form = useForm<z.infer<typeof editNoteSchema>>({
  //   resolver: zodResolver(editNoteSchema),
  //   defaultValues: {
  //     id: uuid4(),
  //     title: "",
  //     content: "",
  //     category: "meeting-notes",
  //   },
  // });

  useEffect(() => {
    setIsConnected(true);
    ws.emit(SocketEvents.joinNote, { invite_id, note_id });
  }, []);

  useEffect(() => {
    if (!invite_id || !note_id) return;

    ws.on(SocketEvents.receiveChange, (data: unknown) => {
      setContent(data as string);

      // form.setValue("title", note.title);
      // form.setValue("content", note.content);
      // form.setValue("category", note.category);
    });

    // Content sync events
    ws.on(SocketEvents.contentChanged, (newContent: unknown) => {
      ws.emit(SocketEvents.contentChanged, {
        invite_id,
        note_id,
        content: newContent,
      });
      setContent(newContent as string);
    });

    return () => {
      ws.on(SocketEvents.disconnect, () => {
        setIsConnected(false);
      });

      ws.off(SocketEvents.connect);
      ws.off(SocketEvents.disconnect);
      ws.off(SocketEvents.contentChanged);
    };
  }, [ws, invite_id, note_id]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    ws.emit(SocketEvents.contentChanged, {
      invite_id,
      note_id,
      content: newContent,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Collaborative Note</h1>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Start typing your note..."
          className="w-full h-[60vh] p-4 rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
