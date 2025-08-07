import type { CollectionSlug, Config } from 'payload'

export type PayloadMaintenanceMessagesConfig = {
  /**
   * List of collections to add a custom field
   */
  collections?: Partial<Record<CollectionSlug, true>>
  disabled?: boolean
}

export const payloadMaintenanceMessages =
  (pluginOptions: PayloadMaintenanceMessagesConfig) =>
  (config: Config): Config => {
    if (!config.collections) {
      config.collections = []
    }

    config.collections.push({
      slug: 'maintenance-messages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: false,
        },
        {
          name: 'activeFrom',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          required: true,
        },
        {
          name: 'activeUntil',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          required: false,
        },
        {
          name: 'variant',
          type: 'select',
          admin: {
            description: 'Choose the visual style of the message.',
          },
          defaultValue: 'warning',
          label: {
            de: 'Aussehen',
            en: "Appereance"
          },
          options: [
            {
              label: 'Success',
              value: 'success',
            },
            {
              label: 'Warning',
              value: 'warning',
            },
            {
              label: 'Error',
              value: 'error',
            },
            {
              label: 'Elevation',
              value: 'elevation',
            },
          ],
          required: true,
        },
        {
          name: 'dismissible',
          type: 'checkbox',
          label: 'Dismissible',
        },
      ],
      labels: {
        plural: {
          de: 'Wartungshinweise',
          en: 'Maintenance messages',
        },
        singular: {
          de: 'Wartungshinweis',
          en: 'Maintenance message',
        },
      },
    })

    /**
     * If the plugin is disabled, we still want to keep added collections/fields so the database schema is consistent which is important for migrations.
     * If your plugin heavily modifies the database schema, you may want to remove this property.
     */
    if (pluginOptions.disabled) {
      return config
    }

    if (!config.endpoints) {
      config.endpoints = []
    }

    if (!config.admin) {
      config.admin = {}
    }

    if (!config.admin.components) {
      config.admin.components = {}
    }

    if (!config.admin.components.header) {
      config.admin.components.header = []
    }

    config.admin.components.header.push(`payload-maintenance-messages/rsc#HeaderServer`)

    // const incomingOnInit = config.onInit

    // config.onInit = async (payload) => {
    // Ensure we are executing any existing onInit functions before running our own.
    // if (incomingOnInit) {
    //   await incomingOnInit(payload)
    // }
    //
    // const { totalDocs } = await payload.count({
    //   collection: 'plugin-collection',
    //   where: {
    //     id: {
    //       equals: 'seeded-by-plugin',
    //     },
    //   },
    // })
    //
    // if (totalDocs === 0) {
    //   await payload.create({
    //     collection: 'plugin-collection',
    //     data: {
    //       id: 'seeded-by-plugin',
    //     },
    //   })
    // }
    // }

    return config
  }
