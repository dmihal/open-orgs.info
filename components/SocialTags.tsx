import React from 'react'
import Head from 'next/head'

const SocialTags: React.FC = () => {
  return (
    <Head>
      <meta property="og:title" content="OpenOrgs.info" />
      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/social.png`}
      />
      <meta
        property="og:description"
        content="DAOs are the new companies. What's on their balance sheets?"
      />

      <meta name="twitter:title" content="OpenOrgs.info" />
      <meta
        name="twitter:description"
        content="DAOs are the new companies. What's on their balance sheets?"
      />
      <meta
        name="twitter:image"
        content={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/social.png?${new Date().getDate()}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default SocialTags
