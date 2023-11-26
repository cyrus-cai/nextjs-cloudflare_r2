'use client'
import './globals.css'
import { useState } from "react";
import Image from 'next/image'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"

export default function Home() {
  const [postState, setPostState] = useState<boolean>(false);
  const [getState, setGetState] = useState<boolean>(false);
  const [file, setFile] = useState<File>()

  const MAX_FILE_SIZE = 2000000; // 2 MB in bytes, can be moved to a config file

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      if (selectedFile.size <= MAX_FILE_SIZE) {
        setFile(selectedFile);
      } else {
        input.value = "";
        alert('less than 2mb accepted');
      }
    } else {
      alert('no selection');
    }
  };


  const handlePost = async () => {
    setPostState(true);
    const formData = new FormData();
    formData.append('file', file as File);

    const res = await fetch('/api/post_r2', {
      method: 'POST',
      body: formData
    });
    const jsonResponse = await res.json();
    if (jsonResponse.success != true) {
      alert('post failed');
    }
    setPostState(false);
    setFile(undefined)
  }

  const handleGet = async () => {
    setGetState(true);
    const res = await fetch('/api/get_r2');
    const blob = await res.blob();
    const fileURL = URL.createObjectURL(blob);
    let anchor = document.createElement('a')
    anchor.href = fileURL
    anchor.download = 'example.png'
    anchor.click()
    setGetState(false);
  };


  return (
    <main className="flex min-h-screen flex-col px-40 pt-80">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm flex-col space-y-12">

        <h2 className={`mb-3 text-2xl font-semibold`}>
          nextjs-cloudflare_r2 example
        </h2>

        <div className='space-y-2'>
          <p> test post to cloudflare_r2</p>
          <p className='opacity-50'>example only \ do not post sensitive \ auto delete 3d</p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" onChange={handleUpload} />
          </div>
          <div className='flex items-center'>
            <Button disabled={!file} onClick={handlePost}>
              {postState === true ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : " post (max 2mb)"}
            </Button>
          </div>
        </div>

        <div className='space-y-2'>
          <p> test get from cloudflare_r2</p>
          <Image
            alt='example'
            src='/example.png'
            width={80}
            height={80}
          />
          <Button onClick={handleGet}>
            {getState === true ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "getFile"}
          </Button>
        </div>

      </div>


    </main>
  )
}
