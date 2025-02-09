"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const Note = () => {
  const noteId = useParams().note_id

  return (
    <div>{noteId}</div>
  )
}

export default Note