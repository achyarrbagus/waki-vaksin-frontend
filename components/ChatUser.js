import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import Skeleton from 'react-loading-skeleton'
import { Channel, SendBirdProvider } from "sendbird-uikit"
import "sendbird-uikit/dist/index.css"

export default function Chat({ slug }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchChat()
  }, [])

  const fetchChat = async () => {
    await fetch(`/api/get-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        idp: slug
      })
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        setUser(json)
      })
  }
  return (
    <>
      <div className='bg-white h-full shadow-md'>
        {user ?
          <SendBirdProvider appId="4A726CBE-AA2F-404D-93DB-522B40CD492F"
            userId={user.remember_token} nickname={user.name} accessToken="ef8a297dcb37e88fc5bd22443b3b2be6cead85b3">
            <div className='pt-12' style={{ height: '100%' }}>

              <Channel channelUrl={user.channel_url} replyType="QUOTE_REPLY" />
            </div>
          </SendBirdProvider>
          : <div className='p-4'><Skeleton count={20} /></div>
        }
      </div>
    </>
  )
}