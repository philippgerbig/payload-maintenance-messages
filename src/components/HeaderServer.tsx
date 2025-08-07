import type { ServerComponentProps } from 'payload'
import { RichText } from './RichText'

import './HeaderServerStyles.scss'
import React from 'react'

export const HeaderServer = async (props: ServerComponentProps) => {
  const { payload } = props

  // const docs = []
  const { docs } = await payload.find({
    collection: 'maintenance-messages',
    where: {
      activeFrom: { less_than_equal: new Date() },
      or: [
        {
          activeUntil: { greater_than: new Date() },
        },
        {
          activeUntil: { exists: false },
        },
      ],
    },
  })

  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div>
      {docs.map((doc) => {
        const style = {
          '--maintenance-background': `var(--theme-${doc.variant}-200)`,
          '--maintenance-color': `var(--theme-${doc.variant}-850)`,
          '--maintenance-headline-color': `var(--theme-${doc.variant}-950)`,
          '--maintenance-hide-color': `var(--theme-${doc.variant}-750)`,
        } as React.CSSProperties

        return (
          <div key={doc.id} style={style} className="maintenance-message">
            <h4>{doc.title}</h4>
            <RichText data={doc.description} />

            {doc.dismissible && (
              <a
                href="#"
                style={{ color: 'var(--maintenance-hide-color)' }}
              >
                Hinweis ausblenden
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
