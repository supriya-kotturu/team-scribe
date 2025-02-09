"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import {z} from "zod"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const editNoteSchema  = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(5),
  category: z.string().min(3),
})


const EditNote = () => {
  const form = useForm<z.infer<typeof editNoteSchema>>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      title: "",
      content: "",
      category:"default"
    },
  })

  function onUpdateNote(values: z.infer<typeof editNoteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const noteId = useParams().edit_note_id;

  return (
  <Form {...form} className="space-y-8">
    <form onSubmit={form.handleSubmit(onUpdateNote)} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit - {`${noteId}`} </h1>
        <Button type="submit">Update</Button>
      </div>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input className='w-full my-4' placeholder="Brainstorming: Q1 Goals" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea className='w-full h-[240px] my-4' placeholder="Write your notes here" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}/>
    </form>
  </Form>)

}

export default EditNote