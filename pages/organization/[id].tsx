import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import Attribute from 'components/Attribute'
// import SocialTags from 'components/SocialTags'
import { Adapter } from '@cryptostats/sdk'
import 'data/adapters'
import sdk from 'data/sdk'

interface OrgDetailsProps {
  // id: string
  metadata: any
}

export const ProtocolDetails: NextPage<OrgDetailsProps> = ({ /*id,*/ metadata }) => {

  return (
    <main>
      <Head>
        <title key="title">{metadata.name} - OpenOrgs.info</title>
      </Head>

      {/*<SocialTags title={metadata.name} image={id} />*/}

      <h1 className="title">Open-Orgs.info</h1>
      <div>
        <Link href="/">
          <a>
            <ArrowLeft size={14} /> Back to list
          </a>
        </Link>
      </div>

      <h2 className="subtitle">
        <div className="icon" style={{ backgroundImage: `url('${metadata.icon}')` }} />
        <div className="protocol-name">
          <div>{metadata.name}</div>
          {metadata.subtitle && <div className="protocol-subtitle">{metadata.subtitle}</div>}
        </div>
      </h2>

      <p>{metadata.description}</p>

      {metadata.website && (
        <Attribute title="Website">
          <a href={metadata.website} target="website">
            {metadata.website.replace('https://', '')}
          </a>
        </Attribute>
      )}

      {metadata.governanceSite && (
        <Attribute title="Governance Site">
          <a href={metadata.governanceSite} target="website">
            {metadata.governanceSite.replace('https://', '')}
          </a>
        </Attribute>
      )}

      {metadata.governanceForum && (
        <Attribute title="Governance Forum">
          <a href={metadata.governanceForum} target="website">
            {metadata.governanceForum.replace('https://', '')}
          </a>
        </Attribute>
      )}

      <Attribute title="Treasury Addresses">
        {metadata.treasuries?.map((address: string) => (
          <div key={address}>
            <a href={`https://etherscan.io/address/${address}`} target="etherscan">{address}</a>
          </div>
        ))}
      </Attribute>

      <style jsx>{`
        main {
          margin-bottom: 18px;
          width: 100%;
          max-width: 800px;
        }
        .title {
          margin: 10px 0 4px;
          font-weight: 700;
        }
        .row {
          display: flex;
        }
        .row > :global(div) {
          flex: 1;
        }
        h2 {
          display: flex;
          align-items: center;
          font-weight: 700;
        }
        .protocol-name {
          display: flex;
          flex-direction: column;
        }
        .protocol-subtitle {
          font-size: 14px;
          color: #616161;
          font-weight: 400;
        }

        .icon {
          height: 24px;
          width: 24px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          margin-right: 8px;
        }
      `}</style>
    </main>
  );
};

export default ProtocolDetails;

export const getStaticProps: GetStaticProps<OrgDetailsProps> = async ({ params }) => {
  const list = sdk.getList('treasuries')
  const adapter = list.getAdapter(params!.id.toString())
  if (!adapter) {
    throw new Error(`Protocol ${params!.id.toString()} not found`)
  }

  return {
    props: {
      // id: adapter.id,
      metadata: await adapter.getMetadata(),
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list = sdk.getList('treasuries')
  const ids = list.adapters.map((adapter: Adapter) => adapter.id)

  return {
    paths: ids.map((id: string) => ({ params: { id } })),
    fallback: false,
  }
}
